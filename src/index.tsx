import React from "react";
import "./assets/fontello/css/icon.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DrinkListProvider } from "./providers/DrinkListProvider";

ReactDOM.render(
  <DrinkListProvider>
    <App />
  </DrinkListProvider>,
  document.getElementById("root")
);
