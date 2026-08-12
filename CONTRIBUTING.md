# Contribuindo

Obrigado pelo interesse em melhorar o create-next-app. Este guia vale para issues e pull requests.

## Antes de começar

Este repositório é um template: cada mudança aqui é herdada por todo projeto gerado a partir dele. Prefira mudanças pequenas e justificadas a reescritas grandes.

Para bugs e sugestões, abra uma [Issue](https://github.com/nimbuslab/create-next-app/issues) antes de codar. Isso evita trabalho duplicado e alinha o escopo.

## Ambiente

```bash
git clone https://github.com/nimbuslab/create-next-app.git
cd create-next-app
bun install
```

Para rodar a aplicação de verdade você precisa de um PostgreSQL. O caminho mais curto:

```bash
cp .env.example .env
docker compose up -d
bun run db:push
bun run seed
bun run dev
```

## Fluxo de trabalho

1. Crie uma branch a partir da `main`, com nome em kebab-case e sem acentos
2. Faça a mudança
3. Rode a verificação completa (abaixo)
4. Abra o pull request contra a `main`

## Verificação obrigatória antes do PR

Os três precisam passar. São exatamente os passos que a CI roda:

```bash
bun run typecheck
bun run lint
bun run build
```

O `bun run build` precisa das variáveis do `.env`. Se você mexeu em `scripts/setup.ts`, rode `bun run setup` em uma cópia descartável do projeto e confira o fluxo interativo de ponta a ponta, porque a CI não executa o assistente.

## Commits

Conventional Commits em português brasileiro, com acentuação correta:

```
tipo(escopo): descrição do que o commit faz
```

Tipos usados: `feat`, `fix`, `docs`, `refactor`, `chore`, `ci`, `test`, `style`.

A descrição diz **o que** o commit faz, não como. Um assunto por commit.

Não use emojis. Não adicione assinatura de ferramenta ou de assistente de IA (`Co-Authored-By`, `Generated with` e afins).

Exemplos:

```
feat(setup): adiciona suporte ao Gemini CLI na geração de configs de IA
fix(auth): ajusta espaçamento entre input e botão nas páginas de login e registro
docs: corrige o comando de build documentado no README
```

## Pull requests

- Título em português, no mesmo padrão dos commits
- Descrição com o resumo da mudança, o que muda e como testar
- CI verde é pré-requisito para o merge
- Sem emojis e sem assinatura de IA

## Documentação

Todo comando escrito no README precisa existir e funcionar. Se você renomear ou remover um script do `package.json`, atualize os dois READMEs no mesmo PR.

Os dois READMEs andam juntos: [`README.md`](./README.md) em português e [`docs/README.en.md`](./docs/README.en.md) em inglês, com as mesmas seções, na mesma ordem.

## Código de conduta

Ao participar, você concorda com o [Código de Conduta](./CODE_OF_CONDUCT.md).
