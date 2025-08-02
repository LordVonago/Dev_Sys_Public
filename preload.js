const { contextBridge, ipcRenderer } = require("electron");
// const { validaUsuário } = require("./db");

contextBridge.exposeInMainWorld("electronAPI", {
  // getRegistros: () => ipcRenderer.invoke("get-registros"),
  mostrarAlerta: (msg) => ipcRenderer.invoke("mostrar-alerta", msg),
  mostrarConfirmacao: (msg) => ipcRenderer.invoke("mostrar-confirmacao", msg),
  validaUsuário: (user) => ipcRenderer.invoke("verificar-usuario", user),
  validaNota: (nota) => ipcRenderer.invoke("valida-nota", nota),
  // inserirRegistro: (registro) =>
  //   ipcRenderer.invoke("inserir-registro", registro),
  buscarDadosFiltrados: (dev) =>
    ipcRenderer.invoke("buscar-dados-filtrados", dev),
  BuscaDadosDev: () => ipcRenderer.invoke("Busca-Dados-Dev"),
  inserirRegistroNovaDB: (dev) =>
    ipcRenderer.invoke("inserir-registro-novo-banco", dev),
  BuscaDadosEXPCadastro: (notaVenda) =>
    ipcRenderer.invoke("Busca-Dados-EXP-Cadastro", notaVenda),
  updateDadosCadastroEXP: (atualizar) =>
    ipcRenderer.invoke("update-Dados-Cadastro-EXP", atualizar),
  updateDadosDias: (dadosDias) =>
    ipcRenderer.invoke("update-Dados-Dias", dadosDias),
  buscaUsuariosCadastrados: () =>
    ipcRenderer.invoke("busca-Usuarios-Cadastrados"),
  criaUsuario: (cadastro) => ipcRenderer.invoke("cria-Usuario", cadastro),
  removeUsuario: (cadastro) => ipcRenderer.invoke("remove-Usuario", cadastro),
});
