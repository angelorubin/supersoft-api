# API Skeleton

![api structure](https://i.imgur.com/VgSHYVN.jpg)

API Skeleton é uma estrutura básica e reutilizável de uma API desenvolvida com o framework [Express.js](https://expressjs.com/pt-br/starter/generator.html) baseada em ambiente Node.js, que inclui autenticação através de (email e senha) e controle de acesso baseado em função, [RBAC](https://bit.ly/34B4dWl) (role-based access control).

Com ela você pode iniciar sua API com as necessidades básicas (login e controle de acesso por função) já implementadas e desta forma agilizar muito o trabalho de desenvolvimento da sua API.

## Requisitos básicos (para rodar localmente)

É necessária a instalação das seguintes ferramentas/tecnologias em seu sistema operacional para que a API possa funcionar corretamente:

- Node - <a target="_blank" href="https://nodejs.org/en/download">como instalar</a>

- Docker - <a target="_blank" href="https://docs.docker.com/desktop/windows/install">como instalar</a>

* Yarn - <a target="_blank" href="https://community.chocolatey.org/packages/yarn">como instalar</a>

## Criando o container Docker com PostgreSQL e Adminer

Após a instalação dos itens acima, você pode baixar ou clonar este repositório para a pasta que desejar em seu computador.

> Antes de qualquer ação é necessário modificar o nome do arquivo `.env.local` (na raíz do projeto) para `.env` e preencher as informações das variáveis de ambiente contidas nele, para que elas possam ser acessadas corretamente pela API.

Em seguida, abra a pasta onde você colocou os arquivos da API, abra o console de sua preferência apontando para esta pasta e digite o seguinte comando:

_`docker-compose up -d`_

> Na raíz do projeto existe um arquivo chamado **docker-compose.yml**, este arquivo será executado pela instrução citada acima. Este arquivo possui todas as configurações necessárias para que as imagens sejam criadas pelo docker.

Este comando que acabamos de executar acima criará um [container](https://bit.ly/3t0gblD) através do Docker, incluindo o banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e o painel gerenciador de banco de dados [Adminer](https://hub.docker.com/_/adminer).

Desta forma o ambiente (local) estará configurado e funcional para que a API possa utilizá-lo.

O Docker facilita nossa vida e evita que nos preocupemos em instalar manualmente estas duas (entre outras) ferramentas em nosso sistema.

Para confirmar que tudo esta funcionando corretamente, abra o navegador e digite:

_http://localhost:8080_

Uma imagem semelhante a esta deve aparecer:

![alt text](https://i.imgur.com/eA9sl28.png)

Esta é a interface do Adminer, através dela podemos gerenciar as informações do banco de dados.

Para acessar basta preencher com as informações abaixo:

- Sistema : `PostgreSQL`

* Servidor : `db`

* Usuário : `postgres`

* Senha : `example`

- Base de dados : `test`

> Estas informações podem ser modificadas no arquivo _.env_ na raíz do projeto.

## Iniciando a API

Para isso abra o console e digite:

_`yarn start`_

Três etapas necessárias acontecem ao acionarmos este comando:

1. Criação da base de dados com o nome `test` (padrão)

2. Execução das migrations para criação da tabela `user` no banco

3. Inicia a API

Vá até o Adminer (no browser) e verifique se tudo ocorreu como esperado.

## Cadastrando usuário na API

Após o inicio da API, para cadastrar um usuário precisamos de um software do tipo do (postman, insomnia, etc) que nos ajude a fazer requisições HTTP em nossos endpoints, porém optei por algo mais pragmático e utilizei a extensão do VSCode chamada <a target="_blank" href="https://bit.ly/37j56DL">REST-Client</a>, o que facilita também que outros desenvolvedores (de uma possível equipe) também possam testar os endpoints na própria API sem instalar outras ferramentas.

Depois de instalada a extensão basta ir até a pasta `src/routes` no projeto, dentro de cada subpasta existe uma arquivo com a extensão `.rest` e este arquivo é responsavel pelo nossas requisições (GET, POST, etc) nos endpoints da API.

Dentro da subpasta `src/routes/signup` acessamos o arquivo `index.rest` e clicamos em `Send Request` na requisição `POST`.

Um novo usuário será cadastrado e isto pode ser visto pelo Adminer.
