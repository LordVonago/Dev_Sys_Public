import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./Home/home.jsx";
import SAC from "./SAC/SACCadastro.jsx";
// import Cards from "./Home/Loader/Cards.jsx";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SAC" element={<SAC />}></Route>
        {/* <Route path="/Cards" element={<Cards />}></Route> */}
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
