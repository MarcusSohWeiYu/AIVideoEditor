import { Still } from "remotion";
import { BrandSheet } from "./BrandSheet";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Still id="BrandSheet" component={BrandSheet} width={1080} height={1920} />
    </>
  );
};
