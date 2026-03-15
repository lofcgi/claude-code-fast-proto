import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;

async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;

  ffmpeg = new FFmpeg();
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  return ffmpeg;
}

/**
 * Merge original video (muted) with dubbed audio into a single MP4.
 * Runs entirely in the browser via ffmpeg.wasm.
 */
export async function mergeVideoWithAudio(
  videoFile: File,
  audioBlob: Blob
): Promise<Blob> {
  const ff = await getFFmpeg();

  const videoExt = videoFile.name.split(".").pop() || "mp4";
  await ff.writeFile(`input.${videoExt}`, await fetchFile(videoFile));
  await ff.writeFile("audio.mp3", await fetchFile(audioBlob));

  // Replace original audio with dubbed audio, keep video stream as-is
  await ff.exec([
    "-i", `input.${videoExt}`,
    "-i", "audio.mp3",
    "-c:v", "copy",
    "-c:a", "aac",
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-shortest",
    "-movflags", "+faststart",
    "output.mp4",
  ]);

  const data = await ff.readFile("output.mp4");
  const uint8 = data instanceof Uint8Array ? data : new TextEncoder().encode(data as string);

  // Cleanup
  await ff.deleteFile(`input.${videoExt}`);
  await ff.deleteFile("audio.mp3");
  await ff.deleteFile("output.mp4");

  // Copy into a plain ArrayBuffer to satisfy TypeScript's BlobPart constraint
  const ab = new ArrayBuffer(uint8.byteLength);
  new Uint8Array(ab).set(uint8);
  return new Blob([ab], { type: "video/mp4" });
}
