import * as React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Icon } from "../UI/Icon";
import { DrinkListContext, MyOrderType } from "../../providers/DrinkListProvider";
import { DRINK_PRICE } from "../../utils/variables";
import { ButtonIcon } from "../UI/ButtonIcon";

const Wrapper = styled.div`
  padding: 15px 0px;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
`;

interface Props {
  order: MyOrderType;
}

const Item: React.FC<Props> = ({ order }) => {
  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const { idDrink, strDrink, quantity } = order;

  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
        <Icon
          name="close"
          iconSize="small"
          onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "remove-all")}
        />
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          {strDrink}
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: 20 }}>
        <QuantitySection data-testid="quantity-section">
          <ButtonIcon
            iconName="remove"
            onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "single-remove")}
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="subtitle2" style={{ width: 25, textAlign: "center", margin: "0px 10px" }}>
            {quantity}
          </Typography>
          <ButtonIcon
            iconName="add"
            onClick={() => onChangeMyOrder({ id: idDrink, name: strDrink }, "add")}
            style={{ width: 30, height: 30 }}
          />
        </QuantitySection>
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          € {quantity * DRINK_PRICE}
        </Typography>
      </div>
    </Wrapper>
  );
};

export { Item };
