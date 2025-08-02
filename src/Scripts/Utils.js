import { getDataHoje } from "./Filtros.script";
export async function atualizaParametros() {
  const dados = await window.electronAPI.BuscaDadosDev();

  let dadosDias = [];

  for (let i = 0; i < dados.length; i++) {
    let dataFinal = "";
    let dataHoje = "";
    let DiasRestantes = "";
    const prazo = dados[i].PrazoFinal;
    const notaVenda = dados[i].NotaVenda;
    const notaDev = dados[i].NotaDev;
    const id = dados[i].id;

    if (prazo !== null && notaDev !== null) {
      dataFinal = new Date(prazo);
      dataHoje = new Date(getDataHoje());
      DiasRestantes = (dataFinal - dataHoje) / (1000 * 60 * 60 * 24);
      if (DiasRestantes !== 45) {
        dadosDias.push({
          DiasRestantes: DiasRestantes,
          notaVenda: notaVenda,
          notaDev: notaDev,
        });
      }
    }
  }
  await window.electronAPI.updateDadosDias(dadosDias);
}

function retornaTipoUsuario() {
  let tipo = sessionStorage.getItem("usuário").split(",")[2].trim();
  return tipo;
}

export function ehUsuarioPermitido(paramUsuarioPermitido) {
  let tipoUsuario = retornaTipoUsuario();
  // console.log(tipoUsuario, paramUsuarioPermitido);

  return tipoUsuario == paramUsuarioPermitido || tipoUsuario == "ADM";
}

export function ehUsuarioPermitidoSAC() {
  return ehUsuarioPermitido("SAC");
}

export function ehUsuarioPermitidoEXP() {
  return ehUsuarioPermitido("EXP");
}
