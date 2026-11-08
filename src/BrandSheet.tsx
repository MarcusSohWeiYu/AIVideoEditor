import { AbsoluteFill } from "remotion";
import { blueprintPaper, brand, colors, fonts, loadBrandFonts, type } from "../brand/theme";

loadBrandFonts();

const PAD = 96;

const Monogram: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        border: `${brand.shape.borderWidth * 2}px solid ${colors.orange}`,
        background: colors.paper,
        color: colors.orangeDeep,
        ...type.heading,
        fontSize: size * 0.42,
      }}
    >
      {brand.monogram}
    </div>
    {/* corner brackets, as on the site */}
    {[
      { top: -12, left: -12, borderTop: 1, borderLeft: 1 },
      { bottom: -12, right: -12, borderBottom: 1, borderRight: 1 },
    ].map(({ borderTop, borderLeft, borderBottom, borderRight, ...pos }, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          ...pos,
          borderColor: colors.orange,
          borderStyle: "solid",
          borderWidth: `${(borderTop ?? 0) * 2}px ${(borderRight ?? 0) * 2}px ${(borderBottom ?? 0) * 2}px ${(borderLeft ?? 0) * 2}px`,
        }}
      />
    ))}
  </div>
);

const SectionLabel: React.FC<{ title: string; note: string }> = ({ title, note }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 24 }}>
    <div style={{ ...type.heading, fontSize: 44, color: colors.ink }}>{title}</div>
    <div style={{ ...type.annotation, fontSize: 30, color: colors.orangeDeep }}>{note}</div>
  </div>
);

const Swatch: React.FC<{ name: string; hex: string; dark?: boolean; big?: boolean }> = ({
  name,
  hex,
  dark,
  big,
}) => (
  <div
    style={{
      height: big ? 168 : 120,
      background: hex,
      border: `1px solid ${colors.sheetEdge}`,
      borderRadius: brand.shape.radius,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      color: dark ? colors.paper : colors.ink,
    }}
  >
    <div style={{ ...type.label, fontSize: big ? 28 : 22 }}>{name}</div>
    <div style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: big ? 24 : 19, opacity: 0.8 }}>
      {hex.toUpperCase()}
    </div>
  </div>
);

const CaptionFrame: React.FC<{ variant: "paper" | "footage" }> = ({ variant }) => {
  const onFootage = variant === "footage";
  const words = ["products", "people", "actually", "use"];
  const active = 2;
  return (
    <div
      style={{
        flex: 1,
        height: 220,
        borderRadius: brand.shape.radius,
        border: `1px solid ${colors.sheetEdge}`,
        background: onFootage
          ? `linear-gradient(160deg, #4a3b31 0%, ${colors.ink} 70%)`
          : colors.paper,
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        gap: "4px 14px",
        padding: 24,
      }}
    >
      {words.map((w, i) => (
        <span
          key={w}
          style={{
            ...type.heading,
            fontSize: 44,
            padding: "0 8px",
            borderRadius: brand.shape.radius,
            color: i === active ? colors.paper : onFootage ? colors.paper : colors.ink,
            background: i === active ? colors.orange : "transparent",
            textShadow: onFootage && i !== active ? "0 2px 12px rgba(0,0,0,.45)" : undefined,
          }}
        >
          {w}
        </span>
      ))}
    </div>
  );
};

export const BrandSheet: React.FC = () => {
  return (
    <AbsoluteFill style={{ ...blueprintPaper, padding: `72px ${PAD}px`, color: colors.ink }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <Monogram size={120} />
        <div>
          <div style={{ ...type.label, fontSize: 26, color: colors.inkSoft }}>sohweiyu.com</div>
          <div style={{ ...type.annotation, fontSize: 30, color: colors.orangeDeep }}>
            brand sheet · vertical reels 1080×1920
          </div>
        </div>
      </div>

      <div style={{ ...type.display, fontSize: 120, marginTop: 48 }}>Brand sheet</div>
      <div style={{ ...type.body, fontSize: 34, marginTop: 12, color: colors.inkSoft }}>
        Blueprint paper, burnt orange, heavy type.
      </div>

      {/* Colours */}
      <div style={{ marginTop: 56 }}>
        <SectionLabel title="Colour" note="orange leads, ink reads" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
          <Swatch big dark name="Orange" hex={colors.orange} />
          <Swatch big dark name="Orange deep" hex={colors.orangeDeep} />
          <Swatch big dark name="Ink" hex={colors.ink} />
          <Swatch dark name="Ink soft" hex={colors.inkSoft} />
          <Swatch name="Sheet edge" hex={colors.sheetEdge} />
          <Swatch name="Rule" hex={colors.rule} />
        </div>
      </div>

      {/* Type */}
      <div style={{ marginTop: 56 }}>
        <SectionLabel title="Type" note="Plus Jakarta Sans + a hand-drawn note" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(
            [
              ["display", "Display · 800", 72],
              ["heading", "Heading · 800", 52],
              ["subheading", "Subheading · 700", 38],
              ["body", "Body · 400 — the quick brown fox", 32],
            ] as const
          ).map(([k, label, size]) => (
            <div key={k} style={{ ...type[k], fontSize: size, color: colors.ink }}>
              {label}
            </div>
          ))}
          <div style={{ ...type.annotation, fontSize: 40, color: colors.orangeDeep }}>
            Architects Daughter — annotations only
          </div>
        </div>
      </div>

      {/* Captions */}
      <div style={{ marginTop: 56 }}>
        <SectionLabel title="Captions" note="active word gets the orange block" />
        <div style={{ display: "flex", gap: 24 }}>
          <CaptionFrame variant="footage" />
          <CaptionFrame variant="paper" />
        </div>
      </div>

      {/* Buttons / shape */}
      <div style={{ display: "flex", gap: 24, marginTop: 56, alignItems: "center" }}>
        <div
          style={{
            ...type.label,
            fontWeight: 700,
            fontSize: 30,
            padding: "18px 32px",
            borderRadius: brand.shape.radius,
            background: colors.orange,
            color: colors.paper,
          }}
        >
          View my work
        </div>
        <div
          style={{
            ...type.label,
            fontWeight: 700,
            fontSize: 30,
            padding: "16px 30px",
            borderRadius: brand.shape.radius,
            border: `3px solid ${colors.orange}`,
            background: colors.paper,
            color: colors.orangeDeep,
          }}
        >
          LinkedIn
        </div>
        <div style={{ ...type.annotation, fontSize: 28, color: colors.inkSoft, marginLeft: 12 }}>
          2px corners,
          <br />
          1.5px lines
        </div>
      </div>
    </AbsoluteFill>
  );
};
