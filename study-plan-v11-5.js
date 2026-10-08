(() => {
  'use strict';

  const STORE_KEY = 'tcu-study-os-pwa-v1';
  const PLAN_KEY = 'studyPlan20260908v2';
  const PLAN_VERSION = 1;
  const DRIVE_META_KEY = 'tcu-study-os-drive-sync-meta-v2';
  const NON_TCU_TAG = ' [NÃO TCU]';

  const DAD_TOPICS = [
    'Origem, Evolução e Princípios do Direito Administrativo',
    'Organização Administrativa - Desconcentração x Descentralização/ Setores/ Órgãos Públicos/ Administração Direta e Indireta',
    'Administração Pública Indireta - Introdução e Noções Gerais/ Autarquias/ Empresas Estatais/ Fundações Estatais',
    'Terceiro Setor: Serviço Social Autônomo, Organizações Sociais (OS), Organizações da Sociedade Civil de Interesse Público (OSCIPS) e Organizações da Sociedade Civil (OSC)',
    'Concessão e Permissão de Serviços Públicos - Conceito/ Princípios/ Classificações/ Concessão e Permissão/ Concessão Comum vs. Concessão Especial (PPP)/ Extinção da Concessão/ Discussão sobre Autorização de Serviço Público',
    'Código de Defesa do Usuário de Serviço Público [NÃO TCU]',
    'Consórcios Públicos',
    'Parcerias Público-Privadas (PPPs) [NÃO TCU]',
    'Poderes Administrativos - Visão Geral/ Poder Regulamentar/ Poder de Polícia/ Poder Hierárquico/ Poder Disciplinar',
    'Atos Administrativos',
    'Processo Administrativo',
    'Licitações e Contratos Administrativos',
    'Intervenção do Estado na Ordem Econômica',
    'Intervenção do Estado na Propriedade (Servidão Administrativa, Requisição, Ocupação Temporária, Limitações Administrativas e Tombamento) [NÃO TCU]',
    'Desapropriação [NÃO TCU]',
    'Bens Públicos',
    'Agentes Públicos',
    'Responsabilidade Civil do Estado',
    'Controle da Administração Pública',
    'Improbidade Administrativa',
    'Métodos Alternativos de Resolução de Conflitos nas Contratações Públicas: Conciliação/ Mediação/ Comitê de Resolução de Disputas/ Arbitragem',
    'Lei Anticorrupção'
  ];

  const PORT_TOPICS = [
    'Aula 1 | Acentuação Gráfica',
    'Aula 2 | Ortografia',
    'Aula 3 | Classes de Palavras',
    'Aula 4 | Classes de Palavras; Funções Sintáticas',
    'Aula 5 | Funções Sintáticas',
    'Aula 6 | Concordância Verbal; Concordância Nominal',
    'Aula 7 | Concordância Nominal; Regência Verbal',
    'Aula 8 | Regência Verbal; Crase; Colocação Pronominal',
    'Aula 9 | Colocação Pronominal',
    'Aula 10 | Colocação Pronominal; Verbos',
    'Aula 11 | Orações',
    'Aula 12 | Orações; Pontuação',
    'Aula 13 | Pontuação; Questões'
  ];

  const TI_TOPICS = [
    'FD00 - Introdução à Fluência em Dados',
    'FD01 - Fundamentos de Dados',
    'FD02 - Fundamentos de Bancos de Dados',
    'FD03 - Modelo Entidade-Relacionamento',
    'FD04 - Modelo Relacional',
    'FD05 - Mapeamento ER-Relacional',
    'FD06 - Introdução ao SQL',
    'SI00 - Fundamentos de Segurança da Informação',
    'SI01 - Ataques e Ameaças',
    'TI01 - Parte I - Bancos de Dados - Versão 2.0',
    'TI01 - Parte II - Modelo Relacional - Versão 2.0',
    'TI02 - Modelo Entidade-Relacionamento - Versão 2.0',
    'TI03 - SQL (DML) - Versão 2.0',
    'TI04 - SQL (DDL)',
    'TI05 - SQL (DCL e DTL)',
    'TI06 - Business Intelligence - Versão 2.0',
    'TI07 - Data Mining - Versão 2.0',
    'TI08 - Big Data',
    'TI08.II - Big Data (temas avançados)',
    'TI09 - Teoria da Informação',
    'TI21.II - Computação em Nuvem',
    'TI23 - Segurança da Informação',
    'TI25 - ISO 27001:2022 (SGSI) - Versão 2.0',
    'TI34 - LAI',
    'TI35 - LGPD',
    'TI36 - Inteligência Artificial - Versão 2.0',
    'TI37 - Parte I - Aprendizado de Máquina (Machine Learning - ML)',
    'TI37 - Parte II - Processamento de Linguagem Natural (PLN)',
    'TI38 - Python',
    'TI38.II - Bibliotecas Python',
    'TI39 - R',
    'TI39.II - Tidyverse',
    'TI40 - Pareamento de dados',
    'TI41 - XML, JSON e CSV',
    'TI42 - Representação de Dados',
    'TI43 - NoSQL'
  ];

  // Trilha TCU 2025 + editais recentes Cebraspe, focada em dados para TCU/CGU.
  // Adição não destrutiva: preserva o currículo Ramon, histórico e ciclo em AFO.
  const SCIENCE_DATA_CURRICULUM = [["01 | FUNDAMENTOS — Dados, informação e tipos de dados","Dado/informação/conhecimento, dados estruturados, semiestruturados, não estruturados, abertos; coleta, armazenamento, recuperação e interoperabilidade.","Felipe 01 — Dados e Teoria da Informação","Alta"],["02 | BANCO DE DADOS — SGBD e transações","Conceitos, catálogo, metadados, independência de dados, ACID, integridade, transações; diferenças entre SGBD e banco.","Felipe 02 — Bancos de Dados; Ramon TI01.I (reforço se necessário)","Alta"],["03 | MODELAGEM — Modelo Entidade-Relacionamento (MER)","Entidades, atributos, relacionamentos, cardinalidade, especialização e generalização, notações.","Felipe 03 — Modelagem Conceitual - MER","Alta"],["04 | MODELAGEM — Modelo relacional","Relações, tuplas, atributos, chaves, PK/FK, dependências funcionais, restrições e normalização até 3FN/BCNF.","Felipe 04 — Modelagem Lógica - Modelo Relacional","Alta"],["05 | MODELAGEM — Mapeamento lógico-físico","MER para tabelas, PK/FK, índices e views; noções de implementação sem detalhes específicos de fornecedores.","Felipe 05 — Modelagem Física - SGBDs; Ramon FD05","Alta"],["06 | SQL — SELECT, filtros e JOIN","SELECT, WHERE, ORDER BY, operadores, INNER/LEFT/RIGHT JOIN, NULL e funções.","Felipe 06 — SQL parte 1","Alta"],["07 | SQL — agregações e subconsultas","GROUP BY, HAVING, COUNT/SUM/AVG, subconsultas, UNION, DISTINCT e interpretação de resultados.","Felipe 06 e 07 — SQL partes 1 e 2","Alta"],["08 | SQL — DML, DDL, DCL e transações","INSERT/UPDATE/DELETE, CREATE/ALTER/DROP, privilégios GRANT/REVOKE, COMMIT/ROLLBACK e consistência.","Felipe 07 — SQL parte 2; Ramon TI03/TI04/TI05 (lacunas)","Alta"],["09 | SQL — CTE e funções de janela","WITH/CTE, ROW_NUMBER/RANK, OVER, PARTITION BY, janelas e consultas analíticas; prática guiada.","Ramon TI93 — CTE e Window Functions (complemento)","Alta"],["10 | SQL — otimização básica de consultas","Finalidade de índices, plano de execução, filtros e custos em nível conceitual; sem tuning profundo de SGBD.","Felipe 08 — Otimização de Consultas (PDF)","Média"],["11 | BANCO DE DADOS — NoSQL","Modelos chave-valor, documentos, colunas e grafos; CAP, consistência, casos de uso e comparação com relacional.","Felipe 12 — Bancos de Dados NoSQL; Ramon TI43 (reforço)","Alta"],["12 | DADOS — formatos e representação","JSON, XML, CSV, Parquet, dados planos, schemas, codificação e intercâmbio; distinguir sem decorar APIs proprietárias.","Ramon TI41 — XML, JSON e CSV; Felipe 42 — APIs e Web Services","Alta"],["13 | BI — Data Warehouse, Data Mart e OLAP","BI, métricas, indicadores, DW/DM, fatos e dimensões, ETL e OLAP.","Felipe 09 — Infraestrutura de BI","Alta"],["14 | BI — modelagem dimensional","Modelo estrela e floco de neve, dimensões, fatos, granularidade, SCD, medidas, cubos e drill-down.","Felipe 10 — Modelagem Multidimensional","Alta"],["15 | ENGENHARIA — ETL, ELT e pipelines","Extração, transformação, carga, orquestração, batch/streaming, logging, retries, checkpoints, integração e qualidade.","Ramon TI08.II — Big Data avançado; Felipe 23 — Tratamento de Dados; Felipe 42 — APIs","Alta"],["16 | BIG DATA — fundamentos","5 Vs, ecossistemas e aplicações de Big Data, processamento distribuído, latência, escalabilidade.","Felipe 11 — Big Data e Data Mining","Alta"],["17 | BIG DATA — Hadoop, Spark e streaming","HDFS/MapReduce, Spark, batch versus streaming; identificar arquitetura e função, não decorar comandos de cluster.","Felipe 13 — Hadoop e Spark; Ramon TI08 (complemento)","Alta"],["18 | ARQUITETURA — Data Lake, Lakehouse e Data Mesh","DW, Data Lake, Data Mesh, Lakehouse, diferenças, integração, casos de uso em auditoria.","Ramon TI08.II e TI76 (se disponível); complemento teórico dirigido","Alta"],["19 | GOVERNANÇA — catálogo, metadados e linhagem","Governança de dados, papéis, stewardship, glossário, catalogação, linhagem, qualidade, deduplicação, DAMA/DMBOK em nível de edital.","Felipe 14 — Governança de Dados (PDF); Ramon TI61","Alta"],["20 | BI — dashboards e visualização","Dashboards, indicadores, dimensões, filtros, storytelling e usos de Power BI/Tableau; sem foco em interfaces.","Felipe 15 — Power BI (PDF); Felipe 17 — Análise Exploratória","Média"],["21 | ENGENHARIA — APIs e serviços de integração","REST e SOAP, HTTP, APIs, autenticação, JSON, dados abertos e consumo de fontes para ETL.","Felipe 42 — APIs e Web Services (PDF)","Alta"],["22 | ENGENHARIA — mensageria e eventos","Filas, pub/sub, eventos, desacoplamento, ordenação e entrega; visão conceitual para pipelines.","Felipe 66 — Mensageria (PDF)","Média"],["23 | ENGENHARIA — nuvem aplicada a dados","IaaS/PaaS/SaaS, armazenamento objeto e serviços gerenciados, arquitetura de dados em nuvem, custos e segurança.","Felipe 41 — Cloud Computing (PDF); Ramon TI21.II","Média"],["24 | ENGENHARIA — versionamento e observabilidade de pipelines","Logging, auditoria de fluxo, linhagem, testes de dados, versionamento, CI/CD para pipelines; conceitos.","Felipe 58 — DevOps e CI/CD (PDF); Ramon TI08.II","Média"],["25 | DADOS — CRISP-DM e processo analítico","Compreensão de negócio, compreensão/preparação dos dados, modelagem, avaliação e implantação; prevenção de vazamento.","Ramon TI07 e TI62; Felipe 11 e 17","Alta"],["26 | EXPLORAÇÃO — EDA e visualização","Distribuições, dispersão, correlação, outliers, tipos de gráficos e análise exploratória.","Felipe 17 — Análise Exploratória","Alta"],["27 | PREPARAÇÃO — qualidade e tratamento dos dados","Missing values, duplicidade, normalização, padronização, encoding, desbalanceamento, amostragem e redução de dimensionalidade.","Felipe 23 — Tratamento de Dados (PDF)","Alta"],["28 | DATA MINING — regras de associação","Suporte, confiança, lift, algoritmo Apriori e aplicação a padrões de transações.","Felipe 11 — Big Data e Data Mining; Ramon TI07","Alta"],["29 | MACHINE LEARNING — modelos supervisionados","Classificação e regressão; árvores, kNN, Naive Bayes, SVM, regressões e comparação de abordagens.","Felipe 18 — Machine Learning","Alta"],["30 | MACHINE LEARNING — clusterização","k-means, hierárquico, DBSCAN, medidas de distância e seleção de grupos.","Felipe 18 — Machine Learning; Ramon TI37.I","Alta"],["31 | MACHINE LEARNING — anomalias e fraudes","Detecção de outliers, anomalias, segmentação, uso de dados em controle e investigação de indícios.","Felipe 18 — Machine Learning; Ramon TI07","Alta"],["32 | ESTATÍSTICA — descritiva e distribuições","Média, mediana, variância, desvio padrão, quantis, assimetria; leitura estatística de dados.","Guilherme Neves — Estatística; Ramon MON36 como revisão","Alta"],["33 | ESTATÍSTICA — probabilidade e inferência","Probabilidade condicional, Bayes, distribuições, amostragem, IC, testes e erros tipo I/II; prática de questões.","Guilherme Neves — Estatística (complemento indispensável)","Alta"],["34 | ESTATÍSTICA — correlação e regressão","Correlação de Pearson/Spearman, regressão linear/logística, resíduos, interpretação e premissas fundamentais.","Guilherme Neves — Estatística; Ramon TI89","Alta"],["35 | ESTATÍSTICA — séries temporais","Tendência, sazonalidade, autocorrelação, previsão, validação temporal e limites.","Ramon TI90; Guilherme Neves (quando cobrir)","Média"],["36 | MODELOS — avaliação e métricas","Train/test, validação cruzada, matriz de confusão, precision/recall/F1, ROC/AUC, MAE/RMSE, viés e variância.","Felipe 21 — Avaliação de Modelos Preditivos (PDF)","Alta"],["37 | MODELOS — overfitting e regularização","Under/overfitting, L1/L2, ajuste de hiperparâmetros, seleção de atributos, PCA e data leakage.","Felipe 22 — Otimização de Modelos (PDF); Ramon TI86 (se disponível)","Alta"],["38 | IA — conceitos e paradigmas","IA, machine learning, supervisão, não supervisão, semissupervisão, reforço e análise preditiva.","Felipe 16 — Inteligência Artificial; Felipe 18 — Machine Learning","Alta"],["39 | DEEP LEARNING — redes neurais","Perceptron, ativação, treinamento/backpropagation, CNN, RNN e Transformers em nível conceitual.","Felipe 19 — Redes Neurais; Ramon TI37.II (se aplicável)","Alta"],["40 | PLN — tarefas e representações","Tokenização, stemming/lematização, TF-IDF, embeddings, classificação de textos, NER e análise de sentimento.","Felipe 20 — Processamento de Linguagem Natural","Alta"],["41 | IA GENERATIVA — LLM, Transformers e RAG","IA generativa, LLMs, atenção, prompting, alucinação, RAG, fine-tuning, agentes e limitações.","Felipe 16 e 24 — IA/Engenharia de Prompt; Ramon TI97 (se disponível)","Alta"],["42 | IA GENERATIVA — engenharia de prompt","Contexto, instruções, exemplos, avaliação, segurança, prompt injection e verificação de respostas.","Felipe 24 — Engenharia de Prompt (PDF)","Média"],["43 | IA RESPONSÁVEL — ética, viés e explicabilidade","Fairness, explicabilidade, discriminação, transparência, riscos, privacidade e governança de modelos.","Felipe 16 e 36; complemento de IA responsável","Alta"],["44 | MLOPS — operação de modelos","Ciclo de treinamento/deploy, versionamento, monitoramento, drift, auditoria de modelos, responsabilidades.","Ramon TI96 (se disponível); Felipe 58 — DevOps e CI/CD (visão geral)","Média"],["45 | PROGRAMAÇÃO — lógica aplicada a dados","Variáveis, condicionais, laços, funções, estruturas, scripts e leitura de pseudocódigo.","Felipe 25 — Lógica de Programação","Alta"],["46 | PYTHON — fundamentos","Sintaxe, tipos, coleções, funções, arquivos, manipulação de CSV/JSON, scripts de tratamento.","Felipe 26 — Python; Ramon TI38","Alta"],["47 | PYTHON — NumPy e Pandas","DataFrame, seleção e filtros, merge, groupby, limpeza, agregações e análise com dados públicos.","Ramon TI38.II — Bibliotecas Python; prática complementar","Alta"],["48 | PYTHON — prática SQL e análise","Consulta SQL, importar CSV, criar indicadores, gráficos e documentar conclusões em notebook simples.","Felipe 26 + 06/07 + 17; exercício aplicado","Alta"],["49 | R — fundamentos para Ciência de Dados","Vetores, data frame, manipulação, funções, leitura de dados e visualizações; foco edital e interpretação.","Felipe 27 — Linguagem R; Ramon TI39/39.II","Média"],["50 | RECORD LINKAGE — pareamento de registros","Chaves, normalização, deduplicação, comparadores e correspondência probabilística e determinística.","Ramon TI40 — Pareamento de Dados","Alta"],["51 | LGPD E LAI — dados públicos e controle","Bases legais, tratamento pelo setor público, anonimização, transparência, LAI, compartilhamento e segurança.","Felipe 36 — LGPD e Marco Civil (PDF); Ramon TI34/35","Alta"],["52 | APLICAÇÃO — auditoria com dados","Identificação de riscos e red flags, cruzamento de bases, indícios, materialidade, evidências, governança e documentação.","Aplicação prática TCU/CGU: SQL, Python, estatística e visualização","Alta"],["53 | CONSOLIDAÇÃO — questões Cebraspe TCU/CGU","Simulado misto, C/E com justificativa, caderno de erros e revisão de incidência: TCU TI 2025, TCE-MG 2025, SEFAZ-AL 2026 e SUSEP 2025.","Questões recentes Cebraspe; Felipe e Ramon como fonte de consulta","Alta"]].map(([title, details, source, priority]) => ({title, details, source, priority}));
  window.__TCU_DATA_CURRICULUM__ = SCIENCE_DATA_CURRICULUM;

  const ACTIVE_SPECS = [
    { id: 'afo', name: 'AFO (Pacelli)', source: 'Pacelli — AFO', priority: 'Alta' },
    { id: 'dad-rafael-oliveira-vas-2026', name: 'DAD - Rafael Oliveira [VAs] [2026]', source: 'Rafael Oliveira — Grupo GEN', sourceUrl: 'https://www.grupogen.com.br/curso-direito-administrativo-rafael-oliveira', priority: 'Alta', topics: DAD_TOPICS },
    { id: 'port-ceb-teorico-2026', name: '[Port_Cebraspe] 1- Teórico [2026] [13 aulas]', source: 'Andresan Machado — Missão Cebraspe', priority: 'Média', topics: PORT_TOPICS },
    { id: 'dcon', name: 'DCON', priority: 'Alta' },
    { id: 'ti', name: 'TI - Ramon', priority: 'Alta', topics: TI_TOPICS }
  ];
  const ACTIVE_IDS = ACTIVE_SPECS.map(spec => spec.id);

  const nativeSetItem = Storage.prototype.setItem;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\[nao tcu\]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function slugify(value) {
    return normalize(value).replace(/\s+/g, '-').slice(0, 72) || 'topico';
  }

  function ensureArrays(state) {
    if (!Array.isArray(state.disciplines)) state.disciplines = [];
    if (!Array.isArray(state.topics)) state.topics = [];
    if (!Array.isArray(state.sessions)) state.sessions = [];
    state.settings = state.settings && typeof state.settings === 'object' ? state.settings : {};
    state.contentVersions = state.contentVersions && typeof state.contentVersions === 'object' ? state.contentVersions : {};
  }

  function ensureDiscipline(state, spec) {
    let discipline = state.disciplines.find(d => d.id === spec.id);
    if (!discipline) {
      discipline = {
        id: spec.id,
        name: spec.name,
        active: false,
        mode: 'Em espera',
        order: state.disciplines.length + 1,
        frequency: 1,
        priority: spec.priority || 'Média',
        manualHours: '',
        manualMinutes: '',
        source: spec.source || '',
        sourceUrl: spec.sourceUrl || '',
        notes: ''
      };
      state.disciplines.push(discipline);
    }

    const previousNames = new Set([normalize(discipline.name), normalize(spec.name)]);
    if (discipline.name !== spec.name) {
      discipline.name = spec.name;
      state.topics.forEach(topic => {
        if (topic.disciplineId === spec.id || previousNames.has(normalize(topic.disciplineName))) {
          topic.disciplineId = spec.id;
          topic.disciplineName = spec.name;
        }
      });
      state.sessions.forEach(session => {
        if (session.disciplineId === spec.id || previousNames.has(normalize(session.disciplineName))) {
          session.disciplineId = spec.id;
          session.disciplineName = spec.name;
        }
      });
    }

    if (spec.source && !discipline.source) discipline.source = spec.source;
    if (spec.sourceUrl && !discipline.sourceUrl) discipline.sourceUrl = spec.sourceUrl;
    if (!discipline.priority) discipline.priority = spec.priority || 'Média';
    if (discipline.manualMinutes === undefined) discipline.manualMinutes = '';
    return discipline;
  }

  function ensureTopics(state, spec) {
    if (!Array.isArray(spec.topics)) return;
    const existing = state.topics.filter(topic => topic.disciplineId === spec.id);

    spec.topics.forEach((desiredTitle, index) => {
      const desiredKey = normalize(desiredTitle);
      let topic = existing.find(item => normalize(item.title) === desiredKey);
      if (!topic) {
        topic = state.topics.find(item => item.disciplineId === spec.id && normalize(item.title) === desiredKey);
      }
      if (!topic) {
        topic = {
          disciplineId: spec.id,
          disciplineName: spec.name,
          title: desiredTitle,
          details: desiredTitle.replace(NON_TCU_TAG, ''),
          status: 'Em espera',
          priority: spec.priority || 'Média',
          order: index + 1,
          notes: '',
          tecUrl: '',
          id: `topic_${spec.id}_${index + 1}_${slugify(desiredTitle)}`
        };
        state.topics.push(topic);
        existing.push(topic);
      } else {
        topic.disciplineId = spec.id;
        topic.disciplineName = spec.name;
        topic.title = desiredTitle;
        if (!topic.details) topic.details = desiredTitle.replace(NON_TCU_TAG, '');
        if (!topic.priority) topic.priority = spec.priority || 'Média';
        if (!Number(topic.order)) topic.order = index + 1;
      }
    });
  }

  function appendTecLink(target, url, sourceTitle) {
    if (!target || !url) return false;
    const cleanUrl = String(url).trim();
    if (!cleanUrl) return false;
    if (!target.tecUrl) {
      target.tecUrl = cleanUrl;
      return true;
    }
    if (String(target.tecUrl).trim() === cleanUrl) return false;
    const notes = String(target.notes || '');
    if (notes.includes(cleanUrl)) return false;
    const marker = `Caderno TEC migrado de DAD (${sourceTitle}): ${cleanUrl}`;
    target.notes = notes ? `${notes}\n${marker}` : marker;
    return true;
  }

  function migrateDadTec(state) {
    const oldDadTopics = state.topics.filter(topic =>
      topic.disciplineId === 'dad' || normalize(topic.disciplineName) === 'dad'
    );
    const rafaelTopics = state.topics.filter(topic => topic.disciplineId === 'dad-rafael-oliveira-vas-2026');
    if (!oldDadTopics.length || !rafaelTopics.length) return 0;

    const targetByNeedle = needle => rafaelTopics.find(topic => normalize(topic.title).includes(normalize(needle)));
    const rules = [
      { source: ['regime juridico administrativo', 'estado governo e administracao publica'], targets: ['origem evolucao e principios'] },
      { source: ['organizacao administrativa'], targets: ['organizacao administrativa'] },
      { source: ['fundacoes empresas publicas e sociedades de economia mista'], targets: ['administracao publica indireta'] },
      { source: ['terceiro setor'], targets: ['terceiro setor'] },
      { source: ['servicos publicos'], targets: ['concessao e permissao de servicos publicos'] },
      { source: ['parceria publico privada consorcios publicos'], targets: ['consorcios publicos', 'parcerias publico privadas'] },
      { source: ['poderes da administracao publica'], targets: ['poderes administrativos'] },
      { source: ['ato administrativo'], targets: ['atos administrativos'] },
      { source: ['processo administrativo'], targets: ['processo administrativo'] },
      { source: ['licitacoes e contratos administrativos', 'regime diferenciado de contratacao'], targets: ['licitacoes e contratos administrativos'] },
      { source: ['intervencao do estado na propriedade'], targets: ['intervencao do estado na propriedade'] },
      { source: ['bens publicos'], targets: ['bens publicos'] },
      { source: ['agentes publicos', 'lei n 8 112 1990'], targets: ['agentes publicos'] },
      { source: ['responsabilidade civil do estado'], targets: ['responsabilidade civil do estado'] },
      { source: ['controle da administracao'], targets: ['controle da administracao publica'] },
      { source: ['improbidade administrativa'], targets: ['improbidade administrativa', 'lei anticorrupcao'] }
    ];

    let moved = 0;
    oldDadTopics.forEach(sourceTopic => {
      const url = String(sourceTopic.tecUrl || '').trim();
      if (!url) return;
      const sourceName = normalize(sourceTopic.title);
      rules.forEach(rule => {
        if (!rule.source.some(needle => sourceName.includes(normalize(needle)))) return;
        rule.targets.forEach(targetNeedle => {
          if (appendTecLink(targetByNeedle(targetNeedle), url, sourceTopic.title || 'DAD')) moved += 1;
        });
      });
    });
    return moved;
  }

  function enforcePlan(state) {
    if (!state || typeof state !== 'object') return { state, changed: false };
    const before = JSON.stringify(state);
    ensureArrays(state);

    ACTIVE_SPECS.forEach(spec => {
      ensureDiscipline(state, spec);
      ensureTopics(state, spec);
    });

    const activeOrder = new Map(ACTIVE_IDS.map((id, index) => [id, index + 1]));
    const inactive = state.disciplines
      .filter(d => !activeOrder.has(d.id))
      .slice()
      .sort((a, b) => (Number(a.order) || 9999) - (Number(b.order) || 9999));
    const inactiveOrder = new Map(inactive.map((d, index) => [d.id, ACTIVE_IDS.length + index + 1]));

    state.disciplines.forEach(discipline => {
      const isActive = activeOrder.has(discipline.id);
      discipline.active = isActive;
      discipline.mode = isActive ? 'Teoria' : 'Em espera';
      discipline.frequency = 1;
      discipline.order = isActive ? activeOrder.get(discipline.id) : inactiveOrder.get(discipline.id);
    });

    state.settings.dailyGoalMinutes = 300;
    state.settings.dailyHours = 5;
    state.settings.weeklyGoalMinutes = 1800;
    state.settings.weeklyGoal = 30;
    state.settings.nightReviewOutsideStudyLoad = true;
    state.settings.studyPlanLabel = '30h/semana · 5h/dia + revisão noturna fora da CH';

    const migratedTecLinks = migrateDadTec(state);
    state.settings.studyPlanTecLinksMigrated = Math.max(Number(state.settings.studyPlanTecLinksMigrated) || 0, migratedTecLinks);
    state.contentVersions[PLAN_KEY] = PLAN_VERSION;

    const afterCore = JSON.stringify(state);
    const changed = before !== afterCore;
    if (changed) {
      state.settings.studyPlanUpdatedAt = new Date().toISOString();
      state.updatedAt = new Date().toISOString();
    }
    return { state, changed, migratedTecLinks };
  }

  function encodeMigrated(raw) {
    try {
      const parsed = JSON.parse(String(raw || ''));
      const result = enforcePlan(parsed);
      return { value: JSON.stringify(result.state), result };
    } catch {
      return { value: raw, result: { changed: false } };
    }
  }

  function markDriveDirty(state) {
    try {
      const driveMeta = JSON.parse(localStorage.getItem(DRIVE_META_KEY) || '{}') || {};
      driveMeta.dirty = true;
      driveMeta.localUpdatedAt = state.updatedAt || new Date().toISOString();
      nativeSetItem.call(localStorage, DRIVE_META_KEY, JSON.stringify(driveMeta));
    } catch (_) {
      // Os dados locais continuam preservados; a reconexão do Drive pode ser feita depois.
    }
  }

  function migrateExisting() {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const { value, result } = encodeMigrated(raw);
    if (!result.changed) return;
    nativeSetItem.call(localStorage, STORE_KEY, value);
    nativeSetItem.call(localStorage, `${STORE_KEY}-mirror`, value);
    markDriveDirty(result.state);
  }

  Storage.prototype.setItem = function(key, value) {
    if (this === localStorage && key === STORE_KEY) {
      const migrated = encodeMigrated(value);
      return nativeSetItem.call(this, key, migrated.value);
    }
    return nativeSetItem.call(this, key, value);
  };

  migrateExisting();
})();
