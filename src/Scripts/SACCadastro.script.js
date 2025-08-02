export async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formInputs = Object.fromEntries(formData.entries());

  const notaRepetida =
    (await validaNotaRepetida(parseInt(formInputs.NotaVenda))) || "";

  if (notaRepetida.NotaVenda == parseInt(formInputs.NotaVenda)) {
    alert(
      `A nota fiscal '${notaRepetida.NotaVenda}' já foi cadastrada anteriormente`
    );
    return true;
  }

  const dadosExtras = {
    StatusSAC: "Cadastrado",
    StatusEXP: "AG. Nota Fiscal",
    AtendenteSACCadastro: `${sessionStorage
      .getItem("usuário")
      .split(",")[1]
      .trim()}`,
  };
  // console.log(dadosExtras);

  const registroCompleto = { ...formInputs, ...dadosExtras };

  let validarCampos = Array(
    registroCompleto.Marca,
    registroCompleto.Assunto,
    registroCompleto.TipoDev,
    registroCompleto.Transportadora
  );
  for (let i = 0; i < validarCampos.length; i++) {
    const element = validarCampos[i];
    if (element === "S" || element == "") {
      console.log(element);
      return true;
    }
  }

  // console.log(registroCompleto);
  console.log("Enviando registros: ", registroCompleto);
  await window.electronAPI.inserirRegistroNovaDB(registroCompleto);
  return true;
}

async function validaNotaRepetida(nota) {
  console.log(nota);

  return await window.electronAPI.validaNota(nota);
}
