import React from "react";
import { AbsoluteFill } from "remotion";
import { blueprintPaper, colors, fonts } from "./theme";

/** Fine paper grain, like the site's noise layer. */
export const Grain: React.FC<{ opacity?: number; seed?: number }> = ({ opacity = 0.06, seed = 3 }) => (
  <svg
    width={1080}
    height={1920}
    style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none", mixBlendMode: "multiply" }}
  >
    <filter id={`grain-${seed}`}>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={seed} stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
  </svg>
);

/** Blueprint grid paper with grain. `gridReveal` 0-1 draws the grid in from the top. */
export const Paper: React.FC<{ children?: React.ReactNode; gridReveal?: number }> = ({
  children,
  gridReveal = 1,
}) => (
  <AbsoluteFill style={{ background: colors.paper }}>
    <AbsoluteFill style={{ ...blueprintPaper, clipPath: `inset(0 0 ${(1 - gridReveal) * 100}% 0)` }} />
    <Grain />
    {children}
  </AbsoluteFill>
);

/**
 * White text with a black outline painted BEHIND the fill (two layers), the
 * HTML equivalent of the skill's SVG `paintOrder: "stroke"` caption.
 */
export const Outlined: React.FC<{
  children: string;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
}> = ({ children, color = "#fff", stroke = "#000", strokeWidth = 10 }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <span
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        color: stroke,
        WebkitTextStroke: `${strokeWidth}px ${stroke}`,
        strokeLinejoin: "round",
      }}
    >
      {children}
    </span>
    <span style={{ position: "relative", color }}>{children}</span>
  </span>
);

/** Drafting corner brackets around a box (top-left and bottom-right, as on the site). */
export const Brackets: React.FC<{
  offset?: number;
  arm?: number;
  width?: number;
  color?: string;
  spread?: number; // extra outward travel, for snapping in
}> = ({ offset = 14, arm = 30, width = 3, color = colors.orange, spread = 0 }) => {
  const o = -offset - spread;
  const line = { position: "absolute" as const, width: arm, height: arm, borderColor: color, borderStyle: "solid" };
  return (
    <>
      <div style={{ ...line, top: o, left: o, borderWidth: `${width}px 0 0 ${width}px` }} />
      <div style={{ ...line, bottom: o, right: o, borderWidth: `0 ${width}px ${width}px 0` }} />
    </>
  );
};

/** A dimension line |<---->| that draws from the left. */
export const DimLine: React.FC<{ width: number; progress?: number; color?: string; thickness?: number }> = ({
  width,
  progress = 1,
  color = colors.orange,
  thickness = 3,
}) => {
  const w = Math.max(0, width * progress);
  const tick = 22;
  if (progress <= 0.01) return <div style={{ height: tick + 4 }} />;
  return (
    <svg width={width + 4} height={tick + 4} style={{ display: "block", overflow: "visible" }}>
      <g stroke={color} strokeWidth={thickness} fill="none" strokeLinecap="square">
        <line x1={2} y1={2} x2={2} y2={tick + 2} />
        <line x1={2} y1={tick / 2 + 2} x2={2 + w} y2={tick / 2 + 2} />
        <polyline points={`14,${tick / 2 - 6} 4,${tick / 2 + 2} 14,${tick / 2 + 10}`} />
        {progress >= 0.999 ? (
          <>
            <polyline points={`${width - 10},${tick / 2 - 6} ${width},${tick / 2 + 2} ${width - 10},${tick / 2 + 10}`} />
            <line x1={width + 2} y1={2} x2={width + 2} y2={tick + 2} />
          </>
        ) : null}
      </g>
    </svg>
  );
};

/** The boxed WY monogram. `draw` 0-1 traces the box; `letters` 0-1 raises the letters. */
export const Monogram: React.FC<{ size: number; draw?: number; letters?: number; bracketSpread?: number }> = ({
  size,
  draw = 1,
  letters = 1,
  bracketSpread = 0,
}) => {
  const per = size * 4;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <rect
          x={3}
          y={3}
          width={size - 6}
          height={size - 6}
          fill={colors.paper}
          stroke={colors.orange}
          strokeWidth={6}
          strokeDasharray={per}
          strokeDashoffset={per * (1 - draw)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          color: colors.orangeDeep,
          fontFamily: fonts.body,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          fontSize: size * 0.42,
        }}
      >
        <span style={{ transform: `translateY(${(1 - letters) * size * 0.7}px)` }}>WY</span>
      </div>
      {draw > 0.95 ? <Brackets offset={size * 0.1} arm={size * 0.18} width={4} spread={bracketSpread} /> : null}
    </div>
  );
};

/** Stand-in for a talking-head take, until real footage is used. */
export const StandIn: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: "#1f1610" }}>
    <AbsoluteFill style={{ background: "linear-gradient(175deg,#6b5646 0%,#3a2b21 55%,#1f1610 100%)" }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <g fill="#140d09" opacity={0.6}>
          <ellipse cx={540} cy={1760} rx={440} ry={340} />
          <rect x={472} y={1040} width={136} height={300} />
          <ellipse cx={540} cy={850} rx={185} ry={235} />
        </g>
        {/* mic windscreen: captions sit on its top edge (~y1350) */}
        <ellipse cx={540} cy={1420} rx={96} ry={72} fill="#0b0705" opacity={0.85} />
      </svg>
    </AbsoluteFill>
    <Grain opacity={0.1} seed={7} />
    <div
      style={{
        position: "absolute",
        top: 48,
        right: 56,
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
      }}
    >
      stand-in footage
    </div>
    {children}
  </AbsoluteFill>
);
