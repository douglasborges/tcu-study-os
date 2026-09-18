import * as M from './core.js?v=4.0';

const ACTIVE=['afo','dad','ti','port','dcon'];
const shift=(date,days)=>{const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+days);return M.day(d);};
const monthStart=date=>date.slice(0,7)+'-01';
const monthShift=(date,months)=>{const d=new Date(date.slice(0,7)+'-01T12:00:00');d.setMonth(d.getMonth()+months);return M.day(d);};
const daysBetween=(a,b)=>Math.round((Date.parse(b+'T12:00:00')-Date.parse(a+'T12:00:00'))/86400000);
const sum=(rows,key)=>rows.reduce((a,x)=>a+(Number(x[key])||0),0);
const resultRows=rows=>rows.filter(s=>Number.isFinite(Number(s.questions))&&Number(s.questions)>0&&Number.isFinite(Number(s.correct))&&Number(s.correct)>=0&&Number(s.correct)<=Number(s.questions));
const summary=rows=>{
  const results=resultRows(rows),minutes=sum(rows,'minutes'),questions=sum(results,'questions'),correct=sum(results,'correct'),days=new Set(rows.filter(x=>Number(x.minutes)>0).map(x=>x.date)).size;
  return {minutes,questions,correct,accuracy:questions?correct/questions*100:null,days,avgDaily:days?minutes/days:0,sessions:rows.length};
};
const pct=(n,d)=>d?Math.round(n/d*1000)/10:0;

export function periodBounds(period,today=M.day()){
  if(period==='7')return {start:shift(today,-6),end:today,label:'Últimos 7 dias'};
  if(period==='30')return {start:shift(today,-29),end:today,label:'Últimos 30 dias'};
  if(period==='month')return {start:monthStart(today),end:today,label:'Mês atual'};
  return {start:null,end:today,label:'Desde o início'};
}
function eligibleSessions(st,{period='all',subjectId='all',today=M.day()}={}){
  const bounds=periodBounds(period,today);
  return (st.sessions||[]).filter(s=>s.activity!=='night'&&M.validDay(s.date)&&s.date<=today&&(!bounds.start||s.date>=bounds.start)&&(subjectId==='all'||s.subjectId===subjectId));
}
function statsForDay(st,date,subjectId='all'){
  return summary((st.sessions||[]).filter(s=>s.activity!=='night'&&s.date===date&&(subjectId==='all'||s.subjectId===subjectId)));
}
function weekWindow(date){
  const start=M.weekStart(date),end=shift(start,6),prevStart=shift(start,-7),prevEnd=shift(start,-1);
  return {start,end,prevStart,prevEnd};
}
function monthWindow(date){
  const start=monthStart(date),next=monthShift(date,1),end=shift(next,-1),prevStart=monthShift(date,-1),prevEnd=shift(start,-1);
  return {start,end,prevStart,prevEnd};
}
function statsBetween(st,start,end,subjectId='all'){
  return summary((st.sessions||[]).filter(s=>s.activity!=='night'&&s.date>=start&&s.date<=end&&(subjectId==='all'||s.subjectId===subjectId));
}
function subjectAnalytics(st,period,today){
  const bounds=periodBounds(period,today);
  return ACTIVE.map(id=>{
    const s=st.subjects.find(x=>x.id===id),rows=(st.sessions||[]).filter(x=>x.activity!=='night'&&x.subjectId===id&&x.date<=today&&(!bounds.start||x.date>=bounds.start)),results=resultRows(rows);
    const cps=M.checkpoints(s),last=(st.sessions||[]).filter(x=>x.activity!=='night'&&x.subjectId===id&&x.date<=today).map(x=>x.date).sort().at(-1)||'';
    const total=s.units.length,theory=s.units.filter(u=>u.theoryDone).length,batteries=s.units.filter(u=>u.batteryDone).length,general=s.units.filter(u=>u.generalDone).length,material=s.units.filter(u=>u.materialReady).length,cpDone=cps.filter(c=>c.status==='done').length;
    return {id,course:s.course,phase:s.phase,minutes:sum(rows,'minutes'),questions:sum(results,'questions'),correct:sum(results,'correct'),accuracy:sum(results,'questions')?sum(results,'correct')/sum(results,'questions')*100:null,total,theory,batteries,general,material,checkpoints:cps.length,cpDone,lastContact:last,daysSince:last?daysBetween(last,today):null,theoryPct:pct(theory,total),batteryPct:pct(batteries,total),checkpointPct:pct(cpDone,cps.length),generalPct:pct(general,total),materialPct:pct(material,total),canSolid:M.canSolid(s),nextAction:M.nextAction(s)};
  });
}
function activityDistribution(rows){
  const ids=['theory','battery','checkpoint','general','solid','micro','free'];
  return ids.map(id=>({id,label:M.ACTIVITIES[id],minutes:sum(rows.filter(x=>x.activity===id),'minutes')})).filter(x=>x.minutes>0);
}
function seriesByWeek(st,today,subjectId='all',count=8){
  const current=M.weekStart(today),series=[];
  for(let i=count-1;i>=0;i--){
    const start=shift(current,-7*i),end=shift(start,6),rows=(st.sessions||[]).filter(s=>s.activity!=='night'&&s.date>=start&&s.date<=end&&s.date<=today&&(subjectId==='all'||s.subjectId===subjectId)),r=summary(rows);
    series.push({key:start,label:start.slice(5).split('-').reverse().join('/'),...r});
  }
  return series;
}
function seriesByMonth(st,today,subjectId='all',count=6){
  const current=monthStart(today),series=[];
  for(let i=count-1;i>=0;i--){
    const start=monthShift(current,-i),next=monthShift(start,1),end=shift(next,-1),rows=(st.sessions||[]).filter(s=>s.activity!=='night'&&s.date>=start&&s.date<=end&&s.date<=today&&(subjectId==='all'||s.subjectId===subjectId)),r=summary(rows);
    series.push({key:start.slice(0,7),label:start.slice(5,7)+'/'+start.slice(2,4),...r});
  }
  return series;
}
function attentionItems(st,subjects,today){
  const out=[];
  for(const d of subjects){
    const s=st.subjects.find(x=>x.id===d.id),pendingB=s.units.filter(u=>u.theoryDone&&!u.batteryDone).length,due=M.checkpoints(s).filter(c=>c.status==='due').length;
    if(pendingB)out.push({subjectId:d.id,type:'battery',tone:'amber',title:pendingB+' bateria'+(pendingB>1?'s':'')+' pendente'+(pendingB>1?'s':''),detail:'Há teoria concluída aguardando a primeira bateria de questões.'});
    if(due)out.push({subjectId:d.id,type:'checkpoint',tone:'lime',title:due+' checkpoint'+(due>1?'s':'')+' liberado'+(due>1?'s':''),detail:'Teoria e baterias do bloco já permitem realizar o checkpoint.'});
    if(d.daysSince!==null&&d.daysSince>=7)out.push({subjectId:d.id,type:'contact',tone:'neutral',title:d.daysSince+' dias sem contato',detail:'Último estudo registrado em '+d.lastContact.split('-').reverse().join('/')+'.'});
    if(d.canSolid&&s.phase!=='solid')out.push({subjectId:d.id,type:'solid',tone:'lime',title:'Pronto para Estudo Sólido',detail:'Todas as etapas exigidas já foram concluídas.'});
  }
  return out.slice(0,10);
}
export function analyticsSnapshot(st,{period='all',subjectId='all',today=M.day()}={}){
  const rows=eligibleSessions(st,{period,subjectId,today}),metrics=summary(rows),yesterday=shift(today,-1),todayStats=statsForDay(st,today,subjectId),yesterdayStats=statsForDay(st,yesterday,subjectId);
  const w=weekWindow(today),m=monthWindow(today);
  const weekCurrent=statsBetween(st,w.start,Math.min?today:today,subjectId),weekPrevious=statsBetween(st,w.prevStart,w.prevEnd,subjectId);
  const monthCurrent=statsBetween(st,m.start,today,subjectId),monthPrevious=statsBetween(st,m.prevStart,m.prevEnd,subjectId);
  const subjects=subjectAnalytics(st,period,today),filteredSubjects=subjectId==='all'?subjects:subjects.filter(x=>x.id===subjectId);
  return {
    period,subjectId,bounds:periodBounds(period,today),metrics,today,yesterday,todayStats,yesterdayStats,
    weekCurrent,weekPrevious,monthCurrent,monthPrevious,subjects,filteredSubjects,
    activity:activityDistribution(rows),weekly:seriesByWeek(st,today,subjectId,8),monthly:seriesByMonth(st,today,subjectId,6),
    attention:attentionItems(st,subjects,today)
  };
}
