import classes from "../ADMIN/Admin.module.css";
import { useState, useEffect } from "react";
import {
  buscaCadastrados,
  handleSubmitCadastro,
} from "../../Scripts/Admin.script.js";
import UserLoader from "./userLoader.jsx";
import { useAtivador } from "../../context/AtivadorContext";

const Admin = () => {
  const { usuarios, setUsuarios } = useAtivador();

  useEffect(() => {
    buscaCadastrados(setUsuarios);
  }, []);

  if (!usuarios) {
    return;
  }

  return (
    <>
      <div className={classes.maincontainer}>
        <div className={classes.contentContainer}>
          <div className={classes.cadastroContainer}>
            <h1>Cadastro de novo usuários</h1>
            <form onSubmit={(e) => handleSubmitCadastro(e, setUsuarios)}>
              <div className={classes.entradas}>
                {/* Cadastro para acesso */}
                <div className={classes.cadastro}>
                  <label htmlFor="cadastro">Cadastro: </label>
                  <input
                    type="text"
                    name="cadastro"
                    id="cadastro"
                    placeholder="Cadastro"
                    required
                  />
                </div>

                {/* Nome do usuário */}
                <div className={classes.nome}>
                  <label htmlFor="usuario">Nome: </label>
                  <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="Nome"
                    required
                  />
                </div>

                {/* Função */}
                <div className={classes.origem}>
                  <label htmlFor="origem">Permissão: </label>
                  <select name="origem" id="origem" required>
                    <option value="">Selecione</option>
                    <option value="EXP">EXP</option>
                    <option value="SAC">SAC</option>
                    <option value="ADM">ADM</option>
                  </select>
                </div>
                <div className={classes.enviar}>
                  <input
                    type="submit"
                    name="enviar"
                    id="enviar"
                    value={"Criar"}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={classes.usuariosAtivos}>
            <h2>Usuários ativos:</h2>
            <div className={classes.userCard}>
              <ul>
                {usuarios.map((users) => (
                  <li key={users.id}>
                    <UserLoader users={users} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
