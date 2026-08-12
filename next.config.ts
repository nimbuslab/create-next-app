import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O "next dev" reescreve AGENTS.md e CLAUDE.md a cada execução. Neste
  // template esses arquivos são gerados pelo "bun run setup", que monta as
  // configurações dos cinco assistentes suportados, então a geração automática
  // fica desligada para não sobrescrever o conteúdo do projeto nem sujar a
  // árvore de trabalho.
  agentRules: false,
};

export default nextConfig;
