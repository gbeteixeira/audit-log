<h1 align="center">AuditLog Service</h1>

<p align="center">

</p>

<p align="center">
  <a href="#introduction"><strong>Introdução</strong></a> ·
  <a href="#instalacao"><strong>Instalação</strong></a> ·
</p>
<br/>

## Instalação

1. Instale as dependencias utilizando pnpm:

```sh
pnpm install
```

2. Copie `.env.example` para `.env` e altere os valores.

```sh
cp .env.example .env
```

3. Execute em modo de desenvolvimento

```sh
pnpm run start:dev
```

> [!NOTE]
> Utilizei [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) como pacote para atualização do projeto.
>
> Use o comando abaixo para atualizar o projeto: `ncu -i --format group`

### Testes

Testes

```sh
pnpm run test:
```

Testes E2E

```sh
pnpm run test:e2e
```

### Code Quality

-   [TypeScript](https://www.typescriptlang.org/) – Verificador de tipos estáticos para segurança de tipos de ponta a ponta
-   [Prettier](https://prettier.io/) – Formatador de código opinativo para um estilo de código consistente
-   [ESLint](https://eslint.org/) – Ferramenta de linting plugável para Next.js e TypeScript

### 🔧 Prisma

```
    1. npx prisma migrate dev
    2.  npx prisma generate
```
