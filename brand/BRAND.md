# Brand sheet: Soh Wei Yu

> **Status: draft, waiting for your yes.** Colour and type are pulled from
> https://www.sohweiyu.com/ (the homepage's "blueprint" theme). Captions,
> hooks and music are not on the site, so they are proposals or open
> questions, marked below. No video uses this sheet until it is approved.

Preview: `brand-sheet.png` (the `BrandSheet` still, `src/BrandSheet.tsx`):

```bash
npx remotion still BrandSheet brand/brand-sheet.png
```

## Theme code

| File | Use |
| --- | --- |
| `brand.json` | Source of truth: colours, fonts, type scale, shape |
| `theme.ts` | Remotion: `colors`, `fonts`, `type.*`, `blueprintPaper`, `loadBrandFonts()` |
| `brand.css` | HyperFrames / HTML: CSS variables, `@font-face`, `.bp-paper`, `.bp-display`, `.bp-hand` |
| `../public/fonts/` | Self-hosted Plus Jakarta Sans (variable 200-800) and Architects Daughter, both SIL OFL |

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

## 3. Captions (to confirm)

Two treatments; pick a default:

- **A. Brand (proposed):** Plus Jakarta Sans 800, casual lowercase, 1-3 words.
  The active word sits on an `orange` block (2px corners), the rest white.
  Needs the skill's SVG stroke (`paintOrder: "stroke"`, black outline) on the
  white words so they read over light backgrounds; the mock on the brand sheet
  shows it without the outline.
- **B. Skill default:** the outlined TikTok caption (`Caption.tsx`: Inter 800,
  78px, white with a 10px black outline).

Placement is measured per take (on the top of the mic windscreen, never on the
chin), per `references/captions.md`.

## 4. Hooks and titles (to confirm)

- Default hook: the skill's IG-native `TextHook` (white / black / plain), or a
  brand option: Plus Jakarta Sans 800 in `ink` on a white card with a 1.5px
  `orange` outline, like the site's buttons.

## 5. Motifs

From the site, for full-screen graphics and cards:

- **Blueprint paper**: white ground, orange grid (24 / 120px).
- **Drafting details**: dimension lines with end ticks under a key word, corner
  brackets around a framed object, the boxed **WY** monogram.
- **Shape**: 2px corners, 1.5px orange outlines; square and technical, not rounded.
- **Hand-written margin notes** in Architects Daughter, sparingly.
- Filled `orange` buttons/pills with white text; outlined secondaries.

## 6. Music (to confirm)

Beds you like and where they live: `public/music pack/`. Sound effects:
`public/sound pack/`. Both empty so far.
