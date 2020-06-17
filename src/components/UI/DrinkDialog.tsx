import * as React from "react";
import { Dialog } from "@material-ui/core";
import useSWR from "swr";
import { fetchData } from "../../client";
import { DrinkDescription } from "../../types/DrinkDescription";

interface Props {
  handleClose: () => void;
  drinkId: string | null;
}

const DrinkDialog: React.FC<Props> = ({ handleClose, drinkId }) => {
  const { data: drinkDescriptionData, error: drinkDescriptionError } = useSWR<{ drinks: Array<DrinkDescription> }>(
    `/lookup.php?i=${drinkId}`,
    fetchData
  );

  if (!drinkDescriptionData) {
    return null;
  }

  const drink = drinkDescriptionData.drinks.find((d) => d.idDrink === drinkId);

  return (
    <Dialog open={Boolean(drinkId) && Boolean(drink)} onClose={handleClose}>
      {!drinkDescriptionData ? (
        <div>loading data...</div>
      ) : (
        <div>
          <img src={drink?.strDrinkThumb} />
        </div>
      )}
      blablalba
    </Dialog>
  );
};

export { DrinkDialog };
