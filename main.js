const { dialog, app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");
const db = require("./db");

app.setName("SysDev");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startURL = app.isPackaged
    ? pathToFileURL(path.join(__dirname, "dist/index.html")).href
    : "http://localhost:5173";

  win.loadURL(startURL);
}

app.whenReady().then(() => {
  createWindow();
  // Coleta os registros do banco de dados para exibir na aplicação
  // ipcMain.handle("get-registros", () => {
  //   return db.listarRegistros();
  // });

  // Mostra alertas, para evitar usar "alert"
  ipcMain.handle("mostrar-alerta", async (event, message) => {
    await dialog.showMessageBox({
      type: "info",
      message: message,
      buttons: ["OK"],
    });
  });

  // Mostra um alerta com coleta de dados do usuário
  ipcMain.handle("mostrar-confirmacao", async (event, message) => {
    const result = await dialog.showMessageBox({
      type: "warning",
      buttons: ["Sim", "Cancelar"],
      defaultId: 0, // botão "Sim" como padrão
      cancelId: 1, // botão "Cancelar" para ESC ou fechamento
      message: message,
    });
    // 0 = "Sim", 1 = "Cancelar"
    return result.response === 0; // true se "Sim", false se "Cancelar" convertido para boolean
  });

  // Valida o usuário no banco de dados
  ipcMain.handle("verificar-usuario", (event, user) => {
    return db.validaUsuário(user);
  });
  // Insere um novo registro no banco de dados
  ipcMain.handle("inserir-registro", (event, registro) => {
    db.inserirRegistro(registro);
  });

  // Insere um registro no novo banco
  ipcMain.handle("inserir-registro-novo-banco", (event, dev) => {
    db.inserirRegistroNovaDB(dev);
  });

  // Busca dados filtrados com base nos critérios fornecidos
  ipcMain.handle("buscar-dados-filtrados", (event, dev) => {
    const {
      notaFiscal,
      dataInicial,
      dataFinal,
      expirado,
      cadastro,
      concluido,
    } = dev;
    return db.buscarDadosFiltrados(
      notaFiscal,
      dataInicial,
      dataFinal,
      expirado,
      cadastro,
      concluido
    );
  });

  // Busca todos os dados da tabela dev
  ipcMain.handle("Busca-Dados-Dev", (event) => {
    return db.BuscaDadosDev();
  });

  // Busca os dados para preencher o cadastro de devolução da Expedição
  ipcMain.handle("Busca-Dados-EXP-Cadastro", (event, dev) => {
    return db.BuscaDadosEXPCadastro(dev);
  });

  // Atualiza os dados no banco com base nos registros da expedição
  ipcMain.handle("update-Dados-Cadastro-EXP", (event, atualizar) => {
    db.updateDadosCadastroEXP(atualizar);
  });

  // Verifica no banco se o número da nota de venda inserido já existe
  ipcMain.handle("valida-nota", (event, nota) => {
    return db.validaNota(nota);
  });

  // Atualiza os dias restantes no banco
  ipcMain.handle("update-Dados-Dias", (event, dadosDias) => {
    db.updateDadosDias(dadosDias);
  });

  // Busca no banco todos os usuários ativos
  ipcMain.handle("busca-Usuarios-Cadastrados", () => {
    return db.buscaUsuariosCadastrados();
  });

  // Cria um novo usuário
  ipcMain.handle("cria-Usuario", (event, cadastro) => {
    db.criaUsuario(cadastro);
  });

  // Remove um novo usuário
  ipcMain.handle("remove-Usuario", (event, cadastro) => {
    db.removeUsuario(cadastro);
  });

  console.log("Banco carregado");

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Fecha o aplicativo quando todas as janelas são fechadas, exceto no macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {});
