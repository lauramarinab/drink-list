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
import { DrinksListSkeleton } from "./UI/Skeleton/DrinksListSkeleton";
import { ErrorSnackbar } from "./UI/ErrorSnackbar";
import { addedToYourOrder } from "../utils/messages";

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
  row-gap: 30px;
  justify-items: center;
  padding: 20px 10px;

  ${transparentScrollbar};

  @media (max-width: 900px) {
    grid-template-columns: 33% 33% 33%;
  }

  @media (max-width: 700px) {
    grid-template-columns: 50% 50%;
  }
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

  const renderDrinksList = () => {
    if (drinksByIngredient && !errorDrinkList) {
      return (
        <List data-testid="drinks-list">
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
      );
    }
    return (
      <List>
        <DrinksListSkeleton />
      </List>
    );
  };

  return (
    <>
      <NotificationSnackbar
        data-testid="notification-snackbar"
        open={openNotification && Boolean(selectedDrink)}
        handleClose={() => setOpenNotification(false)}
        text={
          <>
            Yeah! <span style={{ fontWeight: 700 }}>{selectedDrink?.strDrink}</span> {addedToYourOrder}
          </>
        }
      />
      <ErrorSnackbar open={errorDrinkList} />
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
          Our selection
        </Typography>
        <WrapperList>{renderDrinksList()}</WrapperList>
      </div>
    </>
  );
};

export { DrinksList };
