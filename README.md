# API Skeleton

API Skeleton é uma estrutura básica e reutilizável de uma API desenvolvida com o framework [Express.js](https://expressjs.com/pt-br/starter/generator.html) baseada em ambiente Node.js, que inclui autenticação através de (email e senha) e acesso de usuário baseado em papel/função, [RBAC](https://bit.ly/34B4dWl) (role-based access control).

## Requisitos básicos (para rodar localmente)

É necessária a instalação das seguintes ferramentas/tecnologias em seu sistema operacional para que a API possa funcionar corretamente:

- Node - [como instalar](https://nodejs.org/en/download)

- Docker - [como instalar](https://docs.docker.com/desktop/windows/install)

* Yarn - [como instalar](https://community.chocolatey.org/packages/yarn)

## Como instalar o PostgreSQL e o Adminer

Após a instalação dos itens acima, você pode baixar ou clonar este repositório para a pasta que desejar em seu computador.

> Antes de qualquer ação é necessário modificar o nome do arquivo `.env.local` (na raíz do projeto) para `.env` e preencher as informações das variáveis de ambiente contidas nele, para que elas possam ser acessadas corretamente pela API.

Em seguida, abra a pasta onde você colocou os arquivos da API, abra o console de sua preferência apontando para esta pasta e digite o seguinte comando:

_`docker-compose up -d`_

> Na raíz do projeto existe um arquivo chamado **docker-compose.yml**, este arquivo será executado pela instrução citada acima. Este arquivo possui todas as configurações necessárias para que as imagens sejam criadas pelo docker.

Este comando _`docker-compose up -d`_, que acabamos de executar criará um [container](https://bit.ly/3t0gblD) através do Docker, incluindo o banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e o painel gerenciador de banco de dados [Adminer](https://hub.docker.com/_/adminer).

Desta forma o ambiente (local) estará pronto para o uso e inclusive pode ser compartilhado sem problemas entre sistemas operacionais diferentes.

O Docker facilita nossa vida e evita que nos preocupemos em instalar manualmente estas duas (entre outras) ferramentas em nosso sistema.

Para confirmar que tudo esta funcionando corretamente, abra o navegador e digite:

_http://localhost:8080_

Uma imagem semelhante a esta deve aparecer:

![alt text](https://i.imgur.com/eA9sl28.png)

Esta é a interface do Adminer, através dela você pode manipular as informações do seu banco de dados PostgreSQL.

Para acessar basta preencher com as informações abaixo:

- Sistema : `PostgreSQL`

* Servidor : `db`

* Usuário : `postgres`

* Senha : `example`

- Base de dados : `test`

> Estas informações podem ser modificadas no arquivo _.env_ na raíz do projeto.

## Iniciando a API

Enfim iniciaremos nossa API !

Para isso abra o console e digite:

_`yarn start`_

Três etapas necessárias acontecem ao acionarmos este comando:

1. Criação da base de dados com o nome `test` (padrão)
2. Execução das migrations para criação da tabela `user` no banco
3. Inicio (de fato) a API

Vá até o Adminer (no browser) e verifique se tudo ocorreu como esperado.

## Cadastrando um usuário na API
