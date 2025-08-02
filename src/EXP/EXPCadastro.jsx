import { useState, useRef } from "react";
import classes from "./EXPCadastro.module.css";
import { handleSubmit, handleBusca } from "../Scripts/EXPCadastro.script";
const EXPCadastro = () => {
  const [selecioneTrp, setselecioneTrp] = useState("Selecione");
  const [selecioneMotio, setselecioneMotivo] = useState("Selecione");
  const [notadev, setNotadev] = useState("");
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
          <form
            ref={formRef}
            className={classes.formcadastro}
            onSubmit={(e) => submitForm(e)}
          >
            <div className={classes.nota}>
              <div className={classes.item}>
                <label htmlFor="nota">Nota de Devolução</label>
                <input
                  type="number"
                  name="NotaDev"
                  id="nota"
                  placeholder="Nota de Devolução"
                  value={notadev ?? ""}
                  onChange={(e) => setNotadev(e.target.value)}
                  required
                />
              </div>
              <div className={classes.item}>
                <label htmlFor="notavenda">Nota de Venda</label>
                <input
                  type="number"
                  name="NotaVenda"
                  id="notavenda"
                  placeholder="Nota de Venda"
                  required
                  onKeyDown={(e) =>
                    handleBusca(
                      e,
                      setselecioneMotivo,
                      setselecioneTrp,
                      setNotadev
                    )
                  }
                />
              </div>
            </div>

            <label htmlFor="transportadora">Transportadora</label>
            <select
              name="Transportadora"
              id="transportadora"
              value={selecioneTrp}
              onChange={(e) => setselecioneTrp(e.target.value)}
              readOnly
            >
              <option value="">Selecione</option>
              <option value="Total Express" hidden>
                Total Express
              </option>
              <option value="Jadlog" hidden>
                Jadlog
              </option>
              <option value="GFL" hidden>
                GFL
              </option>
              <option value="Smart2C" hidden>
                Smart2C
              </option>
              <option value="Correios" hidden>
                Correios
              </option>
            </select>

            <label htmlFor="motivo">Motivo</label>
            <select
              name="TipoDevolução"
              id="motivo"
              value={selecioneMotio}
              // onChange={(e) => setselecioneMotivo(e.target.values)}
              readOnly
            >
              <option value="">Selecione</option>
              <option value="Extravio Atender Cliente" hidden>
                Extravio Atender Cliente
              </option>
              <option value="Extravio Qualidade" hidden>
                Extravio Qualidade
              </option>
              <option value="Extravio Confirmado" hidden>
                Extravio Confirmado
              </option>
            </select>

            <label htmlFor="obs">Observação</label>
            <input
              type="text"
              name="Observação"
              id="obs"
              placeholder="Observação"
            />

            <label htmlFor="atendente">Atendente</label>
            <input
              type="text"
              name="AtendenteEXP"
              id="atendente"
              value={sessionStorage.getItem("usuário").split(",")[0]}
              readOnly
            />
            <label htmlFor="data">Data do Registro</label>
            <input
              type="text"
              name="DataRegistroEXP"
              id="data"
              defaultValue={sessionStorage.getItem("hoje_BR")}
              readOnly
            />

            <div className={classes.buttons}>
              <input type="submit" value="Enviar" />
              <input
                type="reset"
                value="Cancelar"
                onClick={() => [
                  setselecioneMotivo(""),
                  setselecioneTrp(""),
                  setNotadev(""),
                ]}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EXPCadastro;
