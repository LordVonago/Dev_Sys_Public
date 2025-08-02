import { useRef } from "react";
import classes from "./SACCadastro.module.css";
import { handleSubmit } from "../Scripts/SACCadastro.script.js";
import { useAtivador } from "../context/AtivadorContext.jsx";

const SACCadastro = () => {
  let atendende = sessionStorage.getItem("usuário").split(",")[0];
  const { setmostrarSac, setmostrarCards } = useAtivador();
  const formRef = useRef(null);

  async function submitForm(e) {
    e.preventDefault();
    const dadosRegistrados = await handleSubmit(e);

    if (dadosRegistrados) formRef.current.reset();
  }
  return (
    <>
      <div className={classes.maincontainer}>
        <div className={classes.cadastrocontainer}>
          <h1>Cadastro Extravios</h1>
          <form
            ref={formRef}
            className={classes.formCadastro}
            onSubmit={(e) => submitForm(e)}
          >
            <div className={classes.container}>
              <div className={classes.esquerda}>
                <label className={classes.label} htmlFor="nota">
                  Nota Fiscal
                </label>
                <input
                  type="number"
                  id="nota"
                  name="NotaVenda"
                  placeholder="Nota Fiscal"
                  required
                />

                <label className={classes.label} htmlFor="marca">
                  Marca
                </label>
                <select
                  className={classes.select}
                  id="marca"
                  required
                  name="Marca"
                >
                  <option value="">Selecione</option>
                  <option value="Karsten">Karsten</option>
                  <option value="Trussardi">Trussardi</option>
                  <option value="Karsten MKT">Karsten MKT</option>
                </select>

                <label className={classes.label} htmlFor="transportadora">
                  Transportadora
                </label>
                <select
                  className={classes.select}
                  name="Transportadora"
                  id="transportadora"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Total Express">Total express</option>
                  <option value="Jadlog">Jadlog</option>
                  <option value="GFL">GFL</option>
                  <option value="Smart2C">Smart2C</option>
                </select>

                <label className={classes.label} htmlFor="tipo">
                  Tipo de devolução
                </label>
                <select
                  className={classes.select}
                  name="TipoDev"
                  id="tipo"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Extravio Atender Cliente">
                    Extravio Atender Cliente
                  </option>
                  <option value="Extravio Confirmado">
                    Extravio Confirmado
                  </option>
                  <option value="Extravio Qualidade">Extravio Qualidade</option>
                </select>

                <label className={classes.label} htmlFor="assunto">
                  Assunto
                </label>
                <select
                  className={classes.select}
                  name="Assunto"
                  id="assunto"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Cliente não recebeu">
                    Cliente não recebeu
                  </option>
                  <option value="Em devolução">Em devolução</option>
                  <option value="Extravio Confirmado">
                    Extravio Confirmado
                  </option>
                </select>
              </div>

              <div className={classes.direita}>
                <label className={classes.label} htmlFor="cliente">
                  {" "}
                  Nome do cliente
                </label>
                <input
                  type="text"
                  id="cliente"
                  name="NomeCliente"
                  placeholder="Nome do Cliente"
                  required
                />

                <label className={classes.label} htmlFor="prazo">
                  Prazo (Quando aplicável)
                </label>
                <input type="date" id="prazo" name="Prazo" />

                <label className={classes.label} htmlFor="dataProtocolo">
                  Data do protocolo
                </label>
                <input type="date" id="dataProtocolo" name="DataProtocolo" />

                <label className={classes.label} htmlFor="devolvido">
                  Devolvido fisicamente?
                </label>
                <input
                  type="text"
                  name="FoiDevolvido"
                  id="devolvido"
                  placeholder="Foi Devolvido?"
                ></input>
              </div>
            </div>
            <div>
              <label className={classes.label} htmlFor="tratativa">
                Canal de tratativa
              </label>
              <textarea
                type="text"
                name="CanalTratativa"
                id="assunto"
                rows={3}
              ></textarea>

              <label className={classes.label} htmlFor="descricao">
                Descrição
              </label>
              <textarea
                type="text"
                id="descricao"
                name="Descrição"
                className={classes.descrição}
                rows={3}
              ></textarea>

              <label className={classes.label} htmlFor="atendente">
                Atendente
              </label>
              <input
                className={classes.atendente}
                type="text"
                name="AtendenteSAC"
                id="atendende"
                defaultValue={atendende}
                readOnly
              ></input>

              <label className={classes.label} htmlFor="dateRegistro">
                Data do registro
              </label>
              <input
                type="date"
                id="dateRegistro"
                name="DataRegistro"
                defaultValue={sessionStorage.getItem("hoje_USA")}
                readOnly
              />
            </div>
            <div className={classes.buttons}>
              <input type="submit" name="" id="" value="Enviar" />
              <input
                type="reset"
                name=""
                id=""
                value="Cancelar"
                onClick={() => {
                  setmostrarSac(false);
                  setmostrarCards(true);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SACCadastro;
