import * as React from "react";
import styled, { css } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { LateralPanel } from "../UI/LateralPanel";
import { ButtonIcon } from "../UI/ButtonIcon";
import { DrinkListContext } from "../../providers/DrinkListProvider";
import { Typography } from "@material-ui/core";
import { Item } from "./Item";
import { transparentScrollbar } from "../UI/ScrollbarStyles";
import { DRINK_PRICE } from "../../utils/variables";
import { Button } from "../UI/Button";
import { NotificationSnackbar } from "../UI/NotificationSnackbar";
import { sentYourOrder, emptyOrder } from "../../utils/messages";

const Header = styled.div<{ isEmptyOrder: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  ${(props) =>
    !props.isEmptyOrder &&
    css`
      box-shadow: 0px 0px 5px #0000001f;
    `}
`;

const WrapperItem = styled.div`
  height: 100%;
  overflow: overlay;
  ${transparentScrollbar};

  & > div {
    border-bottom: 1px;
    border-bottom-color: var(--line);
    border-bottom-style: solid;
  }
`;

const WrapperTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px;
  border-top-color: var(--line);
  border-top-style: solid;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const OrderPanel: React.FC<Props> = ({ open, handleClose }) => {
  const { myOrder, onEmptyMyOrder } = React.useContext(DrinkListContext);

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);

  const totalQuantity = myOrder
    .map((d) => d.quantity)
    .reduce((acc, next) => {
      return acc + next;
    }, 0);

  const isEmptyOrder = totalQuantity === 0;

  return (
    <>
      <NotificationSnackbar
        open={openNotification}
        handleClose={() => setOpenNotification(false)}
        text={<span style={{ fontWeight: 700 }}>{sentYourOrder}</span>}
      />
      <CSSTransition in={open} timeout={{ enter: 100, exit: 400 }} unmountOnExit>
        {(status) => (
          <LateralPanel transitionStatus={status} handleClose={handleClose}>
            <Header isEmptyOrder={isEmptyOrder}>
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                Your order
              </Typography>
              <ButtonIcon iconName="close" onClick={handleClose} />
            </Header>
            {isEmptyOrder && (
              <Typography variant="subtitle2" style={{ padding: 20 }}>
                {emptyOrder}
              </Typography>
            )}
            <WrapperItem data-testid="order-list">
              {myOrder.map((singleOrder, i) => {
                return <Item key={i} order={singleOrder} />;
              })}
            </WrapperItem>
            <WrapperTotal>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
                <Typography variant="subtitle2">Total</Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                  € {totalQuantity * DRINK_PRICE}
                </Typography>
              </div>
              <Button
                style={{ alignSelf: "flex-end" }}
                onClick={() => {
                  setOpenNotification(true);
                  handleClose();
                  onEmptyMyOrder();
                }}
                disabled={isEmptyOrder}
              >
                Send order
              </Button>
            </WrapperTotal>
          </LateralPanel>
        )}
      </CSSTransition>
    </>
  );
};

export { OrderPanel };
