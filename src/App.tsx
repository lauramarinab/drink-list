import React from "react";
import styled from "styled-components";
import { Header } from "./components/UI/Header";
import { FirstStep } from "./components/FirstStep";
import { FilterContext } from "./providers/FilterProvider";
import { DrinksList } from "./components/DrinksList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`;

const App: React.FC = () => {
  const { ingredient } = React.useContext(FilterContext);

  return (
    <Wrapper>
      <Header />
      <div style={{ height: ingredient ? "100%" : "160px", overflow: "hidden" }}>
        {!ingredient ? <FirstStep /> : <DrinksList />}
      </div>
    </Wrapper>
  );
};

export default App;
