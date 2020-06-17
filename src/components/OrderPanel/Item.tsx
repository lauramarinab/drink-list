import * as React from "react";
import { Drink } from "../../types/Drink";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { Icon } from "../UI/Icon";
import { DrinkListContext, MyOrderType } from "../../providers/DrinkListProvider";

const Wrapper = styled.div`
  padding: 15px 0px;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`;

interface Props {
  order: MyOrderType;
}

const Item: React.FC<Props> = ({ order }) => {
  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const { idDrink, strDrink, quantity } = order;

  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <Icon
          name="close"
          iconSize="small"
          onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "remove-all")}
        />
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          {strDrink}
        </Typography>
      </div>
      <QuantitySection>
        <Icon name="remove" onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "single-remove")} />
        <Typography variant="subtitle2" style={{ width: 25, textAlign: "center" }}>
          {quantity}
        </Typography>
        <Icon name="add" onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "add")} />
      </QuantitySection>
    </Wrapper>
  );
};

export { Item };
