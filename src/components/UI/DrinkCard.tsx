import * as React from "react";
import styled, { css } from "styled-components";
import { Drink } from "../../types/Drink";
import { ButtonIcon } from "./ButtonIcon";
import { Typography } from "@material-ui/core";
import { DrinkListContext } from "../../providers/DrinkListProvider";
import { NotificationSnackbar } from "./NotificationSnackbar";
import { ThumbDrinkCardSkeleton } from "./Skeleton/styles";

const Wrapper = styled.div`
  position: relative;
  border-radius: 15px;
  padding: 10px;
  width: 200px;
`;

const Thumb = styled.img<{ isVisible: boolean }>`
  border-radius: 20px;
  max-width: 100%;
  max-height: 100%;

  ${(props) =>
    !props.isVisible &&
    css`
      display: none;
    `};
`;

const WrapperAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: -20px;
  bottom: -15px;
`;

interface Props {
  drink: Drink;
  onSelectedDrink: (drinkId: string) => void;
}

const DrinkCard: React.FC<Props> = ({ drink, onSelectedDrink }) => {
  const { idDrink, strDrink, strDrinkThumb } = drink;

  const { onChangeMyOrder } = React.useContext(DrinkListContext);

  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [loadingImg, setLoadingImg] = React.useState<boolean>(true);

  const handleImgLoaded = () => setLoadingImg(false);

  return (
    <>
      <NotificationSnackbar
        open={openNotification}
        handleClose={() => setOpenNotification(false)}
        text={
          <>
            Yeah! <span style={{ fontWeight: 700 }}>{strDrink}</span> è stato aggiunto al tuo ordine 😎
          </>
        }
      />
      <Wrapper>
        <div style={{ position: "relative" }}>
          {loadingImg && <ThumbDrinkCardSkeleton />}
          <Thumb
            src={strDrinkThumb}
            alt={strDrink}
            onClick={() => onSelectedDrink(idDrink)}
            isVisible={!loadingImg}
            onLoad={handleImgLoaded}
          />
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
        </div>
        <Typography variant="subtitle2" style={{ fontWeight: 700, letterSpacing: 0.5, marginTop: 25, marginLeft: 7 }}>
          {strDrink}
        </Typography>
      </Wrapper>
    </>
  );
};

export { DrinkCard };
