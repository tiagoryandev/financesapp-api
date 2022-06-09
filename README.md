# :zap: API **|** Finances App

## :thinking: Introdução

Esse é o repositório que armazena toda a API para gerenciamento de autenticação, criação de usuários, itens e categorias.

Esse projeto foi desenvolvido usando [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/) como linguagem, [Prisma](https://www.prisma.io/) como ORM, [Express](https://expressjs.com/pt-br/) como Framework e [PostgreSQL](https://www.postgresql.org/) como banco de dados.

## :door: Rotas Disponíveis
- `GET /users` - Lista todos os usuários cadastrados na plataforma (Apenas para Administradores).
- `GET /users/@me` - Busca as informações de um usuário.
- `GET /categories` - Busca a lista de categorias de um usuário.
- `GET /items` - Busca a lista de itens de um usuário.
- `POST /auth` - Gera um Token de Acesso para Autenticação.
- `POST /users` - Criar um novo usuário.
- `POST /categories` - Cria uma nova categoria.
- `POST /items` - Cria um novo item.
- `DELETE /categories/:category_id` - Remove uma categoria pelo ID.
- `DELETE /items/:item_id` - Remove um item pelo ID.

## :file_cabinet: Banco de Dados

Todo o banco de dados está sendo gerenciado pelo Prisma, para você rodar todas as migrações, rode o comando `npm prisma migrate dev` ou `yarn prisma migrate dev`.

Assim que todas as migrações forem registradas com sucesso, você poderá iniciar a aplicação rodando o comando `npm run dev` ou `yarn dev`.

Para você iniciar o processo de **Build** da aplicação, rode o comando `npm run build` ou `yarn dev`. E finalmente, rode o comando `npm run start` ou `yarn start` para iniciar o servidor com todos os arquivos gerados pela **Build** em modo de produção.

## :gear: Como Contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'` seguindo algum dos prefixos de commit abaixo:
    > :warning: Lembrando que será obrigatório a utilização do inglês nas mensagens de commit.
    - `feat:` - Para implementação de uma nova funcionalidade.
    - `fix:` - Para a correção de algum Bug.
    - `chore:` - Para alterações de arquivos sem impacto no projeto.
    - `refactor:` - Para Refatoração de Código.
    - `style:` - Alteração na Formatação do código.
    - `docs:` - Mudanças na Documentação do Projeto.
- Faça push para a sua branch: `git push origin minha-feature`.

## :heart: Contribuidores do Projeto
| [<img src="https://github.com/TiaGoiNsaNy.png" width=115><br><sub>@TiaGoiNsaNy</sub>](https://github.com/TiaGoiNsaNy) |
| :---: | 