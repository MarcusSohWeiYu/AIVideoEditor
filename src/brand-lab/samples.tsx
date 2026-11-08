import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Brackets, DimLine, Grain, Monogram, Outlined, Paper, StandIn } from "../../brand/components";
import { brand, colors, fonts, loadBrandFonts, type } from "../../brand/theme";

loadBrandFonts();

// ---------------------------------------------------------------------------
// Brand Lab: 20 short motion samples in the sohweiyu.com brand, for rating.
// Every sample is 1080x1920 @ 30fps and keeps its content inside x90-990 and
// the IG 4:5 band y285-1635. Graphics start already moving (no fade-ins).
// ---------------------------------------------------------------------------

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SNAP = { damping: 14, stiffness: 170, mass: 0.9 };
const SOFT = { damping: 20, stiffness: 120 };
const CARD_SHADOW = "0 18px 46px rgba(33,23,15,0.22)";

const useSp = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (delay: number, config: object = SNAP) => spring({ frame: f - delay, fps, config });
};
const ramp = (f: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [a, b], [0, 1], { ...CLAMP, easing: ease });

/** A line of text that rises out of a mask (a reveal, not a fade). */
const Rise: React.FC<{ p: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  p,
  children,
  style,
}) => (
  <div style={{ overflow: "hidden", paddingBottom: "0.08em", ...style }}>
    <div style={{ transform: `translateY(${(1 - p) * 110}%)` }}>{children}</div>
  </div>
);

// ---- captions --------------------------------------------------------------

type W = { t: string; f: number };
const LINE: W[] = [
  { t: "most", f: 0 },
  { t: "apps", f: 8 },
  { t: "die", f: 16 },
  { t: "because", f: 30 },
  { t: "nobody", f: 42 },
  { t: "actually", f: 56 },
  { t: "uses", f: 68 },
  { t: "them", f: 76 },
];
const CHUNKS = [
  [0, 3],
  [3, 5],
  [5, 8],
];
const CAPTION_TOP = 1300; // the line sits on the stand-in's mic top (~y1350)

const useCaption = () => {
  const f = useCurrentFrame();
  let chunk = CHUNKS[0];
  for (const c of CHUNKS) if (f >= LINE[c[0]].f) chunk = c;
  const words = LINE.slice(chunk[0], chunk[1]);
  let active = 0;
  words.forEach((w, i) => {
    if (f >= w.f) active = i;
  });
  return { words, active };
};

const CaptionRow: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 18 }) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      right: 90,
      top: CAPTION_TOP,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap,
      fontFamily: fonts.body,
      fontWeight: 800,
      fontSize: 78,
      letterSpacing: -2,
      lineHeight: 1.15,
    }}
  >
    {children}
  </div>
);

const CaptionBlock: React.FC = () => {
  const { words, active } = useCaption();
  return (
    <StandIn>
      <CaptionRow gap={14}>
        {words.map((w, i) =>
          i === active ? (
            <span
              key={w.t}
              style={{ background: colors.orange, color: colors.paper, padding: "0 14px", borderRadius: brand.shape.radius }}
            >
              {w.t}
            </span>
          ) : (
            <Outlined key={w.t}>{w.t}</Outlined>
          ),
        )}
      </CaptionRow>
    </StandIn>
  );
};

const CaptionOutline: React.FC = () => {
  const { words } = useCaption();
  return (
    <StandIn>
      <CaptionRow>
        <Outlined>{words.map((w) => w.t).join(" ")}</Outlined>
      </CaptionRow>
    </StandIn>
  );
};

const CaptionChip: React.FC = () => {
  const { words } = useCaption();
  return (
    <StandIn>
      <CaptionRow>
        <span
          style={{
            background: colors.paper,
            color: colors.ink,
            border: `3px solid ${colors.orange}`,
            borderRadius: brand.shape.radius,
            padding: "4px 26px 10px",
            fontSize: 70,
            boxShadow: CARD_SHADOW,
          }}
        >
          {words.map((w) => w.t).join(" ")}
        </span>
      </CaptionRow>
    </StandIn>
  );
};

const CaptionDim: React.FC = () => {
  const { words, active } = useCaption();
  return (
    <StandIn>
      <CaptionRow>
        {words.map((w, i) => (
          <span key={w.t} style={{ position: "relative", display: "inline-block" }}>
            <Outlined>{w.t}</Outlined>
            {i === active ? (
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -18, height: 10 }}>
                <div style={{ position: "absolute", inset: "3px 0", background: colors.orange }} />
                <div style={{ position: "absolute", left: 0, top: -6, width: 4, height: 22, background: colors.orange }} />
                <div style={{ position: "absolute", right: 0, top: -6, width: 4, height: 22, background: colors.orange }} />
              </div>
            ) : null}
          </span>
        ))}
      </CaptionRow>
    </StandIn>
  );
};

// ---- hooks (static from frame 0, like a native text sticker) ---------------

const HOOK_LINES = ["Most apps die", "for one reason"];

const HookCard: React.FC = () => (
  <StandIn>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          background: colors.paper,
          border: `3px solid ${colors.orange}`,
          borderRadius: brand.shape.radius,
          padding: "18px 40px 24px",
          textAlign: "center",
          color: colors.ink,
          ...type.heading,
          fontSize: 76,
          boxShadow: CARD_SHADOW,
        }}
      >
        {HOOK_LINES.map((l) => (
          <div key={l}>{l}</div>
        ))}
        <Brackets offset={16} arm={34} width={4} />
      </div>
    </div>
    <CaptionRow>
      <Outlined>{useCaption().words.map((w) => w.t).join(" ")}</Outlined>
    </CaptionRow>
  </StandIn>
);

const HookInk: React.FC = () => (
  <StandIn>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: colors.ink,
          borderRadius: brand.shape.radius,
          padding: "18px 40px 24px",
          textAlign: "center",
          color: colors.paper,
          ...type.heading,
          fontSize: 76,
          boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div>Most apps die</div>
        <div>
          for <span style={{ color: colors.orange }}>one reason</span>
        </div>
      </div>
    </div>
    <CaptionRow>
      <Outlined>{useCaption().words.map((w) => w.t).join(" ")}</Outlined>
    </CaptionRow>
  </StandIn>
);

const HookDimension: React.FC = () => (
  <StandIn>
    <div
      style={{
        position: "absolute",
        top: 300,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...type.heading,
        fontSize: 82,
        lineHeight: 1.1,
      }}
    >
      <Outlined>Most apps die</Outlined>
      <Outlined>for one reason</Outlined>
      <div style={{ marginTop: 14 }}>
        <DimLine width={560} thickness={4} />
      </div>
    </div>
    <CaptionRow>
      <Outlined>{useCaption().words.map((w) => w.t).join(" ")}</Outlined>
    </CaptionRow>
  </StandIn>
);

// ---- title type ------------------------------------------------------------

const TitleBlueprint: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const grid = ramp(f, 0, 22, Easing.out(Easing.cubic));
  return (
    <Paper gridReveal={grid}>
      <div style={{ position: "absolute", left: 110, right: 110, top: 640 }}>
        <Rise p={sp(6)} style={{ ...type.display, fontSize: 150, color: colors.ink }}>
          Products
        </Rise>
        <Rise p={sp(12)} style={{ ...type.display, fontSize: 150, color: colors.ink }}>
          people
        </Rise>
        <Rise p={sp(18)} style={{ ...type.display, fontSize: 150, color: colors.orange }}>
          actually use.
        </Rise>
        <div style={{ marginTop: 26 }}>
          <DimLine width={760} progress={ramp(f, 26, 46)} thickness={4} />
        </div>
        <div
          style={{
            ...type.annotation,
            fontSize: 44,
            color: colors.orangeDeep,
            marginTop: 22,
            transform: `translateX(${(1 - sp(44, SOFT)) * -40}px)`,
            clipPath: `inset(0 ${(1 - ramp(f, 44, 60)) * 100}% 0 0)`,
          }}
        >
          that&apos;s the whole job
        </div>
      </div>
    </Paper>
  );
};

const TitleStack: React.FC = () => {
  const sp = useSp();
  const words = ["Build.", "Ship.", "Learn.", "Repeat."];
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, top: 520 }}>
        {words.map((w, i) => (
          <Rise
            key={w}
            p={sp(i * 12)}
            style={{ ...type.display, fontSize: 190, color: i === words.length - 1 ? colors.orange : colors.ink }}
          >
            {w}
          </Rise>
        ))}
      </div>
    </Paper>
  );
};

const TitleMonogram: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  return (
    <Paper>
      <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Monogram size={300} draw={ramp(f, 0, 20)} letters={sp(14)} bracketSpread={(1 - sp(20)) * 60} />
      </div>
      <div style={{ position: "absolute", top: 1060, left: 0, right: 0, textAlign: "center" }}>
        <Rise p={sp(30)} style={{ ...type.heading, fontSize: 92, color: colors.ink }}>
          Soh Wei Yu
        </Rise>
        <Rise p={sp(36)} style={{ ...type.label, fontSize: 40, color: colors.inkSoft, marginTop: 8 }}>
          sohweiyu.com
        </Rise>
      </div>
    </Paper>
  );
};

// ---- data and proof --------------------------------------------------------

const DataStat: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const target = 47;
  const n = Math.round(target * ramp(f, 4, 44, Easing.out(Easing.cubic)));
  const ticks = 25;
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, right: 110, top: 560 }}>
        <div style={{ ...type.label, fontSize: 34, color: colors.inkSoft, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Sample stat
        </div>
        <div style={{ ...type.display, fontSize: 340, color: colors.ink, fontVariantNumeric: "tabular-nums" }}>
          {n}
          <span style={{ color: colors.orange }}>%</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 56, marginTop: 10 }}>
          {Array.from({ length: ticks }, (_, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: i % 5 === 0 ? 56 : 34,
                background: i / ticks < n / 100 ? colors.orange : colors.sheetEdge,
              }}
            />
          ))}
        </div>
        <Rise p={sp(30)} style={{ ...type.subheading, fontSize: 60, color: colors.ink, marginTop: 40 }}>
          fewer support tickets
        </Rise>
      </div>
    </Paper>
  );
};

const DataBars: React.FC = () => {
  const sp = useSp();
  const bars = [
    { label: "Before", v: 18 },
    { label: "Beta", v: 41 },
    { label: "Now", v: 74 },
  ];
  const base = 1360;
  const maxH = 640;
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, top: 380, ...type.heading, fontSize: 72, color: colors.ink }}>
        Weekly users
      </div>
      <div style={{ position: "absolute", left: 112, top: 470, ...type.annotation, fontSize: 36, color: colors.orangeDeep }}>
        sample data
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: base, height: 4, background: colors.ink }} />
      {bars.map((b, i) => {
        const p = sp(i * 9);
        const h = (b.v / 100) * maxH * p;
        const x = 150 + i * 280;
        return (
          <React.Fragment key={b.label}>
            <div
              style={{
                position: "absolute",
                left: x,
                top: base - h,
                width: 200,
                height: h,
                background: i === bars.length - 1 ? colors.orange : colors.sheetEdge,
                borderRadius: `${brand.shape.radius}px ${brand.shape.radius}px 0 0`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: x,
                width: 200,
                top: base - h - 84,
                textAlign: "center",
                ...type.heading,
                fontSize: 64,
                color: colors.ink,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(b.v * p)}k
            </div>
            <div style={{ position: "absolute", left: x, width: 200, top: base + 22, textAlign: "center", ...type.label, fontSize: 38, color: colors.inkSoft }}>
              {b.label}
            </div>
          </React.Fragment>
        );
      })}
    </Paper>
  );
};

const DataChecklist: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const items = ["Talk to 10 users", "Cut the feature list", "Ship the beta", "Charge from day one"];
  const card = sp(0, SOFT);
  return (
    <Paper>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 560,
          background: colors.paper,
          border: `2px solid ${colors.sheetEdge}`,
          borderRadius: brand.shape.radius,
          boxShadow: CARD_SHADOW,
          padding: "48px 56px 56px",
          transform: `translateY(${(1 - card) * 260}px)`,
        }}
      >
        <div style={{ ...type.heading, fontSize: 66, color: colors.ink, marginBottom: 30 }}>Launch checklist</div>
        {items.map((t, i) => {
          const on = f >= 22 + i * 12;
          const pop = sp(22 + i * 12);
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 28, padding: "16px 0", borderTop: `2px solid ${colors.rule}` }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  flex: "none",
                  transform: `rotate(45deg) scale(${on ? 0.8 + 0.2 * pop : 1})`,
                  border: `3px solid ${colors.orange}`,
                  background: on ? colors.orange : "transparent",
                }}
              />
              <div style={{ ...type.label, fontSize: 46, color: on ? colors.ink : colors.inkSoft }}>{t}</div>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

// ---- explain ---------------------------------------------------------------

const ExplainFlow: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const steps = ["Idea", "Prototype", "Ship to users"];
  const ys = [420, 860, 1300];
  const line = ramp(f, 12, 62, Easing.inOut(Easing.sin));
  const lineTop = ys[0] + 200;
  const lineLen = ys[2] - ys[0] - 200;
  return (
    <Paper>
      <div style={{ position: "absolute", left: 538, top: lineTop, width: 5, height: lineLen * line, background: colors.orange }} />
      {steps.map((s, i) => {
        const reached = line * lineLen >= ys[i] - lineTop - 4 || i === 0;
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: 220,
              width: 640,
              top: ys[i],
              height: 200,
              background: colors.paper,
              border: `4px solid ${reached ? colors.orange : colors.sheetEdge}`,
              borderRadius: brand.shape.radius,
              boxShadow: CARD_SHADOW,
              display: "flex",
              alignItems: "center",
              gap: 30,
              padding: "0 44px",
              transform: `translateY(${(1 - sp(i * 6)) * 120}px)`,
            }}
          >
            <div style={{ ...type.label, fontSize: 36, color: colors.orangeDeep, fontVariantNumeric: "tabular-nums" }}>0{i + 1}</div>
            <div style={{ ...type.heading, fontSize: 64, color: colors.ink }}>{s}</div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 580,
          top: 1150,
          ...type.annotation,
          fontSize: 40,
          color: colors.orangeDeep,
          clipPath: `inset(0 ${(1 - ramp(f, 46, 62)) * 100}% 0 0)`,
        }}
      >
        two weeks, not two months
      </div>
    </Paper>
  );
};

const ExplainCallout: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const zoom = 1 + 0.32 * ramp(f, 18, 44);
  const box = ramp(f, 44, 62);
  const lines = [0.9, 0.75, 0.82, 0.6, 0.88, 0.7];
  const hi = 3;
  return (
    <Paper>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "384px 956px" }}>
        <div
          style={{
            position: "absolute",
            left: 90,
            width: 900,
            top: 560,
            height: 760,
            background: colors.paper,
            boxShadow: CARD_SHADOW,
            transform: `translateY(${(1 - sp(0, SOFT)) * 300}px)`,
          }}
        >
          <div style={{ height: 64, background: colors.paperWarm, borderBottom: `2px solid ${colors.rule}`, display: "flex", gap: 14, alignItems: "center", padding: "0 26px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 18, height: 18, borderRadius: 9, background: colors.sheetEdge }} />
            ))}
          </div>
          <div style={{ padding: "50px 60px", display: "flex", flexDirection: "column", gap: 34 }}>
            <div style={{ ...type.heading, fontSize: 52, color: colors.ink }}>Release notes</div>
            {lines.map((w, i) => (
              <div key={i} style={{ height: 26, width: `${w * 100}%`, background: i === hi ? colors.inkSoft : colors.rule }}>
              </div>
            ))}
          </div>
        </div>
        {/* drafted highlight around line 4 (x150-618, y943-969) */}
        <div style={{ position: "absolute", left: 128, top: 914, width: 512, height: 84 }}>
          <svg width={512} height={84} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <rect
              x={2}
              y={2}
              width={508}
              height={80}
              fill={`rgba(196,71,10,${0.08 * box})`}
              stroke={colors.orange}
              strokeWidth={4}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - box}
            />
          </svg>
          {box > 0.98 ? <Brackets offset={12} arm={24} width={4} /> : null}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 1420,
          ...type.annotation,
          fontSize: 48,
          color: colors.orangeDeep,
          clipPath: `inset(0 ${(1 - ramp(f, 58, 74)) * 100}% 0 0)`,
        }}
      >
        this is the line that matters
      </div>
    </Paper>
  );
};

const ExplainSpec: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const rows = [
    ["Role", "Founder, design and engineering"],
    ["Period", "Nov 2026"],
    ["Built with", "Next.js 15, Supabase, OpenAI"],
  ];
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, right: 110, top: 540 }}>
        <Rise p={sp(0)} style={{ ...type.display, fontSize: 140, color: colors.ink }}>
          ApplyWise
        </Rise>
        <div style={{ ...type.annotation, fontSize: 44, color: colors.orangeDeep, marginTop: 6, clipPath: `inset(0 ${(1 - ramp(f, 8, 24)) * 100}% 0 0)` }}>
          AI resume tailoring for job seekers
        </div>
        <div style={{ marginTop: 60, border: `3px solid ${colors.ink}`, clipPath: `inset(0 ${(1 - ramp(f, 16, 30, Easing.out(Easing.cubic))) * 100}% 0 0)` }}>
          {rows.map(([k, v], i) => {
            const p = ramp(f, 20 + i * 8, 34 + i * 8, Easing.out(Easing.cubic));
            return (
              <div key={k} style={{ display: "flex", borderTop: i ? `2px solid ${colors.ink}` : undefined, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
                <div style={{ width: 230, flex: "none", padding: "26px 28px", ...type.label, fontWeight: 500, fontSize: 36, color: colors.inkSoft }}>{k}</div>
                <div style={{ padding: "26px 28px 26px 0", ...type.label, fontWeight: 700, fontSize: 36, color: colors.ink }}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
};

// ---- transitions -----------------------------------------------------------

const TransitionGrid: React.FC = () => {
  const f = useCurrentFrame();
  const cell = 120;
  const cols = 9;
  const rows = 16;
  const inAt = (c: number, r: number) => 18 + (c + r) * 0.9;
  const outAt = (c: number, r: number) => 50 + (c + r) * 0.9;
  const paperShown = f >= inAt(cols - 1, rows - 1) + 6;
  const sp = useSp();
  return (
    <AbsoluteFill>
      {paperShown ? (
        <Paper>
          <div style={{ position: "absolute", left: 110, top: 800 }}>
            <Rise p={sp(52)} style={{ ...type.display, fontSize: 170, color: colors.ink }}>
              Here&apos;s
            </Rise>
            <Rise p={sp(58)} style={{ ...type.display, fontSize: 170, color: colors.orange }}>
              how.
            </Rise>
          </div>
        </Paper>
      ) : (
        <StandIn>
          <CaptionRow>
            <Outlined>so I rebuilt it</Outlined>
          </CaptionRow>
        </StandIn>
      )}
      {Array.from({ length: cols * rows }, (_, k) => {
        const c = k % cols;
        const r = Math.floor(k / cols);
        const s = ramp(f, inAt(c, r), inAt(c, r) + 7) * (1 - ramp(f, outAt(c, r), outAt(c, r) + 7));
        if (s <= 0) return null;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              left: c * cell,
              top: r * cell,
              width: cell,
              height: cell,
              background: colors.orange,
              transform: `scale(${s * 1.02})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const TransitionSheet: React.FC = () => {
  const sp = useSp();
  const p = sp(16, { damping: 22, stiffness: 110 });
  const top = 1920 * (1 - p);
  return (
    <AbsoluteFill>
      <StandIn>
        <CaptionRow>
          <Outlined>step two</Outlined>
        </CaptionRow>
      </StandIn>
      <div style={{ position: "absolute", left: 0, right: 0, top, height: 1920, boxShadow: "0 -20px 50px rgba(0,0,0,0.35)" }}>
        <Paper>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36, display: "flex", alignItems: "flex-start" }}>
            {Array.from({ length: 46 }, (_, i) => (
              <div key={i} style={{ width: 24, flex: "none", display: "flex" }}>
                <div style={{ width: 2, height: i % 5 === 0 ? 34 : 16, background: colors.orange }} />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 110, top: 780 }}>
            <div style={{ ...type.label, fontSize: 40, color: colors.orangeDeep, letterSpacing: "0.08em", textTransform: "uppercase" }}>Step 02</div>
            <div style={{ ...type.display, fontSize: 160, color: colors.ink }}>Cut the</div>
            <div style={{ ...type.display, fontSize: 160, color: colors.ink }}>scope</div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

// ---- lower third and CTA ---------------------------------------------------

const LowerThird: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const open = ramp(f, 6, 22, Easing.out(Easing.cubic));
  return (
    <StandIn>
      <div style={{ position: "absolute", left: 110, top: 1100 }}>
        <div
          style={{
            position: "relative",
            background: colors.paper,
            border: `3px solid ${colors.orange}`,
            borderRadius: brand.shape.radius,
            padding: "20px 36px 24px",
            boxShadow: CARD_SHADOW,
            clipPath: `inset(-40px ${(1 - open) * 100}% -40px -40px)`,
          }}
        >
          <div style={{ ...type.heading, fontSize: 58, color: colors.ink }}>Soh Wei Yu</div>
          <div style={{ ...type.label, fontSize: 34, color: colors.inkSoft, marginTop: 4 }}>Software engineer</div>
          {open > 0.98 ? <Brackets offset={14} arm={28} width={4} spread={(1 - sp(22)) * 30} /> : null}
        </div>
      </div>
      <CaptionRow>
        <Outlined>{f < 45 ? "hey I'm Wei Yu" : "I build products"}</Outlined>
      </CaptionRow>
    </StandIn>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const sp = useSp();
  const click = 52;
  const press = f >= click && f < click + 6 ? 0.95 : 1;
  const cx = interpolate(f, [24, click], [980, 470], { ...CLAMP, easing: Easing.inOut(Easing.cubic) });
  const cy = interpolate(f, [24, click], [1600, 1268], { ...CLAMP, easing: Easing.inOut(Easing.cubic) });
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, top: 470 }}>
        <Monogram size={120} draw={1} letters={sp(0)} />
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 700 }}>
        <Rise p={sp(4)} style={{ ...type.display, fontSize: 132, color: colors.ink }}>
          Follow for
        </Rise>
        <Rise p={sp(10)} style={{ ...type.display, fontSize: 132, color: colors.ink }}>
          more builds
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 110, top: 1200, display: "flex", gap: 24 }}>
        <div
          style={{
            ...type.label,
            fontWeight: 700,
            fontSize: 44,
            padding: "24px 40px",
            background: f >= click ? colors.orangeDeep : colors.orange,
            color: colors.paper,
            borderRadius: brand.shape.radius,
            transform: `scale(${press})`,
          }}
        >
          View my work
        </div>
        <div
          style={{
            ...type.label,
            fontWeight: 700,
            fontSize: 44,
            padding: "21px 37px",
            border: `3px solid ${colors.orange}`,
            color: colors.orangeDeep,
            background: colors.paper,
            borderRadius: brand.shape.radius,
          }}
        >
          LinkedIn
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 114,
          top: 1370,
          ...type.annotation,
          fontSize: 48,
          color: colors.orangeDeep,
          clipPath: `inset(0 ${(1 - ramp(f, click + 4, click + 22)) * 100}% 0 0)`,
        }}
      >
        sohweiyu.com
      </div>
      <svg width={52} height={70} viewBox="0 0 26 35" style={{ position: "absolute", left: cx, top: cy, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.25))" }}>
        <path d="M2 2 L2 28 L9 22 L14 33 L19 31 L14 20 L23 20 Z" fill={colors.ink} stroke={colors.paper} strokeWidth={2} strokeLinejoin="round" />
      </svg>
      <Grain opacity={0.03} seed={11} />
    </Paper>
  );
};

// ---------------------------------------------------------------------------

export type Sample = {
  n: number;
  group: string;
  title: string;
  note: string;
  frames: number;
  component: React.FC;
};

export const SAMPLES: Sample[] = [
  { n: 1, group: "Captions", title: "Orange block", note: "Your proposed default. The word being spoken sits on an orange block; the others are white with the skill's black outline.", frames: 96, component: CaptionBlock },
  { n: 2, group: "Captions", title: "TikTok outline", note: "The skill's default caption, set in your font: white, 10px black outline, no emphasis.", frames: 96, component: CaptionOutline },
  { n: 3, group: "Captions", title: "Paper chip", note: "The whole chunk on a white chip with an orange outline, like the buttons on your site.", frames: 96, component: CaptionChip },
  { n: 4, group: "Captions", title: "Dimension underline", note: "Outlined white, with a drafting-style orange underline under the spoken word.", frames: 96, component: CaptionDim },
  { n: 5, group: "Hooks", title: "Bracket card", note: "Hook on a white card with an orange outline and corner brackets. Static from frame 0, like a text sticker.", frames: 90, component: HookCard },
  { n: 6, group: "Hooks", title: "Ink slab", note: "Hook on a dark ink card with the key phrase in orange.", frames: 90, component: HookInk },
  { n: 7, group: "Hooks", title: "Dimensioned", note: "No background: outlined white text with an orange dimension line underneath.", frames: 90, component: HookDimension },
  { n: 8, group: "Title type", title: "Blueprint title", note: "The grid draws down, the headline rises line by line, a dimension line and a hand-written note finish it.", frames: 90, component: TitleBlueprint },
  { n: 9, group: "Title type", title: "Word stack", note: "Huge words land one per beat; the last one in orange. For lists and punchlines.", frames: 75, component: TitleStack },
  { n: 10, group: "Title type", title: "Monogram sting", note: "The WY box traces itself, the brackets snap in, then your name. An intro or outro.", frames: 75, component: TitleMonogram },
  { n: 11, group: "Data", title: "Stat counter", note: "A number counts up with a ruler filling in orange underneath. The figure is a placeholder.", frames: 75, component: DataStat },
  { n: 12, group: "Data", title: "Drafted bars", note: "Bars grow in on a ruled baseline; the result bar is orange. Placeholder data.", frames: 75, component: DataBars },
  { n: 13, group: "Data", title: "Checklist card", note: "Items tick off with the orange diamonds from your site.", frames: 90, component: DataChecklist },
  { n: 14, group: "Explain", title: "Blueprint flow", note: "A process: the orange line runs through each step and lights it up.", frames: 80, component: ExplainFlow },
  { n: 15, group: "Explain", title: "Screenshot callout", note: "A screenshot lands big and centred, the camera pushes in, and a drafted box marks the key line.", frames: 90, component: ExplainCallout },
  { n: 16, group: "Explain", title: "Project spec", note: "Your site's project table, built row by row. Content from the ApplyWise section.", frames: 70, component: ExplainSpec },
  { n: 17, group: "Transitions", title: "Grid wipe", note: "Orange grid cells sweep across the take and clear onto blueprint paper.", frames: 90, component: TransitionGrid },
  { n: 18, group: "Transitions", title: "Sheet slide", note: "A sheet of blueprint paper with a ruler edge slides up over the take.", frames: 70, component: TransitionSheet },
  { n: 19, group: "Lower third", title: "Name tag", note: "Name and role open out of a bracketed tag, above the caption line.", frames: 90, component: LowerThird },
  { n: 20, group: "CTA", title: "End card", note: "Closing card: follow line, your site's two buttons, a click, and the URL.", frames: 90, component: EndCard },
];
