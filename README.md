# API Skeleton

![api structure](https://i.imgur.com/Mcbej5F.png)

API Skeleton é um boilerplate (estrutura inicial) de uma [API REST](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api), sua estrutura é desenvolvida com o framework [Express.js](https://expressjs.com/pt-br/starter/generator.html) que é baseado em ambiente [Node.js](https://bit.ly/37gHEaf).

Ela já possui implementado um sistema de autenticação através de (email e password) e controle de acesso baseado em função/papel, [RBAC](https://bit.ly/34B4dWl) (role-based access control).

## Motivação

A idéia principal é agilizar a criação de API's REST com as necessidades básicas prontas para uso, tais como:

- Sistema de autenticação básico (email e password)

* Sistema de autorização (RBAC - controle de acesso de usuário baseado em função/papel)

## Requisitos básicos (para rodar localmente)

É necessária a instalação das seguintes ferramentas/tecnologias em seu sistema operacional para que a API possa funcionar corretamente:

- Node - <a target="_blank" href="https://nodejs.org/en/download">como instalar</a>

* Yarn - <a target="_blank" href="https://community.chocolatey.org/packages/yarn">como instalar</a>

- Docker - <a target="_blank" href="https://docs.docker.com/desktop/windows/install">como instalar</a>

Para verificar se o Node, Yarn e o Docker foram instalados e estão funcionando corretamente, abra o console e digite os comandos (um de cada vez):

`node -v`

`yarn -v`

`docker -v`

Desta forma cada comando exibirá respectivamente no console as suas versões instaladas semelhante a imagem abaixo:

![Node Yarn Docker](https://i.imgur.com/rYt0Rjo.png)

## Criando o container Docker com PostgreSQL e Adminer

Após a conclusão da instalação dos itens acima, você pode baixar ou clonar este repositório para o seu computador.

> O primeiro passo antes de qualquer ação é modificar o nome do arquivo `.env.local` (na raíz do projeto) para `.env` e preencher as informações das variáveis de ambiente contidas nele, para que elas possam ser acessadas corretamente pela API.

Em seguida, abra a pasta onde você baixou a API, abra um console de sua preferência apontando para esta pasta e digite o seguinte comando:

`docker-compose up -d`

Se tudo ocorrer bem, uma imagem semelhante a abaixo deverá ser exibida:

![docker compose up -d](https://i.imgur.com/0Owk8uA.png)

> Na raíz do projeto existe um arquivo chamado **docker-compose.yml**, este arquivo será executado pela instrução citada acima. Ele possui todas as configurações necessárias para que o nosso container seja criado pelo docker, incluindo um banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e um painel gerenciador de banco de dados, o [Adminer](https://hub.docker.com/_/adminer).

Se quiser saber mais sobre o docker-compose você pode ver neste [link](https://docs.docker.com/compose).

Desta forma nossa infra-estrutura (local) com nosso container Docker estará configurada e funcional para que a API possa utilizá-la.

> O Docker facilita muito as coisas para o trabalho em equipe e evita que os desenvolvedores do projeto (que podem utilizar sistemas operacionais diferentes) se preocupem em instalar manualmente estas duas (entre outras) ferramentas, o que pode acabar gerando muita incompatibilidade de versões no projeto.

Para confirmar que tudo esta funcionando corretamente, abra o navegador e digite:

_http://localhost:8080_

Você deverá ver uma imagem semelhante a esta:

![alt text](https://i.imgur.com/eA9sl28.png?1)

Esta é a interface do Adminer, através dela podemos gerenciar as informações do nosso banco de dados.

Para acessa-la basta preencher com as informações abaixo:

- Sistema : `PostgreSQL`

- Servidor : `db`

- Usuário : `postgres`

- Senha : `example`

* Base de dados : `test`

> Estas informações podem ser modificadas no arquivo _.env_ na raíz do projeto.

## Iniciando a API

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

## Fazendo Login e obtendo um token de acesso

Após a criação do nosso usuário precisamos fazer login na nossa aplicação para que um `token` de acesso único seja gerado.
