// Buasca os usuários ativos no banco e exibe na tela
export async function buscaCadastrados(setUsuarios) {
  let users = await window.electronAPI.buscaUsuariosCadastrados();
  setUsuarios(users);
  return users;
}

// Insere um usuário no banco
export async function handleSubmitCadastro(e, setUsuarios) {
  e.preventDefault();
  let cadastro = formataUsuarios(e);

  let existe = await window.electronAPI.validaUsuário(cadastro[0]);
  if (existe) {
    await window.electronAPI.mostrarAlerta(
      `Este usuário '${cadastro[0]}' Já existe`
    );
    return;
  } else {
    await window.electronAPI.criaUsuario(cadastro);
    await window.electronAPI.mostrarAlerta(`Usuário criado`);
    buscaCadastrados(setUsuarios);
  }
}

// Deleta o usuário do banco
export async function handleUsersSubmitDelete(e, setUsuarios) {
  e.preventDefault();
  let cadastro = formataUsuarios(e);

  // Vaidação extra antes de deletar um usuário
  let ativaDelete = comparaUsuario(cadastro[0]);
  if (ativaDelete) {
    return;
  }

  await window.electronAPI.removeUsuario(cadastro);
  await window.electronAPI.mostrarAlerta(`Usuário removido`);
  buscaCadastrados(setUsuarios);
}

// Formata e organiza os valores do form em array
function formataUsuarios(e) {
  let cadastro = [];

  const formData = new FormData(e.target);
  const formInputs = Object.fromEntries(formData.entries());

  cadastro = [
    formInputs.cadastro.toLowerCase(),
    formInputs.usuario.toLowerCase(),
    formInputs.origem.toUpperCase(),
  ];
  return cadastro;
}

// Valida se o usuário que esta sendo deletado é o mesmo que esta logado
export function comparaUsuario(usuario) {
  let usuarioAtual = sessionStorage.getItem("usuário").split(",")[1].trim();

  if (usuarioAtual === usuario) {
    return true;
  } else {
    return false;
  }
}
