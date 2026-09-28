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
  id:'meta-01',number:1,title:'Meta 01 · 30h reais',subtitle:'Consolidar o novo Método ET com 25h de núcleo obrigatório + 5h de margem dinâmica. TI inicia por FD01 dentro da trilha própria TI–TCU de 36 itens; conteúdos adicionais de segurança permanecem integralmente preservados.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,
  tasks:[
   {id:'m01-01',title:'AFO · Módulo 1 — bateria de questões',check:['battery','afo','afo-u-1']},
   {id:'m01-02',title:'DAD · Aula 1 — revisão + bateria',check:['battery','dad','dad-u-1']},
   {id:'m01-03',title:'TI · P1.1 FD01 — cerca de 16 páginas',check:['sessionCount','ti','ti-u-2','theory',1]},
   {id:'m01-04',title:'AFO · Módulo 2 — bateria de questões',check:['battery','afo','afo-u-2']},
   {id:'m01-05',title:'Português · Aula 1 — primeira sessão',check:['sessionCount','port','port-u-1','theory',1]},
   {id:'m01-06',title:'DCON · Art. 5º — blocos 14–15',check:['blockAtLeast','dcon','dcon-u-4',15]},
   {id:'m01-07',title:'AFO · Módulo 3 — microrrevisão + bateria',check:['battery','afo','afo-u-3']},
   {id:'m01-08',title:'DAD · Organização Administrativa — parte 1',check:['sessionCount','dad','dad-u-2','theory',1]},
   {id:'m01-09',title:'TI · P1.1 FD01 — próxima faixa de leitura',check:['sessionCount','ti','ti-u-2','theory',2]},
   {id:'m01-10',title:'AFO · Checkpoint M1–M3',check:['checkpoint','afo','afo-cp-1']},
   {id:'m01-11',title:'Português · Aula 1 — concluir teoria',check:['theory','port','port-u-1']},
   {id:'m01-12',title:'DCON · Art. 5º — blocos 16–17',check:['blockAtLeast','dcon','dcon-u-4',17]},
   {id:'m01-13',title:'AFO · Módulo 4 — microrrevisão + bateria',check:['battery','afo','afo-u-4']},
   {id:'m01-14',title:'DAD · Organização Administrativa — concluir teoria',check:['theory','dad','dad-u-2']},
   {id:'m01-15',title:'TI · P1.1 FD01 — concluir teoria',check:['theory','ti','ti-u-2']},
   {id:'m01-16',title:'AFO · Módulo 5 — teoria',check:['theory','afo','afo-u-5']},
   {id:'m01-17',title:'Português · Aula 1 — revisão + bateria',check:['battery','port','port-u-1']},
   {id:'m01-18',title:'DCON · Art. 5º — blocos 18–19',check:['blockAtLeast','dcon','dcon-u-4',19]}
  ]
 },
 {
  id:'meta-02',number:2,title:'Meta 02 · 30h reais',subtitle:'Continuidade direta da Meta 01: consolidar pendências de revisão/bateria e avançar um novo bloco de teoria, mantendo 25h de núcleo + 5h de margem dinâmica.',targetMinutes:1800,coreMinutes:1500,marginMinutes:300,
  tasks:[
   {id:'m02-01',title:'AFO · Módulo 5 — Gestão organizacional das finanças públicas · teoria',check:['theory','afo','afo-u-5']},
   {id:'m02-02',title:'DAD · Aula 1 — revisão + bateria',check:['battery','dad','dad-u-1']},
   {id:'m02-03',title:'TI · FD02 — revisão + bateria',check:['battery','ti','ti-u-3']},
   {id:'m02-04',title:'AFO · Módulo 5 — microrrevisão + bateria',check:['battery','afo','afo-u-5']},
   {id:'m02-05',title:'Português · Aula 2 — concluir teoria (blocos 4–5)',check:['theory','port','port-u-2']},
   {id:'m02-06',title:'DCON · Art. 5º — blocos 20–21',check:['blockAtLeast','dcon','dcon-u-4',21]},
   {id:'m02-07',title:'AFO · Módulo 6 — Ciclo Orçamentário · teoria',check:['theory','afo','afo-u-6']},
   {id:'m02-08',title:'DAD · Aula 2 — revisão + bateria',check:['battery','dad','dad-u-2']},
   {id:'m02-09',title:'TI · FD03 — Modelo Entidade-Relacionamento · teoria',check:['theory','ti','ti-u-4']},
   {id:'m02-10',title:'AFO · Módulo 6 — microrrevisão + bateria',check:['battery','afo','afo-u-6']},
   {id:'m02-11',title:'Português · Aula 2 — revisão + bateria',check:['battery','port','port-u-2']},
   {id:'m02-12',title:'DCON · Art. 5º — blocos 22–24 · concluir teoria',check:['theory','dcon','dcon-u-4']},
   {id:'m02-13',title:'AFO · Checkpoint 2 — Módulos 4–6',check:['checkpoint','afo','afo-cp-2']},
   {id:'m02-14',title:'DAD · Aula 3 — Administração Pública Indireta · teoria',check:['theory','dad','dad-u-3']},
   {id:'m02-15',title:'TI · FD03 — revisão + bateria',check:['battery','ti','ti-u-4']},
   {id:'m02-16',title:'AFO · Módulo 7 — Receita: classificações e estágios · teoria',check:['theory','afo','afo-u-7']},
   {id:'m02-17',title:'Português · Aula 3 — Classes de Palavras · teoria',check:['theory','port','port-u-3']},
   {id:'m02-18',title:'DCON · A02 — 1ª aula de questões / bateria',check:['sessionCount','dcon','dcon-u-4','battery',1]}
  ]
 }
];

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
 if(!next)throw Error('A próxima meta ainda precisa ser configurada antes do fechamento.');
 const now=new Date().toISOString();item.status='done';item.completedAt=now;
 const n=ensureGoalItem(st,index+1,'locked');n.status='active';n.startedAt=now;st.goals.current=index+1;
 ensureGoalItem(st,index+2,'locked');
 return st;
}

export function normalizeExtras(current){const st=copy(current);if(st.reminders===undefined)st.reminders=[];if(!Array.isArray(st.reminders))throw Error('Lista de lembretes inválida.');for(const n of st.reminders)if(typeof n.id!=='string'||typeof n.text!=='string'||!n.text.trim()||n.text.length>5000||!Object.hasOwn(REMINDER_STATUS,n.status))throw Error('Lembrete inválido no backup.');if(new Set(st.reminders.map(n=>n.id)).size!==st.reminders.length)throw Error('Lembretes duplicados.');if(st.motivationStartDay===undefined)st.motivationStartDay=day();if(!validDay(st.motivationStartDay))throw Error('Data de motivação inválida.');if(st.legislation===undefined)st.legislation={queue:copy(LEGISLATION_QUEUE),current:0,sessions:[],completed:[]};if(!Array.isArray(st.legislation.queue)||!st.legislation.queue.length)st.legislation.queue=copy(LEGISLATION_QUEUE);if(!Array.isArray(st.legislation.sessions))st.legislation.sessions=[];if(!Array.isArray(st.legislation.completed))st.legislation.completed=[];if(!Number.isInteger(st.legislation.current)||st.legislation.current<0)st.legislation.current=0;st.legislation.current=Math.min(st.legislation.current,Math.max(0,st.legislation.queue.length-1));for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}if(st.achievementsSeen===undefined)st.achievementsSeen=[];if(!Array.isArray(st.achievementsSeen)||st.achievementsSeen.some(id=>typeof id!=='string')||new Set(st.achievementsSeen).size!==st.achievementsSeen.length)throw Error('Histórico de conquistas inválido no backup.');normalizeGoalState(st);return st;}
export function saveReminder(current,{id,text,status='todo'}){const st=normalizeExtras(current);text=String(text??'').trim();if(!text||text.length>5000||!Object.hasOwn(REMINDER_STATUS,status))throw Error('Escreva um lembrete de até 5.000 caracteres e escolha uma situação válida.');let note=id?st.reminders.find(n=>n.id===id):null;if(id&&!note)throw Error('Lembrete não encontrado.');if(!note){note={id:uid(),createdAt:new Date().toISOString()};st.reminders.push(note);}Object.assign(note,{text,status,updatedAt:new Date().toISOString()});return st;}
export function motivationForDay(start,date=day()){const serial=d=>{let [y,m,dd]=d.split('-').map(Number);return Date.UTC(y,m-1,dd)/86400000;};const elapsed=Math.max(0,serial(date)-serial(start));return {...MOTIVATION[elapsed%MOTIVATION.length],index:elapsed%MOTIVATION.length};}
