/* ══ UI · banner, modales gestuales, animaciones, temas, gestos, gráfica ══ */
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
function showBanner(msg){const b=document.getElementById('notif-banner');b.textContent=msg;b.classList.add('show');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('show'),2500);}
function openModal(html){const box=document.getElementById('modal-box');box.innerHTML='<div class="drag-handle"></div>'+html;document.getElementById('modal-scrim').classList.add('show');initSheetDrag();}
function closeModal(){document.getElementById('modal-scrim').classList.remove('show');dayEditorOpenKey=null;}
/* sheet arrastrable */
function initSheetDrag(){
  const box=document.getElementById('modal-box');const handle=box.querySelector('.drag-handle');if(!handle)return;
  let startY=0,dy=0,dragging=false;
  handle.onpointerdown=e=>{dragging=true;startY=e.clientY;box.style.transition='none';handle.setPointerCapture(e.pointerId);};
  handle.onpointermove=e=>{if(!dragging)return;dy=Math.max(0,e.clientY-startY);box.style.transform=`translateY(${dy}px)`;};
  handle.onpointerup=()=>{dragging=false;box.style.transition='';if(dy>120)closeModal();else box.style.transform='';dy=0;};
}
/* XP flotante hacia el pill */
function fxXP(srcEl,amount){
  if(REDUCED)return;
  const pill=document.getElementById('xp-pill');if(!pill)return;
  const from=srcEl?srcEl.getBoundingClientRect():pill.getBoundingClientRect();
  const to=pill.getBoundingClientRect();
  const s=document.createElement('span');s.className='xp-float';s.textContent='+'+amount+' XP';
  s.style.left=(from.left+from.width/2-20)+'px';s.style.top=(from.top)+'px';
  document.body.appendChild(s);
  requestAnimationFrame(()=>{s.style.transform=`translate(${to.left+to.width/2-(from.left+from.width/2)}px,${to.top-from.top}px) scale(.7)`;s.style.opacity='0';});
  setTimeout(()=>s.remove(),750);
}
/* temas */
function applyTheme(){
  const t=(state.settings&&state.settings.theme)||'rise';
  let th=t;
  if(t==='auto')th=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  document.documentElement.setAttribute('data-theme',th);
}
function setTheme(t){state.settings.theme=t;saveState(state);applyTheme();renderSettings();showBanner('Tema: '+t);}
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',()=>{if(state.settings.theme==='auto')applyTheme();});
/* navegación con dirección */
const SCREENS=['inicio','misiones','evolucion','vida','perfil'];let curScreen='inicio';
function showScreen(id){
  const from=SCREENS.indexOf(curScreen),to=SCREENS.indexOf(id);
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active','from-left','from-right'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('screen-'+id);
  el.classList.add('active',to>from?'from-right':'from-left');
  document.getElementById('nav-'+id).classList.add('active');
  document.getElementById('content').scrollTop=0;
  curScreen=id;
  if(id==='evolucion')setTimeout(drawLineChart,60);
}
function showSub(name){
  document.querySelectorAll('.subscreen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.seg-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('sub-'+name).classList.add('active');
  document.getElementById('seg-'+name).classList.add('active');
}
/* swipe horizontal entre pantallas principales */
(function(){
  let sx=0,sy=0;
  const c=document.getElementById('content');
  c.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;},{passive:true});
  c.addEventListener('pointerup',e=>{
    const dx=e.clientX-sx,dyv=e.clientY-sy;
    if(Math.abs(dx)>70&&Math.abs(dyv)<40&&Math.abs(dx)>Math.abs(dyv)*1.6){
      const i=SCREENS.indexOf(curScreen);
      if(dx<0&&i<SCREENS.length-1)showScreen(SCREENS[i+1]);
      if(dx>0&&i>0)showScreen(SCREENS[i-1]);
    }
  },{passive:true});
})();
/* gráfica interactiva */
let _chartPts=[];
function drawLineChart(){
  const canvas=document.getElementById('progress-chart');if(!canvas)return;
  const ctx=canvas.getContext('2d');const w=canvas.parentElement.clientWidth-28,h=130;
  canvas.width=w*devicePixelRatio;canvas.height=h*devicePixelRatio;canvas.style.width=w+'px';canvas.style.height=h+'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  const habits=habitsList();const today=new Date();const data=[];const labels=[];
  for(let i=13;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);const k=dateKey(d);
    const done=habits.filter(h=>(state.days[k]||{})[h.id]).length;
    data.push(habits.length?Math.round(done/habits.length*100):0);labels.push(d.getDate()+' '+MONTHS_SHORT[d.getMonth()]);}
  const pad={top:10,bottom:20,left:8,right:8},gw=w-pad.left-pad.right,gh=h-pad.top-pad.bottom;
  const accent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#f97316';
  ctx.clearRect(0,0,w,h);_chartPts=[];
  const max=Math.max(10,...data);
  data.forEach((v,i)=>{const x=pad.left+(i/(data.length-1))*gw,y=pad.top+gh-(v/max)*gh;_chartPts.push({x,y,v,label:labels[i]});});
  ctx.beginPath();ctx.strokeStyle=accent;ctx.lineWidth=2;ctx.lineJoin='round';ctx.lineCap='round';
  _chartPts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
  const g=ctx.createLinearGradient(0,pad.top,0,pad.top+gh);
  g.addColorStop(0,'rgba(249,115,22,.22)');g.addColorStop(1,'rgba(249,115,22,0)');
  ctx.lineTo(pad.left+gw,pad.top+gh);ctx.lineTo(pad.left,pad.top+gh);ctx.closePath();ctx.fillStyle=g;ctx.fill();
  _chartPts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,3,0,7);ctx.fillStyle=accent;ctx.fill();});
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text3').trim();ctx.font='9px sans-serif';ctx.textAlign='center';
  _chartPts.forEach((p,i)=>{if(i%2===0||i===13)ctx.fillText(p.label.split(' ')[0],p.x,pad.top+gh+14);});
}
document.addEventListener('click',e=>{
  const c=e.target.closest('#progress-chart');if(!c)return;
  const r=c.getBoundingClientRect();const x=e.clientX-r.left;
  let best=null,bd=1e9;_chartPts.forEach(p=>{const d=Math.abs(p.x-x);if(d<bd){bd=d;best=p;}});
  const tip=document.getElementById('chart-tip');
  if(best&&bd<30){tip.hidden=false;tip.style.left=best.x+'px';tip.style.top=(best.y+30)+'px';tip.textContent=`${best.label} · ${best.v}% de hábitos`;}
  else tip.hidden=true;
});
/* notificaciones */
function sendNotif(title,body){
  if('Notification' in window&&Notification.permission==='granted'&&'serviceWorker' in navigator){
    navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body,icon:'./icons/icon-192.png',vibrate:[200,100,200]})).catch(()=>showBanner(title+' — '+body));
  }else showBanner(title+' — '+body);
}
function requestNotifPermission(){if(!('Notification' in window))return;Notification.requestPermission().then(p=>{if(p==='granted')showBanner('Notificaciones activadas ✓');});}
let reminderInterval=null;
function toggleReminder(btn){
  state.settings.reminders=!state.settings.reminders;saveState(state);
  btn.classList.toggle('on',state.settings.reminders);
  if(state.settings.reminders){requestNotifPermission();startReminders();showBanner('Recordatorios activos');}
  else{stopReminders();showBanner('Recordatorios apagados');}
}
function startReminders(){
  if(reminderInterval)return;
  const tick=()=>{const n=new Date(),h=n.getHours(),m=n.getMinutes();if(m!==0)return;
    if(h===8)sendNotif('🌅 Buenos días','Hoy es un nuevo día para crecer.');
    if(h===12)sendNotif('📋 Hábitos','¿Ya marcaste tus hábitos de la mañana?');
    if(h===16){const p=(state.tasks||[]).filter(t=>!t.done).length;if(p)sendNotif('📝 Tareas',`Tienes ${p} tarea(s) pendiente(s).`);}
    if(h===19){const habits=habitsList(),day=getDay(todayKey());const done=habits.filter(x=>day[x.id]).length;
      sendNotif(done>=habits.length?'🎉 Día completo':'⚠️ Día incompleto',done>=habits.length?'¡Excelente trabajo!':'Aún puedes completar tus hábitos.');}
    if(h===21)sendNotif('🌙 Buenas noches','Revisa tu día y alista mañana.');
    if(h===23&&calcStreak()===0)sendNotif('🔥 Racha','Un hábito pequeño antes de dormir cuenta.');
  };
  reminderInterval=setInterval(tick,30000);
}
function stopReminders(){clearInterval(reminderInterval);reminderInterval=null;}