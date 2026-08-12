# Changelog

Todas as mudanças relevantes deste template são registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não publicado]

### Adicionado

- Suporte ao Gemini CLI na geração de configs de assistentes de IA, gerando `.gemini/GEMINI.md`
- Opção de criar o repositório no GitHub durante o `bun run setup`, com escolha de dono e de visibilidade
- Script `db:generate` para gerar arquivos de migração do Drizzle
- Script `lint:fix`, separado da verificação
- `.env.example` com as variáveis que o código realmente lê, alinhado ao `docker-compose.yml`
- Workflow de CI com typecheck, lint e build, rodando em pull request e em push na `main`
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` e este changelog
- Tradução do README para inglês, com paridade de seções

### Alterado

- README canônico passa a ser o português, na raiz do repositório
- `lint` passa a apenas verificar o código; a correção automática virou `lint:fix`
- O `.env` gerado pelo `bun run setup` passa a incluir `NEXT_PUBLIC_APP_URL`

### Corrigido

- Falha de typecheck e de build causada pela ausência de `@types/bun`, que deixava o template sem compilar
- 27 avisos de segurança do Dependabot, com a atualização do Next para 16.3.0 e do React para 19.2.8
- Espaçamento entre input e botão nas páginas de login e registro
- Comando de build documentado nas configs de IA geradas, que usava `bun build` em vez de `bun run build`
- Comandos, caminhos de arquivo e afirmações sobre autenticação incorretos no README
