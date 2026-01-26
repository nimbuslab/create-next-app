# create-next-app

Template full-stack pronto para producao com autenticacao, banco de dados e ferramentas modernas.

[Read in English](../README.md)

## Stack

- **Next.js 16** - App Router, Server Components, Turbopack
- **React 19** - Recursos mais recentes e melhorias de performance
- **Better Auth** - Autenticacao moderna (email/senha, OAuth ready)
- **Prisma** - ORM de banco de dados com tipagem
- **PostgreSQL** - Banco de dados pronto para producao
- **Tailwind CSS 4** - CSS utilitario
- **shadcn/ui** - Componentes acessiveis e customizaveis
- **TypeScript** - Tipagem completa com modo strict
- **Docker** - Desenvolvimento local com containers

## Inicio Rapido

```bash
# Criar novo projeto
bunx @nimbuslab/create-next-app meu-app

# Navegar para o projeto
cd meu-app

# Copiar variaveis de ambiente
cp .env.example .env

# Iniciar banco de dados
docker compose up -d

# Instalar dependencias
bun install

# Gerar cliente Prisma
bun db:generate

# Aplicar schema no banco
bun db:push

# Iniciar servidor de desenvolvimento
bun dev
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/           # Paginas de auth (login, register)
│   ├── api/auth/         # Rotas API do Better Auth
│   ├── dashboard/        # Dashboard protegido
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── landing/          # Secoes da landing page
│   └── ui/               # Componentes shadcn/ui
└── lib/
    ├── auth.ts           # Config servidor Better Auth
    ├── auth-client.ts    # Client Better Auth
    └── utils.ts
prisma/
└── schema.prisma         # Schema do banco de dados
```

## Scripts Disponiveis

```bash
bun dev           # Iniciar servidor de desenvolvimento
bun build         # Build para producao
bun start         # Iniciar servidor de producao
bun lint          # Executar ESLint
bun typecheck     # Verificar tipos com TypeScript
bun db:generate   # Gerar cliente Prisma
bun db:push       # Aplicar schema no banco
bun db:migrate    # Executar migrations
bun db:studio     # Abrir Prisma Studio
```

## Autenticacao

Este template usa [Better Auth](https://better-auth.com) para autenticacao.

### Recursos incluidos:
- Autenticacao email/senha
- Gerenciamento de sessao
- Rotas protegidas
- Validacao de sessao no servidor

### Adicionando provedores OAuth:

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  // ... config existente
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

## Banco de Dados

### Desenvolvimento Local

```bash
# Iniciar PostgreSQL
docker compose up -d

# Visualizar banco
bun db:studio
```

### Alteracoes no Schema

```bash
# Apos editar prisma/schema.prisma
bun db:generate  # Regenerar client
bun db:push      # Aplicar no banco (dev)
bun db:migrate   # Criar migration (prod)
```

## Variaveis de Ambiente

| Variavel | Descricao | Obrigatoria |
|----------|-----------|-------------|
| `DATABASE_URL` | String de conexao PostgreSQL | Sim |
| `BETTER_AUTH_SECRET` | Secret de auth (min 32 chars) | Sim |
| `BETTER_AUTH_URL` | URL do app para auth | Sim |
| `NEXT_PUBLIC_APP_URL` | URL publica do app | Sim |

## Deploy

### Vercel + Neon/Supabase

1. Criar banco PostgreSQL (Neon, Supabase, etc.)
2. Configurar variaveis de ambiente na Vercel
3. Deploy

```bash
bunx vercel
```

## Licenca

Licenca MIT - veja [LICENSE](../LICENSE) para detalhes.

---

Feito com cuidado no Brasil por [nimbuslab](https://nimbuslab.com.br)
