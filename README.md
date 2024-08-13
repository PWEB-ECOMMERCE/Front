![Universidade](https://badgen.net/badge/Univesidade/Universidade%20Federal%20do%20Ceará/blue)
![Cadeira](https://badgen.net/badge/Cadeira/Programação%20Web/red)
![Professor](https://badgen.net/badge/Professor/Leonardo/red)
![Semestre](https://badgen.net/badge/Semestre/6/red)

![MIT](https://img.shields.io/github/license/PWEB-ECOMMERCE/Front.svg)
![issues](https://img.shields.io/github/issues/PWEB-ECOMMERCE/Front.svg)
# PWEB - Front
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

Este é um projeto para a disciplina de Programação Web do curso de Sistemas e Mídias Digitais da Universidade Federal do
Ceará - UFC.

Utilizaremos JavaScript para desenvolver a parte frontend do projeto com o framework NextJS. Como você deve saber, o
NextJS é um framework React para a Web, então usaremos React também.

Nosso projeto é um e-commerce que será gerenciado pelo proprietário da loja e os clientes comprarão itens exibidos na
loja. Outra funcionalidade que planejamos construir são alguns gráficos para que o proprietário possa ver o progresso de
suas vendas ao longo do tempo.
## Como Rodar

### Docker

#### Dependencias
- [docker](https://www.docker.com/)
- docker-compose
- ~~banco de dados ecommerce ja criado no banco postgresql (não precisa mais)~~

Edite o arquivo Dockerfile.backend para conter o TOKEN do github para que seja possivel clonar pelo docker. Você deve adicionar ao começo do GIT_ACCESS_TOKEN a palavra github_pat_

Rode o seguinte comando no seu terminal

```bash
# Mais abaixo tem como subir junto uma instancia do pgadmin em um comando só,
# fique a vontade para escolher.
docker-compose up
```

### Local

- nodejs
- mvn
- banco de dados ecommerce ja criado no banco postgresql

Clone o projeto do front com o comando:

```bash
git clone https://github.com/PWEB-ECOMMERCE/Front.git
```

Instale as dependencias

```bash
npm install
```

Rode o projeto

```bash
npm run dev
```

O front-end deve estar nem http://localhost:3000/

Clone o Backend:

```bash
git clone https://github.com/PWEB-ECOMMERCE/Back.git
```

Execute para instalar as dependências:

```bash
mvn install
```

Execute para rodar o backend:

```bash
mvn spring-boot:run
```

O Backend deve estar funcionando desde que o sgbd esteja ativo e com um banco ja
criado. Pode usar a aplicação.

## Infra

Por enquanto, temos um arquivo docker-compose que será usado para gerar toda a aplicação para nós: frontend, backend e
banco de dados. Depois de instalar o Docker e o docker-compose (instalado automaticamente com o Docker Desktop), você
pode executar um dos métodos abaixo para rodar a aplicação no seu navegador - Aqui.

### Desenvolvedores

#### Método 1
Você pode rodar a aplicação localmente no seu computador usando o gerenciador de pacotes de sua escolha (npm, pnpm,
yarn). Instalando, e depois usando o script dentro do arquivo package.json para rodar o frontend, mas você terá apenas a
parte frontend da aplicação, pois o backend está em outro repositório. Então você terá que clonar o repositório e seguir
as instruções sobre como configurar a aplicação backend.

#### Método 2
Criei um arquivo chamado docker-compose.localdev.yaml para usar um volume no container, assim seus arquivos src/ estarão
dentro do container e toda mudança nessa pasta será replicada dentro do container Docker (hot reloading). Siga o comando
abaixo se você quiser configurar toda a aplicação com a capacidade de desenvolver dentro do container.

```bash
docker-compose -f docker-compose.yaml -f docker-compose-localdev.yaml up

```

# PWEB - Front

This is a project for the Web Programming course of the Digital Media Systems program at the Universidade Federal do
Ceará - UFC.

We will use JavaScript to develop the frontend part of the project with the NextJS framework. As you may know, NextJS is
a React framework for the Web, so we will also be using React.

Our project is an e-commerce platform that will be managed by the store owner, allowing customers to purchase items
displayed in the store. Another feature we plan to build is some graphs so that the owner can track the progress of
sales over time.

# How to Run
## Dependencies
- [docker](https://www.docker.com/)
- docker-compose
Run the following command in your terminal

```bash
docker-compose up
```

# Infrastructure

For now, we have a docker-compose file that will be used to set up the entire application for us: frontend, backend, and
database. After installing Docker and docker-compose (automatically installed with Docker Desktop), you can run one of
the methods below to launch the application in your web browser - Here.

## Developers
### Method 1
You can run the application locally on your computer using your preferred package manager (npm, pnpm, yarn). After
installing, use the script inside the package.json file to run the frontend. However, you will only have the frontend
part of the application because the backend is in another repository. Therefore, you will need to clone the repository
and follow the instructions for setting up the backend application.

### Method 2
I've created a file called docker-compose.localdev.yaml to use a volume in the container, so your src/ files will be
inside the container, and any changes in that folder will be replicated within the Docker container (hot reloading).
Follow the command below if you want to set up the entire application with the ability to develop inside the container.

```bash
docker-compose -f docker-compose.yaml -f docker-compose-localdev.yaml up
```

