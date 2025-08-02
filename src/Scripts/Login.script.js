import { sessionSetItem } from "./Filtros.script.js";
import { atualizaParametros } from "./Utils.js";

// Função para lidar com a mudança do checkbox "Manter Conectado"
// Atualiza o estado do checkbox e salva na sessionStorage
export function handlekeepchange(e, setManterConectado) {
  setManterConectado(e.target.checked);
  sessionSetItem(e.target.name, e.target.checked);
}

// Função para lidar com o envio do formulário de login
export async function handleSubmit(e) {
  e.preventDefault();

  const usuario = e.target[0].value;

  const existe = await verificarUsuário(usuario);
  // valida a resposta do banco de dados
  // Se existir, redireciona para a página index.html
  // e salva o nome do usuário no sessionStorage
  // Se não existir, exibe um alerta e não redireciona
  // console.log("Verificando usuário:", usuario);
  // console.log("Usuário encontrado:", existe);
  if (!existe) {
    // console.log(existe);
    await window.electronAPI.mostrarAlerta(`Usuário não encontrado`);
    return;
  } else {
    // console.log("Usuário encontrado:", existe);
    console.log(existe.nome);
    sessionSetItem("usuário", `${existe.nome},${usuario},${existe.origem}`);

    // Atualiza os campos de "Dias Restantes no banco ao abrir o app"
    await atualizaParametros().then((window.location.href = "index.html"));
  }
}

// Verifica se o usuário existe no banco de dados
// Retorna um array com o status e os dados do usuário
const verificarUsuário = async (usuario) => {
  if (
    window.electronAPI &&
    typeof window.electronAPI.validaUsuário === "function"
  ) {
    const existe = await window.electronAPI.validaUsuário(usuario);
    return existe;
  } else {
    console.warn("Electron não está disponível (modo web)");
    // Retorna true ou false conforme seu critério
    return true; // ou false se quiser bloquear fora do Electron
  }
};

// Limpa o sessionStorage e recarrega a página
// para efetivar o logout
export function handleLogOut() {
  sessionStorage.clear();
  window.location.reload();
}
