import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo["A400"],
    },
    secondary: {
      main: indigo["A200"],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
