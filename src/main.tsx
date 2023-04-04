import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.scss";
import { BoardsContextProvider } from "./contexts/BoardContext";
import { Routes } from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BoardsContextProvider>
      <Routes />
    </BoardsContextProvider>
  </React.StrictMode>
);
