# Atualização no GitHub Pages — v11

## Antes de atualizar

1. Abra o TCU Study OS atual.
2. Vá em **Backup → Exportar backup agora**.
3. Guarde o JSON no iCloud/Google Drive.

## Upload

1. Descompacte o ZIP da v11.
2. Abra seu repositório `tcu-study-os` no GitHub.
3. Vá em **Code → Add file → Upload files**.
4. Envie os arquivos **de dentro** da pasta da v11, inclusive `assets/icons/`.
5. Não envie o ZIP e **não envie seu backup JSON**.
6. Em Commit message, use: `Atualiza TCU Study OS para v11`.
7. Clique em **Commit changes**.

## Aguarde o deploy

1. Abra **Actions** ou **Deployments**.
2. Aguarde o `github-pages` ficar com check verde.
3. Abra: `https://douglasborges.github.io/tcu-study-os/?v=11`
4. Se necessário, faça **Command + Shift + R**.

A v11 usa Service Worker network-first, então futuras atualizações devem ficar menos propensas a cache antigo.

## Restaurar os dados

Use **Backup → Importar → Substituir tudo** com o arquivo `tcu-study-os-backup-v11-migrado-2026-09-04.json` fornecido separadamente nesta conversa.

Depois confirme:
- Histórico;
- Progresso;
- Ciclo;
- Conteúdo;
- Revisão Noturna.
