# Brand sheet: Soh Wei Yu

> **Status: approved in part (Brand Lab round 1, 2026-11-08).** Colour and
> type are pulled from https://www.sohweiyu.com/ (the homepage's "blueprint"
> theme). Captions, hooks and motifs below come from your Brand Lab ratings.
> Still open: the serif accent face (round 2) and music.
>
> Brand Lab: https://claude.ai/artifact/1f7A9NnLxVe7oDAgyJSdJY. Every sample
> is a composition (`BrandLab01`-`BrandLab30`, `src/brand-lab/samples.tsx`);
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
- **Serif accent (on trial, round 2):** Instrument Serif, regular and italic,
  after your two inspo images: the italic for the word that matters, with a
  soft white glow over footage (`GLOW` in `src/brand-lab/samples.tsx`).
  Closest free match to the inspo, not necessarily the exact font. Samples 21-30.

## 3. Captions

**Default: orange block (Brand Lab #1, kept).** Plus Jakarta Sans 800, 78px,
casual lowercase, 1-3 words. The word being spoken sits on an `orange` block
(2px corners, white text); the others are white with the skill's black outline
(10px, painted behind the fill). Over a light ground, measure first
(`caption-tone.py`) and switch the outline per the skill.

- Paper chip (#3): maybe; a mixed-type retry is #24.
- Dropped: dimension underline (#4). Too plain: the bare TikTok outline (#2);
  use it only for brand deals.
- On trial (round 2): serif italic emphasis words (#21-#24).

Placement is measured per take (on the top of the mic windscreen, never on the
chin), per `references/captions.md`.

## 4. Hooks and titles

- **Hook: bracket card (#5, kept).** Plus Jakarta Sans 800 in `ink` on a white
  card, 3px `orange` outline, corner brackets, static from frame 0, top ~y300.
  On trial: serif italic payoff (#25), glowing serif with no card (#26).
- **Title card: blueprint title (#8, kept).** The grid draws down, the headline
  rises line by line, a dimension line and a hand-written note finish it.
  On trial: serif payoff line (#27), serif headline (#28), cinematic word (#29).

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
with buttons (#20). A sign-off replacement is on trial (#30).

## 6. Music (to confirm)

Beds you like and where they live: `public/music pack/`. Sound effects:
`public/sound pack/`. Both empty so far.
