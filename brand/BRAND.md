# Brand sheet: Soh Wei Yu

> **Status: approved (Brand Lab rounds 1-3, 2026-11-08).** Colour and type
> are pulled from https://www.sohweiyu.com/ (the homepage's "blueprint"
> theme). Captions, hooks and motifs below are your Brand Lab picks.
> Still open: music.
>
> Brand Lab: https://claude.ai/artifact/1f7A9NnLxVe7oDAgyJSdJY. Every sample
> is a composition (`BrandLab01`-`BrandLab32`, `src/brand-lab/samples.tsx`);
> build from the kept ones.

Preview: `brand-sheet.png` (the `BrandSheet` still, `src/BrandSheet.tsx`):

```bash
npx remotion still BrandSheet brand/brand-sheet.png
```

## Theme code

| File | Use |
| --- | --- |
| `brand.json` | Source of truth: colours, fonts, type scale, shape |
| `theme.ts` | Remotion: `colors`, `fonts`, `type.*`, `blueprintPaper`, `loadBrandFonts()` |
| `captions.tsx` | Your caption and hook: `GlowCaption`, `GlowHook`, plus `GLOW`, `ORANGE_GLOW`, `EMPH_ORANGE` |
| `components.tsx` | Shared brand pieces: blueprint `Paper` + grain, `Outlined` text, `Brackets`, `DimLine`, `Monogram` |
| `brand.css` | HyperFrames / HTML: CSS variables, `@font-face`, `.bp-paper`, `.bp-display`, `.bp-hand` |
| `../public/fonts/` | Self-hosted Plus Jakarta Sans (variable 200-800), Architects Daughter and Instrument Serif (regular + italic), all SIL OFL |

## 1. Colour

| Role | Token | Hex |
| --- | --- | --- |
| Ground | `paper` | `#FFFFFF` (white paper with the blueprint grid) |
| Main: headlines, body | `ink` | `#21170F` (warm near-black, not pure black) |
| Accent: shapes, buttons, active caption word, lines | `orange` | `#C4470A` |
| Accent text on white, hand-written notes | `orangeDeep` | `#A93B06` |
| Secondary text | `inkSoft` | `#62544A` |
| Card borders, dividers | `sheetEdge` | `#E8B596` |
| Hairlines, subtle fills | `rule` | `#F0DCCF` |
| Blueprint grid | `gridMinor` / `gridMajor` | orange at 6% / 15%, every 24px / 120px |

Contrast: orange on white 4.9:1, orangeDeep on white 6.3:1, ink on white 17.6:1.
Orange on ink is 3.6:1, so large text only.

**Never over video:** the grid colours, `rule` and `sheetEdge`; they vanish on
footage. Over video, use white, ink and `orange` only.

Retired: `legacyCoral #FF8C5A` / `#FF7043` (older parts of the site). Not used.

## 2. Type

- **Headline:** Plus Jakarta Sans 800, tracking -0.02 to -0.03em, line height ~1.
- **Accent face:** Architects Daughter 400 in `orangeDeep`, for short
  hand-written annotations only (the site's "Scroll to see my work" notes).
  Never for body copy or captions.
- **Label / UI:** Plus Jakarta Sans 600-700.
- **Caption face:** Plus Jakarta Sans 800 (see 3).
- **Serif (kept, round 2):** Instrument Serif, regular and italic, after your
  two inspo images. Over footage it carries a soft white glow (`GLOW` in
  `src/brand-lab/samples.tsx`); the word that matters is the italic in brand
  `orange` with a warm orange glow (`EMPH_ORANGE`). Closest free match to the
  inspo, not necessarily the exact font.
- **Don't mix the two faces inside one line** (#21, #22, #24, #25 dropped):
  a line is either all serif or all sans.

## 3. Captions

**Default: glow serif (#31, kept in round 3; `GlowCaption`).** Instrument Serif,
~104px, casual lowercase, 1-3 words, white with a soft glow; the key word in
`orange` serif italic with a warm glow. No outline. Pick the key word per chunk
(the one he leans on), at most one per chunk.

- **Option: orange block (#1, kept in round 1).** Plus Jakarta Sans 800, the
  spoken word on an `orange` block, others white with the skill's black
  outline. Use it where the glow serif can't read: **a light ground behind the
  caption band** (measure with `caption-tone.py`; above ~140 the glow vanishes).
- Paper chip (#3): maybe, never resolved; the mixed retry (#24) was dropped.
- Dropped: dimension underline (#4), mixed sans + serif lines (#21, #22).
  Too plain: the bare TikTok outline (#2); brand deals only.

Placement is measured per take (on the top of the mic windscreen, never on the
chin), per `references/captions.md`.

## 4. Hooks and titles

- **Hook default: glow serif (#32, kept in round 3; `GlowHook`).**
  Instrument Serif ~132px, white with glow, no card, top ~y290, static from
  frame 0; the payoff phrase in `orange` italic.
- **Hook option: bracket card (#5, kept in round 1)**, for light footage.
  Its serif-payoff version (#25) was dropped.
- **Cinematic word (#29, kept):** one giant glowing serif italic word over the
  take for the line he leans on; captions hide while it is up (words appear once).
- **Title card: blueprint title (#8, kept in round 1).** Sans only: the serif
  title cards (#27, #28) read as too corporate.
- **Sign-off (#30, kept):** "see you *next build.*" in glowing serif over the
  take, the URL under it. Replaces the end card.

**Direction from the notes:** "too corporate" came up three times (#20, #27,
#28): buttons and serif type on paper cards. Big type goes over the footage,
not on a paper card; paper stays for data and explainers.

## 5. Motifs

Kept in the Brand Lab, so use these:

- **Data:** stat counter with an orange ruler (#11), drafted bars with the
  result bar in orange (#12), checklist card with the site's orange diamonds (#13).
- **Explain:** blueprint flow, the orange line lighting each step (#14);
  screenshot callout, big and centred with a drafted box on the key line (#15);
  project spec table built row by row (#16).
- **Transition:** sheet slide, blueprint paper with a ruler edge sliding up
  over the take (#18).
- **Lower third:** bracketed name tag (#19).

Always: blueprint paper (white ground, orange grid 24 / 120px), 2px corners,
1.5px orange outlines, hand-written margin notes in Architects Daughter used
sparingly, the boxed **WY** monogram.

**Retired (dropped in the Brand Lab):** grid wipe (#17), the corporate end card
with buttons (#20), serif headline cards on paper (#27, #28).

## 6. Music (to confirm)

Beds you like and where they live: `public/music pack/`. Sound effects:
`public/sound pack/`. Both empty so far.
