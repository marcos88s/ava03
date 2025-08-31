# Projeto de Gerenciamento de Estoque - CRUD Full Stack

## 1. Ideia e Objetivo

O objetivo principal deste projeto é fornecer uma ferramenta simples e eficiente para o gerenciamento de produtos em um estoque. O aplicativo permite ao usuário:

* Listar todos os produtos cadastrados.
* Adicionar novos produtos ao estoque.
* Editar as informações de um produto existente (nome, quantidade e preço).
* Remover produtos do estoque.

## 2. Capturas de Tela (Screenshots)
![Print da primeira tela](./prints/lista.jfif)
![Print da tela de edição](./prints/edit.jfif)
![Print da tela para adicionar](./prints/add.jfif)
![Print da primeira tela com a adição de um produto](./prints/lista2.jfif)



## 3. Stack de Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas na construção deste projeto:

#### **Frontend (Mobile App)**

* **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e build com React Native.
* **Axios:** Cliente HTTP para realizar as requisições à API.
* **React Navigation:** Biblioteca para gerenciamento de rotas e navegação entre telas.

#### **Backend (API)**

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express.js:** Framework para a construção da API RESTful.
* **Knex.js & SQLite3:** Query builder para interagir com o banco de dados relacional SQLite.

#### **Ambiente e Deploy**

* **Docker:** Plataforma para containerização da API, garantindo um ambiente de execução consistente.
* **Localtunnel:** Ferramenta para expor o servidor local (API) na internet de forma segura.

## 4. Tutorial Completo para Execução do Ambiente

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/marcos88s-github/ava03.git
```

### Passo 2: Configurar e Rodar o Backend (API)

1.  Navegue para o diretório da API:
    ```bash
    cd ava03/api-estoque
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Construa a imagem Docker (substitua `marcos88s-github` pelo seu nome de usuário, se desejar):
    ```bash
    docker build -t marcos88s-github/ava03-api .
    ```

4.  Inicie o contêiner Docker:
    ```bash
    docker run -d -p 3000:3000 --name meu-container-api marcos88s-github/ava03-api
    ```

5.  Verifique se a API está funcionando:
    Abra seu navegador e acesse `http://localhost:3000/estoque`. Você deverá ver uma lista (mesmo que vazia `[]`) de produtos em formato JSON.

### Passo 3: Configurar e Rodar o Frontend

1.  Abra um **novo terminal** e navegue até a pasta do App:
    ```bash
    cd ava03/app-estoque
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Exponha sua API com Localtunnel. No terminal onde a **API está rodando**, pare o contêiner (`docker stop meu-container-api`) e rode a API localmente (`npm start`), depois execute:
    ```bash
    npx localtunnel --port 3000 --subdomain um-nome-unico-para-sua-api
    ```
    Copie a URL gerada (ex: `https://um-nome-unico-para-sua-api.loca.lt`).

4.  Edite o arquivo `.env` na raiz da pasta `app-estoque` com a URL do Localtunnel:
    ```
    API_URL=https://um-nome-unico-para-sua-api.loca.lt
    ```

5.  Inicie o Expo:
    No terminal da pasta do seu app, rode:
    ```bash
    npx expo start
    ```
