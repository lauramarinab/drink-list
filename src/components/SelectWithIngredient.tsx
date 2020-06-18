import * as React from "react";
import useSWR from "swr";
import { fetchData } from "../client";
import { Ingredient } from "../types/Ingredient";
import { Select } from "./UI/Select";
import { ErrorSnackbar } from "./UI/ErrorSnackbar";
import { Typography } from "@material-ui/core";
import { loadingIngredients } from "../utils/messages";

interface Props {
  selectedIngredient: string | null;
  onChangeIngredient: (ingredient: string) => void;
  minWidth?: number;
}

const SelectWithIngredient: React.FC<Props> = ({ selectedIngredient, onChangeIngredient, minWidth }) => {
  const { data: allIngredients, error: ingredientsError } = useSWR<{ drinks: Array<Ingredient> }>(
    "/list.php?i=list",
    fetchData
  );

  if (ingredientsError) {
    return <ErrorSnackbar open={ingredientsError} />;
  }

  if (!allIngredients) {
    return (
      <div style={{ height: 48, display: "flex", alignItems: "center" }}>
        <Typography variant="caption">{loadingIngredients}</Typography>
      </div>
    );
  }

  return (
    <Select
      options={allIngredients.drinks.map((i) => i.strIngredient1)}
      placeholder="Select an ingredient"
      label="Ingredients"
      minWidth={minWidth}
      handleChange={(option) => onChangeIngredient(option)}
      selectedOption={selectedIngredient}
    />
  );
};

export { SelectWithIngredient };
