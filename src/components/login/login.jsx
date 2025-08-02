import classes from "./login.module.css";
import { useState, useEffect } from "react";
import { handlekeepchange, handleSubmit } from "../../Scripts/Login.script.js";

const login = () => {
  const [manterconectado, setManterConectado] = useState(
    sessionStorage.getItem("manterconectado") === "true" ? true : false
  );

  return (
    <>
      <div className={classes.maincontainer}>
        <div className={classes.logincontainer}>
          <div className={classes.logocontainer}>
            <img
              src="./Karsten logo edit.png"
              alt=""
              className={classes.logo}
            />
          </div>
          <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <input
              type="text"
              className={classes.nomedeusuário}
              required
              autoFocus={true}
            />
            <div className={classes.manterconectado}>
              <input
                type="checkbox"
                value="Manter Conectado"
                id="keep"
                name="manterconectado"
                checked={manterconectado}
                onChange={(e) => handlekeepchange(e, setManterConectado)}
              />
              <label htmlFor="keep">Manter Conectado?</label>
            </div>
            <input type="submit" value="Entrar" />
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
