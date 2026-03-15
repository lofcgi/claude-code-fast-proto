// API: ElevenLabs STT → Google Translate → ElevenLabs TTS
// Pipeline: speech-to-text → translation → text-to-speech
// Streams NDJSON progress events to the client

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const maxDuration = 60;

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";
const TTS_MAX_LENGTH = 5000;

// Parse ElevenLabs error responses into user-friendly messages
async function parseElevenLabsError(
  res: Response
): Promise<{ message: string; status: number }> {
  const status = res.status;
  try {
    const body = await res.json();
    const detail = body?.detail;

    if (status === 401)
      return { message: "ElevenLabs API key is invalid or missing", status: 500 };
    if (status === 403)
      return {
        message:
          typeof detail === "string"
            ? detail
            : detail?.message || "This feature is not available on your ElevenLabs plan",
        status: 403,
      };
    if (status === 429) {
      const code =
        typeof detail === "object" ? detail?.status : undefined;
      if (code === "quota_exceeded")
        return {
          message: "API quota exceeded. Please try again later.",
          status: 402,
        };
      if (code === "concurrent_limit_exceeded")
        return {
          message: "Too many concurrent requests. Please wait and try again.",
          status: 429,
        };
      return {
        message: "Rate limit exceeded. Please wait a moment and try again.",
        status: 429,
      };
    }
    if (status === 422) {
      const msg =
        typeof detail === "string"
          ? detail
          : detail?.message || "Invalid request parameters";
      return { message: msg, status: 400 };
    }

    const fallback =
      typeof detail === "string"
        ? detail
        : detail?.message || body?.error || `API error (${status})`;
    return { message: fallback, status: 502 };
  } catch {
    return { message: `ElevenLabs API error (${status})`, status: 502 };
  }
}

// Google Translate (free endpoint)
async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new Error("Translation service is temporarily unavailable");
  }

  if (!res.ok) throw new Error("Translation failed");

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("Translation returned unexpected format");
  }

  return ((data as unknown[])[0] as [string, string][]).map((s) => s[0]).join("");
}

export async function POST(req: NextRequest) {
  // Pre-flight checks (non-streaming errors)
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const targetLang = formData.get("targetLang") as string;
  const voiceId = formData.get("voiceId") as string;

  if (!file || !targetLang || !voiceId) {
    return NextResponse.json(
      { error: "File, target language, and voice are required" },
      { status: 400 }
    );
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size exceeds 25MB limit" },
      { status: 400 }
    );
  }

  const validTypes = [
    "audio/mpeg", "audio/wav", "audio/mp4", "audio/x-m4a", "audio/webm", "audio/flac",
    "video/mp4", "video/webm", "video/quicktime",
  ];
  if (!validTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file format: ${file.type}` },
      { status: 400 }
    );
  }

  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: "ElevenLabs API key is not configured" },
      { status: 500 }
    );
  }

  const isVideo = file.type.startsWith("video");

  // Stream NDJSON progress events
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        controller.enqueue(
          new TextEncoder().encode(JSON.stringify(event) + "\n")
        );
      };

      try {
        // === Step 1: Speech-to-Text ===
        send({ step: "transcribe", status: "started" });

        const sttFormData = new FormData();
        sttFormData.append("file", file);
        sttFormData.append("model_id", "scribe_v1");

        const sttRes = await fetch(`${ELEVENLABS_BASE}/speech-to-text`, {
          method: "POST",
          headers: { "xi-api-key": ELEVENLABS_API_KEY! },
          body: sttFormData,
        });

        if (!sttRes.ok) {
          const parsed = await parseElevenLabsError(sttRes);
          console.error("ElevenLabs STT error:", sttRes.status, parsed.message);
          send({ step: "transcribe", status: "error", error: `Speech-to-text failed: ${parsed.message}` });
          controller.close();
          return;
        }

        const sttData = await sttRes.json();
        const transcription: string = sttData.text || "";

        if (!transcription.trim()) {
          send({ step: "transcribe", status: "error", error: "No speech detected in the file" });
          controller.close();
          return;
        }

        send({ step: "transcribe", status: "done", transcription });

        // === Step 2: Translation ===
        send({ step: "translate", status: "started" });

        let translation: string;
        try {
          translation = await translateText(transcription, targetLang);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Translation failed";
          send({ step: "translate", status: "error", error: msg });
          controller.close();
          return;
        }

        send({ step: "translate", status: "done", translation });

        // === Step 3: Text-to-Speech ===
        send({ step: "synthesize", status: "started" });

        let ttsText = translation;
        if (ttsText.length > TTS_MAX_LENGTH) {
          console.warn(`Translation text truncated from ${ttsText.length} to ${TTS_MAX_LENGTH} chars`);
          ttsText = ttsText.slice(0, TTS_MAX_LENGTH);
        }

        console.log("TTS request — voiceId:", voiceId, "text length:", ttsText.length);

        // Flash v2.5 first (fast, 32 langs), fallback to multilingual v2 (high quality, 29 langs)
        const TTS_MODELS = ["eleven_flash_v2_5", "eleven_multilingual_v2"];
        let ttsRes: Response | null = null;
        let lastRawError = "";

        for (const model of TTS_MODELS) {
          ttsRes = await fetch(
            `${ELEVENLABS_BASE}/text-to-speech/${voiceId}`,
            {
              method: "POST",
              headers: {
                "xi-api-key": ELEVENLABS_API_KEY!,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: ttsText,
                model_id: model,
                voice_settings: { stability: 0.5, similarity_boost: 0.75 },
              }),
            }
          );

          if (ttsRes.ok) break;

          lastRawError = await ttsRes.text();
          console.error(`TTS model ${model} failed (${ttsRes.status}):`, lastRawError);

          // Quota exceeded — truncate to remaining credits and retry once
          try {
            const parsed = JSON.parse(lastRawError);
            if (parsed?.detail?.status === "quota_exceeded" && parsed.detail.message) {
              const remainMatch = parsed.detail.message.match(/(\d+)\s*credits?\s*remaining/i);
              const remaining = remainMatch ? parseInt(remainMatch[1], 10) : 0;
              if (remaining > 50 && remaining < ttsText.length) {
                console.warn(`Quota low — truncating TTS text from ${ttsText.length} to ${remaining} chars`);
                ttsText = ttsText.slice(0, remaining);
                ttsRes = await fetch(
                  `${ELEVENLABS_BASE}/text-to-speech/${voiceId}`,
                  {
                    method: "POST",
                    headers: {
                      "xi-api-key": ELEVENLABS_API_KEY!,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      text: ttsText,
                      model_id: model,
                      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
                    }),
                  }
                );
                if (ttsRes.ok) break;
                lastRawError = await ttsRes.text();
              } else if (remaining <= 50) {
                send({ step: "synthesize", status: "error", error: "ElevenLabs 무료 크레딧이 소진되었습니다. 매월 자동 리셋됩니다." });
                controller.close();
                return;
              }
            }
          } catch { /* not JSON, continue normal flow */ }

          // If 401/403, try next model (might be plan restriction)
          if ((ttsRes.status === 401 || ttsRes.status === 403) && model !== TTS_MODELS[TTS_MODELS.length - 1]) {
            continue;
          }

          // Final model also failed — send user-friendly error
          let userError = `Text-to-speech failed (${ttsRes.status}): ${lastRawError}`;
          try {
            const parsed = JSON.parse(lastRawError);
            if (parsed?.detail?.status === "quota_exceeded") {
              userError = "ElevenLabs 무료 크레딧이 부족합니다. 텍스트를 줄이거나 크레딧 리셋을 기다려주세요.";
            } else if (parsed?.detail?.message) {
              userError = parsed.detail.message;
            }
          } catch { /* use raw error */ }
          send({ step: "synthesize", status: "error", error: userError });
          controller.close();
          return;
        }

        const ttsBuffer = Buffer.from(await ttsRes!.arrayBuffer());
        const audioBase64 = ttsBuffer.toString("base64");

        send({
          step: "done",
          status: "done",
          transcription,
          translation,
          audioBase64,
          targetLang,
          isVideo,
        });
      } catch (error) {
        console.error("Dubbing error:", error);
        send({
          step: "error",
          status: "error",
          error: `Internal server error: ${error instanceof Error ? error.message : String(error)}`,
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Transfer-Encoding": "chunked",
    },
  });
}
