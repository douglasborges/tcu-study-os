(() => {
  'use strict';

  const STORE_KEY = 'tcu-study-os-pwa-v1'; // mantém compatibilidade com dados da v1
  const BACKUP_VERSION = 8;
  const SNAPSHOT_KEY = 'tcu-study-os-pwa-snapshots';
  const MAX_SNAPSHOTS = 3;
  const MODES = ['Teoria', 'Revisão', 'Questões', 'Caderno de Erros', 'Em espera'];
  const TOPIC_STATUSES = ['Estudando', 'Revisado', 'Em espera', 'Questões', 'Caderno de Erros'];
  const PRIORITIES = ['Alta', 'Média', 'Baixa'];
  const DEFAULT_DISCIPLINES = [
    ['portugues', 'Português', true, 'Teoria', 1, 2, 'Alta'],
    ['dcon', 'DCON', true, 'Teoria', 2, 1, 'Alta'],
    ['dad', 'DAD', true, 'Teoria', 3, 1, 'Alta'],
    ['afo', 'AFO', false, 'Em espera', 4, 1, 'Alta'],
    ['controle-externo', 'Controle Externo', false, 'Em espera', 5, 1, 'Alta'],
    ['auditoria-governamental', 'Auditoria Governamental', false, 'Em espera', 6, 1, 'Alta'],
    ['ti', 'TI', false, 'Em espera', 7, 1, 'Alta'],
    ['cont-publica', 'Cont. Pública', false, 'Em espera', 8, 1, 'Alta'],
    ['ingles', 'Inglês', false, 'Em espera', 9, 1, 'Média'],
    ['anticorrupcao', 'Anticorrupção', false, 'Em espera', 10, 1, 'Média'],
    ['estatistica-cespe', 'Estatística CESPE', false, 'Em espera', 11, 1, 'Média'],
    ['alfabetizacao-matematica', 'Alfabetização Matemática', false, 'Em espera', 12, 1, 'Baixa'],
    ['raciocinio-logico', 'Raciocínio Lógico', false, 'Em espera', 13, 1, 'Média'],
    ['mat-financeira', 'Mat. Financeira', false, 'Em espera', 14, 1, 'Média'],
    ['adm-publica', 'Administração Pública', false, 'Em espera', 15, 1, 'Média'],
    ['direito-civil', 'Direito Civil', false, 'Em espera', 16, 1, 'Média'],
    ['proc-civil', 'Direito Processual Civil', false, 'Em espera', 17, 1, 'Média'],
    ['analise-dados', 'Análise de Dados', false, 'Em espera', 18, 1, 'Alta'],
    ['analise-demonstracoes', 'Análise das Demonstrações Contábeis', false, 'Em espera', 19, 1, 'Média'],
    ['economia-setor-publico', 'Economia do Setor Público', false, 'Em espera', 20, 1, 'Média']
  ];

  const DEFAULT_TOPICS = [
  {
    "disciplineName": "Português",
    "title": "Gramática — Fonética.",
    "details": "Fonética.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 1,
    "notes": "",
    "id": "topic_port_1_gramatica-fonetica"
  },
  {
    "disciplineName": "Português",
    "title": "Gramática — Acentuação gráfica.",
    "details": "Acentuação gráfica.",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_port_2_gramatica-acentuacao-grafica"
  },
  {
    "disciplineName": "Português",
    "title": "Morfologia — Classes de palavras.",
    "details": "Classes de palavras.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_port_3_morfologia-classes-de-palavras"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Funções sintáticas.",
    "details": "Funções sintáticas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_port_4_sintaxe-funcoes-sintaticas"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Concordância verbal.",
    "details": "Concordância verbal.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_port_5_sintaxe-concordancia-verbal"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Concordância nominal.",
    "details": "Concordância nominal.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_port_6_sintaxe-concordancia-nominal"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Regência verbal.",
    "details": "Regência verbal.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_port_7_sintaxe-regencia-verbal"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Regência nominal.",
    "details": "Regência nominal.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_port_8_sintaxe-regencia-nominal"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Crase.",
    "details": "Crase.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_port_9_sintaxe-crase"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Orações.",
    "details": "Orações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_port_10_sintaxe-oracoes"
  },
  {
    "disciplineName": "Português",
    "title": "Sintaxe — Pontuação.",
    "details": "Pontuação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_port_11_sintaxe-pontuacao"
  },
  {
    "disciplineName": "Português",
    "title": "Semântica e estilística — Discurso direto e indireto.",
    "details": "Discurso direto e indireto.",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_port_12_semantica-e-estilistica-discurso-direto-e-indireto"
  },
  {
    "disciplineName": "Português",
    "title": "Morfossintaxe — Vozes verbais.",
    "details": "Vozes verbais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_port_13_morfossintaxe-vozes-verbais"
  },
  {
    "disciplineName": "Português",
    "title": "Ortografia — Ortografia e hífen.",
    "details": "Ortografia e hífen.",
    "status": "Em espera",
    "priority": "Média",
    "order": 14,
    "notes": "",
    "id": "topic_port_14_ortografia-ortografia-e-hifen"
  },
  {
    "disciplineName": "Português",
    "title": "Morfologia — Estrutura e formação de palavras.",
    "details": "Estrutura e formação de palavras.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 15,
    "notes": "",
    "id": "topic_port_15_morfologia-estrutura-e-formacao-de-palavras"
  },
  {
    "disciplineName": "Português",
    "title": "Semântica e estilística — Figuras de linguagem.",
    "details": "Figuras de linguagem.",
    "status": "Em espera",
    "priority": "Média",
    "order": 16,
    "notes": "",
    "id": "topic_port_16_semantica-e-estilistica-figuras-de-linguagem"
  },
  {
    "disciplineName": "Português",
    "title": "Morfossintaxe — Colocação pronominal.",
    "details": "Colocação pronominal.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_port_17_morfossintaxe-colocacao-pronominal"
  },
  {
    "disciplineName": "Português",
    "title": "Morfossintaxe — Classificações do “que” e do “se”.",
    "details": "Classificações do “que” e do “se”.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_port_18_morfossintaxe-classificacoes-do-que-e-do-se"
  },
  {
    "disciplineName": "Português",
    "title": "Morfossintaxe — Classificações do “o” e do “a”.",
    "details": "Classificações do “o” e do “a”.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_port_19_morfossintaxe-classificacoes-do-o-e-do-a"
  },
  {
    "disciplineName": "Português",
    "title": "Morfossintaxe — Classificações do “lhe”.",
    "details": "Classificações do “lhe”.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 20,
    "notes": "",
    "id": "topic_port_20_morfossintaxe-classificacoes-do-lhe"
  },
  {
    "disciplineName": "Português",
    "title": "Interpretação de textos",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 21,
    "notes": "",
    "id": "topic_port_21_interpretacao-de-textos"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Acentuação Gráfica",
    "details": "Pág. teoria: 005 | Resolução de questões: Material 01 — Acentuação | Curso de Redação Cebraspe | Redação Oficial | Resolução de provas: Prova 01",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_port-cebraspe_22_acentuacao-grafica"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Ortografia Oficial",
    "details": "Pág. teoria: 015 | Resolução de questões: Material 02 — Ortografia | Resolução de provas: Prova 02",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_port-cebraspe_23_ortografia-oficial"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Classes de Palavras e seus empregos",
    "details": "Pág. teoria: 027 | Resolução de questões: Material 03 — Classes de Palavras | Resolução de provas: Prova 03",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_port-cebraspe_24_classes-de-palavras-e-seus-empregos"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Funções Sintáticas",
    "details": "Pág. teoria: 039 | Resolução de questões: Material 04 — Funções Sintáticas | Resolução de provas: Prova 04",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_port-cebraspe_25_funcoes-sintaticas"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Concordância Verbal",
    "details": "Pág. teoria: 061 | Resolução de questões: Material 05 — Concordância | Resolução de provas: Prova 05",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_port-cebraspe_26_concordancia-verbal"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Concordância Nominal",
    "details": "Pág. teoria: 073 | Resolução de questões: Material 06 — Regência | Resolução de provas: Prova 06",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_port-cebraspe_27_concordancia-nominal"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Regência Verbal",
    "details": "Pág. teoria: 083 | Resolução de questões: Material 07 — Crase | Resolução de provas: Prova 07",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_port-cebraspe_28_regencia-verbal"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Crase",
    "details": "Pág. teoria: 097 | Resolução de questões: Material 08 — Pronomes | Resolução de provas: Prova 08",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_port-cebraspe_29_crase"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Colocação Pronominal",
    "details": "Pág. teoria: 109 | Resolução de questões: Material 09 — Verbos | Resolução de provas: Prova 09",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_port-cebraspe_30_colocacao-pronominal"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Verbos – Modos e Tempos",
    "details": "Pág. teoria: 129 | Resolução de questões: Material 10 — Orações | Resolução de provas: Prova 10",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_port-cebraspe_31_verbos-modos-e-tempos"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Vozes do Verbo",
    "details": "Pág. teoria: 141 | Resolução de questões: Material 11 — Pontuação | Resolução de provas: Prova 11",
    "status": "Em espera",
    "priority": "Média",
    "order": 11,
    "notes": "",
    "id": "topic_port-cebraspe_32_vozes-do-verbo"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Orações",
    "details": "Pág. teoria: 151 | Resolução de questões: Material 12 — Diversas e reescrita",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_port-cebraspe_33_oracoes"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Pontuação",
    "details": "Pág. teoria: 173 | Resolução de questões: Material 13 — Leitura",
    "status": "Em espera",
    "priority": "Média",
    "order": 13,
    "notes": "",
    "id": "topic_port-cebraspe_34_pontuacao"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Compreensão de Textos x Interpretação de Textos",
    "details": "Pág. teoria: 187",
    "status": "Em espera",
    "priority": "Média",
    "order": 14,
    "notes": "",
    "id": "topic_port-cebraspe_35_compreensao-de-textos-x-interpretacao-de-textos"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Coesão Textual",
    "details": "Pág. teoria: 193",
    "status": "Em espera",
    "priority": "Média",
    "order": 15,
    "notes": "",
    "id": "topic_port-cebraspe_36_coesao-textual"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Tipologia Textual",
    "details": "Pág. teoria: 197",
    "status": "Em espera",
    "priority": "Média",
    "order": 16,
    "notes": "",
    "id": "topic_port-cebraspe_37_tipologia-textual"
  },
  {
    "disciplineName": "Português Cebraspe",
    "title": "Gêneros Textuais",
    "details": "Pág. teoria: 203",
    "status": "Em espera",
    "priority": "Média",
    "order": 17,
    "notes": "",
    "id": "topic_port-cebraspe_38_generos-textuais"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula demo — Regime jurídico-administrativo. Princípios expressos e implícitos da Administração Pública.",
    "details": "Regime jurídico-administrativo. Princípios expressos e implícitos da Administração Pública.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_dad_39_aula-demo-regime-juridico-administrativo-principios-expresso"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 01 — Estado, governo e Administração Pública. Direito Administrativo.",
    "details": "Estado, governo e Administração Pública. Direito Administrativo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_dad_40_aula-01-estado-governo-e-administracao-publica-direito-admin"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 02 — Organização administrativa. Centralização, descentralização, concentração e desconcentração. Administração direta e indireta. Autarquias.",
    "details": "Organização administrativa. Centralização, descentralização, concentração e desconcentração. Administração direta e indireta. Autarquias.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_dad_41_aula-02-organizacao-administrativa-centralizacao-descentrali"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 03 — Fundações, empresas públicas e sociedades de economia mista.",
    "details": "Fundações, empresas públicas e sociedades de economia mista.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_dad_42_aula-03-fundacoes-empresas-publicas-e-sociedades-de-economia"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 04 — Terceiro Setor. Entidades paraestatais.",
    "details": "Terceiro Setor. Entidades paraestatais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_dad_43_aula-04-terceiro-setor-entidades-paraestatais"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 05 — Poderes da Administração Pública. Uso e abuso do poder.",
    "details": "Poderes da Administração Pública. Uso e abuso do poder.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_dad_44_aula-05-poderes-da-administracao-publica-uso-e-abuso-do-pode"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 06 — Ato administrativo.",
    "details": "Ato administrativo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_dad_45_aula-06-ato-administrativo"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 07 — Licitações e Contratos Administrativos. Lei nº 14.133/2021 — licitações, parte 1.",
    "details": "Licitações e Contratos Administrativos. Lei nº 14.133/2021 — licitações, parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_dad_46_aula-07-licitacoes-e-contratos-administrativos-lei-n-14-133-"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 08 — Licitações e Contratos Administrativos. Lei nº 14.133/2021 — licitações, parte 2.",
    "details": "Licitações e Contratos Administrativos. Lei nº 14.133/2021 — licitações, parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_dad_47_aula-08-licitacoes-e-contratos-administrativos-lei-n-14-133-"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 09 — Licitações e Contratos Administrativos. Lei nº 14.133/2021 — contratos.",
    "details": "Licitações e Contratos Administrativos. Lei nº 14.133/2021 — contratos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_dad_48_aula-09-licitacoes-e-contratos-administrativos-lei-n-14-133-"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 10 — Serviços públicos.",
    "details": "Serviços públicos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_dad_49_aula-10-servicos-publicos"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 11 — Parceria Público-Privada. Consórcios Públicos.",
    "details": "Parceria Público-Privada. Consórcios Públicos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_dad_50_aula-11-parceria-publico-privada-consorcios-publicos"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 12 — Convênios. Decreto nº 6.170/2007 e Portuguêsaria Interministerial MP/MF/CGU nº 424/2016.",
    "details": "Convênios. Decreto nº 6.170/2007 e Portuguêsaria Interministerial MP/MF/CGU nº 424/2016.",
    "status": "Em espera",
    "priority": "Média",
    "order": 13,
    "notes": "",
    "id": "topic_dad_51_aula-12-convenios-decreto-n-6-170-2007-e-portaria-interminis"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 13 — Controle da Administração.",
    "details": "Controle da Administração.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_dad_52_aula-13-controle-da-administracao"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 14 — Responsabilidade civil do Estado.",
    "details": "Responsabilidade civil do Estado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 15,
    "notes": "",
    "id": "topic_dad_53_aula-14-responsabilidade-civil-do-estado"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 15 — Bens públicos.",
    "details": "Bens públicos.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 16,
    "notes": "",
    "id": "topic_dad_54_aula-15-bens-publicos"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 16 — Intervenção do Estado na propriedade.",
    "details": "Intervenção do Estado na propriedade.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 17,
    "notes": "",
    "id": "topic_dad_55_aula-16-intervencao-do-estado-na-propriedade"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 17 — Agentes públicos.",
    "details": "Agentes públicos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_dad_56_aula-17-agentes-publicos"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 18 — Lei nº 8.112/1990 — parte 1.",
    "details": "Lei nº 8.112/1990 — parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_dad_57_aula-18-lei-n-8-112-1990-parte-1"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 19 — Lei nº 8.112/1990 — parte 2.",
    "details": "Lei nº 8.112/1990 — parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 20,
    "notes": "",
    "id": "topic_dad_58_aula-19-lei-n-8-112-1990-parte-2"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 20 — Lei nº 8.112/1990 — parte 3.",
    "details": "Lei nº 8.112/1990 — parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 21,
    "notes": "",
    "id": "topic_dad_59_aula-20-lei-n-8-112-1990-parte-3"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 21 — Processo administrativo. Lei nº 9.784/1999.",
    "details": "Processo administrativo. Lei nº 9.784/1999.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 22,
    "notes": "",
    "id": "topic_dad_60_aula-21-processo-administrativo-lei-n-9-784-1999"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 22 — Improbidade administrativa. Lei nº 8.429/1992. Lei Anticorrupção.",
    "details": "Improbidade administrativa. Lei nº 8.429/1992. Lei Anticorrupção.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 23,
    "notes": "",
    "id": "topic_dad_61_aula-22-improbidade-administrativa-lei-n-8-429-1992-lei-anti"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula 23 — Lei de Acesso à Informação.",
    "details": "Lei de Acesso à Informação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 24,
    "notes": "",
    "id": "topic_dad_62_aula-23-lei-de-acesso-a-informacao"
  },
  {
    "disciplineName": "DAD",
    "title": "Aula Extra — Regime Diferenciado de Contratação — RDC.",
    "details": "Regime Diferenciado de Contratação — RDC.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 25,
    "notes": "",
    "id": "topic_dad_63_aula-extra-regime-diferenciado-de-contratacao-rdc"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula demo — Teoria Geral da Constituição.",
    "details": "Teoria Geral da Constituição.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_dcon_64_aula-demo-teoria-geral-da-constituicao"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 02 — Princípios Fundamentais.",
    "details": "Princípios Fundamentais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_dcon_65_aula-02-principios-fundamentais"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 03 — Teoria Geral dos Direitos Fundamentais.",
    "details": "Teoria Geral dos Direitos Fundamentais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_dcon_66_aula-03-teoria-geral-dos-direitos-fundamentais"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 04 — Direitos e Deveres Individuais e Coletivos. Art. 5º da Constituição Federal de 1988.",
    "details": "Direitos e Deveres Individuais e Coletivos. Art. 5º da Constituição Federal de 1988.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_dcon_67_aula-04-direitos-e-deveres-individuais-e-coletivos-art-5-da-"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 05 — Remédios Constitucionais.",
    "details": "Remédios Constitucionais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_dcon_68_aula-05-remedios-constitucionais"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 06 — Direitos Sociais.",
    "details": "Direitos Sociais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_dcon_69_aula-06-direitos-sociais"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 07 — Direitos de Nacionalidade.",
    "details": "Direitos de Nacionalidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_dcon_70_aula-07-direitos-de-nacionalidade"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 08 — Direitos Políticos.",
    "details": "Direitos Políticos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_dcon_71_aula-08-direitos-politicos"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 09 — Partidos Políticos.",
    "details": "Partidos Políticos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_dcon_72_aula-09-partidos-politicos"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 10 — Organização do Estado.",
    "details": "Organização do Estado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_dcon_73_aula-10-organizacao-do-estado"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 11 — Administração Pública.",
    "details": "Administração Pública.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_dcon_74_aula-11-administracao-publica"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 12 — Poder Legislativo.",
    "details": "Poder Legislativo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_dcon_75_aula-12-poder-legislativo"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 13 — Processo Legislativo.",
    "details": "Processo Legislativo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_dcon_76_aula-13-processo-legislativo"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 14 — Fiscalização Financeira e Orçamentária.",
    "details": "Fiscalização Financeira e Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_dcon_77_aula-14-fiscalizacao-financeira-e-orcamentaria"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 15 — Poder Executivo.",
    "details": "Poder Executivo.",
    "status": "Em espera",
    "priority": "Média",
    "order": 15,
    "notes": "",
    "id": "topic_dcon_78_aula-15-poder-executivo"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 16 — Poder Judiciário.",
    "details": "Poder Judiciário.",
    "status": "Em espera",
    "priority": "Média",
    "order": 16,
    "notes": "",
    "id": "topic_dcon_79_aula-16-poder-judiciario"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 17 — Funções Essenciais à Justiça.",
    "details": "Funções Essenciais à Justiça.",
    "status": "Em espera",
    "priority": "Média",
    "order": 17,
    "notes": "",
    "id": "topic_dcon_80_aula-17-funcoes-essenciais-a-justica"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 18 — Controle de Constitucionalidade.",
    "details": "Controle de Constitucionalidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_dcon_81_aula-18-controle-de-constitucionalidade"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 19 — Defesa do Estado e das Instituições Democráticas.",
    "details": "Defesa do Estado e das Instituições Democráticas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 19,
    "notes": "",
    "id": "topic_dcon_82_aula-19-defesa-do-estado-e-das-instituicoes-democraticas"
  },
  {
    "disciplineName": "DCON",
    "title": "Aula 20 — Ordem Econômica e Financeira.",
    "details": "Ordem Econômica e Financeira.",
    "status": "Em espera",
    "priority": "Média",
    "order": 20,
    "notes": "",
    "id": "topic_dcon_83_aula-20-ordem-economica-e-financeira"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral.",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_afo_84_visao-geral"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — PPA.",
    "details": "PPA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_afo_85_visao-geral-ppa"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — LDO.",
    "details": "LDO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_afo_86_visao-geral-ldo"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — LOA.",
    "details": "LOA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_afo_87_visao-geral-loa"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — Ciclo Orçamentário.",
    "details": "Ciclo Orçamentário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_afo_88_visao-geral-ciclo-orcamentario"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — Créditos Adicionais.",
    "details": "Créditos Adicionais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_afo_89_visao-geral-creditos-adicionais"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — Competência para Legislar Orçamento.",
    "details": "Competência para Legislar Orçamento.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_afo_90_visao-geral-competencia-para-legislar-orcamento"
  },
  {
    "disciplineName": "AFO",
    "title": "Visão Geral. — PDF — Visão Geral sobre PPA, LDO e LOA; Ciclo Orçamentário; Créditos Adicionais. Competência para legislar sobre orçamento.",
    "details": "PDF — Visão Geral sobre PPA, LDO e LOA; Ciclo Orçamentário; Créditos Adicionais. Competência para legislar sobre orçamento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_afo_91_visao-geral-pdf-visao-geral-sobre-ppa-ldo-e-loa-ciclo-orcame"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Unidade.",
    "details": "Princípio da Unidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_afo_92_principios-principio-da-unidade"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Universalidade.",
    "details": "Princípio da Universalidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_afo_93_principios-principio-da-universalidade"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio do Orçamento Bruto.",
    "details": "Princípio do Orçamento Bruto.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_afo_94_principios-principio-do-orcamento-bruto"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Anualidade.",
    "details": "Princípio da Anualidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_afo_95_principios-principio-da-anualidade"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio do Equilíbrio.",
    "details": "Princípio do Equilíbrio.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_afo_96_principios-principio-do-equilibrio"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Exclusividade.",
    "details": "Princípio da Exclusividade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_afo_97_principios-principio-da-exclusividade"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Não Afetação.",
    "details": "Princípio da Não Afetação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 15,
    "notes": "",
    "id": "topic_afo_98_principios-principio-da-nao-afetacao"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — EC 93/2015 até a EC 135/2024.",
    "details": "EC 93/2015 até a EC 135/2024.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 16,
    "notes": "",
    "id": "topic_afo_99_principios-ec-93-2015-ate-a-ec-135-2024"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Especificação - Parte 1.",
    "details": "Princípio da Especificação - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_afo_100_principios-principio-da-especificacao-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Especificação - Parte 2.",
    "details": "Princípio da Especificação - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_afo_101_principios-principio-da-especificacao-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Unidade de Caixa.",
    "details": "Princípio da Unidade de Caixa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_afo_102_principios-principio-da-unidade-de-caixa"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Legalidade.",
    "details": "Princípio da Legalidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 20,
    "notes": "",
    "id": "topic_afo_103_principios-principio-da-legalidade"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Proibição do Estorno.",
    "details": "Princípio da Proibição do Estorno.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 21,
    "notes": "",
    "id": "topic_afo_104_principios-principio-da-proibicao-do-estorno"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Demais Princípios.",
    "details": "Demais Princípios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 22,
    "notes": "",
    "id": "topic_afo_105_principios-demais-principios"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio da Regionalização.",
    "details": "Princípio da Regionalização.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 23,
    "notes": "",
    "id": "topic_afo_106_principios-principio-da-regionalizacao"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — Princípio do Orçamento Impositivo.",
    "details": "Princípio do Orçamento Impositivo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 24,
    "notes": "",
    "id": "topic_afo_107_principios-principio-do-orcamento-impositivo"
  },
  {
    "disciplineName": "AFO",
    "title": "Princípios. — PDF — Princípios Orçamentários.",
    "details": "PDF — Princípios Orçamentários.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 25,
    "notes": "",
    "id": "topic_afo_108_principios-pdf-principios-orcamentarios"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Orçamento Tradicional.",
    "details": "Orçamento Tradicional.",
    "status": "Em espera",
    "priority": "Média",
    "order": 26,
    "notes": "",
    "id": "topic_afo_109_tipos-de-orcamentos-orcamento-tradicional"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Orçamento Desempenho.",
    "details": "Orçamento Desempenho.",
    "status": "Em espera",
    "priority": "Média",
    "order": 27,
    "notes": "",
    "id": "topic_afo_110_tipos-de-orcamentos-orcamento-desempenho"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Orçamento Programa.",
    "details": "Orçamento Programa.",
    "status": "Em espera",
    "priority": "Média",
    "order": 28,
    "notes": "",
    "id": "topic_afo_111_tipos-de-orcamentos-orcamento-programa"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Orçamento Base Zero.",
    "details": "Orçamento Base Zero.",
    "status": "Em espera",
    "priority": "Média",
    "order": 29,
    "notes": "",
    "id": "topic_afo_112_tipos-de-orcamentos-orcamento-base-zero"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Demais Modelos.",
    "details": "Demais Modelos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 30,
    "notes": "",
    "id": "topic_afo_113_tipos-de-orcamentos-demais-modelos"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Tipos de Orçamento: Executivo, Legislativo e Misto.",
    "details": "Tipos de Orçamento: Executivo, Legislativo e Misto.",
    "status": "Em espera",
    "priority": "Média",
    "order": 31,
    "notes": "",
    "id": "topic_afo_114_tipos-de-orcamentos-tipos-de-orcamento-executivo-legislativo"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — Tipos de Orçamento: Autorizativo, Impositivo e Híbrido.",
    "details": "Tipos de Orçamento: Autorizativo, Impositivo e Híbrido.",
    "status": "Em espera",
    "priority": "Média",
    "order": 32,
    "notes": "",
    "id": "topic_afo_115_tipos-de-orcamentos-tipos-de-orcamento-autorizativo-impositi"
  },
  {
    "disciplineName": "AFO",
    "title": "Tipos de orçamentos. — PDF — Modelos Orçamentários.",
    "details": "PDF — Modelos Orçamentários.",
    "status": "Em espera",
    "priority": "Média",
    "order": 33,
    "notes": "",
    "id": "topic_afo_116_tipos-de-orcamentos-pdf-modelos-orcamentarios"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — PPA na CF.",
    "details": "PPA na CF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 34,
    "notes": "",
    "id": "topic_afo_117_ppa-ldo-loa-e-creditos-adicionais-ppa-na-cf"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Mosaico do PPA 2024-2027.",
    "details": "Mosaico do PPA 2024-2027.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 35,
    "notes": "",
    "id": "topic_afo_118_ppa-ldo-loa-e-creditos-adicionais-mosaico-do-ppa-2024-2027"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Ciclo do PPA 2024-2027.",
    "details": "Ciclo do PPA 2024-2027.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 36,
    "notes": "",
    "id": "topic_afo_119_ppa-ldo-loa-e-creditos-adicionais-ciclo-do-ppa-2024-2027"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO Parte 1 - Atribuições Principais.",
    "details": "LDO Parte 1 - Atribuições Principais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 37,
    "notes": "",
    "id": "topic_afo_120_ppa-ldo-loa-e-creditos-adicionais-ldo-parte-1-atribuicoes-pr"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO Parte 2 - Outras Atribuições.",
    "details": "LDO Parte 2 - Outras Atribuições.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 38,
    "notes": "",
    "id": "topic_afo_121_ppa-ldo-loa-e-creditos-adicionais-ldo-parte-2-outras-atribui"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO Anexos - Visão Geral.",
    "details": "LDO Anexos - Visão Geral.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 39,
    "notes": "",
    "id": "topic_afo_122_ppa-ldo-loa-e-creditos-adicionais-ldo-anexos-visao-geral"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO AMF - Parte 1.",
    "details": "LDO AMF - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 40,
    "notes": "",
    "id": "topic_afo_123_ppa-ldo-loa-e-creditos-adicionais-ldo-amf-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO AMF padrão e ampliado.",
    "details": "LDO AMF padrão e ampliado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 41,
    "notes": "",
    "id": "topic_afo_124_ppa-ldo-loa-e-creditos-adicionais-ldo-amf-padrao-e-ampliado"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LDO ARF.",
    "details": "LDO ARF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 42,
    "notes": "",
    "id": "topic_afo_125_ppa-ldo-loa-e-creditos-adicionais-ldo-arf"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LOA - Conceitos - Parte 1 - EED.",
    "details": "LOA - Conceitos - Parte 1 - EED.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 43,
    "notes": "",
    "id": "topic_afo_126_ppa-ldo-loa-e-creditos-adicionais-loa-conceitos-parte-1-eed"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LOA - Conceitos - Parte 2.",
    "details": "LOA - Conceitos - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 44,
    "notes": "",
    "id": "topic_afo_127_ppa-ldo-loa-e-creditos-adicionais-loa-conceitos-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Mosaico da LOA.",
    "details": "Mosaico da LOA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 45,
    "notes": "",
    "id": "topic_afo_128_ppa-ldo-loa-e-creditos-adicionais-mosaico-da-loa"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LOA - Conceitos - Parte 4 - OI.",
    "details": "LOA - Conceitos - Parte 4 - OI.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 46,
    "notes": "",
    "id": "topic_afo_129_ppa-ldo-loa-e-creditos-adicionais-loa-conceitos-parte-4-oi"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — LOA - Conceitos - Parte 5 - OSS.",
    "details": "LOA - Conceitos - Parte 5 - OSS.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 47,
    "notes": "",
    "id": "topic_afo_130_ppa-ldo-loa-e-creditos-adicionais-loa-conceitos-parte-5-oss"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Prazos de Elaboração e Aprovação PPA, LDO, LOA.",
    "details": "Prazos de Elaboração e Aprovação PPA, LDO, LOA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 48,
    "notes": "",
    "id": "topic_afo_131_ppa-ldo-loa-e-creditos-adicionais-prazos-de-elaboracao-e-apr"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Integração PPA, OF e OI.",
    "details": "Integração PPA, OF e OI.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 49,
    "notes": "",
    "id": "topic_afo_132_ppa-ldo-loa-e-creditos-adicionais-integracao-ppa-of-e-oi"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Créditos Adicionais - Revisão de Conceitos.",
    "details": "Créditos Adicionais - Revisão de Conceitos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 50,
    "notes": "",
    "id": "topic_afo_133_ppa-ldo-loa-e-creditos-adicionais-creditos-adicionais-revisa"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Créditos Adicionais - Fontes.",
    "details": "Créditos Adicionais - Fontes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 51,
    "notes": "",
    "id": "topic_afo_134_ppa-ldo-loa-e-creditos-adicionais-creditos-adicionais-fontes"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Excesso de Arrecadação - Parte 1.",
    "details": "Excesso de Arrecadação - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 52,
    "notes": "",
    "id": "topic_afo_135_ppa-ldo-loa-e-creditos-adicionais-excesso-de-arrecadacao-par"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Excesso de Arrecadação - Parte 2.",
    "details": "Excesso de Arrecadação - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 53,
    "notes": "",
    "id": "topic_afo_136_ppa-ldo-loa-e-creditos-adicionais-excesso-de-arrecadacao-par"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Superávit Financeiro - Parte 1.",
    "details": "Superávit Financeiro - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 54,
    "notes": "",
    "id": "topic_afo_137_ppa-ldo-loa-e-creditos-adicionais-superavit-financeiro-parte"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — Superávit Financeiro - Parte 2.",
    "details": "Superávit Financeiro - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 55,
    "notes": "",
    "id": "topic_afo_138_ppa-ldo-loa-e-creditos-adicionais-superavit-financeiro-parte"
  },
  {
    "disciplineName": "AFO",
    "title": "PPA, LDO, LOA e Créditos Adicionais. — PDF — PPA, LDO, LOA e Créditos Adicionais.",
    "details": "PDF — PPA, LDO, LOA e Créditos Adicionais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 56,
    "notes": "",
    "id": "topic_afo_139_ppa-ldo-loa-e-creditos-adicionais-pdf-ppa-ldo-loa-e-creditos"
  },
  {
    "disciplineName": "AFO",
    "title": "Gestão organizacional das finanças públicas. — Sistema de Planejamento - Noções Gerais.",
    "details": "Sistema de Planejamento - Noções Gerais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 57,
    "notes": "",
    "id": "topic_afo_140_gestao-organizacional-das-financas-publicas-sistema-de-plane"
  },
  {
    "disciplineName": "AFO",
    "title": "Gestão organizacional das finanças públicas. — Sistema de Planejamento - Parte Específica.",
    "details": "Sistema de Planejamento - Parte Específica.",
    "status": "Em espera",
    "priority": "Média",
    "order": 58,
    "notes": "",
    "id": "topic_afo_141_gestao-organizacional-das-financas-publicas-sistema-de-plane"
  },
  {
    "disciplineName": "AFO",
    "title": "Gestão organizacional das finanças públicas. — PDF — Gestão organizacional das finanças públicas.",
    "details": "PDF — Gestão organizacional das finanças públicas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 59,
    "notes": "",
    "id": "topic_afo_142_gestao-organizacional-das-financas-publicas-pdf-gestao-organ"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Ciclo Orçamentário da LOA e Ciclo Ampliado.",
    "details": "Ciclo Orçamentário da LOA e Ciclo Ampliado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 60,
    "notes": "",
    "id": "topic_afo_143_ciclo-orcamentario-ciclo-orcamentario-da-loa-e-ciclo-ampliad"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Elaboração da LOA.",
    "details": "Elaboração da LOA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 61,
    "notes": "",
    "id": "topic_afo_144_ciclo-orcamentario-elaboracao-da-loa"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Aprovação da LOA.",
    "details": "Aprovação da LOA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 62,
    "notes": "",
    "id": "topic_afo_145_ciclo-orcamentario-aprovacao-da-loa"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Emendas Impositivas.",
    "details": "Emendas Impositivas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 63,
    "notes": "",
    "id": "topic_afo_146_ciclo-orcamentario-emendas-impositivas"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Emendas do Relator.",
    "details": "Emendas do Relator.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 64,
    "notes": "",
    "id": "topic_afo_147_ciclo-orcamentario-emendas-do-relator"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Transição da 2ª para 3ª etapa - Parte 1.",
    "details": "Transição da 2ª para 3ª etapa - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 65,
    "notes": "",
    "id": "topic_afo_148_ciclo-orcamentario-transicao-da-2-para-3-etapa-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Transição da 2ª para 3ª etapa - Parte 2.",
    "details": "Transição da 2ª para 3ª etapa - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 66,
    "notes": "",
    "id": "topic_afo_149_ciclo-orcamentario-transicao-da-2-para-3-etapa-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Execução - Parte 1 - Componentes da Programação Financeira.",
    "details": "Execução - Parte 1 - Componentes da Programação Financeira.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 67,
    "notes": "",
    "id": "topic_afo_150_ciclo-orcamentario-execucao-parte-1-componentes-da-programac"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Execução - Parte 2 - Equilíbrio entre ingressos e dispêndios.",
    "details": "Execução - Parte 2 - Equilíbrio entre ingressos e dispêndios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 68,
    "notes": "",
    "id": "topic_afo_151_ciclo-orcamentario-execucao-parte-2-equilibrio-entre-ingress"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Execução - Parte 3 - Procedimento em caso de frustração.",
    "details": "Execução - Parte 3 - Procedimento em caso de frustração.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 69,
    "notes": "",
    "id": "topic_afo_152_ciclo-orcamentario-execucao-parte-3-procedimento-em-caso-de-"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Limitação de empenho para os demais poderes.",
    "details": "Limitação de empenho para os demais poderes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 70,
    "notes": "",
    "id": "topic_afo_153_ciclo-orcamentario-limitacao-de-empenho-para-os-demais-poder"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Execução - Parte 5 - Descentralização de Crédito e de Recurso.",
    "details": "Execução - Parte 5 - Descentralização de Crédito e de Recurso.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 71,
    "notes": "",
    "id": "topic_afo_154_ciclo-orcamentario-execucao-parte-5-descentralizacao-de-cred"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — TED versus Destaque.",
    "details": "TED versus Destaque.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 72,
    "notes": "",
    "id": "topic_afo_155_ciclo-orcamentario-ted-versus-destaque"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Controle e Avaliação - Parte 1 - Principais Atores.",
    "details": "Controle e Avaliação - Parte 1 - Principais Atores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 73,
    "notes": "",
    "id": "topic_afo_156_ciclo-orcamentario-controle-e-avaliacao-parte-1-principais-a"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Controle e Avaliação - Parte 2 - Controles durante a execução orçamentária.",
    "details": "Controle e Avaliação - Parte 2 - Controles durante a execução orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 74,
    "notes": "",
    "id": "topic_afo_157_ciclo-orcamentario-controle-e-avaliacao-parte-2-controles-du"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Controle e Avaliação - Parte 3 - Prestação de Contas.",
    "details": "Controle e Avaliação - Parte 3 - Prestação de Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 75,
    "notes": "",
    "id": "topic_afo_158_ciclo-orcamentario-controle-e-avaliacao-parte-3-prestacao-de"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Vedações ao Ciclo Orçamentário : Absolutas.",
    "details": "Vedações ao Ciclo Orçamentário : Absolutas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 76,
    "notes": "",
    "id": "topic_afo_159_ciclo-orcamentario-vedacoes-ao-ciclo-orcamentario-absolutas"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — Vedações ao Ciclo Orçamentário: Relativas.",
    "details": "Vedações ao Ciclo Orçamentário: Relativas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 77,
    "notes": "",
    "id": "topic_afo_160_ciclo-orcamentario-vedacoes-ao-ciclo-orcamentario-relativas"
  },
  {
    "disciplineName": "AFO",
    "title": "Ciclo Orçamentário. — PDF — Ciclo Orçamentário.",
    "details": "PDF — Ciclo Orçamentário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 78,
    "notes": "",
    "id": "topic_afo_161_ciclo-orcamentario-pdf-ciclo-orcamentario"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Ingressos e Dispêndios Extraorçamentários.",
    "details": "Ingressos e Dispêndios Extraorçamentários.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 79,
    "notes": "",
    "id": "topic_afo_162_receita-classificacoes-e-estagios-ingressos-e-dispendios-ext"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Classificações Gerais da Receita Orçamentária.",
    "details": "Classificações Gerais da Receita Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 80,
    "notes": "",
    "id": "topic_afo_163_receita-classificacoes-e-estagios-classificacoes-gerais-da-r"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 1.",
    "details": "Natureza - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 81,
    "notes": "",
    "id": "topic_afo_164_receita-classificacoes-e-estagios-natureza-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 2.",
    "details": "Natureza - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 82,
    "notes": "",
    "id": "topic_afo_165_receita-classificacoes-e-estagios-natureza-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 3.",
    "details": "Natureza - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 83,
    "notes": "",
    "id": "topic_afo_166_receita-classificacoes-e-estagios-natureza-parte-3"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 4.",
    "details": "Natureza - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 84,
    "notes": "",
    "id": "topic_afo_167_receita-classificacoes-e-estagios-natureza-parte-4"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 5.",
    "details": "Natureza - Parte 5.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 85,
    "notes": "",
    "id": "topic_afo_168_receita-classificacoes-e-estagios-natureza-parte-5"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 6.",
    "details": "Natureza - Parte 6.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 86,
    "notes": "",
    "id": "topic_afo_169_receita-classificacoes-e-estagios-natureza-parte-6"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Natureza - Parte 7.",
    "details": "Natureza - Parte 7.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 87,
    "notes": "",
    "id": "topic_afo_170_receita-classificacoes-e-estagios-natureza-parte-7"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Classificação por Fonte - Parte 1.",
    "details": "Classificação por Fonte - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 88,
    "notes": "",
    "id": "topic_afo_171_receita-classificacoes-e-estagios-classificacao-por-fonte-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Classificação por Fonte - Parte 2.",
    "details": "Classificação por Fonte - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 89,
    "notes": "",
    "id": "topic_afo_172_receita-classificacoes-e-estagios-classificacao-por-fonte-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Esfera Orçamentária.",
    "details": "Esfera Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 90,
    "notes": "",
    "id": "topic_afo_173_receita-classificacoes-e-estagios-esfera-orcamentaria"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Resultado Primário.",
    "details": "Resultado Primário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 91,
    "notes": "",
    "id": "topic_afo_174_receita-classificacoes-e-estagios-resultado-primario"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Impacto no PL.",
    "details": "Impacto no PL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 92,
    "notes": "",
    "id": "topic_afo_175_receita-classificacoes-e-estagios-impacto-no-pl"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Coercitividade.",
    "details": "Coercitividade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 93,
    "notes": "",
    "id": "topic_afo_176_receita-classificacoes-e-estagios-coercitividade"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Regularidade.",
    "details": "Regularidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 94,
    "notes": "",
    "id": "topic_afo_177_receita-classificacoes-e-estagios-regularidade"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Estágios - Parte 1.",
    "details": "Estágios - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 95,
    "notes": "",
    "id": "topic_afo_178_receita-classificacoes-e-estagios-estagios-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — Estágios - Parte 2.",
    "details": "Estágios - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 96,
    "notes": "",
    "id": "topic_afo_179_receita-classificacoes-e-estagios-estagios-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Receita: classificações e estágios. — PDF — Receita: classificações e estágios.",
    "details": "PDF — Receita: classificações e estágios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 97,
    "notes": "",
    "id": "topic_afo_180_receita-classificacoes-e-estagios-pdf-receita-classificacoes"
  },
  {
    "disciplineName": "AFO",
    "title": "Dívida Ativa. — Dívida Ativa Parte 1.",
    "details": "Dívida Ativa Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 98,
    "notes": "",
    "id": "topic_afo_181_divida-ativa-divida-ativa-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Dívida Ativa. — Dívida Ativa Parte 2.",
    "details": "Dívida Ativa Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 99,
    "notes": "",
    "id": "topic_afo_182_divida-ativa-divida-ativa-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Dívida Ativa. — PDF — Dívida Ativa.",
    "details": "PDF — Dívida Ativa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 100,
    "notes": "",
    "id": "topic_afo_183_divida-ativa-pdf-divida-ativa"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — PDF — Despesa: Classificações e Estágios.",
    "details": "PDF — Despesa: Classificações e Estágios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 101,
    "notes": "",
    "id": "topic_afo_184_despesa-classificacoes-e-estagios-pdf-despesa-classificacoes"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Classificações Gerais Oficiais da Despesa Orçamentária.",
    "details": "Classificações Gerais Oficiais da Despesa Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 102,
    "notes": "",
    "id": "topic_afo_185_despesa-classificacoes-e-estagios-classificacoes-gerais-ofic"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Esfera Orçamentária.",
    "details": "Esfera Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 103,
    "notes": "",
    "id": "topic_afo_186_despesa-classificacoes-e-estagios-esfera-orcamentaria"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Institucional.",
    "details": "Institucional.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 104,
    "notes": "",
    "id": "topic_afo_187_despesa-classificacoes-e-estagios-institucional"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Funcional.",
    "details": "Funcional.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 105,
    "notes": "",
    "id": "topic_afo_188_despesa-classificacoes-e-estagios-funcional"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Programática - Parte 1.",
    "details": "Programática - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 106,
    "notes": "",
    "id": "topic_afo_189_despesa-classificacoes-e-estagios-programatica-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Programática - Parte 2.",
    "details": "Programática - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 107,
    "notes": "",
    "id": "topic_afo_190_despesa-classificacoes-e-estagios-programatica-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — IDOC, IDUSO e Fonte.",
    "details": "IDOC, IDUSO e Fonte.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 108,
    "notes": "",
    "id": "topic_afo_191_despesa-classificacoes-e-estagios-idoc-iduso-e-fonte"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Natureza Parte 1.",
    "details": "Natureza Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 109,
    "notes": "",
    "id": "topic_afo_192_despesa-classificacoes-e-estagios-natureza-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Natureza Parte 2.",
    "details": "Natureza Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 110,
    "notes": "",
    "id": "topic_afo_193_despesa-classificacoes-e-estagios-natureza-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Natureza Parte 3 - Operação Intra Orçamentária.",
    "details": "Natureza Parte 3 - Operação Intra Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 111,
    "notes": "",
    "id": "topic_afo_194_despesa-classificacoes-e-estagios-natureza-parte-3-operacao-"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Natureza Parte 4 - Transferências.",
    "details": "Natureza Parte 4 - Transferências.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 112,
    "notes": "",
    "id": "topic_afo_195_despesa-classificacoes-e-estagios-natureza-parte-4-transfere"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Resultado Primário.",
    "details": "Resultado Primário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 113,
    "notes": "",
    "id": "topic_afo_196_despesa-classificacoes-e-estagios-resultado-primario"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Portuguêsaria STN nº 163/2001 versus Lei 4.320/1964.",
    "details": "Portuguêsaria STN nº 163/2001 versus Lei 4.320/1964.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 114,
    "notes": "",
    "id": "topic_afo_197_despesa-classificacoes-e-estagios-portaria-stn-n-163-2001-ve"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Impacto no PL.",
    "details": "Impacto no PL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 115,
    "notes": "",
    "id": "topic_afo_198_despesa-classificacoes-e-estagios-impacto-no-pl"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Estágios de Planejamento da Despesa.",
    "details": "Estágios de Planejamento da Despesa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 116,
    "notes": "",
    "id": "topic_afo_199_despesa-classificacoes-e-estagios-estagios-de-planejamento-d"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Estágios de Execução da Despesa.",
    "details": "Estágios de Execução da Despesa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 117,
    "notes": "",
    "id": "topic_afo_200_despesa-classificacoes-e-estagios-estagios-de-execucao-da-de"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Modalidades de Empenho.",
    "details": "Modalidades de Empenho.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 118,
    "notes": "",
    "id": "topic_afo_201_despesa-classificacoes-e-estagios-modalidades-de-empenho"
  },
  {
    "disciplineName": "AFO",
    "title": "Despesa: Classificações e Estágios. — Uso da Conta.",
    "details": "Uso da Conta.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 119,
    "notes": "",
    "id": "topic_afo_202_despesa-classificacoes-e-estagios-uso-da-conta"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — PDF — Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos.",
    "details": "PDF — Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 120,
    "notes": "",
    "id": "topic_afo_203_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Noções Gerais sobre Restos a Pagar.",
    "details": "Noções Gerais sobre Restos a Pagar.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 121,
    "notes": "",
    "id": "topic_afo_204_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Controles Gerais de RP na LRF.",
    "details": "Controles Gerais de RP na LRF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 122,
    "notes": "",
    "id": "topic_afo_205_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Controles Específicos sobre RP Processados.",
    "details": "Controles Específicos sobre RP Processados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 123,
    "notes": "",
    "id": "topic_afo_206_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Controles Específicos sobre RP Não Processados.",
    "details": "Controles Específicos sobre RP Não Processados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 124,
    "notes": "",
    "id": "topic_afo_207_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Despesas Plurianuais.",
    "details": "Despesas Plurianuais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 125,
    "notes": "",
    "id": "topic_afo_208_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Prescrição, Cancelamento, Reinscrição, Reaproveitamento de RP.",
    "details": "Prescrição, Cancelamento, Reinscrição, Reaproveitamento de RP.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 126,
    "notes": "",
    "id": "topic_afo_209_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Conceitos de DEA.",
    "details": "Conceitos de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 127,
    "notes": "",
    "id": "topic_afo_210_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Caso 1 de DEA.",
    "details": "Caso 1 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 128,
    "notes": "",
    "id": "topic_afo_211_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Caso 2 de DEA.",
    "details": "Caso 2 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 129,
    "notes": "",
    "id": "topic_afo_212_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Caso 3 de DEA.",
    "details": "Caso 3 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 130,
    "notes": "",
    "id": "topic_afo_213_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Conceito e Ciclo do Suprimento de Fundos.",
    "details": "Conceito e Ciclo do Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 131,
    "notes": "",
    "id": "topic_afo_214_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Concessão do Suprimento de Fundos.",
    "details": "Concessão do Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 132,
    "notes": "",
    "id": "topic_afo_215_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Limites do Suprimento de Fundos.",
    "details": "Limites do Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 133,
    "notes": "",
    "id": "topic_afo_216_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Aplicação do SF.",
    "details": "Aplicação do SF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 134,
    "notes": "",
    "id": "topic_afo_217_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Restos a Pagar, Despesas de Exercícios Anteriores e Suprimento de Fundos. — Prestação de Contas do SF.",
    "details": "Prestação de Contas do SF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 135,
    "notes": "",
    "id": "topic_afo_218_restos-a-pagar-despesas-de-exercicios-anteriores-e-supriment"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Base Normativa, EED e Campo de Aplicação.",
    "details": "Base Normativa, EED e Campo de Aplicação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 136,
    "notes": "",
    "id": "topic_afo_219_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Princípios.",
    "details": "Princípios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 137,
    "notes": "",
    "id": "topic_afo_220_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — RCL.",
    "details": "RCL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 138,
    "notes": "",
    "id": "topic_afo_221_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Receita: Previsão e Reestimativa.",
    "details": "Receita: Previsão e Reestimativa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 139,
    "notes": "",
    "id": "topic_afo_222_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Renúncia de Receita.",
    "details": "Renúncia de Receita.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 140,
    "notes": "",
    "id": "topic_afo_223_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas em Geral.",
    "details": "Despesas em Geral.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 141,
    "notes": "",
    "id": "topic_afo_224_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — DOCC.",
    "details": "DOCC.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 142,
    "notes": "",
    "id": "topic_afo_225_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas com Pessoal: Conceitos.",
    "details": "Despesas com Pessoal: Conceitos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 143,
    "notes": "",
    "id": "topic_afo_226_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas com Pessoal: Limites.",
    "details": "Despesas com Pessoal: Limites.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 144,
    "notes": "",
    "id": "topic_afo_227_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites - Parte 1.",
    "details": "Medidas em caso de ultrapassagem dos limites - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 145,
    "notes": "",
    "id": "topic_afo_228_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites - Parte 2.",
    "details": "Medidas em caso de ultrapassagem dos limites - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 146,
    "notes": "",
    "id": "topic_afo_229_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas da Seguridade Social.",
    "details": "Despesas da Seguridade Social.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 147,
    "notes": "",
    "id": "topic_afo_230_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Destinação de recursos para o setor Privado.",
    "details": "Destinação de recursos para o setor Privado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 148,
    "notes": "",
    "id": "topic_afo_231_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Transferências Voluntárias.",
    "details": "Transferências Voluntárias.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 149,
    "notes": "",
    "id": "topic_afo_232_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Gestão Patrimonial.",
    "details": "Gestão Patrimonial.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 150,
    "notes": "",
    "id": "topic_afo_233_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Dívida consolidada : Conceitos.",
    "details": "Dívida consolidada : Conceitos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 151,
    "notes": "",
    "id": "topic_afo_234_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Dívida consolidada líquida.",
    "details": "Dívida consolidada líquida.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 152,
    "notes": "",
    "id": "topic_afo_235_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Dívida Consolidada, Dívida mobiliária, Operação de Crédito: Limites.",
    "details": "Dívida Consolidada, Dívida mobiliária, Operação de Crédito: Limites.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 153,
    "notes": "",
    "id": "topic_afo_236_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites.",
    "details": "Medidas em caso de ultrapassagem dos limites.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 154,
    "notes": "",
    "id": "topic_afo_237_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Flexibilização das Medidas em caso de PIB inferior a 1%.",
    "details": "Flexibilização das Medidas em caso de PIB inferior a 1%.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 155,
    "notes": "",
    "id": "topic_afo_238_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Operações de Crédito: Requisitos e Vedações.",
    "details": "Operações de Crédito: Requisitos e Vedações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 156,
    "notes": "",
    "id": "topic_afo_239_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — ARO : Requisitos e Vedações.",
    "details": "ARO : Requisitos e Vedações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 157,
    "notes": "",
    "id": "topic_afo_240_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Garantias e Contragarantias.",
    "details": "Garantias e Contragarantias.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 158,
    "notes": "",
    "id": "topic_afo_241_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Instrumentos de Transparência.",
    "details": "Instrumentos de Transparência.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 159,
    "notes": "",
    "id": "topic_afo_242_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — RGF versus RREO.",
    "details": "RGF versus RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 160,
    "notes": "",
    "id": "topic_afo_243_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Componentes do RGF.",
    "details": "Componentes do RGF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 161,
    "notes": "",
    "id": "topic_afo_244_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Componentes do RREO.",
    "details": "Componentes do RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 162,
    "notes": "",
    "id": "topic_afo_245_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Escrituração e consolidação.",
    "details": "Escrituração e consolidação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 163,
    "notes": "",
    "id": "topic_afo_246_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Fiscalização.",
    "details": "Fiscalização.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 164,
    "notes": "",
    "id": "topic_afo_247_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Calamidade Pública.",
    "details": "Calamidade Pública.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 165,
    "notes": "",
    "id": "topic_afo_248_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — PDF — Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores.",
    "details": "PDF — Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 166,
    "notes": "",
    "id": "topic_afo_249_lei-complementar-n-101-de-4-de-maio-de-2000-e-alteracoes-pos"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — PDF — Regimes Fiscais permanente, facultativo e extraordinário.",
    "details": "PDF — Regimes Fiscais permanente, facultativo e extraordinário.",
    "status": "Em espera",
    "priority": "Média",
    "order": 167,
    "notes": "",
    "id": "topic_afo_250_regimes-fiscais-permanente-facultativo-e-extraordinario-pdf-"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regimes Fiscais conforme a doutrina.",
    "details": "Regimes Fiscais conforme a doutrina.",
    "status": "Em espera",
    "priority": "Média",
    "order": 168,
    "notes": "",
    "id": "topic_afo_251_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Fiscal Sustentável - Metodologia.",
    "details": "Regime Fiscal Sustentável - Metodologia.",
    "status": "Em espera",
    "priority": "Média",
    "order": 169,
    "notes": "",
    "id": "topic_afo_252_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Fiscal Sustentável - Medidas de Ajuste Fiscal e Gatilhos.",
    "details": "Regime Fiscal Sustentável - Medidas de Ajuste Fiscal e Gatilhos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 170,
    "notes": "",
    "id": "topic_afo_253_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Fiscal Sustentável - Trava Antishutdown e Limite da Responsabilização.",
    "details": "Regime Fiscal Sustentável - Trava Antishutdown e Limite da Responsabilização.",
    "status": "Em espera",
    "priority": "Média",
    "order": 171,
    "notes": "",
    "id": "topic_afo_254_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Fiscal Sustentável - Condições para usar o excesso do Superávit Financeiro.",
    "details": "Regime Fiscal Sustentável - Condições para usar o excesso do Superávit Financeiro.",
    "status": "Em espera",
    "priority": "Média",
    "order": 172,
    "notes": "",
    "id": "topic_afo_255_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Fiscal para Estados e Municípios.",
    "details": "Regime Fiscal para Estados e Municípios.",
    "status": "Em espera",
    "priority": "Média",
    "order": 173,
    "notes": "",
    "id": "topic_afo_256_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Regimes Fiscais permanente, facultativo e extraordinário. — Regime Extraordinário em caso de Calamidade Pública.",
    "details": "Regime Extraordinário em caso de Calamidade Pública.",
    "status": "Em espera",
    "priority": "Média",
    "order": 174,
    "notes": "",
    "id": "topic_afo_257_regimes-fiscais-permanente-facultativo-e-extraordinario-regi"
  },
  {
    "disciplineName": "AFO",
    "title": "Conta Única do Tesouro Nacional. — PDF — Conta Única do Tesouro Nacional.",
    "details": "PDF — Conta Única do Tesouro Nacional.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 175,
    "notes": "",
    "id": "topic_afo_258_conta-unica-do-tesouro-nacional-pdf-conta-unica-do-tesouro-n"
  },
  {
    "disciplineName": "AFO",
    "title": "Conta Única do Tesouro Nacional. — Conta Única - Parte 1.",
    "details": "Conta Única - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 176,
    "notes": "",
    "id": "topic_afo_259_conta-unica-do-tesouro-nacional-conta-unica-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Conta Única do Tesouro Nacional. — Conta Única - Parte 2.",
    "details": "Conta Única - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 177,
    "notes": "",
    "id": "topic_afo_260_conta-unica-do-tesouro-nacional-conta-unica-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Conta Única do Tesouro Nacional. — Conta Única - Parte 3.",
    "details": "Conta Única - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 178,
    "notes": "",
    "id": "topic_afo_261_conta-unica-do-tesouro-nacional-conta-unica-parte-3"
  },
  {
    "disciplineName": "AFO",
    "title": "Intervenção do Estado na Economia. — PDF — Intervenção do Estado na Economia.",
    "details": "PDF — Intervenção do Estado na Economia.",
    "status": "Em espera",
    "priority": "Média",
    "order": 179,
    "notes": "",
    "id": "topic_afo_262_intervencao-do-estado-na-economia-pdf-intervencao-do-estado-"
  },
  {
    "disciplineName": "AFO",
    "title": "Intervenção do Estado na Economia. — Falhas de Mercado - Parte 1.",
    "details": "Falhas de Mercado - Parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 180,
    "notes": "",
    "id": "topic_afo_263_intervencao-do-estado-na-economia-falhas-de-mercado-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Intervenção do Estado na Economia. — Falhas de Mercado - Parte 2.",
    "details": "Falhas de Mercado - Parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 181,
    "notes": "",
    "id": "topic_afo_264_intervencao-do-estado-na-economia-falhas-de-mercado-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Intervenção do Estado na Economia. — Funções Econômicas do Orçamento.",
    "details": "Funções Econômicas do Orçamento.",
    "status": "Em espera",
    "priority": "Média",
    "order": 182,
    "notes": "",
    "id": "topic_afo_265_intervencao-do-estado-na-economia-funcoes-economicas-do-orca"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — PDF — Federalismo Fiscal.",
    "details": "PDF — Federalismo Fiscal.",
    "status": "Em espera",
    "priority": "Média",
    "order": 183,
    "notes": "",
    "id": "topic_afo_266_federalismo-fiscal-pdf-federalismo-fiscal"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — Federalismo Fiscal - parte 1.",
    "details": "Federalismo Fiscal - parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 184,
    "notes": "",
    "id": "topic_afo_267_federalismo-fiscal-federalismo-fiscal-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — Federalismo Fiscal - parte 2.",
    "details": "Federalismo Fiscal - parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 185,
    "notes": "",
    "id": "topic_afo_268_federalismo-fiscal-federalismo-fiscal-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — Federalismo Fiscal - parte 3.",
    "details": "Federalismo Fiscal - parte 3.",
    "status": "Em espera",
    "priority": "Média",
    "order": 186,
    "notes": "",
    "id": "topic_afo_269_federalismo-fiscal-federalismo-fiscal-parte-3"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — Federalismo Fiscal - parte 4.",
    "details": "Federalismo Fiscal - parte 4.",
    "status": "Em espera",
    "priority": "Média",
    "order": 187,
    "notes": "",
    "id": "topic_afo_270_federalismo-fiscal-federalismo-fiscal-parte-4"
  },
  {
    "disciplineName": "AFO",
    "title": "Federalismo Fiscal. — Federalismo Fiscal - parte 5.",
    "details": "Federalismo Fiscal - parte 5.",
    "status": "Em espera",
    "priority": "Média",
    "order": 188,
    "notes": "",
    "id": "topic_afo_271_federalismo-fiscal-federalismo-fiscal-parte-5"
  },
  {
    "disciplineName": "AFO",
    "title": "Fundos Especiais. — PDF — Fundos Especiais.",
    "details": "PDF — Fundos Especiais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 189,
    "notes": "",
    "id": "topic_afo_272_fundos-especiais-pdf-fundos-especiais"
  },
  {
    "disciplineName": "AFO",
    "title": "Fundos Especiais.",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 190,
    "notes": "",
    "id": "topic_afo_273_fundos-especiais"
  },
  {
    "disciplineName": "AFO",
    "title": "Finanças Públicas e Direito Financeiro. — PDF — Finanças Públicas e Direito Financeiro.",
    "details": "PDF — Finanças Públicas e Direito Financeiro.",
    "status": "Em espera",
    "priority": "Média",
    "order": 191,
    "notes": "",
    "id": "topic_afo_274_financas-publicas-e-direito-financeiro-pdf-financas-publicas"
  },
  {
    "disciplineName": "AFO",
    "title": "Finanças Públicas e Direito Financeiro. — Fontes do Direito e Finanças Públicas.",
    "details": "Fontes do Direito e Finanças Públicas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 192,
    "notes": "",
    "id": "topic_afo_275_financas-publicas-e-direito-financeiro-fontes-do-direito-e-f"
  },
  {
    "disciplineName": "AFO",
    "title": "Crédito público. — PDF — Crédito público.",
    "details": "PDF — Crédito público.",
    "status": "Em espera",
    "priority": "Média",
    "order": 193,
    "notes": "",
    "id": "topic_afo_276_credito-publico-pdf-credito-publico"
  },
  {
    "disciplineName": "AFO",
    "title": "Crédito público. — Crédito Público.",
    "details": "Crédito Público.",
    "status": "Em espera",
    "priority": "Média",
    "order": 194,
    "notes": "",
    "id": "topic_afo_277_credito-publico-credito-publico"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — MATERIAL PDF 2026: Precatórios.",
    "details": "MATERIAL PDF 2026: Precatórios.",
    "status": "Em espera",
    "priority": "Média",
    "order": 195,
    "notes": "",
    "id": "topic_afo_278_precatorios-material-pdf-2026-precatorios"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — Precatórios parte 1.",
    "details": "Precatórios parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 196,
    "notes": "",
    "id": "topic_afo_279_precatorios-precatorios-parte-1"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — Aula extra: Precatórios e RPV.",
    "details": "Aula extra: Precatórios e RPV.",
    "status": "Em espera",
    "priority": "Média",
    "order": 197,
    "notes": "",
    "id": "topic_afo_280_precatorios-aula-extra-precatorios-e-rpv"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — Precatórios parte 2.",
    "details": "Precatórios parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 198,
    "notes": "",
    "id": "topic_afo_281_precatorios-precatorios-parte-2"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — Precatórios parte 3.",
    "details": "Precatórios parte 3.",
    "status": "Em espera",
    "priority": "Média",
    "order": 199,
    "notes": "",
    "id": "topic_afo_282_precatorios-precatorios-parte-3"
  },
  {
    "disciplineName": "AFO",
    "title": "Precatórios. — Precatórios parte 4.",
    "details": "Precatórios parte 4.",
    "status": "Em espera",
    "priority": "Média",
    "order": 200,
    "notes": "",
    "id": "topic_afo_283_precatorios-precatorios-parte-4"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — PDF — Sistema Integrado de Administração Financeira (SIAFI)",
    "details": "PDF — Sistema Integrado de Administração Financeira (SIAFI)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 201,
    "notes": "",
    "id": "topic_afo_284_sistema-integrado-de-administracao-financeira-siafi-pdf-sist"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 1.",
    "details": "SIAFI - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 202,
    "notes": "",
    "id": "topic_afo_285_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 2.",
    "details": "SIAFI - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 203,
    "notes": "",
    "id": "topic_afo_286_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 3.",
    "details": "SIAFI - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 204,
    "notes": "",
    "id": "topic_afo_287_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 4.",
    "details": "SIAFI - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 205,
    "notes": "",
    "id": "topic_afo_288_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 5.",
    "details": "SIAFI - Parte 5.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 206,
    "notes": "",
    "id": "topic_afo_289_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Sistema Integrado de Administração Financeira (SIAFI) — SIAFI - Parte 6.",
    "details": "SIAFI - Parte 6.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 207,
    "notes": "",
    "id": "topic_afo_290_sistema-integrado-de-administracao-financeira-siafi-siafi-pa"
  },
  {
    "disciplineName": "AFO",
    "title": "Ordenador de despesas. — PDF — Ordenador de despesas.",
    "details": "PDF — Ordenador de despesas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 208,
    "notes": "",
    "id": "topic_afo_291_ordenador-de-despesas-pdf-ordenador-de-despesas"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Controle Externo — fundamentos — Origens, conceitos e sistemas.",
    "details": "Origens, conceitos e sistemas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_controle-externo_292_controle-externo-fundamentos-origens-conceitos-e-sistemas"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Normas constitucionais — Normas constitucionais sobre o controle externo.",
    "details": "Normas constitucionais sobre o controle externo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_controle-externo_293_normas-constitucionais-normas-constitucionais-sobre-o-contro"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Tribunais de Contas — Funções, natureza jurídica e eficácia das decisões.",
    "details": "Funções, natureza jurídica e eficácia das decisões.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_controle-externo_294_tribunais-de-contas-funcoes-natureza-juridica-e-eficacia-das"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Jurisdição — Jurisdição dos Tribunais de Contas.",
    "details": "Jurisdição dos Tribunais de Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_controle-externo_295_jurisdicao-jurisdicao-dos-tribunais-de-contas"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Competências — Competências infraconstitucionais das Cortes de Contas.",
    "details": "Competências infraconstitucionais das Cortes de Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_controle-externo_296_competencias-competencias-infraconstitucionais-das-cortes-de"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "TCU — Organização do Tribunal de Contas da União.",
    "details": "Organização do Tribunal de Contas da União.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_controle-externo_297_tcu-organizacao-do-tribunal-de-contas-da-uniao"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Processos — Processos e deliberações.",
    "details": "Processos e deliberações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_controle-externo_298_processos-processos-e-deliberacoes"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Processos de Contas — Processos de contas.",
    "details": "Processos de contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_controle-externo_299_processos-de-contas-processos-de-contas"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Tomada de Contas Especial — Tomadas de contas especiais.",
    "details": "Tomadas de contas especiais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_controle-externo_300_tomada-de-contas-especial-tomadas-de-contas-especiais"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Julgamento — Julgamento das contas.",
    "details": "Julgamento das contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_controle-externo_301_julgamento-julgamento-das-contas"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Fiscalização — Fiscalização a cargo do Tribunal de Contas e exercício do controle externo.",
    "details": "Fiscalização a cargo do Tribunal de Contas e exercício do controle externo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_controle-externo_302_fiscalizacao-fiscalizacao-a-cargo-do-tribunal-de-contas-e-ex"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Controle Interno — Controle interno.",
    "details": "Controle interno.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_controle-externo_303_controle-interno-controle-interno"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Defesa e Recursos — Direito de defesa e recursos.",
    "details": "Direito de defesa e recursos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_controle-externo_304_defesa-e-recursos-direito-de-defesa-e-recursos"
  },
  {
    "disciplineName": "Controle Externo",
    "title": "Sanções — Sanções aplicáveis pelos Tribunais de Contas.",
    "details": "Sanções aplicáveis pelos Tribunais de Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_controle-externo_305_sancoes-sancoes-aplicaveis-pelos-tribunais-de-contas"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Planejamento e documentação da auditoria — Planejamento de auditoria. Termos da auditoria. Estratégia global de auditoria. Escopo do trabalho. Documentação da auditoria.",
    "details": "Planejamento de auditoria. Termos da auditoria. Estratégia global de auditoria. Escopo do trabalho. Documentação da auditoria.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_auditoria-governamental_306_planejamento-e-documentacao-da-auditoria-planejamento-de-aud"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Técnicas, procedimentos e evidências — Técnicas e procedimentos: inspeção documental, inspeção física, reexecução, recálculo, observação direta, entrevista/indagação, circularização, conciliação, procedimentos de revisão analítica e cruzamento eletrônico de…",
    "details": "Técnicas e procedimentos: inspeção documental, inspeção física, reexecução, recálculo, observação direta, entrevista/indagação, circularização, conciliação, procedimentos de revisão analítica e cruzamento eletrônico de dados. Suficiência e adequação das evidências.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_auditoria-governamental_307_tecnicas-procedimentos-e-evidencias-tecnicas-e-procedimentos"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Amostragem, supervisão e qualidade — Métodos de amostragem aplicáveis às auditorias: por atributos e por unidade monetária. Supervisão e controle de qualidade.",
    "details": "Métodos de amostragem aplicáveis às auditorias: por atributos e por unidade monetária. Supervisão e controle de qualidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_auditoria-governamental_308_amostragem-supervisao-e-qualidade-metodos-de-amostragem-apli"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Amostragem — Amostragem por atributos e por unidade monetária.",
    "details": "Amostragem por atributos e por unidade monetária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_auditoria-governamental_309_amostragem-amostragem-por-atributos-e-por-unidade-monetaria"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Auditoria governamental e instrumentos de fiscalização — Auditorias de conformidade, financeira e operacional. Conceitos, características e finalidades. Outros instrumentos de fiscalização: levantamento, monitoramento, acompanhamento e inspeção.",
    "details": "Auditorias de conformidade, financeira e operacional. Conceitos, características e finalidades. Outros instrumentos de fiscalização: levantamento, monitoramento, acompanhamento e inspeção.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_auditoria-governamental_310_auditoria-governamental-e-instrumentos-de-fiscalizacao-audit"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Normas da INTOSAI — Auditoria governamental segundo a INTOSAI. Normas internacionais para o exercício profissional da auditoria. Princípios fundamentais de auditoria e código de ética do setor público: ISSAIs 100 e 130.",
    "details": "Auditoria governamental segundo a INTOSAI. Normas internacionais para o exercício profissional da auditoria. Princípios fundamentais de auditoria e código de ética do setor público: ISSAIs 100 e 130.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_auditoria-governamental_311_normas-da-intosai-auditoria-governamental-segundo-a-intosai-"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Normas do TCU e matrizes de auditoria — Normas de Auditoria do TCU — Portuguêsaria-TCU nº 280/2010. Matriz de Planejamento. Matriz de Achados. Matriz de Responsabilização.",
    "details": "Normas de Auditoria do TCU — Portuguêsaria-TCU nº 280/2010. Matriz de Planejamento. Matriz de Achados. Matriz de Responsabilização.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_auditoria-governamental_312_normas-do-tcu-e-matrizes-de-auditoria-normas-de-auditoria-do"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Materialidade e riscos de auditoria — Materialidade. Avaliação dos riscos gerais do trabalho, dos riscos inerentes e de controle. Modelo de risco de auditoria. Respostas do auditor aos riscos gerais do trabalho. Respostas do auditor aos riscos de distorção …",
    "details": "Materialidade. Avaliação dos riscos gerais do trabalho, dos riscos inerentes e de controle. Modelo de risco de auditoria. Respostas do auditor aos riscos gerais do trabalho. Respostas do auditor aos riscos de distorção relevante ou residuais: natureza, época e extensão.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_auditoria-governamental_313_materialidade-e-riscos-de-auditoria-materialidade-avaliacao-"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Controle interno — Técnicas para obtenção do entendimento do objeto e de seu ambiente. Controle interno.",
    "details": "Técnicas para obtenção do entendimento do objeto e de seu ambiente. Controle interno.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_auditoria-governamental_314_controle-interno-tecnicas-para-obtencao-do-entendimento-do-o"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Opinião de auditoria — Tipos de opinião de auditoria em trabalhos de asseguração razoável.",
    "details": "Tipos de opinião de auditoria em trabalhos de asseguração razoável.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_auditoria-governamental_315_opiniao-de-auditoria-tipos-de-opiniao-de-auditoria-em-trabal"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Tomada e prestação de contas — Normas para a tomada e prestação de contas dos administradores e responsáveis da Administração Pública Federal, para fins de julgamento pelo Tribunal de Contas da União. IN-TCU nº 84/2020.",
    "details": "Normas para a tomada e prestação de contas dos administradores e responsáveis da Administração Pública Federal, para fins de julgamento pelo Tribunal de Contas da União. IN-TCU nº 84/2020.",
    "status": "Em espera",
    "priority": "Média",
    "order": 11,
    "notes": "",
    "id": "topic_auditoria-governamental_316_tomada-e-prestacao-de-contas-normas-para-a-tomada-e-prestaca"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Normas do IIA — Normas internacionais para o exercício profissional da auditoria. Normas do IIA.",
    "details": "Normas internacionais para o exercício profissional da auditoria. Normas do IIA.",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_auditoria-governamental_317_normas-do-iia-normas-internacionais-para-o-exercicio-profiss"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Auditoria operacional — Manual de Auditoria Operacional do TCU — MAO.",
    "details": "Manual de Auditoria Operacional do TCU — MAO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_auditoria-governamental_318_auditoria-operacional-manual-de-auditoria-operacional-do-tcu"
  },
  {
    "disciplineName": "Auditoria Governamental",
    "title": "Trabalho de asseguração — Trabalho de asseguração. NBC TA Estrutura Conceitual — Estrutura Conceitual para Trabalhos de Asseguração.",
    "details": "Trabalho de asseguração. NBC TA Estrutura Conceitual — Estrutura Conceitual para Trabalhos de Asseguração.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_auditoria-governamental_319_trabalho-de-asseguracao-trabalho-de-asseguracao-nbc-ta-estru"
  },
  {
    "disciplineName": "TI",
    "title": "Dados — Dados estruturados e não estruturados. Dados abertos. Coleta, tratamento, armazenamento, integração e recuperação de dados.",
    "details": "Dados estruturados e não estruturados. Dados abertos. Coleta, tratamento, armazenamento, integração e recuperação de dados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_ti_320_dados-dados-estruturados-e-nao-estruturados-dados-abertos-co"
  },
  {
    "disciplineName": "TI",
    "title": "Bancos de dados — Bancos de dados relacionais: teoria e implementação. Processamento de transações.",
    "details": "Bancos de dados relacionais: teoria e implementação. Processamento de transações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_ti_321_bancos-de-dados-bancos-de-dados-relacionais-teoria-e-impleme"
  },
  {
    "disciplineName": "TI",
    "title": "SQL — Uso do SQL como DML.",
    "details": "Uso do SQL como DML.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_ti_322_sql-uso-do-sql-como-dml"
  },
  {
    "disciplineName": "TI",
    "title": "SQL — Uso do SQL como DDL.",
    "details": "Uso do SQL como DDL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_ti_323_sql-uso-do-sql-como-ddl"
  },
  {
    "disciplineName": "TI",
    "title": "SQL — Uso do SQL como DCL.",
    "details": "Uso do SQL como DCL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_ti_324_sql-uso-do-sql-como-dcl"
  },
  {
    "disciplineName": "TI",
    "title": "ETL — Processos de ETL.",
    "details": "Processos de ETL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_ti_325_etl-processos-de-etl"
  },
  {
    "disciplineName": "TI",
    "title": "Ciência de dados e mineração de dados — Exploração de dados: conceituação e características. Noções do modelo CRISP-DM. Técnicas para pré-processamento de dados. Técnicas e tarefas de mineração de dados. Classificação. Regras de associação. Análise de agrup…",
    "details": "Exploração de dados: conceituação e características. Noções do modelo CRISP-DM. Técnicas para pré-processamento de dados. Técnicas e tarefas de mineração de dados. Classificação. Regras de associação. Análise de agrupamentos, clusterização. Detecção de anomalias. Modelagem preditiva.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_ti_326_ciencia-de-dados-e-mineracao-de-dados-exploracao-de-dados-co"
  },
  {
    "disciplineName": "TI",
    "title": "Segurança da informação — Confidencialidade, integridade, disponibilidade, autenticidade e não repúdio.",
    "details": "Confidencialidade, integridade, disponibilidade, autenticidade e não repúdio.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_ti_327_seguranca-da-informacao-confidencialidade-integridade-dispon"
  },
  {
    "disciplineName": "TI",
    "title": "Gestão de segurança da informação — Políticas de segurança. Políticas de classificação da informação. Sistemas de gestão de segurança da informação. Tratamento de incidentes de segurança da informação.",
    "details": "Políticas de segurança. Políticas de classificação da informação. Sistemas de gestão de segurança da informação. Tratamento de incidentes de segurança da informação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_ti_328_gestao-de-seguranca-da-informacao-politicas-de-seguranca-pol"
  },
  {
    "disciplineName": "TI",
    "title": "LAI — Lei de Acesso à Informação — Lei nº 12.527/2011: conceitos e aplicação.",
    "details": "Lei de Acesso à Informação — Lei nº 12.527/2011: conceitos e aplicação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_ti_329_lai-lei-de-acesso-a-informacao-lei-n-12-527-2011-conceitos-e"
  },
  {
    "disciplineName": "TI",
    "title": "LGPD — Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais.",
    "details": "Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_ti_330_lgpd-lei-n-13-709-2018-lei-geral-de-protecao-de-dados-pessoa"
  },
  {
    "disciplineName": "TI",
    "title": "Machine Learning — Conceitos de ML: fontes de erro em modelos preditivos, validação e avaliação de modelos preditivos, underfitting, overfitting, técnicas de regularização, otimização de hiperparâmetros, separabilidade de dados e redução da dimensionalidade…",
    "details": "Conceitos de ML: fontes de erro em modelos preditivos, validação e avaliação de modelos preditivos, underfitting, overfitting, técnicas de regularização, otimização de hiperparâmetros, separabilidade de dados e redução da dimensionalidade. Modelos lineares, árvores de decisão, redes neurais feed-forward e classificador Naive Bayes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_ti_331_machine-learning-conceitos-de-ml-fontes-de-erro-em-modelos-p"
  },
  {
    "disciplineName": "TI",
    "title": "Python — Linguagem Python: sintaxe, variáveis, tipos de dados e estruturas de controle de fluxo. Estruturas de dados, funções e arquivos.",
    "details": "Linguagem Python: sintaxe, variáveis, tipos de dados e estruturas de controle de fluxo. Estruturas de dados, funções e arquivos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_ti_332_python-linguagem-python-sintaxe-variaveis-tipos-de-dados-e-e"
  },
  {
    "disciplineName": "TI",
    "title": "Bibliotecas Python — Bibliotecas: NLTK, TensorFlow, Pandas, NumPy, Arrow, Scikit-learn e SciPy.",
    "details": "Bibliotecas: NLTK, TensorFlow, Pandas, NumPy, Arrow, Scikit-learn e SciPy.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_ti_333_bibliotecas-python-bibliotecas-nltk-tensorflow-pandas-numpy-"
  },
  {
    "disciplineName": "TI",
    "title": "Linguagem R — Noções da linguagem R. Sintaxe, tipos de dados, operadores, comandos de repetição, estruturas de dados, gráficos e data frames.",
    "details": "Noções da linguagem R. Sintaxe, tipos de dados, operadores, comandos de repetição, estruturas de dados, gráficos e data frames.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 15,
    "notes": "",
    "id": "topic_ti_334_linguagem-r-nocoes-da-linguagem-r-sintaxe-tipos-de-dados-ope"
  },
  {
    "disciplineName": "TI",
    "title": "Tidyverse",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 16,
    "notes": "",
    "id": "topic_ti_335_tidyverse"
  },
  {
    "disciplineName": "TI",
    "title": "Pareamento de dados — Pareamento de dados, record linkage. Processo e etapas. Classificação. Qualidade de dados pareados. Análise de dados pareados.",
    "details": "Pareamento de dados, record linkage. Processo e etapas. Classificação. Qualidade de dados pareados. Análise de dados pareados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_ti_336_pareamento-de-dados-pareamento-de-dados-record-linkage-proce"
  },
  {
    "disciplineName": "TI",
    "title": "Formatos e tecnologias de dados — XML, JSON e CSV.",
    "details": "XML, JSON e CSV.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_ti_337_formatos-e-tecnologias-de-dados-xml-json-e-csv"
  },
  {
    "disciplineName": "TI",
    "title": "Representação de dados — Representação de dados numéricos, textuais e estruturados. Aritmética computacional. Representação de dados espaciais para georreferenciamento e geossensoriamento.",
    "details": "Representação de dados numéricos, textuais e estruturados. Aritmética computacional. Representação de dados espaciais para georreferenciamento e geossensoriamento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_ti_338_representacao-de-dados-representacao-de-dados-numericos-text"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 01 - Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II). — PDF — Ent…",
    "details": "PDF — Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_cont-publica_339_aula-01-entidades-do-setor-publico-rcpgs-caracteristicas-do-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 01 - Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II). — Conceito …",
    "details": "Conceito de CASP e os RCPGs.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_cont-publica_340_aula-01-entidades-do-setor-publico-rcpgs-caracteristicas-do-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 01 - Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II). — Campo de …",
    "details": "Campo de Aplicação das Normas: Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_cont-publica_341_aula-01-entidades-do-setor-publico-rcpgs-caracteristicas-do-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 01 - Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II). — Ativo e P…",
    "details": "Ativo e Passivo: Conceitos Iniciais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_cont-publica_342_aula-01-entidades-do-setor-publico-rcpgs-caracteristicas-do-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 01 - Entidades do Setor Público, RCPGs, Características do Setor Público, Campo de Aplicação (NBCT SP Estrutura Conceitual). Elementos das Demonstrações Contábeis: Ativo e Passivo (NBCT SP Estrutura Conceitual e MCASP 9ª edição – Parte II). — Bens Públ…",
    "details": "Bens Públicos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_cont-publica_343_aula-01-entidades-do-setor-publico-rcpgs-caracteristicas-do-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 02 - Sistema de Contabilidade Federal. — PDF — Sistema de Contabilidade Federal.",
    "details": "PDF — Sistema de Contabilidade Federal.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_cont-publica_344_aula-02-sistema-de-contabilidade-federal-pdf-sistema-de-cont"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 02 - Sistema de Contabilidade Federal. — Sistema de Contabilidade Federal - Noções.",
    "details": "Sistema de Contabilidade Federal - Noções.",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_cont-publica_345_aula-02-sistema-de-contabilidade-federal-sistema-de-contabil"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — PDF — Receita pública (MCASP Parte I)",
    "details": "PDF — Receita pública (MCASP Parte I)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_cont-publica_346_aula-03-receita-publica-mcasp-parte-i-pdf-receita-publica-mc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Ingressos e Dispêndios Extraorçamentários.",
    "details": "Ingressos e Dispêndios Extraorçamentários.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_cont-publica_347_aula-03-receita-publica-mcasp-parte-i-ingressos-e-dispendios"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Classificações Gerais da Receita Orçamentária.",
    "details": "Classificações Gerais da Receita Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_cont-publica_348_aula-03-receita-publica-mcasp-parte-i-classificacoes-gerais-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 1.",
    "details": "Natureza - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_cont-publica_349_aula-03-receita-publica-mcasp-parte-i-natureza-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 2.",
    "details": "Natureza - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 15,
    "notes": "",
    "id": "topic_cont-publica_350_aula-03-receita-publica-mcasp-parte-i-natureza-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 3.",
    "details": "Natureza - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 16,
    "notes": "",
    "id": "topic_cont-publica_351_aula-03-receita-publica-mcasp-parte-i-natureza-parte-3"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 4.",
    "details": "Natureza - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_cont-publica_352_aula-03-receita-publica-mcasp-parte-i-natureza-parte-4"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 5.",
    "details": "Natureza - Parte 5.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_cont-publica_353_aula-03-receita-publica-mcasp-parte-i-natureza-parte-5"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 6.",
    "details": "Natureza - Parte 6.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_cont-publica_354_aula-03-receita-publica-mcasp-parte-i-natureza-parte-6"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Natureza - Parte 7.",
    "details": "Natureza - Parte 7.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 20,
    "notes": "",
    "id": "topic_cont-publica_355_aula-03-receita-publica-mcasp-parte-i-natureza-parte-7"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Fonte - Parte 1.",
    "details": "Fonte - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 21,
    "notes": "",
    "id": "topic_cont-publica_356_aula-03-receita-publica-mcasp-parte-i-fonte-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Fonte - Parte 2.",
    "details": "Fonte - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 22,
    "notes": "",
    "id": "topic_cont-publica_357_aula-03-receita-publica-mcasp-parte-i-fonte-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Esfera Orçamentária.",
    "details": "Esfera Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 23,
    "notes": "",
    "id": "topic_cont-publica_358_aula-03-receita-publica-mcasp-parte-i-esfera-orcamentaria"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Resultado Primário.",
    "details": "Resultado Primário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 24,
    "notes": "",
    "id": "topic_cont-publica_359_aula-03-receita-publica-mcasp-parte-i-resultado-primario"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Impacto no PL.",
    "details": "Impacto no PL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 25,
    "notes": "",
    "id": "topic_cont-publica_360_aula-03-receita-publica-mcasp-parte-i-impacto-no-pl"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Coercitividade.",
    "details": "Coercitividade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 26,
    "notes": "",
    "id": "topic_cont-publica_361_aula-03-receita-publica-mcasp-parte-i-coercitividade"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Regularidade.",
    "details": "Regularidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 27,
    "notes": "",
    "id": "topic_cont-publica_362_aula-03-receita-publica-mcasp-parte-i-regularidade"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Estágios - Parte 1.",
    "details": "Estágios - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 28,
    "notes": "",
    "id": "topic_cont-publica_363_aula-03-receita-publica-mcasp-parte-i-estagios-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 03 - Receita pública (MCASP Parte I). — Estágios - Parte 2.",
    "details": "Estágios - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 29,
    "notes": "",
    "id": "topic_cont-publica_364_aula-03-receita-publica-mcasp-parte-i-estagios-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — PDF — Despesa pública (MCASP Parte I)",
    "details": "PDF — Despesa pública (MCASP Parte I)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 30,
    "notes": "",
    "id": "topic_cont-publica_365_aula-04-despesa-publica-mcasp-parte-i-pdf-despesa-publica-mc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Classificações Gerais Oficiais da Despesa Orçamentária.",
    "details": "Classificações Gerais Oficiais da Despesa Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 31,
    "notes": "",
    "id": "topic_cont-publica_366_aula-04-despesa-publica-mcasp-parte-i-classificacoes-gerais-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Esfera Orçamentária.",
    "details": "Esfera Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 32,
    "notes": "",
    "id": "topic_cont-publica_367_aula-04-despesa-publica-mcasp-parte-i-esfera-orcamentaria"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Institucional.",
    "details": "Institucional.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 33,
    "notes": "",
    "id": "topic_cont-publica_368_aula-04-despesa-publica-mcasp-parte-i-institucional"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Funcional.",
    "details": "Funcional.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 34,
    "notes": "",
    "id": "topic_cont-publica_369_aula-04-despesa-publica-mcasp-parte-i-funcional"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Programática - Parte 1.",
    "details": "Programática - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 35,
    "notes": "",
    "id": "topic_cont-publica_370_aula-04-despesa-publica-mcasp-parte-i-programatica-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Programática - Parte 2.",
    "details": "Programática - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 36,
    "notes": "",
    "id": "topic_cont-publica_371_aula-04-despesa-publica-mcasp-parte-i-programatica-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — IDOC, IDUSO e Fonte.",
    "details": "IDOC, IDUSO e Fonte.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 37,
    "notes": "",
    "id": "topic_cont-publica_372_aula-04-despesa-publica-mcasp-parte-i-idoc-iduso-e-fonte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Natureza Parte 1.",
    "details": "Natureza Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 38,
    "notes": "",
    "id": "topic_cont-publica_373_aula-04-despesa-publica-mcasp-parte-i-natureza-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Natureza Parte 2.",
    "details": "Natureza Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 39,
    "notes": "",
    "id": "topic_cont-publica_374_aula-04-despesa-publica-mcasp-parte-i-natureza-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Natureza Parte 3 - Operação Intra Orçamentária.",
    "details": "Natureza Parte 3 - Operação Intra Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 40,
    "notes": "",
    "id": "topic_cont-publica_375_aula-04-despesa-publica-mcasp-parte-i-natureza-parte-3-opera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Natureza Parte 4 - Transferências.",
    "details": "Natureza Parte 4 - Transferências.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 41,
    "notes": "",
    "id": "topic_cont-publica_376_aula-04-despesa-publica-mcasp-parte-i-natureza-parte-4-trans"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Resultado Primário.",
    "details": "Resultado Primário.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 42,
    "notes": "",
    "id": "topic_cont-publica_377_aula-04-despesa-publica-mcasp-parte-i-resultado-primario"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Portuguêsaria STN nº 163/2001 versus Lei nº 4.320.",
    "details": "Portuguêsaria STN nº 163/2001 versus Lei nº 4.320.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 43,
    "notes": "",
    "id": "topic_cont-publica_378_aula-04-despesa-publica-mcasp-parte-i-portaria-stn-n-163-200"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Impacto no PL.",
    "details": "Impacto no PL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 44,
    "notes": "",
    "id": "topic_cont-publica_379_aula-04-despesa-publica-mcasp-parte-i-impacto-no-pl"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Estágios de Planejamento da Despesa.",
    "details": "Estágios de Planejamento da Despesa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 45,
    "notes": "",
    "id": "topic_cont-publica_380_aula-04-despesa-publica-mcasp-parte-i-estagios-de-planejamen"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Estágios de Execução da Despesa.",
    "details": "Estágios de Execução da Despesa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 46,
    "notes": "",
    "id": "topic_cont-publica_381_aula-04-despesa-publica-mcasp-parte-i-estagios-de-execucao-d"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Modalidades de Empenho.",
    "details": "Modalidades de Empenho.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 47,
    "notes": "",
    "id": "topic_cont-publica_382_aula-04-despesa-publica-mcasp-parte-i-modalidades-de-empenho"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 04 - Despesa pública (MCASP Parte I). — Uso da Conta.",
    "details": "Uso da Conta.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 48,
    "notes": "",
    "id": "topic_cont-publica_383_aula-04-despesa-publica-mcasp-parte-i-uso-da-conta"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Noções Gerais sobre Restos a Pagar.",
    "details": "Noções Gerais sobre Restos a Pagar.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 49,
    "notes": "",
    "id": "topic_cont-publica_384_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Controles Gerais de RP na LRF.",
    "details": "Controles Gerais de RP na LRF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 50,
    "notes": "",
    "id": "topic_cont-publica_385_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Controles Específicos sobre RP Processados.",
    "details": "Controles Específicos sobre RP Processados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 51,
    "notes": "",
    "id": "topic_cont-publica_386_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Controles Específicos sobre RP Não Processados.",
    "details": "Controles Específicos sobre RP Não Processados.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 52,
    "notes": "",
    "id": "topic_cont-publica_387_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Despesas Plurianuais.",
    "details": "Despesas Plurianuais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 53,
    "notes": "",
    "id": "topic_cont-publica_388_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Prescrição, Cancelamento, Reinscrição, Reaproveitamento de RP.",
    "details": "Prescrição, Cancelamento, Reinscrição, Reaproveitamento de RP.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 54,
    "notes": "",
    "id": "topic_cont-publica_389_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Conceitos de DEA.",
    "details": "Conceitos de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 55,
    "notes": "",
    "id": "topic_cont-publica_390_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Caso 1 de DEA.",
    "details": "Caso 1 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 56,
    "notes": "",
    "id": "topic_cont-publica_391_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Caso 2 de DEA.",
    "details": "Caso 2 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 57,
    "notes": "",
    "id": "topic_cont-publica_392_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Caso 3 de DEA.",
    "details": "Caso 3 de DEA.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 58,
    "notes": "",
    "id": "topic_cont-publica_393_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Conceito e Ciclo do Suprimento de Fundos.",
    "details": "Conceito e Ciclo do Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 59,
    "notes": "",
    "id": "topic_cont-publica_394_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Concessão do SF.",
    "details": "Concessão do SF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 60,
    "notes": "",
    "id": "topic_cont-publica_395_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Suprimento de Fundos - Limites.",
    "details": "Suprimento de Fundos - Limites.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 61,
    "notes": "",
    "id": "topic_cont-publica_396_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Aplicação do SF.",
    "details": "Aplicação do SF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 62,
    "notes": "",
    "id": "topic_cont-publica_397_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — Prestação de Contas do SF.",
    "details": "Prestação de Contas do SF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 63,
    "notes": "",
    "id": "topic_cont-publica_398_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 05 - Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores. — PDF — Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986,…",
    "details": "PDF — Lei nº 4.320, de 17 de março de 1964, e alterações posteriores. Decreto 93.872, de 23 de dezembro de 1986, e alterações posteriores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 64,
    "notes": "",
    "id": "topic_cont-publica_399_aula-05-lei-n-4-320-de-17-de-marco-de-1964-e-alteracoes-post"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 06 - Dos Sistemas até a Natureza das Contas. — Natureza das contas - Parte 1.",
    "details": "Natureza das contas - Parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 65,
    "notes": "",
    "id": "topic_cont-publica_400_aula-06-dos-sistemas-ate-a-natureza-das-contas-natureza-das-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 06 - Dos Sistemas até a Natureza das Contas. — Natureza das contas - Parte 2.",
    "details": "Natureza das contas - Parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 66,
    "notes": "",
    "id": "topic_cont-publica_401_aula-06-dos-sistemas-ate-a-natureza-das-contas-natureza-das-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 06 - Dos Sistemas até a Natureza das Contas. — Natureza das contas - Parte 3.",
    "details": "Natureza das contas - Parte 3.",
    "status": "Em espera",
    "priority": "Média",
    "order": 67,
    "notes": "",
    "id": "topic_cont-publica_402_aula-06-dos-sistemas-ate-a-natureza-das-contas-natureza-das-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 06 - Dos Sistemas até a Natureza das Contas. — PDF — Dos Sistemas até a Natureza das Contas.",
    "details": "PDF — Dos Sistemas até a Natureza das Contas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 68,
    "notes": "",
    "id": "topic_cont-publica_403_aula-06-dos-sistemas-ate-a-natureza-das-contas-pdf-dos-siste"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Dica Suprema.",
    "details": "Transações Contábeis - Dica Suprema.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 69,
    "notes": "",
    "id": "topic_cont-publica_404_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Receitas e Despesas Efetivas.",
    "details": "Transações Contábeis - Receitas e Despesas Efetivas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 70,
    "notes": "",
    "id": "topic_cont-publica_405_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Superveniências e Insubsistências.",
    "details": "Transações Contábeis - Superveniências e Insubsistências.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 71,
    "notes": "",
    "id": "topic_cont-publica_406_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Receitas e Despesas Não Efetivas.",
    "details": "Transações Contábeis - Receitas e Despesas Não Efetivas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 72,
    "notes": "",
    "id": "topic_cont-publica_407_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Casos Especiais, Atos Orçamentários e Extraorçamentários.",
    "details": "Transações Contábeis - Casos Especiais, Atos Orçamentários e Extraorçamentários.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 73,
    "notes": "",
    "id": "topic_cont-publica_408_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Transações Contábeis - Receitas e Despesas EO.",
    "details": "Transações Contábeis - Receitas e Despesas EO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 74,
    "notes": "",
    "id": "topic_cont-publica_409_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — Superveniências e Insubsistências: Divergências.",
    "details": "Superveniências e Insubsistências: Divergências.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 75,
    "notes": "",
    "id": "topic_cont-publica_410_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 07 - Variações Patrimoniais Qualitativas e Quantitativas. — PDF — Variações Patrimoniais Qualitativas e Quantitativas.",
    "details": "PDF — Variações Patrimoniais Qualitativas e Quantitativas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 76,
    "notes": "",
    "id": "topic_cont-publica_411_aula-07-variacoes-patrimoniais-qualitativas-e-quantitativas-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Conceito e Alcance.",
    "details": "Plano de Contas - Conceito e Alcance.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 77,
    "notes": "",
    "id": "topic_cont-publica_412_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Níveis das contas e Classes.",
    "details": "Plano de Contas - Níveis das contas e Classes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 78,
    "notes": "",
    "id": "topic_cont-publica_413_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Atributos das Contas.",
    "details": "Plano de Contas - Atributos das Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 79,
    "notes": "",
    "id": "topic_cont-publica_414_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Consolidação das Contas.",
    "details": "Plano de Contas - Consolidação das Contas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 80,
    "notes": "",
    "id": "topic_cont-publica_415_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Classes 1 e 2.",
    "details": "Plano de Contas - Classes 1 e 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 81,
    "notes": "",
    "id": "topic_cont-publica_416_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Classes 3 e 4.",
    "details": "Plano de Contas - Classes 3 e 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 82,
    "notes": "",
    "id": "topic_cont-publica_417_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Classes 5 e 6.",
    "details": "Plano de Contas - Classes 5 e 6.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 83,
    "notes": "",
    "id": "topic_cont-publica_418_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas - Classes 7 e 8.",
    "details": "Plano de Contas - Classes 7 e 8.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 84,
    "notes": "",
    "id": "topic_cont-publica_419_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — Plano de Contas- Regras de Integridade.",
    "details": "Plano de Contas- Regras de Integridade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 85,
    "notes": "",
    "id": "topic_cont-publica_420_aula-08-plano-de-contas-aplicado-ao-setor-publico-plano-de-c"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — PDF — Plano de Contas Esquematizado.",
    "details": "PDF — Plano de Contas Esquematizado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 86,
    "notes": "",
    "id": "topic_cont-publica_421_aula-08-plano-de-contas-aplicado-ao-setor-publico-pdf-plano-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 08 - Plano de contas aplicado ao setor público. — PDF — Plano de contas aplicado ao setor público.",
    "details": "PDF — Plano de contas aplicado ao setor público.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 87,
    "notes": "",
    "id": "topic_cont-publica_422_aula-08-plano-de-contas-aplicado-ao-setor-publico-pdf-plano-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Informações Contábeis no Setor Público - Visão Geral - Características e Restrições.",
    "details": "Informações Contábeis no Setor Público - Visão Geral - Características e Restrições.",
    "status": "Em espera",
    "priority": "Média",
    "order": 88,
    "notes": "",
    "id": "topic_cont-publica_423_aula-09-caracteristicas-das-informacoes-contabeis-informacoe"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Relevância.",
    "details": "Características das Informações - Relevância.",
    "status": "Em espera",
    "priority": "Média",
    "order": 89,
    "notes": "",
    "id": "topic_cont-publica_424_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Representação Fidedigna.",
    "details": "Características das Informações - Representação Fidedigna.",
    "status": "Em espera",
    "priority": "Média",
    "order": 90,
    "notes": "",
    "id": "topic_cont-publica_425_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Compreensibilidade.",
    "details": "Características das Informações - Compreensibilidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 91,
    "notes": "",
    "id": "topic_cont-publica_426_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Tempestividade.",
    "details": "Características das Informações - Tempestividade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 92,
    "notes": "",
    "id": "topic_cont-publica_427_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Comparabilidade.",
    "details": "Características das Informações - Comparabilidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 93,
    "notes": "",
    "id": "topic_cont-publica_428_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Características das Informações - Verificabilidade.",
    "details": "Características das Informações - Verificabilidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 94,
    "notes": "",
    "id": "topic_cont-publica_429_aula-09-caracteristicas-das-informacoes-contabeis-caracteris"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Restrições às Informações - Materialidade.",
    "details": "Restrições às Informações - Materialidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 95,
    "notes": "",
    "id": "topic_cont-publica_430_aula-09-caracteristicas-das-informacoes-contabeis-restricoes"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Restrições às Informações - Custo benefício.",
    "details": "Restrições às Informações - Custo benefício.",
    "status": "Em espera",
    "priority": "Média",
    "order": 96,
    "notes": "",
    "id": "topic_cont-publica_431_aula-09-caracteristicas-das-informacoes-contabeis-restricoes"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — Restrições às Informações - Equilíbrio.",
    "details": "Restrições às Informações - Equilíbrio.",
    "status": "Em espera",
    "priority": "Média",
    "order": 97,
    "notes": "",
    "id": "topic_cont-publica_432_aula-09-caracteristicas-das-informacoes-contabeis-restricoes"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 09 - Características das informações contábeis. — PDF — Características das informações contábeis.",
    "details": "PDF — Características das informações contábeis.",
    "status": "Em espera",
    "priority": "Média",
    "order": 98,
    "notes": "",
    "id": "topic_cont-publica_433_aula-09-caracteristicas-das-informacoes-contabeis-pdf-caract"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: receitas efetivas e não efetivas.",
    "details": "Operações Típicas: receitas efetivas e não efetivas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 99,
    "notes": "",
    "id": "topic_cont-publica_434_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: receitas que passam pelo lançamento.",
    "details": "Operações Típicas: receitas que passam pelo lançamento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 100,
    "notes": "",
    "id": "topic_cont-publica_435_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: inscrição e arrecadação da dívida ativa.",
    "details": "Operações Típicas: inscrição e arrecadação da dívida ativa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 101,
    "notes": "",
    "id": "topic_cont-publica_436_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Despesa situação 3 - FG da obrigação coincide com a Liquidação.",
    "details": "Operações Típicas: Despesa situação 3 - FG da obrigação coincide com a Liquidação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 102,
    "notes": "",
    "id": "topic_cont-publica_437_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Despesa situação 2 - FG da obrigação antes da Liquidação.",
    "details": "Operações Típicas: Despesa situação 2 - FG da obrigação antes da Liquidação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 103,
    "notes": "",
    "id": "topic_cont-publica_438_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Despesa situação 1 - FG da obrigação antes do Empenho: operações de crédito.",
    "details": "Operações Típicas: Despesa situação 1 - FG da obrigação antes do Empenho: operações de crédito.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 104,
    "notes": "",
    "id": "topic_cont-publica_439_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Despesa situação 1 - FG da obrigação antes do Empenho: pessoal, juros e precatórios.",
    "details": "Operações Típicas: Despesa situação 1 - FG da obrigação antes do Empenho: pessoal, juros e precatórios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 105,
    "notes": "",
    "id": "topic_cont-publica_440_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Movimentação de Crédito.",
    "details": "Operações Típicas: Movimentação de Crédito.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 106,
    "notes": "",
    "id": "topic_cont-publica_441_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Apuração do resultado.",
    "details": "Operações Típicas: Apuração do resultado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 107,
    "notes": "",
    "id": "topic_cont-publica_442_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Depreciação e Impairment.",
    "details": "Operações Típicas: Depreciação e Impairment.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 108,
    "notes": "",
    "id": "topic_cont-publica_443_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Reavaliação.",
    "details": "Operações Típicas: Reavaliação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 109,
    "notes": "",
    "id": "topic_cont-publica_444_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Alienações de Bens com e sem ganho de capital.",
    "details": "Operações Típicas: Alienações de Bens com e sem ganho de capital.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 110,
    "notes": "",
    "id": "topic_cont-publica_445_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: Depósitos e Cauções.",
    "details": "Operações Típicas: Depósitos e Cauções.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 111,
    "notes": "",
    "id": "topic_cont-publica_446_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Operações Típicas: ARO.",
    "details": "Operações Típicas: ARO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 112,
    "notes": "",
    "id": "topic_cont-publica_447_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Doação de Bens.",
    "details": "Doação de Bens.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 113,
    "notes": "",
    "id": "topic_cont-publica_448_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Contratos: assinatura, execução e encerramento.",
    "details": "Contratos: assinatura, execução e encerramento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 114,
    "notes": "",
    "id": "topic_cont-publica_449_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Restos a Pagar Processados: inscrição e pagamento.",
    "details": "Restos a Pagar Processados: inscrição e pagamento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 115,
    "notes": "",
    "id": "topic_cont-publica_450_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Restos a Pagar Não Processados: inscrição, liquidação e pagamento.",
    "details": "Restos a Pagar Não Processados: inscrição, liquidação e pagamento.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 116,
    "notes": "",
    "id": "topic_cont-publica_451_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — Créditos Adicionais: abertura.",
    "details": "Créditos Adicionais: abertura.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 117,
    "notes": "",
    "id": "topic_cont-publica_452_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — PDF — Plano de Contas Esquematizado.",
    "details": "PDF — Plano de Contas Esquematizado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 118,
    "notes": "",
    "id": "topic_cont-publica_453_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 10 - Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV). — PDF — Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV)",
    "details": "PDF — Registros Contábeis de Operações Típicas do Setor Público (MCASP – Parte IV)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 119,
    "notes": "",
    "id": "topic_cont-publica_454_aula-10-registros-contabeis-de-operacoes-tipicas-do-setor-pu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Visão Geral.",
    "details": "Regimes Contábeis - Visão Geral.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 120,
    "notes": "",
    "id": "topic_cont-publica_455_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Receita - VPA antes da Arrecadação.",
    "details": "Regimes Contábeis - Receita - VPA antes da Arrecadação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 121,
    "notes": "",
    "id": "topic_cont-publica_456_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Receita - VPA na Arrecadação.",
    "details": "Regimes Contábeis - Receita - VPA na Arrecadação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 122,
    "notes": "",
    "id": "topic_cont-publica_457_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Receita - VPA após a Arrecadação.",
    "details": "Regimes Contábeis - Receita - VPA após a Arrecadação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 123,
    "notes": "",
    "id": "topic_cont-publica_458_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Despesa - VPD antes do empenho e liquidação.",
    "details": "Regimes Contábeis - Despesa - VPD antes do empenho e liquidação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 124,
    "notes": "",
    "id": "topic_cont-publica_459_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Despesa - VPD na liquidação.",
    "details": "Regimes Contábeis - Despesa - VPD na liquidação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 125,
    "notes": "",
    "id": "topic_cont-publica_460_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Despesa - VPD após empenho e liquidação: Material de Consumo.",
    "details": "Regimes Contábeis - Despesa - VPD após empenho e liquidação: Material de Consumo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 126,
    "notes": "",
    "id": "topic_cont-publica_461_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Despesa - VPD após empenho e liquidação: Prêmio de Seguros.",
    "details": "Regimes Contábeis - Despesa - VPD após empenho e liquidação: Prêmio de Seguros.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 127,
    "notes": "",
    "id": "topic_cont-publica_462_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — Regimes Contábeis - Despesa - VPD após empenho e liquidação: Suprimento de Fundos.",
    "details": "Regimes Contábeis - Despesa - VPD após empenho e liquidação: Suprimento de Fundos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 128,
    "notes": "",
    "id": "topic_cont-publica_463_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 11 - Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP). — PDF — Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentá…",
    "details": "PDF — Receita e despesa sob o enfoque patrimonial (MCASP Parte I e II). Regimes Contábeis: Orçamentário e Patrimonial (Lei nº 4.320/1964; LRF; MCASP)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 129,
    "notes": "",
    "id": "topic_cont-publica_464_aula-11-receita-e-despesa-sob-o-enfoque-patrimonial-mcasp-pa"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 12 - Elementos dos RCPGs à luz da estrutura conceitual. — Elementos das Demonstrações Contábeis - Visão Geral e Ativo.",
    "details": "Elementos das Demonstrações Contábeis - Visão Geral e Ativo.",
    "status": "Em espera",
    "priority": "Média",
    "order": 130,
    "notes": "",
    "id": "topic_cont-publica_465_aula-12-elementos-dos-rcpgs-a-luz-da-estrutura-conceitual-el"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 12 - Elementos dos RCPGs à luz da estrutura conceitual. — Elementos das Demonstrações Contábeis - Passivo.",
    "details": "Elementos das Demonstrações Contábeis - Passivo.",
    "status": "Em espera",
    "priority": "Média",
    "order": 131,
    "notes": "",
    "id": "topic_cont-publica_466_aula-12-elementos-dos-rcpgs-a-luz-da-estrutura-conceitual-el"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 12 - Elementos dos RCPGs à luz da estrutura conceitual. — Elementos das Demonstrações Contábeis - Receita e Despesa.",
    "details": "Elementos das Demonstrações Contábeis - Receita e Despesa.",
    "status": "Em espera",
    "priority": "Média",
    "order": 132,
    "notes": "",
    "id": "topic_cont-publica_467_aula-12-elementos-dos-rcpgs-a-luz-da-estrutura-conceitual-el"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 12 - Elementos dos RCPGs à luz da estrutura conceitual. — Elementos das Demonstrações - Demais Elementos.",
    "details": "Elementos das Demonstrações - Demais Elementos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 133,
    "notes": "",
    "id": "topic_cont-publica_468_aula-12-elementos-dos-rcpgs-a-luz-da-estrutura-conceitual-el"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 12 - Elementos dos RCPGs à luz da estrutura conceitual. — PDF — Elementos dos RCPGs à luz da estrutura conceitual.",
    "details": "PDF — Elementos dos RCPGs à luz da estrutura conceitual.",
    "status": "Em espera",
    "priority": "Média",
    "order": 134,
    "notes": "",
    "id": "topic_cont-publica_469_aula-12-elementos-dos-rcpgs-a-luz-da-estrutura-conceitual-pd"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Visão Geral, Aspectos e Regimes.",
    "details": "Visão Geral, Aspectos e Regimes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 135,
    "notes": "",
    "id": "topic_cont-publica_470_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Orçamentário - Parte 1 - Conceitos.",
    "details": "Balanço Orçamentário - Parte 1 - Conceitos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 136,
    "notes": "",
    "id": "topic_cont-publica_471_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Orçamentário - Parte 2 - Indicadores de Desempenho da Receita e da Despesa.",
    "details": "Balanço Orçamentário - Parte 2 - Indicadores de Desempenho da Receita e da Despesa.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 137,
    "notes": "",
    "id": "topic_cont-publica_472_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Orçamentário - Parte 3 - Indicadores Fiscais.",
    "details": "Balanço Orçamentário - Parte 3 - Indicadores Fiscais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 138,
    "notes": "",
    "id": "topic_cont-publica_473_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Orçamentário - Parte 4 - Impacto dos Créditos Adicionais.",
    "details": "Balanço Orçamentário - Parte 4 - Impacto dos Créditos Adicionais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 139,
    "notes": "",
    "id": "topic_cont-publica_474_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Financeiro - Parte 1 - Estrutura Atual.",
    "details": "Balanço Financeiro - Parte 1 - Estrutura Atual.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 140,
    "notes": "",
    "id": "topic_cont-publica_475_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Financeiro - Parte 2 - Indicadores.",
    "details": "Balanço Financeiro - Parte 2 - Indicadores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 141,
    "notes": "",
    "id": "topic_cont-publica_476_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 13 - Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — PDF — Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V.",
    "details": "PDF — Balanço orçamentário e Balanço financeiro conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 142,
    "notes": "",
    "id": "topic_cont-publica_477_aula-13-balanco-orcamentario-e-balanco-financeiro-conforme-a"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 14 - Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — Balanço Patrimonial - Conceitos e Indicadores.",
    "details": "Balanço Patrimonial - Conceitos e Indicadores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 143,
    "notes": "",
    "id": "topic_cont-publica_478_aula-14-balanco-patrimonial-demonstracao-das-variacoes-patri"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 14 - Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — DVP - Atual - Conceitos e Indicador.",
    "details": "DVP - Atual - Conceitos e Indicador.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 144,
    "notes": "",
    "id": "topic_cont-publica_479_aula-14-balanco-patrimonial-demonstracao-das-variacoes-patri"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 14 - Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — DVP - Antiga - Conceito de Mutações.",
    "details": "DVP - Antiga - Conceito de Mutações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 145,
    "notes": "",
    "id": "topic_cont-publica_480_aula-14-balanco-patrimonial-demonstracao-das-variacoes-patri"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 14 - Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. — PDF — Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP …",
    "details": "PDF — Balanço patrimonial, Demonstração das Variações Patrimoniais conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 146,
    "notes": "",
    "id": "topic_cont-publica_481_aula-14-balanco-patrimonial-demonstracao-das-variacoes-patri"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — DFC - Parte 1 - Conceitos e Indicadores.",
    "details": "DFC - Parte 1 - Conceitos e Indicadores.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 147,
    "notes": "",
    "id": "topic_cont-publica_482_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — DFC - Parte 2 - Particularidades - MCASP 9ª Edição e …",
    "details": "DFC - Parte 2 - Particularidades - MCASP 9ª Edição e mantidas nas edições seguintes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 148,
    "notes": "",
    "id": "topic_cont-publica_483_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — Notas Explicativas parte 2.",
    "details": "Notas Explicativas parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 149,
    "notes": "",
    "id": "topic_cont-publica_484_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — Simulação de Operações Típicas e as DCs.",
    "details": "Simulação de Operações Típicas e as DCs.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 150,
    "notes": "",
    "id": "topic_cont-publica_485_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — DMPL.",
    "details": "DMPL.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 151,
    "notes": "",
    "id": "topic_cont-publica_486_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — Notas Explicativas parte 1.",
    "details": "Notas Explicativas parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 152,
    "notes": "",
    "id": "topic_cont-publica_487_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — DFC - Parte 2 - Particularidades.",
    "details": "DFC - Parte 2 - Particularidades.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 153,
    "notes": "",
    "id": "topic_cont-publica_488_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 15 - Demonstração dos Fluxos de Caixa, Demonstração das Mutações do Patrimônio Líquido conforme a Lei nº 4.320/64 e anexos, conforme o MCASP Parte V. Notas explicativas às demonstrações contábeis. — PDF — Demonstração dos Fluxos de Caixa; Demonstração …",
    "details": "PDF — Demonstração dos Fluxos de Caixa; Demonstração das Mutações do Patrimônio Líquido; Notas explicativas; Política Contábil, Mudança de Estimativa e Retificação de Erro; e Eventos Subsequentes conforme o MCASP Parte V, NBC T SP e Lei 4.320/1964.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 154,
    "notes": "",
    "id": "topic_cont-publica_489_aula-15-demonstracao-dos-fluxos-de-caixa-demonstracao-das-mu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 16 - Consolidação das Demonstrações Contábeis. — PDF — Consolidação das Demonstrações Contábeis.",
    "details": "PDF — Consolidação das Demonstrações Contábeis.",
    "status": "Em espera",
    "priority": "Média",
    "order": 155,
    "notes": "",
    "id": "topic_cont-publica_490_aula-16-consolidacao-das-demonstracoes-contabeis-pdf-consoli"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 17 - Balancete. — Balancete Contábil - Parte 1.",
    "details": "Balancete Contábil - Parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 156,
    "notes": "",
    "id": "topic_cont-publica_491_aula-17-balancete-balancete-contabil-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 17 - Balancete. — Balancete Contábil - Parte 2.",
    "details": "Balancete Contábil - Parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 157,
    "notes": "",
    "id": "topic_cont-publica_492_aula-17-balancete-balancete-contabil-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 17 - Balancete. — Balancete Contábil - Parte 3.",
    "details": "Balancete Contábil - Parte 3.",
    "status": "Em espera",
    "priority": "Média",
    "order": 158,
    "notes": "",
    "id": "topic_cont-publica_493_aula-17-balancete-balancete-contabil-parte-3"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 17 - Balancete. — PDF — Balancete.",
    "details": "PDF — Balancete.",
    "status": "Em espera",
    "priority": "Média",
    "order": 159,
    "notes": "",
    "id": "topic_cont-publica_494_aula-17-balancete-pdf-balancete"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Bases de Mensuraç…",
    "details": "Bases de Mensuração do Ativo.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 160,
    "notes": "",
    "id": "topic_cont-publica_495_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Avaliação Patrimo…",
    "details": "Avaliação Patrimonial: Visão Geral e Lei nº 4.320/1964.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 162,
    "notes": "",
    "id": "topic_cont-publica_496_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Avaliação dos Ele…",
    "details": "Avaliação dos Elementos Patrimoniais: Disponibilidades, Aplicações, Créditos, Obrigações, Provisões.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 163,
    "notes": "",
    "id": "topic_cont-publica_497_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Aspectos Gerais C…",
    "details": "Aspectos Gerais Conceituais: Depreciação, Amortização e Exaustão.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 169,
    "notes": "",
    "id": "topic_cont-publica_498_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Depreciação.",
    "details": "Depreciação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 170,
    "notes": "",
    "id": "topic_cont-publica_499_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Exaustão.",
    "details": "Exaustão.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 171,
    "notes": "",
    "id": "topic_cont-publica_500_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Amortização.",
    "details": "Amortização.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 172,
    "notes": "",
    "id": "topic_cont-publica_501_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Reavaliação: Imob…",
    "details": "Reavaliação: Imobilizado e Intangível.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 173,
    "notes": "",
    "id": "topic_cont-publica_502_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Impairment.",
    "details": "Impairment.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 174,
    "notes": "",
    "id": "topic_cont-publica_503_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Provisão e Passiv…",
    "details": "Provisão e Passivo Contingente.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 175,
    "notes": "",
    "id": "topic_cont-publica_504_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — Ativo Contingente.",
    "details": "Ativo Contingente.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 176,
    "notes": "",
    "id": "topic_cont-publica_505_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 18 - Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões. — PDF — Normas Bras…",
    "details": "PDF — Normas Brasileiras de Contabilidade aplicada ao Setor Público (NBCT SP Estrutura Conceitual, 03, 04, 06, 07, 08, 09, 10, 15). Avaliação de Itens Patrimoniais. Depreciação, Amortização e Exaustão. Estoques. Provisões. Provisões.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 177,
    "notes": "",
    "id": "topic_cont-publica_506_aula-18-normas-brasileiras-de-contabilidade-aplicada-ao-seto"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 1.",
    "details": "SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 178,
    "notes": "",
    "id": "topic_cont-publica_507_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 2.",
    "details": "SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 179,
    "notes": "",
    "id": "topic_cont-publica_508_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 3.",
    "details": "SISTEMA DE CUSTOS NO SETOR PÚBLICO - PARTE 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 180,
    "notes": "",
    "id": "topic_cont-publica_509_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — SISTEMA DE CUSTO NO SETOR PÚBLICO - PARTE 4.",
    "details": "SISTEMA DE CUSTO NO SETOR PÚBLICO - PARTE 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 181,
    "notes": "",
    "id": "topic_cont-publica_510_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — DEMONSTRAÇÃO DE RESULTADO ECONÔMICO.",
    "details": "DEMONSTRAÇÃO DE RESULTADO ECONÔMICO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 182,
    "notes": "",
    "id": "topic_cont-publica_511_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 19 - NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34. — PDF — NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34.",
    "details": "PDF — NBCT 16.11, Sistema de Custos do Governo Federal , Manual de Custos (Portuguêsaria STN nº 518/2018) e NBCT SP 34.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 183,
    "notes": "",
    "id": "topic_cont-publica_512_aula-19-nbct-16-11-sistema-de-custos-do-governo-federal-manu"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 20 - Deduções da Receita Orçamentária. — Dedução da Receita - Parte 1.",
    "details": "Dedução da Receita - Parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 184,
    "notes": "",
    "id": "topic_cont-publica_513_aula-20-deducoes-da-receita-orcamentaria-deducao-da-receita-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 20 - Deduções da Receita Orçamentária. — Dedução da Receita - Parte 2.",
    "details": "Dedução da Receita - Parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 185,
    "notes": "",
    "id": "topic_cont-publica_514_aula-20-deducoes-da-receita-orcamentaria-deducao-da-receita-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 20 - Deduções da Receita Orçamentária. — O Controle da Disponibilidade de Recursos e classificação por fonte, e o Cálculo do SF por Fonte de Recursos.",
    "details": "O Controle da Disponibilidade de Recursos e classificação por fonte, e o Cálculo do SF por Fonte de Recursos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 186,
    "notes": "",
    "id": "topic_cont-publica_515_aula-20-deducoes-da-receita-orcamentaria-o-controle-da-dispo"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 20 - Deduções da Receita Orçamentária. — PDF — Deduções da Receita Orçamentária.",
    "details": "PDF — Deduções da Receita Orçamentária.",
    "status": "Em espera",
    "priority": "Média",
    "order": 187,
    "notes": "",
    "id": "topic_cont-publica_516_aula-20-deducoes-da-receita-orcamentaria-pdf-deducoes-da-rec"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — Receitas de Transações sem contraprestação - Parte 1.",
    "details": "Receitas de Transações sem contraprestação - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 188,
    "notes": "",
    "id": "topic_cont-publica_517_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — Receitas de Transações sem contraprestação - Parte 2.",
    "details": "Receitas de Transações sem contraprestação - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 189,
    "notes": "",
    "id": "topic_cont-publica_518_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — Receitas de Transações sem contraprestação - Parte 3.",
    "details": "Receitas de Transações sem contraprestação - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 190,
    "notes": "",
    "id": "topic_cont-publica_519_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — Receitas de Transações com contraprestação - Parte 1.",
    "details": "Receitas de Transações com contraprestação - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 191,
    "notes": "",
    "id": "topic_cont-publica_520_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — Receitas de Transações com contraprestação - Parte 2.",
    "details": "Receitas de Transações com contraprestação - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 192,
    "notes": "",
    "id": "topic_cont-publica_521_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 21 - Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II). — PDF — Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT…",
    "details": "PDF — Receitas de transações sem contraprestação - NBCT SP 01. Receitas de transações com contraprestação - NBCT SP 02. MCASP – Parte II)",
    "status": "Em espera",
    "priority": "Alta",
    "order": 193,
    "notes": "",
    "id": "topic_cont-publica_522_aula-21-receitas-de-transacoes-sem-contraprestacao-nbct-sp-0"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — PPP - Parte 1.",
    "details": "PPP - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 194,
    "notes": "",
    "id": "topic_cont-publica_523_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — PPP - Parte 2.",
    "details": "PPP - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 195,
    "notes": "",
    "id": "topic_cont-publica_524_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Operações de Crédito.",
    "details": "Operações de Crédito.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 196,
    "notes": "",
    "id": "topic_cont-publica_525_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Custo dos Empréstimos - Parte 1.",
    "details": "Custo dos Empréstimos - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 197,
    "notes": "",
    "id": "topic_cont-publica_526_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Custo dos Empréstimos - Parte 2.",
    "details": "Custo dos Empréstimos - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 198,
    "notes": "",
    "id": "topic_cont-publica_527_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Dívida Ativa - Parte 1.",
    "details": "Dívida Ativa - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 199,
    "notes": "",
    "id": "topic_cont-publica_528_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Dívida Ativa - Parte 2.",
    "details": "Dívida Ativa - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 200,
    "notes": "",
    "id": "topic_cont-publica_529_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — Dívida Ativa - Parte 3.",
    "details": "Dívida Ativa - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 201,
    "notes": "",
    "id": "topic_cont-publica_530_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 22 - Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14. — PDF — Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos…",
    "details": "PDF — Procedimentos Contábeis Específicos: parcerias público-privadas, operações de créditos, custo dos empréstimos, dívida ativa. NBCT SP 05 e 14.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 202,
    "notes": "",
    "id": "topic_cont-publica_531_aula-22-procedimentos-contabeis-especificos-parcerias-public"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — FUNDEB.",
    "details": "FUNDEB.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 203,
    "notes": "",
    "id": "topic_cont-publica_532_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Regimes Previdenciários - Parte 1.",
    "details": "Regimes Previdenciários - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 204,
    "notes": "",
    "id": "topic_cont-publica_533_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Regimes Previdenciários - Parte 2.",
    "details": "Regimes Previdenciários - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 205,
    "notes": "",
    "id": "topic_cont-publica_534_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Regimes Previdenciários - Parte 3.",
    "details": "Regimes Previdenciários - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 206,
    "notes": "",
    "id": "topic_cont-publica_535_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Regimes Previdenciários - Parte 4.",
    "details": "Regimes Previdenciários - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 207,
    "notes": "",
    "id": "topic_cont-publica_536_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Precatórios - Parte 1.",
    "details": "Precatórios - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 208,
    "notes": "",
    "id": "topic_cont-publica_537_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Precatórios - Parte 2.",
    "details": "Precatórios - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 209,
    "notes": "",
    "id": "topic_cont-publica_538_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — Consórcios.",
    "details": "Consórcios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 210,
    "notes": "",
    "id": "topic_cont-publica_539_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 23 - Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15. — PDF — Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15.",
    "details": "PDF — Procedimentos Contábeis Específicos: FUNDEB, regime próprio de previdência social, precatórios e consórcios. NBCT SP 15.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 211,
    "notes": "",
    "id": "topic_cont-publica_540_aula-23-procedimentos-contabeis-especificos-fundeb-regime-pr"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 1.",
    "details": "SIAFI - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 212,
    "notes": "",
    "id": "topic_cont-publica_541_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 2.",
    "details": "SIAFI - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 213,
    "notes": "",
    "id": "topic_cont-publica_542_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 3.",
    "details": "SIAFI - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 214,
    "notes": "",
    "id": "topic_cont-publica_543_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 4.",
    "details": "SIAFI - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 215,
    "notes": "",
    "id": "topic_cont-publica_544_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 5.",
    "details": "SIAFI - Parte 5.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 216,
    "notes": "",
    "id": "topic_cont-publica_545_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — SIAFI - Parte 6.",
    "details": "SIAFI - Parte 6.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 217,
    "notes": "",
    "id": "topic_cont-publica_546_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 24 - Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil. — PDF — Sistema Integrado de Administ…",
    "details": "PDF — Sistema Integrado de Administração Financeira (SIAFI). Conceitos básicos. Objetivos. Características. Instrumentos de Segurança. Principais documentos de entrada. Conformidade de Registro de Gestão e Contábil.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 218,
    "notes": "",
    "id": "topic_cont-publica_547_aula-24-sistema-integrado-de-administracao-financeira-siafi-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 25 - Tabela de Eventos. — Tabela de Eventos - Parte 1.",
    "details": "Tabela de Eventos - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 219,
    "notes": "",
    "id": "topic_cont-publica_548_aula-25-tabela-de-eventos-tabela-de-eventos-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 25 - Tabela de Eventos. — Tabela de Eventos - Parte 2.",
    "details": "Tabela de Eventos - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 220,
    "notes": "",
    "id": "topic_cont-publica_549_aula-25-tabela-de-eventos-tabela-de-eventos-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 25 - Tabela de Eventos. — Tabela de Eventos - Parte 3.",
    "details": "Tabela de Eventos - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 221,
    "notes": "",
    "id": "topic_cont-publica_550_aula-25-tabela-de-eventos-tabela-de-eventos-parte-3"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 25 - Tabela de Eventos. — Tabela de Eventos - Parte 4.",
    "details": "Tabela de Eventos - Parte 4.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 222,
    "notes": "",
    "id": "topic_cont-publica_551_aula-25-tabela-de-eventos-tabela-de-eventos-parte-4"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 25 - Tabela de Eventos. — PDF — Tabela de Eventos.",
    "details": "PDF — Tabela de Eventos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 223,
    "notes": "",
    "id": "topic_cont-publica_552_aula-25-tabela-de-eventos-pdf-tabela-de-eventos"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 26 - Conta Única. — Conta Única - Parte 1.",
    "details": "Conta Única - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 224,
    "notes": "",
    "id": "topic_cont-publica_553_aula-26-conta-unica-conta-unica-parte-1"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 26 - Conta Única. — Conta Única - Parte 2.",
    "details": "Conta Única - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 225,
    "notes": "",
    "id": "topic_cont-publica_554_aula-26-conta-unica-conta-unica-parte-2"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 26 - Conta Única. — Conta Única - Parte 3.",
    "details": "Conta Única - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 226,
    "notes": "",
    "id": "topic_cont-publica_555_aula-26-conta-unica-conta-unica-parte-3"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 26 - Conta Única. — PDF — Conta Única.",
    "details": "PDF — Conta Única.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 227,
    "notes": "",
    "id": "topic_cont-publica_556_aula-26-conta-unica-pdf-conta-unica"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 1 - Conceitos, Objetivos e Tipos.",
    "details": "Inventário parte 1 - Conceitos, Objetivos e Tipos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 228,
    "notes": "",
    "id": "topic_cont-publica_557_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 2 - Formas e Modalidades de Gestão do Material.",
    "details": "Inventário parte 2 - Formas e Modalidades de Gestão do Material.",
    "status": "Em espera",
    "priority": "Média",
    "order": 229,
    "notes": "",
    "id": "topic_cont-publica_558_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 3 - Formas de Desfazimento.",
    "details": "Inventário parte 3 - Formas de Desfazimento.",
    "status": "Em espera",
    "priority": "Média",
    "order": 230,
    "notes": "",
    "id": "topic_cont-publica_559_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 4 - Alienação e Doação.",
    "details": "Inventário parte 4 - Alienação e Doação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 231,
    "notes": "",
    "id": "topic_cont-publica_560_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 5 - Material de Consumo e Permanente - Critérios.",
    "details": "Inventário parte 5 - Material de Consumo e Permanente - Critérios.",
    "status": "Em espera",
    "priority": "Média",
    "order": 232,
    "notes": "",
    "id": "topic_cont-publica_561_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 6 - Material de Consumo e Permanente - Casos Especiais.",
    "details": "Inventário parte 6 - Material de Consumo e Permanente - Casos Especiais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 233,
    "notes": "",
    "id": "topic_cont-publica_562_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — Inventário parte 7 - Fases e Princípios.",
    "details": "Inventário parte 7 - Fases e Princípios.",
    "status": "Em espera",
    "priority": "Média",
    "order": 234,
    "notes": "",
    "id": "topic_cont-publica_563_aula-27-inventario-na-administracao-publica-inventario-parte"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 27 - Inventário na Administração Pública. — PDF — Inventário na Administração Pública.",
    "details": "PDF — Inventário na Administração Pública.",
    "status": "Em espera",
    "priority": "Média",
    "order": 235,
    "notes": "",
    "id": "topic_cont-publica_564_aula-27-inventario-na-administracao-publica-pdf-inventario-n"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Base Normativa , EED e Campo de Aplicação.",
    "details": "Base Normativa , EED e Campo de Aplicação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 236,
    "notes": "",
    "id": "topic_cont-publica_565_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Princípios.",
    "details": "Princípios.",
    "status": "Em espera",
    "priority": "Média",
    "order": 237,
    "notes": "",
    "id": "topic_cont-publica_566_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — RCL.",
    "details": "RCL.",
    "status": "Em espera",
    "priority": "Média",
    "order": 238,
    "notes": "",
    "id": "topic_cont-publica_567_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Receita: Previsão e Reestimativa.",
    "details": "Receita: Previsão e Reestimativa.",
    "status": "Em espera",
    "priority": "Média",
    "order": 239,
    "notes": "",
    "id": "topic_cont-publica_568_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Renúncia de Receita.",
    "details": "Renúncia de Receita.",
    "status": "Em espera",
    "priority": "Média",
    "order": 240,
    "notes": "",
    "id": "topic_cont-publica_569_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas em Geral.",
    "details": "Despesas em Geral.",
    "status": "Em espera",
    "priority": "Média",
    "order": 241,
    "notes": "",
    "id": "topic_cont-publica_570_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — DOCC.",
    "details": "DOCC.",
    "status": "Em espera",
    "priority": "Média",
    "order": 242,
    "notes": "",
    "id": "topic_cont-publica_571_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas com Pessoal: Conceitos.",
    "details": "Despesas com Pessoal: Conceitos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 243,
    "notes": "",
    "id": "topic_cont-publica_572_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas com Pessoal: Limites.",
    "details": "Despesas com Pessoal: Limites.",
    "status": "Em espera",
    "priority": "Média",
    "order": 244,
    "notes": "",
    "id": "topic_cont-publica_573_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites - Parte 1.",
    "details": "Medidas em caso de ultrapassagem dos limites - Parte 1.",
    "status": "Em espera",
    "priority": "Média",
    "order": 245,
    "notes": "",
    "id": "topic_cont-publica_574_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites - Parte 2.",
    "details": "Medidas em caso de ultrapassagem dos limites - Parte 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 246,
    "notes": "",
    "id": "topic_cont-publica_575_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Despesas da Seguridade Social.",
    "details": "Despesas da Seguridade Social.",
    "status": "Em espera",
    "priority": "Média",
    "order": 247,
    "notes": "",
    "id": "topic_cont-publica_576_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Destinação de recursos para o setor Privado.",
    "details": "Destinação de recursos para o setor Privado.",
    "status": "Em espera",
    "priority": "Média",
    "order": 248,
    "notes": "",
    "id": "topic_cont-publica_577_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Transferências Voluntárias.",
    "details": "Transferências Voluntárias.",
    "status": "Em espera",
    "priority": "Média",
    "order": 249,
    "notes": "",
    "id": "topic_cont-publica_578_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Gestão Patrimonial.",
    "details": "Gestão Patrimonial.",
    "status": "Em espera",
    "priority": "Média",
    "order": 250,
    "notes": "",
    "id": "topic_cont-publica_579_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Dívida consolidada : Conceitos.",
    "details": "Dívida consolidada : Conceitos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 251,
    "notes": "",
    "id": "topic_cont-publica_580_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Divida consolidada líquida.",
    "details": "Divida consolidada líquida.",
    "status": "Em espera",
    "priority": "Média",
    "order": 252,
    "notes": "",
    "id": "topic_cont-publica_581_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Divida Consolidada, Divida mobiliária, Operação de Crédito: Limites.",
    "details": "Divida Consolidada, Divida mobiliária, Operação de Crédito: Limites.",
    "status": "Em espera",
    "priority": "Média",
    "order": 253,
    "notes": "",
    "id": "topic_cont-publica_582_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Medidas em caso de ultrapassagem dos limites.",
    "details": "Medidas em caso de ultrapassagem dos limites.",
    "status": "Em espera",
    "priority": "Média",
    "order": 254,
    "notes": "",
    "id": "topic_cont-publica_583_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Flexibilização das Medidas em caso de PIB inferior a 1%.",
    "details": "Flexibilização das Medidas em caso de PIB inferior a 1%.",
    "status": "Em espera",
    "priority": "Média",
    "order": 255,
    "notes": "",
    "id": "topic_cont-publica_584_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Operações de Crédito: Requisitos e Vedações.",
    "details": "Operações de Crédito: Requisitos e Vedações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 256,
    "notes": "",
    "id": "topic_cont-publica_585_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — ARO : Requisitos e Vedações.",
    "details": "ARO : Requisitos e Vedações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 257,
    "notes": "",
    "id": "topic_cont-publica_586_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Garantias e Contragarantias.",
    "details": "Garantias e Contragarantias.",
    "status": "Em espera",
    "priority": "Média",
    "order": 258,
    "notes": "",
    "id": "topic_cont-publica_587_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Instrumentos de Transparência.",
    "details": "Instrumentos de Transparência.",
    "status": "Em espera",
    "priority": "Média",
    "order": 259,
    "notes": "",
    "id": "topic_cont-publica_588_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — RGF versus RREO.",
    "details": "RGF versus RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 260,
    "notes": "",
    "id": "topic_cont-publica_589_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Componentes do RGF.",
    "details": "Componentes do RGF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 261,
    "notes": "",
    "id": "topic_cont-publica_590_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Componentes do RREO.",
    "details": "Componentes do RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 262,
    "notes": "",
    "id": "topic_cont-publica_591_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Escrituração e consolidação.",
    "details": "Escrituração e consolidação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 263,
    "notes": "",
    "id": "topic_cont-publica_592_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Fiscalização.",
    "details": "Fiscalização.",
    "status": "Em espera",
    "priority": "Média",
    "order": 264,
    "notes": "",
    "id": "topic_cont-publica_593_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — Calamidade Pública.",
    "details": "Calamidade Pública.",
    "status": "Em espera",
    "priority": "Média",
    "order": 265,
    "notes": "",
    "id": "topic_cont-publica_594_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 28 - Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores. — PDF — Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores.",
    "details": "PDF — Lei Complementar nº 101, de 4 de maio de 2000, e alterações posteriores.",
    "status": "Em espera",
    "priority": "Média",
    "order": 266,
    "notes": "",
    "id": "topic_cont-publica_595_aula-28-lei-complementar-n-101-de-4-de-maio-de-2000-e-altera"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — Visão Geral dos Demonstrativos Fiscais.",
    "details": "Visão Geral dos Demonstrativos Fiscais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 267,
    "notes": "",
    "id": "topic_cont-publica_596_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — Instrumentos de Transparência.",
    "details": "Instrumentos de Transparência.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 268,
    "notes": "",
    "id": "topic_cont-publica_597_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RGF versus RREO.",
    "details": "RGF versus RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 269,
    "notes": "",
    "id": "topic_cont-publica_598_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — Componentes do RGF.",
    "details": "Componentes do RGF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 270,
    "notes": "",
    "id": "topic_cont-publica_599_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — Componentes do RREO.",
    "details": "Componentes do RREO.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 271,
    "notes": "",
    "id": "topic_cont-publica_600_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RGF - Parte 1.",
    "details": "RGF - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 272,
    "notes": "",
    "id": "topic_cont-publica_601_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RGF - Parte 2.",
    "details": "RGF - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 273,
    "notes": "",
    "id": "topic_cont-publica_602_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RREO - Parte 1.",
    "details": "RREO - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 274,
    "notes": "",
    "id": "topic_cont-publica_603_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RREO - Parte 2.",
    "details": "RREO - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 275,
    "notes": "",
    "id": "topic_cont-publica_604_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — RREO - Parte 3.",
    "details": "RREO - Parte 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 276,
    "notes": "",
    "id": "topic_cont-publica_605_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 29 - Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária. — PDF — Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária.",
    "details": "PDF — Manual de Demonstrativos fiscais: Relatório de Gestão Fiscal e Relatório Resumido de Execução Orçamentária.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 277,
    "notes": "",
    "id": "topic_cont-publica_606_aula-29-manual-de-demonstrativos-fiscais-relatorio-de-gestao"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — LDO - AMF - Parte 1.",
    "details": "LDO - AMF - Parte 1.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 278,
    "notes": "",
    "id": "topic_cont-publica_607_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — LDO - AMF - Parte 2.",
    "details": "LDO - AMF - Parte 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 279,
    "notes": "",
    "id": "topic_cont-publica_608_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — LDO - ARF.",
    "details": "LDO - ARF.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 280,
    "notes": "",
    "id": "topic_cont-publica_609_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — AMF pelo Manual de Demonstrativos Fiscais.",
    "details": "AMF pelo Manual de Demonstrativos Fiscais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 281,
    "notes": "",
    "id": "topic_cont-publica_610_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — ARF pelo Manual de Demonstrativos Fiscais.",
    "details": "ARF pelo Manual de Demonstrativos Fiscais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 282,
    "notes": "",
    "id": "topic_cont-publica_611_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — LDO - Anexos.",
    "details": "LDO - Anexos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 283,
    "notes": "",
    "id": "topic_cont-publica_612_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 30 - Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais. — PDF — Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais.",
    "details": "PDF — Manual de Demonstrativos fiscais: Anexo de Metas Fiscais e Anexo de Riscos Fiscais.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 284,
    "notes": "",
    "id": "topic_cont-publica_613_aula-30-manual-de-demonstrativos-fiscais-anexo-de-metas-fisc"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 31 - Prestação de Contas. — Prestação de Contas.",
    "details": "Prestação de Contas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 285,
    "notes": "",
    "id": "topic_cont-publica_614_aula-31-prestacao-de-contas-prestacao-de-contas"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 31 - Prestação de Contas. — PDF — Prestação de Contas.",
    "details": "PDF — Prestação de Contas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 286,
    "notes": "",
    "id": "topic_cont-publica_615_aula-31-prestacao-de-contas-pdf-prestacao-de-contas"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 32 - Princípios de contabilidade sob a perspectiva do setor público. — Princípios Contábeis.",
    "details": "Princípios Contábeis.",
    "status": "Em espera",
    "priority": "Média",
    "order": 287,
    "notes": "",
    "id": "topic_cont-publica_616_aula-32-principios-de-contabilidade-sob-a-perspectiva-do-set"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 32 - Princípios de contabilidade sob a perspectiva do setor público. — PDF — Princípios de contabilidade sob a perspectiva do setor público.",
    "details": "PDF — Princípios de contabilidade sob a perspectiva do setor público.",
    "status": "Em espera",
    "priority": "Média",
    "order": 288,
    "notes": "",
    "id": "topic_cont-publica_617_aula-32-principios-de-contabilidade-sob-a-perspectiva-do-set"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 33 - Normas Internacionais de Contabilidade Aplicadas ao Setor Público (IPSAS) — PDF — Slides Completos IPSAS.",
    "details": "PDF — Slides Completos IPSAS.",
    "status": "Em espera",
    "priority": "Média",
    "order": 289,
    "notes": "",
    "id": "topic_cont-publica_618_aula-33-normas-internacionais-de-contabilidade-aplicadas-ao-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 33 - Normas Internacionais de Contabilidade Aplicadas ao Setor Público (IPSAS) — Vídeo — IPSAS.",
    "details": "Vídeo — IPSAS.",
    "status": "Em espera",
    "priority": "Média",
    "order": 290,
    "notes": "",
    "id": "topic_cont-publica_619_aula-33-normas-internacionais-de-contabilidade-aplicadas-ao-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 34 - Trabalho de asseguração (NBC TA Estrutura Conceitual - Estrutura Conceitual para Trabalhos de Asseguração) — Slides — Trabalho de Asseguração.",
    "details": "Slides — Trabalho de Asseguração.",
    "status": "Em espera",
    "priority": "Média",
    "order": 291,
    "notes": "",
    "id": "topic_cont-publica_620_aula-34-trabalho-de-asseguracao-nbc-ta-estrutura-conceitual-"
  },
  {
    "disciplineName": "Cont. Pública",
    "title": "Aula 34 - Trabalho de asseguração (NBC TA Estrutura Conceitual - Estrutura Conceitual para Trabalhos de Asseguração) — Vídeo — Trabalho de Asseguração.",
    "details": "Vídeo — Trabalho de Asseguração.",
    "status": "Em espera",
    "priority": "Média",
    "order": 292,
    "notes": "",
    "id": "topic_cont-publica_621_aula-34-trabalho-de-asseguracao-nbc-ta-estrutura-conceitual-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estatística Descritiva — Média, moda e mediana — teoria, partes 1 e 2.",
    "details": "Média, moda e mediana — teoria, partes 1 e 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_estatistica-cespe_622_estatistica-descritiva-media-moda-e-mediana-teoria-partes-1-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estatística Descritiva — Média, moda e mediana — exercícios.",
    "details": "Média, moda e mediana — exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_estatistica-cespe_623_estatistica-descritiva-media-moda-e-mediana-exercicios"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estatística Descritiva — Medidas de dispersão, assimetria e curtose — teoria e exercícios, partes 1, 2 e 3.",
    "details": "Medidas de dispersão, assimetria e curtose — teoria e exercícios, partes 1, 2 e 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_estatistica-cespe_624_estatistica-descritiva-medidas-de-dispersao-assimetria-e-cur"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estatística Descritiva — Estatística Descritiva — partes 1 e 2.",
    "details": "Estatística Descritiva — partes 1 e 2.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_estatistica-cespe_625_estatistica-descritiva-estatistica-descritiva-partes-1-e-2"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Variáveis aleatórias — Variáveis aleatórias — teoria e exercícios.",
    "details": "Variáveis aleatórias — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_estatistica-cespe_626_variaveis-aleatorias-variaveis-aleatorias-teoria-e-exercicio"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições discretas — Distribuições discretas: Bernoulli, Binomial e Poisson — teoria, partes 1, 2 e 3.",
    "details": "Distribuições discretas: Bernoulli, Binomial e Poisson — teoria, partes 1, 2 e 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_estatistica-cespe_627_distribuicoes-discretas-distribuicoes-discretas-bernoulli-bi"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições discretas — Distribuições discretas: Bernoulli, Binomial e Poisson — exercícios.",
    "details": "Distribuições discretas: Bernoulli, Binomial e Poisson — exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_estatistica-cespe_628_distribuicoes-discretas-distribuicoes-discretas-bernoulli-bi"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições discretas — Distribuições discretas: Geométrica e Hipergeométrica — teoria e exercícios, partes 1, 2 e 3.",
    "details": "Distribuições discretas: Geométrica e Hipergeométrica — teoria e exercícios, partes 1, 2 e 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_estatistica-cespe_629_distribuicoes-discretas-distribuicoes-discretas-geometrica-e"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições discretas — Variáveis e distribuições discretas.",
    "details": "Variáveis e distribuições discretas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_estatistica-cespe_630_distribuicoes-discretas-variaveis-e-distribuicoes-discretas"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições contínuas — Distribuições contínuas: Uniforme, Exponencial e Laplace.",
    "details": "Distribuições contínuas: Uniforme, Exponencial e Laplace.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 10,
    "notes": "",
    "id": "topic_estatistica-cespe_631_distribuicoes-continuas-distribuicoes-continuas-uniforme-exp"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições contínuas — Distribuições contínuas: Uniforme, Exponencial e Laplace — exercícios.",
    "details": "Distribuições contínuas: Uniforme, Exponencial e Laplace — exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_estatistica-cespe_632_distribuicoes-continuas-distribuicoes-continuas-uniforme-exp"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições contínuas — Distribuições contínuas: Normal, Qui-quadrado e T-Student — teoria e exercícios.",
    "details": "Distribuições contínuas: Normal, Qui-quadrado e T-Student — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_estatistica-cespe_633_distribuicoes-continuas-distribuicoes-continuas-normal-qui-q"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições contínuas",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_estatistica-cespe_634_distribuicoes-continuas"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Amostragem — Técnicas de amostragem — teoria e exercícios.",
    "details": "Técnicas de amostragem — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_estatistica-cespe_635_amostragem-tecnicas-de-amostragem-teoria-e-exercicios"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Amostragem — Técnicas de amostragem.",
    "details": "Técnicas de amostragem.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 15,
    "notes": "",
    "id": "topic_estatistica-cespe_636_amostragem-tecnicas-de-amostragem"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições amostrais — Distribuição amostral da média e da proporção — teoria, partes 1, 2 e 3.",
    "details": "Distribuição amostral da média e da proporção — teoria, partes 1, 2 e 3.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 16,
    "notes": "",
    "id": "topic_estatistica-cespe_637_distribuicoes-amostrais-distribuicao-amostral-da-media-e-da-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições amostrais — Distribuição amostral da média e da proporção — exercícios.",
    "details": "Distribuição amostral da média e da proporção — exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_estatistica-cespe_638_distribuicoes-amostrais-distribuicao-amostral-da-media-e-da-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições amostrais — Distribuição amostral da variância — teoria e exercícios.",
    "details": "Distribuição amostral da variância — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 18,
    "notes": "",
    "id": "topic_estatistica-cespe_639_distribuicoes-amostrais-distribuicao-amostral-da-variancia-t"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Distribuições amostrais — Distribuições amostrais — partes 1 e 2.",
    "details": "Distribuições amostrais — partes 1 e 2.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 19,
    "notes": "",
    "id": "topic_estatistica-cespe_640_distribuicoes-amostrais-distribuicoes-amostrais-partes-1-e-2"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estimação — Estimadores de momentos e de máxima verossimilhança.",
    "details": "Estimadores de momentos e de máxima verossimilhança.",
    "status": "Em espera",
    "priority": "Média",
    "order": 20,
    "notes": "",
    "id": "topic_estatistica-cespe_641_estimacao-estimadores-de-momentos-e-de-maxima-verossimilhanc"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estatísticas suficientes",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 21,
    "notes": "",
    "id": "topic_estatistica-cespe_642_estatisticas-suficientes"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estimação e suficiência — Questões CESPE 2021 a 2025 — questões 1 a 6 e 7 a 15.",
    "details": "Questões CESPE 2021 a 2025 — questões 1 a 6 e 7 a 15.",
    "status": "Em espera",
    "priority": "Média",
    "order": 22,
    "notes": "",
    "id": "topic_estatistica-cespe_643_estimacao-e-suficiencia-questoes-cespe-2021-a-2025-questoes-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estimação e suficiência — Questões CESPE 2021 a 2025 — questões 16 a 26 e 27 a 41.",
    "details": "Questões CESPE 2021 a 2025 — questões 16 a 26 e 27 a 41.",
    "status": "Em espera",
    "priority": "Média",
    "order": 23,
    "notes": "",
    "id": "topic_estatistica-cespe_644_estimacao-e-suficiencia-questoes-cespe-2021-a-2025-questoes-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Estimação e suficiência — Estimadores de máxima verossimilhança e suficiência estatística.",
    "details": "Estimadores de máxima verossimilhança e suficiência estatística.",
    "status": "Em espera",
    "priority": "Média",
    "order": 24,
    "notes": "",
    "id": "topic_estatistica-cespe_645_estimacao-e-suficiencia-estimadores-de-maxima-verossimilhanc"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Intervalos de confiança — Intervalos de confiança para médias e proporções — teoria e exercícios.",
    "details": "Intervalos de confiança para médias e proporções — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 25,
    "notes": "",
    "id": "topic_estatistica-cespe_646_intervalos-de-confianca-intervalos-de-confianca-para-medias-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Intervalos de confiança — Intervalos de confiança para a variância — teoria e exercícios.",
    "details": "Intervalos de confiança para a variância — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 26,
    "notes": "",
    "id": "topic_estatistica-cespe_647_intervalos-de-confianca-intervalos-de-confianca-para-a-varia"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Testes de hipóteses — Testes de hipóteses — teoria e exercícios.",
    "details": "Testes de hipóteses — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 27,
    "notes": "",
    "id": "topic_estatistica-cespe_648_testes-de-hipoteses-testes-de-hipoteses-teoria-e-exercicios"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Testes de hipóteses — Testes de hipóteses para a média — teoria e exercícios.",
    "details": "Testes de hipóteses para a média — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 28,
    "notes": "",
    "id": "topic_estatistica-cespe_649_testes-de-hipoteses-testes-de-hipoteses-para-a-media-teoria-"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Testes de hipóteses — Testes para proporções — teoria e exercícios.",
    "details": "Testes para proporções — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 29,
    "notes": "",
    "id": "topic_estatistica-cespe_650_testes-de-hipoteses-testes-para-proporcoes-teoria-e-exercici"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Testes de hipóteses — Teste Qui-quadrado — teoria e exercícios.",
    "details": "Teste Qui-quadrado — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 30,
    "notes": "",
    "id": "topic_estatistica-cespe_651_testes-de-hipoteses-teste-qui-quadrado-teoria-e-exercicios"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Inferência estatística — Intervalos de confiança e testes de hipóteses.",
    "details": "Intervalos de confiança e testes de hipóteses.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 31,
    "notes": "",
    "id": "topic_estatistica-cespe_652_inferencia-estatistica-intervalos-de-confianca-e-testes-de-h"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Regressão — Regressão linear — teoria e exercícios.",
    "details": "Regressão linear — teoria e exercícios.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 32,
    "notes": "",
    "id": "topic_estatistica-cespe_653_regressao-regressao-linear-teoria-e-exercicios"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Regressão — Regressão linear.",
    "details": "Regressão linear.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 33,
    "notes": "",
    "id": "topic_estatistica-cespe_654_regressao-regressao-linear"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Variáveis contínuas",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 34,
    "notes": "",
    "id": "topic_estatistica-cespe_655_variaveis-continuas"
  },
  {
    "disciplineName": "Estatística CESPE",
    "title": "Transformação de variáveis",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 35,
    "notes": "",
    "id": "topic_estatistica-cespe_656_transformacao-de-variaveis"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Fundamentos numéricos — Sistema de numeração decimal.",
    "details": "Sistema de numeração decimal.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 1,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_657_fundamentos-numericos-sistema-de-numeracao-decimal"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Fundamentos numéricos — Operações com números naturais.",
    "details": "Operações com números naturais.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 2,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_658_fundamentos-numericos-operacoes-com-numeros-naturais"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Fundamentos numéricos — Múltiplos e divisores. MDC e MMC.",
    "details": "Múltiplos e divisores. MDC e MMC.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 3,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_659_fundamentos-numericos-multiplos-e-divisores-mdc-e-mmc"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Medidas e tempo — Orientação temporal.",
    "details": "Orientação temporal.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 4,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_660_medidas-e-tempo-orientacao-temporal"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Frações e decimais — Operações com frações.",
    "details": "Operações com frações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_661_fracoes-e-decimais-operacoes-com-fracoes"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Frações e decimais — Cálculos com números decimais.",
    "details": "Cálculos com números decimais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_662_fracoes-e-decimais-calculos-com-numeros-decimais"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Medidas — Sistemas de medidas.",
    "details": "Sistemas de medidas.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 7,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_663_medidas-sistemas-de-medidas"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Números inteiros — Operações com números inteiros.",
    "details": "Operações com números inteiros.",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_664_numeros-inteiros-operacoes-com-numeros-inteiros"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Números racionais",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_665_numeros-racionais"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Números reais",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_666_numeros-reais"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Álgebra básica — Equações e sistemas do 1º grau.",
    "details": "Equações e sistemas do 1º grau.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 11,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_667_algebra-basica-equacoes-e-sistemas-do-1-grau"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Matemática básica aplicada — Porcentagem.",
    "details": "Porcentagem.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 12,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_668_matematica-basica-aplicada-porcentagem"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Matemática básica aplicada — Proporcionalidade.",
    "details": "Proporcionalidade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 13,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_669_matematica-basica-aplicada-proporcionalidade"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Matemática básica aplicada — Regra de três.",
    "details": "Regra de três.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 14,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_670_matematica-basica-aplicada-regra-de-tres"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Exercícios",
    "details": "",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 15,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_671_exercicios"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Problemas aplicados — Produção e tempo — problemas de torneiras.",
    "details": "Produção e tempo — problemas de torneiras.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 16,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_672_problemas-aplicados-producao-e-tempo-problemas-de-torneiras"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Álgebra básica — Inequações do 1º grau.",
    "details": "Inequações do 1º grau.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 17,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_673_algebra-basica-inequacoes-do-1-grau"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Álgebra — Produtos notáveis e fatoração.",
    "details": "Produtos notáveis e fatoração.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 18,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_674_algebra-produtos-notaveis-e-fatoracao"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Potências e raízes — Potenciação e radiciação.",
    "details": "Potenciação e radiciação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 19,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_675_potencias-e-raizes-potenciacao-e-radiciacao"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Álgebra — Equação do 2º grau.",
    "details": "Equação do 2º grau.",
    "status": "Em espera",
    "priority": "Baixa",
    "order": 20,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_676_algebra-equacao-do-2-grau"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Conjuntos",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 21,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_677_conjuntos"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Sequências — Progressão aritmética e progressão geométrica.",
    "details": "Progressão aritmética e progressão geométrica.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 22,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_678_sequencias-progressao-aritmetica-e-progressao-geometrica"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Análise combinatória",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 23,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_679_analise-combinatoria"
  },
  {
    "disciplineName": "Alfabetização Matemática",
    "title": "Probabilidade",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 24,
    "notes": "",
    "id": "topic_alfabetizacao-matematica_680_probabilidade"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Lógica proposicional — Estruturas lógicas: definição de proposição, paradoxos, sentenças abertas, conectivos, proposições simples e compostas.",
    "details": "Estruturas lógicas: definição de proposição, paradoxos, sentenças abertas, conectivos, proposições simples e compostas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_raciocinio-logico_681_logica-proposicional-estruturas-logicas-definicao-de-proposi"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Lógica proposicional — Tabelas-verdade das proposições compostas.",
    "details": "Tabelas-verdade das proposições compostas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_raciocinio-logico_682_logica-proposicional-tabelas-verdade-das-proposicoes-compost"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Lógica proposicional — Equivalências lógicas e negações.",
    "details": "Equivalências lógicas e negações.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_raciocinio-logico_683_logica-proposicional-equivalencias-logicas-e-negacoes"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Argumentação lógica — Lógica de argumentação.",
    "details": "Lógica de argumentação.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_raciocinio-logico_684_argumentacao-logica-logica-de-argumentacao"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Álgebra básica — Equações e sistemas do 1º grau.",
    "details": "Equações e sistemas do 1º grau.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_raciocinio-logico_685_algebra-basica-equacoes-e-sistemas-do-1-grau"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Análise combinatória",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_raciocinio-logico_686_analise-combinatoria"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Probabilidade",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_raciocinio-logico_687_probabilidade"
  },
  {
    "disciplineName": "Raciocínio Lógico",
    "title": "Sequências",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_raciocinio-logico_688_sequencias"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Juros simples",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_mat-financeira_689_juros-simples"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Juros compostos — Juros compostos e taxas de juros.",
    "details": "Juros compostos e taxas de juros.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_mat-financeira_690_juros-compostos-juros-compostos-e-taxas-de-juros"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Descontos — Descontos simples.",
    "details": "Descontos simples.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_mat-financeira_691_descontos-descontos-simples"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Descontos — Descontos compostos.",
    "details": "Descontos compostos.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_mat-financeira_692_descontos-descontos-compostos"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Equivalência de capitais",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_mat-financeira_693_equivalencia-de-capitais"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "Séries — Séries uniformes.",
    "details": "Séries uniformes.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_mat-financeira_694_series-series-uniformes"
  },
  {
    "disciplineName": "Mat. Financeira",
    "title": "A confirmar — Item sem título informado no conteúdo enviado.",
    "details": "Item sem título informado no conteúdo enviado.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_mat-financeira_695_a-confirmar-item-sem-titulo-informado-no-conteudo-enviado"
  },
  {
    "disciplineName": "Inglês",
    "title": "Interpretação e vocabulário — Interpretação de textos, cognatos e resolução de provas.",
    "details": "Interpretação de textos, cognatos e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_ingles_696_interpretacao-e-vocabulario-interpretacao-de-textos-cognatos"
  },
  {
    "disciplineName": "Inglês",
    "title": "Gramática básica — Substantivos, artigos, pronomes, preposições e resolução de provas.",
    "details": "Substantivos, artigos, pronomes, preposições e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_ingles_697_gramatica-basica-substantivos-artigos-pronomes-preposicoes-e"
  },
  {
    "disciplineName": "Inglês",
    "title": "Gramática e vocabulário — Adjetivos, advérbios, afixos e resolução de provas.",
    "details": "Adjetivos, advérbios, afixos e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_ingles_698_gramatica-e-vocabulario-adjetivos-adverbios-afixos-e-resoluc"
  },
  {
    "disciplineName": "Inglês",
    "title": "Verbos frasais — Verbos frasais e resolução de provas.",
    "details": "Verbos frasais e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_ingles_699_verbos-frasais-verbos-frasais-e-resolucao-de-provas"
  },
  {
    "disciplineName": "Inglês",
    "title": "Tempos verbais — Tempos verbais — parte 1 e resolução de provas.",
    "details": "Tempos verbais — parte 1 e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_ingles_700_tempos-verbais-tempos-verbais-parte-1-e-resolucao-de-provas"
  },
  {
    "disciplineName": "Inglês",
    "title": "Tempos verbais — Tempos verbais — parte 2 e resolução de provas.",
    "details": "Tempos verbais — parte 2 e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_ingles_701_tempos-verbais-tempos-verbais-parte-2-e-resolucao-de-provas"
  },
  {
    "disciplineName": "Inglês",
    "title": "Expressões idiomáticas — Expressões — idioms — e resolução de provas.",
    "details": "Expressões — idioms — e resolução de provas.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_ingles_702_expressoes-idiomaticas-expressoes-idioms-e-resolucao-de-prov"
  },
  {
    "disciplineName": "Inglês",
    "title": "Resolução de provas",
    "details": "",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_ingles_703_resolucao-de-provas"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Lei Anticorrupção — Lei nº 12.846/2013 — Lei Anticorrupção.",
    "details": "Lei nº 12.846/2013 — Lei Anticorrupção.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 1,
    "notes": "",
    "id": "topic_anticorrupcao_704_lei-anticorrupcao-lei-n-12-846-2013-lei-anticorrupcao"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Organização criminosa — Lei nº 12.850/2013 — crime organizado.",
    "details": "Lei nº 12.850/2013 — crime organizado.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 2,
    "notes": "",
    "id": "topic_anticorrupcao_705_organizacao-criminosa-lei-n-12-850-2013-crime-organizado"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Lavagem de dinheiro — Lei nº 9.613/1998 — crimes de lavagem de dinheiro.",
    "details": "Lei nº 9.613/1998 — crimes de lavagem de dinheiro.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 3,
    "notes": "",
    "id": "topic_anticorrupcao_706_lavagem-de-dinheiro-lei-n-9-613-1998-crimes-de-lavagem-de-di"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Abuso de autoridade — Lei nº 13.869/2019 — Lei de abuso de autoridade.",
    "details": "Lei nº 13.869/2019 — Lei de abuso de autoridade.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 4,
    "notes": "",
    "id": "topic_anticorrupcao_707_abuso-de-autoridade-lei-n-13-869-2019-lei-de-abuso-de-autori"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Crimes contra a Administração Pública — Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte I.",
    "details": "Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte I.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 5,
    "notes": "",
    "id": "topic_anticorrupcao_708_crimes-contra-a-administracao-publica-decreto-lei-n-2-848-19"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Crimes contra a Administração Pública — Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte II.",
    "details": "Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte II.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 6,
    "notes": "",
    "id": "topic_anticorrupcao_709_crimes-contra-a-administracao-publica-decreto-lei-n-2-848-19"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Crimes contra a Administração Pública — Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte III.",
    "details": "Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte III.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 7,
    "notes": "",
    "id": "topic_anticorrupcao_710_crimes-contra-a-administracao-publica-decreto-lei-n-2-848-19"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Crimes contra a Administração Pública — Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte IV.",
    "details": "Decreto-Lei nº 2.848/1940 — crimes contra a Administração Pública, parte IV.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 8,
    "notes": "",
    "id": "topic_anticorrupcao_711_crimes-contra-a-administracao-publica-decreto-lei-n-2-848-19"
  },
  {
    "disciplineName": "Anticorrupção",
    "title": "Convenções internacionais — Convenção de Mérida — Decreto nº 5.687/2006 — e Convenção de Palermo — Decreto nº 5.015/2004.",
    "details": "Convenção de Mérida — Decreto nº 5.687/2006 — e Convenção de Palermo — Decreto nº 5.015/2004.",
    "status": "Em espera",
    "priority": "Alta",
    "order": 9,
    "notes": "",
    "id": "topic_anticorrupcao_712_convencoes-internacionais-convencao-de-merida-decreto-n-5-68"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Administração Pública — Do modelo racional-legal ao paradigma pós-burocrático.",
    "details": "Do modelo racional-legal ao paradigma pós-burocrático.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_administracao-publica_713_administracao-publica-do-modelo-racional-legal-ao-paradigma-"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Políticas públicas — Ciclo das políticas públicas: agenda, formulação, decisão, implementação e avaliação.",
    "details": "Ciclo das políticas públicas: agenda, formulação, decisão, implementação e avaliação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_administracao-publica_714_politicas-publicas-ciclo-das-politicas-publicas-agenda-formu"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Processos participativos — Conselhos de gestão, orçamento participativo, parceria governo-sociedade.",
    "details": "Conselhos de gestão, orçamento participativo, parceria governo-sociedade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_administracao-publica_715_processos-participativos-conselhos-de-gestao-orcamento-parti"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Planejamento público — Planejamento nas organizações públicas; missão, visão e valores.",
    "details": "Planejamento nas organizações públicas; missão, visão e valores.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_administracao-publica_716_planejamento-publico-planejamento-nas-organizacoes-publicas-"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Governo eletrônico — Transparência, controle social, cidadania e accountability.",
    "details": "Transparência, controle social, cidadania e accountability.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_administracao-publica_717_governo-eletronico-transparencia-controle-social-cidadania-e"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Gestão de pessoas — Gestão de Pessoas por Competências.",
    "details": "Gestão de Pessoas por Competências.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_administracao-publica_718_gestao-de-pessoas-gestao-de-pessoas-por-competencias"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Mudanças institucionais — OS, OSCIP, agências, consórcios públicos e organizações públicas.",
    "details": "OS, OSCIP, agências, consórcios públicos e organizações públicas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_administracao-publica_719_mudancas-institucionais-os-oscip-agencias-consorcios-publico"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Gestão por resultados — Produção de serviços públicos e indicadores.",
    "details": "Produção de serviços públicos e indicadores.",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_administracao-publica_720_gestao-por-resultados-producao-de-servicos-publicos-e-indica"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Governabilidade e governança — Clientelismo, corporativismo, neocorporativismo e princípios de governança.",
    "details": "Clientelismo, corporativismo, neocorporativismo e princípios de governança.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_administracao-publica_721_governabilidade-e-governanca-clientelismo-corporativismo-neo"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Estado brasileiro contemporâneo — Descentralização, participação, cidadania, equidade, corrupção e políticas públicas.",
    "details": "Descentralização, participação, cidadania, equidade, corrupção e políticas públicas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_administracao-publica_722_estado-brasileiro-contemporaneo-descentralizacao-participaca"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "PDCA — Ciclo do planejamento em organizações.",
    "details": "Ciclo do planejamento em organizações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 11,
    "notes": "",
    "id": "topic_administracao-publica_723_pdca-ciclo-do-planejamento-em-organizacoes"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Referencial estratégico — SWOT, cenários, GUT, negócio, missão, visão e valores.",
    "details": "SWOT, cenários, GUT, negócio, missão, visão e valores.",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_administracao-publica_724_referencial-estrategico-swot-cenarios-gut-negocio-missao-vis"
  },
  {
    "disciplineName": "Administração Pública",
    "title": "Indicadores — Tipos de indicadores e variáveis componentes.",
    "details": "Tipos de indicadores e variáveis componentes.",
    "status": "Em espera",
    "priority": "Média",
    "order": 13,
    "notes": "",
    "id": "topic_administracao-publica_725_indicadores-tipos-de-indicadores-e-variaveis-componentes"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "LINDB — Vigência, aplicação, obrigatoriedade, interpretação, integração e conflitos de leis.",
    "details": "Vigência, aplicação, obrigatoriedade, interpretação, integração e conflitos de leis.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_direito-civil_726_lindb-vigencia-aplicacao-obrigatoriedade-interpretacao-integ"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Pessoas naturais — Conceito, início da pessoa natural, personalidade, capacidade, direitos da personalidade e domicílio.",
    "details": "Conceito, início da pessoa natural, personalidade, capacidade, direitos da personalidade e domicílio.",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_direito-civil_727_pessoas-naturais-conceito-inicio-da-pessoa-natural-personali"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Pessoas jurídicas — Disposições gerais, constituição, extinção, sociedades de fato, associações e fundações.",
    "details": "Disposições gerais, constituição, extinção, sociedades de fato, associações e fundações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_direito-civil_728_pessoas-juridicas-disposicoes-gerais-constituicao-extincao-s"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Bens — Bens imóveis, móveis e públicos.",
    "details": "Bens imóveis, móveis e públicos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_direito-civil_729_bens-bens-imoveis-moveis-e-publicos"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Fato jurídico",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_direito-civil_730_fato-juridico"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Negócio jurídico — Disposições gerais e invalidade.",
    "details": "Disposições gerais e invalidade.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_direito-civil_731_negocio-juridico-disposicoes-gerais-e-invalidade"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Prescrição — Disposições gerais.",
    "details": "Disposições gerais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_direito-civil_732_prescricao-disposicoes-gerais"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Decadência",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_direito-civil_733_decadencia"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Obrigações — Características, adimplemento, inadimplemento e mora.",
    "details": "Características, adimplemento, inadimplemento e mora.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_direito-civil_734_obrigacoes-caracteristicas-adimplemento-inadimplemento-e-mor"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Contratos — Princípios, contratos em geral e disposições gerais.",
    "details": "Princípios, contratos em geral e disposições gerais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_direito-civil_735_contratos-principios-contratos-em-geral-e-disposicoes-gerais"
  },
  {
    "disciplineName": "Direito Civil",
    "title": "Responsabilidade civil — Responsabilidade civil objetiva e subjetiva; obrigação de indenizar e dano material.",
    "details": "Responsabilidade civil objetiva e subjetiva; obrigação de indenizar e dano material.",
    "status": "Em espera",
    "priority": "Média",
    "order": 11,
    "notes": "",
    "id": "topic_direito-civil_736_responsabilidade-civil-responsabilidade-civil-objetiva-e-sub"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Princípios do processo — Devido processo legal, contraditório, ampla defesa e juiz natural.",
    "details": "Devido processo legal, contraditório, ampla defesa e juiz natural.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_direito-proc-civil_737_principios-do-processo-devido-processo-legal-contraditorio-a"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Jurisdição",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_direito-proc-civil_738_jurisdicao"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Ação — Condições da ação e classificação.",
    "details": "Condições da ação e classificação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_direito-proc-civil_739_acao-condicoes-da-acao-e-classificacao"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Atos judiciais — Despachos, decisões interlocutórias e sentenças.",
    "details": "Despachos, decisões interlocutórias e sentenças.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_direito-proc-civil_740_atos-judiciais-despachos-decisoes-interlocutorias-e-sentenca"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Coisa julgada — Coisa julgada material.",
    "details": "Coisa julgada material.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_direito-proc-civil_741_coisa-julgada-coisa-julgada-material"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Controle judicial — Controle judicial dos atos administrativos.",
    "details": "Controle judicial dos atos administrativos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_direito-proc-civil_742_controle-judicial-controle-judicial-dos-atos-administrativos"
  },
  {
    "disciplineName": "Direito Proc. Civil",
    "title": "Processo estrutural — Problema estrutural e decisão estrutural.",
    "details": "Problema estrutural e decisão estrutural.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_direito-proc-civil_743_processo-estrutural-problema-estrutural-e-decisao-estrutural"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Dados — Dados estruturados e não estruturados; dados abertos; coleta, tratamento, armazenamento, integração e recuperação.",
    "details": "Dados estruturados e não estruturados; dados abertos; coleta, tratamento, armazenamento, integração e recuperação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_analise-de-dados_744_dados-dados-estruturados-e-nao-estruturados-dados-abertos-co"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "ETL e formatos — Processos de ETL; XML, JSON e CSV.",
    "details": "Processos de ETL; XML, JSON e CSV.",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_analise-de-dados_745_etl-e-formatos-processos-de-etl-xml-json-e-csv"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Representação de dados — Representação numérica, textual e estruturada; aritmética computacional; dados espaciais.",
    "details": "Representação numérica, textual e estruturada; aritmética computacional; dados espaciais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_analise-de-dados_746_representacao-de-dados-representacao-numerica-textual-e-estr"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Bancos relacionais — Teoria, implementação, SQL como DDL, DML, DCL e transações.",
    "details": "Teoria, implementação, SQL como DDL, DML, DCL e transações.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_analise-de-dados_747_bancos-relacionais-teoria-implementacao-sql-como-ddl-dml-dcl"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Mineração de dados — CRISP-DM, pré-processamento, classificação, associação, clusterização, anomalias e predição.",
    "details": "CRISP-DM, pré-processamento, classificação, associação, clusterização, anomalias e predição.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_analise-de-dados_748_mineracao-de-dados-crisp-dm-pre-processamento-classificacao-"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Machine Learning — Erro, validação, avaliação, underfitting, overfitting, regularização e modelos.",
    "details": "Erro, validação, avaliação, underfitting, overfitting, regularização e modelos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_analise-de-dados_749_machine-learning-erro-validacao-avaliacao-underfitting-overf"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Python e bibliotecas — Sintaxe, estruturas, funções, arquivos, NLTK, TensorFlow, Pandas, NumPy, Arrow, Sklearn e SciPy.",
    "details": "Sintaxe, estruturas, funções, arquivos, NLTK, TensorFlow, Pandas, NumPy, Arrow, Sklearn e SciPy.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_analise-de-dados_750_python-e-bibliotecas-sintaxe-estruturas-funcoes-arquivos-nlt"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "R e Tidyverse — Sintaxe, tipos, operadores, repetição, estruturas, gráficos, data frames e Tidyverse.",
    "details": "Sintaxe, tipos, operadores, repetição, estruturas, gráficos, data frames e Tidyverse.",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_analise-de-dados_751_r-e-tidyverse-sintaxe-tipos-operadores-repeticao-estruturas-"
  },
  {
    "disciplineName": "Análise de Dados",
    "title": "Segurança, LAI e LGPD — CID, autenticidade, não repúdio, políticas, incidentes, LAI e LGPD.",
    "details": "CID, autenticidade, não repúdio, políticas, incidentes, LAI e LGPD.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_analise-de-dados_752_seguranca-lai-e-lgpd-cid-autenticidade-nao-repudio-politicas"
  },
  {
    "disciplineName": "Análise Demonstrações",
    "title": "Indicadores — Conceitos, cálculos, vantagens e desvantagens dos indicadores.",
    "details": "Conceitos, cálculos, vantagens e desvantagens dos indicadores.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_analise-demonstracoes_753_indicadores-conceitos-calculos-vantagens-e-desvantagens-dos-"
  },
  {
    "disciplineName": "Análise Demonstrações",
    "title": "Análise horizontal e vertical",
    "details": "",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_analise-demonstracoes_754_analise-horizontal-e-vertical"
  },
  {
    "disciplineName": "Análise Demonstrações",
    "title": "Estrutura de capital — Indicadores de estrutura de capital.",
    "details": "Indicadores de estrutura de capital.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_analise-demonstracoes_755_estrutura-de-capital-indicadores-de-estrutura-de-capital"
  },
  {
    "disciplineName": "Análise Demonstrações",
    "title": "Liquidez — Indicadores de liquidez.",
    "details": "Indicadores de liquidez.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_analise-demonstracoes_756_liquidez-indicadores-de-liquidez"
  },
  {
    "disciplineName": "Análise Demonstrações",
    "title": "Notas explicativas — Informações extraídas das Notas Explicativas.",
    "details": "Informações extraídas das Notas Explicativas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_analise-demonstracoes_757_notas-explicativas-informacoes-extraidas-das-notas-explicati"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Contas nacionais — Sistema de contas nacionais e identidades macroeconômicas básicas.",
    "details": "Sistema de contas nacionais e identidades macroeconômicas básicas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 1,
    "notes": "",
    "id": "topic_economia-setor-publico_758_contas-nacionais-sistema-de-contas-nacionais-e-identidades-m"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Produto agregado — Produto agregado, mensuração, produto nominal e real.",
    "details": "Produto agregado, mensuração, produto nominal e real.",
    "status": "Em espera",
    "priority": "Média",
    "order": 2,
    "notes": "",
    "id": "topic_economia-setor-publico_759_produto-agregado-produto-agregado-mensuracao-produto-nominal"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Sistema monetário e BP — Contas do sistema monetário e balanço de pagamentos.",
    "details": "Contas do sistema monetário e balanço de pagamentos.",
    "status": "Em espera",
    "priority": "Média",
    "order": 3,
    "notes": "",
    "id": "topic_economia-setor-publico_760_sistema-monetario-e-bp-contas-do-sistema-monetario-e-balanco"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Modelo keynesiano — Multiplicador e papel dos gastos do governo.",
    "details": "Multiplicador e papel dos gastos do governo.",
    "status": "Em espera",
    "priority": "Média",
    "order": 4,
    "notes": "",
    "id": "topic_economia-setor-publico_761_modelo-keynesiano-multiplicador-e-papel-dos-gastos-do-govern"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Modelo IS/LM — Impactos das políticas monetária e fiscal e regimes cambiais.",
    "details": "Impactos das políticas monetária e fiscal e regimes cambiais.",
    "status": "Em espera",
    "priority": "Média",
    "order": 5,
    "notes": "",
    "id": "topic_economia-setor-publico_762_modelo-is-lm-impactos-das-politicas-monetaria-e-fiscal-e-reg"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Gasto público e financiamento — Avaliação do gasto público e financiamento do setor público no Brasil.",
    "details": "Avaliação do gasto público e financiamento do setor público no Brasil.",
    "status": "Em espera",
    "priority": "Média",
    "order": 6,
    "notes": "",
    "id": "topic_economia-setor-publico_763_gasto-publico-e-financiamento-avaliacao-do-gasto-publico-e-f"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Regulação — Conceitos de regulação, desregulação e re-regulação.",
    "details": "Conceitos de regulação, desregulação e re-regulação.",
    "status": "Em espera",
    "priority": "Média",
    "order": 7,
    "notes": "",
    "id": "topic_economia-setor-publico_764_regulacao-conceitos-de-regulacao-desregulacao-e-re-regulacao"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Indústrias reguladas — Teoria econômica de indústrias reguladas.",
    "details": "Teoria econômica de indústrias reguladas.",
    "status": "Em espera",
    "priority": "Média",
    "order": 8,
    "notes": "",
    "id": "topic_economia-setor-publico_765_industrias-reguladas-teoria-economica-de-industrias-regulada"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Estruturas de mercado — Concorrência perfeita e monopolística, oligopólio e monopólio.",
    "details": "Concorrência perfeita e monopolística, oligopólio e monopólio.",
    "status": "Em espera",
    "priority": "Média",
    "order": 9,
    "notes": "",
    "id": "topic_economia-setor-publico_766_estruturas-de-mercado-concorrencia-perfeita-e-monopolistica-"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Falhas de mercado — Externalidades, bens públicos, assimetria de informação, seleção adversa e perigo moral.",
    "details": "Externalidades, bens públicos, assimetria de informação, seleção adversa e perigo moral.",
    "status": "Em espera",
    "priority": "Média",
    "order": 10,
    "notes": "",
    "id": "topic_economia-setor-publico_767_falhas-de-mercado-externalidades-bens-publicos-assimetria-de"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Tarifação — Regimes tarifários, custo de serviço e preço teto.",
    "details": "Regimes tarifários, custo de serviço e preço teto.",
    "status": "Em espera",
    "priority": "Média",
    "order": 11,
    "notes": "",
    "id": "topic_economia-setor-publico_768_tarifacao-regimes-tarifarios-custo-de-servico-e-preco-teto"
  },
  {
    "disciplineName": "Economia Setor Público",
    "title": "Incentivos e competição — Regulação por incentivos e regulação para competição.",
    "details": "Regulação por incentivos e regulação para competição.",
    "status": "Em espera",
    "priority": "Média",
    "order": 12,
    "notes": "",
    "id": "topic_economia-setor-publico_769_incentivos-e-competicao-regulacao-por-incentivos-e-regulacao"
  }
];

  let state = loadState();
  let currentRoute = getInitialRoute();
  let lastDraft = null;
  let editingSessionId = null;
  let topicFilterDiscipline = null;
  let topicStatusFilter = 'Todos';
  let topicSearch = '';
  let historyFilters = { discipline: '', mode: '', from: '', to: '', q: '' };

  const $app = document.getElementById('app');

  function uid(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || uid('disc');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function parseHours(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const normalized = String(value ?? '').trim().replace(',', '.');
    const n = Number(normalized);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function parseIntSafe(value) {
    const n = Number(String(value ?? '').trim().replace(',', '.'));
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  }

  function todayISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = String(iso).split('-');
    return `${d}/${m}/${y}`;
  }

  function weekStartISO(date = new Date()) {
    const dt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = dt.getDay() || 7;
    dt.setDate(dt.getDate() - day + 1);
    return dt.toISOString().slice(0, 10);
  }

  function monthKey(iso) {
    return String(iso || '').slice(0, 7);
  }

  function dayName() {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date());
  }

  function defaultHoursForMode(mode) {
    if (mode === 'Teoria') return 2;
    if (mode === 'Revisão' || mode === 'Questões' || mode === 'Caderno de Erros') return 1;
    return 0;
  }

  function effectiveHours(disc) {
    const manual = parseHours(disc.manualHours);
    if (manual > 0) return manual;
    return defaultHoursForMode(disc.mode);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return seedState();
      const parsed = JSON.parse(raw);
      return migrateState(parsed);
    } catch (err) {
      console.warn('Falha ao carregar dados. Recriando base.', err);
      return seedState();
    }
  }

  function saveState(options = {}) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    if (!options.skipSnapshot) autoSnapshot_();
  }

  function autoSnapshot_() {
    try {
      const minimal = {
        createdAt: new Date().toISOString(),
        sessions: state.sessions.length,
        topics: state.topics.length,
        payload: state
      };
      const list = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || '[]');
      list.unshift(minimal);
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(list.slice(0, MAX_SNAPSHOTS)));
    } catch (err) {
      console.warn('Auto snapshot ignorado:', err);
    }
  }

  function lastBackupDateLabel() {
    const v = state.settings && state.settings.lastBackupAt;
    return v ? formatDate(String(v).slice(0,10)) : 'nunca';
  }

  function daysSinceBackup() {
    const v = state.settings && state.settings.lastBackupAt;
    if (!v) return null;
    const dt = new Date(v);
    if (Number.isNaN(dt.getTime())) return null;
    return Math.max(0, Math.floor((Date.now() - dt.getTime()) / 86400000));
  }

  function backupIsDue() {
    const days = daysSinceBackup();
    const limit = Number(state.settings.backupReminderDays || 1);
    return days === null || days >= limit;
  }

  function exportBackupFile() {
    state.settings.lastBackupAt = new Date().toISOString();
    saveState({ skipSnapshot: true });
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tcu-study-os-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function mergeByIdOrKey(existing, incoming, keyFn) {
    const out = Array.isArray(existing) ? existing.slice() : [];
    const idxById = new Map(out.map((item, idx) => [item.id, idx]).filter(x => x[0]));
    const idxByKey = new Map(out.map((item, idx) => [keyFn(item), idx]).filter(x => x[0]));
    (incoming || []).forEach(item => {
      const idx = item.id && idxById.has(item.id) ? idxById.get(item.id) : idxByKey.get(keyFn(item));
      if (idx !== undefined) out[idx] = { ...out[idx], ...item };
      else out.push(item);
    });
    return out;
  }

  function mergeState(importedRaw) {
    const imported = migrateState(importedRaw);
    const base = migrateState(state);
    base.disciplines = mergeByIdOrKey(base.disciplines, imported.disciplines, d => normalizeName(d.name));
    base.topics = mergeByIdOrKey(base.topics, imported.topics, t => `${normalizeName(t.disciplineName)}|${normalizeName(t.title)}`);
    base.sessions = mergeByIdOrKey(base.sessions, imported.sessions, s => s.id || `${s.date}|${normalizeName(s.disciplineName)}|${normalizeName(s.subject)}|${s.hours}|${s.questions}|${s.correct}|${s.createdAt || ''}`);
    base.errors = mergeByIdOrKey(base.errors, imported.errors, e => e.id || `${e.date}|${normalizeName(e.disciplineName)}|${normalizeName(e.subject)}|${normalizeName(e.description)}`);
    base.settings = { ...base.settings, ...imported.settings, lastBackupAt: base.settings.lastBackupAt || imported.settings.lastBackupAt || '' };
    return migrateState(base);
  }

  function seedState() {
    const disciplines = DEFAULT_DISCIPLINES.map(row => ({
      id: row[0], name: row[1], active: row[2], mode: row[3], order: row[4], frequency: row[5], priority: row[6], manualHours: '', source: '', sourceUrl: '', notes: ''
    }));
    const topics = seedTopicsFor(disciplines);
    return {
      version: BACKUP_VERSION,
      settings: {
        dailyHours: 4,
        weeklyGoal: 24,
        monthlyGoal: 100,
        sundayStudy: false,
        minAccuracy: 70,
        neglectDays: 7,
        updatedAt: new Date().toISOString(),
        lastBackupAt: '',
        backupReminderDays: 1,
        autoExportAfterRegister: false
      },
      disciplines,
      topics,
      sessions: [],
      errors: []
    };
  }

  function seedTopicsFor(disciplines) {
    const byName = new Map(disciplines.map(d => [normalizeName(d.name), d]));
    return DEFAULT_TOPICS.map((t, idx) => {
      const disc = byName.get(normalizeName(t.disciplineName));
      return normalizeTopic({ ...t, disciplineId: disc ? disc.id : '', disciplineName: disc ? disc.name : t.disciplineName }, idx, disciplines);
    }).filter(t => t.title);
  }

  function migrateState(data) {
    const seeded = seedState();
    const clean = {
      version: BACKUP_VERSION,
      settings: { ...seeded.settings, ...(data.settings || {}) },
      disciplines: Array.isArray(data.disciplines) ? data.disciplines : seeded.disciplines,
      topics: Array.isArray(data.topics) ? data.topics : [],
      sessions: Array.isArray(data.sessions) ? data.sessions : [],
      errors: Array.isArray(data.errors) ? data.errors : []
    };
    clean.settings.lastBackupAt = clean.settings.lastBackupAt || '';
    clean.settings.backupReminderDays = Number.isFinite(Number(clean.settings.backupReminderDays)) ? Number(clean.settings.backupReminderDays) : 1;
    clean.settings.autoExportAfterRegister = Boolean(clean.settings.autoExportAfterRegister);
    clean.disciplines = clean.disciplines.map((d, idx) => ({
      id: d.id || slugify(d.name) || uid('disc'),
      name: d.name || `Disciplina ${idx + 1}`,
      active: Boolean(d.active),
      mode: MODES.includes(d.mode) ? d.mode : 'Em espera',
      order: Number.isFinite(Number(d.order)) ? Number(d.order) : idx + 1,
      frequency: Math.max(1, parseIntSafe(d.frequency || 1)),
      priority: PRIORITIES.includes(d.priority) ? d.priority : 'Média',
      manualHours: d.manualHours || '',
      source: d.source || '',
      sourceUrl: d.sourceUrl || '',
      notes: d.notes || ''
    }));
    canonicalizePortuguese_(clean);
    const normalizedTopics = clean.topics.map((t, idx) => normalizeTopic(t, idx, clean.disciplines)).filter(t => t.title);
    const existingKeys = new Set(normalizedTopics.map(t => `${normalizeName(t.disciplineName)}|${normalizeName(t.title)}`));
    seeded.topics.forEach(t => {
      const key = `${normalizeName(t.disciplineName)}|${normalizeName(t.title)}`;
      if (!existingKeys.has(key)) normalizedTopics.push(normalizeTopic(t, normalizedTopics.length, clean.disciplines));
    });
    clean.topics = normalizedTopics;
    canonicalizePortuguese_(clean);
    return clean;
  }

  function canonicalizePortuguese_(clean) {
    if (!clean || !Array.isArray(clean.disciplines)) return;
    const isPortLegacy = d => normalizeName(d && d.name) === 'port' || normalizeName(d && d.id) === 'port';
    const isPortuguese = d => normalizeName(d && d.name) === 'portugues' || normalizeName(d && d.id) === 'portugues';
    let portuguese = clean.disciplines.find(isPortuguese);
    const legacyPort = clean.disciplines.find(isPortLegacy);

    if (!portuguese && legacyPort) {
      legacyPort.name = 'Português';
      legacyPort.id = legacyPort.id === 'port' ? 'portugues' : legacyPort.id;
      portuguese = legacyPort;
    }
    if (!portuguese) {
      portuguese = { id: 'portugues', name: 'Português', active: true, mode: 'Teoria', order: 1, frequency: 2, priority: 'Alta', manualHours: '', source: '', sourceUrl: '', notes: 'Criada pela migração v6.' };
      clean.disciplines.push(portuguese);
    }

    const oldIds = [];
    if (legacyPort && legacyPort !== portuguese) {
      oldIds.push(legacyPort.id);
      portuguese.active = Boolean(portuguese.active || legacyPort.active);
      portuguese.mode = portuguese.mode && portuguese.mode !== 'Em espera' ? portuguese.mode : (legacyPort.mode || 'Teoria');
      portuguese.priority = portuguese.priority || legacyPort.priority || 'Alta';
      portuguese.source = portuguese.source || legacyPort.source || '';
      portuguese.sourceUrl = portuguese.sourceUrl || legacyPort.sourceUrl || '';
      portuguese.notes = portuguese.notes || legacyPort.notes || '';
      portuguese.manualHours = portuguese.manualHours || legacyPort.manualHours || '';
      clean.disciplines = clean.disciplines.filter(d => d !== legacyPort);
    }

    portuguese.id = 'portugues';
    portuguese.name = 'Português';
    portuguese.active = true;
    portuguese.mode = portuguese.mode && portuguese.mode !== 'Em espera' ? portuguese.mode : 'Teoria';
    portuguese.order = 1;
    portuguese.frequency = Math.max(2, parseIntSafe(portuguese.frequency || 2));
    portuguese.priority = 'Alta';

    const dcon = clean.disciplines.find(d => normalizeName(d.name) === 'dcon');
    if (dcon) { dcon.active = true; dcon.order = 2; dcon.frequency = 1; dcon.priority = dcon.priority || 'Alta'; dcon.mode = dcon.mode && dcon.mode !== 'Em espera' ? dcon.mode : 'Teoria'; }
    const dad = clean.disciplines.find(d => normalizeName(d.name) === 'dad');
    if (dad) { dad.active = true; dad.order = 3; dad.frequency = 1; dad.priority = dad.priority || 'Alta'; dad.mode = dad.mode && dad.mode !== 'Em espera' ? dad.mode : 'Teoria'; }

    const fixEntity = item => {
      if (!item) return;
      if (normalizeName(item.disciplineName) === 'port' || oldIds.includes(item.disciplineId)) {
        item.disciplineName = 'Português';
        item.disciplineId = portuguese.id;
      }
    };
    (clean.topics || []).forEach(fixEntity);
    (clean.sessions || []).forEach(fixEntity);
    (clean.errors || []).forEach(fixEntity);
  }

  function getInitialRoute() {
    const hash = (location.hash || '#hoje').replace('#', '');
    return ['hoje', 'registrar', 'historico', 'ciclo', 'conteudo', 'progresso', 'ataque', 'erros', 'fontes', 'backup', 'config', 'ajuda', 'sessao'].includes(hash) ? hash : 'hoje';
  }

  window.addEventListener('hashchange', () => {
    currentRoute = getInitialRoute();
    render();
  });

  function navigate(route) {
    location.hash = route;
    currentRoute = route;
    render();
  }

  function getDisciplineByName(name) {
    const normalized = normalizeName(name);
    return state.disciplines.find(d => normalizeName(d.name) === normalized) || null;
  }

  function ensureDiscipline(name, mode = 'Teoria') {
    const trimmed = String(name || '').trim();
    if (!trimmed) return null;
    let disc = getDisciplineByName(trimmed);
    if (disc) return disc;
    const maxOrder = state.disciplines.reduce((m, d) => Math.max(m, Number(d.order) || 0), 0);
    disc = {
      id: slugify(trimmed) + '_' + Math.random().toString(36).slice(2, 5),
      name: trimmed,
      active: true,
      mode: MODES.includes(mode) ? mode : 'Teoria',
      order: maxOrder + 1,
      frequency: 1,
      priority: 'Média',
      manualHours: '',
      source: '',
      sourceUrl: '',
      notes: 'Criada automaticamente no registro.'
    };
    state.disciplines.push(disc);
    if (!state.topics) state.topics = [];
    if (!topicsForDiscipline(disc).length) state.topics.push({ id: uid('topic'), disciplineId: disc.id, disciplineName: disc.name, title: 'Assunto 1', details: 'Edite este tópico em Conteúdo.', status: 'Em espera', priority: disc.priority, order: 1, notes: '', sourceUrl: '', tecUrl: '' });
    saveState();
    return disc;
  }


  function normalizeName(value) {
    return String(value || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function getDisciplineById(id) {
    return state.disciplines.find(d => d.id === id) || null;
  }

  function normalizeTopic(t, idx, disciplines = state.disciplines) {
    const byId = new Map((disciplines || []).map(d => [d.id, d]));
    const byName = new Map((disciplines || []).map(d => [normalizeName(d.name), d]));
    const disc = byId.get(t.disciplineId) || byName.get(normalizeName(t.disciplineName));
    const title = String(t.title || t.subject || '').trim();
    return {
      id: t.id || uid('topic'),
      disciplineId: disc ? disc.id : (t.disciplineId || ''),
      disciplineName: disc ? disc.name : (t.disciplineName || ''),
      title,
      details: String(t.details || '').trim(),
      status: TOPIC_STATUSES.includes(t.status) ? t.status : 'Em espera',
      priority: PRIORITIES.includes(t.priority) ? t.priority : 'Média',
      order: Number.isFinite(Number(t.order)) ? Number(t.order) : idx + 1,
      notes: String(t.notes || '').trim(),
      sourceUrl: String(t.sourceUrl || '').trim(),
      tecUrl: String(t.tecUrl || t.cadernoTecUrl || t.tecConcursosUrl || '').trim()
    };
  }

  function topicsForDiscipline(discOrName) {
    const disc = typeof discOrName === 'string' ? getDisciplineByName(discOrName) : discOrName;
    if (!disc) return [];
    return state.topics
      .filter(t => t.disciplineId === disc.id || normalizeName(t.disciplineName) === normalizeName(disc.name))
      .sort((a, b) => (Number(a.order) || 9999) - (Number(b.order) || 9999) || a.title.localeCompare(b.title, 'pt-BR'));
  }

  function getTopicById(id) {
    return state.topics.find(t => t.id === id) || null;
  }

  function ensureTopic(discOrName, title, details = '') {
    const disc = typeof discOrName === 'string' ? ensureDiscipline(discOrName, 'Teoria') : discOrName;
    if (!disc) return null;
    const cleanTitle = String(title || '').trim();
    if (!cleanTitle) return null;
    let topic = topicsForDiscipline(disc).find(t => normalizeName(t.title) === normalizeName(cleanTitle));
    if (topic) return topic;
    const maxOrder = topicsForDiscipline(disc).reduce((m, t) => Math.max(m, Number(t.order) || 0), 0);
    topic = {
      id: uid('topic'), disciplineId: disc.id, disciplineName: disc.name, title: cleanTitle, details: String(details || '').trim(), status: 'Estudando', priority: disc.priority || 'Média', order: maxOrder + 1, notes: '', sourceUrl: '', tecUrl: ''
    };
    state.topics.push(topic);
    return topic;
  }

  function statusFromMode(mode) {
    if (mode === 'Teoria') return 'Estudando';
    if (mode === 'Revisão') return 'Revisado';
    if (mode === 'Questões') return 'Questões';
    if (mode === 'Caderno de Erros') return 'Caderno de Erros';
    return 'Em espera';
  }

  function topicStatusOptions(selected) {
    return TOPIC_STATUSES.map(s => `<option value="${escapeHTML(s)}" ${s === selected ? 'selected' : ''}>${escapeHTML(s)}</option>`).join('');
  }

  function topicSelectOptions(disciplineName, selectedId = '') {
    const topics = topicsForDiscipline(disciplineName);
    const options = ['<option value="">Selecionar tópico cadastrado...</option>'].concat(topics.map(t => `<option value="${escapeHTML(t.id)}" ${t.id === selectedId ? 'selected' : ''}>${escapeHTML(t.title)}</option>`));
    return options.join('');
  }

  function updateTopicAfterSession(topicId, disc, subject, mode) {
    let topic = topicId ? getTopicById(topicId) : null;
    if (!topic && subject) topic = ensureTopic(disc, subject);
    if (topic) {
      topic.status = statusFromMode(mode);
      topic.disciplineId = disc.id;
      topic.disciplineName = disc.name;
      if (subject && normalizeName(subject) !== normalizeName(topic.title)) topic.notes = topic.notes || `Registro relacionado: ${subject}`;
    }
    return topic;
  }

  function topicProgressValue(status) {
    if (status === 'Estudando') return 25;
    if (status === 'Revisado') return 60;
    if (status === 'Questões') return 80;
    if (status === 'Caderno de Erros') return 90;
    return 0;
  }

  function activeDisciplines() {
    return state.disciplines
      .filter(d => d.active && d.mode !== 'Em espera' && effectiveHours(d) > 0)
      .sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999) || a.name.localeCompare(b.name, 'pt-BR'));
  }

  function cycleArray() {
    const base = activeDisciplines();
    if (!base.length) return [];
    const remaining = base.map(d => ({ disc: d, left: Math.max(1, parseIntSafe(d.frequency || 1)), order: Number(d.order) || 999 }));
    const out = [];

    // Frequência significa presença distribuída, não repetição grudada.
    // Ex.: Português 2x + DCON 1x + DAD 1x => Português → DCON → Português → DAD.
    while (remaining.some(x => x.left > 0)) {
      const last = out[out.length - 1];
      let candidates = remaining.filter(x => x.left > 0 && (!last || x.disc.id !== last.id));
      if (!candidates.length) candidates = remaining.filter(x => x.left > 0);
      candidates.sort((a, b) => b.left - a.left || a.order - b.order || a.disc.name.localeCompare(b.disc.name, 'pt-BR'));
      const chosen = candidates[0];
      out.push(chosen.disc);
      chosen.left -= 1;
    }
    return out;
  }

  function suggestedSessions() {
    const cycle = cycleArray();
    const available = parseHours(state.settings.dailyHours);
    if (!cycle.length || available <= 0) return [];
    const count = state.sessions.length;
    let cursor = count % cycle.length;
    let remaining = available;
    const out = [];
    const guard = Math.min(cycle.length * 3, 30);
    for (let i = 0; i < guard; i += 1) {
      const disc = cycle[cursor % cycle.length];
      const hours = effectiveHours(disc);
      if (hours <= 0) { cursor += 1; continue; }
      if (hours <= remaining + 0.0001) {
        out.push({ discipline: disc, hours, mode: disc.mode, subject: nextSubjectFor(disc), action: actionForMode(disc.mode) });
        remaining -= hours;
      }
      cursor += 1;
      if (remaining <= 0.001) break;
      if (out.length > 0 && i >= cycle.length - 1 && remaining < Math.min(...cycle.map(effectiveHours))) break;
    }
    return out;
  }

  function actionForMode(mode) {
    if (mode === 'Teoria') return 'Aula/PDF + marcações essenciais';
    if (mode === 'Revisão') return 'Revisão objetiva + questões de fixação';
    if (mode === 'Questões') return 'Caderno de questões + correção ativa';
    if (mode === 'Caderno de Erros') return 'Rever erros recorrentes + anotar padrão';
    return 'Ajustar modo no Ciclo';
  }

  function nextSubjectFor(disc) {
    const topics = topicsForDiscipline(disc);
    if (topics.length) {
      const candidate = topics.find(t => t.status === 'Em espera' || t.status === 'Estudando') || topics[0];
      return candidate.title;
    }
    const last = [...state.sessions].reverse().find(s => s.disciplineId === disc.id || s.disciplineName === disc.name);
    if (last && last.subject) return `Continuar após: ${last.subject}`;
    return 'Definir no registro da sessão';
  }

  function sessionsByPeriod() {
    const today = todayISO();
    const week = weekStartISO();
    const month = monthKey(today);
    const isThisWeek = s => s.date >= week;
    const isThisMonth = s => monthKey(s.date) === month;
    return {
      today: state.sessions.filter(s => s.date === today),
      week: state.sessions.filter(isThisWeek),
      month: state.sessions.filter(isThisMonth),
      total: state.sessions
    };
  }

  function sum(list, key) {
    return list.reduce((acc, item) => acc + Number(item[key] || 0), 0);
  }

  function accuracy(list) {
    const q = sum(list, 'questions');
    const c = sum(list, 'correct');
    return q > 0 ? Math.round((c / q) * 100) : 0;
  }

  function lastContact(disc) {
    const relevant = state.sessions.filter(s => s.disciplineId === disc.id || s.disciplineName === disc.name);
    if (!relevant.length) return null;
    return relevant.map(s => s.date).sort().at(-1);
  }

  function daysSince(iso) {
    if (!iso) return null;
    const today = new Date(todayISO() + 'T00:00:00');
    const then = new Date(iso + 'T00:00:00');
    return Math.round((today - then) / 86400000);
  }

  function buildAttackItems() {
    const items = [];
    activeDisciplines().forEach(d => {
      const list = state.sessions.filter(s => s.disciplineId === d.id || s.disciplineName === d.name);
      const pct = accuracy(list);
      const days = daysSince(lastContact(d));
      const topics = topicsForDiscipline(d);
      const errorTopics = topics.filter(t => t.status === 'Caderno de Erros').slice(0, 3);
      const waitingTopics = topics.filter(t => t.status === 'Em espera').slice(0, 2);
      if (!list.length) items.push({ type: 'Sem registro', discipline: d.name, reason: 'Disciplina ativa ainda sem registro.', action: 'Executar primeira sessão.', score: 90 });
      if (days !== null && days >= Number(state.settings.neglectDays || 7)) items.push({ type: 'Sem contato', discipline: d.name, reason: `${days} dias sem contato.`, action: 'Fazer revisão curta ou questões.', score: 80 + Math.min(days, 20) });
      if (list.length && pct > 0 && pct < Number(state.settings.minAccuracy || 70)) items.push({ type: 'Baixo acerto', discipline: d.name, reason: `${pct}% de acertos.`, action: 'Caderno de erros + questões direcionadas.', score: 95 - pct });
      errorTopics.forEach(t => items.push({ type: 'Tópico em erros', discipline: d.name, reason: t.title, action: 'Revisar caderno de erros deste tópico.', score: 92 }));
      if (!list.length && waitingTopics.length) waitingTopics.forEach(t => items.push({ type: 'Próximo tópico', discipline: d.name, reason: t.title, action: 'Iniciar ou planejar esse tópico.', score: 70 }));
    });
    state.errors.filter(e => e.status !== 'Resolvido').forEach(e => {
      items.push({ type: 'Erro aberto', discipline: e.disciplineName, reason: e.subject || e.errorType || 'Erro registrado.', action: e.nextAction || 'Revisar erro.', score: 88 });
    });
    return items.sort((a, b) => b.score - a.score).slice(0, 16);
  }

  function disciplineOptions() {
    return state.disciplines
      .slice()
      .sort((a,b) => a.name.localeCompare(b.name, 'pt-BR'))
      .map(d => `<option value="${escapeHTML(d.name)}"></option>`).join('');
  }

  function modeOptions(selected) {
    return MODES.filter(m => m !== 'Em espera').map(m => `<option value="${m}" ${m === selected ? 'selected' : ''}>${m}</option>`).join('');
  }

  function renderLayout(content) {
    const navItems = [
      ['hoje', 'Hoje'], ['registrar', 'Registrar'], ['sessao', 'Sessão'], ['ciclo', 'Ciclo'], ['conteudo', 'Conteúdo'], ['progresso', 'Progresso'], ['ataque', 'Ataque'], ['erros', 'Erros'], ['fontes', 'Fontes'], ['backup', 'Backup'], ['config', 'Config.'], ['ajuda', 'Ajuda']
    ];
    $app.innerHTML = `
      <header class="hero">
        <div class="hero-inner">
          <div class="topbar">
            <div class="brand">
              <img class="logo" src="assets/icons/icon-128.png" alt="TCU Study OS" />
              <div><h1>TCU Study OS</h1><p>Sistema vivo de ciclo, progresso e aprovação</p></div>
            </div>
            <div class="top-actions">
              <button class="ghost-btn" data-action="refresh">Atualizar</button>
              <button class="ghost-btn" data-nav="ajuda">Ajuda</button>
            </div>
          </div>
          <nav class="nav" aria-label="Navegação principal">
            ${navItems.map(([route, label]) => `<button class="nav-btn ${currentRoute === route ? 'active' : ''}" data-nav="${route}">${label}</button>`).join('')}
          </nav>
        </div>
      </header>
      <main class="container">${content}</main>
      <div class="footer-nav"><div class="footer-nav-inner">
        ${[['hoje','Hoje'],['registrar','Registrar'],['historico','Histórico'],['progresso','Progresso'],['ataque','Ataque']].map(([route,label]) => `<button class="${currentRoute===route?'active':''}" data-nav="${route}">${label}</button>`).join('')}
      </div></div>
    `;
    attachGlobalEvents();
  }

  function attachGlobalEvents() {
    document.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.nav)));
    document.querySelectorAll('[data-action="refresh"]').forEach(btn => btn.addEventListener('click', () => { state = loadState(); render(); toast('Dados atualizados.'); }));
  }

  function toast(message) {
    const el = document.createElement('div');
    el.className = 'notice';
    el.style.position = 'fixed';
    el.style.zIndex = '1000';
    el.style.left = '50%';
    el.style.bottom = '24px';
    el.style.transform = 'translateX(-50%)';
    el.style.boxShadow = 'var(--shadow)';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  function parseISODateLocal(iso) {
    const [y, m, d] = String(iso || '').split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  function dateToISODate(dt) {
    if (!(dt instanceof Date) || Number.isNaN(dt.getTime())) return '';
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function addDaysISO(iso, days) {
    const dt = parseISODateLocal(iso);
    if (!dt) return '';
    dt.setDate(dt.getDate() + days);
    return dateToISODate(dt);
  }

  function isStudyDay(iso) {
    const dt = parseISODateLocal(iso);
    if (!dt) return false;
    const isSunday = dt.getDay() === 0;
    return state.settings.sundayStudy || !isSunday;
  }

  function previousStudyDayISO(iso) {
    let cur = addDaysISO(iso, -1);
    let guard = 0;
    while (cur && !isStudyDay(cur) && guard < 10) { cur = addDaysISO(cur, -1); guard += 1; }
    return cur;
  }

  function studyDatesSet() {
    return new Set(state.sessions.map(s => s.date).filter(Boolean));
  }

  function constancyStats() {
    const set = studyDatesSet();
    if (!set.size) return { current: 0, best: 0, studiedDays: 0, last: null };
    const dates = Array.from(set).sort();
    let best = 0;
    let run = 0;
    let prev = null;
    dates.forEach(iso => {
      if (!isStudyDay(iso)) return;
      if (!prev) run = 1;
      else run = previousStudyDayISO(iso) === prev ? run + 1 : 1;
      if (run > best) best = run;
      prev = iso;
    });

    let anchor = todayISO();
    if (!set.has(anchor)) anchor = previousStudyDayISO(anchor);
    let current = 0;
    let guard = 0;
    while (anchor && guard < 1000) {
      if (isStudyDay(anchor)) {
        if (!set.has(anchor)) break;
        current += 1;
      }
      anchor = previousStudyDayISO(anchor);
      guard += 1;
    }
    const last = dates[dates.length - 1] || null;
    return { current, best, studiedDays: dates.length, last };
  }

  function cycleShareItems() {
    const arr = cycleArray();
    const map = new Map();
    arr.forEach(d => {
      const key = d.name;
      if (!map.has(key)) map.set(key, { name: key, count: 0, color: '' });
      map.get(key).count += 1;
    });
    const colors = ['#74ff52', '#00d8a6', '#b7ff63', '#1bbd72', '#0fae8d', '#d8ff7a', '#7be4ff', '#a5ff9d'];
    const total = arr.length || 1;
    return Array.from(map.values()).map((it, idx) => ({ ...it, color: colors[idx % colors.length], pct: Math.round((it.count / total) * 100) }));
  }

  function colorForCycleName(name, idx = 0) {
    const colors = ['#74ff52', '#00d8a6', '#b7ff63', '#1bbd72', '#0fae8d', '#d8ff7a', '#7be4ff', '#a5ff9d'];
    const items = cycleShareItems();
    const found = items.find(it => it.name === name);
    if (found) return found.color;
    return colors[idx % colors.length];
  }

  function renderCyclePizza() {
    const sequence = cycleArray();
    const items = cycleShareItems();
    if (!sequence.length) return '<div class="card"><h3>Ciclo em pizza</h3><p class="empty">Ative disciplinas no Ciclo para montar o gráfico.</p></div>';
    const step = 100 / sequence.length;
    let acc = 0;
    const segments = sequence.map((d, idx) => {
      const start = acc;
      acc += step;
      return `${colorForCycleName(d.name, idx)} ${start}% ${acc}%`;
    });
    if (acc < 100) segments.push(`${colorForCycleName(sequence[sequence.length - 1].name, sequence.length - 1)} ${acc}% 100%`);
    return `
      <div class="card cycle-pizza-card">
        <div class="section-title compact"><h3>Ciclo em pizza</h3><span class="badge dark">${sequence.length} etapa(s)</span></div>
        <div class="cycle-pizza-wrap">
          <div class="cycle-pizza" style="background: conic-gradient(${segments.join(', ')})"><span>Ciclo</span></div>
          <div class="cycle-legend">${items.map(it => `<div><i style="background:${it.color}"></i><strong>${escapeHTML(it.name)}</strong><span>${it.count}x · ${it.pct}%</span></div>`).join('')}</div>
        </div>
        <p class="muted cycle-order-line"><strong>Ordem real:</strong> ${sequence.map(d => escapeHTML(d.name)).join(' → ')}</p>
        <p class="muted">Quando uma disciplina aparece 2x ou mais, o app distribui as repetições separadas no ciclo sempre que possível.</p>
      </div>`;
  }



  function groupSessionsBy(keyFn) {
    const map = new Map();
    state.sessions.forEach(s => {
      const key = keyFn(s);
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    });
    return map;
  }

  function bestDailyHours() {
    const grouped = groupSessionsBy(s => s.date);
    let best = { key: '', hours: 0, sessions: 0 };
    grouped.forEach((list, key) => {
      const hours = sum(list, 'hours');
      if (hours > best.hours) best = { key, hours, sessions: list.length };
    });
    return best;
  }

  function bestMonthStats() {
    const grouped = groupSessionsBy(s => monthKey(s.date));
    let best = { key: '', hours: 0, sessions: 0 };
    grouped.forEach((list, key) => {
      const hours = sum(list, 'hours');
      if (hours > best.hours) best = { key, hours, sessions: list.length };
    });
    return best;
  }

  function bestWeekStats() {
    const grouped = groupSessionsBy(s => weekStartISO(new Date(String(s.date || todayISO()) + 'T12:00:00')));
    let best = { key: '', hours: 0, sessions: 0 };
    grouped.forEach((list, key) => {
      const hours = sum(list, 'hours');
      if (hours > best.hours) best = { key, hours, sessions: list.length };
    });
    return best;
  }

  function bestAccuracyDay() {
    const grouped = groupSessionsBy(s => s.date);
    let best = { key: '', pct: 0, questions: 0, correct: 0 };
    grouped.forEach((list, key) => {
      const questions = sum(list, 'questions');
      const correct = sum(list, 'correct');
      const pct = questions ? Math.round((correct / questions) * 100) : 0;
      if (questions > 0 && (pct > best.pct || (pct === best.pct && questions > best.questions))) {
        best = { key, pct, questions, correct };
      }
    });
    return best;
  }

  function bestQuestionDay() {
    const grouped = groupSessionsBy(s => s.date);
    let best = { key: '', questions: 0, correct: 0 };
    grouped.forEach((list, key) => {
      const questions = sum(list, 'questions');
      const correct = sum(list, 'correct');
      if (questions > best.questions) best = { key, questions, correct };
    });
    return best;
  }

  function bestDisciplineAccuracy() {
    const grouped = groupSessionsBy(s => s.disciplineId || normalizeName(s.disciplineName));
    let best = { name: '', pct: 0, questions: 0, correct: 0 };
    grouped.forEach((list, key) => {
      const questions = sum(list, 'questions');
      const correct = sum(list, 'correct');
      const pct = questions ? Math.round((correct / questions) * 100) : 0;
      const name = list[0] && list[0].disciplineName ? list[0].disciplineName : key;
      if (questions > 0 && (pct > best.pct || (pct === best.pct && questions > best.questions))) {
        best = { name, pct, questions, correct };
      }
    });
    return best;
  }

  function activeCycleProgressStats() {
    const active = activeDisciplines();
    const rows = active.map(d => {
      const topics = topicsForDiscipline(d);
      const total = topics.length;
      const progressed = topics.filter(t => t.status !== 'Em espera').length;
      const score = total ? Math.round(topics.reduce((acc, t) => acc + topicProgressValue(t.status), 0) / total) : 0;
      return { d, total, progressed, score };
    });
    const totalTopics = rows.reduce((acc, r) => acc + r.total, 0);
    const progressedTopics = rows.reduce((acc, r) => acc + r.progressed, 0);
    const weightedScore = totalTopics ? Math.round(rows.reduce((acc, r) => acc + r.score * r.total, 0) / totalTopics) : 0;
    const simplePct = totalTopics ? Math.round((progressedTopics / totalTopics) * 100) : 0;
    return { rows, totalTopics, progressedTopics, weightedScore, simplePct };
  }

  function recordCardsHTML() {
    const daily = bestDailyHours();
    const month = bestMonthStats();
    const week = bestWeekStats();
    const accDay = bestAccuracyDay();
    const qDay = bestQuestionDay();
    const discAcc = bestDisciplineAccuracy();
    return `
      <section class="grid cards-3" style="margin-top:18px">
        <div class="card record-card"><div class="label">Maior CH diária</div><div class="value">${fmt(daily.hours)}h</div><div class="hint">${daily.key ? formatDate(daily.key) + ' · ' + daily.sessions + ' sessão(ões)' : 'sem registro'}</div></div>
        <div class="card record-card"><div class="label">Melhor mês</div><div class="value">${fmt(month.hours)}h</div><div class="hint">${month.key || 'sem registro'}</div></div>
        <div class="card record-card"><div class="label">Melhor semana</div><div class="value">${fmt(week.hours)}h</div><div class="hint">início ${week.key ? formatDate(week.key) : '—'}</div></div>
        <div class="card record-card"><div class="label">Maior % diário</div><div class="value">${accDay.questions ? accDay.pct + '%' : '—'}</div><div class="hint">${accDay.questions ? formatDate(accDay.key) + ' · ' + accDay.correct + '/' + accDay.questions : 'sem questões'}</div></div>
        <div class="card record-card"><div class="label">Mais questões em um dia</div><div class="value">${qDay.questions}</div><div class="hint">${qDay.key ? formatDate(qDay.key) + ' · ' + qDay.correct + ' acertos' : 'sem questões'}</div></div>
        <div class="card record-card"><div class="label">Melhor disciplina</div><div class="value">${discAcc.questions ? discAcc.pct + '%' : '—'}</div><div class="hint">${discAcc.questions ? escapeHTML(discAcc.name) + ' · ' + discAcc.questions + ' questões' : 'sem questões'}</div></div>
      </section>`;
  }

  function activeCycleProgressHTML() {
    const stats = activeCycleProgressStats();
    if (!stats.rows.length) return `<section class="card" style="margin-top:18px"><h3>Avanço do ciclo ativo</h3><p class="empty">Ative disciplinas no Ciclo para acompanhar o avanço.</p></section>`;
    return `
      <section class="card" style="margin-top:18px">
        <div class="section-title compact"><h3>Avanço do ciclo ativo</h3><span class="badge dark">${stats.weightedScore}% maturidade</span></div>
        <div class="progress-bar big"><span style="width:${stats.weightedScore}%"></span></div>
        <p class="muted">${stats.progressedTopics}/${stats.totalTopics} tópico(s) já saíram de “Em espera”. O percentual considera somente disciplinas ativas no ciclo.</p>
        <div class="cycle-progress-list">
          ${stats.rows.map(r => `<div class="cycle-progress-row"><strong>${escapeHTML(r.d.name)}</strong><span>${r.progressed}/${r.total} tópicos · ${r.score}%</span><div class="progress-bar"><span style="width:${r.score}%"></span></div></div>`).join('')}
        </div>
      </section>`;
  }

  function achievementsHTML() {
    const totalHours = sum(state.sessions, 'hours');
    const totalQuestions = sum(state.sessions, 'questions');
    const streak = constancyStats();
    const goals = [
      ['Primeiras 10h', totalHours >= 10, `${fmt(totalHours)}/10h`],
      ['50h líquidas', totalHours >= 50, `${fmt(totalHours)}/50h`],
      ['100h líquidas', totalHours >= 100, `${fmt(totalHours)}/100h`],
      ['500 questões', totalQuestions >= 500, `${totalQuestions}/500`],
      ['1.000 questões', totalQuestions >= 1000, `${totalQuestions}/1000`],
      ['7 dias sem falhar', streak.best >= 7, `${streak.best}/7 dias`]
    ];
    return `<section class="card" style="margin-top:18px"><h3>Conquistas</h3><div class="achievement-grid">${goals.map(g => `<div class="achievement ${g[1] ? 'done' : ''}"><strong>${g[1] ? '✓' : '•'} ${g[0]}</strong><span>${g[2]}</span></div>`).join('')}</div></section>`;
  }

  function backupNoticeHTML() {
    const due = backupIsDue();
    const days = daysSinceBackup();
    if (!due) {
      return `<section class="notice ok" style="margin:16px 0"><strong>Backup em dia:</strong> último backup em ${lastBackupDateLabel()}.</section>`;
    }
    const text = days === null ? 'Você ainda não exportou backup.' : `Último backup há ${days} dia(s).`;
    return `<section class="notice warn" style="margin:16px 0"><strong>Backup recomendado:</strong> ${text} <button class="subtle-btn mini" id="home-export-backup" style="margin-left:8px">Exportar agora</button></section>`;
  }

  function liveGoalsHTML(periods) {
    const weekH = sum(periods.week, 'hours');
    const monthH = sum(periods.month, 'hours');
    const wGoal = Number(state.settings.weeklyGoal || 0);
    const mGoal = Number(state.settings.monthlyGoal || 0);
    const wPct = wGoal ? Math.min(100, Math.round((weekH / wGoal) * 100)) : 0;
    const mPct = mGoal ? Math.min(100, Math.round((monthH / mGoal) * 100)) : 0;
    return `<section class="grid cards-2" style="margin-top:16px">
      <div class="card"><div class="section-title compact"><h3>Meta semanal</h3><span class="badge">${fmt(weekH)}h / ${fmt(wGoal)}h</span></div><div class="progress-bar goal"><span style="width:${wPct}%"></span></div><p class="muted">Faltam ${fmt(Math.max(0, wGoal - weekH))}h para bater a meta da semana.</p></div>
      <div class="card"><div class="section-title compact"><h3>Meta mensal</h3><span class="badge">${fmt(monthH)}h / ${fmt(mGoal)}h</span></div><div class="progress-bar goal"><span style="width:${mPct}%"></span></div><p class="muted">Faltam ${fmt(Math.max(0, mGoal - monthH))}h para bater a meta do mês.</p></div>
    </section>`;
  }

  function renderHome() {
    const periods = sessionsByPeriod();
    const suggestions = suggestedSessions();
    const totalHoursToday = sum(periods.today, 'hours');
    const totalPlanned = suggestions.reduce((acc, s) => acc + Number(s.hours || 0), 0);
    const streak = constancyStats();
    const content = `
      <section class="banner"><h2>A Vaga [JÁ] é MINHA!!!</h2><p>Abra esta tela, execute as sessões sugeridas ou registre livremente o que estudou.</p></section>
      <section class="card">
        <h3>Hoje</h3>
        <div class="badges"><span class="badge">${dayName()}</span><span class="badge">${formatDate(todayISO())}</span></div>
        <p class="muted">Ciclo atual: <strong>${cycleArray().map(d => escapeHTML(d.name)).join(' → ') || 'nenhuma disciplina ativa'}</strong></p>
      </section>
      <section class="grid cards-4" style="margin-top:16px">
        <div class="card kpi"><div class="label">CH disponível</div><div class="value">${parseHours(state.settings.dailyHours)}h</div><div class="hint">Editável em Configurações</div></div>
        <div class="card kpi"><div class="label">Horas previstas</div><div class="value">${fmt(totalPlanned)}h</div><div class="hint">Sessões sugeridas</div></div>
        <div class="card kpi"><div class="label">Horas hoje</div><div class="value">${fmt(totalHoursToday)}h</div><div class="hint">Já registradas</div></div>
        <div class="card kpi"><div class="label">Acertos mês</div><div class="value">${accuracy(periods.month)}%</div><div class="hint">${sum(periods.month, 'questions')} questões</div></div>
      </section>
      <section class="grid cards-2" style="margin-top:16px">
        <div class="card constancy-card"><div class="section-title compact"><h3>Constância</h3><span class="badge">sem falhar</span></div><div class="constancy-values"><div><strong>${streak.current}</strong><span>dias atuais</span></div><div><strong>${streak.best}</strong><span>recorde</span></div><div><strong>${streak.studiedDays}</strong><span>dias estudados</span></div></div><p class="muted">Domingos não quebram a sequência quando estiverem configurados como descanso.</p></div>
        ${renderCyclePizza()}
      </section>
      ${activeCycleProgressHTML()}
      <div class="section-title"><h3>Sessões recomendadas</h3><button class="primary-btn" data-nav="registrar">+ Registrar sessão</button></div>
      <section class="grid cards-2">
        ${suggestions.length ? suggestions.map((s, idx) => renderSessionCard(s, idx)).join('') : `<div class="card span-12"><p class="empty">Nenhuma sessão automática agora. Você ainda pode registrar qualquer estudo em <strong>Registrar</strong>.</p></div>`}
      </section>
      ${liveGoalsHTML(periods)}
      ${backupNoticeHTML()}
      <section class="card soft" style="margin-top:18px">
        <strong>Registro livre:</strong> estudou DCON 2h30 e Português 2h? Vá em <strong>Registrar</strong> e lance uma disciplina por vez.
      </section>
    `;
    renderLayout(content);
    document.querySelectorAll('[data-register-suggestion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.registerSuggestion);
        const s = suggestions[idx];
        lastDraft = { discipline: s.discipline.name, mode: s.mode, hours: s.hours, subject: '' };
        navigate('registrar');
      });
    });
    document.querySelectorAll('[data-start-session]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.startSession);
        const s = suggestions[idx];
        lastDraft = { discipline: s.discipline.name, mode: s.mode, hours: s.hours, subject: '' };
        navigate('sessao');
      });
    });
    const homeBackup = document.getElementById('home-export-backup');
    if (homeBackup) homeBackup.addEventListener('click', () => { exportBackupFile(); toast('Backup exportado. Salve no iCloud/Drive.'); renderHome(); });
  }

  function renderSessionCard(s, idx) {
    const d = s.discipline;
    return `
      <div class="card session-card">
        <div>
          <div class="session-title">${escapeHTML(d.name)} — ${escapeHTML(s.mode)}</div>
          <div class="session-meta">${fmt(s.hours)}h · ${escapeHTML(s.action)}</div>
          <div class="badges"><span class="badge dark">Sessão ${idx + 1}</span><span class="badge">${escapeHTML(d.priority)}</span></div>
          <p class="muted"><strong>Assunto:</strong> ${escapeHTML(s.subject)}</p>
          ${d.sourceUrl ? `<p><a class="source-link" href="${escapeHTML(d.sourceUrl)}" target="_blank" rel="noreferrer">Abrir fonte: ${escapeHTML(d.source || d.name)}</a></p>` : ''}
        </div>
        <div class="table-actions">
          <button class="primary-btn" data-start-session="${idx}">Iniciar</button>
          <button class="subtle-btn" data-register-suggestion="${idx}">Registrar</button>
        </div>
      </div>`;
  }

  function fmt(n) {
    const value = Number(n || 0);
    if (Number.isInteger(value)) return String(value);
    return value.toFixed(1).replace('.', ',');
  }

  function getSessionById(id) {
    return state.sessions.find(s => s.id === id) || null;
  }

  function setEditSession(id) {
    const sess = getSessionById(id);
    if (!sess) { toast('Registro não encontrado.'); return; }
    editingSessionId = id;
    lastDraft = {
      date: sess.date || todayISO(),
      discipline: sess.disciplineName || '',
      mode: sess.mode || 'Teoria',
      subject: sess.subject || '',
      hours: sess.hours || '',
      questions: sess.questions || '',
      correct: sess.correct || '',
      notes: sess.notes || ''
    };
    navigate('registrar');
  }

  function deleteSession(id) {
    const sess = getSessionById(id);
    if (!sess) { toast('Registro não encontrado.'); return; }
    const ok = confirm(`Excluir o registro de ${sess.disciplineName} em ${formatDate(sess.date)}?`);
    if (!ok) return;
    state.sessions = state.sessions.filter(s => s.id !== id);
    saveState();
    toast('Registro excluído.');
    render();
  }

  function attachSessionActions() {
    document.querySelectorAll('[data-edit-session]').forEach(btn => {
      btn.addEventListener('click', () => setEditSession(btn.dataset.editSession));
    });
    document.querySelectorAll('[data-delete-session]').forEach(btn => {
      btn.addEventListener('click', () => deleteSession(btn.dataset.deleteSession));
    });
  }

  function renderRegister() {
    const editing = editingSessionId ? getSessionById(editingSessionId) : null;
    const draft = editing ? {
      date: editing.date || todayISO(), discipline: editing.disciplineName || '', mode: editing.mode || 'Teoria', subject: editing.subject || '', hours: editing.hours || '', questions: editing.questions || '', correct: editing.correct || '', notes: editing.notes || '', topicId: editing.topicId || ''
    } : (lastDraft || {});
    const isEditing = Boolean(editing);
    const content = `
      <section class="banner"><h2>${isEditing ? 'Editar registro' : 'Registrar sessão'}</h2><p>Registre uma disciplina por vez e vincule a um tópico cadastrado.</p></section>
      <section class="card">
        <div class="notice"><strong>Exemplo:</strong> DCON por 2h30 = preencha <strong>2.5</strong> ou <strong>2,5</strong>. O tópico muda de status automaticamente conforme o modo.</div>
        ${isEditing ? `<div class="notice" style="margin-top:12px"><strong>Modo edição:</strong> você está alterando um registro existente.</div>` : ''}
        <datalist id="discipline-list">${disciplineOptions()}</datalist>
        <form id="register-form" class="form-grid" style="margin-top:18px">
          <div class="field span-2"><label>Data</label><input id="reg-date" type="date" value="${escapeHTML(draft.date || todayISO())}" required /></div>
          <div class="field span-3"><label>Disciplina</label><input id="reg-discipline" list="discipline-list" placeholder="Ex.: DCON" value="${escapeHTML(draft.discipline || '')}" required /></div>
          <div class="field span-2"><label>Modo</label><select id="reg-mode">${modeOptions(draft.mode || 'Teoria')}</select></div>
          <div class="field span-5"><label>Tópico cadastrado</label><select id="reg-topic"><option value="">Selecione a disciplina para carregar tópicos...</option></select><div id="reg-topic-tec-link" class="field-help"></div></div>
          <div class="field span-6"><label>Assunto / ajuste livre</label><input id="reg-subject" placeholder="Ex.: Aplicabilidade das normas constitucionais" value="${escapeHTML(draft.subject || '')}" /></div>
          <div class="field span-2"><label>Horas</label><input id="reg-hours" inputmode="decimal" type="text" placeholder="2.5" value="${draft.hours !== undefined && draft.hours !== '' ? fmt(draft.hours) : ''}" required /></div>
          <div class="field span-2"><label>Questões</label><input id="reg-questions" type="number" min="0" step="1" placeholder="0" value="${draft.questions !== undefined && draft.questions !== '' ? escapeHTML(draft.questions) : ''}" /></div>
          <div class="field span-2"><label>Acertos</label><input id="reg-correct" type="number" min="0" step="1" placeholder="0" value="${draft.correct !== undefined && draft.correct !== '' ? escapeHTML(draft.correct) : ''}" /></div>
          <div class="field span-12"><label>Observação</label><textarea id="reg-notes" placeholder="Dificuldade, ponto fraco, fonte usada, próxima ação...">${escapeHTML(draft.notes || '')}</textarea></div>
          <div class="span-12 table-actions">
            <button class="primary-btn" type="submit">${isEditing ? 'Salvar alterações' : 'Salvar sessão'}</button>
            ${isEditing ? `<button class="subtle-btn" type="button" id="cancel-edit">Cancelar edição</button>` : `<button class="subtle-btn" type="button" id="fill-example">Exemplo DCON 2,5h</button>`}
            <button class="subtle-btn" type="button" data-nav="conteudo">Gerenciar conteúdo</button>
          </div>
        </form>
      </section>
      <section class="card" style="margin-top:18px"><div class="section-title"><h3>Últimos registros</h3><button class="subtle-btn" data-nav="historico">Ver histórico completo</button></div>${renderRecentSessions()}</section>
    `;
    renderLayout(content);
    const disciplineInput = document.getElementById('reg-discipline');
    const topicSelect = document.getElementById('reg-topic');
    const subjectInput = document.getElementById('reg-subject');
    function refreshTopicTecLink() {
      const linkBox = document.getElementById('reg-topic-tec-link');
      if (!linkBox) return;
      const topic = getTopicById(topicSelect.value);
      linkBox.innerHTML = topic && topic.tecUrl ? `<a class="source-link mini-link" href="${escapeHTML(topic.tecUrl)}" target="_blank" rel="noreferrer">Abrir caderno TEC deste tópico</a>` : '';
    }
    function refreshTopics(selectedId = '') {
      topicSelect.innerHTML = topicSelectOptions(disciplineInput.value, selectedId);
      refreshTopicTecLink();
    }
    refreshTopics(draft.topicId || '');
    disciplineInput.addEventListener('input', () => refreshTopics(''));
    topicSelect.addEventListener('change', () => {
      const topic = getTopicById(topicSelect.value);
      if (topic) subjectInput.value = topic.title;
      refreshTopicTecLink();
    });
    const example = document.getElementById('fill-example');
    if (example) {
      example.addEventListener('click', () => {
        document.getElementById('reg-date').value = todayISO();
        disciplineInput.value = 'DCON';
        document.getElementById('reg-mode').value = 'Teoria';
        refreshTopics('');
        const first = topicsForDiscipline('DCON')[0];
        if (first) { topicSelect.value = first.id; subjectInput.value = first.title; } else subjectInput.value = 'Aplicabilidade das normas constitucionais';
        document.getElementById('reg-hours').value = '2,5';
        document.getElementById('reg-questions').value = '25';
        document.getElementById('reg-correct').value = '17';
      });
    }
    const cancel = document.getElementById('cancel-edit');
    if (cancel) {
      cancel.addEventListener('click', () => { editingSessionId = null; lastDraft = null; renderRegister(); });
    }
    document.getElementById('register-form').addEventListener('submit', event => {
      event.preventDefault();
      const date = document.getElementById('reg-date').value || todayISO();
      const disciplineName = disciplineInput.value.trim();
      const mode = document.getElementById('reg-mode').value;
      const hours = parseHours(document.getElementById('reg-hours').value);
      const questions = parseIntSafe(document.getElementById('reg-questions').value);
      const correct = parseIntSafe(document.getElementById('reg-correct').value);
      if (!disciplineName || hours <= 0) { toast('Informe disciplina e horas.'); return; }
      if (correct > questions) { toast('Acertos não podem ser maiores que questões.'); return; }
      const disc = ensureDiscipline(disciplineName, mode);
      const subject = subjectInput.value.trim();
      const topic = updateTopicAfterSession(topicSelect.value, disc, subject, mode);
      const payload = {
        date, updatedAt: new Date().toISOString(), disciplineId: disc.id, disciplineName: disc.name, topicId: topic ? topic.id : '', mode, subject: subject || (topic ? topic.title : ''), hours, questions, correct, notes: document.getElementById('reg-notes').value.trim()
      };
      if (editingSessionId) {
        const idx = state.sessions.findIndex(s => s.id === editingSessionId);
        if (idx >= 0) { state.sessions[idx] = { ...state.sessions[idx], ...payload }; toast(`Registro atualizado: ${disc.name} · ${fmt(hours)}h`); }
        else { state.sessions.push({ id: uid('sess'), createdAt: new Date().toISOString(), ...payload }); toast(`Sessão registrada: ${disc.name} · ${fmt(hours)}h`); }
      } else {
        state.sessions.push({ id: uid('sess'), createdAt: new Date().toISOString(), ...payload }); toast(`Sessão registrada: ${disc.name} · ${fmt(hours)}h`);
      }
      saveState();
      if (state.settings.autoExportAfterRegister) {
        setTimeout(() => { exportBackupFile(); toast('Backup JSON exportado automaticamente. Salve no iCloud/Drive.'); }, 120);
      } else if (backupIsDue()) {
        setTimeout(() => toast('Backup recomendado: exporte seu JSON hoje.'), 900);
      }
      editingSessionId = null; lastDraft = null; renderRegister();
    });
    attachSessionActions();
  }

  function renderRecentSessions() {
    const recent = state.sessions.slice().reverse().slice(0, 8);
    if (!recent.length) return '<p class="empty">Nenhum registro ainda.</p>';
    return `<div class="table-wrap"><table><thead><tr><th>Data</th><th>Disciplina</th><th>Modo</th><th>Assunto</th><th>Horas</th><th>Questões</th><th>Acertos</th><th>Ações</th></tr></thead><tbody>${recent.map(s => `<tr><td>${formatDate(s.date)}</td><td>${escapeHTML(s.disciplineName)}</td><td>${escapeHTML(s.mode)}</td><td>${escapeHTML(s.subject || '-')}</td><td>${fmt(s.hours)}h</td><td>${s.questions || 0}</td><td>${s.correct || 0}</td><td><button class="subtle-btn mini" data-edit-session="${escapeHTML(s.id)}">Editar</button> <button class="danger-btn mini" data-delete-session="${escapeHTML(s.id)}">Excluir</button></td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderHistory() {
    const sorted = state.sessions.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    const filtered = sorted.filter(sess => {
      if (historyFilters.discipline && normalizeName(sess.disciplineName) !== normalizeName(historyFilters.discipline)) return false;
      if (historyFilters.mode && sess.mode !== historyFilters.mode) return false;
      if (historyFilters.from && String(sess.date) < historyFilters.from) return false;
      if (historyFilters.to && String(sess.date) > historyFilters.to) return false;
      const q = normalizeName(historyFilters.q || '');
      if (q && !`${normalizeName(sess.subject)} ${normalizeName(sess.notes)} ${normalizeName(sess.disciplineName)}`.includes(q)) return false;
      return true;
    });
    const totalHours = sum(filtered, 'hours');
    const content = `
      <section class="banner"><h2>Histórico</h2><p>Filtre, revise, edite ou exclua registros já lançados.</p></section>
      <section class="card">
        <div class="form-grid">
          <div class="field span-3"><label>Disciplina</label><select id="hist-disc"><option value="">Todas</option>${state.disciplines.map(d => `<option value="${escapeHTML(d.name)}" ${historyFilters.discipline===d.name?'selected':''}>${escapeHTML(d.name)}</option>`).join('')}</select></div>
          <div class="field span-2"><label>Modo</label><select id="hist-mode"><option value="">Todos</option>${MODES.filter(m=>m!=='Em espera').map(m => `<option ${historyFilters.mode===m?'selected':''}>${m}</option>`).join('')}</select></div>
          <div class="field span-2"><label>De</label><input id="hist-from" type="date" value="${escapeHTML(historyFilters.from)}"></div>
          <div class="field span-2"><label>Até</label><input id="hist-to" type="date" value="${escapeHTML(historyFilters.to)}"></div>
          <div class="field span-3"><label>Busca</label><input id="hist-q" value="${escapeHTML(historyFilters.q)}" placeholder="assunto/obs."></div>
          <div class="span-12 table-actions"><button class="primary-btn" id="apply-history-filter">Aplicar filtros</button><button class="subtle-btn" id="clear-history-filter">Limpar</button></div>
        </div>
      </section>
      <section class="grid cards-4" style="margin-top:18px">
        <div class="card kpi"><div class="label">Sessões</div><div class="value">${filtered.length}</div><div class="hint">no filtro</div></div>
        <div class="card kpi"><div class="label">Horas</div><div class="value">${fmt(totalHours)}h</div><div class="hint">no filtro</div></div>
        <div class="card kpi"><div class="label">Questões</div><div class="value">${sum(filtered, 'questions')}</div><div class="hint">no filtro</div></div>
        <div class="card kpi"><div class="label">Acertos</div><div class="value">${accuracy(filtered)}%</div><div class="hint">no filtro</div></div>
      </section>
      <section class="card" style="margin-top:18px">
        ${filtered.length ? `<div class="table-wrap"><table><thead><tr><th>Data</th><th>Disciplina</th><th>Modo</th><th>Assunto</th><th>Horas</th><th>Questões</th><th>Acertos</th><th>Obs.</th><th>Ações</th></tr></thead><tbody>${filtered.map(s => `<tr><td>${formatDate(s.date)}</td><td>${escapeHTML(s.disciplineName)}</td><td>${escapeHTML(s.mode)}</td><td>${escapeHTML(s.subject || '-')}</td><td>${fmt(s.hours)}h</td><td>${s.questions || 0}</td><td>${s.correct || 0}</td><td>${escapeHTML(s.notes || '')}</td><td><button class="subtle-btn mini" data-edit-session="${escapeHTML(s.id)}">Editar</button> <button class="danger-btn mini" data-delete-session="${escapeHTML(s.id)}">Excluir</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Nenhum registro encontrado com os filtros atuais.</p>'}
      </section>
    `;
    renderLayout(content);
    document.getElementById('apply-history-filter').addEventListener('click', () => {
      historyFilters = {
        discipline: document.getElementById('hist-disc').value,
        mode: document.getElementById('hist-mode').value,
        from: document.getElementById('hist-from').value,
        to: document.getElementById('hist-to').value,
        q: document.getElementById('hist-q').value.trim()
      };
      renderHistory();
    });
    document.getElementById('clear-history-filter').addEventListener('click', () => {
      historyFilters = { discipline: '', mode: '', from: '', to: '', q: '' };
      renderHistory();
    });
    attachSessionActions();
  }

  function renderSession() {
    const suggestions = suggestedSessions();
    const draft = lastDraft || (suggestions[0] ? { discipline: suggestions[0].discipline.name, mode: suggestions[0].mode, hours: suggestions[0].hours } : null);
    const content = `
      <section class="banner"><h2>Sessão</h2><p>${draft ? `${escapeHTML(draft.discipline)} · ${escapeHTML(draft.mode)} · ${fmt(draft.hours)}h` : 'Nenhuma sessão automática. Você pode registrar livremente.'}</p></section>
      <section class="card">
        <div class="grid cards-3">
          <div class="kpi"><div class="label">Bloco 1</div><div class="value" id="timer-min">50</div><div class="hint">minutos de foco</div></div>
          <div class="kpi"><div class="label">Pausa</div><div class="value">10</div><div class="hint">minutos</div></div>
          <div class="kpi"><div class="label">Registro</div><div class="value">1</div><div class="hint">disciplina por vez</div></div>
        </div>
        <div class="table-actions" style="margin-top:18px">
          <button class="primary-btn" id="start-50">Iniciar 50 min</button>
          <button class="subtle-btn" id="start-10">Pausa 10 min</button>
          <button class="subtle-btn" id="go-register">Registrar esta sessão</button>
        </div>
        <p class="muted" id="timer-status" style="margin-top:14px">Timer visual simples. Se fechar a aba, ele para.</p>
      </section>
    `;
    renderLayout(content);
    let timer = null;
    function start(minutes) {
      clearInterval(timer);
      let seconds = minutes * 60;
      const minEl = document.getElementById('timer-min');
      const status = document.getElementById('timer-status');
      function tick() {
        const m = Math.floor(seconds / 60);
        const s = String(seconds % 60).padStart(2, '0');
        minEl.textContent = `${m}:${s}`;
        if (seconds <= 0) { clearInterval(timer); status.textContent = 'Tempo finalizado. Registre a sessão.'; return; }
        seconds -= 1;
      }
      tick();
      status.textContent = `Timer iniciado: ${minutes} minutos.`;
      timer = setInterval(tick, 1000);
    }
    document.getElementById('start-50').addEventListener('click', () => start(50));
    document.getElementById('start-10').addEventListener('click', () => start(10));
    document.getElementById('go-register').addEventListener('click', () => navigate('registrar'));
  }

  function renderCycle() {
    const rows = state.disciplines.slice().sort((a,b) => (Number(a.order)||999) - (Number(b.order)||999));
    const content = `
      <section class="banner"><h2>Ciclo</h2><p>Ative disciplinas, defina modo, ordem, carga e fontes.</p></section>
      <section class="card">
        <form id="add-disc-form" class="form-grid">
          <div class="field span-5"><label>Nova disciplina</label><input id="new-disc-name" placeholder="Ex.: Administração Pública" /></div>
          <div class="field span-3"><label>Modo inicial</label><select id="new-disc-mode">${MODES.map(m => `<option>${m}</option>`).join('')}</select></div>
          <div class="field span-2"><label>Prioridade</label><select id="new-disc-priority">${PRIORITIES.map(p => `<option>${p}</option>`).join('')}</select></div>
          <div class="span-2"><button class="primary-btn" type="submit">Adicionar</button></div>
        </form>
      </section>
      <section class="card" style="margin-top:18px">
        <div class="table-wrap"><table><thead><tr><th>Ativa</th><th>Disciplina</th><th>Modo</th><th>CH</th><th>CH manual</th><th>Ordem</th><th>Freq.</th><th>Prior.</th><th>Fonte URL</th><th></th></tr></thead><tbody>
          ${rows.map(d => `<tr data-id="${escapeHTML(d.id)}">
            <td><input class="checkbox cycle-active" type="checkbox" ${d.active ? 'checked' : ''}></td>
            <td><input class="inline-input cycle-name" value="${escapeHTML(d.name)}"></td>
            <td><select class="inline-select cycle-mode">${MODES.map(m => `<option ${d.mode===m?'selected':''}>${m}</option>`).join('')}</select></td>
            <td><strong>${fmt(effectiveHours(d))}h</strong></td>
            <td><input class="inline-input cycle-manual" value="${escapeHTML(d.manualHours || '')}" placeholder="auto"></td>
            <td><input class="inline-input cycle-order" type="number" min="1" value="${escapeHTML(d.order)}"></td>
            <td><input class="inline-input cycle-frequency" type="number" min="1" value="${escapeHTML(d.frequency)}"></td>
            <td><select class="inline-select cycle-priority">${PRIORITIES.map(p => `<option ${d.priority===p?'selected':''}>${p}</option>`).join('')}</select></td>
            <td><input class="inline-input cycle-source-url" value="${escapeHTML(d.sourceUrl)}" placeholder="https://..."></td>
            <td><button class="subtle-btn" data-delete-disc="${escapeHTML(d.id)}">Remover</button></td>
          </tr>`).join('')}
        </tbody></table></div>
        <div class="table-actions" style="margin-top:16px"><button class="primary-btn" id="save-cycle">Salvar ciclo</button></div>
      </section>
    `;
    renderLayout(content);
    document.getElementById('add-disc-form').addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('new-disc-name').value.trim();
      if (!name) { toast('Informe o nome da disciplina.'); return; }
      const mode = document.getElementById('new-disc-mode').value;
      const disc = ensureDiscipline(name, mode);
      disc.active = mode !== 'Em espera';
      disc.priority = document.getElementById('new-disc-priority').value;
      saveState();
      toast(`${disc.name} adicionada.`);
      renderCycle();
    });
    document.getElementById('save-cycle').addEventListener('click', () => {
      document.querySelectorAll('tr[data-id]').forEach(row => {
        const id = row.dataset.id;
        const d = state.disciplines.find(x => x.id === id);
        if (!d) return;
        d.active = row.querySelector('.cycle-active').checked;
        d.name = row.querySelector('.cycle-name').value.trim() || d.name;
        d.mode = row.querySelector('.cycle-mode').value;
        d.manualHours = row.querySelector('.cycle-manual').value.trim();
        d.order = parseIntSafe(row.querySelector('.cycle-order').value) || d.order;
        d.frequency = Math.max(1, parseIntSafe(row.querySelector('.cycle-frequency').value) || 1);
        d.priority = row.querySelector('.cycle-priority').value;
        d.sourceUrl = row.querySelector('.cycle-source-url').value.trim();
      });
      saveState();
      toast('Ciclo salvo.');
      renderCycle();
    });
    document.querySelectorAll('[data-delete-disc]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.deleteDisc;
      const d = state.disciplines.find(x => x.id === id);
      if (d && confirm(`Remover ${d.name}? Os registros antigos serão preservados.`)) {
        state.disciplines = state.disciplines.filter(x => x.id !== id);
        saveState();
        renderCycle();
      }
    }));
  }


  function renderTopics() {
    const discRows = state.disciplines.slice().sort((a,b) => a.name.localeCompare(b.name, 'pt-BR'));
    const selected = topicFilterDiscipline || (discRows.find(d => d.active)?.id) || (discRows[0] ? discRows[0].id : '');
    const selectedDisc = getDisciplineById(selected) || discRows[0];
    const topics = selectedDisc ? topicsForDiscipline(selectedDisc) : [];
    const visibleTopics = topics.filter(t => {
      if (topicStatusFilter !== 'Todos' && t.status !== topicStatusFilter) return false;
      const q = normalizeName(topicSearch);
      if (q && !`${normalizeName(t.title)} ${normalizeName(t.details)} ${normalizeName(t.notes)}`.includes(q)) return false;
      return true;
    });
    const content = `
      <section class="banner"><h2>Conteúdo</h2><p>Seu edital vivo: tópicos, status, prioridade e caderno TEC.</p></section>
      <section class="card">
        <div class="form-grid">
          <div class="field span-3"><label>Disciplina</label><select id="topic-discipline">${discRows.map(d => `<option value="${escapeHTML(d.id)}" ${selectedDisc && d.id === selectedDisc.id ? 'selected' : ''}>${escapeHTML(d.name)}</option>`).join('')}</select></div>
          <div class="field span-2"><label>Status</label><select id="topic-status-filter"><option>Todos</option>${TOPIC_STATUSES.map(s => `<option ${topicStatusFilter===s?'selected':''}>${s}</option>`).join('')}</select></div>
          <div class="field span-3"><label>Buscar</label><input id="topic-search" value="${escapeHTML(topicSearch)}" placeholder="filtrar tópico"></div>
          <div class="field span-3"><label>Novo tópico</label><input id="new-topic-title" placeholder="Ex.: Controle de constitucionalidade" /></div>
          <div class="field span-1"><label>Status</label><select id="new-topic-status">${topicStatusOptions('Em espera')}</select></div>
          <div class="span-12 table-actions"><button class="primary-btn" id="add-topic-btn">Adicionar tópico</button><button class="subtle-btn" id="apply-topic-filter">Aplicar filtro</button><button class="subtle-btn" id="next-topic-btn">Próximo tópico</button></div>
        </div>
      </section>
      <section class="grid cards-4" style="margin-top:18px">
        <div class="card kpi"><div class="label">Tópicos</div><div class="value">${topics.length}</div><div class="hint">cadastrados</div></div>
        <div class="card kpi"><div class="label">Estudando</div><div class="value">${topics.filter(t=>t.status==='Estudando').length}</div><div class="hint">em andamento</div></div>
        <div class="card kpi"><div class="label">Revisados/Questões</div><div class="value">${topics.filter(t=>['Revisado','Questões'].includes(t.status)).length}</div><div class="hint">consolidação</div></div>
        <div class="card kpi"><div class="label">Caderno de Erros</div><div class="value">${topics.filter(t=>t.status==='Caderno de Erros').length}</div><div class="hint">ataque</div></div>
      </section>
      <section class="card" style="margin-top:18px">
        ${visibleTopics.length ? `<div class="table-wrap"><table><thead><tr><th>Ordem</th><th>Tópico</th><th>Status</th><th>Prior.</th><th>Caderno TEC URL</th><th>Detalhes/observação</th><th>Ações</th></tr></thead><tbody>${visibleTopics.map(t => `<tr data-topic-id="${escapeHTML(t.id)}"><td><input class="inline-input topic-order" type="number" min="1" value="${escapeHTML(t.order)}"></td><td><input class="inline-input topic-title" value="${escapeHTML(t.title)}"></td><td><select class="inline-select topic-status">${topicStatusOptions(t.status)}</select></td><td><select class="inline-select topic-priority">${PRIORITIES.map(p => `<option ${t.priority===p?'selected':''}>${p}</option>`).join('')}</select></td><td><input class="inline-input topic-tec-url" value="${escapeHTML(t.tecUrl || '')}" placeholder="https://tecconcursos.com.br/...">${t.tecUrl ? `<a class="source-link mini-link" target="_blank" rel="noreferrer" href="${escapeHTML(t.tecUrl)}">Abrir TEC</a>` : ''}</td><td><textarea class="inline-input topic-notes" rows="2">${escapeHTML(t.notes || t.details || '')}</textarea></td><td><button class="primary-btn mini" data-register-topic="${escapeHTML(t.id)}">Registrar</button> <button class="danger-btn mini" data-delete-topic="${escapeHTML(t.id)}">Excluir</button></td></tr>`).join('')}</tbody></table></div><div class="table-actions" style="margin-top:16px"><button class="primary-btn" id="save-topics">Salvar tópicos</button></div>` : '<p class="empty">Nenhum tópico encontrado para os filtros atuais. Adicione um tópico ou limpe os filtros.</p>'}
      </section>
    `;
    renderLayout(content);
    const discSelect = document.getElementById('topic-discipline');
    const statusSelect = document.getElementById('topic-status-filter');
    const searchInput = document.getElementById('topic-search');
    discSelect.addEventListener('change', () => { topicFilterDiscipline = discSelect.value; renderTopics(); });
    document.getElementById('apply-topic-filter').addEventListener('click', () => { topicStatusFilter = statusSelect.value; topicSearch = searchInput.value.trim(); renderTopics(); });
    document.getElementById('next-topic-btn').addEventListener('click', () => {
      const next = topics.find(t => ['Em espera','Estudando'].includes(t.status)) || topics[0];
      if (!next || !selectedDisc) { toast('Nenhum tópico disponível.'); return; }
      lastDraft = { discipline: selectedDisc.name, mode: selectedDisc.mode === 'Em espera' ? 'Teoria' : selectedDisc.mode, hours: defaultHoursForMode(selectedDisc.mode === 'Em espera' ? 'Teoria' : selectedDisc.mode), subject: next.title, topicId: next.id };
      navigate('registrar');
    });
    document.getElementById('add-topic-btn').addEventListener('click', () => {
      const disc = getDisciplineById(discSelect.value);
      const title = document.getElementById('new-topic-title').value.trim();
      if (!disc || !title) { toast('Informe disciplina e tópico.'); return; }
      const topic = ensureTopic(disc, title);
      topic.status = document.getElementById('new-topic-status').value;
      saveState(); toast('Tópico adicionado.'); topicFilterDiscipline = disc.id; renderTopics();
    });
    const saveBtn = document.getElementById('save-topics');
    if (saveBtn) saveBtn.addEventListener('click', () => {
      document.querySelectorAll('tr[data-topic-id]').forEach(row => {
        const topic = getTopicById(row.dataset.topicId);
        if (!topic) return;
        topic.order = parseIntSafe(row.querySelector('.topic-order').value) || topic.order;
        topic.title = row.querySelector('.topic-title').value.trim() || topic.title;
        topic.status = row.querySelector('.topic-status').value;
        topic.priority = row.querySelector('.topic-priority').value;
        topic.tecUrl = row.querySelector('.topic-tec-url') ? row.querySelector('.topic-tec-url').value.trim() : (topic.tecUrl || '');
        topic.notes = row.querySelector('.topic-notes').value.trim();
      });
      saveState(); toast('Tópicos salvos.'); renderTopics();
    });
    document.querySelectorAll('[data-register-topic]').forEach(btn => btn.addEventListener('click', () => {
      const topic = getTopicById(btn.dataset.registerTopic);
      if (!topic) return;
      const disc = getDisciplineById(topic.disciplineId) || getDisciplineByName(topic.disciplineName);
      lastDraft = { discipline: disc ? disc.name : topic.disciplineName, mode: disc && disc.mode !== 'Em espera' ? disc.mode : 'Teoria', hours: disc ? effectiveHours(disc) || 2 : 2, subject: topic.title, topicId: topic.id };
      navigate('registrar');
    }));
    document.querySelectorAll('[data-delete-topic]').forEach(btn => btn.addEventListener('click', () => {
      const topic = getTopicById(btn.dataset.deleteTopic);
      if (topic && confirm(`Excluir tópico "${topic.title}"?`)) {
        state.topics = state.topics.filter(t => t.id !== topic.id);
        saveState(); renderTopics();
      }
    }));
  }

  function renderProgress() {
    const periods = sessionsByPeriod();
    const activeStats = activeCycleProgressStats();
    const content = `
      <section class="banner"><h2>Progresso</h2><p>Horas, questões, acertos, recordes e avanço real do ciclo.</p></section>
      <section class="grid cards-4">
        <div class="card kpi"><div class="label">Hoje</div><div class="value">${fmt(sum(periods.today, 'hours'))}h</div><div class="hint">${periods.today.length} sessão(ões)</div></div>
        <div class="card kpi"><div class="label">Semana</div><div class="value">${fmt(sum(periods.week, 'hours'))}h</div><div class="hint">meta ${fmt(state.settings.weeklyGoal)}h</div></div>
        <div class="card kpi"><div class="label">Mês</div><div class="value">${fmt(sum(periods.month, 'hours'))}h</div><div class="hint">meta ${fmt(state.settings.monthlyGoal)}h</div></div>
        <div class="card kpi"><div class="label">Acertos</div><div class="value">${accuracy(state.sessions)}%</div><div class="hint">${sum(state.sessions, 'questions')} questões</div></div>
      </section>
      <section class="grid cards-3" style="margin-top:18px">
        <div class="card kpi"><div class="label">Avanço do ciclo</div><div class="value">${activeStats.weightedScore}%</div><div class="hint">disciplinas ativas</div></div>
        <div class="card kpi"><div class="label">Tópicos ativos</div><div class="value">${activeStats.progressedTopics}/${activeStats.totalTopics}</div><div class="hint">fora de “Em espera”</div></div>
        <div class="card kpi"><div class="label">Constância</div><div class="value">${constancyStats().current}</div><div class="hint">recorde ${constancyStats().best} dia(s)</div></div>
      </section>
      ${activeCycleProgressHTML()}
      <section class="card" style="margin-top:18px"><h3>Recordes pessoais</h3><p class="muted">Marcos para manter motivação e visualizar evolução acumulada.</p>${recordCardsHTML()}</section>
      ${achievementsHTML()}
      <section class="card" style="margin-top:18px"><h3>Por disciplina</h3>${renderProgressTable()}</section>
    `;
    renderLayout(content);
  }

  function renderProgressTable() {
    const activeIds = new Set(activeDisciplines().map(d => d.id));
    const rows = state.disciplines.filter(d => activeIds.has(d.id)).map(d => {
      const list = state.sessions.filter(s => s.disciplineId === d.id || s.disciplineName === d.name);
      const monthList = list.filter(s => monthKey(s.date) === monthKey(todayISO()));
      const hrs = sum(list, 'hours');
      const q = sum(list, 'questions');
      const c = sum(list, 'correct');
      const pct = q ? Math.round((c / q) * 100) : 0;
      const last = lastContact(d);
      const days = daysSince(last);
      const topics = topicsForDiscipline(d);
      const topicScore = topics.length ? Math.round(topics.reduce((acc,t)=>acc+topicProgressValue(t.status),0)/topics.length) : 0;
      const activeTopics = topics.filter(t => t.status !== 'Em espera').length;
      return { d, hrs, monthHrs: sum(monthList, 'hours'), q, c, pct, days, topicScore, activeTopics, topicTotal: topics.length };
    }).sort((a,b) => b.topicScore - a.topicScore || b.hrs - a.hrs || a.d.name.localeCompare(b.d.name, 'pt-BR'));
    if (!rows.length) return '<p class="empty">Nenhuma disciplina ativa no ciclo. Ative disciplinas na aba Ciclo.</p>';
    return `<p class="muted">Esta tabela mostra apenas disciplinas ativas do ciclo. Disciplinas em espera ficam fora do cálculo motivacional.</p><div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Modo</th><th>Horas mês</th><th>Horas total</th><th>Questões</th><th>%</th><th>Tópicos</th><th>Progresso conteúdo</th><th>Último contato</th></tr></thead><tbody>${rows.map(r => `<tr><td><strong>${escapeHTML(r.d.name)}</strong></td><td>${escapeHTML(r.d.mode)}</td><td>${fmt(r.monthHrs)}h</td><td>${fmt(r.hrs)}h</td><td>${r.q}</td><td>${r.pct}%</td><td>${r.activeTopics}/${r.topicTotal}</td><td><div class="progress-bar"><span style="width:${r.topicScore}%"></span></div><span class="muted">${r.topicScore}%</span></td><td>${r.days === null ? '—' : `${r.days} dia(s)`}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderAttack() {
    const items = buildAttackItems();
    const content = `
      <section class="banner"><h2>Fila de Ataque</h2><p>Pontos que merecem reforço agora.</p></section>
      <section class="card">
        ${items.length ? `<div class="table-wrap"><table><thead><tr><th>Prioridade</th><th>Disciplina</th><th>Motivo</th><th>Ação</th></tr></thead><tbody>${items.map((it, i) => `<tr><td><span class="badge ${i<3?'danger':'warn'}">${i+1}</span></td><td><strong>${escapeHTML(it.discipline)}</strong><br><span class="muted">${escapeHTML(it.type)}</span></td><td>${escapeHTML(it.reason)}</td><td>${escapeHTML(it.action)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Nenhuma atenção crítica agora. Continue registrando.</p>'}
      </section>
    `;
    renderLayout(content);
  }

  function renderErrors() {
    const content = `
      <section class="banner"><h2>Caderno de Erros</h2><p>Registre padrões de erro e transforme fraqueza em ponto forte.</p></section>
      <section class="card">
        <datalist id="discipline-list">${disciplineOptions()}</datalist>
        <form id="error-form" class="form-grid">
          <div class="field span-3"><label>Disciplina</label><input id="err-discipline" list="discipline-list" placeholder="Ex.: DAD" required></div>
          <div class="field span-3"><label>Assunto</label><input id="err-subject" placeholder="Ex.: Atos administrativos"></div>
          <div class="field span-3"><label>Tipo</label><select id="err-type"><option>Falta de teoria</option><option>Esquecimento</option><option>Pegadinha</option><option>Desatenção</option><option>Interpretação</option><option>Confusão conceitual</option><option>Lei seca</option></select></div>
          <div class="field span-3"><label>Status</label><select id="err-status"><option>Aberto</option><option>Em revisão</option><option>Resolvido</option></select></div>
          <div class="field span-6"><label>Erro/descrição</label><textarea id="err-desc"></textarea></div>
          <div class="field span-6"><label>Correção/próxima ação</label><textarea id="err-action"></textarea></div>
          <div class="span-12"><button class="primary-btn" type="submit">Salvar erro</button></div>
        </form>
      </section>
      <section class="card" style="margin-top:18px"><h3>Erros registrados</h3>${renderErrorsTable()}</section>
    `;
    renderLayout(content);
    document.getElementById('error-form').addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('err-discipline').value.trim();
      if (!name) { toast('Informe a disciplina.'); return; }
      const disc = ensureDiscipline(name, 'Caderno de Erros');
      state.errors.push({
        id: uid('err'),
        date: todayISO(),
        createdAt: new Date().toISOString(),
        disciplineId: disc.id,
        disciplineName: disc.name,
        subject: document.getElementById('err-subject').value.trim(),
        errorType: document.getElementById('err-type').value,
        description: document.getElementById('err-desc').value.trim(),
        nextAction: document.getElementById('err-action').value.trim(),
        status: document.getElementById('err-status').value
      });
      saveState(); toast('Erro salvo.'); renderErrors();
    });
    document.querySelectorAll('[data-resolve-error]').forEach(btn => btn.addEventListener('click', () => {
      const e = state.errors.find(x => x.id === btn.dataset.resolveError);
      if (e) { e.status = 'Resolvido'; saveState(); renderErrors(); }
    }));
  }

  function renderErrorsTable() {
    if (!state.errors.length) return '<p class="empty">Nenhum erro registrado.</p>';
    return `<div class="table-wrap"><table><thead><tr><th>Data</th><th>Disciplina</th><th>Assunto</th><th>Tipo</th><th>Status</th><th>Ação</th><th></th></tr></thead><tbody>${state.errors.slice().reverse().map(e => `<tr><td>${formatDate(e.date)}</td><td>${escapeHTML(e.disciplineName)}</td><td>${escapeHTML(e.subject || '-')}</td><td>${escapeHTML(e.errorType)}</td><td>${escapeHTML(e.status)}</td><td>${escapeHTML(e.nextAction || '-')}</td><td>${e.status !== 'Resolvido' ? `<button class="subtle-btn" data-resolve-error="${e.id}">Resolver</button>` : ''}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderSources() {
    const rows = state.disciplines.slice().sort((a,b) => a.name.localeCompare(b.name, 'pt-BR'));
    const content = `
      <section class="banner"><h2>Fontes</h2><p>Links para cursos, PDFs, TEC, Drive e materiais.</p></section>
      <section class="card"><div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Fonte</th><th>URL</th><th>Abrir</th></tr></thead><tbody>${rows.map(d => `<tr data-source-id="${d.id}"><td><strong>${escapeHTML(d.name)}</strong></td><td><input class="inline-input src-name" value="${escapeHTML(d.source)}" placeholder="Ex.: Estratégia / TEC"></td><td><input class="inline-input src-url" value="${escapeHTML(d.sourceUrl)}" placeholder="https://..."></td><td>${d.sourceUrl ? `<a class="source-link" target="_blank" rel="noreferrer" href="${escapeHTML(d.sourceUrl)}">Abrir</a>` : '—'}</td></tr>`).join('')}</tbody></table></div><div class="table-actions" style="margin-top:16px"><button class="primary-btn" id="save-sources">Salvar fontes</button></div></section>
    `;
    renderLayout(content);
    document.getElementById('save-sources').addEventListener('click', () => {
      document.querySelectorAll('tr[data-source-id]').forEach(row => {
        const d = state.disciplines.find(x => x.id === row.dataset.sourceId);
        if (d) { d.source = row.querySelector('.src-name').value.trim(); d.sourceUrl = row.querySelector('.src-url').value.trim(); }
      });
      saveState(); toast('Fontes salvas.'); renderSources();
    });
  }

  function renderConfig() {
    const s = state.settings;
    const content = `
      <section class="banner"><h2>Configurações</h2><p>Altere sua rotina sem alterar código.</p></section>
      <section class="card">
        <form id="config-form" class="form-grid">
          <div class="field span-3"><label>CH diária atual</label><input id="cfg-daily" value="${fmt(s.dailyHours)}" inputmode="decimal"></div>
          <div class="field span-3"><label>Meta semanal</label><input id="cfg-weekly" value="${fmt(s.weeklyGoal)}" inputmode="decimal"></div>
          <div class="field span-3"><label>Meta mensal</label><input id="cfg-monthly" value="${fmt(s.monthlyGoal)}" inputmode="decimal"></div>
          <div class="field span-3"><label>Domingo estuda?</label><select id="cfg-sunday"><option ${s.sundayStudy?'':'selected'}>Não</option><option ${s.sundayStudy?'selected':''}>Sim</option></select></div>
          <div class="field span-3"><label>% mínimo de acerto</label><input id="cfg-acc" value="${s.minAccuracy}" type="number"></div>
          <div class="field span-3"><label>Dias sem contato</label><input id="cfg-days" value="${s.neglectDays}" type="number"></div>
          <div class="field span-3"><label>Lembrete de backup (dias)</label><input id="cfg-backup-days" value="${s.backupReminderDays || 1}" type="number" min="1"></div>
          <div class="field span-3"><label>Auto-exportar após registro?</label><select id="cfg-auto-export"><option ${s.autoExportAfterRegister?'':'selected'}>Não</option><option ${s.autoExportAfterRegister?'selected':''}>Sim</option></select></div>
          <div class="span-12"><button class="primary-btn" type="submit">Salvar configurações</button></div>
        </form>
      </section>
    `;
    renderLayout(content);
    document.getElementById('config-form').addEventListener('submit', e => {
      e.preventDefault();
      state.settings.dailyHours = parseHours(document.getElementById('cfg-daily').value);
      state.settings.weeklyGoal = parseHours(document.getElementById('cfg-weekly').value);
      state.settings.monthlyGoal = parseHours(document.getElementById('cfg-monthly').value);
      state.settings.sundayStudy = document.getElementById('cfg-sunday').value === 'Sim';
      state.settings.minAccuracy = parseIntSafe(document.getElementById('cfg-acc').value) || 70;
      state.settings.neglectDays = parseIntSafe(document.getElementById('cfg-days').value) || 7;
      state.settings.backupReminderDays = Math.max(1, parseIntSafe(document.getElementById('cfg-backup-days').value) || 1);
      state.settings.autoExportAfterRegister = document.getElementById('cfg-auto-export').value === 'Sim';
      state.settings.updatedAt = new Date().toISOString();
      saveState(); toast('Configurações salvas.'); renderConfig();
    });
  }

  function renderBackup() {
    let snapshots = [];
    try { snapshots = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || '[]'); } catch (_) { snapshots = []; }
    const content = `
      <section class="banner"><h2>Backup seguro</h2><p>Seus dados ficam no navegador. Exporte JSON para iCloud Drive/Google Drive como cofre.</p></section>
      <section class="grid cards-4">
        <div class="card kpi"><div class="label">Último backup</div><div class="value small-kpi">${lastBackupDateLabel()}</div><div class="hint">exportação manual</div></div>
        <div class="card kpi"><div class="label">Registros</div><div class="value">${state.sessions.length}</div><div class="hint">sessões salvas</div></div>
        <div class="card kpi"><div class="label">Tópicos</div><div class="value">${state.topics.length}</div><div class="hint">conteúdo cadastrado</div></div>
        <div class="card kpi"><div class="label">Snapshots locais</div><div class="value">${snapshots.length}</div><div class="hint">cópias no navegador</div></div>
      </section>
      ${backupIsDue() ? `<section class="notice warn" style="margin-top:18px"><strong>Atenção:</strong> backup externo recomendado. Exporte e salve no iCloud Drive ou Google Drive.</section>` : `<section class="notice ok" style="margin-top:18px"><strong>Backup em dia.</strong> Mantenha o JSON em local seguro.</section>`}
      <section class="grid cards-2" style="margin-top:18px">
        <div class="card"><h3>Exportar</h3><p class="muted">Baixe um arquivo JSON com todos os dados. Guarde no iCloud Drive ou Google Drive.</p><button class="primary-btn" id="export-json">Exportar backup agora</button><p class="muted" style="margin-top:10px">Auto-exportação após registro: <strong>${state.settings.autoExportAfterRegister ? 'ativada' : 'desativada'}</strong>. Ajuste em Configurações.</p></div>
        <div class="card"><h3>Importar</h3><p class="muted">Escolha se deseja substituir tudo ou mesclar com o que já existe.</p><input type="file" id="import-file" accept="application/json,.json" class="inline-input"><div class="table-actions" style="margin-top:12px"><button class="subtle-btn" id="import-merge">Importar mesclando</button><button class="danger-btn" id="import-replace">Substituir tudo</button></div></div>
      </section>
      <section class="card" style="margin-top:18px"><h3>Backup automático local</h3><p class="muted">A cada alteração importante, o app mantém até ${MAX_SNAPSHOTS} snapshots no próprio navegador. Isso não substitui o JSON salvo fora do navegador.</p>${snapshots.length ? `<div class="table-wrap"><table><thead><tr><th>Data</th><th>Registros</th><th>Tópicos</th><th>Ação</th></tr></thead><tbody>${snapshots.map((snp, idx) => `<tr><td>${new Date(snp.createdAt).toLocaleString('pt-BR')}</td><td>${snp.sessions}</td><td>${snp.topics}</td><td><button class="subtle-btn mini" data-restore-snapshot="${idx}">Restaurar</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Nenhum snapshot local ainda.</p>'}</section>
      <section class="card" style="margin-top:18px"><h3>Zona de segurança</h3><p class="muted">Use apenas se quiser limpar tudo e recomeçar.</p><button class="danger-btn" id="reset-data">Apagar todos os dados</button></section>
    `;
    renderLayout(content);
    document.getElementById('export-json').addEventListener('click', () => {
      exportBackupFile();
      toast('Backup exportado. Salve no iCloud/Drive.');
      renderBackup();
    });
    async function readImportFile() {
      const file = document.getElementById('import-file').files[0];
      if (!file) { toast('Selecione um arquivo JSON.'); return null; }
      const text = await file.text();
      return JSON.parse(text);
    }
    document.getElementById('import-merge').addEventListener('click', async () => {
      try {
        const imported = await readImportFile();
        if (!imported) return;
        state = mergeState(imported);
        saveState(); toast('Backup importado e mesclado.'); renderHome();
      } catch (err) { console.error(err); toast('Arquivo inválido.'); }
    });
    document.getElementById('import-replace').addEventListener('click', async () => {
      try {
        const imported = await readImportFile();
        if (!imported) return;
        if (!confirm('Substituir todos os dados atuais pelo backup?')) return;
        state = migrateState(imported);
        saveState(); toast('Backup importado, substituindo dados.'); renderHome();
      } catch (err) { console.error(err); toast('Arquivo inválido.'); }
    });
    document.querySelectorAll('[data-restore-snapshot]').forEach(btn => btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.restoreSnapshot);
      const snp = snapshots[idx];
      if (!snp || !snp.payload) return;
      if (!confirm('Restaurar este snapshot local?')) return;
      state = migrateState(snp.payload);
      saveState({ skipSnapshot: true });
      toast('Snapshot restaurado.'); renderHome();
    }));
    document.getElementById('reset-data').addEventListener('click', () => {
      if (confirm('Apagar todos os dados locais?')) { state = seedState(); saveState(); renderHome(); }
    });
  }

  function renderHelp() {
    const content = `
      <section class="banner"><h2>Como usar</h2><p>Fluxo simples para estudar por meses, até a aprovação.</p></section>
      <section class="grid cards-2">
        <div class="card"><h3>Rotina diária</h3><ol><li>Abra <strong>Hoje</strong> para ver sugestões do ciclo.</li><li>Estude uma disciplina.</li><li>Vá em <strong>Registrar</strong>.</li><li>Selecione a disciplina e o <strong>tópico cadastrado</strong>.</li><li>Salve <strong>uma disciplina por vez</strong>.</li><li>Se errar algum dado, abra <strong>Histórico</strong> e clique em Editar.</li><li>Confira <strong>Progresso</strong>.</li></ol></div>
        <div class="card"><h3>Conteúdo por disciplina</h3><p>A tela <strong>Conteúdo</strong> guarda os tópicos importados da planilha. Para cada tópico, marque: <strong>Estudando</strong>, <strong>Revisado</strong>, <strong>Em espera</strong>, <strong>Questões</strong> ou <strong>Caderno de Erros</strong>.</p><p>Você pode editar, incluir e remover tópicos a qualquer momento.</p></div>
        <div class="card"><h3>Regra de ouro</h3><p>O ciclo sugere, mas nunca bloqueia. Se você estudou algo diferente, registre mesmo assim.</p><p>Para 2h30, use <strong>2.5</strong> ou <strong>2,5</strong>.</p></div>
        <div class="card"><h3>Mac e iPad</h3><p>Hospede no GitHub Pages para acessar pelo Safari. Para sincronizar manualmente, use <strong>Backup</strong> e salve o JSON no iCloud Drive.</p><p>O app é local-first: cada dispositivo mantém seus dados até você importar/exportar backup.</p></div>
      </section>
    `;
    renderLayout(content);
  }

  function render() {
    if (currentRoute === 'hoje') return renderHome();
    if (currentRoute === 'registrar') return renderRegister();
    if (currentRoute === 'historico') return renderHistory();
    if (currentRoute === 'sessao') return renderSession();
    if (currentRoute === 'ciclo') return renderCycle();
    if (currentRoute === 'conteudo') return renderTopics();
    if (currentRoute === 'progresso') return renderProgress();
    if (currentRoute === 'ataque') return renderAttack();
    if (currentRoute === 'erros') return renderErrors();
    if (currentRoute === 'fontes') return renderSources();
    if (currentRoute === 'backup') return renderBackup();
    if (currentRoute === 'config') return renderConfig();
    if (currentRoute === 'ajuda') return renderHelp();
    return renderHome();
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./sw.js').catch(err => console.warn('Service worker não registrado:', err));
  }

  render();
})();
