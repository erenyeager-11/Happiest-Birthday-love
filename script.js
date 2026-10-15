/* ====== EDIT ME ====== */
const NAME='Tanishka';               // her name
const INTRO='song.mp3'; // the ONE song for the whole site

/* ===================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('.n').forEach(e=>e.textContent=NAME);
const heart=(x,y,b)=>{const h=document.createElement('i');h.className='h';h.textContent=['💗','💖','🌸','💕','✨'][Math.random()*5|0];
 h.style.cssText=`left:${x}px;top:${y}px;font-size:${14+Math.random()*18}px;--dx:${(Math.random()-.5)*(b?320:90)}px;--dy:${b?-(60+Math.random()*240):-innerHeight-60}px;animation-duration:${b?1.8:8+Math.random()*5}s`;
 document.body.appendChild(h);setTimeout(()=>h.remove(),14000)};
const burst=(n=30)=>{for(let i=0;i<n;i++)heart(innerWidth/2,innerHeight*.6,1)};
function startGarden(){$('#garden').classList.add('on');const f=$$('.flower-container');f[0].classList.add('animate');
 setTimeout(()=>{f[1].classList.add('animate');f[2].classList.add('animate');const r=f.slice(3);
 const t=setInterval(()=>{if(!r.length)return clearInterval(t);r.splice(Math.random()*r.length|0,1)[0].classList.add('animate')},400)},2500)}
/* envelope */
$('#seal').onclick=()=>{$('#env').classList.add('open');$('#cover').classList.add('opening');
 setTimeout(()=>{$('#cover').classList.add('gone');document.body.classList.remove('lock');startGarden()},2400)};
/* intro song: Yes plays it; "No" plays it the moment it is touched, then vanishes */
const intro=new Audio(INTRO);intro.loop=true;const mu=$('#mute');intro.onplay=()=>mu.textContent='🔊';intro.onpause=()=>mu.textContent='🔇';mu.onclick=()=>intro.paused?intro.play().catch(()=>{}):intro.pause();
const go=()=>{intro.play().catch(()=>{});burst(10);setTimeout(()=>$('main').scrollBy({left:innerWidth,behavior:'smooth'}),1600)};
$('#yes').onclick=go;
const no=$('#no');let done=0;
['pointerenter','pointerdown','touchstart'].forEach(ev=>no.addEventListener(ev,()=>{if(done)return;done=1;no.classList.add('vanish');$('#toast').textContent='Nice try 😌 playing it anyway…';go()},{passive:true}));
/* plushie game */
const toys=['🧸','🐰','🐻','🐼','🦊','🐱'];let sc=0,tm;
$('#start').onclick=e=>{e.target.remove();sc=0;$('#score').textContent=0;$('#win').hidden=true;
 tm=setInterval(()=>{const b=document.createElement('button');b.className='toy';b.textContent=toys[Math.random()*6|0];b.setAttribute('aria-label','plushie');
  b.style.left=Math.random()*80+4+'%';b.style.animationDuration=3+Math.random()*2+'s';
  b.onclick=()=>{b.onclick=null;b.classList.add('pop');$('#score').textContent=++sc;
   if(sc>=10){clearInterval(tm);$('#win').hidden=false;burst(30);$$('.toy').forEach(t=>t.remove())}};
  $('#arena').appendChild(b);setTimeout(()=>b.remove(),5200)},650)};
/* confetti on last slide */
new IntersectionObserver(e=>{if(e[0].isIntersecting)burst(30)},{threshold:.6}).observe($('#s-end'));

/* swipe nav */
const M=$('main'),S=$$('section'),D=$('#dots');S.forEach(()=>D.appendChild(document.createElement('i')));
const idx=()=>Math.round(M.scrollLeft/innerWidth);
const mark=()=>[...D.children].forEach((d,i)=>d.classList.toggle('on',i==idx()));mark();M.addEventListener('scroll',mark,{passive:true});
$('#L').onclick=()=>M.scrollBy({left:-innerWidth,behavior:'smooth'});$('#R').onclick=()=>M.scrollBy({left:innerWidth,behavior:'smooth'});
addEventListener('keydown',e=>{if(e.key=='ArrowRight')$('#R').click();if(e.key=='ArrowLeft')$('#L').click()});
/* photo deck: tap to flip to next */
const F=$$('#deck figure');
const lay=()=>F.forEach((f,i)=>{f.style.zIndex=F.length-i;f.style.opacity=i>2?0:1;f.style.transform=`rotate(${i?(i%2?1:-1)*(2+i*2):0}deg) translateY(${i*5}px)`});lay();
$('#deck').onclick=()=>{const f=F[0];f.style.transform='translateX(130%) rotate(22deg)';f.style.opacity=0;
 setTimeout(()=>{F.push(F.shift());lay()},420)};
/* birthday candle */
$('#cake').onclick=()=>{if($('#flame').classList.contains('out'))return;$('#flame').classList.add('out');
 $('#cakeT').textContent='Wish made, '+NAME+' ✨ may every one of them come true';burst(24)};
/* reasons jar */
const R_=['The way you laugh at your own jokes first','How loudly you care about everyone','Your sleepy morning voice','You make me want to be better','Your cute angry face','The way you say my name','Your hugs fix everything','You believe in me even when I don\'t','All your tiny habits I notice','Because you are simply you'];
let rc=0;$('#jar').onclick=()=>{$('#reason').textContent=R_[rc%10];if(rc<10)$('#rc').textContent=++rc;else rc++;
 if(rc==10)burst(14)};
/* hold for a hug */
let ht,hs;const hf=$('#hugfill'),hb=$('#hug');
const stopH=()=>{clearInterval(ht);if(hf.style.width!='100%')hf.style.width='0'};
hb.addEventListener('pointerdown',()=>{hs=Date.now();hf.style.transition='width 2s linear';hf.style.width='100%';
 ht=setTimeout(()=>{$('#hugT').textContent='Hug delivered 🤗 it lasts till I see you';burst(24)},2000)});
['pointerup','pointerleave','pointercancel'].forEach(e=>hb.addEventListener(e,()=>{if(Date.now()-hs<2000){clearTimeout(ht);hf.style.transition='width .3s';hf.style.width='0'}}));

/* open-when notes */
$$('.ow').forEach(b=>b.onclick=()=>{$('#owt').textContent=b.dataset.t;b.style.background='#ffd3de'});
/* love coupons */
$$('.cp:not(.rv)').forEach(b=>b.onclick=()=>{if(!b.classList.contains('used')){b.classList.add('used');burst(8)}});
/* scratch card */
const cv=$('#sc'),g=cv.getContext('2d');let dr=0,mv=0,fin=0;
const gr=g.createLinearGradient(0,0,300,160);gr.addColorStop(0,'#f58aa8');gr.addColorStop(1,'#ffc0d3');g.fillStyle=gr;g.fillRect(0,0,300,160);
g.fillStyle='#fff';g.font='600 26px Fredoka,sans-serif';g.textAlign='center';g.fillText('scratch me ✿',150,88);
g.globalCompositeOperation='destination-out';
const sx=e=>{const r=cv.getBoundingClientRect();g.beginPath();g.arc((e.clientX-r.left)*300/r.width,(e.clientY-r.top)*160/r.height,20,0,7);g.fill();
 if(++mv%8==0&&!fin){const d=g.getImageData(0,0,300,160).data;let n=0;for(let i=3;i<d.length;i+=16)if(!d[i])n++;
  if(n/(d.length/16)>.45){fin=1;cv.style.opacity=0;burst(26)}}};
cv.onpointerdown=e=>{dr=1;cv.setPointerCapture(e.pointerId);sx(e)};cv.onpointermove=e=>dr&&sx(e);cv.onpointerup=()=>dr=0;

/* same moon */
const MM=['Kiss received 💋','Got it, sending one back 😘','Another one?! I\'m blushing','Now I miss you even more 🥺','Keep them coming, I\'m counting','Okay okay, I\'m all yours 😌'];let mk=0;
$('#moon').onclick=()=>{$('#mk').textContent=++mk;$('#mt').textContent=mk==10?'10 kisses! I\'ll collect the rest in person 💗':MM[Math.min(mk-1,5)];if(mk==10)burst(20)};

/* when I see you + blown kiss */
$$('.rv').forEach(b=>b.onclick=()=>{if(b.classList.contains('on'))return;b.textContent=b.dataset.t;b.classList.add('on');burst(6)});
const KT=['Caught it 😌 it\'s mine now','Another one? Greedy 😏','I felt that one 🥺💋','You\'re making me blush, Tanishka','Okay stop, I\'m coming over 😘'];let kn=0;
$('#kiss').onclick=e=>{const r=e.target.getBoundingClientRect(),k=document.createElement('i');k.className='kiss';k.textContent='😘';
 k.style.left=r.left+r.width/2-28+'px';k.style.top=r.top+'px';document.body.appendChild(k);setTimeout(()=>k.remove(),1700);
 $('#kt').textContent=KT[kn++%KT.length]};

/* memory match */
const E=['💋','🤗','🫶','😘','🌹','💑'];let first=null,lock=0,mvs=0,pairs=0;
[...E,...E].sort(()=>Math.random()-.5).forEach(e=>{const b=document.createElement('button');b.textContent='💗';b.onclick=()=>{
 if(lock||b.classList.contains('up')||b.classList.contains('ok'))return;b.textContent=e;b.classList.add('up');
 if(!first){first=b;return}$('#mv').textContent=++mvs;
 if(first.textContent==e){first.className=b.className='ok';first=null;if(++pairs==6){$('#mw').hidden=false;burst(26)}}
 else{lock=1;const f=first;first=null;setTimeout(()=>{[f,b].forEach(x=>{x.className='';x.textContent='💗'});lock=0},800)}};
 $('#mem').appendChild(b)});
/* land the kiss */
let hit=0,pos=50,spd=1.6;const tk=$('#tk');
(function an(t){pos=50+46*Math.sin(t/1000*spd);tk.style.left=pos+'%';requestAnimationFrame(an)})(0);
$('#tap').onclick=()=>{if(hit>=3)return;if(Math.abs(pos-50)<8){$('#ph').textContent=++hit;spd+=.7;
 $('#tm').textContent=hit==3?'Three perfect kisses 😘 I\'m collecting every one in person':['Perfect 😘','Mmm 💋 again, faster…'][hit-1];if(hit==3)burst(28)}
 else $('#tm').textContent='Missed 😏 you\'re shy, try again'};
