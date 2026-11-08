#!/usr/bin/env node
/**
 * Render every Brand Lab sample to out/brand-lab/clips/ (one bundle, many renders),
 * plus a poster frame per clip. Usage: node scripts/render-brand-lab.mjs [scale=0.5]
 */
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out", "brand-lab", "clips");
const scale = Number(process.argv[2] ?? 0.5);
mkdirSync(OUT, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.join(ROOT, "src", "index.ts") });
for (let n = 1; n <= 20; n++) {
  const id = `BrandLab${String(n).padStart(2, "0")}`;
  const composition = await selectComposition({ serveUrl, id });
  const file = path.join(OUT, `sample${String(n).padStart(2, "0")}`);
  await renderMedia({ serveUrl, composition, codec: "h264", crf: 24, scale, outputLocation: `${file}.mp4`, logLevel: "error" });
  await renderStill({ serveUrl, composition, frame: Math.min(composition.durationInFrames - 1, 60), scale, imageFormat: "jpeg", jpegQuality: 80, output: `${file}.jpg`, logLevel: "error" });
  console.log(`${id} -> ${path.relative(ROOT, file)}.mp4`);
}
