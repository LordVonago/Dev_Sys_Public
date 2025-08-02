import { useEffect, useState } from "react";
import classes from "./Details.module.css";
import {
  parseDataBR,
  getDataHoje,
  organiza,
} from "../Scripts/Filtros.script.js";

const Details = ({ data, novoElemento, onNovoElementoUsado }) => {
  const [edit, setEdit] = useState(false);
  const [texto, setTexto] = useState("");

  const editar = (editar) => {
    if (editar) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  useEffect(() => {
    if (novoElemento) {
      setEdit(true);
      onNovoElementoUsado();
    }
  }, [novoElemento, onNovoElementoUsado]);

  const cancelar = (e) => {
    setTexto([]);
    setEdit(true);
  };

  let dataFinal = new Date(data.PrazoFinal);
  let dataHoje = new Date(getDataHoje());
  let DiasRestantes = (dataFinal - dataHoje) / (1000 * 60 * 60 * 24);
  let camposExtras = [
    {
      label: "Prazo Final",
      valor:
        data.PrazoFinal == null || data.PrazoFinal == ""
          ? ""
          : parseDataBR(data.PrazoFinal) ?? "",
    },
    {
      label: "Dias Restantes",
      valor:
        data.PrazoFinal == null || data.PrazoFinal == "" ? "" : DiasRestantes,
    },
  ];
  const campos = [...organiza(data), ...camposExtras];

  return (
    <>
      <div className={classes.maincontainer}>
        <div className={classes.container}>
          {campos.map((campo, index) => (
            <div className={classes.linha} key={index}>
              <p className={classes.legenda}>{campo.label}:</p>
              <p className={classes.info}>{campo.valor}</p>
            </div>
          ))}
        </div>
        {/* Observações Gerais*/}
        <div className={classes.obs}>
          <p className={classes.legenda}>OBS:</p>
          <p className={classes.info}>{data.OBSEXP}</p>
        </div>
        {/* Observação de alteração de Status */}
        <div className={classes.obs}>
          <p className={classes.legenda}>OBS:</p>
          <textarea
            className={edit ? classes.desativado : classes.info}
            disabled={edit}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
        </div>
        {/* Botões de edição */}
        <div className={classes.editar}>
          <form className={classes.opções}>
            <input
              className={classes.editar}
              id="edit"
              type="button"
              value="Editar"
              onClick={() => editar(false)}
            />
            <input
              className={classes.cancelar}
              type="button"
              value="Cancelar"
              onClick={(e) => cancelar(e)}
            />
            <input
              className={classes.salvar}
              type="button"
              value="Salvar"
              // onClick={(e) => salvar(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
