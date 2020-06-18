import * as React from "react";
import { DrinkCardSkeleton } from "./DrinkCardSkeleton";

const DrinksListSkeleton: React.FC = () => {
  const lists = Array(15).fill("");
  return (
    <>
      {lists.map((el, i) => (
        <DrinkCardSkeleton key={i} />
      ))}
    </>
  );
};

export { DrinksListSkeleton };
