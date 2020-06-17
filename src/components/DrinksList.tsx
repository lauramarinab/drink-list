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
import { NotificationSnackbar } from "./UI/NotificationSnackbar";

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
  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [openDrinkDialog, setOpenDrinkDialog] = React.useState<boolean>(false);

  const { data: drinksByIngredient, error: errorDrinkList } = useSWR<{ drinks: Array<Drink> }>(
    `/filter.php?i=${ingredient}`,
    fetchData
  );

  const drinks = !drinksByIngredient ? [] : drinksByIngredient.drinks;

  const selectedDrink = drinks.find((d) => d.idDrink === selectedDrinkId);

  return (
    <>
      <NotificationSnackbar
        open={openNotification && Boolean(selectedDrink)}
        handleClose={() => setOpenNotification(false)}
        text={
          <>
            Yeah! <span style={{ fontWeight: 700 }}>{selectedDrink?.strDrink}</span> è stato aggiunto al tuo ordine 😎
          </>
        }
      />
      <DrinkDialog
        open={openDrinkDialog}
        handleClose={(isAddedToOrder) => {
          if (isAddedToOrder) {
            setOpenNotification(true);
          } else {
            setSelectedDrinkId(null);
          }
          setOpenDrinkDialog(false);
        }}
        drinkId={selectedDrinkId}
      />
      <div style={{ overflow: "hidden" }}>
        <Typography variant="subtitle1" style={{ padding: "0px 20px", height: 40, fontWeight: 700 }}>
          La nostra selezione
        </Typography>
        <WrapperList>
          <List>
            {drinks.map((drink, i) => (
              <DrinkCard
                drink={drink}
                key={i}
                onSelectedDrink={(id) => {
                  setSelectedDrinkId(id);
                  setOpenDrinkDialog(true);
                }}
              />
            ))}
          </List>
        </WrapperList>
      </div>
    </>
  );
};

export { DrinksList };
