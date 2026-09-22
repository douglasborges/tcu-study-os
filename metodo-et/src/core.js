export const KEY='metodo-et:v1';
export const CYCLE=['afo','dad','ti','afo','port','dcon'];
export const RULES=Object.freeze({afo:{label:'AFO',minutes:120,checkpoint:3,unit:'módulo'},cpu:{label:'Contabilidade Pública',minutes:120,checkpoint:3,unit:'módulo'},dad:{label:'DAD',minutes:120,checkpoint:4,unit:'aula'},ti:{label:'TI',minutes:90,checkpoint:4,unit:'aula'},port:{label:'Português',minutes:120,checkpoint:4,unit:'aula'},dcon:{label:'DCON',minutes:120,checkpoint:4,unit:'aula'}});
export const ACTIVITIES={free:'Estudo livre',theory:'Teoria',micro:'Microrrevisão',battery:'Revisão + primeira bateria',checkpoint:'Checkpoint',general:'Revisão geral',solid:'Questões — Estudo Sólido',night:'Revisão noturna'};
export const TI_TCU_SELECTED_36=Object.freeze([
 'FD00','FD01','FD02','FD03','FD04','FD05','FD06','SI00','SI01',
 'TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI07','TI08','TI08.II','TI09',
 'TI21.II','TI23','TI25','TI34','TI35','TI36','TI37.I','TI37.II','TI38','TI38.II',
 'TI39','TI39.II','TI40','TI41','TI42','TI43'
]);
// A Meta 01 começa em FD01. FD00 continua preservado na trilha, mas não bloqueia o ponto de entrada.
export const TI_TCU_OPERATIONAL_ORDER=Object.freeze([
 'FD01','FD00','FD02','FD03','FD04','FD05','FD06','SI00','SI01',
 'TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI07','TI08','TI08.II','TI09',
 'TI21.II','TI23','TI25','TI34','TI35','TI36','TI37.I','TI37.II','TI38','TI38.II',
 'TI39','TI39.II','TI40','TI41','TI42','TI43'
]);
export const TI_TCU_TRACK=Object.freeze([
 {id:'foundation',label:'Fundamentos adicionais de segurança da trilha TCU',dependsOn:[],units:['FD01','FD00','FD02','FD03','FD04','FD05','FD06']},
 {id:'security-base',label:'Fundamentos de Segurança da Informação',dependsOn:[],units:['SI00','SI01']},
 {id:'bd',label:'Banco de Dados e SQL',dependsOn:[],units:['TI01.I','TI01.II','TI02','TI03','TI04','TI05','TI06','TI41','TI43']},
 {id:'data',label:'Data Mining, Big Data e fundamentos analíticos',dependsOn:['bd'],units:['TI07','TI08','TI08.II','TI09','TI21.II']},
 {id:'security',label:'Segurança, LAI e LGPD',dependsOn:['security-base'],units:['TI23','TI25','TI34','TI35']},
 {id:'ai',label:'IA, ML, PLN e linguagens para dados',dependsOn:['data'],units:['TI36','TI37.I','TI37.II','TI38','TI38.II','TI39','TI39.II','TI40','TI42']}
]);
function tiCode(u){
 const t=String(u?.title||'').trim();
 if(/^TI01\s*-\s*Parte I\b/i.test(t))return 'TI01.I';
 if(/^TI01\s*-\s*Parte II\b/i.test(t))return 'TI01.II';
 if(/^TI37\s*-\s*Parte I\b/i.test(t))return 'TI37.I';
 if(/^TI37\s*-\s*Parte II\b/i.test(t))return 'TI37.II';
 const m=t.match(/^(FD\d+|SI\d+|MON\d+|TI\d+(?:\.II)?(?:-B)?)/i);
 return m?m[1].toUpperCase():'';
}
export function methodUnits(s){
 if(s?.id!=='ti')return s?.units||[];
 const byCode=new Map();
 for(const u of s.units||[]){const code=tiCode(u);if(code&&!byCode.has(code))byCode.set(code,u);}
 const ordered=TI_TCU_OPERATIONAL_ORDER.map(code=>byCode.get(code)).filter(Boolean),used=new Set(ordered.map(u=>u.id));
 // Nunca descartar conteúdo importado: qualquer item adicional permanece na trilha ao final, na ordem original.
 return [...ordered,...(s.units||[]).filter(u=>!used.has(u.id)).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0))];
}
export function methodOrder(s,u){const i=methodUnits(s).findIndex(v=>v.id===u?.id);return i>=0?i+1:Number(u?.order)||0;}
export function normalizeMethodState(current){
 const st=copy(current);
 for(const s of st.subjects||[])for(const u of s.units||[]){
  if(u.theoryDone&&Number(u.battery?.attempted||0)>=30)u.batteryDone=true;
 }
 return st;
}
export const copy=v=>JSON.parse(JSON.stringify(v));
export const uid=()=>globalThis.crypto.randomUUID();
export function day(d=new Date()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
export function validDay(s){return /^\d{4}-\d{2}-\d{2}$/.test(s||'')&&day(new Date(s+'T12:00:00'))===s;}
export function weekStart(s=day()){let d=new Date(s+'T12:00:00');d.setDate(d.getDate()-(d.getDay()+6)%7);return day(d);}
export function hm(n){n=Math.round(n||0);return Math.floor(n/60)+'h'+String(n%60).padStart(2,'0');}
export function pct(q){return q?.attempted?Math.round(q.correct/q.attempted*100)+'%':'—';}
export function emptyState(){return {version:1,settings:{weeklyMinimum:1800,dailyMinimum:300,focus:'TCU',secondary:'CGU'},subjects:[],sessions:[],cycle:{index:0,minutes:0},imports:[],archive:[],updatedAt:null};}
const touched=u=>u.legacy.some(e=>e.status!=='Em espera')||u.theoryDone;
export function checkpoints(s){let result=[],size=RULES[s.id]?.checkpoint||4,route=methodUnits(s);for(let i=0;i<route.length;i+=size){let units=route.slice(i,i+size),id=s.id+'-cp-'+(i/size+1),record=s.checkpoints[id];result.push({id,number:i/size+1,units,partial:units.length<size,record,status:record?.done?'done':units.every(u=>u.theoryDone&&u.batteryDone)?'due':units.every(u=>u.theoryDone)?'battery':units.every(touched)?'audit':'planned'});}return result;}
export function unitSituation(u){return u.generalDone&&u.materialReady?'Revisão geral concluída':u.theoryDone&&u.batteryDone?'Bateria concluída':u.theoryDone?'Bateria pendente':touched(u)?'Conferir avanço importado':'Estudar';}
export function canSolid(s){let units=methodUnits(s);return units.length>0&&units.every(u=>u.theoryDone&&u.batteryDone&&u.generalDone&&u.materialReady)&&checkpoints(s).every(c=>c.status==='done')&&(s.id!=='port'||s.andresanComplete);}
export function nextAction(s){if(s.phase==='solid')return 'Continuar caderno de questões';let cp=checkpoints(s).find(c=>['due','battery','audit'].includes(c.status));if(cp)return cp.status==='due'?'Fazer checkpoint '+cp.number:cp.status==='audit'?'Conferir avanço do bloco '+cp.number:'Concluir baterias do bloco '+cp.number;let units=methodUnits(s),u=units.find(u=>!u.theoryDone||!u.batteryDone);if(u)return (u.theoryDone?'Revisar + resolver bateria: ':'Estudar: ')+u.title;return units.some(u=>!u.generalDone||!u.materialReady)?'Revisão geral e material de revisão':s.id==='port'&&!s.andresanComplete?'Concluir cursos Andresan':'Pronto para Estudo Sólido';}
export function totals(st,date=day()){let start=weekStart(date),d=new Date(start+'T12:00:00');d.setDate(d.getDate()+7);let end=day(d),law=st.legislation?.sessions||[],studyDay=st.sessions.filter(s=>s.date===date&&s.activity!=='night').reduce((a,s)=>a+s.minutes,0),lawDay=law.filter(s=>s.date===date).reduce((a,s)=>a+s.minutes,0),studyWeek=st.sessions.filter(s=>s.date>=start&&s.date<end&&s.activity!=='night').reduce((a,s)=>a+s.minutes,0),lawWeek=law.filter(s=>s.date>=start&&s.date<end).reduce((a,s)=>a+s.minutes,0);return {day:studyDay+lawDay,night:st.sessions.filter(s=>s.date===date&&s.activity==='night').reduce((a,s)=>a+s.minutes,0),week:studyWeek+lawWeek,lawDay,lawWeek};}
export function nightTasks(st,date=day()){return [...new Set(st.sessions.filter(s=>s.date===date&&s.activity!=='night'&&RULES[s.subjectId]).map(s=>s.subjectId))].map(id=>({id,done:st.sessions.some(s=>s.date===date&&s.subjectId===id&&s.activity==='night')}));}
export function fingerprint(v){let t=JSON.stringify(v),h=2166136261;for(let i=0;i<t.length;i++)h=Math.imul(h^t.charCodeAt(i),16777619);return (h>>>0).toString(16)+'-'+t.length;}
export function migrate(payload,current=emptyState()){
 const src=payload?.state||payload;if(!Array.isArray(src?.topics)||!Array.isArray(src?.sessions)||!Array.isArray(src?.disciplines))throw Error('Backup StudyOS inválido.');
 let st=copy(current),key=fingerprint(src);if(st.imports.some(i=>i.id===key))return st;
 const map={afo:'afo',dcon:'dcon',ti:'ti','dad-rafael-oliveira-vas-2026':'dad','port-ceb-teorico-2026':'port'},topicMap={};
 for(let [oldId,id] of Object.entries(map)){
  let s=st.subjects.find(s=>s.id===id);if(!s){s={id,course:src.disciplines.find(d=>d.id===oldId)?.name||RULES[id].label,phase:'new',slotMinutes:RULES[id].minutes,units:[],checkpoints:{},notebooks:[],andresanComplete:false};st.subjects.push(s);}
  let ts=src.topics.filter(t=>t.disciplineId===oldId).sort((a,b)=>a.order-b.order),modules=new Set(ts.filter(t=>t.title.includes(' — ')).map(t=>t.title.split(' — ')[0].trim()));
  for(let t of ts){let title=t.title.trim();if(id==='afo'){title=title.split(' — ')[0].trim();if(!modules.has(title))continue;}
   let u=s.units.find(u=>u.title===title);if(!u){u={id:id+'-u-'+(s.units.length+1),title,order:s.units.length+1,theoryDone:false,theoryDate:'',batteryDone:false,generalDone:false,materialReady:false,battery:{attempted:0,correct:0},general:{attempted:0,correct:0},legacy:[],marks:[]};s.units.push(u);}topicMap[t.id]={subjectId:id,unitId:u.id};
   if(t.status!=='Em espera'&&!u.legacy.some(e=>e.id===t.id))u.legacy.push({id:t.id,title:t.title,status:t.status,notes:t.notes||''});
  }
 }
 for(let old of src.sessions){if(!old.id||st.sessions.some(s=>s.id===old.id))continue;let minutes=Number(old.durationMinutes??old.hours*60);if(!validDay(old.date)||!Number.isFinite(minutes)||minutes<=0)continue;let m=topicMap[old.topicId],subjectId=map[old.disciplineId]||(old.disciplineId==='portugues'?'port':'legacy:'+old.disciplineId);let activity=/noturna/i.test(old.mode||'')||['night','night-review'].includes(old.kind)?'night':old.mode==='Questões'?'battery':old.mode==='Revisão'?'general':'theory';
  st.sessions.push({id:old.id,date:old.date,createdAt:old.createdAt,subjectId,unitId:m?.unitId||'',title:old.subject||'',minutes:Math.round(minutes),activity,questions:Number(old.questions)||0,correct:Number(old.correct)||0,notes:old.notes||'',medium:'',start:null,end:null,legacy:true,originalSubject:old.disciplineName||old.disciplineId,cycleApplied:false});
  let u=st.subjects.find(s=>s.id===subjectId)?.units.find(u=>u.id===m?.unitId);if(u&&!u.legacy.some(e=>e.id===old.id))u.legacy.push({id:old.id,date:old.date,title:old.subject||'',status:old.mode||'',notes:old.notes||''});
 }
 st.imports.push({id:key,sourceUpdatedAt:payload.updatedAt||src.updatedAt,at:new Date().toISOString()});st.archive.push({id:key,payload:copy(payload)});return st;
}
function requirePrevious(s,u){
 if(s.id==='ti'){
  const route=methodUnits(s),index=route.findIndex(v=>v.id===u.id);
  if(index>=0){
   const previous=route.slice(0,index);
   if(previous.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a teoria e a bateria das etapas anteriores da trilha TI–TCU antes de avançar.');
   const code=tiCode(u),group=TI_TCU_TRACK.find(g=>g.units.includes(code));
   for(const depId of group?.dependsOn||[]){const dep=TI_TCU_TRACK.find(g=>g.id===depId),present=route.filter(v=>dep?.units.includes(tiCode(v)));if(present.length&&present.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a base de '+dep.label+' antes de avançar para '+group.label+'.');}
   return;
  }
 }
 let previous=s.units.filter(v=>v.order<u.order);if(previous.some(v=>!v.theoryDone||!v.batteryDone))throw Error('Conclua a teoria e a bateria das unidades anteriores antes de avançar.');if(checkpoints(s).some(c=>c.units.at(-1).order<u.order&&c.status!=='done'))throw Error('Conclua o checkpoint do bloco anterior antes de avançar.');
}
function getUnit(st,sid,id){let s=st.subjects.find(s=>s.id===sid),u=s?.units.find(u=>u.id===id);if(!u)throw Error('Aula não encontrada.');return {s,u};}
export function session(current,input){
 let st=copy(current),s=st.subjects.find(s=>s.id===input.subjectId),minutes=Number(input.minutes),q=Number(input.questions||0),correct=Number(input.correct||0);
 if(!s||!validDay(input.date)||input.date>day()||!Number.isInteger(minutes)||minutes<1||minutes>1440||!ACTIVITIES[input.activity])throw Error('Confira disciplina, data, atividade e duração.');
 if(!Number.isInteger(q)||!Number.isInteger(correct)||q<0||correct<0||correct>q)throw Error('Confira questões e acertos.');
 if(input.activity==='night'&&(minutes<5||minutes>10))throw Error('Revisão noturna: de 5 a 10 minutos por disciplina.');
 let u=input.unitId?getUnit(st,s.id,input.unitId).u:null;
 if(['theory','battery','general','checkpoint'].includes(input.activity)&&!u)throw Error('Selecione a aula ou módulo.');
 if(input.activity==='solid'&&s.phase!=='solid')throw Error('Conclua o Estudo Novo antes de registrar sessões do Estudo Sólido.');
 if(input.activity==='night'&&st.sessions.filter(v=>v.subjectId===s.id&&v.date===input.date&&v.activity==='night').reduce((a,v)=>a+v.minutes,0)+minutes>10)throw Error('A revisão noturna totaliza de 5 a 10 minutos por disciplina no dia.');
 if(input.activity==='checkpoint'&&!checkpoints(s).some(c=>c.units.some(v=>v.id===u.id)&&['due','done'].includes(c.status)))throw Error('Conclua teoria e baterias do bloco antes do checkpoint.');
 if(input.activity==='battery'&&(!u.theoryDone||!u.theoryDate||input.date<=u.theoryDate))throw Error('Confirme a teoria e faça a primeira bateria em outro dia, após a teoria.');
 if(input.activity==='general'&&(!methodUnits(s).every(u=>u.theoryDone&&u.batteryDone)||!checkpoints(s).every(c=>c.status==='done')))throw Error('A revisão geral começa após teoria, baterias e checkpoints.');
 let start=input.start===''||input.start==null?null:Number(input.start),end=input.end===''||input.end==null?null:Number(input.end);
 if((start!==null||end!==null)&&(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<start))throw Error('Preencha início e fim válidos do conteúdo.');
 const entry={id:uid(),subjectId:s.id,unitId:u?.id||'',title:String(input.title||'').trim()||u?.title||'',date:input.date,createdAt:new Date().toISOString(),activity:input.activity,minutes,questions:q,correct,medium:input.medium||'',start,end,notes:String(input.notes||''),legacy:false,cycleApplied:false};
 if(input.applyCycle&&input.activity!=='night'){
  if(input.date!==day()||CYCLE[st.cycle.index]!==s.id)throw Error('Só a disciplina atual, registrada hoje, pode concluir a ocorrência do ciclo.');
  st.cycle.minutes=0;
  st.cycle.index=(st.cycle.index+1)%CYCLE.length;
  entry.cycleApplied=true;
  entry.slotComplete=true;
 }
 st.sessions.push(entry);if(u&&['battery','general'].includes(input.activity)){u[input.activity].attempted+=q;u[input.activity].correct+=correct;if(input.activity==='battery'&&u.theoryDone&&u.battery.attempted>=30)u.batteryDone=true;}return st;
}
export function setUnit(current,sid,id,values){let st=copy(current),{s,u}=getUnit(st,sid,id);
 let theory=!!values.theoryDone,battery=!!values.batteryDone,general=!!values.generalDone,material=!!values.materialReady;
 if(theory&&!u.theoryDone&&!u.legacy.some(e=>e.status!=='Em espera'||e.date))requirePrevious(s,u);
 if(theory&&(!validDay(values.theoryDate)||values.theoryDate>day()))throw Error('Informe a data real da conclusão da teoria.');
 if(battery&&(!theory||u.battery.attempted<30))throw Error('A primeira bateria exige teoria concluída e ao menos 30 questões registradas.');
 if(general&&(!methodUnits(s).every(v=>v.id===u.id?theory&&battery:v.theoryDone&&v.batteryDone)||!checkpoints(s).every(c=>c.status==='done')))throw Error('Conclua teoria, baterias e checkpoints antes da revisão geral.');
 Object.assign(u,{theoryDone:theory,theoryDate:theory?values.theoryDate:'',batteryDone:battery&&theory,generalDone:general&&battery&&theory,materialReady:material});
 if(!theory||!battery){let cp=checkpoints(s).find(c=>c.units.some(v=>v.id===id));if(cp)delete s.checkpoints[cp.id];for(let x of s.units)x.generalDone=false;}
 if(s.phase==='solid'&&!canSolid(s))s.phase='new';return st;
}
export function finishCheckpoint(current,sid,id,results){let st=copy(current),s=st.subjects.find(s=>s.id===sid),cp=s&&checkpoints(s).find(c=>c.id===id);if(cp?.status!=='due')throw Error('Conclua teoria e primeira bateria de todas as unidades do bloco.');
 let perUnit={};for(let u of cp.units){let r=results[u.id],attempted=Number(r?.attempted),correct=Number(r?.correct);if(!Number.isInteger(attempted)||attempted<1||attempted>20||!Number.isInteger(correct)||correct<0||correct>attempted)throw Error('Registre de 1 a 20 questões por unidade, com acertos válidos.');perUnit[u.id]={attempted,correct};}
 s.checkpoints[id]={done:true,date:day(),perUnit};return st;
}
export function switchSolid(current,sid,minutes){let st=copy(current),s=st.subjects.find(s=>s.id===sid);minutes=Number(minutes);if(!s||!canSolid(s))throw Error('Conclua revisão geral, material e checkpoints. Português também exige os cursos Andresan.');if(!Number.isInteger(minutes)||minutes<30||minutes>=s.slotMinutes)throw Error('Defina uma carga menor, de pelo menos 30 minutos.');if(CYCLE[st.cycle.index]===sid&&st.cycle.minutes>=minutes)throw Error('Conclua o bloco atual antes de reduzir a carga.');s.slotMinutes=minutes;s.phase='solid';return st;}
export function addNotebook(current,sid,title,url,target){let st=copy(current),s=st.subjects.find(s=>s.id===sid);target=Number(target);if(s?.phase!=='solid')throw Error('Cadernos contínuos pertencem ao Estudo Sólido.');if(!title.trim()||!Number.isInteger(target)||target<1||url&&!/^https:\/\//.test(url))throw Error('Informe nome, total de questões e link HTTPS válido.');if(s.notebooks.some(n=>n.stage!=='done'))throw Error('Conclua o caderno atual, seus erros e favoritas.');s.notebooks.push({id:uid(),title,url,target,stage:'main',log:[],errors:0,afterErrors:'favorites'});return st;}
export function notebookRound(current,sid,id,attempted,correct){let st=copy(current),s=st.subjects.find(s=>s.id===sid),n=s?.notebooks.find(n=>n.id===id);attempted=Number(attempted);correct=Number(correct);if(!n||n.stage==='done'||!Number.isInteger(attempted)||!Number.isInteger(correct)||attempted<0||correct<0||correct>attempted)throw Error('Rodada inválida.');if(n.stage==='main'&&attempted!==n.target||n.stage==='errors'&&attempted!==n.errors)throw Error('Finalize todas as questões desta rodada.');n.log.push({date:day(),stage:n.stage,attempted,correct});n.errors=attempted-correct;if(n.stage==='main'){n.afterErrors='favorites';n.stage=n.errors?'errors':'favorites';}else if(n.stage==='favorites'){n.afterErrors='done';n.stage=n.errors?'errors':'done';}else n.stage=n.errors?'errors':n.afterErrors;return st;}
export function validate(st){if(st?.version!==1||!Array.isArray(st.subjects)||!Array.isArray(st.sessions)||!Array.isArray(st.imports)||!Array.isArray(st.archive)||!st.settings||!st.cycle)throw Error('Backup Metodo-ET inválido.');if(st.settings.weeklyMinimum!==1800||st.settings.focus!=='TCU'||st.settings.secondary!=='CGU')throw Error('Planejamento incompatível com TCU/CGU e mínimo de 30h.');const ids=st.subjects.map(s=>s.id);if(ids.length!==5||new Set(ids).size!==5||!['afo','dad','ti','port','dcon'].every(id=>ids.includes(id)))throw Error('O backup deve conter as cinco disciplinas ativas.');if(!Number.isInteger(st.cycle.index)||st.cycle.index<0||st.cycle.index>5||!Number.isFinite(st.cycle.minutes)||st.cycle.minutes<0)throw Error('Ciclo inválido.');for(let s of st.subjects){if(!['new','solid'].includes(s.phase)||!Array.isArray(s.units)||!s.checkpoints||!Array.isArray(s.notebooks)||!Number.isInteger(s.slotMinutes)||s.slotMinutes<30||s.slotMinutes>120)throw Error('Disciplina inválida.');for(let u of s.units)if(typeof u.id!=='string'||typeof u.title!=='string'||!Array.isArray(u.legacy)||!Array.isArray(u.marks)||!u.battery||!u.general)throw Error('Aula inválida.');}if(st.cycle.minutes>=st.subjects.find(s=>s.id===CYCLE[st.cycle.index]).slotMinutes)throw Error('Bloco inválido.');for(let s of st.sessions)if(typeof s.id!=='string'||!validDay(s.date)||!Number.isInteger(s.minutes)||s.minutes<1||!ACTIVITIES[s.activity])throw Error('Sessão inválida.');if(new Set(st.sessions.map(s=>s.id)).size!==st.sessions.length)throw Error('Sessões duplicadas no backup.');for(let sub of st.subjects){if(new Set(sub.units.map(u=>u.id)).size!==sub.units.length)throw Error('Unidades duplicadas.');for(let u of sub.units){for(let k of ['battery','general']){let r=u[k];if(!Number.isInteger(r.attempted)||!Number.isInteger(r.correct)||r.correct<0||r.correct>r.attempted)throw Error('Resultado de questões inválido.');}if(u.theoryDone&&!validDay(u.theoryDate)||u.batteryDone&&!u.theoryDone||u.generalDone&&!u.batteryDone)throw Error('Etapas inconsistentes no backup.');}for(let cp of checkpoints(sub)){if(cp.record?.done&&(!cp.units.every(u=>u.theoryDone&&u.batteryDone)||!cp.units.every(u=>{let r=cp.record.perUnit?.[u.id];return r&&Number.isInteger(r.attempted)&&r.attempted>=1&&r.attempted<=20&&Number.isInteger(r.correct)&&r.correct>=0&&r.correct<=r.attempted;})))throw Error('Checkpoint inconsistente no backup.');}for(let n of sub.notebooks)if(typeof n.title!=='string'||!['main','errors','favorites','done'].includes(n.stage)||!Array.isArray(n.log)||n.url&&!/^https:\/\//.test(n.url))throw Error('Caderno inválido.');}return copy(st);}