# Índice

- [Sobre a API]()

- [Requisitos básicos]()

- [Montando o container Docker]()

- [Desmontando o container Docker]()

- [Inicializando a API]()

- [Cadastrando um usuário]()

## Sobre a API

[API RESTfull](https://red.ht/3jBYZ0k) desenvolvida para o desafio da Supersoft, sua estrutura é baseada no framework [Express.js](https://bit.ly/36dtcQb) e no [Node.js](https://bit.ly/37gHEaf).

## Requisitos básicos

É necessário a instalação das seguintes ferramentas/tecnologias em seu sistema operacional para que a API possa funcionar corretamente:

- Node - <a target="_blank" href="https://nodejs.org/en/download">como instalar</a>

- Yarn - <a target="_blank" href="https://community.chocolatey.org/packages/yarn">como instalar</a>

- Docker (é obrigatório habilitar a virtualização na BIOS da sua placa-mãe) - <a target="_blank" href="https://dockr.ly/3vmJu1A">como instalar</a>

Após a instalação, para verificar se o Node, Yarn e o Docker foram instalados corretamente, abra o console e digite os seguintes comandos (um por vez):

`node -v`

`yarn -v`

`docker -v`

Desta forma cada comando exibirá respectivamente no console as suas versões instaladas, semelhante a imagem abaixo:

![Node Yarn Docker](https://i.imgur.com/rYt0Rjo.png)

## Inicializando o container Docker com PostgreSQL e Adminer

Após a conclusão da instalação dos itens acima, você pode baixar ou clonar este repositório para o seu computador.

> O primeiro passo antes de qualquer ação é modificar o nome do arquivo `.env.local` (na raíz do projeto) para `.env` e preencher as informações das variáveis de ambiente contidas nele, para que elas possam ser acessadas corretamente pela API.

Em seguida, abra a pasta onde você baixou a API, abra um console de sua preferência apontando para esta pasta e digite o seguinte comando:

`docker-compose up -d`

Uma imagem semelhante a abaixo deverá ser exibida:

![docker compose up -d](https://i.imgur.com/0Owk8uA.png)

> Na raíz do projeto existe um arquivo chamado **docker-compose.yml**, este arquivo será executado pela instrução citada acima. Ele possui todas as configurações necessárias para que o nosso container seja criado pelo docker, incluindo um banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e um gerenciador de banco de dados, o [Adminer](https://hub.docker.com/_/adminer).

Se quiser saber mais sobre o docker-compose você pode ver neste [link](https://docs.docker.com/compose).

Desta forma nossa infraestrutura (local), com nosso container docker, estará configurada e funcional para que a API possa utilizá-la.

> O Docker trabalha com [conteinerização](https://bit.ly/3OdVfAn) e facilita muito as coisas para o trabalho em equipe e evita que os desenvolvedores de um projeto (que podem utilizar ambientes de desenvolvimento diferentes) se preocupem em instalar localmente estas (dentre outras) ferramentas, o que pode acabar gerando muita incompatibilidade nos diferentes ambientes.

Para confirmar que tudo esta funcionando corretamente, abra o navegador e digite:

_http://localhost:8080_

Você deverá ver uma imagem semelhante a esta abaixo:

![alt text](https://i.imgur.com/eA9sl28.png?1)

Esta é a interface do Adminer, através dela podemos gerenciar as informações do nosso banco de dados.

Para acessa-la basta preencher com as informações abaixo:

- Sistema : `PostgreSQL`

- Servidor : `db`

- Usuário : `postgres`

- Senha : `example`

* Base de dados : `test`

> Estas informações podem ser modificadas no arquivo _.env_ na raíz do projeto.

## Desmontando o container Docker

Caso queira desmontar o container que foi criado acima, basta abrir o console e digitar:

`docker-compose down`

Você deve obter uma imagem semelhante a esta abaixo:

![docker-compose down](https://i.imgur.com/KPL1jSN.png)

## Inicializando a API

Para isso abra o console e digite:

`yarn start`

Três etapas necessárias ocorrem ao executarmos este comando:

1. Criação da base de dados com o nome `test` (por padrão).

2. Execução das [migrations](https://knexjs.org/#Migrations) do knex para criação da tabela `user` no banco.

3. Inicia a API.

Vá até o Adminer (no browser) e verifique se tudo ocorreu como esperado.

## Cadastrando um usuário na API

Após o inicio da API, para cadastrar um usuário precisamos de algum software semelhante ao (postman, insomnia, etc) que nos ajude a fazer requisições HTTP em nossos endpoints, porém optei por algo mais pragmático e utilizei a extensão do VSCode chamada <a target="_blank" href="https://bit.ly/37j56DL">REST-Client</a>.

Esta extensão facilita que outros desenvolvedores (de uma possível equipe) também possam testar os endpoints na própria API sem instalar outras ferramentas como as citadas acima.

Após a instalação da extensão basta ir até a pasta `src/routes`, dentro de cada subpasta existe um arquivo com a extensão `.rest` e este tipo de arquivo é que será responsavel pelas nossas requisições HTTP (GET, POST, etc) nos endpoints da API.

Por exemplo, dentro da subpasta `src/routes/signup` acessamos o arquivo `index.rest` e clicamos em `Send Request` na requisição `POST`.

Um novo usuário será cadastrado e os dados confirmando a resposta da API podem ser conferidos pela aba que se abrirá ao lado (no VSCode) do arquivo `index.rest`.
