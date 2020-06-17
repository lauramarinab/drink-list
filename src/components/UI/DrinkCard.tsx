import * as React from "react";
import styled from "styled-components";
import { Drink } from "../../types/Drink";
import { ButtonIcon } from "./ButtonIcon";
import { Typography } from "@material-ui/core";

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
  return (
    <Wrapper onClick={() => onSelectedDrink(drink.idDrink)}>
      <Thumb src={drink.strDrinkThumb} alt={drink.strDrink} />
      <Typography variant="subtitle2">{drink.strDrink}</Typography>
      <WrapperAction>
        <ButtonIcon iconName="show" />
        <ButtonIcon
          iconName="add"
          onClick={(e) => {
            e.stopPropagation();
            const myOrderLocalStorage = localStorage.getItem("myOrder");

            let myPreviousOrder: Array<Drink> = [];
            if (myOrderLocalStorage) {
              myPreviousOrder = JSON.parse(myOrderLocalStorage);
            }

            const myCurrentOrder = JSON.stringify([...myPreviousOrder, drink]);

            localStorage.setItem("myOrder", myCurrentOrder);
          }}
        />
      </WrapperAction>
    </Wrapper>
  );
};

export { DrinkCard };
