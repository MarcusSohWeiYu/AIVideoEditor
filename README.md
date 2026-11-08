# AI Video Editor — vertical reels

Remotion project for vertical short-form reels: **1080x1920 @ 30fps**.

## Requirements

- Node 20.19+ / 22.13+ / 24+
- ffmpeg (`brew install ffmpeg` on macOS)
- git, cmake and a C/C++ compiler (for whisper.cpp)
- Google Chrome (HyperFrames renders with it)

## Setup

```bash
npm install
npm run setup:whisper   # clones + builds bin/whisper.cpp and downloads the base.en model
npx hyperframes doctor  # checks Chrome, ffmpeg etc. for HyperFrames
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Open Remotion Studio |
| `npx remotion render Reel out/reel.mp4` | Render the `Reel` composition |
| `npm run transcribe -- <file.mp4> [out.json]` | Word-level transcript via whisper.cpp |
| `npm run lint` | ESLint + TypeScript check |

`transcribe` writes `[{ "text", "startMs", "endMs" }, ...]`, one entry per word,
to `<file>.json` next to the input unless an output path is given.
Set `WHISPER_MODEL` (e.g. `small.en`) to use a different downloaded model.

## Layout

```
src/                     Remotion compositions (Reel = 1080x1920 @ 30fps)
scripts/                 transcribe.mjs, setup-whisper.sh
bin/whisper.cpp/         whisper.cpp build + models (git-ignored)
public/recordings/       talking-head footage
public/screen-recordings/
public/images/
public/sound pack/       SFX
public/music pack/       background music
hyperframes/             HyperFrames HTML compositions
brand/                   logos, fonts, colours
out/                     rendered videos (git-ignored)
```
