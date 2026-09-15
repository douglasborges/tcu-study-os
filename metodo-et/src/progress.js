import {day,validDay,RULES} from './core.js';
export function durationMinutes(hours,minutes){let h=Number(hours||0),m=Number(minutes||0);if(!Number.isInteger(h)||!Number.isInteger(m)||h<0||m<0||m>59||h*60+m<1||h*60+m>1440)throw Error('Informe horas e minutos válidos: minutos entre 0 e 59 e duração total entre 1 min e 24h.');return h*60+m;}
const serial=s=>Date.parse(s+'T12:00:00Z')/86400000;
function optionalGap(a,b){for(let d=serial(a)+1;d<serial(b);d++){if(new Date(d*86400000).getUTCDay()!==0)return false;}return true;}
export function streaks(sessions,today=day()){
 const dates=[...new Set(sessions.filter(s=>s.activity!=='night'&&s.minutes>0&&validDay(s.date)&&s.date<=today).map(s=>s.date))].sort();let run=0,best=0,last=null;
 for(let date of dates){run=last&&optionalGap(last,date)?run+1:1;best=Math.max(best,run);last=date;}
 return {current:last&&(last===today||optionalGap(last,today))?run:0,best,days:dates.length,last};
}
export function unitProgress(u,rows=[]){
 const completed=!!u.theoryDone||u.legacy.some(e=>e.status==='Revisado'&&e.title?.trim()===u.title.trim());
 const started=completed||u.legacy.some(e=>e.status&&e.status!=='Em espera')||rows.some(r=>r.unitId===u.id);
 return {completed,started};
}
export function progressMetrics(st,today=day()){
 const sessions=st.sessions.filter(s=>validDay(s.date)&&s.date<=today),study=sessions.filter(s=>s.activity!=='night'),results=study.filter(s=>Number.isFinite(s.questions)&&s.questions>0&&Number.isFinite(s.correct)&&s.correct>=0&&s.correct<=s.questions);
 const sum=(rows,key)=>rows.reduce((a,s)=>a+s[key],0),questions=sum(results,'questions'),correct=sum(results,'correct');
 const ranked=[...results].sort((a,b)=>b.correct/b.questions-a.correct/a.questions||b.questions-a.questions||b.date.localeCompare(a.date));
 return {minutes:sum(study,'minutes'),nightMinutes:sum(sessions.filter(s=>s.activity==='night'),'minutes'),questions,correct,accuracy:questions?correct/questions*100:null,best:ranked[0]||null,worst:ranked.at(-1)||null,streak:streaks(sessions,today),sessions:study.length,
  disciplines:st.subjects.map(s=>{let rows=study.filter(r=>r.subjectId===s.id),qs=results.filter(r=>r.subjectId===s.id),total=s.units.length,units=s.units.map(u=>unitProgress(u,rows)),completed=units.filter(u=>u.completed).length,started=units.filter(u=>u.started).length;return {id:s.id,unit:RULES[s.id]?.unit||'aula',total,completed,started,startedPercent:total?started/total*100:0,percent:total?completed/total*100:0,minutes:sum(rows,'minutes'),questions:sum(qs,'questions'),correct:sum(qs,'correct')};})};
}
