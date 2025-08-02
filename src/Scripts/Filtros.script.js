let valores = [
  "notaDev", //[0]
  "dataInicial", //[1]
  "dataFinal", //[2]
  "userCadastro", //[3]
  "concluídos", //[4]
  "expirado", //[5]
];
let campos = [0, 1, 2, 3, 4, 5];

function getFiltros(e, valores, i) {
  valores[i] =
    e.target[i].type === "checkbox" ? e.target[i].checked : e.target[i].value;
  return valores;
}

// Insere itens na SessionStorage
export function sessionSetItem(elementName, valor) {
  sessionStorage.setItem(elementName, valor);
}
// Variável com a data do dia
let dataHoje = sessionStorage.getItem("hoje");

// Coleta os dados inseridos nos filtros e envia para a SessionStorage
export function handleSubmit(e) {
  // e.preventDefault();
  for (let i = 0; i < campos.length; i++) {
    const element = e.target[i].value;
    const elementName = e.target[i].name;
    let filtros = getFiltros(e, valores, i);

    sessionSetItem(elementName, filtros[i]);
  }
  filtrarDados();
}

// executa ações de limpeza ao resetar o formulário
export function handleReset(e, setData, setNota, setDataInicial) {
  // Define o filtro "dataFinal" para o dia atual ao resetar o formulário
  setData(getDataHoje);
  setNota("");
  setDataInicial("");
  // Limpa os itens que foram inseridos na SessionStorage
  // e reseta o filtro "dataFinal" na SessionStorage
  for (let i = 0; i < campos.length; i++) {
    const elementName = e.target[i].name;
    sessionSetItem(elementName, elementName === "dataFinal" ? dataHoje : "");
  }
  window.location.reload();
}

// Descobre a data de hoje e converte para "yyyy-mm-dd"
export function getDataHoje() {
  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, "0");
  const dd = String(hoje.getDate()).padStart(2, "0");

  const dataFormatadaUSA = `${yyyy}-${mm}-${dd}`; // Formata a data, padrão USA
  const dataFormatadaBR = `${dd}/${mm}/${yyyy}`; // Formata a data, padrão BR
  dataHoje != dataFormatadaUSA
    ? (sessionSetItem("hoje_USA", dataFormatadaUSA),
      sessionSetItem("hoje_BR", dataFormatadaBR))
    : [];
  return dataFormatadaUSA;
}

// Filtra os dados com base nos filtros selecionados
// e retorna os dados filtrados
export async function filtrarDados(setRegistros) {
  let dadosFiltrados = [];
  let notaFiscal = sessionStorage.getItem("notaDev") ?? "";
  let dataInicial = sessionStorage.getItem("dataInicial") ?? "";
  let dataFinal = sessionStorage.getItem("dataFinal") ?? "";
  let cadastro = sessionStorage.getItem("userCadastro") ?? "";
  let concluido = sessionStorage.getItem("concluídos") ?? "";
  let expirado = sessionStorage.getItem("expirado") ?? "true";

  // testaSQL(notaFiscal, dataInicial, dataFinal, expirado, cadastro, concluido);
  dadosFiltrados = await window.electronAPI.buscarDadosFiltrados({
    notaFiscal,
    dataInicial,
    dataFinal,
    expirado,
    cadastro,
    concluido,
  });

  setRegistros(dadosFiltrados);
  return;
}

// Converte datas para o padrão PT-BR
export function parseDataBR(data) {
  const [ano, mes, dia] = data.split(/[-\/]/);
  // console.log(ano, mes, dia);

  return `${dia}/${mes}/${ano}`;
}

// Converte datas para o padrão USA
export function parseDataUSA(data) {
  const [dia, mes, ano] = data.split(/[-\/]/);
  // console.log(ano, mes, dia);

  return `${ano}-${mes}-${dia}`;
}

// Coleta e seta o valor do campo Nota Fiscal
// onChange
export function handleChange(e, setNota) {
  setNota(e.target.value);
}

// Coleta e armazena o valor inserido na data Inicial
// onChange
export function handleChangeDataInicial(e, setDataInicial) {
  setDataInicial(e.target.value);
  sessionSetItem(e.target.name, e.target.value);
}

// Coleta e armazena o valor inserido na data Final
// onChange
export function handleChangeDataFinal(e, setDataFinal) {
  setDataFinal(e.target.value);
  sessionSetItem(e.target.name, e.target.value);
}

// Processa osinputs da  checkbos "Mostrar concluídos"
export function handleChangeCheckboxC(e, setCheckedC) {
  if (e === "false" || e === null || e === "") {
    sessionSetItem("concluídos", false);
    return false;
  } else if (e === "true" || e === null) {
    return true;
  }
  setCheckedC(e.target.checked);
  sessionSetItem(e.target.name, e.target.checked);
}

// Processa osinputs da  checkbos "Mostrar expirados"
export function handleChangeCheckboxE(e, setCheckedE) {
  if (e === "false") {
    return false;
  } else if (e === "true" || e === null || e === "") {
    sessionSetItem("expirado", true);
    return true;
  }
  setCheckedE(e.target.checked);
  sessionSetItem(e.target.name, e.target.checked);
}

// Organiza os dados para o modelo utilizado pelos Loaders
export function organiza(dataItem) {
  // Calcula a diferença entre as datas para exibir na tela
  let dataFinal = new Date(dataItem.PrazoFinal);
  let dataHoje = new Date(getDataHoje());
  let DiasRestantes = (dataFinal - dataHoje) / (1000 * 60 * 60 * 24);

  return [
    { label: "NF Devolução", valor: dataItem.NotaDev },
    { label: "Transportadora", valor: dataItem.Transportadora },
    { label: "Data de Cadastro", valor: parseDataBR(dataItem.DataRegistro) },
    { label: "Motivo", valor: dataItem.TipoDev },
    { label: "Status Atual", valor: dataItem.StatusEXP },
    { label: "Atendente SAC", valor: dataItem.AtendenteSAC },
    { label: "Atendente EXP", valor: dataItem.AtendenteEXP },
    { label: "NF Venda", valor: dataItem.NotaVenda },
  ];
}
