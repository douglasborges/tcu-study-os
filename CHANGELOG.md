# Changelog

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
