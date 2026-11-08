# AI Video Editor (Soh Wei Yu's reels)

Vertical short-form reels, 1080x1920 @ 30fps, built in Remotion. The creator
films a talking head, describes the edit in plain language, and Claude builds
it in code.

## How to work here

- **Edit with the `remotion-reel` skill** (`.claude/skills/remotion-reel/`).
  It owns the pipeline: transcode, transcribe, measure, map the brief to
  frames, build, verify, render. Follow it, including "propose before building"
  for anything with creative latitude.
- **The look comes from `brand/BRAND.md`** (approved in the Brand Lab,
  2026-11-08). Read it before proposing graphics or captions. Code:
  `brand/captions.tsx` (`GlowCaption`, `GlowHook`), `brand/components.tsx`
  (blueprint `Paper`, `Brackets`, `DimLine`, `Monogram`, ...), `brand/theme.ts`.
- **Build graphics from the kept Brand Lab samples** in
  `src/brand-lab/samples.tsx` (`BrandLab01`-`BrandLab32`; which are kept is in
  BRAND.md). Don't reintroduce the retired looks listed there.
- Brand Lab review page: https://claude.ai/artifact/1f7A9NnLxVe7oDAgyJSdJY
  (ratings in its db: `review/round-1..3`).

## Creator preferences (from conversation)

- **Recordings stay on this Mac.** Never commit or push video files; they are
  git-ignored. Edit in a local session.
- **First reel: no music and no sound effects.** Ask before adding either.
  `public/music pack/` and `public/sound pack/` are empty.
- Big type goes over the footage; "too corporate" = buttons and serif headlines
  on paper cards. Paper is for data and explainers.

## Setup state

- ffmpeg, whisper.cpp (`bin/whisper.cpp`, models `base.en` + `small`) via
  `npm run setup:whisper`. Skill scripts need `pip3 install numpy pillow`.
- Transcribe: `npm run transcribe -- public/recordings/<name>.mp4` writes
  `<name>.words.json`. Never re-transcribe an unchanged file.
- Raw `.MOV` must be transcoded to H.264 mp4 first (skill, step 1).
- `out/` holds rendered deliverables and is git-ignored.
- Checks: `npm run lint` (ESLint + tsc).

## Status

- Hook take: `public/recordings/Hook.MOV` on the Mac, not yet transcoded or
  edited. Its old `Hook.json` predates the `.words.json` naming; regenerate it
  from the mp4.
