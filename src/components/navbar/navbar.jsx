import { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import {
  handleSubmit,
  handleReset,
  getDataHoje,
  handleChange,
  handleChangeDataInicial,
  handleChangeDataFinal,
  handleChangeCheckboxC,
  handleChangeCheckboxE,
} from "../../Scripts/Filtros.script.js";
import { handleLogOut } from "../../Scripts/Login.script.js";
import { useAtivador } from "../../context/AtivadorContext.jsx";
import { ehUsuarioPermitidoSAC } from "../../Scripts/Utils.js";
import { ehUsuarioPermitido } from "../../Scripts/Utils.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { mostrarSac, setmostrarSac } = useAtivador();

  // Desabilita os cards
  const { mostrarCards, setmostrarCards } = useAtivador();
  // Mostra a tela de administração
  const { mostrarAdm, setMostrarAdm } = useAtivador();

  // Define o valor da data final
  const [dataFinal, setDataFinal] = useState("");

  // Define o valor da nota fiscal
  const [nota, setNota] = useState(sessionStorage.getItem("notaDev") ?? "");

  // Define o valor da data inicial
  const [dataInicial, setDataInicial] = useState(
    sessionStorage.getItem("dataInicial") ?? ""
  );

  // Define o valor do campo "Cadastro"
  const [cadastro, setCadastro] = useState(
    sessionStorage.getItem("userCadastro") ?? ""
  );

  // Define os valores das checkboxes
  const [checkedC, setCheckedC] = useState(
    handleChangeCheckboxC(sessionStorage.getItem("concluídos"))
  );
  const [checkedE, setCheckedE] = useState(
    handleChangeCheckboxE(sessionStorage.getItem("expirado"))
  );

  useEffect(() => {
    if (
      sessionStorage.getItem("dataFinal") === "" ||
      sessionStorage.getItem("dataFinal") === null
    ) {
      setDataFinal(getDataHoje());
    } else {
      setDataFinal(sessionStorage.getItem("dataFinal"));
    }
  }, []);

  return (
    <>
      {/* <Link to="/SAC"> Teste</Link> */}
      <div className={classes.maincontainer}>
        <div className={classes.superiornavbar}>
          <img src="./seu-logo-aqui-1.png" alt="Sua Logo" />
          {ehUsuarioPermitidoSAC() ? (
            <div>
              <button
                onClick={() => [
                  setmostrarSac(mostrarSac ? false : true),
                  setmostrarCards(mostrarCards ? false : true),
                ]}
                disabled={mostrarAdm}
              >
                Cadastrar Devolução
              </button>
            </div>
          ) : (
            ""
          )}
          {ehUsuarioPermitido("ADM") ? (
            <div>
              <button
                onClick={() => [
                  setMostrarAdm(mostrarAdm ? false : true),
                  setmostrarCards(mostrarCards ? false : true),
                ]}
                disabled={mostrarSac}
              >
                ADMIN
              </button>
            </div>
          ) : (
            ""
          )}
          <div className={classes.identificação}>
            <p className={classes.usuário}>
              {sessionStorage.getItem("usuário").split(",")[0]}
            </p>
            <input
              type="button"
              value="Sair"
              className={classes.sair}
              onClick={() => handleLogOut()}
            />
          </div>
        </div>
        <div className={classes.formcontainer}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            onReset={(e) =>
              handleReset(e, setDataFinal, setNota, setDataInicial)
            }
          >
            {/* Filtro para exibir um registro específico */}
            <input
              type="number"
              placeholder="Nota Fiscal"
              autoComplete="false"
              name="notaDev"
              value={nota}
              onChange={(e) => handleChange(e, setNota)}
            />

            {/* Filtro para exibir por range de data - data inicial */}
            <input
              type="date"
              name="dataInicial"
              value={dataInicial}
              onChange={(e) => handleChangeDataInicial(e, setDataInicial)}
            />

            {/* Filtro para exibir por range de data - data final */}
            <input
              type="date"
              name="dataFinal"
              value={dataFinal}
              onChange={(e) => handleChangeDataFinal(e, setDataFinal)}
            />

            {/* Filtro para exibir registros feitos determinado usuário */}
            <input
              type="text"
              placeholder="Cadastro"
              name="userCadastro"
              value={cadastro}
              onChange={(e) => setCadastro(e.target.value)}
            />

            {/* Filtros para exibir os registros Concluidos */}
            <div className={classes.check}>
              <label htmlFor="concluídos">Mostrar concluídos</label>
              <input
                type="checkbox"
                name="concluídos"
                id="concluídos"
                checked={checkedC}
                onChange={(e) => handleChangeCheckboxC(e, setCheckedC)}
              />
            </div>

            {/* Filtro para exibir os registros Expirados */}
            <div className={classes.check}>
              <label htmlFor="expirados">Mostrar expirados</label>
              <input
                type="checkbox"
                name="expirado"
                id="expirados"
                checked={checkedE}
                onChange={(e) => handleChangeCheckboxE(e, setCheckedE)}
              />
            </div>

            {/* Aplicar ou limpar filtros */}
            <input type="submit" value="Filtrar" />
            <input type="reset" value="Limpar" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
