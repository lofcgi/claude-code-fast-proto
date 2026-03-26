import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "./ffmpeg-instance";

const MAX_SECONDS = 60;

/**
 * Get the duration of a media file using the browser's built-in decoder.
 * Works on both mobile and desktop without FFmpeg.
 */
function getMediaDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const el = file.type.startsWith("video/")
      ? document.createElement("video")
      : document.createElement("audio");

    el.preload = "metadata";

    el.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      if (isFinite(el.duration)) {
        resolve(el.duration);
      } else {
        // Some formats report Infinity until more data is loaded
        el.currentTime = 1e10;
        el.ontimeupdate = () => {
          el.ontimeupdate = null;
          resolve(el.duration);
        };
      }
    };

    el.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to read media duration"));
    };

    el.src = url;
  });
}

/**
 * Trim a media file to a specific range using FFmpeg.wasm (client-side).
 * Uses stream copy (-c copy) to avoid re-encoding — fast and low memory.
 * Returns the original file unchanged if duration <= maxSeconds and startTime is 0.
 */
export async function trimMedia(
  file: File,
  maxSeconds = MAX_SECONDS,
  startTime = 0,
): Promise<{ file: File; trimmed: boolean; originalDuration: number }> {
  const duration = await getMediaDuration(file);

  if (duration <= maxSeconds && startTime === 0) {
    return { file, trimmed: false, originalDuration: duration };
  }

  const ff = await getFFmpeg();
  const ext = file.name.split(".").pop() || "mp3";
  const inputName = `trim_input.${ext}`;
  const outputName = `trim_output.${ext}`;

  try {
    await ff.writeFile(inputName, await fetchFile(file));

    const isVideo = file.type.startsWith("video/");
    const args = [
      "-y",
      ...(startTime > 0 ? ["-ss", String(startTime)] : []),
      "-i",
      inputName,
      "-t",
      String(maxSeconds),
      ...(isVideo
        ? ["-c:v", "copy", "-c:a", "aac", "-movflags", "+faststart"]
        : ["-c", "copy"]),
      outputName,
    ];

    await ff.exec(args);

    const data = await ff.readFile(outputName);
    const uint8 =
      data instanceof Uint8Array
        ? data
        : new TextEncoder().encode(data as string);

    const ab = new ArrayBuffer(uint8.byteLength);
    new Uint8Array(ab).set(uint8);

    const trimmedFile = new File([ab], file.name, { type: file.type });
    return { file: trimmedFile, trimmed: true, originalDuration: duration };
  } catch (err) {
    throw new Error(
      err instanceof Error && err.message.includes("media processor")
        ? err.message
        : "Failed to trim media. Try a smaller file or different format.",
    );
  } finally {
    // Cleanup virtual FS regardless of success/failure
    try {
      await ff.deleteFile(inputName);
    } catch { /* ignore */ }
    try {
      await ff.deleteFile(outputName);
    } catch { /* ignore */ }
  }
}
