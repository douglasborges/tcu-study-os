# TCU Study OS PWA v10

Versão de estabilidade com diagnóstico de ambiente, salvamento reforçado e correção de migração de dados.

## Ponto principal

O app é local-first: os dados ficam no armazenamento do ambiente em que você abriu o app. No macOS, o app aberto pelo Dock pode ter armazenamento separado do Safari/Chrome. Escolha um ambiente principal.

## Fluxo seguro

1. Use sempre o mesmo ambiente, preferencialmente o app do Dock.
2. Registre uma disciplina por vez.
3. Exporte backup JSON ao final do dia.
4. Para migrar entre navegador e Dock, exporte no ambiente com dados e importe no ambiente principal.
