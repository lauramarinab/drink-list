import * as React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { LateralPanel } from "../UI/LateralPanel";
import { ButtonIcon } from "../UI/ButtonIcon";
import { DrinkListContext } from "../../providers/DrinkListProvider";
import { Typography } from "@material-ui/core";
import { groupBy } from "lodash";
import { Item } from "./Item";
import { transparentScrollbar } from "../UI/ScrollbarStyles";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const WrapperItem = styled.div`
  height: 100%;
  overflow: overlay;
  ${transparentScrollbar};

  & > div {
    border-bottom: 1px;
    border-bottom-color: #f2f1ef;
    border-bottom-style: solid;
  }
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const OrderPanel: React.FC<Props> = ({ open, handleClose }) => {
  const { myOrder } = React.useContext(DrinkListContext);

  return (
    <CSSTransition in={open} timeout={{ enter: 100, exit: 400 }} unmountOnExit>
      {(status) => (
        <LateralPanel transitionStatus={status} handleClose={handleClose}>
          <Header>
            <Typography variant="subtitle1">Il tuo ordine</Typography>
            <ButtonIcon iconName="close" onClick={handleClose} />
          </Header>
          <WrapperItem>
            {myOrder.map((singleOrder, i) => {
              return <Item key={i} order={singleOrder} />;
            })}
          </WrapperItem>
        </LateralPanel>
      )}
    </CSSTransition>
  );
};

export { OrderPanel };
