import classes from "./Cadastro.module.css";
import { useState } from "react";
import {
  handleSubmit,
  handleEnter,
  handleReset,
} from "../Scripts/Cadastro.script.js";

const Cadastro = () => {
  const [ativa, setAtiva] = useState(true);
  const [enviando, setEnviando] = useState(false);

  return (
    <>
      <div className={classes.maincontainer}>
        <p className={classes.título}>Cadastro</p>
        <div className={classes.formcontainer}>
          <form
            onSubmit={(e) =>
              handleSubmit(e, ativa, setAtiva, setEnviando, enviando)
            }
            onReset={(e) => handleReset(e, setAtiva)}
          >
            <input name="NotaDevolução" type="number" autoComplete={"false"} />
            <select name="Transportadora" id="" className={classes.transporte}>
              <option value="S">Selecione</option>
              <option value="Total Express">Total Express</option>
              <option value="Jadlog">Jadlog</option>
              <option value="GFL">GFL</option>
              <option value="Smart2C">Smart2C</option>
              <option value="Correios">Correios</option>
            </select>
            <select name="Motivo" id="" className={classes.motivo}>
              <option value="S">Selecione</option>
              <option value="Extravio para atender cliente">
                Extravio para atender cliente
              </option>
              <option value="Extravio qualidade">Extravio qualidade</option>
              <option value="Extravio confirmado">Extravio confirmado</option>
            </select>
            <input type="number" name="notaVenda" id="" />
            <textarea
              name="Observações"
              id=""
              // impede a aplicação de espaços com "Enter" nas observações
              onKeyDown={(e) => handleEnter(e)}
            ></textarea>
            <div className={classes.btn}>
              <button type="submit" className={classes.salvar}>
                Salvar
              </button>
              <button type="reset" className={classes.cancelar}>
                Cancelar
              </button>
            </div>
          </form>
          <div className={classes.alertabox}>
            <p className={ativa ? classes.alerta : ""}>
              Valores incorretos encontrados
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
