from pathlib import Path

root = Path('metodo-et')
app_path = root / 'src/app.js'
personal_path = root / 'src/personal.js'
styles_path = root / 'styles.css'
index_path = root / 'index.html'

app = app_path.read_text(encoding='utf-8')
personal = personal_path.read_text(encoding='utf-8')
styles = styles_path.read_text(encoding='utf-8')
index = index_path.read_text(encoding='utf-8')

# Imports da v3.
app = app.replace("import * as M from './core.js?v=2.5';", "import * as M from './core.js?v=3.0';", 1)
app = app.replace("import {durationMinutes,progressMetrics} from './progress.js';", "import {durationMinutes,progressMetrics} from './progress.js?v=3.0';", 1)
app = app.replace("import { motivationForDay, saveReminder, normalizeExtras, LEGISLATION_QUEUE} from './personal.js';", "import { motivationForDay, saveReminder, normalizeExtras, LEGISLATION_QUEUE} from './personal.js?v=3.0';\nimport {achievementSnapshot,progressText,CATEGORY_META} from './achievements.js?v=3.0';", 1)

old_change = "function change(fn,message='Registro salvo neste dispositivo.'){try{persist(fn());render();toast(message);return true;}catch(e){toast(e.message,true);return false;}}"
new_change = '''function change(fn,message='Registro salvo neste dispositivo.',celebrate=true){
 try{
  const before=achievementSnapshot(state),next=fn();
  if(!Array.isArray(next.achievementsSeen))next.achievementsSeen=[...(state.achievementsSeen||[])];
  const after=achievementSnapshot(next),seen=new Set(next.achievementsSeen),earned=celebrate?after.unlocked.filter(a=>!before.unlockedIds.has(a.id)&&!seen.has(a.id)):[];
  if(earned.length)next.achievementsSeen=[...new Set([...next.achievementsSeen,...earned.map(a=>a.id)])];
  persist(next);render();toast(message);
  if(earned.length)setTimeout(()=>achievementDialog(earned),120);
  return true;
 }catch(e){toast(e.message,true);return false;}
}'''
if old_change not in app:
    raise SystemExit('Função change() esperada não encontrada.')
app = app.replace(old_change, new_change, 1)

anchor = 'function render(){'
feature = r'''function achievementDate(v){return v&&v!=='—'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v.split('-').reverse().join('/'):(v||'—');}
function achievementCard(a){return `<article class="achievement-card ${a.unlocked?'unlocked':'locked'}"><div class="achievement-icon">${a.icon}</div><div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><progress max="1" value="${a.progress}" aria-label="Progresso de ${esc(a.title)}"></progress><small>${a.unlocked?'✓ Conquistada':esc(progressText(a))}</small></div></article>`;}
function achievementsPage(){
 const snap=achievementSnapshot(state),pct=Math.round(snap.missionProgress*100),rocket=Math.max(3,Math.min(97,pct)),r=snap.records;
 const fmtRecord=(value,key,type='time')=>type==='time'?`${M.hm(value)}${key&&key!=='—'?' · '+achievementDate(key):''}`:`${Number(value||0).toLocaleString('pt-BR')}${key&&key!=='—'?' · '+achievementDate(key):''}`;
 const categories=Object.entries(CATEGORY_META).map(([id,meta])=>{let items=snap.items.filter(x=>x.category===id);return `<section class="card achievement-category"><div class="achievement-category-head"><div><span class="achievement-category-icon">${meta.icon}</span><h2>${esc(meta.title)}</h2></div><span class="badge">${items.filter(x=>x.unlocked).length}/${items.length}</span></div><p class="muted">${esc(meta.description)}</p><div class="achievement-grid">${items.map(achievementCard).join('')}</div></section>`;}).join('');
 const mission=[...snap.mission].reverse();
 return heading('MISSÃO TCU','🚀 Conquistas','Progresso é o painel do piloto. Aqui você acompanha a viagem e os marcos que já construiu.')+
 `<section class="card achievements-hero"><div><span class="eyebrow">TRAJETÓRIA TCU</span><h2>${snap.unlocked.length} de ${snap.items.length} conquistas desbloqueadas</h2><p class="muted">Fase atual: <b>${esc(snap.phase)}</b>. Cada marco real faz o foguete avançar.</p><progress max="1" value="${snap.missionProgress}" aria-label="Progresso da Missão TCU"></progress><div class="statline"><span><b>${pct}%</b> da trajetória principal</span><span><b>${snap.missionUnlocked}/${snap.mission.length}</b> estações alcançadas</span></div></div><div class="hero-rocket" aria-hidden="true">🚀</div></section>
 <section class="section-title"><div class="page-head"><div><h2>Próximas conquistas</h2><p>Os três marcos atualmente mais próximos.</p></div></div><div class="grid next-achievements">${snap.next.map(achievementCard).join('')}</div></section>
 <section class="card section-title"><div class="page-head"><div><h2>Trajetória TCU</h2><p>O foguete sobe conforme conquistas reais são desbloqueadas.</p></div><span class="badge">${esc(snap.phase)}</span></div><div class="mission-route"><div class="mission-rail"><i style="height:${pct}%"></i></div><div class="mission-rocket" style="bottom:calc(${rocket}% - 22px)" aria-hidden="true">🚀</div><div class="mission-stops">${mission.map(a=>`<div class="mission-stop ${a.unlocked?'unlocked':''} ${snap.nextMission?.id===a.id?'next':''}"><span class="mission-node">${a.unlocked?'✓':'·'}</span><div><b>${esc(a.title)}</b><small>${a.unlocked?'Conquistada':esc(progressText(a))}</small></div></div>`).join('')}</div></div></section>
 <section class="section-title"><div class="page-head"><div><h2>Recordes pessoais</h2><p>Marcas para visualizar sua evolução acumulada.</p></div></div><div class="grid achievement-records"><article class="card metric"><small>MAIOR CARGA DIÁRIA</small><strong>${fmtRecord(r.bestDay.value,r.bestDay.key)}</strong></article><article class="card metric"><small>MELHOR SEMANA</small><strong>${fmtRecord(r.bestWeek.value,r.bestWeek.key)}</strong></article><article class="card metric"><small>MELHOR MÊS</small><strong>${M.hm(r.bestMonth.value)}</strong><span class="sub">${esc(r.bestMonth.key||'—')}</span></article><article class="card metric"><small>MAIS QUESTÕES EM UM DIA</small><strong>${fmtRecord(r.bestQuestionsDay.value,r.bestQuestionsDay.key,'number')}</strong></article><article class="card metric"><small>MAIOR SEQUÊNCIA</small><strong>${r.bestStreak.value} <span class="metric-unit">dias</span></strong></article><article class="card metric"><small>SEQUÊNCIA ATUAL</small><strong>${r.currentStreak.value} <span class="metric-unit">dias</span></strong></article></div></section>
 <section class="achievement-categories section-title">${categories}</section>`;
}
function achievementDialog(items){
 if(modal.open)close();
 const a=items[0],extra=items.length>1?`<p class="muted">E mais ${items.length-1} conquista${items.length>2?'s':''} desbloqueada${items.length>2?'s':''} nesta atualização.</p>`:'';
 open(`<div class="achievement-celebration"><div class="celebration-rocket" aria-hidden="true">🚀</div><span class="eyebrow">CONQUISTA DESBLOQUEADA</span><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p><div class="badge">${esc(CATEGORY_META[a.category]?.title||'Método ET')}</div>${extra}<p class="muted">Seu foguete avançou na Missão TCU.</p></div>`);
}
'''
if 'function achievementsPage()' not in app:
    if anchor not in app:
        raise SystemExit('Âncora render() não encontrada.')
    app = app.replace(anchor, feature + anchor, 1)

old_render = "if(!['today','progress','subjects','solid','planning','history','legislation','data','reminders','motivation'].includes(page))page='today';"
new_render = "if(!['today','progress','achievements','subjects','solid','planning','history','legislation','data','reminders','motivation'].includes(page))page='today';"
if old_render not in app:
    raise SystemExit('Lista de rotas não encontrada.')
app = app.replace(old_render, new_render, 1)
old_map = 'progress:progressPage,subjects:subjectsPage'
if old_map not in app:
    raise SystemExit('Mapa de páginas não encontrado.')
app = app.replace(old_map, 'progress:progressPage,achievements:achievementsPage,subjects:subjectsPage', 1)

app = app.replace("if(change(()=>pendingImport.next,'Importação concluída.'))", "if(change(()=>pendingImport.next,'Importação concluída.',false))", 1)

old_init_part = "storedRaw=localStorage.getItem(M.KEY);state=storedRaw?M.validate(JSON.parse(storedRaw)):M.validate(await fetch('./data/initial-state.json').then(r=>{if(!r.ok)throw Error('Base inicial indisponível.');return r.json();}));state=normalizeExtras(state);if(!storedRaw||!JSON.parse(storedRaw).motivationStartDay||!Array.isArray(JSON.parse(storedRaw).reminders)||!JSON.parse(storedRaw).legislation)persist(state);"
new_init_part = "storedRaw=localStorage.getItem(M.KEY);let storedObject=storedRaw?JSON.parse(storedRaw):null;state=storedRaw?M.validate(storedObject):M.validate(await fetch('./data/initial-state.json').then(r=>{if(!r.ok)throw Error('Base inicial indisponível.');return r.json();}));state=normalizeExtras(state);if(!Array.isArray(storedObject?.achievementsSeen))state.achievementsSeen=achievementSnapshot(state).unlocked.map(a=>a.id);if(!storedRaw||!storedObject?.motivationStartDay||!Array.isArray(storedObject?.reminders)||!storedObject?.legislation||!Array.isArray(storedObject?.achievementsSeen))persist(state);"
if old_init_part not in app:
    raise SystemExit('Trecho de init() não encontrado.')
app = app.replace(old_init_part, new_init_part, 1)

old_personal_tail = "for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}return st;}"
new_personal_tail = "for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}if(st.achievementsSeen===undefined)st.achievementsSeen=[];if(!Array.isArray(st.achievementsSeen)||st.achievementsSeen.some(id=>typeof id!=='string')||new Set(st.achievementsSeen).size!==st.achievementsSeen.length)throw Error('Histórico de conquistas inválido no backup.');return st;}"
if old_personal_tail not in personal:
    raise SystemExit('Final de normalizeExtras() não encontrado.')
personal = personal.replace(old_personal_tail, new_personal_tail, 1)

if '<a href="#achievements">' not in index:
    index = index.replace('<a href="#progress">▰ <span>Progresso</span></a>', '<a href="#progress">▰ <span>Progresso</span></a>\n      <a href="#achievements">🚀 <span>Conquistas</span></a>', 1)
index = index.replace('content="2.5-law-edit-delete"', 'content="3.0-conquistas-missao-tcu"')
index = index.replace('?v=2.5', '?v=3.0')
app = app.replace('?v=2.5', '?v=3.0')

css = r'''

/* v3.0 — Conquistas · Missão TCU */
.achievements-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:28px;border-color:#607b35;background:radial-gradient(circle at 85% 20%,#314b1c 0,transparent 34%),linear-gradient(135deg,#1d2b15,#10140d 70%);overflow:hidden}
.achievements-hero h2{font-size:30px;margin:10px 0 8px}.achievements-hero progress{height:7px;max-width:720px}.hero-rocket{font-size:86px;filter:drop-shadow(0 0 15px #c5f65b66);transform:rotate(-6deg);padding:6px 26px}
.next-achievements{grid-template-columns:repeat(3,minmax(0,1fr))}.achievement-records{grid-template-columns:repeat(3,minmax(0,1fr))}.achievement-records .metric strong{font-size:25px}
.achievement-category{margin-bottom:18px}.achievement-category-head{display:flex;align-items:center;justify-content:space-between;gap:16px}.achievement-category-head>div{display:flex;align-items:center;gap:10px}.achievement-category-head h2{margin:0}.achievement-category-icon{font-size:23px}
.achievement-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px}.achievement-card{display:grid;grid-template-columns:auto 1fr;gap:13px;align-items:start;padding:16px;border:1px solid var(--line);border-radius:12px;background:#10130e;min-width:0}.achievement-card.unlocked{border-color:#536f31;background:linear-gradient(140deg,#1e2b16,#11150e)}.achievement-card.locked{opacity:.72}.achievement-card h3{font-size:14px;margin:1px 0 5px}.achievement-card p{font-size:11px;line-height:1.45;color:var(--muted);margin:0}.achievement-card progress{height:4px;margin:11px 0 7px}.achievement-card small{font-size:10px}.achievement-card.unlocked small{color:var(--lime)}
.achievement-icon{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;font-size:17px;background:#171c13}.achievement-card.unlocked .achievement-icon{border-color:#6b8a3f;box-shadow:0 0 16px #c5f65b22}
.mission-route{position:relative;max-width:900px;margin:10px auto 0;padding:16px 0 16px 80px;min-height:650px}.mission-rail{position:absolute;left:31px;top:24px;bottom:24px;width:5px;border-radius:6px;background:#293124;overflow:hidden}.mission-rail i{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(0deg,#6d8b36,#c5f65b);box-shadow:0 0 14px #c5f65b66;border-radius:6px}.mission-rocket{position:absolute;left:4px;z-index:2;font-size:39px;line-height:1;filter:drop-shadow(0 0 12px #c5f65b99);transition:bottom .5s ease}.mission-stops{display:grid;gap:10px}.mission-stop{min-height:48px;display:flex;align-items:center;gap:13px;color:var(--muted);padding:7px 10px;border-radius:9px}.mission-stop b{display:block;font-size:13px;color:#b4bca9}.mission-stop small{display:block;font-size:10px;margin-top:2px}.mission-node{width:24px;height:24px;flex:0 0 24px;display:grid;place-items:center;border:2px solid #3c4633;border-radius:50%;background:#11150e;color:#6f7967;font-size:11px}.mission-stop.unlocked{background:#182114}.mission-stop.unlocked b{color:var(--text)}.mission-stop.unlocked .mission-node{border-color:var(--lime);background:var(--lime);color:#111609;font-weight:800}.mission-stop.next{outline:1px solid #667d3c;background:#1b2416}.mission-stop.next .mission-node{border-color:var(--lime);box-shadow:0 0 14px #c5f65b55}
.achievement-celebration{text-align:center;padding:10px 8px}.achievement-celebration h2{font-size:29px;margin:11px auto 10px;padding:0}.achievement-celebration p{max-width:520px;margin:0 auto 16px}.celebration-rocket{font-size:74px;filter:drop-shadow(0 0 18px #c5f65b77);animation:rocket-pop .7s ease both}@keyframes rocket-pop{0%{transform:translateY(34px) scale(.75);opacity:0}65%{transform:translateY(-7px) scale(1.08);opacity:1}100%{transform:translateY(0) scale(1)}}
@media(max-width:1180px){.achievement-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.achievement-records{grid-template-columns:repeat(2,minmax(0,1fr))}.next-achievements{grid-template-columns:1fr}}
@media(max-width:720px){.achievements-hero{grid-template-columns:1fr}.hero-rocket{font-size:64px;padding:0}.achievement-grid,.achievement-records{grid-template-columns:1fr}.mission-route{padding-left:62px;min-height:520px}.mission-rail{left:24px}.mission-rocket{left:-2px;font-size:34px}.mission-stop{padding-right:2px}}
'''
if '/* v3.0 — Conquistas · Missão TCU */' not in styles:
    styles += css

app_path.write_text(app, encoding='utf-8')
personal_path.write_text(personal, encoding='utf-8')
styles_path.write_text(styles, encoding='utf-8')
index_path.write_text(index, encoding='utf-8')

app2=app_path.read_text(encoding='utf-8')
personal2=personal_path.read_text(encoding='utf-8')
index2=index_path.read_text(encoding='utf-8')
assert 'function achievementsPage()' in app2
assert 'achievementSnapshot' in app2
assert 'achievements:achievementsPage' in app2
assert '3.0-conquistas-missao-tcu' in index2
assert '<a href="#achievements">🚀 <span>Conquistas</span></a>' in index2
assert 'achievementsSeen' in personal2
assert (root/'src/achievements.js').exists()
assert 'MutationObserver' not in (root/'drive-sync.js').read_text(encoding='utf-8')
assert 'main.focus()' not in app2
