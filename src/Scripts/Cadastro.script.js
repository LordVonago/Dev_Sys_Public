import { parseDataUSA } from "./Filtros.script.js";

// Coleta os dados do formulário de cadastro e valida o preenchimento
export async function handleSubmit(e, ativa, setAtiva, setEnviando, enviando) {
  e.preventDefault();

  let origem = sessionStorage.getItem("usuário").split(",")[2];
  let notaDev = e.target[0].value;
  let transportadora = e.target[1].value;
  let dataCadastro = parseDataUSA(new Date().toLocaleDateString("pt-BR"));
  let prazoFinal = parseDataUSA(
    new Date(new Date().setDate(new Date().getDate() + 45)).toLocaleDateString(
      "pt-BR"
    )
  );
  let diasRestantes = 45;
  let motivo = e.target[2].value;
  let statusAtual = "Cadastrado";
  let userCadastro = sessionStorage.getItem("usuário").split(",")[0];
  let notaVenda = e.target[3].value;
  let obs = e.target[4].value;
  let novoRegistro = [
    {
      ORIGEM: origem,
      NF_EXTRAVIO: notaDev,
      TRANSPORTADORA: transportadora,
      DATA_CADASTRO: dataCadastro,
      PRAZO_FINAL: prazoFinal,
      DIAS_RESTANTES: diasRestantes,
      MOTIVO: motivo,
      STATUS_ATUAL: statusAtual,
      USER_CADASTRO: userCadastro,
      NF_VENDA: notaVenda,
      OBS: obs,
      LINHA: null,
    },
  ];

  // Estes campos precisam obrigatóriamente receber um valor
  let campos = [0, 1, 2, 3];

  // Exibe mensagem de erro se os valores inseridos não forem válidos
  for (let campo = 0; campo < campos.length; campo++) {
    const element = e.target[campo].value;
    if (element === "S" || element === "") {
      setAtiva(false);
      return;
    } else {
      setAtiva(true);
    }
  }

  // Insere o registro no banco de dados
  // Verifica se o usuário está enviando o formulário repetidamente
  if (enviando) return;
  setEnviando(true);
  // Insere o registro no banco de dados
  console.log("Enviando registros: ", novoRegistro);
  await window.electronAPI.inserirRegistro(novoRegistro[0]);
  e.target.reset();
  e.target[0].focus();
  setEnviando(false);
}

// impede a aplicação de espaços com "Enter" nas observações
export function handleEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    return;
  }
}

// Executa ações ao resetar o formulário
export function handleReset(e, setAtiva) {
  setAtiva(true);
}
