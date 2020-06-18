import * as React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { DrinkListContext } from "../providers/DrinkListProvider";

const orderIcon = require("../assets/order-icon.svg");

const Badge = styled.div`
  position: absolute;
  bottom: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--primary);
  user-select: none;
  left: -70px;
  transition: all 0.2s ease-in-out;
  transform: translate(-50%, 0);

  &.entering {
    width: 10px;
    height: 23px;
    opacity: 0;
    border-radius: 0px;
  }
  &.entered {
    width: 23px;
    height: 23px;
    opacity: 1;
    border-radius: 23px;
  }
  &.exiting {
    width: 0px;
    height: 23px;
    opacity: 0;
    border-radius: 0px;
  }
  &.exited {
    width: 0px;
    height: 23px;
    opacity: 0;
    border-radius: 0px;
  }
`;

const ImgOrder = styled.img`
  width: 70px;
  position: absolute;
  right: 0px;
  top: -30px;
  cursor: pointer;
  user-select: none;
`;

interface Props {
  onOpenMyOrder: () => void;
}

const OrderIcon: React.FC<Props> = ({ onOpenMyOrder }) => {
  const { myOrder } = React.useContext(DrinkListContext);

  const totalQuantity = myOrder
    .map((d) => d.quantity)
    .reduce((acc, next) => {
      return acc + next;
    }, 0);

  return (
    <div style={{ justifySelf: "end", position: "relative" }}>
      <CSSTransition in={totalQuantity > 0} timeout={0} unmountOnExit>
        {(status) => (
          <Badge className={status} data-testid="badge-order">
            {totalQuantity}
          </Badge>
        )}
      </CSSTransition>
      <ImgOrder src={orderIcon} alt="my order panel" onClick={onOpenMyOrder} />
    </div>
  );
};

export { OrderIcon };
