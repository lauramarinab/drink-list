import * as React from "react";
import styled from "styled-components";
import { Drink } from "../../types/Drink";
import { ButtonIcon } from "./ButtonIcon";
import { Typography, Snackbar } from "@material-ui/core";
import { DrinkListContext } from "../../providers/DrinkListProvider";

const Wrapper = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px #0000001f;
  padding: 15px;
  padding-bottom: 30px;
  width: 215px;
`;

const Thumb = styled.img`
  border-radius: 100%;
  max-width: 100%;
  max-height: 100%;
  padding: 15px 20px;
`;

const WrapperAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: 20px;
  bottom: -19px;
`;

interface Props {
  drink: Drink;
  onSelectedDrink: (drinkId: string) => void;
}

const DrinkCard: React.FC<Props> = ({ drink, onSelectedDrink }) => {
  const { idDrink, strDrink, strDrinkThumb } = drink;

  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);

  return (
    <>
      <Snackbar
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ background: "var(--primary)", borderRadius: 15, padding: "10px 20px", color: "#fff" }}>
          <Typography variant="subtitle2">
            Yeah! <span style={{ fontWeight: 700 }}>{strDrink}</span> è stato aggiunto al tuo ordine 😎
          </Typography>
        </div>
      </Snackbar>

      <Wrapper>
        <Thumb src={strDrinkThumb} alt={strDrink} onClick={() => onSelectedDrink(idDrink)} />
        <Typography variant="subtitle2" style={{ fontWeight: 700, letterSpacing: 0.5 }}>
          {strDrink}
        </Typography>
        <WrapperAction>
          <ButtonIcon iconName="show" style={{ marginRight: 20 }} onClick={() => onSelectedDrink(idDrink)} />
          <ButtonIcon
            iconName="add"
            onClick={(e) => {
              onChangeMyOrder({ id: idDrink, name: strDrink }, "add");

              setOpenNotification(true);
            }}
          />
        </WrapperAction>
      </Wrapper>
    </>
  );
};

export { DrinkCard };
