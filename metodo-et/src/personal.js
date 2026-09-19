import {copy,day,validDay,uid} from './core.js';
export const REMINDER_STATUS={todo:'A fazer',done:'Feito',future:'Futuramente'};
export const LEGISLATION_QUEUE=[
 {id:'cf88',short:'CF/88',title:'Constituição Federal de 1988'},
 {id:'lotcu',short:'Lei 8.443/1992',title:'Lei Orgânica do Tribunal de Contas da União'},
 {id:'ritcu',short:'RITCU',title:'Regimento Interno do TCU — Resolução-TCU nº 246/2011 (texto atualizado)'},
 {id:'lrf',short:'LC 101/2000',title:'Lei de Responsabilidade Fiscal'},
 {id:'l4320',short:'Lei 4.320/1964',title:'Normas Gerais de Direito Financeiro'},
 {id:'l10180',short:'Lei 10.180/2001',title:'Sistemas de Planejamento, Orçamento, Administração Financeira, Contabilidade e Controle Interno'},
 {id:'dl200',short:'DL 200/1967',title:'Organização da Administração Federal'},
 {id:'l14133',short:'Lei 14.133/2021',title:'Lei de Licitações e Contratos Administrativos'},
 {id:'l9784',short:'Lei 9.784/1999',title:'Processo Administrativo Federal'},
 {id:'l8112',short:'Lei 8.112/1990',title:'Regime Jurídico dos Servidores Públicos Federais'},
 {id:'l8429',short:'Lei 8.429/1992',title:'Lei de Improbidade Administrativa — texto consolidado'},
 {id:'lai',short:'Lei 12.527/2011',title:'Lei de Acesso à Informação'},
 {id:'lgpd',short:'Lei 13.709/2018',title:'Lei Geral de Proteção de Dados Pessoais'},
 {id:'l12846',short:'Lei 12.846/2013',title:'Lei Anticorrupção'},
 {id:'l13303',short:'Lei 13.303/2016',title:'Lei das Estatais'}
];
export const GOAL_TEMPLATES=[
 {
  id:'meta-01',number:1,title:'Meta 01 · 30h reais',subtitle:'Consolidar o novo Método ET com 25h de núcleo obrigatório + 5h de margem dinâmica. TI inicia pela P1.1 · FD01, sem pré-requisito artificial de módulos de apoio.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,
  tasks:[
   {id:'m01-01',title:'AFO · Módulo 1 — bateria de questões',check:['battery','afo','afo-u-1']},
   {id:'m01-02',title:'DAD · Aula 1 — revisão + bateria',check:['battery','dad','dad-u-1']},
   {id:'m01-03',title:'TI · P1.1 FD01 — cerca de 16 páginas'},
   {id:'m01-04',title:'AFO · Módulo 2 — bateria de questões',check:['battery','afo','afo-u-2']},
   {id:'m01-05',title:'Português · Aula 1 — primeira sessão'},
   {id:'m01-06',title:'DCON · Art. 5º — blocos 14–15'},
   {id:'m01-07',title:'AFO · Módulo 3 — microrrevisão + bateria',check:['battery','afo','afo-u-3']},
   {id:'m01-08',title:'DAD · Organização Administrativa — parte 1'},
   {id:'m01-09',title:'TI · P1.1 FD01 — próxima faixa de leitura'},
   {id:'m01-10',title:'AFO · Checkpoint M1–M3',check:['checkpoint','afo','afo-cp-1']},
   {id:'m01-11',title:'Português · Aula 1 — concluir teoria',check:['theory','port','port-u-1']},
   {id:'m01-12',title:'DCON · Art. 5º — blocos 16–17'},
   {id:'m01-13',title:'AFO · Módulo 4 — microrrevisão + bateria',check:['battery','afo','afo-u-4']},
   {id:'m01-14',title:'DAD · Organização Administrativa — concluir teoria',check:['theory','dad','dad-u-2']},
   {id:'m01-15',title:'TI · P1.1 FD01 — concluir teoria',check:['theory','ti','ti-u-2']},
   {id:'m01-16',title:'AFO · Módulo 5 — teoria',check:['theory','afo','afo-u-5']},
   {id:'m01-17',title:'Português · Aula 1 — revisão + bateria',check:['battery','port','port-u-1']},
   {id:'m01-18',title:'DCON · Art. 5º — blocos 18–19'}
  ]
 },
 {id:'meta-02',number:2,title:'Meta 02',subtitle:'Desbloqueia somente após o fechamento de 30 horas reais da Meta 01.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,tasks:[]}
];

export const MOTIVATION=[
 {file:'past-future.svg',title:'Meu passado não define meu futuro!',alt:'Seu passado não define seu futuro. O futuro será impactado pelo que você fizer hoje. Cada avanço no presente impactará positivamente seu futuro.',source:'Material enviado por Douglas'},
 {file:'mindset.svg',title:'Mentalidade do 01',alt:'Não estude apenas para passar: dedique-se com o primeiro lugar como objetivo. Busque compreender de verdade. Isso não exige perfeição; exige elevar seu padrão de execução.',source:'Material enviado por Douglas'},
 {file:'routine.svg',title:'O topo é construído na rotina.',alt:'O topo é construído na rotina. Uma sessão com foco. Uma dúvida resolvida. Um passo adiante.',source:'Arte original · Método ET'},
 {file:'next-step.svg',title:'Um passo de cada vez.',alt:'Você não precisa vencer tudo hoje. Precisa cumprir o próximo passo — e continuar amanhã.',source:'Arte original · Método ET'}
];
function normalizeGoalState(st){
 if(st.goals===undefined)st.goals={current:0,items:GOAL_TEMPLATES.map((g,i)=>({id:g.id,status:i===0?'active':'locked',startedAt:i===0?'2026-09-18T00:00:00-03:00':null,completedAt:null}))};
 if(!st.goals||!Array.isArray(st.goals.items))throw Error('Metas ET inválidas no backup.');
 for(const [i,t] of GOAL_TEMPLATES.entries()){
  let item=st.goals.items.find(x=>x.id===t.id);
  if(!item){item={id:t.id,status:i===0?'active':'locked',startedAt:i===0?'2026-09-18T00:00:00-03:00':null,completedAt:null};st.goals.items.push(item);}
  if(!['active','locked','done'].includes(item.status))throw Error('Situação de Meta ET inválida no backup.');
 }
 if(!Number.isInteger(st.goals.current)||st.goals.current<0||st.goals.current>=GOAL_TEMPLATES.length){
  const open=GOAL_TEMPLATES.findIndex(t=>st.goals.items.find(x=>x.id===t.id)?.status==='active');
  st.goals.current=open>=0?open:0;
 }
 return st;
}
export function goalTaskDone(current,task){
 if(!task?.check)return false;
 const [kind,sid,id]=task.check,s=current.subjects?.find(x=>x.id===sid);
 if(kind==='checkpoint')return !!s?.checkpoints?.[id]?.done;
 const u=s?.units?.find(x=>x.id===id);
 return kind==='theory'?!!u?.theoryDone:kind==='battery'?!!u?.batteryDone:kind==='general'?!!u?.generalDone:false;
}
export function goalSnapshot(current,index=null){
 const st=normalizeGoalState(copy(current)),i=index===null?st.goals.current:Number(index),template=GOAL_TEMPLATES[i],item=template&&st.goals.items.find(x=>x.id===template.id);
 if(!template||!item)throw Error('Meta ET não encontrada.');
 const start=item.startedAt?Date.parse(item.startedAt):NaN,end=item.completedAt?Date.parse(item.completedAt):Infinity;
 const within=s=>{const stamp=Date.parse(s.createdAt||s.date+'T12:00:00');return (!Number.isFinite(start)||stamp>=start)&&stamp<=end;};
 const rows=st.sessions.filter(s=>s.legacy!==true&&s.activity!=='night'&&within(s)),lawRows=(st.legislation?.sessions||[]).filter(within);
 const studyMinutes=rows.reduce((a,s)=>a+(Number(s.minutes)||0),0),lawMinutes=lawRows.reduce((a,s)=>a+(Number(s.minutes)||0),0),minutes=studyMinutes+lawMinutes,target=template.targetMinutes;
 return {...template,...item,index:i,minutes,studyMinutes,lawMinutes,remaining:Math.max(0,target-minutes),progress:target?Math.min(1,minutes/target):0,ready:minutes>=target,tasks:template.tasks.map(t=>({...t,done:goalTaskDone(st,t)}))};
}
export function completeGoal(current,id){
 const st=normalizeGoalState(copy(current)),index=GOAL_TEMPLATES.findIndex(t=>t.id===id);
 if(index<0)throw Error('Meta ET não encontrada.');
 const item=st.goals.items.find(x=>x.id===id);
 if(item.status==='locked')throw Error('Esta meta ainda está bloqueada.');
 if(item.status==='done')return st;
 const snap=goalSnapshot(st,index);
 if(!snap.ready)throw Error('A meta fecha apenas com 30 horas reais registradas. Faltam '+Math.max(0,snap.remaining)+' minutos.');
 const now=new Date().toISOString();item.status='done';item.completedAt=now;
 const next=GOAL_TEMPLATES[index+1];
 if(next){const n=st.goals.items.find(x=>x.id===next.id);n.status='active';n.startedAt=now;st.goals.current=index+1;}else st.goals.current=index;
 return st;
}

export function normalizeExtras(current){const st=copy(current);if(st.reminders===undefined)st.reminders=[];if(!Array.isArray(st.reminders))throw Error('Lista de lembretes inválida.');for(const n of st.reminders)if(typeof n.id!=='string'||typeof n.text!=='string'||!n.text.trim()||n.text.length>5000||!Object.hasOwn(REMINDER_STATUS,n.status))throw Error('Lembrete inválido no backup.');if(new Set(st.reminders.map(n=>n.id)).size!==st.reminders.length)throw Error('Lembretes duplicados.');if(st.motivationStartDay===undefined)st.motivationStartDay=day();if(!validDay(st.motivationStartDay))throw Error('Data de motivação inválida.');if(st.legislation===undefined)st.legislation={queue:copy(LEGISLATION_QUEUE),current:0,sessions:[],completed:[]};if(!Array.isArray(st.legislation.queue)||!st.legislation.queue.length)st.legislation.queue=copy(LEGISLATION_QUEUE);if(!Array.isArray(st.legislation.sessions))st.legislation.sessions=[];if(!Array.isArray(st.legislation.completed))st.legislation.completed=[];if(!Number.isInteger(st.legislation.current)||st.legislation.current<0)st.legislation.current=0;st.legislation.current=Math.min(st.legislation.current,Math.max(0,st.legislation.queue.length-1));for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}if(st.achievementsSeen===undefined)st.achievementsSeen=[];if(!Array.isArray(st.achievementsSeen)||st.achievementsSeen.some(id=>typeof id!=='string')||new Set(st.achievementsSeen).size!==st.achievementsSeen.length)throw Error('Histórico de conquistas inválido no backup.');normalizeGoalState(st);return st;}
export function saveReminder(current,{id,text,status='todo'}){const st=normalizeExtras(current);text=String(text??'').trim();if(!text||text.length>5000||!Object.hasOwn(REMINDER_STATUS,status))throw Error('Escreva um lembrete de até 5.000 caracteres e escolha uma situação válida.');let note=id?st.reminders.find(n=>n.id===id):null;if(id&&!note)throw Error('Lembrete não encontrado.');if(!note){note={id:uid(),createdAt:new Date().toISOString()};st.reminders.push(note);}Object.assign(note,{text,status,updatedAt:new Date().toISOString()});return st;}
export function motivationForDay(start,date=day()){const serial=d=>{let [y,m,dd]=d.split('-').map(Number);return Date.UTC(y,m-1,dd)/86400000;};const elapsed=Math.max(0,serial(date)-serial(start));return {...MOTIVATION[elapsed%MOTIVATION.length],index:elapsed%MOTIVATION.length};}
