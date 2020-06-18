import * as React from "react";
import useSWR from "swr";
import styled from "styled-components";
import { Dialog, Typography } from "@material-ui/core";
import { fetchData } from "../../client";
import { DrinkDescription } from "../../types/DrinkDescription";
import { ErrorSnackbar } from "./ErrorSnackbar";
import { DrinkListContext } from "../../providers/DrinkListProvider";
import { Divider } from "./Divider";
import { Button } from "./Button";
import { getAllIngredients } from "../../utils/getAllIngredients";
import { DRINK_PRICE } from "../../utils/variables";

const Wrapper = styled.div`
  position: relative;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  height: 350px;
`;

const DrinkInfo = styled.div`
  padding: 3px 30px;
  padding-bottom: 20px;
  padding-right: 0px;
  height: 100%;
  overflow-y: hidden;
`;

const DrinkImg = styled.img`
  max-width: 245px;
  max-height: 100%;
  object-fit: cover;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitlePrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  open: boolean;
  handleClose: (isAdded?: boolean) => void;
  drinkId: string | null;
}

const DrinkDialog: React.FC<Props> = ({ open, handleClose, drinkId }) => {
  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const { data: drinkDescriptionData, error: drinkDescriptionError } = useSWR<{ drinks: Array<DrinkDescription> }>(
    `/lookup.php?i=${drinkId}`,
    fetchData
  );

  if (drinkDescriptionError) {
    return <ErrorSnackbar open={drinkDescriptionError} />;
  }

  if (!drinkDescriptionData) {
    return null;
  }

  const drink = drinkDescriptionData.drinks[0];

  const allIngredients = getAllIngredients(drink);

  const { idDrink, strDrinkThumb, strDrink, strGlass, strInstructions } = drink;

  return (
    <Dialog open={open && Boolean(drink)} onClose={() => handleClose()}>
      <Wrapper>
        <DrinkImg src={strDrinkThumb} alt={strDrink} />
        <RightSection>
          <DrinkInfo>
            <TitlePrice>
              <Typography variant="subtitle1" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                {strDrink}
              </Typography>
              <Typography variant="subtitle1" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
                € {DRINK_PRICE}
              </Typography>
            </TitlePrice>
            <Typography variant="subtitle2">{strGlass}</Typography>
            <Divider style={{ paddingTop: 15 }} />
            <div style={{ overflowY: "scroll", height: "calc(100% - 60px)", paddingTop: 15 }}>
              {strInstructions && (
                <>
                  <Typography variant="caption" style={{ color: "var(--secondary)" }}>
                    Ingredienti:
                  </Typography>
                  <Typography variant="body2" style={{ marginBottom: 10 }}>
                    {allIngredients.join(", ")}
                  </Typography>
                </>
              )}
              {strInstructions && (
                <>
                  <Typography variant="caption" style={{ color: "var(--secondary)" }}>
                    Istruzioni:
                  </Typography>
                  <Typography variant="body2">{strInstructions}</Typography>
                </>
              )}
            </div>
          </DrinkInfo>
          <ButtonSection>
            <Button undo onClick={() => handleClose()} style={{ marginRight: 15 }}>
              Annulla
            </Button>
            <Button
              onClick={() => {
                onChangeMyOrder({ id: idDrink, name: strDrink }, "add");
                handleClose(true);
              }}
            >
              Ordina
            </Button>
          </ButtonSection>
        </RightSection>
      </Wrapper>
    </Dialog>
  );
};

export { DrinkDialog };
