import "./App.css";
import Home from "./Home/home.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Login from "./components/login/login.jsx";
import { useState } from "react";
import AppRoutes from "./Routes.jsx";

let usuário = sessionStorage.getItem("usuário");
let conectado = "";

if (usuário === null || usuário === "") {
  conectado = false;
} else {
  conectado = true;
}
function App() {
  return (
    <>
      {!conectado ? (
        <Login />
      ) : (
        <AppRoutes>
          <Navbar />
          <>
            <Home />
          </>
        </AppRoutes>
      )}
    </>
  );
}

export default App;
