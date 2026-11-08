import { Composition, Still } from "remotion";
import { BrandSheet } from "./BrandSheet";
import { MyComposition } from "./Composition";
import { SAMPLES } from "./brand-lab/samples";

export const labId = (n: number) => `BrandLab${String(n).padStart(2, "0")}`;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Still id="BrandSheet" component={BrandSheet} width={1080} height={1920} />
      {SAMPLES.map((s) => (
        <Composition
          key={s.n}
          id={labId(s.n)}
          component={s.component}
          durationInFrames={s.frames}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
    </>
  );
};
