import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AtivadorProvider } from "./context/AtivadorContext";
import Navbar from "./components/navbar/navbar.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AtivadorProvider>
    <App />
  </AtivadorProvider>
  // </StrictMode>,
);
