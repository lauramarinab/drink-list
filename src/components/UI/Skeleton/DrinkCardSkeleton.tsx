import * as React from "react";
import { ThumbDrinkCardSkeleton, SkeletonButton, ActionsDrinkCard, WrapperDrinkCard, SkeletonLabel } from "./styles";

const DrinkCardSkeleton: React.FC = () => {
  return (
    <WrapperDrinkCard>
      <div style={{ position: "relative" }}>
        <ThumbDrinkCardSkeleton />
        <ActionsDrinkCard>
          <SkeletonButton />
          <SkeletonButton style={{ marginLeft: 15 }} />
        </ActionsDrinkCard>
      </div>
      <SkeletonLabel style={{ marginTop: 25 }} />
    </WrapperDrinkCard>
  );
};

export { DrinkCardSkeleton };
