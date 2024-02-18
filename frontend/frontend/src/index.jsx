import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import axios from "axios";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

// import store from "./redux/root";
import store from "./redux/rtk/app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.defaults.baseURL = import.meta.env.VITE_APP_API;

const accessToken = localStorage.getItem("access-token");

axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
