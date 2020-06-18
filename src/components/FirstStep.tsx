import * as React from "react";
import styled from "styled-components";
import { SelectWithIngredient } from "../components/SelectWithIngredient";
import { DrinkListContext } from "../providers/DrinkListProvider";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 35px 0px;
`;

const Title = styled.p`
  font-size: 17px;
  letter-spacing: 0.5px;
  margin-bottom: 30px;
`;

const FirstStep: React.FC = () => {
  const { ingredient, onChangeIngredient } = React.useContext(DrinkListContext);

  return (
    <Wrapper>
      <Title>Choose your favorite ingredient and get inspired 🤩</Title>
      <SelectWithIngredient selectedIngredient={ingredient} onChangeIngredient={onChangeIngredient} />
    </Wrapper>
  );
};

export { FirstStep };
