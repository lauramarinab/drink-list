import * as React from "react";
import styled from "styled-components";
import { FilterContext } from "../../providers/FilterProvider";
import { SelectWithIngredient } from "../SelectWithIngredient";
import { Icon } from "./Icon";

const drinkLogo = require("../../assets/drink-logo.svg");

const Wrapper = styled.div<{ ingredientExist: boolean }>`
  padding: 20px;
  display: grid;
  grid-template-columns: ${(props) => (props.ingredientExist ? "repeat(3, 1fr)" : "repeat(1, 1fr)")};
  justify-items: center;
  align-items: center;
`;

const DrinkHeader = styled.h1`
  font-family: "MuseoModerno", cursive;
  font-size: 40px;
  text-align: center;
  user-select: none;
  letter-spacing: 5px;
  display: none;
`;

const Logo = styled.img<{ ingredientExist: boolean }>`
  height: 30px;
  user-select: none;
  -webkit-user-drag: none;

  justify-self: ${(props) => (props.ingredientExist ? "start" : "center")};
`;

const Header: React.FC = () => {
  const { ingredient, onChangeIngredient } = React.useContext(FilterContext);

  return (
    <Wrapper ingredientExist={Boolean(ingredient)}>
      <Logo src={drinkLogo} alt="drink-logo" ingredientExist={Boolean(ingredient)} />
      <DrinkHeader>DRINK</DrinkHeader>
      {Boolean(ingredient) && (
        <>
          <SelectWithIngredient
            selectedIngredient={ingredient}
            onChangeIngredient={onChangeIngredient}
            minWidth={300}
          />
          <Icon name="comments" style={{ justifySelf: "end" }} iconSize="large" />
        </>
      )}
    </Wrapper>
  );
};

export { Header };
