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
export const MOTIVATION=[
 {file:'past-future.svg',title:'Meu passado não define meu futuro!',alt:'Seu passado não define seu futuro. O futuro será impactado pelo que você fizer hoje. Cada avanço no presente impactará positivamente seu futuro.',source:'Material enviado por Douglas'},
 {file:'mindset.svg',title:'Mentalidade do 01',alt:'Não estude apenas para passar: dedique-se com o primeiro lugar como objetivo. Busque compreender de verdade. Isso não exige perfeição; exige elevar seu padrão de execução.',source:'Material enviado por Douglas'},
 {file:'routine.svg',title:'O topo é construído na rotina.',alt:'O topo é construído na rotina. Uma sessão com foco. Uma dúvida resolvida. Um passo adiante.',source:'Arte original · Método ET'},
 {file:'next-step.svg',title:'Um passo de cada vez.',alt:'Você não precisa vencer tudo hoje. Precisa cumprir o próximo passo — e continuar amanhã.',source:'Arte original · Método ET'}
];
export function normalizeExtras(current){const st=copy(current);if(st.reminders===undefined)st.reminders=[];if(!Array.isArray(st.reminders))throw Error('Lista de lembretes inválida.');for(const n of st.reminders)if(typeof n.id!=='string'||typeof n.text!=='string'||!n.text.trim()||n.text.length>5000||!Object.hasOwn(REMINDER_STATUS,n.status))throw Error('Lembrete inválido no backup.');if(new Set(st.reminders.map(n=>n.id)).size!==st.reminders.length)throw Error('Lembretes duplicados.');if(st.motivationStartDay===undefined)st.motivationStartDay=day();if(!validDay(st.motivationStartDay))throw Error('Data de motivação inválida.');if(st.legislation===undefined)st.legislation={queue:copy(LEGISLATION_QUEUE),current:0,sessions:[],completed:[]};if(!Array.isArray(st.legislation.queue)||!st.legislation.queue.length)st.legislation.queue=copy(LEGISLATION_QUEUE);if(!Array.isArray(st.legislation.sessions))st.legislation.sessions=[];if(!Array.isArray(st.legislation.completed))st.legislation.completed=[];if(!Number.isInteger(st.legislation.current)||st.legislation.current<0)st.legislation.current=0;st.legislation.current=Math.min(st.legislation.current,Math.max(0,st.legislation.queue.length-1));for(const x of st.legislation.sessions){if(typeof x.id!=='string'||!validDay(x.date)||!Number.isInteger(x.minutes)||x.minutes<1||x.minutes>1440||typeof x.normId!=='string')throw Error('Registro de legislação inválido no backup.');}return st;}
export function saveReminder(current,{id,text,status='todo'}){const st=normalizeExtras(current);text=String(text??'').trim();if(!text||text.length>5000||!Object.hasOwn(REMINDER_STATUS,status))throw Error('Escreva um lembrete de até 5.000 caracteres e escolha uma situação válida.');let note=id?st.reminders.find(n=>n.id===id):null;if(id&&!note)throw Error('Lembrete não encontrado.');if(!note){note={id:uid(),createdAt:new Date().toISOString()};st.reminders.push(note);}Object.assign(note,{text,status,updatedAt:new Date().toISOString()});return st;}
export function motivationForDay(start,date=day()){const serial=d=>{let [y,m,dd]=d.split('-').map(Number);return Date.UTC(y,m-1,dd)/86400000;};const elapsed=Math.max(0,serial(date)-serial(start));return {...MOTIVATION[elapsed%MOTIVATION.length],index:elapsed%MOTIVATION.length};}
