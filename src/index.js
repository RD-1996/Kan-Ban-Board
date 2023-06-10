import { ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/styles/index.scss";
import theme from "./assets/theme";
import reportWebVitals from "./reportWebVitals";
import Routing from "./routes";
import store from "../src/store/store";
import { Provider } from "react-redux";
import Loading from "./components/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Routing />
      </Suspense>
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
