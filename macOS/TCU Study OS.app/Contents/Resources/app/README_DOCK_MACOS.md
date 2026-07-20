# TCU Study OS v4 — Ícone + Dock do macOS

Esta versão inclui o ícone neon TCU em todos os formatos principais:

- `assets/icons/icon-192.png`
- `assets/icons/icon-512.png`
- `assets/icons/icon-1024.png`
- `assets/icons/apple-touch-icon.png`
- `favicon.ico`
- `TCUStudyOS.icns`
- app auxiliar: `macOS/TCU Study OS.app`

## Opção recomendada — versão online no Safari

Se você publicar o app no GitHub Pages, abra a URL no Safari e use:

**Arquivo > Adicionar ao Dock**

ou, se aparecer no seu macOS:

**Compartilhar > Adicionar ao Dock**

Essa opção cria um app da web separado, com ícone, Dock e janela própria.

## Se a opção não aparecer

Ela pode não aparecer quando você abre um arquivo local `index.html`, porque o macOS/Safari trata isso como arquivo, não como site instalado.

Nesse caso, use uma das opções:

1. publique no GitHub Pages e adicione ao Dock;
2. use o app auxiliar em `macOS/TCU Study OS.app`.

## App auxiliar local para Dock

Dentro da pasta `macOS`, há um app chamado:

`TCU Study OS.app`

Você pode movê-lo para `/Aplicativos` e arrastar para o Dock.

Ao abrir, ele carrega a cópia local do app dentro do próprio pacote `.app`.

Importante: como é um app local não assinado, o macOS pode pedir confirmação. Se bloquear, clique com o botão direito no app e escolha **Abrir** uma vez.

## Dados e backup

Os dados continuam salvos no navegador. Antes de mudar de pasta, navegador ou URL, faça:

**Backup > Exportar JSON**

Depois importe no novo ambiente.
