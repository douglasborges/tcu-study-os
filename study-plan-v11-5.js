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

  const ACTIVE_SPECS = [
    { id: 'afo', name: 'AFO (Pacelli)', source: 'Pacelli — AFO', priority: 'Alta' },
    { id: 'dad-rafael-oliveira-vas-2026', name: 'DAD - Rafael Oliveira [VAs] [2026]', source: 'Rafael Oliveira — Grupo GEN', sourceUrl: 'https://www.grupogen.com.br/curso-direito-administrativo-rafael-oliveira', priority: 'Alta', topics: DAD_TOPICS },
    { id: 'port-ceb-teorico-2026', name: '[Port_Cebraspe] 1- Teórico [2026] [13 aulas]', source: 'Andresan Machado — Missão Cebraspe', priority: 'Média', topics: PORT_TOPICS },
    { id: 'dcon', name: 'DCON', priority: 'Alta' },
    { id: 'ti', name: 'TI - TCU [TI Total]', priority: 'Alta', topics: TI_TOPICS }
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
