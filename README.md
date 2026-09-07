# TCU Study OS PWA v11

**v11.0 — Horas/Minutos + Revisão Noturna + Cursos 2026**

PWA local-first para controle de estudos do TCU, hospedável gratuitamente no GitHub Pages.

## Destaques da v11

- tempo registrado em **Horas + Minutos**, sem decimais na interface;
- migração automática de registros antigos (`hours`) para `durationMinutes`;
- **Revisão Noturna** com pendências de hoje e do dia anterior;
- tópicos **Em espera** aparecem primeiro no seletor; tópicos já trabalhados descem para o final;
- novos cursos de Português Missão Cebraspe, DAD Rafael Oliveira e Licitações/Contratos Rafael Oliveira;
- TI substituído integralmente por **TI - TCU [TI Total]**;
- correção do bug antigo `Portuguêsaria` → `Portaria`;
- correção da migração que alterava indevidamente o ciclo do usuário;
- Service Worker em **network-first**, reduzindo o risco de ficar preso em versão antiga do GitHub Pages;
- backup JSON, snapshots locais e diagnóstico do ambiente continuam disponíveis.

## Arquivos principais

- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `sw.js`
- `assets/icons/`

> **Não envie seu backup JSON pessoal ao GitHub.** O repositório público deve conter somente os arquivos do app.
