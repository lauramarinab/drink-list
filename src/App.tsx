import React from "react";
import styled from "styled-components";
import { Header } from "./components/UI/Header";
import { FirstStep } from "./components/FirstStep";
import { DrinkListContext } from "./providers/DrinkListProvider";
import { DrinksList } from "./components/DrinksList";
import { OrderPanel } from "./components/OrderPanel/OrderPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

const App: React.FC = () => {
  const { ingredient } = React.useContext(DrinkListContext);

  const [openMyOrderPanel, setOpenMyOrderPanel] = React.useState<boolean>(false);

  return (
    <>
      <OrderPanel open={openMyOrderPanel} handleClose={() => setOpenMyOrderPanel(false)} />
      <Wrapper>
        <Header onOpenMyOrder={() => setOpenMyOrderPanel(true)} />
        <div style={{ height: ingredient ? "100%" : "160px", overflow: "hidden" }}>
          {!ingredient ? <FirstStep /> : <DrinksList />}
        </div>
      </Wrapper>
    </>
  );
};

export default App;
