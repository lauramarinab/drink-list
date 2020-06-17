import * as React from "react";
import { Drink } from "../types/Drink";

export type MyOrderType = { idDrink: string; strDrink: string; quantity: number };
type ActionOrder = "add" | "remove-all" | "single-remove";

type DrinkListContext = {
  ingredient: string | null;
  onChangeIngredient: (ingredient: string) => void;

  myOrder: Array<MyOrderType>;
  onChangeMyOrder: (drinkDetails: { id: string; name: string }, action: ActionOrder) => void;
};

const DrinkListContext = React.createContext<DrinkListContext>({} as DrinkListContext);

const DrinkListProvider: React.FC = ({ children }) => {
  const [ingredient, setIngredient] = React.useState<string | null>("Gin");
  const [myOrder, setMyOrder] = React.useState<Array<MyOrderType>>([]);

  const onChangeIngredient = (ingredient: string) => setIngredient(ingredient);

  const onChangeMyOrder = (drinkDetails: { id: string; name: string }, action: ActionOrder) => {
    const { id, name } = drinkDetails;

    const drinkExists = myOrder.find((d) => d.idDrink === id);

    let updatedOrder: Array<MyOrderType> = [];

    if (action === "single-remove") {
      const lastDrink = drinkExists!.quantity === 1;

      if (lastDrink) {
        updatedOrder = myOrder.filter((d) => d.idDrink !== id);
      } else {
        updatedOrder = myOrder.map((d) => {
          if (d.idDrink === id) {
            return {
              ...d,
              quantity: d.quantity - 1,
            };
          }
          return d;
        });
      }
    }

    if (action === "remove-all") {
      updatedOrder = myOrder.filter((d) => d.idDrink !== id);
    }

    if (action === "add") {
      if (drinkExists) {
        updatedOrder = myOrder.map((d) => {
          if (d.idDrink === id) {
            return {
              ...d,
              quantity: d.quantity + 1,
            };
          }
          return d;
        });
      } else {
        updatedOrder = [...myOrder, { idDrink: id, strDrink: name, quantity: 1 }];
      }
    }

    setMyOrder(updatedOrder);
  };

  return (
    <DrinkListContext.Provider value={{ ingredient, onChangeIngredient, myOrder, onChangeMyOrder }}>
      {children}
    </DrinkListContext.Provider>
  );
};

export { DrinkListProvider, DrinkListContext };
