import * as React from "react";

type FilterContext = { ingredient: string | null; onChangeIngredient: (ingredient: string) => void };

const FilterContext = React.createContext<FilterContext>({} as FilterContext);

const FilterProvider: React.FC = ({ children }) => {
  const [ingredient, setIngredient] = React.useState<string | null>(null);

  const onChangeIngredient = (ingredient: string) => setIngredient(ingredient);

  return <FilterContext.Provider value={{ ingredient, onChangeIngredient }}>{children}</FilterContext.Provider>;
};

export { FilterProvider, FilterContext };
