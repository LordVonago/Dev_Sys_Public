import { parseDataUSA } from "./Filtros.script";

export async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formInputs = Object.fromEntries(formData.entries());

  let data = new Date();
  data.setDate(data.getDate() + 45);

  const dadosExtras = {
    StatusEXP: "NF Efetuada",
    StatusSAC: "NF Efetuada",
    PrazoFinal: `${parseDataUSA(data.toLocaleDateString("pt-br"))}`,
    AtendenteEXPCadastro: sessionStorage
      .getItem("usuário")
      .split(",")[1]
      .trim(),
    DiasRestantes: 45,
  };

  // Formata a data coletada do formulário para o padrão USA para registro no banco
  formInputs.DataRegistroEXP = parseDataUSA(formInputs.DataRegistroEXP);

  const registrosCompletos = { ...formInputs, ...dadosExtras };

  let validarCampos = Array(
    registrosCompletos.TipoDev,
    registrosCompletos.Transportadora
  );

  for (let i = 0; i < validarCampos.length; i++) {
    const element = validarCampos[i];
    if (element == "") {
      await window.electronAPI.mostrarAlerta(
        "Os campos 'Transportadora' e 'Motivo' não podem ser nulos."
      );
      return true;
    }
  }
  // console.log(registrosCompletos);

  console.log(`UPDATE dev
            SET NotaDev = ${registrosCompletos.NotaDev},
            AtendenteEXP = '${registrosCompletos.AtendenteEXP}',
            DataRegistroEXP = '${registrosCompletos.DataRegistroEXP}',
            OBSEXP = '${registrosCompletos.Observação}',
            StatusEXP = '${registrosCompletos.StatusEXP}',
            StatusSAC = '${registrosCompletos.StatusSAC}',
            PrazoFinal = '${registrosCompletos.PrazoFinal}',
            AtendenteEXPCadastro = '${registrosCompletos.AtendenteEXPCadastro}',
            DiasRestantes = ${registrosCompletos.DiasRestantes}
            WHERE NotaVenda = ${registrosCompletos.NotaVenda}
            `);
  // console.log(registrosCompletos);

  await window.electronAPI.updateDadosCadastroEXP(registrosCompletos);
  return true;
}

// Recebe o intup de "Enter" ou "Tab" no campo de nota de venda
// E busca no banco valores complementares
export async function handleBusca(
  e,
  setselecioneMotivo,
  setselecioneTrp,
  setNotadev
) {
  let resposta = [];
  let valorParaBuscar = e.target.value;
  let action = true;

  let key = e.key;
  let keyCode = e.keyCode;

  if (e.target.value == "") {
    return;
  }

  if (key === "Enter" || key === "Tab" || keyCode === 13 || keyCode === 9) {
    e.preventDefault();

    resposta = [];
    resposta = await window.electronAPI.BuscaDadosEXPCadastro(valorParaBuscar);

    if (resposta[0].NotaDev) {
      action = await pedeConfirmacao(
        "Já existe nota de devolução resgistrada\nApenas o novo valor será salvo\n\nDeseja prosseguir?"
      );
    }
    if (action) {
      console.log(resposta);
      setselecioneMotivo(resposta[0].TipoDev);
      setselecioneTrp(resposta[0].Transportadora);
      setNotadev(resposta[0].NotaDev);
    } else {
      setselecioneMotivo("");
      setselecioneTrp("");
      setNotadev("");
      e.target.value = "";
      action = true;
      return;
    }
  }
}

async function pedeConfirmacao(msg) {
  return window.electronAPI.mostrarConfirmacao(msg);
}
