import * as React from "react";
import useSWR from "swr";
import { fetchData } from "../client";
import { Ingredient } from "../types/Ingredient";
import { Select } from "./UI/Select";
import { ErrorSnackbar } from "./UI/ErrorSnackbar";

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
    return <div style={{ height: 32 }}> Sto cercando gli ingredienti 😼</div>;
  }

  return (
    <Select
      options={allIngredients.drinks.map((i) => i.strIngredient1)}
      placeholder="Seleziona un ingrediente"
      label="Ingrediente"
      minWidth={minWidth}
      handleChange={(option) => onChangeIngredient(option)}
      selectedOption={selectedIngredient}
    />
  );
};

export { SelectWithIngredient };
