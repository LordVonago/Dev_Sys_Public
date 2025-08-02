import { useState, useEffect } from "react";
import classes from "./home.module.css";
// import data from "../../Data/file.json";
import CardLoader from "./CardLoader.jsx";
import Details from "./Details.jsx";
import SAC from "../SAC/SACCadastro.jsx";
import EXP from "../EXP/EXPCadastro.jsx";
import { filtrarDados, handleReset } from "../Scripts/Filtros.script.js";
import { atualizaParametros } from "../Scripts/Utils.js";
import { useAtivador } from "../context/AtivadorContext.jsx";
import { ehUsuarioPermitidoEXP } from "../Scripts/Utils.js";
import Admin from "../components/ADMIN/Admin.jsx";
import Navbar from "../components/navbar/navbar.jsx";

function Home() {
  const { mostrarSac } = useAtivador();
  const { mostrarCards } = useAtivador();
  const { mostrarAdm } = useAtivador();
  const [selectedData, setSelectedData] = useState(null);
  const [novoElemento, setNovoElemento] = useState(true);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    // window.electronAPI.getRegistros();
    filtrarDados(setRegistros);
  }, []);

  useEffect(() => {
    if (selectedData) {
      setNovoElemento(true);
    }
  }, [selectedData]);

  return (
    <>
      <Navbar />
      {mostrarAdm ? <Admin /> : ""}
      {mostrarSac && <SAC />}
      {!mostrarCards ? (
        ""
      ) : (
        <div className={classes.maincontainer}>
          {registros.length !== 0 ? (
            <div className={classes.cardcontainer}>
              <ul>
                {registros.map((dataItem) => (
                  <li
                    key={dataItem.id}
                    className={classes.lista}
                    onClick={() => setSelectedData(dataItem)}
                  >
                    <CardLoader dataItem={dataItem} />
                    <div className={classes.obs}>
                      <p className={classes.legenda}>OBS:</p>
                      <p className={classes.info}>{dataItem.OBSEXP ?? ""}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={classes.erro}>
              <p>Nenhum resultado encontrado</p>
            </div>
          )}
          <div className={classes.lateral}>
            <div className={classes.lateralInterna}>
              {ehUsuarioPermitidoEXP() ? <EXP /> : ""}
              {selectedData && (
                <Details
                  data={selectedData}
                  novoElemento={novoElemento}
                  onNovoElementoUsado={() => setNovoElemento(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
