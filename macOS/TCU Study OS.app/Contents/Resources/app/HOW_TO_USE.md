# Como usar o TCU Study OS v8

## Fluxo recomendado

Use o app assim:

**Hoje → Registrar → Progresso → Backup**

Você registra **uma disciplina por vez**. Exemplo:

- DCON — Teoria — 2,5h — 25 questões — 17 acertos
- Português — Questões — 2h — 40 questões — 31 acertos

## Ciclo

Na tela **Ciclo**, deixe ativas as disciplinas que estão sendo estudadas. A frequência indica quantas vezes a disciplina aparece no ciclo, mas o app separa as repetições.

Exemplo:

**Português 2x + DCON 1x + DAD 1x** vira:

**Português → DCON → Português → DAD**

## Conteúdo

Na tela **Conteúdo**, cada tópico pode ter status:

- Estudando
- Revisado
- Em espera
- Questões
- Caderno de Erros

O avanço do ciclo ativo usa apenas disciplinas ativas e considera a maturidade dos tópicos.

## Progresso motivacional

A tela **Progresso** mostra:

- horas hoje, semana, mês;
- percentual de acertos;
- avanço do ciclo ativo;
- tópicos ativos;
- constância;
- recordes pessoais;
- conquistas;
- progresso por disciplina ativa.

## Backup

O app faz snapshots locais no navegador, mas isso não substitui backup externo.

Use:

**Backup → Exportar backup agora**

Guarde o JSON no iCloud Drive ou Google Drive.

Na v8, você pode ativar em **Configurações**:

**Auto-exportar após registro = Sim**

Quando ativado, o app baixa um JSON automaticamente depois de salvar uma sessão. Salve esse arquivo em uma pasta segura.

## Atualizar no GitHub Pages

1. Exporte backup JSON.
2. Substitua todos os arquivos no repositório.
3. Faça commit.
4. Abra a URL do app.
5. Use Command + Shift + R se o navegador mantiver cache antigo.
6. Importe o backup se necessário.
