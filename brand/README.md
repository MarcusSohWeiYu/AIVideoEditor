# Brand sheet

Pulled from the homepage of https://www.sohweiyu.com/ (its "blueprint" theme).
Preview: `brand-sheet.png`, rendered from the `BrandSheet` still in `src/BrandSheet.tsx`:

```bash
npx remotion still BrandSheet brand/brand-sheet.png
```

## Files

| File | Use |
| --- | --- |
| `brand.json` | Source of truth for colours, fonts, type scale, shape |
| `src/brand.ts` | Remotion: `colors`, `fonts`, `type.*`, `blueprintPaper`, `loadBrandFonts()` |
| `brand.css` | HyperFrames / HTML: CSS variables, `@font-face`, `.bp-paper` etc. |
| `public/fonts/` | Self-hosted Plus Jakarta Sans (variable, 200–800) and Architects Daughter. Both SIL OFL. |

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `orange` | `#C4470A` | Primary accent: buttons, active caption word, lines, monogram border |
| `orangeDeep` | `#A93B06` | Accent text on white, hand-written notes |
| `ink` | `#21170F` | Headlines and body text (a warm near-black, not pure black) |
| `inkSoft` | `#62544A` | Secondary text |
| `paper` | `#FFFFFF` | Background |
| `sheetEdge` | `#E8B596` | Card borders, dividers |
| `rule` | `#F0DCCF` | Hairlines, subtle fills |
| `gridMinor` / `gridMajor` | orange at 6% / 15% | Blueprint grid, 24px / 120px |

Contrast: orange on white 4.9:1, orangeDeep on white 6.3:1, ink on white 17.6:1.
Orange on ink is only 3.6:1, so use that pairing for large text only.
`legacyCoral #FF8C5A` still shows up in older parts of the site (scrollbar, page glow). It isn't part of the core palette.

## Type

- **Plus Jakarta Sans** for everything. Headlines are 800 weight with tight tracking (-0.02 to -0.03em) and line-height around 1.
- **Architects Daughter** for short hand-written annotations only, in `orangeDeep`. Never for body copy or captions.

## Shape and style

- 2px corner radius and 1.5px orange outlines: square, drafted, technical.
- Blueprint grid paper backgrounds, dimension-line details, and a boxed "WY" monogram with corner brackets.

## Captions (suggested for reels)

Plus Jakarta Sans 800 in white over footage (or ink over paper). The word being spoken gets an orange `#C4470A` block behind it.
