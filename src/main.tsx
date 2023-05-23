import React from "react";
import ReactDOM from "react-dom/client";
import { ProductForm } from "./App.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductForm />
  </React.StrictMode>
);