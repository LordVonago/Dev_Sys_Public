import classes from "./CardLoader.module.css";
import {
  parseDataBR,
  getDataHoje,
  organiza,
} from "../Scripts/Filtros.script.js";
const CardLoader = ({ dataItem }) => {
  let dataFinal = new Date(dataItem.PrazoFinal);
  let dataHoje = new Date(getDataHoje());
  let DiasRestantes = (dataFinal - dataHoje) / (1000 * 60 * 60 * 24);
  let camposExtras = [
    {
      label: "Prazo Final",
      valor:
        dataItem.PrazoFinal == null || dataItem.PrazoFinal == ""
          ? ""
          : parseDataBR(dataItem.PrazoFinal) ?? "",
    },
    {
      label: "Dias Restantes",
      valor:
        dataItem.PrazoFinal == null || dataItem.PrazoFinal == ""
          ? ""
          : DiasRestantes < 0
          ? "EXPIRADO"
          : DiasRestantes,
    },
  ];
  const campos = [...organiza(dataItem), ...camposExtras];

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
      </div>
    </>
  );
};

export default CardLoader;
