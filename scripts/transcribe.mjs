#!/usr/bin/env node
/**
 * Transcribe an mp4 (or any audio/video file ffmpeg can read) with whisper.cpp
 * and write word-level timestamps as JSON:
 *
 *   [{ "text": "Hello", "startMs": 0, "endMs": 320 }, ...]
 *
 * Usage:
 *   node scripts/transcribe.mjs <input.mp4> [output.json]
 *
 * Output defaults to <input>.json next to the input file.
 * Env overrides: WHISPER_MODEL (default base.en), WHISPER_THREADS.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { cpus, tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WHISPER_DIR = path.join(ROOT, "bin", "whisper.cpp");
const WHISPER_CLI = path.join(WHISPER_DIR, "build", "bin", "whisper-cli");
const MODEL = path.join(
  WHISPER_DIR,
  "models",
  `ggml-${process.env.WHISPER_MODEL ?? "base.en"}.bin`,
);

const die = (msg) => {
  console.error(`transcribe: ${msg}`);
  process.exit(1);
};

const run = (cmd, args) => {
  const res = spawnSync(cmd, args, { stdio: ["ignore", "ignore", "pipe"], encoding: "utf8" });
  if (res.error) die(`failed to run ${cmd}: ${res.error.message}`);
  if (res.status !== 0) die(`${path.basename(cmd)} exited with ${res.status}\n${res.stderr}`);
};

const [input, outArg] = process.argv.slice(2);
if (!input) die("usage: node scripts/transcribe.mjs <input.mp4> [output.json]");
if (!existsSync(input)) die(`input not found: ${input}`);
if (!existsSync(WHISPER_CLI)) die(`whisper-cli not found at ${WHISPER_CLI} — build whisper.cpp first`);
if (!existsSync(MODEL)) die(`model not found at ${MODEL} — run bin/whisper.cpp/models/download-ggml-model.sh base.en`);

const output =
  outArg ?? path.join(path.dirname(input), `${path.parse(input).name}.json`);
const tmp = mkdtempSync(path.join(tmpdir(), "transcribe-"));

try {
  // whisper.cpp wants 16 kHz mono 16-bit PCM WAV.
  const wav = path.join(tmp, "audio.wav");
  run("ffmpeg", ["-y", "-loglevel", "error", "-i", input, "-vn", "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);

  // -ml 1 + -sow makes every segment a single word, with ms offsets.
  const base = path.join(tmp, "result");
  run(WHISPER_CLI, [
    "-m", MODEL,
    "-f", wav,
    "-t", String(process.env.WHISPER_THREADS ?? Math.min(8, cpus().length)),
    "-ml", "1",
    "-sow",
    "-oj",
    "-of", base,
    "-np",
  ]);

  const { transcription = [] } = JSON.parse(readFileSync(`${base}.json`, "utf8"));
  const words = transcription
    .map((seg) => ({
      text: seg.text.trim(),
      startMs: seg.offsets.from,
      endMs: seg.offsets.to,
    }))
    // Drop empty segments and non-speech markers like [BLANK_AUDIO] or (music).
    .filter((w) => w.text && !/^[[(].*[\])]$/.test(w.text));

  writeFileSync(output, JSON.stringify(words, null, 2) + "\n");
  console.log(`Wrote ${words.length} words to ${output}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
