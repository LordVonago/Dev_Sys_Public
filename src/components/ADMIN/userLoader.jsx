import { useAtivador } from "../../context/AtivadorContext";
import classes from "./userLoader.module.css";
import {
  handleUsersSubmitDelete,
  comparaUsuario,
} from "../../Scripts/Admin.script";
import { useState } from "react";

const userLoader = ({ users }) => {
  const { usuarios, setUsuarios } = useAtivador();

  return (
    <>
      <div className={classes.maincontainer}>
        <form onSubmit={(e) => handleUsersSubmitDelete(e, setUsuarios)}>
          <div className={classes.usuarios}>
            <input
              type="text"
              readOnly
              className={classes.user}
              value={users.cadastro}
              name="cadastro"
            ></input>
            <input
              type="text"
              readOnly
              className={classes.nome}
              value={users.nome}
              name="usuario"
            ></input>
            <input
              type="text"
              readOnly
              className={classes.origem}
              value={users.origem}
              name="origem"
            ></input>
          </div>
          <div className={classes.enviar}>
            <input
              type="submit"
              value="Excluir"
              disabled={comparaUsuario(users.cadastro)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default userLoader;
