# Relatório de Migração — TCU Study OS v11

## Base usada

A migração parte do backup do usuário de 04/09/2026 e preserva o estado real do ciclo e todo o histórico de sessões.

## Alterações estruturais

- duração de sessão migrada de horas decimais para `durationMinutes` (inteiro);
- campo legado `hours` continua gravado apenas para compatibilidade com backups anteriores;
- todas as telas exibem duração em horas/minutos;
- revisão noturna passa a ser uma sessão de modo Revisão com `kind: nightReview`;
- tópicos Em espera aparecem antes dos tópicos já trabalhados nos seletores;
- migração de Português não força mais estado ativo/frequência/ordem do ciclo;
- corrigidas ocorrências históricas indevidas de `Portuguêsaria` para `Portaria`;
- tópicos órfãos conhecidos foram religados às disciplinas correspondentes;
- Service Worker passa a usar estratégia network-first para reduzir versões antigas presas em cache.

## Conteúdos adicionados/substituídos

- `[LIC] Licitações e Contratos (Foco TCU) - Rafael Oliveira`: 11 tópicos, preservando o mesmo ID interno e o histórico da antiga disciplina Licitações.
- `DAD - Rafael Oliveira [VAs] [2026]`: 22 tópicos; a expressão `Em breve` foi removida dos títulos.
- `TI - TCU [TI Total]`: conteúdo anterior de TI removido e substituído por 36 módulos da nova trilha.
- Missão Cebraspe: 9 disciplinas independentes, incluindo Teórico 2026, Sabadão, questões por assunto, Interpretação, provas superior 2026, provas 2024, provas 2023, provas nível médio e Redação Oficial.

## Nomes das provas

Sempre que a fonte forneceu o concurso/cargo, esse nome foi usado em vez de `Prova 1`, `Prova 2` etc. Para 2023/2024, a fonte fornecida exibiu apenas os rótulos genéricos em alguns materiais; nesses casos o app mantém `Prova 01 [ano]`, sem inventar o concurso.

## Validação

- 31 disciplinas;
- 870 tópicos;
- 77 sessões históricas preservadas;
- 0 IDs duplicados nas coleções principais;
- 0 tópicos órfãos;
- 0 divergências entre horas legadas e `durationMinutes` após migração;
- estado ativo do ciclo do backup preservado.
