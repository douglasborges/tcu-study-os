# Changelog

## v11.4 — Novo ciclo TCU + 30h semanais

### Ciclo ativo
- ativa somente `AFO (Pacelli)`, `DAD - Rafael Oliveira [VAs] [2026]`, `[Port_Cebraspe] 1- Teórico [2026] [13 aulas]`, `DCON` e `TI - TCU [TI Total]`;
- define uma passagem de cada disciplina por volta do ciclo, na ordem solicitada;
- coloca todas as demais disciplinas em `Em espera`, fora da contabilização do ciclo;
- renomeia a disciplina AFO para `AFO (Pacelli)`, preservando tópicos e histórico.

### Carga horária
- CH diária passa para 5h;
- meta semanal passa para 30h;
- revisão noturna permanece como registro separado e é tratada como carga adicional à CH diária de estudo;
- meta mensal existente é preservada porque não foi alterada no novo plano.

### DAD + TEC
- mantém o curso novo de Rafael Oliveira como DAD ativo;
- migra automaticamente URLs de cadernos TEC da DAD antiga para tópicos compatíveis do curso Rafael;
- cobre princípios, organização, indireta, terceiro setor, serviços públicos, PPP/consórcios, poderes, atos, processo, licitações, intervenção na propriedade, bens, agentes/Lei 8.112, responsabilidade civil, controle, improbidade e Lei Anticorrupção;
- quando mais de um caderno compatível aponta para o mesmo tópico, preserva o principal em `tecUrl` e registra os demais nas observações.

### Sincronização e segurança
- a migração é executada uma única vez por base de dados;
- preserva `STORE_KEY`, sessões, tópicos, questões, histórico e backups;
- marca a base como pendente para que o novo plano seja enviado ao Google Drive na próxima sincronização;
- mantém a v11.3.1 de OAuth e o carregamento rápido.

## v11.2 — Google Drive Sync + ícone Azul & Dourado

### Sincronização
- adiciona sincronização opcional dos registros com Google Drive usando OAuth 2.0 no navegador;
- usa somente o escopo `drive.file`, sem acesso geral aos demais arquivos do Drive;
- cria e mantém `TCU Study OS - Dados.json` no Drive do usuário;
- preserva `localStorage` como cópia local e funcionamento offline;
- envia alterações automaticamente enquanto a sessão Google estiver autorizada;
- em outro dispositivo, localiza a mesma base criada pelo app e carrega os dados do Drive;
- conflitos entre alterações locais e remotas exigem escolha explícita do usuário;
- tokens OAuth não são gravados em `localStorage` e nenhum client secret é usado no código.

### Interface
- adiciona estado de nuvem: Conectar, Sincronizando, Sincronizado, Pendente, Offline e Reconectar;
- passa a usar o logo azul-marinho e dourado já existente no projeto na interface e como favicon preferencial;
- mantém os PNGs antigos como fallback de compatibilidade para instalações PWA antigas.

### Compatibilidade
- não altera o `STORE_KEY` nem a estrutura principal dos dados;
- mantém sessões, tópicos, ciclo, histórico, Revisão Noturna, Horas/Minutos e Cursos 2026;
- renova o cache da PWA para a v11.2.

## v11.1 — Identidade Azul & Dourado

### Interface
- restaura a identidade oficial do TCU Study OS em azul-marinho e dourado;
- usa `#26247B`, `#11113D` e `#1B1A58` como base estrutural;
- usa `#FFCB05` e `#F5D86E` nos destaques;
- mantém o verde apenas como cor de apoio semântico;
- corrige cores verdes remanescentes em gráficos dinâmicos do ciclo.

### PWA
- atualiza `theme-color`, manifesto e cache para a v11.1;
- preserva a estratégia network-first do Service Worker;
- força renovação do cache visual sem alterar os dados locais do usuário.

### Compatibilidade
- nenhuma alteração no `STORE_KEY`, sessões, tópicos, ciclos, histórico ou migrações;
- preservadas integralmente as funcionalidades de Horas/Minutos, Revisão Noturna e Cursos 2026.

## v11.0 — Horas/Minutos + Revisão Noturna + Cursos 2026

### Tempo
- registro separado em Horas e Minutos;
- exibição global em formato `Xh YYmin`;
- migração de horas decimais antigas para minutos inteiros;
- metas diária/semanal/mensal e CH manual do ciclo também usam horas/minutos.

### Conteúdo
- Licitações renomeada para `[LIC] Licitações e Contratos (Foco TCU) - Rafael Oliveira`, preservando histórico;
- 9 disciplinas do ecossistema `[Port_Cebraspe]` adicionadas;
- `DAD - Rafael Oliveira [VAs] [2026]` adicionada com 22 tópicos;
- TI renomeada para `TI - TCU [TI Total]` e conteúdo antigo substituído pela nova trilha enviada;
- tópicos trabalhados movidos para baixo no seletor de registro.

### Revisão Noturna
- nova tela;
- hoje + pendência do dia anterior;
- agrupamento por disciplina;
- prevenção de duplicidade;
- tempo da revisão incluído nas estatísticas.

### Estabilidade
- migração Port→Português deixa de forçar ativo/ordem/frequência do ciclo;
- correção automática de `Portuguêsaria` para `Portaria`;
- reparo de tópicos órfãos conhecidos;
- Service Worker alterado de cache-first para network-first.
