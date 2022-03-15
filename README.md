# API Skeleton

![api structure](https://i.imgur.com/VgSHYVN.jpg)

API Skeleton é um boilerplate (estrutura inicial) de uma API desenvolvida com o framework [Express.js](https://expressjs.com/pt-br/starter/generator.html) que é baseado em ambiente [Node.js](https://bit.ly/37gHEaf).

Ela inclui um sistema de autenticação através de (email e password) e controle de acesso baseado em função, [RBAC](https://bit.ly/34B4dWl) (role-based access control).

A idéia é facilitar a criação de API's com as necessidades básicas já implementadas, tais como: login e RBAC (controle de acesso por função), para que possamos focar em desenvolver outras funcionalidades importantes da API.

## Requisitos básicos (para rodar localmente)

É necessária a instalação das seguintes ferramentas/tecnologias em seu sistema operacional para que a API possa funcionar corretamente:

- Node - <a target="_blank" href="https://nodejs.org/en/download">como instalar</a>

* Yarn - <a target="_blank" href="https://community.chocolatey.org/packages/yarn">como instalar</a>

- Docker - <a target="_blank" href="https://docs.docker.com/desktop/windows/install">como instalar</a>

Para verificar se o Node, Yarn e o Docker foram instalados e estão funcionando corretamente, abra o console e digite os comandos (um de cada vez):

`node -v`

`yarn -v`

`docker -v`

Desta forma cada comando exibirá respectivamente no console as suas versões instaladas.

## Criando o container Docker com PostgreSQL e Adminer

Após a instalação dos itens acima, você pode baixar ou clonar este repositório para a pasta que desejar em seu computador.

> Antes de qualquer ação é necessário modificar o nome do arquivo `.env.local` (na raíz do projeto) para `.env` e preencher as informações das variáveis de ambiente contidas nele, para que elas possam ser acessadas corretamente pela API.

Em seguida, abra a pasta onde você colocou os arquivos da API, abra o console de sua preferência apontando para esta pasta e digite o seguinte comando:

`docker-compose up -d`

> Na raíz do projeto existe um arquivo chamado **docker-compose.yml**, este arquivo será executado pela instrução citada acima. Este arquivo possui todas as configurações necessárias para que o nosso container seja criado pelo docker, incluindo o banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e o painel gerenciador de banco de dados [Adminer](https://hub.docker.com/_/adminer).

Desta forma o ambiente (local) estará configurado e funcional para que a API possa utilizá-lo.

> O Docker facilita muito as coisas para o trabalho em equipe e evita que os desenvolvedores do projeto (que podem utilizar sistemas operacionais diferentes) se preocupem em instalar manualmente estas duas (entre outras) ferramentas o que pode acabar gerando muita incompatibilidade de versões no projeto.

Para confirmar que tudo esta funcionando corretamente, abra o navegador e digite:

_http://localhost:8080_

Uma imagem semelhante a esta deve aparecer:

![alt text](https://i.imgur.com/eA9sl28.png)

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

Três etapas necessárias acontecem ao acionarmos este comando:

1. Criação da base de dados com o nome `test` (padrão)

2. Execução das [migrations](https://knexjs.org/#Migrations) do knex para criação da tabela `user` no banco

3. Inicia a API

Vá até o Adminer (no browser) e verifique se tudo ocorreu como esperado.

## Cadastrando um usuário na API

Após o inicio da API, para cadastrar um usuário precisamos de algum software semelhante ao (postman, insomnia, etc) que nos ajude a fazer requisições HTTP em nossos endpoints, porém optei por algo mais pragmático e utilizei a extensão do VSCode chamada <a target="_blank" href="https://bit.ly/37j56DL">REST-Client</a>.

Esta extensão facilita que outros desenvolvedores (de uma possível equipe) também possam testar os endpoints na própria API sem instalar outras ferramentas como as citadas acima.

Após a instalação da extensão basta ir até a pasta `src/routes`, dentro de cada subpasta existe um arquivo com a extensão `.rest` e este tipo de arquivo é que será responsavel pelas nossas requisições HTTP (GET, POST, etc) nos endpoints da API.

Por exemplo, dentro da subpasta `src/routes/signup` acessamos o arquivo `index.rest` e clicamos em `Send Request` na requisição `POST`.

Um novo usuário será cadastrado e os dados confirmando a resposta da API podem ser conferidos pela aba que se abrirá ao lado (no VSCode) do arquivo `index.rest`.

## Fazendo Login e obtendo um token de acesso

Após a criação do nosso usuário precisamos fazer login na nossa aplicação para que um `token` de acesso único seja gerado.
