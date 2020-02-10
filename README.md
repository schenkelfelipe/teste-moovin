This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Clone o repositório, instale as dependências e na raiz do diretório rode o seguinte comando caso possua o Concurrently.

### `concurrently "npm start" "nodemon backend/server.js"`

Ou se preferir, apenas dê um NPM START na raiz, abra outro terminal e aplique outro NPM START no diretório: backend.

Isso fará com que o frontend e o backend sejam iniciados para que a aplicação funcione corretamente.
Adicionei o concurrently ao projeto inicial para poder rodar ambos os comandos.