# Publicar online no GitHub Pages

Este app é estático: basta publicar os arquivos do ZIP em um repositório GitHub Pages.

## Opção mais simples

1. Crie uma conta gratuita no GitHub, caso ainda não tenha.
2. Crie um novo repositório, por exemplo: `tcu-study-os`.
3. Envie todos os arquivos da pasta do app para a raiz do repositório:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `manifest.webmanifest`
   - `sw.js`
   - pasta `assets/`
4. Abra o repositório no GitHub.
5. Vá em **Settings > Pages**.
6. Em **Build and deployment**, escolha **Deploy from a branch**.
7. Em **Branch**, escolha `main` e `/root`.
8. Clique em **Save**.
9. Aguarde alguns minutos.
10. O GitHub mostrará a URL publicada.

## Instalar no iPad

1. Abra a URL do GitHub Pages no Safari.
2. Toque em **Compartilhar**.
3. Toque em **Adicionar à Tela de Início**.
4. Abra pelo ícone criado.

## Importante

O app online continua sendo **local-first**. Os dados ficam no navegador do dispositivo. Para levar dados do Mac para o iPad, use **Backup > Exportar JSON** e salve no iCloud Drive; depois use **Backup > Importar JSON** no outro dispositivo.

