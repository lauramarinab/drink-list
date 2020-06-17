import * as React from "react";
import styled from "styled-components";
import { Drink } from "../../types/Drink";
import { ButtonIcon } from "./ButtonIcon";
import { Typography } from "@material-ui/core";
import { DrinkListContext } from "../../providers/DrinkListProvider";

const Wrapper = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px #0000001f;
  padding: 15px;
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
  margin-top: 20px;
`;

interface Props {
  drink: Drink;
  onSelectedDrink: (drinkId: string) => void;
}

const DrinkCard: React.FC<Props> = ({ drink, onSelectedDrink }) => {
  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const { idDrink, strDrink, strDrinkThumb } = drink;

  return (
    <Wrapper onClick={() => onSelectedDrink(idDrink)}>
      <Thumb src={strDrinkThumb} alt={strDrink} />
      <Typography variant="subtitle2">{strDrink}</Typography>
      <WrapperAction>
        <ButtonIcon iconName="show" />
        <ButtonIcon
          iconName="add"
          onClick={(e) => {
            e.stopPropagation();
            onChangeMyOrder({ id: idDrink, name: strDrink }, "add");
          }}
        />
      </WrapperAction>
    </Wrapper>
  );
};

export { DrinkCard };
