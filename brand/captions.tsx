import React from "react";
import { colors, fonts } from "./theme";

// ---------------------------------------------------------------------------
// The creator's caption and hook styles, approved in the Brand Lab
// (brand/BRAND.md sections 3-4). Over footage only: on a light caption band
// (caption-tone.py > ~140) use the orange-block option (Brand Lab #1) instead.
// ---------------------------------------------------------------------------

/** Soft white bloom for serif type over footage. */
export const GLOW = "0 0 10px rgba(255,255,255,0.55), 0 0 28px rgba(255,236,214,0.45), 0 0 64px rgba(255,214,180,0.28)";
/** Warm bloom that keeps brand orange readable on dark footage. */
export const ORANGE_GLOW = "0 0 8px rgba(196,71,10,0.65), 0 0 26px rgba(224,102,42,0.55), 0 0 64px rgba(255,140,90,0.32)";

export const SERIF: React.CSSProperties = { fontFamily: fonts.serif, fontStyle: "normal", fontWeight: 400, letterSpacing: "-0.01em" };
export const SERIF_IT: React.CSSProperties = { ...SERIF, fontStyle: "italic" };
/** The word that matters: brand orange serif italic. */
export const EMPH_ORANGE: React.CSSProperties = { ...SERIF_IT, color: colors.orange, textShadow: ORANGE_GLOW };

export type BrandWord = { text: string; emph?: boolean };

/**
 * Caption default (Brand Lab #31): Instrument Serif, casual lowercase, 1-3
 * words, white with a soft glow; at most one emphasis word per chunk, in
 * orange serif italic. `top` is the line box's top edge, measured per take
 * (the line sits on the mic windscreen top, never on the chin). Captions
 * appear and disappear with their chunk: no motion.
 */
export const GlowCaption: React.FC<{ words: BrandWord[]; top: number; size?: number }> = ({ words, top, size = 104 }) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      right: 90,
      top,
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      gap: Math.round(size * 0.21),
      fontSize: size,
      color: "#fff",
      textShadow: GLOW,
    }}
  >
    {words.map((w, i) => (
      <span key={i} style={w.emph ? EMPH_ORANGE : SERIF}>
        {w.text}
      </span>
    ))}
  </div>
);

/**
 * Hook default (Brand Lab #32): Instrument Serif ~132px, white with glow, no
 * card, static from frame 0, top ~y290; the payoff phrase in orange italic.
 * Each line is a list of runs.
 */
export const GlowHook: React.FC<{ lines: BrandWord[][]; top?: number; size?: number }> = ({ lines, top = 290, size = 132 }) => (
  <div style={{ position: "absolute", top, left: 90, right: 90, textAlign: "center", color: "#fff", textShadow: GLOW }}>
    {lines.map((runs, i) => (
      <div key={i} style={{ ...SERIF, fontSize: size, lineHeight: 0.95 }}>
        {runs.map((r, j) => (
          <span key={j} style={r.emph ? EMPH_ORANGE : undefined}>
            {r.text}
          </span>
        ))}
      </div>
    ))}
  </div>
);
