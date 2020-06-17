import * as React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Drink } from "../types/Drink";
import { DrinkListContext } from "../providers/DrinkListProvider";
import { fetchData } from "../client";
import { Typography } from "@material-ui/core";
import { DrinkCard } from "./UI/DrinkCard";
import { transparentScrollbar } from "./UI/ScrollbarStyles";
import { DrinkDialog } from "./UI/DrinkDialog";

const WrapperList = styled.div`
  height: calc(100vh - 130px);
  overflow-y: scroll;
  padding: 0px 10px;
  padding-bottom: 15px;
  ${transparentScrollbar};
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  row-gap: 40px;
  justify-items: center;
  padding: 20px 10px;

  ${transparentScrollbar};
`;

const DrinksList: React.FC = () => {
  const { ingredient } = React.useContext(DrinkListContext);

  const [selectedDrinkId, setSelectedDrinkId] = React.useState<string | null>(null);

  const { data: drinksByIngredient, error: errorDrinkList } = useSWR<{ drinks: Array<Drink> }>(
    `/filter.php?i=${ingredient}`,
    fetchData
  );

  const drinks = !drinksByIngredient ? [] : drinksByIngredient.drinks;

  return (
    <>
      <DrinkDialog handleClose={() => setSelectedDrinkId(null)} drinkId={selectedDrinkId} />
      <div style={{ overflow: "hidden" }}>
        <Typography variant="subtitle1" style={{ padding: "0px 20px", height: 40, fontWeight: 700 }}>
          La nostra selezione
        </Typography>
        <WrapperList>
          <List>
            {drinks.map((drink, i) => (
              <DrinkCard drink={drink} key={i} onSelectedDrink={(id) => setSelectedDrinkId(id)} />
            ))}
          </List>
        </WrapperList>
      </div>
    </>
  );
};

export { DrinksList };
