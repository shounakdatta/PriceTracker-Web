import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App/App";
import * as serviceWorker from "./serviceWorker";
import Store from "./store";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GetTheme from "./theme";

const theme = GetTheme();

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
