import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import tokens from "./brand.json";

/** Brand tokens from brand/brand.json (pulled from sohweiyu.com). */
export const brand = tokens;
export const colors = tokens.colors;

export const fonts = {
  body: `"${tokens.fonts.body.family}", ${tokens.fonts.body.fallback}`,
  hand: `"${tokens.fonts.hand.family}", ${tokens.fonts.hand.fallback}`,
  serif: `"${tokens.fonts.serif.family}", ${tokens.fonts.serif.fallback}`,
} as const;

/** Text styles matching the website's type scale. Spread into `style`. */
export const type = Object.fromEntries(
  Object.entries(tokens.type).map(([k, t]) => [
    k,
    {
      fontFamily: fonts[t.font as keyof typeof fonts],
      fontWeight: t.weight,
      lineHeight: t.lineHeight,
      letterSpacing: t.letterSpacing,
    },
  ]),
) as Record<keyof typeof tokens.type, React.CSSProperties>;

/** Blueprint grid paper background (24px minor, 120px major). */
export const blueprintPaper: React.CSSProperties = {
  backgroundColor: colors.paper,
  backgroundImage: [
    `linear-gradient(${colors.gridMajor} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${colors.gridMajor} 1px, transparent 1px)`,
    `linear-gradient(${colors.gridMinor} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${colors.gridMinor} 1px, transparent 1px)`,
  ].join(", "),
  backgroundSize: `${tokens.shape.gridMajorPx}px ${tokens.shape.gridMajorPx}px, ${tokens.shape.gridMajorPx}px ${tokens.shape.gridMajorPx}px, ${tokens.shape.gridMinorPx}px ${tokens.shape.gridMinorPx}px, ${tokens.shape.gridMinorPx}px ${tokens.shape.gridMinorPx}px`,
};

let fontsLoaded: Promise<unknown> | null = null;
/** Self-hosted brand fonts from public/fonts. Call once at module load. */
export const loadBrandFonts = () => {
  fontsLoaded ??= Promise.all([
    loadFont({
      family: tokens.fonts.body.family,
      url: staticFile(tokens.fonts.body.file),
      weight: "200 800",
    }),
    loadFont({
      family: tokens.fonts.hand.family,
      url: staticFile(tokens.fonts.hand.file),
      weight: "400",
    }),
    loadFont({
      family: tokens.fonts.serif.family,
      url: staticFile(tokens.fonts.serif.file),
      weight: "400",
      style: "normal",
    }),
    loadFont({
      family: tokens.fonts.serif.family,
      url: staticFile(tokens.fonts.serif.italicFile),
      weight: "400",
      style: "italic",
    }),
  ]);
  return fontsLoaded;
};
