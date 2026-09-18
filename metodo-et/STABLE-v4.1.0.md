# Método ET v4.1.0 Stable

Data de congelamento: 18/09/2026

Esta versão foi congelada como base estável do projeto Preparação para o TCU.

## Escopo consolidado
- ciclo contínuo por ocorrência, sem preenchimento artificial de 2h/90min;
- tempo real livre por sessão;
- microrrevisão sem teto rígido;
- fluxo Teoria → Revisão + Bateria → Checkpoint;
- Metas ET sequenciais de 30h reais;
- Meta 01 com 18 ocorrências e Meta 02 bloqueada até o fechamento;
- Legislação Seca incluída nas horas reais das Metas ET;
- revisão noturna fora das 30h;
- Central de Desempenho preservada;
- progresso multicamada por disciplina;
- compatibilidade com backups anteriores mantida por migração automática dos campos extras;
- sincronização/backup local e Google Drive preservados.

## Validações da release
- módulos JavaScript verificados;
- ocorrência de 37 min pode concluir o ciclo e chamar a próxima disciplina;
- sessão parcial não avança o ciclo;
- microrrevisão acima de 10% não é bloqueada;
- Meta 01 nasce ativa com 18 etapas e 30h de alvo;
- Meta 02 nasce bloqueada;
- cache-bust dos módulos alinhado à v4.1.0.

Qualquer melhoria posterior deve partir desta versão e evitar alterações retroativas nesta referência estável.
