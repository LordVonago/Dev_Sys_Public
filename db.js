const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

// Caminho para ./Data/data/data.sqlite
const dbFolder = path.resolve(__dirname, "Data", "data");
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const dbPath = path.join(dbFolder, "data.sqlite");
const db = new Database(dbPath);

// Insere os dados no novo banco de dados "dev"
// Dados originados do cadastro do SAC
function inserirRegistroNovaDB(dev) {
  const stmt = db.prepare(`
    INSERT INTO dev (
      StatusSAC,
      NotaVenda,Marca,Transportadora,TipoDev,Assunto,NomeCliente,
      Prazo,DataProtocolo,FoiDevolvido,CanalTratativa,Descrição,AtendenteSAC,
      StatusEXP,DataRegistro,notaDev,AtendenteEXP, AtendenteSACCadastro
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    dev.StatusSAC,
    dev.NotaVenda,
    dev.Marca,
    dev.Transportadora,
    dev.TipoDev,
    dev.Assunto,
    dev.NomeCliente,
    dev.Prazo,
    dev.DataProtocolo,
    dev.FoiDevolvido,
    dev.CanalTratativa,
    dev.Descrição,
    dev.AtendenteSAC,
    dev.StatusEXP,
    dev.DataRegistro,
    dev.NotaDev,
    dev.AtendenteEXP,
    dev.AtendenteSACCadastro
  );
}

// Valida o usuário no banco de dados
// Retorna o nome do usuário se encontrado, ou undefined se não existir
function validaUsuário(user) {
  const stmt = db.prepare(
    "SELECT nome, origem FROM usuários WHERE cadastro = ?"
  );

  const result = stmt.get(user);
  // console.log("resposta: ", result);
  return result;
}

// Busca os dados no banco de acordo com os filtros aplicados
// Para serem exibidos como cards na home
// Realiza a Busca nos campos de nota de venda e de nota de Devolução
function buscarDadosFiltrados(
  prNota,
  prDTInicial,
  prDTFinal,
  prExpirado,
  prCadastro,
  prConcluido,
  login
) {
  console.log(prConcluido);

  let SQL = "SELECT * FROM dev";

  let filtros = [
    prNota == "" || prNota == null
      ? ""
      : `NotaDev = ${prNota} OR NotaVenda = ${prNota}`,
    prDTInicial == "" || prDTInicial == null
      ? ""
      : ` DataRegistro >= '${prDTInicial}'`,
    prDTFinal == "" || prDTFinal == null
      ? ""
      : ` DataRegistro <= '${prDTFinal}'`,
    prCadastro == "" || prCadastro == null
      ? ""
      : ` (AtendenteEXPCadastro = '${prCadastro}' OR AtendenteSACCadastro = '${prCadastro}') `,
    prExpirado == "true"
      ? ""
      : ` (DiasRestantes >= 0 OR DiasRestantes IS NULL)`,
    prConcluido == "true" ? "" : ` NotaDev IS NULL `,
  ];
  console.log(
    "filtros: ",
    prNota,
    prDTInicial,
    prDTFinal,
    prExpirado,
    prCadastro,
    prExpirado,
    prConcluido
  );
  for (let i = 0; i < filtros.length; i++) {
    const element = filtros[i];
    // console.log("element: ", element);
    if (element !== "" && element !== null && SQL === "SELECT * FROM dev") {
      SQL += " WHERE " + element;
    } else if (element !== "") {
      SQL += " AND " + element;
    }
  }
  if (SQL === "SELECT * FROM dev") {
    SQL = `SELECT id, NotaVenda, AtendenteSAC, NotaDev,
       Transportadora, DataRegistro, TipoDev, StatusEXP, 
       AtendenteEXP, OBSEXP, PrazoFinal FROM dev`;
  }
  // Executa a consulta SQL e retorna os resultados
  console.log("SQL: ", SQL);
  const stmt = db.prepare(SQL);
  return stmt.all();
}

// Busca todos os dados da tabela dev
function BuscaDadosDev() {
  let SQL = "SELECT * FROM dev";
  // Executa a consulta SQL e retorna os resultados
  console.log("SQL: ", SQL);
  const stmt = db.prepare(SQL);
  return stmt.all();
}

// Busca os dados no banco para complementar o cadastro da Expedição
function BuscaDadosEXPCadastro(notaVenda) {
  let SQL = `SELECT "Transportadora", "TipoDev", "NotaDev" FROM dev WHERE "NotaVenda" = '${notaVenda}'`;

  // Executa a consulta SQL e retorna os resultados
  console.log("SQL: ", SQL);
  const stmt = db.prepare(SQL);
  return stmt.all();
}

// Atualiza os dados no banco com base nos registros da expedição
function updateDadosCadastroEXP(atualizar) {
  let SQL = `UPDATE dev 
            SET NotaDev = ${atualizar.NotaDev},
            AtendenteEXP = '${atualizar.AtendenteEXP}',
            DataRegistroEXP = '${atualizar.DataRegistroEXP}',
            OBSEXP = '${atualizar.Observação}',
            StatusEXP = '${atualizar.StatusEXP}',
            StatusSAC = '${atualizar.StatusSAC}',
            PrazoFinal = '${atualizar.PrazoFinal}',
            AtendenteEXPCadastro = '${atualizar.AtendenteEXPCadastro}',
            DiasRestantes = ${atualizar.DiasRestantes}
            WHERE NotaVenda = ${atualizar.NotaVenda}
            `;

  // Executa a consulta SQL e retorna os resultados
  console.log("SQL: ", SQL);
  const stmt = db.prepare(SQL);
  stmt.run();
}

// Verifica no banco se o número da nota de venda inserido já existe
function validaNota(nota) {
  const stmt = db.prepare("SELECT NotaVenda FROM dev WHERE NotaVenda = ?");
  console.log(stmt.get(nota));

  const result = stmt.get(nota);
  return result;
}

// Atualiza os dias restantes das notas no banco
function updateDadosDias(dadosDias) {
  let SQL = "";
  for (let i = 0; i < dadosDias.length; i++) {
    const element = dadosDias[i];
    SQL = `UPDATE dev SET DiasRestantes = ${element.DiasRestantes} 
          WHERE NotaVenda = ${element.notaVenda} 
          AND NotaDev ${
            element.notaDev == null ? "IS NULL" : "= " + element.notaDev
          } `;

    // Executa a atualização dos dados
    console.log("SQL: ", SQL);
    const stmt = db.prepare(SQL);
    stmt.run();
  }
}

// Busca no banco todos os usuários ativos
function buscaUsuariosCadastrados() {
  let SQL = "SELECT * FROM usuários";

  // Executa a consulta SQL e retorna os resultados
  console.log("SQL: ", SQL);
  const stmt = db.prepare(SQL);
  return stmt.all();
}

// Cria um novo usuário
function criaUsuario(cadastro) {
  const stmt = db.prepare(`
   INSERT INTO usuários (cadastro, nome, origem)
    VALUES (?, ?, ?);
  `);

  stmt.run(cadastro[0], cadastro[1], cadastro[2]);
}

// Remove um novo usuário
function removeUsuario(cadastro) {
  const stmt = db.prepare(
    "DELETE FROM usuários WHERE cadastro = ? AND nome = ? AND origem = ?"
  );

  stmt.run(cadastro[0], cadastro[1], cadastro[2]);
}

module.exports = {
  // inserirRegistro,
  // listarRegistros,
  validaUsuário,
  buscarDadosFiltrados,
  BuscaDadosDev,
  inserirRegistroNovaDB,
  BuscaDadosEXPCadastro,
  updateDadosCadastroEXP,
  validaNota,
  updateDadosDias,
  buscaUsuariosCadastrados,
  criaUsuario,
  removeUsuario,
  db,
};
