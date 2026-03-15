import { NextResponse } from "next/server";
import { auth } from "@/auth";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json(
      { error: "ElevenLabs API key is not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(`${ELEVENLABS_BASE}/voices`, {
    headers: { "xi-api-key": ELEVENLABS_API_KEY },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 502 }
    );
  }

  const data = await res.json();

  // Free tier API can only use premade (default) voices — library voices return 402
  const voices = (data.voices || [])
    .filter((v: { category: string }) => v.category === "premade")
    .map(
      (v: { voice_id: string; name: string; category: string; preview_url?: string; labels?: Record<string, string> }) => ({
        id: v.voice_id,
        name: v.name,
        category: v.category,
        previewUrl: v.preview_url || null,
        accent: v.labels?.accent || null,
        gender: v.labels?.gender || null,
      })
    );

  return NextResponse.json({ voices });
}
