import { DrinkDescription } from "../types/DrinkDescription";
import { pick, flatMap } from "lodash";

export const getAllIngredients = (drink: DrinkDescription) => {
  let ingredients: Array<String> = [];
  for (let i = 1; i < 15; i++) {
    const ingredient = pick(drink, `strIngredient${i}`) as String;
    ingredients = [...ingredients, ingredient];
  }

  const allIngredients = flatMap(ingredients.map((i) => Object.values(i))).filter((i) => Boolean(i));

  return allIngredients;
};
