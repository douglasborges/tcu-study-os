import {copy,day,validDay,uid} from './core.js';
export const REMINDER_STATUS={todo:'A fazer',done:'Feito',future:'Futuramente'};
export const LEGISLATION_QUEUE=[
 {id:'cf88',short:'CF/88',title:'Constituição Federal de 1988'},
 {id:'l8112',short:'Lei 8.112/1990',title:'Regime Jurídico dos Servidores Públicos Federais'},
 {id:'l9784',short:'Lei 9.784/1999',title:'Processo Administrativo Federal'},
 {id:'l14133',short:'Lei 14.133/2021',title:'Lei de Licitações e Contratos Administrativos'},
 {id:'l8429',short:'Lei 8.429/1992',title:'Lei de Improbidade Administrativa — texto consolidado'},
 {id:'lai',short:'Lei 12.527/2011',title:'Lei de Acesso à Informação'},
 {id:'lgpd',short:'Lei 13.709/2018',title:'Lei Geral de Proteção de Dados Pessoais'},
 {id:'l12846',short:'Lei 12.846/2013',title:'Lei Anticorrupção'}
];
export const GOAL_TEMPLATES=[
 {
  id:'meta-01',number:1,title:'Meta 01 · 30h reais',subtitle:'Início da jornada CGU: construir base em Português, Direito Constitucional e Informática e Dados, com ciclo mínimo de 1h por disciplina e tempo real livre.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,
  tasks:[
   {id:'c01-01',title:'Português · Aula 1 — teoria',check:['theory','port','port-u-1']},
   {id:'c01-02',title:'DCON · Aula 1 — Aplicabilidade das normas · teoria',check:['theory','dcon','dcon-u-1']},
   {id:'c01-03',title:'Informática · Windows 11 — teoria',check:['theory','info','info-u-1']},
   {id:'c01-04',title:'Português · Aula 1 — revisão + bateria',check:['battery','port','port-u-1']},
   {id:'c01-05',title:'DCON · Aula 1 — revisão + bateria',check:['battery','dcon','dcon-u-1']},
   {id:'c01-06',title:'Informática · Word — teoria',check:['theory','info','info-u-4']},
   {id:'c01-07',title:'Português · Aula 2 — teoria',check:['theory','port','port-u-2']},
   {id:'c01-08',title:'DCON · Aula 2 — Princípios fundamentais · teoria',check:['theory','dcon','dcon-u-2']},
   {id:'c01-09',title:'Informática · Excel — teoria',check:['theory','info','info-u-5']},
   {id:'c01-10',title:'Português · Aula 2 — revisão + bateria',check:['battery','port','port-u-2']},
   {id:'c01-11',title:'DCON · Aula 2 — revisão + bateria',check:['battery','dcon','dcon-u-2']},
   {id:'c01-12',title:'Informática · PowerPoint — teoria',check:['theory','info','info-u-6']},
   {id:'c01-13',title:'Português · Aula 3 — teoria',check:['theory','port','port-u-3']},
   {id:'c01-14',title:'DCON · Aula 3 — Direitos e Garantias Fundamentais · teoria',check:['theory','dcon','dcon-u-3']},
   {id:'c01-15',title:'Informática · Correio Eletrônico — teoria',check:['theory','info','info-u-8']},
   {id:'c01-16',title:'Português · Aula 3 — revisão + bateria',check:['battery','port','port-u-3']},
   {id:'c01-17',title:'DCON · Aula 3 — revisão + bateria',check:['battery','dcon','dcon-u-3']},
   {id:'c01-18',title:'Informática · Navegadores — teoria',check:['theory','info','info-u-9']}
  ]
 },
 {
  id:'meta-02',number:2,title:'Meta 02 · 30h reais',subtitle:'🔒 Próxima etapa. O roteiro será definido ao final da Meta 01 usando o avanço real da Camile.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,tasks:[],placeholder:true
 }
];

export const BIZURAFO_MODULES=Object.freeze([
 {id:'biz-01',number:1,title:'Conceito, dimensões, tipos de orçamento e intervenção do Estado nas finanças públicas',status:'core',note:'Núcleo TCU: funções do governo, falhas de mercado, políticas econômicas, federalismo fiscal e conceitos de orçamento. Se a aula entrar em tripé macroeconômico como aprofundamento autônomo, não priorize nesta passagem de AFO.'},
 {id:'biz-02',number:2,title:'Instrumentos de planejamento — PPA, LDO e LOA',status:'core',note:'Núcleo expresso do TCU.'},
 {id:'biz-03',number:3,title:'Princípios orçamentários',status:'core',note:'Núcleo expresso do TCU. Na primeira passagem, priorize a teoria principal; a aula única extra e as baterias longas podem ficar para depois.'},
 {id:'biz-04',number:4,title:'Créditos adicionais e alterações orçamentárias',status:'core',note:'Núcleo expresso do TCU.'},
 {id:'biz-05',number:5,title:'Ciclo orçamentário',status:'core',note:'Núcleo expresso do TCU: elaboração, discussão/votação, emendas, execução e controle.'},
 {id:'biz-06',number:6,title:'Técnicas orçamentárias e orçamento-programa',status:'core',note:'Núcleo expresso do TCU: evolução conceitual, técnicas e orçamento-programa.'},
 {id:'biz-07',number:7,title:'Receita pública',status:'core',note:'Núcleo TCU: classificações, estágios, fontes e dívida ativa.'},
 {id:'biz-08',number:8,title:'Despesa pública',status:'core',note:'Núcleo TCU: classificações e estágios. Restos a pagar e temas correlatos reaparecem nos módulos seguintes.'},
 {id:'biz-09',number:9,title:'Execução orçamentária e financeira, programação e descentralização',status:'core',note:'Execução e programação são núcleo TCU. Descentralização é muito recorrente em editais recentes de controle e fica mantida por segurança.'},
 {id:'biz-10',number:10,title:'Restos a pagar, despesas de exercícios anteriores e suprimento de fundos',status:'core',note:'ESTUDAR. Restos a pagar e DEA decorrem do recorte da Lei 4.320/1964 cobrado pelo TCU, e o suprimento de fundos/regime de adiantamento está nos arts. 68–69, dentro do Título VI — expressamente incluído no edital.'},
 {id:'biz-11',number:11,title:'Lei de Responsabilidade Fiscal — LRF',status:'cut',note:'ESTUDAR COM CORTES: priorize conceitos/RCL, planejamento, LDO/LOA, renúncia, geração de despesas, transferências voluntárias, destinação ao setor privado, transparência, prestação de contas e fiscalização. Adie, neste intensivão, pessoal, seguridade, endividamento, gestão patrimonial e relatórios RREO/RGF quando tratados só como aprofundamento de LRF.'},
 {id:'biz-12',number:12,title:'Sistemas de informações',status:'cut',note:'ESTUDAR COM CORTES: SIAFI é expresso no TCU. SIOP fica como extra útil por tendência recente de controle. SIAFIC/GRU/rol de responsáveis ficam em baixa prioridade. A grade enviada não substitui a futura cobertura de SIASG e SICONV, também expressos no TCU 2021.'},
 {id:'biz-13',number:13,title:'Regime de ajustes fiscais',status:'pause',note:'NÃO ESTUDAR NESTE INTENSIVÃO. Não aparece nominalmente no bloco de AFO do TCU 2021; fica preservado para segunda volta/atualização constitucional, sem exclusão definitiva.'},
 {id:'biz-14',number:14,title:'Lei 4.320/1964 — multibancas',status:'cut',note:'ESTUDAR COM CORTE/SEGUNDA VOLTA: o TCU 2021 cobra expressamente os Títulos I, IV, V e VI. Na aula dos arts. 22–35, não priorize arts. 22–33 (Títulos II e III); retome a partir do art. 34. Use o restante como consolidação, não como primeiro contato.'},
 {id:'biz-15',number:15,title:'Conta Única do Tesouro Nacional',status:'core',note:'Núcleo expresso do TCU: conceito e previsão legal.'},
 {id:'biz-16',number:16,title:'Questões extras Cebraspe',status:'optional',note:'OPCIONAL NO PRIMEIRO GIRO. Use como diagnóstico ao final dos blocos; não é necessário assistir todas as resoluções longas agora.'}
]);
const BIZ_STATUS_LABEL={core:'ESTUDAR',cut:'ESTUDAR COM CORTES',pause:'NÃO ESTUDAR AGORA',optional:'OPCIONAL'};
export function bizurStatusLabel(status){return BIZ_STATUS_LABEL[status]||status;}
export function bizurSnapshot(current){
 const st=normalizeExtras(copy(current)),b=st.bizurafo,rows=(st.sessions||[]).filter(s=>s.bizurafoModuleId);
 const modules=BIZURAFO_MODULES.map(m=>{const rec=b.modules.find(x=>x.id===m.id)||{},logs=rows.filter(x=>x.bizurafoModuleId===m.id);return {...m,done:!!rec.done,minutes:logs.reduce((a,x)=>a+(Number(x.minutes)||0),0),questions:logs.reduce((a,x)=>a+(Number(x.questions)||0),0),correct:logs.reduce((a,x)=>a+(Number(x.correct)||0),0)};});
 const active=modules.find(m=>!m.done&&m.status!=='pause'&&m.status!=='optional')||modules.find(m=>!m.done&&m.status!=='pause')||modules.at(-1);
 return {active:b.focus.active,startedAt:b.focus.startedAt,pausedCycleIndex:b.focus.pausedCycleIndex,modules,next:active,done:modules.filter(m=>m.done).length,minutes:rows.reduce((a,x)=>a+(Number(x.minutes)||0),0)};
}
export function recordBizurAFO(current,input){
 const st=normalizeExtras(copy(current)),m=BIZURAFO_MODULES.find(x=>x.id===input.moduleId),date=String(input.date||''),minutes=Number(input.minutes),questions=Number(input.questions||0),correct=Number(input.correct||0);
 if(!m)throw Error('Módulo BizurAFO não encontrado.');
 if(!validDay(date)||date>day()||!Number.isInteger(minutes)||minutes<1||minutes>1440)throw Error('Confira data e duração do estudo.');
 if(!Number.isInteger(questions)||!Number.isInteger(correct)||questions<0||correct<0||correct>questions)throw Error('Confira questões e acertos.');
 if(m.status==='pause')throw Error('Este módulo está marcado para não estudar neste intensivão.');
 st.sessions.push({id:uid(),subjectId:'afo',unitId:'',title:'BizurAFO · Módulo '+String(m.number).padStart(2,'0')+' · '+m.title,date,createdAt:new Date().toISOString(),activity:'free',minutes,questions,correct,medium:String(input.medium||'video'),start:null,end:null,notes:String(input.notes||''),legacy:false,cycleApplied:false,bizurafoModuleId:m.id});
 const rec=st.bizurafo.modules.find(x=>x.id===m.id);if(input.done)rec.done=true;
 return st;
}
export function setBizurModuleDone(current,id,done=true){const st=normalizeExtras(copy(current)),rec=st.bizurafo.modules.find(x=>x.id===id);if(!rec)throw Error('Módulo BizurAFO não encontrado.');rec.done=!!done;return st;}
export function endBizurFocus(current){const st=normalizeExtras(copy(current));st.bizurafo.focus.active=false;st.bizurafo.focus.endedAt=new Date().toISOString();return st;}
export function resumeBizurFocus(current){const st=normalizeExtras(copy(current));st.bizurafo.focus.active=true;st.bizurafo.focus.startedAt=st.bizurafo.focus.startedAt||new Date().toISOString();return st;}

export const MOTIVATION=[
 {file:'past-future.svg',title:'Meu passado não define meu futuro!',alt:'Seu passado não define seu futuro. O futuro será impactado pelo que você fizer hoje. Cada avanço no presente impactará positivamente seu futuro.',source:'Material enviado por Douglas'},
 {file:'mindset.svg',title:'Mentalidade do 01',alt:'Não estude apenas para passar: dedique-se com o primeiro lugar como objetivo. Busque compreender de verdade. Isso não exige perfeição; exige elevar seu padrão de execução.',source:'Material enviado por Douglas'},
 {file:'routine.svg',title:'O topo é construído na rotina.',alt:'O topo é construído na rotina. Uma sessão com foco. Uma dúvida resolvida. Um passo adiante.',source:'Arte original · Método ET'},
 {file:'next-step.svg',title:'Um passo de cada vez.',alt:'Você não precisa vencer tudo hoje. Precisa cumprir o próximo passo — e continuar amanhã.',source:'Arte original · Método ET'}
];
function placeholderGoal(number){
 const n=String(number).padStart(2,'0');
 return {id:'meta-'+n,number,title:'Meta '+n+' · 30h reais',subtitle:'Próxima etapa da jornada. O roteiro será definido ao final da meta atual, usando seu avanço real.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,tasks:[],placeholder:true};
}
function goalTemplateAt(index){return GOAL_TEMPLATES[index]||placeholderGoal(index+1);}
function ensureGoalItem(st,index,status='locked'){
 const t=goalTemplateAt(index);
 let item=st.goals.items.find(x=>x.id===t.id);
 if(!item){item={id:t.id,status,startedAt:null,completedAt:null};st.goals.items.push(item);}
 return item;
}
function normalizeGoalState(st){
 if(st.goals===undefined)st.goals={current:0,items:GOAL_TEMPLATES.map((g,i)=>({id:g.id,status:i===0?'active':'locked',startedAt:i===0?'2026-09-18T00:00:00-03:00':null,completedAt:null}))};
 if(!st.goals||!Array.isArray(st.goals.items))throw Error('Metas ET inválidas no backup.');
 for(const [i,t] of GOAL_TEMPLATES.entries()){
  let item=st.goals.items.find(x=>x.id===t.id);
  if(!item){item={id:t.id,status:i===0?'active':'locked',startedAt:i===0?'2026-09-18T00:00:00-03:00':null,completedAt:null};st.goals.items.push(item);}
  if(!['active','locked','done'].includes(item.status))throw Error('Situação de Meta ET inválida no backup.');
 }
 let activeIndex=st.goals.items.findIndex(x=>x.status==='active');
 if(!Number.isInteger(st.goals.current)||st.goals.current<0||activeIndex<0)st.goals.current=activeIndex>=0?activeIndex:Math.max(0,Math.min(st.goals.current||0,st.goals.items.length-1));
 else st.goals.current=activeIndex;
 // Regra permanente: sempre mostrar exatamente a próxima meta como horizonte bloqueado.
 const horizon=st.goals.current+1,next=ensureGoalItem(st,horizon,'locked');
 if(next.status!=='done'&&next.status!=='active')next.status='locked';
 return st;
}
export function goalTaskDone(current,task){
 if(!task?.check)return false;
 const [kind,sid,id,a,b]=task.check,s=current.subjects?.find(x=>x.id===sid);
 if(kind==='checkpoint')return !!s?.checkpoints?.[id]?.done;
 if(kind==='sessionCount'){
  const count=Number(b)||1;
  return (current.sessions||[]).filter(v=>v.legacy!==true&&v.subjectId===sid&&v.unitId===id&&(!a||v.activity===a)).length>=count;
 }
 if(kind==='blockAtLeast'){
  const target=Number(a)||0,rows=(current.sessions||[]).filter(v=>v.legacy!==true&&v.subjectId===sid&&v.unitId===id);
  let max=0;for(const v of rows){for(const m of (String(v.title||'')+' '+String(v.notes||'')).matchAll(/bloco\s*(\d+)/gi))max=Math.max(max,Number(m[1])||0);}
  return max>=target;
 }
 const u=s?.units?.find(x=>x.id===id);
 return kind==='theory'?!!u?.theoryDone:kind==='battery'?!!u?.batteryDone:kind==='general'?!!u?.generalDone:false;
}
export function goalSnapshot(current,index=null){
 const st=normalizeGoalState(copy(current)),i=index===null?st.goals.current:Number(index),template=goalTemplateAt(i),item=st.goals.items.find(x=>x.id===template.id);
 if(!template||!item)throw Error('Meta ET não encontrada.');
 const target=template.targetMinutes;
 if(item.status==='locked')return {...template,...item,index:i,minutes:0,studyMinutes:0,lawMinutes:0,remaining:target,progress:0,ready:false,tasks:template.tasks.map(t=>({...t,done:false}))};
 const start=item.startedAt?Date.parse(item.startedAt):NaN,end=item.completedAt?Date.parse(item.completedAt):Infinity;
 const within=s=>{const stamp=Date.parse(s.createdAt||s.date+'T12:00:00');return (!Number.isFinite(start)||stamp>=start)&&stamp<=end;};
 const rows=st.sessions.filter(s=>s.legacy!==true&&s.activity!=='night'&&within(s)),lawRows=(st.legislation?.sessions||[]).filter(within);
 const studyMinutes=rows.reduce((a,s)=>a+(Number(s.minutes)||0),0),lawMinutes=lawRows.reduce((a,s)=>a+(Number(s.minutes)||0),0),minutes=studyMinutes+lawMinutes;
 return {...template,...item,index:i,minutes,studyMinutes,lawMinutes,remaining:Math.max(0,target-minutes),progress:target?Math.min(1,minutes/target):0,ready:minutes>=target,tasks:template.tasks.map(t=>({...t,done:goalTaskDone(st,t)}))};
}
export function completeGoal(current,id){
 const st=normalizeGoalState(copy(current)),index=st.goals.items.findIndex(x=>x.id===id),template=GOAL_TEMPLATES[index];
 if(index<0||!template)throw Error('Esta meta ainda é apenas o horizonte bloqueado. Configure o roteiro antes de ativá-la.');
 const item=st.goals.items[index];
 if(item.status==='locked')throw Error('Esta meta ainda está bloqueada.');
 if(item.status==='done')return st;
 const snap=goalSnapshot(st,index);
 if(!snap.ready)throw Error('A meta fecha apenas com 30 horas reais registradas. Faltam '+Math.max(0,snap.remaining)+' minutos.');
 const next=GOAL_TEMPLATES[index+1];
 if(!next||next.placeholder||!next.tasks?.length)throw Error('A próxima meta ainda precisa ser configurada antes do fechamento.');
 const now=new Date().toISOString();item.status='done';item.completedAt=now;
 const n=ensureGoalItem(st,index+1,'locked');n.status='active';n.startedAt=now;st.goals.current=index+1;
 ensureGoalItem(st,index+2,'locked');
 return st;
}

export function normalizeExtras(current){const st=copy(current);if(st.reminders===undefined)st.reminders=[];if(!Array.isArray(st.reminders))throw Error('Lista de lembretes inválida.');for(const n of st.reminders)if(typeof n.id!=='string'||typeof n.text!=='string'||!n.text.trim()||n.text.length>5000||!Object.hasOwn(REMINDER_STATUS,n.status))throw Error('Lembrete inválido no backup.');if(new Set(st.reminders.map(n=>n.id)).size!==st.reminders.length)throw Error('Lembretes duplicados.');if(st.motivationStartDay===undefined)st.motivationStartDay=day();if(!validDay(st.motivationStartDay))throw Error('Data de motivação inválida.');if(st.legislation===undefined)st.legislation={queue:copy(LEGISLATION_QUEUE),current:0,sessions:[],completed:[]};if(!Array.isArray(st.legislation.queue)||!st.legislation.queue.length)st.legislation.queue=copy(LEGISLATION_QUEUE);if(!Array.isArray(st.legislation.sessions))st.legislation.sessions=[];if(!Array.isArray(st.legislation.completed))st.legislation.completed=[];if(!Number.isInteger(st.legislation.current)||st.legislation.current<0)st.legislation.current=0;st.legislation.current=Math.min(st.legislation.current,Math.max(0,st.legislation.queue.length-1));for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}if(st.achievementsSeen===undefined)st.achievementsSeen=[];if(!Array.isArray(st.achievementsSeen)||st.achievementsSeen.some(id=>typeof id!=='string')||new Set(st.achievementsSeen).size!==st.achievementsSeen.length)throw Error('Histórico de conquistas inválido no backup.');if(st.bizurafo===undefined)st.bizurafo={focus:{active:false,startedAt:null,endedAt:null,pausedCycleIndex:Number(st.cycle?.index)||0},modules:BIZURAFO_MODULES.map(m=>({id:m.id,done:false}))};if(!st.bizurafo.focus||typeof st.bizurafo.focus.active!=='boolean')throw Error('Modo BizurAFO inválido no backup.');if(!Array.isArray(st.bizurafo.modules))st.bizurafo.modules=[];for(const m of BIZURAFO_MODULES)if(!st.bizurafo.modules.some(x=>x.id===m.id))st.bizurafo.modules.push({id:m.id,done:false});normalizeGoalState(st);return st;}
export function saveReminder(current,{id,text,status='todo'}){const st=normalizeExtras(current);text=String(text??'').trim();if(!text||text.length>5000||!Object.hasOwn(REMINDER_STATUS,status))throw Error('Escreva um lembrete de até 5.000 caracteres e escolha uma situação válida.');let note=id?st.reminders.find(n=>n.id===id):null;if(id&&!note)throw Error('Lembrete não encontrado.');if(!note){note={id:uid(),createdAt:new Date().toISOString()};st.reminders.push(note);}Object.assign(note,{text,status,updatedAt:new Date().toISOString()});return st;}
export function motivationForDay(start,date=day()){const serial=d=>{let [y,m,dd]=d.split('-').map(Number);return Date.UTC(y,m-1,dd)/86400000;};const elapsed=Math.max(0,serial(date)-serial(start));return {...MOTIVATION[elapsed%MOTIVATION.length],index:elapsed%MOTIVATION.length};}
