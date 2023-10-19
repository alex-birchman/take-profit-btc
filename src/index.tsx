import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import ReactDOM from "react-dom";

import { RootStoreProvider } from "store/context";

import App from "./App";

ReactDOM.render(
  <StylesProvider injectFirst>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </StylesProvider>,
  document.getElementById("root")
);
