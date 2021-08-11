import { createTheme, MuiThemeProvider } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { DataSource } from "./helpers/dataSourceEnum";
import "./index.css";
import Routes from "./routes";

export const DataContext = React.createContext({
  dataSource: DataSource.Google,
  changeDataSource: (d: DataSource) => {},
});

const theme = createTheme({
  palette: {
    primary: {
      main: indigo["A400"],
    },
    secondary: {
      main: indigo["A200"],
    },
  },
  typography: {
    fontFamily: ["Mulish", "sans-serif"].join(","),
  },
});

export const App = () => {
  const changeDataSource = (d: DataSource) => {
    setDataSource(d);
  };

  const [dataSource, setDataSource] = useState(DataSource.Google);

  return (
    <MuiThemeProvider theme={theme}>
      <DataContext.Provider value={{ dataSource, changeDataSource }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </DataContext.Provider>
    </MuiThemeProvider>
  );
};
