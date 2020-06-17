import React from "react";
import "./assets/fontello/css/icon.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./providers/FilterProvider";

ReactDOM.render(
  <FilterProvider>
    <App />
  </FilterProvider>,
  document.getElementById("root")
);
