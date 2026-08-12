# Política de segurança

## Versões suportadas

Este repositório é um template, não uma biblioteca versionada. Correções de segurança são aplicadas apenas na branch `main`, que é a base de todo projeto novo gerado a partir dele.

Projetos já gerados não recebem atualização automática: cabe a cada um acompanhar os avisos das dependências, principalmente os do `next`.

## Como reportar

Abra uma [Issue](https://github.com/nimbuslab/create-next-app/issues) descrevendo o problema.

Se a falha for explorável e ainda não for pública, **não abra Issue**. Escreva para `contato@nimbuslab.com.br` com o assunto começando por `[security] create-next-app` e inclua:

- Descrição da falha e do impacto
- Passos para reproduzir
- Versão do template, do Bun e do Node
- Qualquer mitigação que você já conheça

Confirmamos o recebimento em até 5 dias úteis e informamos o encaminhamento assim que tivermos um diagnóstico.

## Escopo

Entra no escopo o que está neste repositório: a configuração do Better Auth em `src/lib/auth.ts`, o schema e o acesso ao banco em `src/db/`, os scripts em `scripts/`, o `docker-compose.yml` e as versões declaradas no `package.json`.

Fica fora do escopo a vulnerabilidade que pertence a uma dependência de terceiros. Nesse caso, reporte no projeto de origem e, se quiser, abra uma Issue aqui pedindo o bump da versão.

## Boas práticas ao usar o template

- **Troque o `BETTER_AUTH_SECRET`.** O valor do `.env.example` é um placeholder. Gere um real com `openssl rand -base64 32` e nunca reaproveite o de desenvolvimento em produção.
- **As credenciais do `docker-compose.yml` são locais.** Usuário `postgres` e senha `postgres` servem para a máquina do desenvolvedor e não devem sair dela.
- **Remova o usuário de demonstração.** O `bun run seed` cria `demo@example.com` com senha `demo1234`. Apague antes de expor a aplicação.
- **Não comite arquivos `.env`.** O `.gitignore` já cobre `.env*`, com exceção explícita apenas do `.env.example`.
- **Acompanhe os avisos do Dependabot**, em especial os do `next`, que concentram a maior parte da superfície de ataque de uma aplicação Next.js.
