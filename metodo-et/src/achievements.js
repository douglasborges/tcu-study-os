import * as M from './core.js?v=3.0';
import {streaks} from './progress.js?v=3.0';

export const CATEGORY_META={
  hours:{icon:'⏱',title:'Horas líquidas',description:'Tempo efetivo de estudo principal, sem revisão noturna e sem Legislação Seca.'},
  questions:{icon:'✓',title:'Questões',description:'Volume acumulado de questões efetivamente registrado no diário.'},
  constancy:{icon:'🔥',title:'Constância',description:'Dias de estudo construídos ao longo da preparação.'},
  cycle:{icon:'↻',title:'Ciclo ET',description:'Execução do ciclo na ordem planejada, bloco após bloco.'},
  method:{icon:'👽',title:'Método ET',description:'Baterias, checkpoints e transição para Estudo Sólido.'},
  night:{icon:'🌙',title:'Revisão noturna',description:'Fechamentos completos dos dias estudados.'},
  law:{icon:'§',title:'Legislação Seca',description:'Regularidade e conclusão da leitura diária de normas.'}
};

const sum=(rows,key)=>rows.reduce((a,x)=>a+(Number(x[key])||0),0);
const bump=(map,key,value)=>map.set(key,(map.get(key)||0)+value);
const best=map=>[...map.entries()].sort((a,b)=>b[1]-a[1]||String(a[0]).localeCompare(String(b[0])))[0]||['—',0];

function nightClosures(st,study){
  const studied=new Map(),night=new Set();
  for(const s of study)if(M.RULES[s.subjectId]){
    if(!studied.has(s.date))studied.set(s.date,new Set());
    studied.get(s.date).add(s.subjectId);
  }
  for(const s of st.sessions||[])if(s.activity==='night'&&M.RULES[s.subjectId])night.add(s.date+'|'+s.subjectId);
  return [...studied].filter(([date,ids])=>ids.size&&[...ids].every(id=>night.has(date+'|'+id))).map(([date])=>date).sort();
}

export function achievementStats(st){
  const study=(st.sessions||[]).filter(s=>s.activity!=='night'&&Number(s.minutes)>0&&M.validDay(s.date));
  const questions=study.reduce((a,s)=>a+(Number.isFinite(Number(s.questions))?Math.max(0,Number(s.questions)):0),0);
  const minutes=sum(study,'minutes');
  const streak=streaks(st.sessions||[]);
  const cycleRows=study.filter(s=>s.slotComplete);
  const cycleByDay=new Map();
  for(const s of cycleRows)bump(cycleByDay,s.date,1);
  const cycleDays3=[...cycleByDay.values()].filter(n=>n>=3).length;
  const cycleBlocks=cycleRows.length,completeCycles=Math.floor(cycleBlocks/M.CYCLE.length);
  const units=(st.subjects||[]).flatMap(s=>s.units||[]);
  const batteries=units.filter(u=>u.batteryDone).length;
  const checkpoints=(st.subjects||[]).reduce((a,s)=>a+M.checkpoints(s).filter(c=>c.record?.done).length,0);
  const solidSubjects=(st.subjects||[]).filter(s=>s.phase==='solid').length;
  const theorySubjects=(st.subjects||[]).filter(s=>s.units?.length&&s.units.every(u=>u.theoryDone)).length;
  const subjectsTotal=(st.subjects||[]).filter(s=>s.units?.length).length;
  const closures=nightClosures(st,study);
  const lawSessions=(st.legislation?.sessions||[]).filter(x=>M.validDay(x.date)&&Number(x.minutes)>0);
  const lawMinutes=sum(lawSessions,'minutes');
  const lawDays=new Set(lawSessions.map(x=>x.date)).size;
  const lawsCompleted=(st.legislation?.completed||[]).length;
  const lawQueueTotal=(st.legislation?.queue||[]).length||1;

  const daily=new Map(),dailyQuestions=new Map(),weekly=new Map(),monthly=new Map();
  for(const s of study){
    bump(daily,s.date,Number(s.minutes)||0);
    bump(dailyQuestions,s.date,Number(s.questions)||0);
    bump(weekly,M.weekStart(s.date),Number(s.minutes)||0);
    bump(monthly,s.date.slice(0,7),Number(s.minutes)||0);
  }
  const [bestDay,bestDayMinutes]=best(daily),[bestQDay,bestQ]=best(dailyQuestions),[bestWeek,bestWeekMinutes]=best(weekly),[bestMonth,bestMonthMinutes]=best(monthly);
  return {
    studySessions:study.length,minutes,questions,streakBest:streak.best,streakCurrent:streak.current,studyDays:streak.days,
    cycleBlocks,cycleDays3,completeCycles,batteries,checkpoints,solidSubjects,theorySubjects,subjectsTotal,
    nightClosures:closures.length,lawMinutes,lawDays,lawsCompleted,lawQueueTotal,
    records:{
      bestDay:{value:bestDayMinutes,key:bestDay},
      bestWeek:{value:bestWeekMinutes,key:bestWeek},
      bestMonth:{value:bestMonthMinutes,key:bestMonth},
      bestQuestionsDay:{value:bestQ,key:bestQDay},
      bestStreak:{value:streak.best,key:''},
      currentStreak:{value:streak.current,key:''}
    }
  };
}

const hours=[10,25,50,100,150,250,500,750,1000].map(h=>({id:'hours-'+h,category:'hours',icon:'⏱',title:h+'h líquidas',description:'Acumular '+h+' horas líquidas no estudo principal.',get:s=>s.minutes,target:h*60,unit:'minutes'}));
const questions=[100,250,500,1000,2000,3000,5000,10000].map(q=>({id:'questions-'+q,category:'questions',icon:'✓',title:q.toLocaleString('pt-BR')+' questões',description:'Resolver '+q.toLocaleString('pt-BR')+' questões registradas.',get:s=>s.questions,target:q,unit:'questions'}));
const constancy=[3,7,15,30,60,100].map(d=>({id:'streak-'+d,category:'constancy',icon:'🔥',title:d+' dias de sequência',description:'Construir uma sequência de '+d+' dias de estudo.',get:s=>s.streakBest,target:d,unit:'days'}));

export const ACHIEVEMENTS=[
  {id:'study-first',category:'method',icon:'✦',title:'Primeira ignição',description:'Primeiro estudo registrado na sua jornada.',get:s=>s.studySessions,target:1,unit:'sessions'},
  ...hours,
  ...questions,
  ...constancy,
  {id:'cycle-block-1',category:'cycle',icon:'↻',title:'Primeiro bloco fechado',description:'Concluir o primeiro bloco obedecendo ao ciclo ET.',get:s=>s.cycleBlocks,target:1,unit:'blocks'},
  {id:'cycle-day-3',category:'cycle',icon:'↻',title:'Dia completo de ciclo',description:'Concluir três blocos do ciclo no mesmo dia.',get:s=>s.cycleDays3,target:1,unit:'days'},
  {id:'cycle-1',category:'cycle',icon:'↻',title:'Primeiro ciclo completo',description:'Fechar uma volta completa pelas seis posições do ciclo.',get:s=>s.completeCycles,target:1,unit:'cycles'},
  {id:'cycle-5',category:'cycle',icon:'↻',title:'5 ciclos completos',description:'Completar cinco voltas do ciclo.',get:s=>s.completeCycles,target:5,unit:'cycles'},
  {id:'cycle-10',category:'cycle',icon:'↻',title:'10 ciclos completos',description:'Completar dez voltas do ciclo.',get:s=>s.completeCycles,target:10,unit:'cycles'},
  {id:'cycle-25',category:'cycle',icon:'↻',title:'25 ciclos completos',description:'Completar vinte e cinco voltas do ciclo.',get:s=>s.completeCycles,target:25,unit:'cycles'},
  {id:'battery-1',category:'method',icon:'🎯',title:'Questões com intenção',description:'Concluir a primeira bateria do Método ET.',get:s=>s.batteries,target:1,unit:'batteries'},
  {id:'battery-10',category:'method',icon:'🎯',title:'10 baterias concluídas',description:'Concluir dez baterias de questões.',get:s=>s.batteries,target:10,unit:'batteries'},
  {id:'battery-25',category:'method',icon:'🎯',title:'25 baterias concluídas',description:'Concluir vinte e cinco baterias de questões.',get:s=>s.batteries,target:25,unit:'batteries'},
  {id:'checkpoint-1',category:'method',icon:'🛰',title:'Telemetria confirmada',description:'Concluir o primeiro checkpoint.',get:s=>s.checkpoints,target:1,unit:'checkpoints'},
  {id:'checkpoint-5',category:'method',icon:'🛰',title:'5 checkpoints',description:'Concluir cinco checkpoints.',get:s=>s.checkpoints,target:5,unit:'checkpoints'},
  {id:'checkpoint-10',category:'method',icon:'🛰',title:'10 checkpoints',description:'Concluir dez checkpoints.',get:s=>s.checkpoints,target:10,unit:'checkpoints'},
  {id:'theory-all',category:'method',icon:'📚',title:'Teoria integral',description:'Concluir a teoria de todas as disciplinas ativas.',get:s=>s.theorySubjects,target:s=>Math.max(1,s.subjectsTotal),unit:'subjects'},
  {id:'solid-1',category:'method',icon:'🧠',title:'Conhecimento consolidado',description:'Levar a primeira disciplina ao Estudo Sólido.',get:s=>s.solidSubjects,target:1,unit:'subjects'},
  {id:'solid-all',category:'method',icon:'👽',title:'Estudo Total',description:'Levar todas as disciplinas ativas ao Estudo Sólido.',get:s=>s.solidSubjects,target:s=>Math.max(1,s.subjectsTotal),unit:'subjects'},
  {id:'night-1',category:'night',icon:'🌙',title:'Última etapa, sempre',description:'Fechar o primeiro dia com todas as revisões noturnas necessárias.',get:s=>s.nightClosures,target:1,unit:'closures'},
  {id:'night-7',category:'night',icon:'🌙',title:'7 fechamentos completos',description:'Completar sete dias com revisão noturna fechada.',get:s=>s.nightClosures,target:7,unit:'closures'},
  {id:'night-15',category:'night',icon:'🌙',title:'15 fechamentos completos',description:'Completar quinze dias com revisão noturna fechada.',get:s=>s.nightClosures,target:15,unit:'closures'},
  {id:'night-30',category:'night',icon:'🌙',title:'30 fechamentos completos',description:'Completar trinta dias com revisão noturna fechada.',get:s=>s.nightClosures,target:30,unit:'closures'},
  {id:'night-60',category:'night',icon:'🌙',title:'60 fechamentos completos',description:'Completar sessenta dias com revisão noturna fechada.',get:s=>s.nightClosures,target:60,unit:'closures'},
  {id:'law-10',category:'law',icon:'§',title:'Primeiros 10 minutos',description:'Completar os primeiros dez minutos de Legislação Seca.',get:s=>s.lawMinutes,target:10,unit:'minutes-short'},
  {id:'law-7',category:'law',icon:'§',title:'7 dias de Lei Seca',description:'Registrar leitura de legislação em sete dias diferentes.',get:s=>s.lawDays,target:7,unit:'days'},
  {id:'law-30',category:'law',icon:'§',title:'30 dias de Lei Seca',description:'Registrar leitura de legislação em trinta dias diferentes.',get:s=>s.lawDays,target:30,unit:'days'},
  {id:'law-norm-1',category:'law',icon:'📖',title:'Primeira norma concluída',description:'Ler uma norma inteira do início ao fim.',get:s=>s.lawsCompleted,target:1,unit:'laws'},
  {id:'law-norm-3',category:'law',icon:'📖',title:'3 normas concluídas',description:'Concluir três normas da fila de legislação.',get:s=>s.lawsCompleted,target:3,unit:'laws'},
  {id:'law-norm-5',category:'law',icon:'📖',title:'5 normas concluídas',description:'Concluir cinco normas da fila de legislação.',get:s=>s.lawsCompleted,target:5,unit:'laws'},
  {id:'law-all',category:'law',icon:'📖',title:'Fila de legislação concluída',description:'Concluir toda a fila planejada de Legislação Seca.',get:s=>s.lawsCompleted,target:s=>Math.max(1,s.lawQueueTotal),unit:'laws'}
];

export const MISSION_TRACK=[
  'study-first','hours-10','questions-100','hours-25','streak-3','cycle-block-1','hours-50','questions-250',
  'streak-7','battery-1','hours-100','questions-500','checkpoint-1','streak-15','hours-150','cycle-1',
  'questions-1000','battery-10','hours-250','streak-30','law-7','checkpoint-5','solid-1','hours-500',
  'questions-3000','streak-60','law-norm-5','hours-750','questions-5000','hours-1000','solid-all'
];

export const PHASES=['Ignição','Decolagem','Atmosfera','Órbita','Cruzeiro','Aproximação','Missão TCU'];

export function progressText(item){
  const v=Math.max(0,Math.round(item.value)),t=Math.max(1,Math.round(item.target));
  if(item.unit==='minutes')return M.hm(v)+' / '+M.hm(t);
  if(item.unit==='minutes-short')return v+' / '+t+' min';
  if(item.unit==='questions')return v.toLocaleString('pt-BR')+' / '+t.toLocaleString('pt-BR');
  const names={days:'dias',sessions:'sessões',blocks:'blocos',cycles:'ciclos',batteries:'baterias',checkpoints:'checkpoints',subjects:'disciplinas',closures:'fechamentos',laws:'normas'};
  return v+' / '+t+' '+(names[item.unit]||'');
}

export function achievementSnapshot(st){
  const stats=achievementStats(st);
  const items=ACHIEVEMENTS.map(def=>{
    const value=Math.max(0,Number(def.get(stats))||0),target=Math.max(1,Number(typeof def.target==='function'?def.target(stats):def.target)||1);
    return {...def,value,target,progress:Math.min(1,value/target),unlocked:value>=target};
  });
  const byId=new Map(items.map(x=>[x.id,x])),mission=MISSION_TRACK.map(id=>byId.get(id)).filter(Boolean),unlocked=items.filter(x=>x.unlocked);
  const missionUnlocked=mission.filter(x=>x.unlocked).length,missionProgress=mission.length?missionUnlocked/mission.length:0;
  const phase=PHASES[Math.min(PHASES.length-1,Math.floor(missionProgress*PHASES.length))];
  const next=items.filter(x=>!x.unlocked).sort((a,b)=>b.progress-a.progress||a.target-b.target||a.title.localeCompare(b.title,'pt-BR')).slice(0,3);
  const nextMission=mission.filter(x=>!x.unlocked).sort((a,b)=>b.progress-a.progress)[0]||null;
  return {stats,items,unlocked,unlockedIds:new Set(unlocked.map(x=>x.id)),mission,missionProgress,missionUnlocked,phase,next,nextMission,records:stats.records};
}
