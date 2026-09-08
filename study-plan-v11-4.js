(() => {
  'use strict';

  const STORE_KEY = 'tcu-study-os-pwa-v1';
  const PLAN_KEY = 'studyPlan20260908';
  const PLAN_VERSION = 1;
  const DRIVE_META_KEY = 'tcu-study-os-drive-sync-meta-v2';
  const ACTIVE_IDS = [
    'afo',
    'dad-rafael-oliveira-vas-2026',
    'port-ceb-teorico-2026',
    'dcon',
    'ti'
  ];

  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
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

    const marker = `Caderno TEC migrado de DAD (${sourceTitle}): ${cleanUrl}`;
    const notes = String(target.notes || '');
    if (notes.includes(cleanUrl)) return false;
    target.notes = notes ? `${notes}\n${marker}` : marker;
    return true;
  }

  function migrateDadTec(state) {
    if (!Array.isArray(state.topics)) return 0;

    const oldDadTopics = state.topics.filter(topic =>
      topic.disciplineId === 'dad' || normalize(topic.disciplineName) === 'dad'
    );
    const rafaelId = 'dad-rafael-oliveira-vas-2026';
    const rafaelTopics = state.topics.filter(topic => topic.disciplineId === rafaelId);
    if (!oldDadTopics.length || !rafaelTopics.length) return 0;

    const targetByNeedle = needle => {
      const n = normalize(needle);
      return rafaelTopics.find(topic => normalize(topic.title).includes(n));
    };

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
          const target = targetByNeedle(targetNeedle);
          if (appendTecLink(target, url, sourceTopic.title || 'DAD')) moved += 1;
        });
      });
    });

    return moved;
  }

  function migratePlan(state) {
    if (!state || typeof state !== 'object') return { state, changed: false, complete: false };
    if (!Array.isArray(state.disciplines)) return { state, changed: false, complete: false };

    state.settings = state.settings && typeof state.settings === 'object' ? state.settings : {};
    state.contentVersions = state.contentVersions && typeof state.contentVersions === 'object' ? state.contentVersions : {};

    const byId = new Map(state.disciplines.map(d => [d.id, d]));
    const complete = ACTIVE_IDS.every(id => byId.has(id));
    if (!complete) return { state, changed: false, complete: false };
    if (Number(state.contentVersions[PLAN_KEY] || 0) >= PLAN_VERSION) {
      return { state, changed: false, complete: true };
    }

    let changed = false;
    const before = JSON.stringify({
      dailyGoalMinutes: state.settings.dailyGoalMinutes,
      dailyHours: state.settings.dailyHours,
      weeklyGoalMinutes: state.settings.weeklyGoalMinutes,
      weeklyGoal: state.settings.weeklyGoal,
      nightReviewOutsideStudyLoad: state.settings.nightReviewOutsideStudyLoad
    });

    state.settings.dailyGoalMinutes = 300;
    state.settings.dailyHours = 5;
    state.settings.weeklyGoalMinutes = 1800;
    state.settings.weeklyGoal = 30;
    state.settings.nightReviewOutsideStudyLoad = true;

    const after = JSON.stringify({
      dailyGoalMinutes: state.settings.dailyGoalMinutes,
      dailyHours: state.settings.dailyHours,
      weeklyGoalMinutes: state.settings.weeklyGoalMinutes,
      weeklyGoal: state.settings.weeklyGoal,
      nightReviewOutsideStudyLoad: state.settings.nightReviewOutsideStudyLoad
    });
    if (before !== after) changed = true;

    const afo = byId.get('afo');
    if (afo && afo.name !== 'AFO (Pacelli)') {
      const oldNames = new Set([normalize(afo.name), 'afo']);
      afo.name = 'AFO (Pacelli)';
      (state.topics || []).forEach(topic => {
        if (topic.disciplineId === 'afo' || oldNames.has(normalize(topic.disciplineName))) {
          topic.disciplineId = 'afo';
          topic.disciplineName = afo.name;
        }
      });
      (state.sessions || []).forEach(session => {
        if (session.disciplineId === 'afo' || oldNames.has(normalize(session.disciplineName))) {
          session.disciplineId = 'afo';
          session.disciplineName = afo.name;
        }
      });
      changed = true;
    }
    if (afo && !afo.source) {
      afo.source = 'Pacelli — AFO';
      changed = true;
    }

    const activeOrder = new Map(ACTIVE_IDS.map((id, index) => [id, index + 1]));
    const inactive = state.disciplines
      .filter(d => !activeOrder.has(d.id))
      .slice()
      .sort((a, b) => (Number(a.order) || 9999) - (Number(b.order) || 9999));
    const inactiveOrder = new Map(inactive.map((d, index) => [d.id, ACTIVE_IDS.length + index + 1]));

    state.disciplines.forEach(discipline => {
      const isActive = activeOrder.has(discipline.id);
      const next = {
        active: isActive,
        mode: isActive ? 'Teoria' : 'Em espera',
        frequency: 1,
        order: isActive ? activeOrder.get(discipline.id) : inactiveOrder.get(discipline.id)
      };
      if (discipline.active !== next.active || discipline.mode !== next.mode || Number(discipline.frequency) !== next.frequency || Number(discipline.order) !== next.order) {
        discipline.active = next.active;
        discipline.mode = next.mode;
        discipline.frequency = next.frequency;
        discipline.order = next.order;
        changed = true;
      }
    });

    const migratedTecLinks = migrateDadTec(state);
    if (migratedTecLinks > 0) changed = true;

    state.contentVersions[PLAN_KEY] = PLAN_VERSION;
    state.settings.studyPlanLabel = '30h/semana · 5h/dia + revisão noturna fora da CH';
    state.settings.studyPlanTecLinksMigrated = migratedTecLinks;
    state.settings.studyPlanUpdatedAt = new Date().toISOString();
    state.updatedAt = new Date().toISOString();
    changed = true;

    return { state, changed, complete: true, migratedTecLinks };
  }

  function encodeMigrated(raw) {
    try {
      const parsed = JSON.parse(String(raw || ''));
      const result = migratePlan(parsed);
      return { value: JSON.stringify(result.state), result };
    } catch {
      return { value: raw, result: { changed: false, complete: false } };
    }
  }

  function migrateExisting() {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const { value, result } = encodeMigrated(raw);
    if (result.changed) {
      nativeSetItem.call(localStorage, STORE_KEY, value);
      nativeSetItem.call(localStorage, `${STORE_KEY}-mirror`, value);
      try {
        const driveMeta = JSON.parse(localStorage.getItem(DRIVE_META_KEY) || '{}') || {};
        driveMeta.dirty = true;
        driveMeta.localUpdatedAt = result.state.updatedAt || new Date().toISOString();
        nativeSetItem.call(localStorage, DRIVE_META_KEY, JSON.stringify(driveMeta));
      } catch (_) {
        // A sincronização pode ser reconectada manualmente; os dados locais continuam seguros.
      }
    }
  }

  Storage.prototype.setItem = function(key, value) {
    if (this === localStorage && key === STORE_KEY) {
      const migrated = encodeMigrated(value);
      return nativeSetItem.call(this, key, migrated.value);
    }
    return nativeSetItem.call(this, key, value);
  };

  Storage.prototype.removeItem = function(key) {
    return nativeRemoveItem.call(this, key);
  };

  migrateExisting();
})();
