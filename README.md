# Inicio

_Este é um sistema básico para acompanhamento de devoluções contemplando SAC e Expedição._ <br>
_No momento funciona apenas como aplicativo, atualizações futuras trarão mais recursos/flexibilidade._ <br>

_Nota: Melhorias relevantes aplicadas na versão de desenvolvimento também serão aplicadas neste ambiente._

_Nota: Este é um projeto desenvolvido para fins de estudo_

<br>

Após o download executar o comando a seguir para instalar dependências e preparar a inicialização.

    > npm run init
    ou
    > npm install && npm install --save-dev electron-rebuild && npx electron-rebuild

Com as dependencias instaladas, podemos executar o app em ambiente desenvolvimento utilizando os comandos

- Terminal 1 - Executar o vite
  > npm run dev
- Terminal 2 - Executar o Electron e abrir o App (Ambiente de desenvolvimento)
  > npm run edev

---

**Funções:**

- Registro de devolução (lado SAC) - Abertura de pendência para expedição
- Registro de devolução (lado expedição) - Fechamento da pendência
- Exibição dos registros em Cards e com filtros
- Gerênciamento de usuários (Criação e exclusão)
