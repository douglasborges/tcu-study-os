(() => {
  'use strict';
  const META_KEY='metodo-et-drive-sync-meta-v1';
  let open=false,manage=null,panel=null,lastRaw='';

  function meta(){
    try{return JSON.parse(localStorage.getItem(META_KEY)||'{}')||{};}catch{return {};}
  }
  function fmt(value){
    if(!value)return 'Ainda não sincronizado nesta instalação.';
    const d=new Date(value);
    return Number.isFinite(d.getTime())?d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}):'Sincronização registrada.';
  }
  function esc(value){
    return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function render(){
    const raw=localStorage.getItem(META_KEY)||'{}';
    if(raw===lastRaw&&panel&&!open)return;
    lastRaw=raw;
    const m=meta(),status=document.querySelector('.drive-sync-floating');
    if(manage){
      manage.dataset.state=status?.dataset.state||'disconnected';
      manage.title=m.accountEmail?('Gerenciar Drive · '+m.accountEmail):'Gerenciar sincronização do Drive';
    }
    if(!panel)return;
    panel.hidden=!open;
    if(!open)return;
    const state=status?.dataset.state||'disconnected';
    const label=(status?.textContent||'Drive').replace('☁ ','');
    const detail=status?.title||'';
    panel.innerHTML=`<div class="drive-panel-head"><div><span class="drive-kicker">GOOGLE DRIVE</span><strong>${esc(m.accountName||'Sincronização Método ET')}</strong><small>${esc(m.accountEmail||'Conta será identificada na próxima conexão.')}</small></div><button class="drive-close" type="button" data-drive-ui="close" aria-label="Fechar">×</button></div><div class="drive-panel-status"><span class="drive-state-dot" data-state="${esc(state)}"></span><div><b>${esc(label)}</b><small>${esc(detail)}</small></div></div><dl><div><dt>Última sincronização</dt><dd>${esc(fmt(m.lastSyncAt))}</dd></div><div><dt>Arquivo</dt><dd>Metodo ET - Dados.json</dd></div></dl><div class="drive-panel-actions"><button type="button" data-drive-ui="sync">Sincronizar agora</button><button type="button" class="secondary" data-drive-ui="switch">Trocar conta</button></div><p class="drive-panel-note">A Método ET lembra a conta usada neste Mac e tenta reutilizá-la nas próximas reconexões. O Google ainda pode exigir confirmação quando a sessão expirar.</p>`;
  }
  function mount(){
    if(document.querySelector('.drive-sync-manage'))return;
    manage=document.createElement('button');
    manage.type='button';
    manage.className='drive-sync-manage';
    manage.textContent='⋯';
    manage.setAttribute('aria-label','Gerenciar sincronização do Drive');
    panel=document.createElement('section');
    panel.className='drive-sync-panel';
    panel.hidden=true;
    document.body.append(manage,panel);
    manage.addEventListener('click',()=>{open=!open;render();});
    panel.addEventListener('click',e=>{
      const action=e.target.closest?.('[data-drive-ui]')?.dataset.driveUi;
      if(!action)return;
      if(action==='close'){open=false;render();return;}
      if(action==='sync'){window.dispatchEvent(new CustomEvent('metodo-et-drive-sync-now'));return;}
      if(action==='switch'){open=false;render();window.dispatchEvent(new CustomEvent('metodo-et-drive-switch-account'));}
    });
    document.addEventListener('click',e=>{
      if(!open||panel.contains(e.target)||manage.contains(e.target))return;
      open=false;render();
    });
    render();
    setInterval(render,1000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();