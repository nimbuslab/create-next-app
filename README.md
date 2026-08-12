<div align="center">

# create-next-app

**Template full-stack Next.js com autenticação, banco de dados e configuração pronta para agentes de IA.**
Next.js 16 com App Router, React 19, Better Auth, Drizzle ORM sobre PostgreSQL e shadcn/ui.

[Read in English](./docs/README.en.md)

[![CI](https://github.com/nimbuslab/create-next-app/actions/workflows/ci.yml/badge.svg)](https://github.com/nimbuslab/create-next-app/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-FF5500)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-FF5500)](https://react.dev)
[![licença](https://img.shields.io/badge/licen%C3%A7a-MIT-FF5500)](./LICENSE)

[Instalação](#instalação) · [Quick start](#quick-start) · [Stack](#stack) · [Scripts](#scripts-disponíveis) · [Roadmap](#roadmap)

</div>

---

## Por que create-next-app

- **Autenticação funcionando desde o primeiro `bun run dev`**: Better Auth com e-mail e senha, sessão com cache de cookie e `/dashboard` protegido no servidor
- **Banco tipado de ponta a ponta**: Drizzle ORM sobre PostgreSQL, com todo o schema em um único arquivo
- **Setup interativo**: detecta Docker, sobe o PostgreSQL, aplica o schema, cria o usuário de demonstração e, se você quiser, cria o repositório no GitHub
- **Configuração para agentes de IA**: gera o arquivo de contexto do assistente que você usa, com a stack e as convenções do projeto já preenchidas
- **Server Components por padrão**: `"use client"` só onde existe estado, evento ou API de navegador
- **Tema escuro por padrão**: `next-themes` com alternância entre claro, escuro e a preferência do sistema

## Instalação

### Com a CLI da nimbuslab

```bash
bun add -g @nimbuslab/cli
nimbus create meu-app --app
cd meu-app
```

### Clonando o template

```bash
git clone --depth 1 https://github.com/nimbuslab/create-next-app.git meu-app
cd meu-app
rm -rf .git
```

## Quick start

Com o setup interativo, que cuida do banco e do arquivo `.env`:

```bash
bun install
bun run setup
bun run dev
```

Se preferir fazer tudo na mão:

```bash
bun install
cp .env.example .env
docker compose up -d
bun run db:push
bun run seed
bun run dev
```

Abra [http://localhost:3000](http://localhost:3000). O `bun run seed` cria um usuário de demonstração:

- E-mail: `demo@example.com`
- Senha: `demo1234`

## Stack

As versões abaixo são as declaradas no `package.json` e no `docker-compose.yml` deste repositório.

| Peça | Versão | Papel |
|---|---|---|
| [Next.js](https://nextjs.org) | `16.3.0` | App Router, Server Components, Turbopack |
| [React](https://react.dev) | `19.2.8` | Biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org) | `^5` | Tipagem estática em modo `strict` |
| [Better Auth](https://better-auth.com) | `^1.3.10` | Autenticação e sessões |
| [Drizzle ORM](https://orm.drizzle.team) | `^0.44.0` | Consultas tipadas |
| [drizzle-kit](https://orm.drizzle.team/docs/kit-overview) | `^0.31.0` | Migrações e Drizzle Studio |
| [PostgreSQL](https://www.postgresql.org) | `16-alpine` | Banco relacional (imagem do `docker-compose.yml`) |
| [Tailwind CSS](https://tailwindcss.com) | `^4` | Estilização utilitária, configuração via CSS |
| [shadcn/ui](https://ui.shadcn.com) | estilo `new-york` | Componentes acessíveis sobre Radix UI |
| [Bun](https://bun.sh) | `1.3+` | Runtime e gerenciador de pacotes |

O `package.json` não fixa a versão do Bun: `1.3+` é a faixa em que o template é desenvolvido e a CI usa a mais recente. O campo `engines` exige Node `>=18` para quem rodar o build fora do Bun.

## Estrutura do projeto

```
.
├── .github/workflows/ci.yml     # typecheck, lint e build
├── docker-compose.yml           # PostgreSQL 16 local
├── drizzle.config.ts            # configuração do drizzle-kit
├── scripts/
│   ├── ai-configs.ts            # modelos de config por assistente de IA
│   ├── seed.ts                  # cria o usuário de demonstração
│   └── setup.ts                 # assistente de configuração inicial
└── src/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── api/auth/[...all]/route.ts   # handler do Better Auth
    │   ├── dashboard/                    # rota protegida
    │   ├── globals.css                   # tokens de tema
    │   ├── layout.tsx
    │   └── page.tsx                      # página pública
    ├── components/
    │   ├── theme-provider.tsx
    │   └── ui/                           # componentes shadcn/ui
    ├── db/
    │   ├── index.ts             # cliente Drizzle e pool do pg
    │   └── schema.ts            # tabelas user, session, account, verification
    └── lib/
        ├── auth.ts              # configuração do Better Auth (servidor)
        ├── auth-client.ts       # cliente de autenticação (navegador)
        └── utils.ts             # helper cn()
```

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `bun run dev` | Servidor de desenvolvimento com Turbopack |
| `bun run build` | Build de produção |
| `bun run start` | Servidor de produção a partir do build |
| `bun run lint` | Verifica o código com ESLint |
| `bun run lint:fix` | Aplica as correções automáticas do ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run setup` | Assistente de configuração inicial |
| `bun run seed` | Cria o usuário de demonstração |
| `bun run db:generate` | Gera arquivos de migração a partir do schema |
| `bun run db:push` | Aplica o schema direto no banco (desenvolvimento) |
| `bun run db:migrate` | Roda as migrações geradas (produção) |
| `bun run db:studio` | Abre o Drizzle Studio |

Use sempre `bun run <script>`. `bun build` sem o `run` chama o bundler do próprio Bun, não este script.

## Banco de dados

### Local, com Docker

```bash
docker compose up -d
bun run db:push
bun run seed
```

O `docker-compose.yml` sobe um PostgreSQL 16 em `localhost:5432` com usuário `postgres`, senha `postgres` e banco `app`. São credenciais de desenvolvimento local e não devem ir para produção. O `.env.example` já vem com a `DATABASE_URL` correspondente.

### Provedor gerenciado

Serve qualquer PostgreSQL, como [Neon](https://neon.tech) ou [Supabase](https://supabase.com). Troque a `DATABASE_URL` no `.env` e rode as migrações:

```bash
bun run db:generate
bun run db:migrate
```

### Alterando o schema

Edite `src/db/schema.ts` e depois:

```bash
bun run db:generate   # gera a migração
bun run db:push       # ou aplique direto, em desenvolvimento
```

### Drizzle Studio

```bash
bun run db:studio
```

Abre em [https://local.drizzle.studio](https://local.drizzle.studio).

## Autenticação

Configurada em `src/lib/auth.ts` com [Better Auth](https://better-auth.com) e o adaptador do Drizzle.

O que vem pronto:

- Cadastro e login com e-mail e senha
- Hash de senha com scrypt, o padrão do Better Auth
- Sessão de 7 dias, renovada a cada 24 horas, com cache de cookie de 5 minutos
- `/dashboard` protegido: `src/app/dashboard/page.tsx` lê a sessão no servidor e redireciona para `/login` quando não existe

O que **não** vem pronto e está no [Roadmap](#roadmap): recuperação de senha, verificação de e-mail e provedores OAuth. Nenhum dos três está configurado no `auth.ts` e o template não traz provedor de e-mail.

## Configuração para agentes de IA

O `bun run setup` pergunta qual assistente você usa e gera o arquivo de contexto correspondente, com a stack, a estrutura de pastas e as convenções do projeto:

| Assistente | Arquivo gerado |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| Gemini CLI | `.gemini/GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

Os modelos ficam em `scripts/ai-configs.ts`.

## Adicionando componentes

```bash
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add table
```

O `components.json` já aponta para `src/components/ui` e para os tokens em `src/app/globals.css`.

## Variáveis de ambiente

Copie o `.env.example` para `.env` e ajuste. Nenhum outro arquivo `.env` entra no Git.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | sim | String de conexão do PostgreSQL, lida por `src/db/index.ts` e por `drizzle.config.ts` |
| `BETTER_AUTH_SECRET` | sim | Segredo de assinatura das sessões. Gere com `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | sim | URL pública da aplicação |
| `NEXT_PUBLIC_APP_URL` | não | Base do cliente de autenticação. Sem ela, o padrão é `http://localhost:3000` |
| `NODE_ENV` | não | `development` ou `production` |

## Deploy

Funciona em qualquer plataforma que rode Next.js em Node, como Vercel, Railway ou Render. O caminho é o mesmo:

1. Provisione um PostgreSQL e pegue a connection string
2. Configure `DATABASE_URL`, `BETTER_AUTH_SECRET` e `BETTER_AUTH_URL` no ambiente
3. Rode `bun run db:migrate` contra o banco de produção
4. Faça o deploy

Gere o segredo com:

```bash
openssl rand -base64 32
```

## Roadmap

- [ ] Recuperação de senha
- [ ] Verificação de e-mail
- [ ] Provedores OAuth (Google e GitHub)
- [ ] `src/middleware.ts` com o matcher das rotas protegidas
- [ ] `Dockerfile` com `output: "standalone"` para self-hosting
- [ ] Testes automatizados na CI

## Contribuindo

Leia o [guia de contribuição](./CONTRIBUTING.md) antes de abrir um PR. Em resumo: branch a partir da `main`, commits em português seguindo Conventional Commits, e `bun run typecheck`, `bun run lint` e `bun run build` verdes antes de pedir revisão.

O [código de conduta](./CODE_OF_CONDUCT.md) vale para todo mundo que participa do projeto.

## Suporte

Dúvidas, bugs e sugestões vão para as [Issues](https://github.com/nimbuslab/create-next-app/issues). Falhas de segurança seguem o processo descrito em [SECURITY.md](./SECURITY.md).

## Licença

[MIT](./LICENSE) © [nimbuslab](https://nimbuslab.com.br)

---

<div align="center">

Construído em Brasília, DF, Brasil

</div>
