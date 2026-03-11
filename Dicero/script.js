// ============================================================
// SOUND EFFECTS SYSTEM (Web Audio API)
// ============================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio(){
  if(!audioCtx) audioCtx = new AudioCtx();
  if(audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type){
  initAudio();
  if(!audioCtx) return;

  const now = audioCtx.currentTime;

  if(type === 'roll'){
    // Dice rolling - quick percussive taps like dice hitting table
    for(let i = 0; i < 6; i++){
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      // Vary pitch for each tap
      osc.frequency.value = 150 + Math.random() * 100;
      const t = now + i * 0.06 + Math.random() * 0.03;
      const vol = 0.12 * (1 - i * 0.1);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.06);
    }
  }
  else if(type === 'keep'){
    // Dice keep - soft click
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = 600;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  else if(type === 'unkeep'){
    // Dice unkeep - lower pitch
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = 400;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  else if(type === 'score'){
    // Score - coins dropping/collecting sound
    for(let i = 0; i < 5; i++){
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 1800 + i * 200 + Math.random() * 200;
      const t = now + i * 0.06;
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.start(t);
      osc.stop(t + 0.12);
    }
  }
  else if(type === 'chip'){
    // Chip add - simple coin ding
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  }
  else if(type === 'mult'){
    // Mult add - cash register cha-ching
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.value = 1800;
    osc2.frequency.value = 2200;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
    // Second ring
    const osc3 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc3.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc3.type = 'sine';
    osc3.frequency.value = 2600;
    gain2.gain.setValueAtTime(0.06, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc3.start(now + 0.08);
    osc3.stop(now + 0.22);
  }
  else if(type === 'victory'){
    // Victory fanfare
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.3);
    });
  }
  else if(type === 'defeat'){
    // Defeat - descending
    [400, 350, 300, 200].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.2);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.2);
    });
  }
  else if(type === 'buy'){
    // Purchase sound - coin
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  }
  else if(type === 'charm'){
    // Charm pickup - magical shimmer
    [880, 1100, 1320, 1100, 880].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.1);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.1);
    });
  }
  else if(type === 'click'){
    // UI click
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = 500;
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.start(now);
    osc.stop(now + 0.04);
  }
  else if(type === 'bigScore'){
    // Big score - jackpot coin shower
    for(let i = 0; i < 12; i++){
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 2000 + Math.random() * 1500;
      const t = now + i * 0.04 + Math.random() * 0.02;
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.start(t);
      osc.stop(t + 0.14);
    }
    // Add a rising shimmer
    const shimmer = audioCtx.createOscillator();
    const shimmerGain = audioCtx.createGain();
    shimmer.connect(shimmerGain);
    shimmerGain.connect(audioCtx.destination);
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(1500, now);
    shimmer.frequency.exponentialRampToValueAtTime(3500, now + 0.5);
    shimmerGain.gain.setValueAtTime(0.05, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    shimmer.start(now);
    shimmer.stop(now + 0.5);
  }
}

// ============================================================
// ANIMATED BACKGROUND (Balatro-style swirling pattern)
// ============================================================
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgTime = 0;

function resizeBg(){
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

function drawBg(){
  const w = bgCanvas.width, h = bgCanvas.height;
  const t = bgTime;

  // Create subtle swirling pattern
  const imgData = bgCtx.createImageData(w, h);
  const data = imgData.data;

  // Low-res for performance
  const scale = 4;
  const sw = Math.ceil(w/scale), sh = Math.ceil(h/scale);
  const small = new Uint8ClampedArray(sw * sh * 4);

  for(let y=0; y<sh; y++){
    for(let x=0; x<sw; x++){
      const fx = x/sw, fy = y/sh;

      // Swirl distortion
      const cx = fx - 0.5, cy = fy - 0.5;
      const dist = Math.sqrt(cx*cx + cy*cy);
      const angle = Math.atan2(cy, cx) + t*0.3 + dist*3;

      const v1 = Math.sin(angle*2 + t*0.5) * 0.5 + 0.5;
      const v2 = Math.sin(fx*8 + Math.sin(fy*6+t*0.4)*2 + t*0.3) * 0.5 + 0.5;
      const v3 = Math.sin(dist*6 - t*0.6) * 0.5 + 0.5;

      const combined = (v1*0.4 + v2*0.3 + v3*0.3);

      // Dark purple/blue palette
      const r = Math.floor(10 + combined * 25);
      const g = Math.floor(6 + combined * 12);
      const b = Math.floor(20 + combined * 40);

      const idx = (y * sw + x) * 4;
      small[idx] = r;
      small[idx+1] = g;
      small[idx+2] = b;
      small[idx+3] = 255;
    }
  }

  // Scale up
  for(let y=0; y<h; y++){
    for(let x=0; x<w; x++){
      const sx = Math.floor(x/scale), sy = Math.floor(y/scale);
      const si = (sy * sw + sx) * 4;
      const di = (y * w + x) * 4;
      data[di] = small[si];
      data[di+1] = small[si+1];
      data[di+2] = small[si+2];
      data[di+3] = 255;
    }
  }

  bgCtx.putImageData(imgData, 0, 0);

  // Vignette
  const grad = bgCtx.createRadialGradient(w/2,h/2,w*0.2, w/2,h/2,w*0.75);
  grad.addColorStop(0,'transparent');
  grad.addColorStop(1,'rgba(0,0,0,0.6)');
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0,0,w,h);

  bgTime += 0.008;
  requestAnimationFrame(drawBg);
}
drawBg();

// ============================================================
// SCREEN SHAKE
// ============================================================
function screenShake(){
  document.getElementById('game').classList.add('shake');
  setTimeout(()=>document.getElementById('game').classList.remove('shake'), 400);
}

// ============================================================
// DICE CASCADE (boss defeat)
// ============================================================

// Initialized after DOT_POS/DOT_FACES — see below
let _cascadeDotTemplates=null; // reset to null forces re-init on next cascade

// Pre-cached dot templates using CSS var(--dot-sz) for size (optimization #9)
function _initCascadeDotTemplates(){
  if(_cascadeDotTemplates)return;
  _cascadeDotTemplates={};
  for(let v=1;v<=6;v++){
    const face=DOT_FACES[v]||DOT_FACES[1];
    let html='';
    face.forEach(pos=>{
      const[x,y]=DOT_POS[pos];
      html+=`<div style="position:absolute;left:${x}%;top:${y}%;width:var(--dot-sz);height:var(--dot-sz);background:radial-gradient(circle at 35% 30%,#3a2010,#1a0c06,#120806);border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 1px 3px rgba(0,0,0,0.6),inset 0 1px 1px rgba(255,255,255,0.08)"></div>`;
    });
    _cascadeDotTemplates[v]=html;
  }
}

let _cascadeTimer=null; // optimization #10: cancel stale cleanup

function triggerDiceCascade(){
  _initCascadeDotTemplates();
  // Cancel any previous cleanup timer (optimization #10)
  if(_cascadeTimer){clearTimeout(_cascadeTimer);_cascadeTimer=null;}
  // Remove stale keyframes
  document.querySelector('style[data-cascade-kf]')?.remove();

  let container=document.getElementById('dice-cascade');
  if(!container){
    container=document.createElement('div');
    container.id='dice-cascade';
    document.body.appendChild(container);
  }
  container.style.display='block';

  const diceCount=20;

  // Generate all per-die keyframes in one <style> block
  // cMove: GPU-only translateX+Y (replaces top-based cascadeFall — no layout cost)
  //   Y keyframe stops encode gravity (slow→fast), X stops encode air resistance (fast→slow)
  // cSpin: X+Y axes only, no Z, unique direction per die
  const kfEl=document.createElement('style');
  kfEl.setAttribute('data-cascade-kf','');
  const totalY=window.innerHeight+240; // travel from top:-120px to off bottom
  let kfText='';
  const dieData=[];
  for(let i=0;i<diceCount;i++){
    const vx=((Math.random()-0.5)*280).toFixed(1);
    const rx=(Math.random()>0.5?1:-1)*(360+Math.floor(Math.random()*3)*360);
    const ry=(Math.random()>0.5?1:-1)*(360+Math.floor(Math.random()*3)*360);
    const rz=(Math.random()>0.5?1:-1)*(180+Math.floor(Math.random()*3)*180);
    // Gentle side-to-side wobble as dice fall
    const wobble=((Math.random()-0.5)*60).toFixed(1);
    kfText+=`@keyframes cMove${i}{`+
      `0%{transform:translateX(0px) translateY(0px)}`+
      `15%{transform:translateX(${wobble}px) translateY(${(totalY*0.04).toFixed(0)}px)}`+
      `35%{transform:translateX(${(-wobble*0.6).toFixed(1)}px) translateY(${(totalY*0.15).toFixed(0)}px)}`+
      `55%{transform:translateX(${(parseFloat(vx)*0.5+parseFloat(wobble)*0.4).toFixed(1)}px) translateY(${(totalY*0.32).toFixed(0)}px)}`+
      `80%{transform:translateX(${(parseFloat(vx)*0.88).toFixed(1)}px) translateY(${(totalY*0.62).toFixed(0)}px)}`+
      `100%{transform:translateX(${vx}px) translateY(${totalY}px)}`+
    `}`;
    kfText+=`@keyframes cSpin${i}{0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg)}100%{transform:rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)}}`;
    dieData.push({rx,ry,rz,vx});
  }
  kfEl.textContent=kfText;
  document.head.appendChild(kfEl);

  // Build all dice as one HTML string (optimization #8)
  const f=v=>_cascadeDotTemplates[v]||_cascadeDotTemplates[1];
  let html='';
  let maxEnd=0;
  for(let i=0;i<diceCount;i++){
    const value=Math.floor(Math.random()*6)+1;
    const size=55+Math.random()*30;
    const halfSize=(size/2).toFixed(1);
    const dotSz=Math.max(4,size*0.12).toFixed(1);
    // Bucket-based spread: divide screen into zones, pick random position within each zone
    const bucket=i%diceCount;
    const zoneW=88/diceCount;
    const startX=(4+bucket*zoneW+Math.random()*zoneW).toFixed(1);
    const delay=Math.floor(Math.random()*350);
    const fallDur=(2.0+Math.random()*0.5).toFixed(2);
    const rotDur=(0.4+Math.random()*1.0).toFixed(2);
    const end=delay+parseFloat(fallDur)*1000;
    if(end>maxEnd)maxEnd=end;

    html+=`<div class="cascade-die" style="--dot-sz:${dotSz}px;top:-120px;left:${startX}%;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;animation:cMove${i} ${fallDur}s linear ${delay}ms forwards">`+
      `<div class="cascade-die-scene"><div class="cascade-die-cube" style="animation:cSpin${i} ${rotDur}s linear ${delay}ms infinite">`+
        `<div class="cascade-die-face" style="transform:translateZ(${halfSize}px)">${f(value)}</div>`+
        `<div class="cascade-die-face" style="transform:rotateY(180deg) translateZ(${halfSize}px)">${f(7-value)}</div>`+
        `<div class="cascade-die-face" style="transform:rotateY(90deg) translateZ(${halfSize}px)">${f(Math.ceil(Math.random()*6))}</div>`+
        `<div class="cascade-die-face" style="transform:rotateY(-90deg) translateZ(${halfSize}px)">${f(Math.ceil(Math.random()*6))}</div>`+
        `<div class="cascade-die-face" style="transform:rotateX(90deg) translateZ(${halfSize}px)">${f(Math.ceil(Math.random()*6))}</div>`+
        `<div class="cascade-die-face" style="transform:rotateX(-90deg) translateZ(${halfSize}px)">${f(Math.ceil(Math.random()*6))}</div>`+
      `</div></div></div>`;
  }
  container.innerHTML=html;

  // Clean up only after the last die has fallen off screen (optimization #10)
  _cascadeTimer=setTimeout(()=>{
    container.innerHTML='';
    container.style.display='none';
    kfEl.remove();
    _cascadeTimer=null;
  },maxEnd+200);
}

function createCascadeDots(value,size){
  const face=DOT_FACES[value]||DOT_FACES[1];
  const dotSize=Math.max(4,size*0.12);
  let html='';
  face.forEach(pos=>{
    const [x,y]=DOT_POS[pos];
    html+=`<div style="position:absolute;left:${x}%;top:${y}%;width:${dotSize}px;height:${dotSize}px;background:radial-gradient(circle at 30% 30%,#fff,#e0d0ff 40%,#a080c0);border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 1px 3px rgba(0,0,0,0.5)"></div>`;
  });
  return html;
}

// ============================================================
// DICE DOT LAYOUT — standard dice face positions (percentage-based)
// ============================================================
// Positions: TL, TC, TR, ML, MC, MR, BL, BC, BR as [left%, top%]
const DOT_POS = {
  TL:[15,15], TC:[50,15], TR:[85,15],
  ML:[15,50], MC:[50,50], MR:[85,50],
  BL:[15,85], BC:[50,85], BR:[85,85],
};
const DOT_FACES = {
  1:['MC'],
  2:['TR','BL'],
  3:['TR','MC','BL'],
  4:['TL','TR','BL','BR'],
  5:['TL','TR','MC','BL','BR'],
  6:['TL','TR','ML','MR','BL','BR'],
  7:['TL','TR','ML','MC','MR','BL','BR'], // The First Die (6+1)
};

// Cube rotations: which transform brings each face value to face the viewer
const CUBE_ROTATIONS={
  1:'rotateX(0deg) rotateY(0deg)',
  2:'rotateX(-90deg) rotateY(0deg)',
  3:'rotateY(-90deg)',
  4:'rotateY(90deg)',
  5:'rotateX(90deg) rotateY(0deg)',
  6:'rotateY(180deg)',
  7:'rotateX(0deg) rotateY(0deg)', // same face as 1, front face shows 7 dots
};

function createDieDots(value){
  const face = DOT_FACES[value] || DOT_FACES[1];
  let html = '<div class="die-dots">';
  face.forEach(pos=>{
    const [x,y] = DOT_POS[pos];
    html += `<div class="die-dot" style="left:${x}%;top:${y}%;transform:translate(-50%,-50%)"></div>`;
  });
  html += '</div>';
  return html;
}

// ============================================================
// GAME DATA
// ============================================================
const CATEGORIES = [
  {id:'ones',name:'Ones',desc:'All dice showing 1',baseChips:8,baseMult:3,chipPer:8,multPer:2,num:1},
  {id:'twos',name:'Twos',desc:'All dice showing 2',baseChips:8,baseMult:3,chipPer:8,multPer:2,num:2},
  {id:'threes',name:'Threes',desc:'All dice showing 3',baseChips:8,baseMult:3,chipPer:8,multPer:2,num:3},
  {id:'fours',name:'Fours',desc:'All dice showing 4',baseChips:10,baseMult:3,chipPer:8,multPer:2,num:4},
  {id:'fives',name:'Fives',desc:'All dice showing 5',baseChips:10,baseMult:3,chipPer:8,multPer:2,num:5},
  {id:'sixes',name:'Sixes',desc:'All dice showing 6',baseChips:12,baseMult:3,chipPer:8,multPer:2,num:6},
  {id:'three_kind',name:'Three of a Kind',desc:'3+ same value',baseChips:18,baseMult:3,chipPer:12,multPer:1},
  {id:'four_kind',name:'Four of a Kind',desc:'4+ same value',baseChips:32,baseMult:5,chipPer:15,multPer:2},
  {id:'full_house',name:'Full House',desc:'3 of one + 2 of another',baseChips:22,baseMult:4,chipPer:15,multPer:2},
  {id:'small_straight',name:'Small Straight',desc:'4 sequential',baseChips:25,baseMult:4,chipPer:15,multPer:2},
  {id:'large_straight',name:'Large Straight',desc:'5 sequential',baseChips:40,baseMult:7,chipPer:20,multPer:3},
  {id:'yahtzee',name:'Dicero',desc:'All 5 same',baseChips:50,baseMult:12,chipPer:25,multPer:4},
  {id:'chance',name:'Chance',desc:'Any combo, sum all',baseChips:6,baseMult:2,chipPer:8,multPer:1},
];

const TRIALS = [
  {name:'The Penny Tables',desc:'Low stakes, easy money — if you know what you\'re doing.',base:150,bossTarget:450,
   enemies:[
     {name:'The Rookie',effect:'none',desc:'No effect.'},
     {name:'Weekend Regular',effect:'none',desc:'No effect.'},
     {name:'The Shill',effect:'none',desc:'No effect.'},
   ],
   boss:{name:'Big Sal, Floor Enforcer',effect:'pyraxxus',desc:'Sixes are debuffed \u2014 those dice give 0 chips and skip Charm effects.'}
  },
  {name:'The High Roller Lounge',desc:'Velvet ropes, open bar, and eyes watching your every move.',base:750,bossTarget:2250,
   enemies:[
     {name:'Card Counter',effect:'none',desc:'No effect.'},
     {name:'The Loan Shark',effect:'none',desc:'No effect.'},
     {name:'Pit Boss',effect:'none',desc:'No effect.'},
   ],
   boss:{name:'Vincent "The Rake" Morello',effect:'gloomjaw',desc:'After each hand, your lowest-scoring used category is raked off the table (disabled).'}
  },
  {name:'The Strip',desc:'Neon lights, desperate bets, and luck running razor thin.',base:3000,bossTarget:10000,
   enemies:[
     {name:'Whale Hunter',effect:'none',desc:'No effect.'},
     {name:'The Comp King',effect:'none',desc:'No effect.'},
     {name:'Snake Eyes',effect:'none',desc:'No effect.'},
   ],
   boss:{name:'Lady Electra, Casino Queen',effect:'voltaryx',desc:'She won\'t let you play the same angle twice — can\'t score the same category in a row.'}
  },
  {name:'The Vault Room',desc:'Back-room games where the rules are made up and odds don\'t matter.',base:15000,bossTarget:50000,
   enemies:[
     {name:'The Fixer',effect:'none',desc:'No effect.'},
     {name:'Numbers Man',effect:'none',desc:'No effect.'},
     {name:'Ghost Roller',effect:'none',desc:'No effect.'},
   ],
   boss:{name:'Zero Delacroix, the Void Banker',effect:'nihilex',desc:'Two random numbers are off the board — can\'t be scored (0 chips, don\'t count for combos).'}
  },
  {name:'The House',desc:'The final table. The owner watches from the shadows.',base:75000,bossTarget:250000,
   enemies:[
     {name:'The Minder',effect:'none',desc:'No effect.'},
     {name:'House Ace',effect:'none',desc:'No effect.'},
     {name:'The Closer',effect:'none',desc:'No effect.'},
   ],
   boss:{name:'Mr. Cavendish, The House',effect:'aeonax',desc:'Three numbers banned. -1 hand. The house sets the rules.'}
  },
];

const CHARMS = [
  {id:'lucky_penny',name:'Lucky Penny',icon:'🪙',rarity:'common',desc:'+8 chips.',type:'independent',chips:8,cost:4},
  {id:'iron_die',name:'Iron Die',icon:'🎲',rarity:'common',desc:'+4 mult.',type:'independent',mult:4,cost:5},
  {id:'snake_eyes',name:'Snake Eyes',icon:'🐍',rarity:'common',desc:'+20 chips when any pair is rolled.',type:'on_roll',cost:4},
  {id:'steady_hand',name:'Steady Hand',icon:'✋',rarity:'common',desc:'+1 mult per die kept on first reroll.',type:'on_keep',cost:5},
  {id:'copper_ring',name:'Copper Ring',icon:'💍',rarity:'common',desc:'+$1 after each encounter.',type:'economy',cost:4},
  {id:'warm_ember',name:'Warm Ember',icon:'🔥',rarity:'common',desc:'Dice showing 1 give +5 chips when scored.',type:'on_score',cost:5},
  {id:'loaded_bones',name:'Loaded Bones',icon:'🦴',rarity:'common',desc:'+15 chips when scoring Chance.',type:'on_category',category:'chance',chips:15,cost:4},
  {id:'gamblers_grin',name:"Gambler's Grin",icon:'😏',rarity:'common',desc:'+1 mult per reroll used.',type:'on_reroll',cost:5},
  {id:'tallow_candle',name:'Tallow Candle',icon:'🕯️',rarity:'common',desc:'+15 chips if scoring exactly 2 dice.',type:'on_score',cost:4},
  {id:'field_mouse',name:'Field Mouse',icon:'🐭',rarity:'common',desc:'Score <100: gain $2.',type:'economy',cost:5},
  {id:'obsidian_shard',name:'Obsidian Shard',icon:'🗡️',rarity:'uncommon',desc:'Each 6 scored: \u00d71.5 mult.',type:'on_score',cost:8},
  {id:'fortunes_wheel',name:"Fortune's Wheel",icon:'☸️',rarity:'uncommon',desc:'+3 chips permanently per full reroll.',type:'scaling',scaleStat:'chips',scaleAmt:3,accumulated:0,cost:8},
  {id:'echoing_die',name:'Echoing Die',icon:'🔊',rarity:'uncommon',desc:'Highest scored die triggers twice.',type:'on_score',cost:9},
  {id:'bone_abacus',name:'Bone Abacus',icon:'🧮',rarity:'uncommon',desc:'+1 mult permanently per Four of a Kind.',type:'scaling',scaleStat:'mult',scaleAmt:1,accumulated:0,cost:9},
  {id:'snake_charmer',name:'Snake Charmer',icon:'🪈',rarity:'uncommon',desc:'Small Straights: +20 chips, +2 mult.',type:'on_category',category:'small_straight',chips:20,catMult:2,cost:7},
  {id:'hexed_coin',name:'Hexed Coin',icon:'🪬',rarity:'uncommon',desc:'+$4/encounter.',type:'economy',cost:8},
  {id:'stone_mask',name:'Stone Mask',icon:'🗿',rarity:'uncommon',desc:'All 5 dice different: +6 mult.',type:'on_score',cost:9},
  {id:'blood_pact',name:'Blood Pact',icon:'🩸',rarity:'uncommon',desc:'+5 mult, but -1 hand/encounter.',type:'independent',mult:5,drawback:'hand',cost:7},
  {id:'chrono_die',name:'Chrono Die',icon:'⏳',rarity:'rare',desc:'+1 reroll per encounter.',type:'passive',cost:14},
  {id:'ouroboros',name:'The Ouroboros',icon:'🐉',rarity:'rare',desc:'+5 chips & +1 mult per failed encounter.',type:'scaling',scaleStat:'both',accumulated:0,cost:13},
  {id:'golden_bones',name:'Golden Bones',icon:'✨',rarity:'rare',desc:'\u00d71.5 mult if you have $20+.',type:'independent',cost:15},
  {id:'fate_bender',name:'Fate Bender',icon:'🔮',rarity:'rare',desc:'Once/encounter: set a die to any value.',type:'passive',usedThisEncounter:false,cost:14},
  {id:'chaos_orb',name:'Chaos Orb',icon:'🌀',rarity:'rare',desc:'Each roll: one random die is wild.',type:'on_roll',cost:16},
  {id:'the_first_die',name:'The First Die',icon:'💠',rarity:'legendary',desc:'All dice +1 to face value (6\u21927).',type:'passive',cost:20},
  {id:'paradox_engine',name:'Paradox Engine',icon:'⚡',rarity:'legendary',desc:'12% chance mult is squared.',type:'on_score',cost:20},
  {id:'eternitys_gambit',name:"Eternity's Gambit",icon:'♾️',rarity:'legendary',desc:'Choose a category: \u00d73 mult for the encounter.',type:'passive',chosenCategory:null,cost:20},
  // --- NEW SYNERGY CHARMS ---
  // Matching/Pairs archetype
  {id:'double_down',name:'Double Down',icon:'👯',rarity:'common',desc:'+4 mult when scoring a pair or better.',type:'on_score',cost:5},
  {id:'triple_threat',name:'Triple Threat',icon:'🎯',rarity:'uncommon',desc:'Three of a Kind: retrigger highest die.',type:'on_score',cost:8},
  // Straight archetype
  {id:'road_runner',name:'Road Runner',icon:'🏃',rarity:'common',desc:'+3 mult when scoring any Straight.',type:'on_score',cost:5},
  // Number-specific archetype (pair with Blessings)
  {id:'even_steven',name:'Even Steven',icon:'⚖️',rarity:'uncommon',desc:'Each even die (2,4,6) scored: +3 mult.',type:'on_score',cost:8},
  {id:'odd_todd',name:'Odd Todd',icon:'🃏',rarity:'uncommon',desc:'Each odd die (1,3,5) scored: +3 mult.',type:'on_score',cost:8},
  // High-risk archetype
  {id:'glass_cannon',name:'Glass Cannon',icon:'💣',rarity:'uncommon',desc:'\u00d72 mult, but destroyed after 3 uses.',type:'on_score',uses:3,cost:6},
  {id:'daredevil',name:'Daredevil',icon:'🏍️',rarity:'rare',desc:'\u00d72 mult on your last hand.',type:'on_score',cost:12},
  // Scaling archetype
  {id:'war_drum',name:'War Drum',icon:'🥁',rarity:'common',desc:'+1 mult permanently per encounter won.',type:'scaling',scaleStat:'mult',scaleAmt:1,accumulated:0,cost:5},
  {id:'midas_touch',name:'Midas Touch',icon:'👑',rarity:'uncommon',desc:'+2 chips permanently per $1 spent in shops.',type:'scaling',scaleStat:'chips',scaleAmt:0,accumulated:0,cost:7},
  // Economy synergy
  {id:'golden_ticket',name:'Golden Ticket',icon:'🎫',rarity:'common',desc:'+$1 per 6 scored in a hand.',type:'economy',cost:4},
  {id:'tax_collector',name:'Tax Collector',icon:'🏛️',rarity:'uncommon',desc:'+$2 per unused hand at end of encounter.',type:'economy',cost:7},
  // Retrigger/copy archetype (Balatro staples)
  {id:'echo_chamber',name:'Echo Chamber',icon:'🔁',rarity:'rare',desc:'All scored dice trigger twice for chips.',type:'on_score',cost:16},
  {id:'blueprint',name:'Blueprint',icon:'📋',rarity:'rare',desc:'Copies the effect of your first charm slot.',type:'passive',cost:14},

  // --- NUMBER-SPECIALIST ARCHETYPE ---
  // Per-number charms: huge payoff for committing to a single face value
  {id:'ace_devotion',name:'Ace Devotion',icon:'1️⃣',rarity:'uncommon',desc:'Each 1 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  {id:'twin_fangs',name:'Twin Fangs',icon:'2️⃣',rarity:'uncommon',desc:'Each 2 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  {id:'trinity',name:'Trinity',icon:'3️⃣',rarity:'uncommon',desc:'Each 3 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  {id:'quad_core',name:'Quad Core',icon:'4️⃣',rarity:'uncommon',desc:'Each 4 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  {id:'high_five',name:'High Five',icon:'5️⃣',rarity:'uncommon',desc:'Each 5 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  {id:'sixth_sense',name:'Sixth Sense',icon:'6️⃣',rarity:'uncommon',desc:'Each 6 scored: +8 chips, +2 mult.',type:'on_score',cost:7},
  // Generic number-focus support
  {id:'devotee',name:'Devotee',icon:'🛐',rarity:'rare',desc:'If all scored dice show the same number: ×2.5 mult.',type:'on_score',cost:14},
  {id:'number_crunch',name:'Number Cruncher',icon:'🔢',rarity:'common',desc:'+2 mult per matching die beyond the first.',type:'on_score',cost:5},
  {id:'loaded_dice',name:'Loaded Dice',icon:'🎰',rarity:'rare',desc:'After rolling, one random unkept die copies the most common face.',type:'on_roll',cost:13},

  // --- MORE MATCHING/YAHTZEE ARCHETYPE ---
  {id:'pair_bond',name:'Pair Bond',icon:'💑',rarity:'common',desc:'+12 chips per pair in your dice.',type:'on_score',cost:4},
  {id:'mob_mentality',name:'Mob Mentality',icon:'👥',rarity:'uncommon',desc:'+3 mult per die showing the most common value.',type:'on_score',cost:8},
  {id:'perfectionist',name:'Perfectionist',icon:'💯',rarity:'rare',desc:'Dicero: ×3 mult.',type:'on_score',cost:15},
  {id:'domino_effect',name:'Domino Effect',icon:'🀄',rarity:'uncommon',desc:'Four of a Kind: retrigger all matching dice.',type:'on_score',cost:9},
  {id:'herd_instinct',name:'Herd Instinct',icon:'🐑',rarity:'common',desc:'+1 mult permanently per Three of a Kind scored.',type:'scaling',scaleStat:'mult',scaleAmt:1,accumulated:0,cost:5},

  // --- MORE STRAIGHT ARCHETYPE ---
  {id:'compass',name:'Compass',icon:'🧭',rarity:'common',desc:'+20 chips when scoring any Straight.',type:'on_score',cost:4},
  {id:'highway',name:'Highway',icon:'🛣️',rarity:'uncommon',desc:'Large Straight: +5 mult.',type:'on_category',category:'large_straight',chips:0,catMult:5,cost:8},
  {id:'shortcut',name:'Shortcut',icon:'⚡',rarity:'uncommon',desc:'Small Straight: ×1.5 mult.',type:'on_score',cost:8},
  {id:'wanderlust',name:'Wanderlust',icon:'🗺️',rarity:'rare',desc:'+2 mult permanently per Straight scored.',type:'scaling',scaleStat:'mult',scaleAmt:2,accumulated:0,cost:12},

  // --- FULL HOUSE ARCHETYPE ---
  {id:'home_sweet_home',name:'Home Sweet Home',icon:'🏠',rarity:'uncommon',desc:'Full House: +25 chips, +3 mult.',type:'on_category',category:'full_house',chips:25,catMult:3,cost:7},
  {id:'balanced_diet',name:'Balanced Diet',icon:'🥗',rarity:'common',desc:'+2 mult when scoring Full House.',type:'on_score',cost:4},
  {id:'family_portrait',name:'Family Portrait',icon:'🖼️',rarity:'rare',desc:'Full House: retrigger all 5 dice.',type:'on_score',cost:14},

  // --- MULT SCALING ENGINES ---
  {id:'rage_crystal',name:'Rage Crystal',icon:'💎',rarity:'uncommon',desc:'+0.5 mult permanently per hand played.',type:'scaling',scaleStat:'mult',scaleAmt:0.5,accumulated:0,cost:8},
  {id:'inferno',name:'Inferno',icon:'🌋',rarity:'rare',desc:'×1.5 mult if your score this hand exceeds 250.',type:'on_score',cost:13},
  {id:'momentum',name:'Momentum',icon:'🏎️',rarity:'uncommon',desc:'+2 mult for each consecutive hand that scores 100+. Resets on fail.',type:'on_score',cost:8},
  {id:'crescendo',name:'Crescendo',icon:'📈',rarity:'rare',desc:'Each hand this encounter: +2 mult (stacks).',type:'on_score',cost:14},

  // --- CHIP SCALING ENGINES ---
  {id:'treasure_hunter',name:'Treasure Hunter',icon:'⛏️',rarity:'common',desc:'+3 chips permanently per encounter.',type:'scaling',scaleStat:'chips',scaleAmt:3,accumulated:0,cost:5},
  {id:'golden_goose',name:'Golden Goose',icon:'🪿',rarity:'uncommon',desc:'+1 chip per $1 you have.',type:'on_score',cost:8},
  {id:'heavy_hitter',name:'Heavy Hitter',icon:'🔨',rarity:'uncommon',desc:'+20 chips when scoring 4+ dice.',type:'on_score',cost:7},

  // --- MORE HIGH-RISK / GAMBLING ---
  {id:'all_in',name:'All In',icon:'🎰',rarity:'rare',desc:'×3 mult but -1 hand. Only works with 2 hands or fewer left.',type:'on_score',cost:12},
  {id:'lucky_seven',name:'Lucky Seven',icon:'🍀',rarity:'uncommon',desc:'If dice sum to exactly 7: +50 chips.',type:'on_score',cost:7},
  {id:'gamblers_ruin',name:"Gambler's Ruin",icon:'💀',rarity:'rare',desc:'×2 mult. If you lose the encounter, lose $5.',type:'independent',mult:0,cost:10},
  {id:'double_or_nothing',name:'Double or Nothing',icon:'🎲',rarity:'legendary',desc:'50% chance: ×2 mult. 50% chance: ÷2 mult.',type:'on_score',cost:18},

  // --- ECONOMY ENGINES ---
  {id:'piggy_bank',name:'Piggy Bank',icon:'🐷',rarity:'common',desc:'+$1 per encounter. Sell for accumulated gold.',type:'scaling',scaleStat:'gold',scaleAmt:1,accumulated:0,cost:3},
  {id:'merchant',name:'Merchant',icon:'🏪',rarity:'uncommon',desc:'Shop items cost $1 less (min $1).',type:'economy',cost:6},
  {id:'bounty_hunter',name:'Bounty Hunter',icon:'🎯',rarity:'uncommon',desc:'+$3 for winning on your last hand.',type:'economy',cost:7},

  // --- CROSS-ARCHETYPE & UTILITY ---
  {id:'mirror_match',name:'Mirror Match',icon:'🪞',rarity:'uncommon',desc:'If all 5 dice are the same parity (all odd or all even): +6 mult.',type:'on_score',cost:8},
  {id:'underdog',name:'Underdog',icon:'🐕',rarity:'common',desc:'+4 mult when your score is below 50% of the target.',type:'on_score',cost:4},
  {id:'last_stand',name:'Last Stand',icon:'🛡️',rarity:'rare',desc:'On your final hand: +10 mult, +30 chips.',type:'on_score',cost:13},
  {id:'recycler',name:'Recycler',icon:'♻️',rarity:'common',desc:'+1 mult permanently each time you use all 3 rerolls in a hand.',type:'scaling',scaleStat:'mult',scaleAmt:1,accumulated:0,cost:5},
  {id:'dice_whisperer',name:'Dice Whisperer',icon:'👂',rarity:'uncommon',desc:'+2 mult per unkept die when scoring (reward for scoring with fewer dice).',type:'on_score',cost:7},
  {id:'lucky_clover',name:'Lucky Clover',icon:'☘️',rarity:'common',desc:'20% chance: +15 chips after each hand.',type:'on_score',cost:4},
  {id:'overkill',name:'Overkill',icon:'💥',rarity:'rare',desc:'If you beat the target by 2x or more in a single hand: +$5.',type:'economy',cost:12},
  {id:'minimalist',name:'Minimalist',icon:'✂️',rarity:'uncommon',desc:'+3 mult per empty charm slot.',type:'independent',cost:6},

  // --- REROLL-FOCUSED ARCHETYPE ---
  {id:'chaos_rider',name:'Chaos Rider',icon:'🌪️',rarity:'uncommon',desc:'+5 chips per reroll used this hand.',type:'on_score',cost:7},
  {id:'turbulence',name:'Turbulence',icon:'🌊',rarity:'rare',desc:'If you used all rerolls: ×1.5 mult.',type:'on_score',cost:13},
  {id:'reroll_addict',name:'Reroll Addict',icon:'🎡',rarity:'common',desc:'+1 reroll per encounter.',type:'passive',cost:6},

  // --- DEFENSIVE / SURVIVAL ---
  {id:'second_wind',name:'Second Wind',icon:'💨',rarity:'rare',desc:'Once per encounter: if a hand scores 0, gain +1 hand back.',type:'passive',usedThisEncounter:false,cost:14},
  {id:'iron_will',name:'Iron Will',icon:'⚔️',rarity:'uncommon',desc:'+2 mult per hand already used this encounter.',type:'on_score',cost:8},

  // --- MORE LEGENDARIES ---
  {id:'alchemist',name:'The Alchemist',icon:'⚗️',rarity:'legendary',desc:'Chips and Mult are swapped before multiplying.',type:'on_score',cost:20},
  {id:'golden_ratio',name:'Golden Ratio',icon:'🌀',rarity:'legendary',desc:'If dice show exactly 1-2-3-4-5: ×5 mult.',type:'on_score',cost:18},

  // --- BLESSING-GRANTING CHARMS ---
  {id:'scholar',name:'Scholar',icon:'📖',rarity:'uncommon',desc:'After winning an encounter, level up your most-used category this encounter.',type:'economy',cost:8},
  {id:'ancient_tome',name:'Ancient Tome',icon:'📜',rarity:'rare',desc:'Every 3 encounters won, level up a random category.',type:'scaling',scaleStat:'bless',scaleAmt:0,accumulated:0,cost:13},
  {id:'temple_pilgrim',name:'Temple Pilgrim',icon:'🏛️',rarity:'rare',desc:'On boss kill: level up 2 random categories.',type:'economy',cost:14},

  // --- SINGLE-DIE / FEW-DICE SCORING (STEEL SUPPORT) ---
  {id:'lone_wolf',name:'Lone Wolf',icon:'🐺',rarity:'uncommon',desc:'If scoring exactly 1 die: ×2.5 mult.',type:'on_score',cost:9},
  {id:'sniper',name:'Sniper',icon:'🎯',rarity:'uncommon',desc:'If scoring exactly 1 or 2 dice: +20 chips, +3 mult.',type:'on_score',cost:8},
  {id:'precision',name:'Precision',icon:'🔬',rarity:'rare',desc:'+4 mult per kept (unkept) die not used in scoring. Rewards holding steel dice.',type:'on_score',cost:14},
  {id:'fortress',name:'Fortress',icon:'🏰',rarity:'common',desc:'+1 mult per kept die (whether scored or not).',type:'on_score',cost:5},
  {id:'steel_forge',name:'Steel Forge',icon:'⚒️',rarity:'rare',desc:'Steel dice give +8 mult instead of +4.',type:'passive',cost:15},
];

const ENCHANTMENTS = [
  {id:'rune_of_iron',name:'Rune of Iron',mod:'steel',desc:'Apply Steel to a die slot — permanent for this run. That die always counts as 3.',cost:5},
  {id:'goldweave',name:'Goldweave',mod:'gilded',desc:'Apply Gilded to a die slot — permanent for this run. That die earns +$1 every time it is scored.',cost:6},
  {id:'shadow_ink',name:'Shadow Ink',mod:'void',desc:'Apply Void to a die slot — permanent for this run. That die gives \u00d71.5 mult but 0 chips.',cost:5},
  {id:'chaos_rune',name:'Chaos Rune',mod:'wild',desc:'Apply Wild to a die slot — permanent for this run. That die counts as any value.',cost:7},
  {id:'fates_favor',name:"Fate's Favor",mod:'lucky',desc:'Apply Lucky to a die slot — permanent for this run. That die has a 25% chance to score twice.',cost:5},
  {id:'dark_bargain',name:'Dark Bargain',mod:'cursed',desc:'Apply Cursed to a die slot — permanent for this run. That die gives +8 mult, but rolling a 1 costs you a hand.',cost:4},
  {id:'artisans_touch',name:"Artisan's Touch",mod:'remove',desc:'Remove the modification from a die slot.',cost:3},
  {id:'weight_rune',name:'Weight Rune',mod:'weighted',desc:'Apply Weighted to a die slot — permanent for this run. That die always rolls 4, 5, or 6.',cost:6},
  {id:'mirror_shard',name:'Mirror Shard',mod:'mirrored',desc:'Apply Mirrored to a die slot — permanent for this run. That die\'s face value is also added as mult each time it scores.',cost:6},
];

const BLESSINGS = [
  {id:'embers',name:'Blessing of Embers',category:'ones',cost:3},
  {id:'tides',name:'Blessing of Tides',category:'twos',cost:3},
  {id:'stone',name:'Blessing of Stone',category:'threes',cost:3},
  {id:'wind',name:'Blessing of Wind',category:'fours',cost:3},
  {id:'stars',name:'Blessing of Stars',category:'fives',cost:3},
  {id:'shadow',name:'Blessing of Shadow',category:'sixes',cost:3},
  {id:'harmony',name:'Blessing of Harmony',category:'full_house',cost:4},
  {id:'triplicity',name:'Blessing of Triplicity',category:'three_kind',cost:4},
  {id:'dominion',name:'Blessing of Dominion',category:'four_kind',cost:5},
  {id:'path',name:'Blessing of the Path',category:'small_straight',cost:4},
  {id:'journey',name:'Blessing of the Journey',category:'large_straight',cost:5},
  {id:'perfection',name:'Blessing of Perfection',category:'yahtzee',cost:5},
  {id:'fortune',name:'Blessing of Fortune',category:'chance',cost:3},
];

const SPECIALS = [
  {id:'extra_hand',name:'Extra Hand Scroll',desc:'+1 hand next encounter.',icon:'\u{1F4DC}',cost:3,effect:'extra_hand'},
  {id:'extra_reroll',name:'Extra Reroll Scroll',desc:'+1 dice reroll for your next encounter only. Lets you reroll unkept dice one extra time during combat. Does NOT reroll shop items — use the 🔄 button for that.',icon:'\u{1F3B2}',cost:3,effect:'extra_reroll'},
  {id:'dice_polish',name:'Dice Polish',desc:'One die starts at 6.',icon:'\u2728',cost:4,effect:'dice_polish'},
  {id:'charm_slot',name:'Charm Slot +1',desc:'Permanently +1 charm slot.',icon:'\u{1F48E}',cost:10,effect:'charm_slot'},
];

// ============================================================
// GAME STATE
// ============================================================
let G = null;

function newRun(){
  G = {
    gold:5,trial:0,encounter:0,
    hands:4,maxHands:4,
    rerolls:3,maxRerolls:3,
    dice:[0,0,0,0,0],kept:[false,false,false,false,false],
    mods:[null,null,null,null,null],
    hidden:[false,false,false,false,false],phased:-1,
    charms:[],maxCharmSlots:5,
    enchantments:[],maxEnchSlots:2,
    blessings:[],maxBlessSlots:2,
    catLevels:{},catUsedThisEncounter:[],
    lastScoredCategory:null,
    disabledCategories:[],disabledCharms:[],
    cumulativeScore:0,targetScore:300,
    phase:'title',hasRolled:false,rerollCount:0,
    firstRerollDone:false,handsUsed:0,
    turnBonusChips:0,turnBonusMult:0,
    extraHandNext:0,extraRerollNext:0,dicePolishNext:false,
    currentEnemy:null,bossDebuffNum:-1,bossDevoured:[],bossBannedNums:[],
    flameKeeperBonus:0,animating:false,shopRerollCost:3,
    seed:Math.floor(Math.random()*1000000),
  };
  CATEGORIES.forEach(c=>G.catLevels[c.id]=0);
  showTitleScreen();
}

// ============================================================
// UTILITY
// ============================================================
function rng(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=rng(0,i);[b[i],b[j]]=[b[j],b[i]]}return b}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}
function fmt(n){return n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n)}

function getEnemy(){
  // Use cached enemy to avoid re-shuffling mid-encounter
  if(G.currentEnemy)return G.currentEnemy;
  const t=TRIALS[G.trial];
  if(G.encounter<3)return t.enemies[G.encounter];
  return t.boss;
}
function cacheEnemy(){
  const t=TRIALS[G.trial];
  if(G.encounter<3)G.currentEnemy=t.enemies[G.encounter];
  else G.currentEnemy=t.boss;
}
function getTargetScore(){
  const t=TRIALS[G.trial];
  if(G.encounter<3)return Math.floor(t.base*(1+G.encounter/2*1.5));
  return t.bossTarget;
}
function isBoss(){return G.encounter>=3}
function getCatDef(id){return CATEGORIES.find(c=>c.id===id)}
function getCatChips(id){const c=getCatDef(id);return c.baseChips+(G.catLevels[id]||0)*c.chipPer}
function getCatMult(id){const c=getCatDef(id);return c.baseMult+(G.catLevels[id]||0)*c.multPer}

// ============================================================
// DICE
// ============================================================
function rollDie(i){
  const mod=G.mods[i];const enemy=getEnemy();
  let v=mod==='weighted'?rng(4,6):rng(1,6);
  if(enemy.effect==='crystal_lurker'&&v===6)v=rng(1,5);
  return v;
}
function rollAllDice(){
  for(let i=0;i<5;i++)if(!G.kept[i])G.dice[i]=rollDie(i);
  handlePostRoll();
}
function handlePostRoll(){
  const e=getEnemy();
  if(e.effect==='molten_sentinel')for(let i=0;i<5;i++)if(G.dice[i]===6)G.kept[i]=false;
  if(e.effect==='void_flickerer'&&G.phased>=0){G.dice[G.phased]=rollDie(G.phased);G.kept[G.phased]=false}
  if(e.effect==='blind_burrower'){G.hidden=[false,false,false,false,false];shuffle([0,1,2,3,4]).slice(0,2).forEach(i=>G.hidden[i]=true)}
  if(e.effect==='spore_crawler'&&G.rerollCount===1){const k=[];for(let i=0;i<5;i++)if(G.kept[i])k.push(i);if(k.length>0){const p=k[rng(0,k.length-1)];G.dice[p]=rollDie(p)}}
  if(e.effect==='gale_phantom'&&G.rerollCount>0){const ki=[],fi=[];for(let i=0;i<5;i++){if(G.kept[i])ki.push(i);else fi.push(i)}if(ki.length>0&&fi.length>0){const a=ki[rng(0,ki.length-1)],b=fi[rng(0,fi.length-1)];[G.dice[a],G.dice[b]]=[G.dice[b],G.dice[a]];G.kept[a]=false;G.kept[b]=true}}
  if(e.effect==='fate_spinner')for(let i=0;i<5;i++)if(G.kept[i]&&Math.random()<0.25){G.dice[i]=rollDie(i);G.kept[i]=false}
  G.charms.forEach((ch,ci)=>{if(G.disabledCharms.includes(ch.id))return;if(ch.id==='snake_eyes'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);if(Object.values(cc).some(v=>v>=2))G.turnBonusChips+=20}});
  // Loaded Dice: one random unkept die copies most common face
  G.charms.forEach((ch,ci)=>{if(G.disabledCharms.includes(ch.id))return;if(ch.id==='loaded_dice'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);let best=G.dice[0],bestC=0;for(const[v,c]of Object.entries(cc)){if(c>bestC){bestC=c;best=Number(v)}}const unkept=[];for(let i=0;i<5;i++)if(!G.kept[i])unkept.push(i);if(unkept.length>0){const t=unkept[rng(0,unkept.length-1)];G.dice[t]=best}}});
}
function getDieValue(i){
  let v=G.dice[i];
  if(G.charms.some(ch=>ch.id==='the_first_die'&&!G.disabledCharms.includes(ch.id)))v+=1;
  return v;
}
function getDieChipValue(i){
  let v=getDieValue(i);const e=getEnemy();
  if(e.effect==='ember_golem'&&G.dice[i]===1)v=0;
  if(e.effect==='storm_elemental'&&G.dice[i]%2===0)v=Math.floor(v/2);
  if(e.effect==='rift_weaver'){const m={1:6,2:5,3:4,4:3,5:2,6:1};v=m[G.dice[i]]||v;if(G.charms.some(ch=>ch.id==='the_first_die'))v+=1}
  if(e.effect==='pyraxxus'&&G.dice[i]===G.bossDebuffNum)v=0;
  if(e.effect==='nihilex'&&G.bossBannedNums.includes(G.dice[i]))v=0;
  if(e.effect==='aeonax'&&G.bossBannedNums.includes(G.dice[i]))v=0;
  if(G.mods[i]==='void')v=0;
  return v;
}

// ============================================================
// SCORING CATEGORIES
// ============================================================
function detectCategories(dice){
  const vals=dice.map((_,i)=>G.dice[i]);
  const wildIndices=[];for(let i=0;i<5;i++)if(G.mods[i]==='wild')wildIndices.push(i);
  const nonWildVals=vals.filter((_,i)=>!wildIndices.includes(i));
  const results=[];const e=getEnemy();const banned=[];
  if(e.effect==='nihilex')banned.push(...G.bossBannedNums);
  if(e.effect==='aeonax')banned.push(...G.bossBannedNums);
  if(e.effect==='pyraxxus')banned.push(G.bossDebuffNum);
  // Count non-wild dice, then add wilds to best combo
  const cc={};nonWildVals.forEach(v=>{if(!banned.includes(v))cc[v]=(cc[v]||0)+1});
  const wc=wildIndices.length;
  // For number categories, wild dice count toward each number
  for(let n=1;n<=6;n++){const id=['ones','twos','threes','fours','fives','sixes'][n-1];const ct=(cc[n]||0)+wc;if(ct>0&&!banned.includes(n))results.push({id,scoredDice:dice.map((_,i)=>vals[i]===n||wildIndices.includes(i))})}
  // For matching categories, add wilds to the most common value
  const mcBase=Math.max(...Object.values(cc),0);const mc=mcBase+wc;
  if(mc>=3)results.push({id:'three_kind',scoredDice:dice.map(()=>true)});
  if(mc>=4)results.push({id:'four_kind',scoredDice:dice.map(()=>true)});
  if(mc>=5)results.push({id:'yahtzee',scoredDice:dice.map(()=>true)});
  // Full house: check if wilds can fill gaps (e.g. 2+wild=3, or 1+2wilds=3)
  const cv=Object.values(cc).sort((a,b)=>b-a);
  let isFH=false;
  if(cv.length>=2){let need3=Math.max(0,3-cv[0]),need2=Math.max(0,2-cv[1]);isFH=(need3+need2)<=wc}
  else if(cv.length===1){isFH=cv[0]+wc>=5&&wc>=2} // one real value + wilds make 3+2
  else{isFH=wc>=5}
  if(isFH)results.push({id:'full_house',scoredDice:dice.map(()=>true)});
  // Straights: add wilds as gap-fillers
  const uniqueNonWild=[...new Set(nonWildVals.filter(v=>!banned.includes(v)))].sort((a,b)=>a-b);
  function hasConsWithWild(sorted,need){
    for(let start=1;start<=7-need;start++){
      let gaps=0;for(let j=0;j<need;j++){if(!sorted.includes(start+j))gaps++}
      if(gaps<=wc)return true;
    }return false;
  }
  if(hasConsWithWild(uniqueNonWild,4))results.push({id:'small_straight',scoredDice:dice.map(()=>true)});
  if(hasConsWithWild(uniqueNonWild,5))results.push({id:'large_straight',scoredDice:dice.map(()=>true)});
  results.push({id:'chance',scoredDice:dice.map(()=>true)});
  return results.filter(r=>!G.disabledCategories.includes(r.id));
}

function scoreHand(categoryId){
  const cat=getCatDef(categoryId);const detected=detectCategories(G.dice);
  const match=detected.find(d=>d.id===categoryId);
  if(!match)return{chips:0,mult:0,total:0,log:['Invalid category!']};
  const sd=match.scoredDice;const log=[];
  let chips=getCatChips(categoryId),mult=getCatMult(categoryId);
  log.push(`${cat.name} (Lv${G.catLevels[categoryId]||0}): +${chips} chips, \u00d7${mult} mult`);
  let dc=0;const si=[];
  for(let i=0;i<5;i++){if(sd[i]){si.push(i);const cv=getDieChipValue(i);dc+=cv;if(cv>0)log.push(`Die ${i+1} (${G.dice[i]}): +${cv} chips`)}}
  chips+=dc;
  const enemy=getEnemy();const noCharms=enemy.effect==='ash_wraith'&&G.rerollCount<=1;const nullP=enemy.effect==='null_prophet';
  G.charms.forEach((ch,ci)=>{
    if(G.disabledCharms.includes(ch.id))return;
    if(ch.type==='independent'){if(ch.id==='minimalist'){const empty=G.maxCharmSlots-G.charms.length;if(empty>0){mult+=empty*3;log.push(`Minimalist: +${empty*3} mult (${empty} empty slots)`)}}else{if(ch.chips)chips+=ch.chips;if(ch.mult){let m=ch.mult;if(nullP)m=Math.floor(m/2);mult+=m}if(ch.chips||ch.mult)log.push(`${ch.name}: +${ch.chips||0} chips, +${ch.mult||0} mult`)}}
    if(ch.type==='on_category'&&ch.category===categoryId&&!noCharms){chips+=ch.chips||0;if(ch.catMult)mult+=ch.catMult;log.push(`${ch.name}: +${ch.chips||0} chips${ch.catMult?', +'+ch.catMult+' mult':''}`)}
    if(ch.type==='on_score'){
      if(ch.id==='warm_ember')si.forEach(i=>{if(G.dice[i]===1){chips+=5;log.push('Warm Ember: +5 chips (die 1)')}});
      if(ch.id==='tallow_candle'&&si.length===2){chips+=15;log.push('Tallow Candle: +15 chips')}
      if(ch.id==='obsidian_shard')si.forEach(i=>{if(G.dice[i]===6){mult=Math.ceil(mult*1.5);log.push('Obsidian Shard: \u00d71.5 mult')}});
      if(ch.id==='stone_mask'&&new Set(G.dice).size===5){mult+=6;log.push('Stone Mask: +6 mult')}
      if(ch.id==='echoing_die'){let mx=0,mi=-1;si.forEach(i=>{const v=getDieChipValue(i);if(v>mx){mx=v;mi=i}});if(mi>=0){chips+=mx;log.push(`Echoing Die: +${mx} chips`)}}
      if(ch.id==='paradox_engine'&&Math.random()<0.12){mult=mult*mult;log.push(`Paradox Engine: mult SQUARED! \u00d7${mult}`)}
      // New synergy charms
      if(ch.id==='double_down'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);if(Object.values(cc).some(v=>v>=2)){mult+=4;log.push('Double Down: +4 mult (pair+)')}}
      if(ch.id==='triple_threat'&&['three_kind','four_kind','full_house','yahtzee'].includes(categoryId)){let mx=0;si.forEach(i=>{const v=getDieChipValue(i);if(v>mx)mx=v});if(mx>0){chips+=mx;log.push(`Triple Threat: +${mx} chips (retrigger)`)}}
      if(ch.id==='road_runner'&&['small_straight','large_straight'].includes(categoryId)){mult+=3;log.push('Road Runner: +3 mult (straight)')}
      if(ch.id==='even_steven'){let em=0;si.forEach(i=>{if(G.dice[i]%2===0)em++});if(em>0){mult+=em*3;log.push(`Even Steven: +${em*3} mult (${em} even)`)}}
      if(ch.id==='odd_todd'){let om=0;si.forEach(i=>{if(G.dice[i]%2===1)om++});if(om>0){mult+=om*3;log.push(`Odd Todd: +${om*3} mult (${om} odd)`)}}
      if(ch.id==='glass_cannon'){if((ch.uses||0)>0){mult*=2;ch.uses--;log.push(`Glass Cannon: \u00d72 mult (${ch.uses} left)`);if(ch.uses<=0){const idx=G.charms.indexOf(ch);if(idx>=0){G.charms.splice(idx,1);log.push('Glass Cannon: SHATTERED!')}}}}
      if(ch.id==='daredevil'&&G.hands<=1){mult*=2;log.push('Daredevil: \u00d72 mult (last hand!)')}
      if(ch.id==='echo_chamber'){let ec=0;si.forEach(i=>{ec+=getDieChipValue(i)});if(ec>0){chips+=ec;log.push(`Echo Chamber: +${ec} chips (retrigger all)`)}}
      // Number-specialist charms
      const numCharms={ace_devotion:1,twin_fangs:2,trinity:3,quad_core:4,high_five:5,sixth_sense:6};
      if(numCharms[ch.id]!==undefined){const n=numCharms[ch.id];let ct=0;si.forEach(i=>{if(G.dice[i]===n)ct++});if(ct>0){chips+=ct*8;mult+=ct*2;log.push(`${ch.name}: +${ct*8} chips, +${ct*2} mult (${ct}×${n})`)}}
      if(ch.id==='devotee'){const sv=si.map(i=>G.dice[i]);if(sv.length>0&&sv.every(v=>v===sv[0])){mult=Math.ceil(mult*2.5);log.push('Devotee: ×2.5 mult (all same!)')}}
      if(ch.id==='number_crunch'){const cc={};si.forEach(i=>cc[G.dice[i]]=(cc[G.dice[i]]||0)+1);const mx=Math.max(...Object.values(cc),0);if(mx>1){const b=(mx-1)*2;mult+=b;log.push(`Number Cruncher: +${b} mult (${mx} matching)`)}}
      // More matching/yahtzee
      if(ch.id==='pair_bond'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);let pairs=0;Object.values(cc).forEach(v=>{if(v>=2)pairs+=Math.floor(v/2)});if(pairs>0){chips+=pairs*12;log.push(`Pair Bond: +${pairs*12} chips (${pairs} pair${pairs>1?'s':''})`)}}
      if(ch.id==='mob_mentality'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);const mx=Math.max(...Object.values(cc),0);if(mx>=2){mult+=mx*3;log.push(`Mob Mentality: +${mx*3} mult (${mx} of a kind)`)}}
      if(ch.id==='perfectionist'&&categoryId==='yahtzee'){mult*=3;log.push('Perfectionist: ×3 mult (Dicero!)')}
      if(ch.id==='domino_effect'&&categoryId==='four_kind'){const cc={};G.dice.forEach(d=>cc[d]=(cc[d]||0)+1);let ec=0;for(const[v,c]of Object.entries(cc)){if(c>=4)ec+=Number(v)*4}if(ec>0){chips+=ec;log.push(`Domino Effect: +${ec} chips (retrigger 4)`)}}
      // Straight support
      if(ch.id==='compass'&&['small_straight','large_straight'].includes(categoryId)){chips+=20;log.push('Compass: +20 chips (straight)')}
      if(ch.id==='shortcut'&&categoryId==='small_straight'){mult=Math.ceil(mult*1.5);log.push('Shortcut: ×1.5 mult (small straight)')}
      // Full House support
      if(ch.id==='balanced_diet'&&categoryId==='full_house'){mult+=2;log.push('Balanced Diet: +2 mult (Full House)')}
      if(ch.id==='family_portrait'&&categoryId==='full_house'){let ec=0;for(let i=0;i<5;i++)ec+=getDieChipValue(i);if(ec>0){chips+=ec;log.push(`Family Portrait: +${ec} chips (retrigger all 5)`)}}
      // Mult scaling engines
      if(ch.id==='inferno'){/* checked after total calc */}
      if(ch.id==='momentum'){const streak=ch._streak||0;if(streak>0){mult+=streak*2;log.push(`Momentum: +${streak*2} mult (${streak} streak)`)}}
      if(ch.id==='crescendo'){const hd=G.handsUsed||0;if(hd>0){mult+=hd*2;log.push(`Crescendo: +${hd*2} mult (hand ${hd+1})`)}}
      // Chip engines
      if(ch.id==='golden_goose'){const b=G.gold;if(b>0){chips+=b;log.push(`Golden Goose: +${b} chips ($${b})`)}}
      if(ch.id==='heavy_hitter'&&si.length>=4){chips+=20;log.push('Heavy Hitter: +20 chips (4+ dice)')}
      // High-risk
      if(ch.id==='all_in'&&G.hands<=2){mult*=3;log.push('All In: ×3 mult!')}
      if(ch.id==='lucky_seven'){const s=G.dice.reduce((a,b)=>a+b,0);if(s===7){chips+=50;log.push('Lucky Seven: +50 chips (sum=7)')}}
      if(ch.id==='double_or_nothing'){if(Math.random()<0.5){mult*=2;log.push('Double or Nothing: ×2 mult!')}else{mult=Math.max(1,Math.floor(mult/2));log.push('Double or Nothing: ÷2 mult...')}}
      // New utility/cross-archetype charms
      if(ch.id==='mirror_match'){const parities=si.map(i=>G.dice[i]%2);if(si.length===5&&parities.every(p=>p===parities[0])){mult+=6;log.push(`Mirror Match: +6 mult (all ${parities[0]===0?'even':'odd'})`)}}
      if(ch.id==='underdog'&&G.cumulativeScore<G.targetScore*0.5){mult+=4;log.push('Underdog: +4 mult (below 50%)')}
      if(ch.id==='last_stand'&&G.hands<=1){chips+=30;mult+=10;log.push('Last Stand: +30 chips, +10 mult (final hand!)')}
      if(ch.id==='dice_whisperer'){const unkept=5-si.length;if(unkept>0){mult+=unkept*2;log.push(`Dice Whisperer: +${unkept*2} mult (${unkept} unkept)`)}}
      if(ch.id==='lucky_clover'&&Math.random()<0.2){chips+=15;log.push('Lucky Clover: +15 chips (lucky!)')}
      if(ch.id==='chaos_rider'&&G.rerollCount>0){chips+=G.rerollCount*5;log.push(`Chaos Rider: +${G.rerollCount*5} chips (${G.rerollCount} rerolls)`)}
      if(ch.id==='turbulence'&&G.rerollCount>=G.maxRerolls){mult=Math.ceil(mult*1.5);log.push('Turbulence: ×1.5 mult (all rerolls used)')}
      if(ch.id==='iron_will'&&G.handsUsed>0){mult+=G.handsUsed*2;log.push(`Iron Will: +${G.handsUsed*2} mult (${G.handsUsed} hands used)`)}
      if(ch.id==='alchemist'){const tmp=chips;chips=mult;mult=tmp;log.push(`The Alchemist: swapped! ${chips} chips × ${mult} mult`)}
      if(ch.id==='golden_ratio'){const sorted=[...G.dice].sort();if(sorted.join('')==='12345'){mult*=5;log.push('Golden Ratio: ×5 mult (1-2-3-4-5!)')}}
      // Single-die / few-dice scoring (steel support)
      if(ch.id==='lone_wolf'&&si.length===1){mult=Math.ceil(mult*2.5);log.push('Lone Wolf: ×2.5 mult (1 die!)')}
      if(ch.id==='sniper'&&si.length<=2){chips+=20;mult+=3;log.push(`Sniper: +20 chips, +3 mult (${si.length} dice)`)}
      if(ch.id==='precision'){let heldNotScored=0;for(let i=0;i<5;i++)if(G.kept[i]&&!sd[i])heldNotScored++;if(heldNotScored>0){mult+=heldNotScored*4;log.push(`Precision: +${heldNotScored*4} mult (${heldNotScored} held unscored)`)}}
      if(ch.id==='fortress'){const keptCount=G.kept.filter(k=>k).length;if(keptCount>0){mult+=keptCount;log.push(`Fortress: +${keptCount} mult (${keptCount} kept)`)}}
    }
    if(ch.type==='on_reroll'&&ch.id==='gamblers_grin'&&G.rerollCount>0){mult+=G.rerollCount;log.push(`Gambler's Grin: +${G.rerollCount} mult`)}
    if(ch.type==='scaling'){
      if(ch.id==='fortunes_wheel'&&ch.accumulated){chips+=ch.accumulated;log.push(`Fortune's Wheel: +${ch.accumulated} chips`)}
      if(ch.id==='bone_abacus'&&ch.accumulated){mult+=ch.accumulated;log.push(`Bone Abacus: +${ch.accumulated} mult`)}
      if(ch.id==='ouroboros'&&ch.accumulated){const oc=ch.accumulated*5,om=ch.accumulated;chips+=oc;mult+=om;log.push(`Ouroboros: +${oc} chips, +${om} mult`)}
      if(ch.id==='war_drum'&&ch.accumulated){mult+=ch.accumulated;log.push(`War Drum: +${ch.accumulated} mult`)}
      if(ch.id==='midas_touch'&&ch.accumulated){chips+=ch.accumulated;log.push(`Midas Touch: +${ch.accumulated} chips`)}
      if(ch.id==='rage_crystal'&&ch.accumulated){const rm=Math.floor(ch.accumulated);if(rm>0){mult+=rm;log.push(`Rage Crystal: +${rm} mult`)}}
      if(ch.id==='treasure_hunter'&&ch.accumulated){chips+=ch.accumulated;log.push(`Treasure Hunter: +${ch.accumulated} chips`)}
      if(ch.id==='herd_instinct'&&ch.accumulated){mult+=ch.accumulated;log.push(`Herd Instinct: +${ch.accumulated} mult`)}
      if(ch.id==='wanderlust'&&ch.accumulated){mult+=ch.accumulated;log.push(`Wanderlust: +${ch.accumulated} mult`)}
      if(ch.id==='recycler'&&ch.accumulated){mult+=ch.accumulated;log.push(`Recycler: +${ch.accumulated} mult`)}
    }
    if(ch.id==='golden_bones'&&G.gold>=20){mult=Math.ceil(mult*1.5);log.push(`Golden Bones: \u00d71.5 mult`)}
    if(ch.id==='gamblers_ruin'){mult*=2;log.push("Gambler's Ruin: \u00d72 mult")}
    if(ch.id==='eternitys_gambit'&&ch.chosenCategory===categoryId){mult*=3;log.push("Eternity's Gambit: \u00d73 mult!")}
  });
  G.charms.forEach((ch,ci)=>{if(G.disabledCharms.includes(ch.id))return;if(ch.id==='steady_hand'&&G.firstRerollDone){const k=G.kept.filter(x=>x).length;if(k>0){mult+=k;log.push(`Steady Hand: +${k} mult`)}}});
  // Blueprint: copy first charm slot's independent bonuses
  const bpCharm=G.charms.find((ch,ci)=>ch.id==='blueprint'&&!G.disabledCharms.includes(ch.id));
  if(bpCharm&&G.charms.length>0&&G.charms[0].id!=='blueprint'){
    const src=G.charms[0];
    if(src.type==='independent'){if(src.chips)chips+=src.chips;if(src.mult)mult+=src.mult;log.push(`Blueprint (${src.name}): +${src.chips||0} chips, +${src.mult||0} mult`)}
    if(src.type==='scaling'&&src.accumulated){if(src.scaleStat==='chips'||src.scaleStat==='both')chips+=src.accumulated*(src.scaleStat==='both'?5:1);if(src.scaleStat==='mult'||src.scaleStat==='both')mult+=src.accumulated;log.push(`Blueprint (${src.name}): copied scaling`)}
  }
  for(let i=0;i<5;i++){const m=G.mods[i];if(!m)continue;
    if(m==='gilded'&&sd[i]){chips+=10;log.push(`Die ${i+1} Gilded: +10 chips`)}
    if(m==='void'&&sd[i]){mult=Math.ceil(mult*1.5);log.push(`Die ${i+1} Void: \u00d71.5 mult`)}
    if(m==='steel'&&G.kept[i]&&!sd[i]){const steelAmt=G.charms.some(ch=>ch.id==='steel_forge')?8:4;mult+=steelAmt;log.push(`Die ${i+1} Steel: +${steelAmt} mult`)}
    if(m==='cursed'&&sd[i]){mult+=8;log.push(`Die ${i+1} Cursed: +8 mult`)}
    if(m==='mirrored'&&sd[i]){const dv=getDieValue(i);mult+=dv;log.push(`Die ${i+1} Mirrored: +${dv} mult`)}
    if(m==='lucky'&&sd[i]&&Math.random()<0.25){const rt=getDieChipValue(i);chips+=rt;log.push(`Die ${i+1} Lucky: +${rt} chips`)}
  }
  if(enemy.effect==='constellation_beast'&&!['yahtzee','large_straight','chance'].includes(categoryId)){mult=Math.floor(mult/2);log.push('Constellation Beast: half mult')}
  if(enemy.effect==='voltaryx'&&G.lastScoredCategory===categoryId)return{chips:0,mult:0,total:0,log:['Voltaryx: Cannot repeat category!']};
  if(enemy.effect==='skyborne_sentinel'&&si.length<3)return{chips:0,mult:0,total:0,log:['Skyborne Sentinel: Need 3+ dice!']};
  chips+=G.turnBonusChips;mult+=G.turnBonusMult;
  // Inferno: apply ×1.5 mult if pre-total exceeds threshold
  G.charms.forEach(ch=>{if(ch.id==='inferno'){const pre=Math.floor(chips*mult);if(pre>=250){mult=Math.ceil(mult*1.5);log.push(`Inferno: ×1.5 mult (score ${pre} ≥ 250)`)}}});
  let total=Math.floor(chips*mult);
  if(enemy.effect==='glass_stalker'&&['ones','twos','threes','fours','fives','sixes','three_kind','chance'].includes(categoryId)){const p=Math.floor(total*0.1);total-=p;log.push(`Glass Stalker: -${p}`)}
  if(enemy.effect==='astral_arbiter'&&total<10000){log.push('Astral Arbiter: Below 10K = 0!');total=0}
  if(total<0)total=0;
  return{chips,mult,total,log,scoredIndices:si};
}

// ============================================================
// RENDERING
// ============================================================
function renderActiveEffects(){
  const container=document.getElementById('active-effects');
  if(!container)return;
  container.innerHTML='';
  if(G.phase!=='rolling')return;
  const e=getEnemy();

  // Enemy effect (always show if not 'none')
  if(e.effect!=='none'){
    const tag=document.createElement('div');
    tag.className=`effect-tag ${isBoss()?'boss':'enemy'}`;
    tag.innerHTML=`<span class="effect-icon">${isBoss()?'💀':'👁️'}</span><span>${e.name}: ${e.desc}</span>`;
    container.appendChild(tag);
  }

  // Boss-specific debuffs
  if(e.effect==='pyraxxus'&&G.bossDebuffNum>0){
    const tag=document.createElement('div');
    tag.className='effect-tag debuff';
    tag.innerHTML=`<span class="effect-icon">🚫</span><span>${G.bossDebuffNum}s give 0 chips</span>`;
    container.appendChild(tag);
  }
  if(e.effect==='nihilex'&&G.bossBannedNums.length>0){
    const tag=document.createElement('div');
    tag.className='effect-tag debuff';
    tag.innerHTML=`<span class="effect-icon">🚫</span><span>Banned: ${G.bossBannedNums.join(', ')}</span>`;
    container.appendChild(tag);
  }
  if(e.effect==='aeonax'&&G.bossBannedNums.length>0){
    const tag=document.createElement('div');
    tag.className='effect-tag debuff';
    tag.innerHTML=`<span class="effect-icon">🚫</span><span>Banned: ${G.bossBannedNums.join(', ')}</span>`;
    container.appendChild(tag);
  }
  if(e.effect==='void_flickerer'&&G.phased>=0){
    const tag=document.createElement('div');
    tag.className='effect-tag debuff';
    tag.innerHTML=`<span class="effect-icon">👻</span><span>Die ${G.phased+1} is phased</span>`;
    container.appendChild(tag);
  }
  if(e.effect==='shardcaster'&&G.disabledCharms.length>0){
    const disabled=G.charms.find(ch=>G.disabledCharms.includes(ch.id));
    if(disabled){
      const tag=document.createElement('div');
      tag.className='effect-tag debuff';
      tag.innerHTML=`<span class="effect-icon">🔇</span><span>${disabled.name} disabled</span>`;
      container.appendChild(tag);
    }
  }
  if(e.effect==='voltaryx'&&G.lastScoredCategory){
    const cat=getCatDef(G.lastScoredCategory);
    if(cat){
      const tag=document.createElement('div');
      tag.className='effect-tag debuff';
      tag.innerHTML=`<span class="effect-icon">⛔</span><span>Can't repeat: ${cat.name}</span>`;
      container.appendChild(tag);
    }
  }

  // Disabled categories
  G.disabledCategories.forEach(catId=>{
    const cat=getCatDef(catId);
    if(cat){
      const tag=document.createElement('div');
      tag.className='effect-tag debuff';
      tag.innerHTML=`<span class="effect-icon">❌</span><span>${cat.name} disabled</span>`;
      container.appendChild(tag);
    }
  });

  // Die modifications
  const modNames={weighted:'Weighted',lucky:'Lucky',steel:'Steel',gilded:'Gilded',void:'Void',wild:'Wild',cursed:'Cursed',mirrored:'Mirrored'};
  const modIcons={weighted:'⚖️',lucky:'🍀',steel:'⚔️',gilded:'✨',void:'🕳️',wild:'🌈',cursed:'💀',mirrored:'🪞'};
  for(let i=0;i<5;i++){
    if(G.mods[i]){
      const tag=document.createElement('div');
      tag.className='effect-tag mod';
      tag.innerHTML=`<span class="effect-icon">${modIcons[G.mods[i]]||'🎲'}</span><span>Die ${i+1}: ${modNames[G.mods[i]]||G.mods[i]}</span>`;
      container.appendChild(tag);
    }
  }

  // Active scaling charm effects
  G.charms.forEach(ch=>{
    if(G.disabledCharms.includes(ch.id))return;
    if(ch.accumulated&&ch.accumulated>0){
      const tag=document.createElement('div');
      tag.className='effect-tag charm';
      tag.innerHTML=`<span class="effect-icon">${ch.icon||'✨'}</span><span>${ch.name}: +${ch.accumulated} ${ch.scaleStat||'bonus'}</span>`;
      container.appendChild(tag);
    }
    // Show important passive effects
    if(ch.id==='blood_pact'){
      const tag=document.createElement('div');
      tag.className='effect-tag charm';
      tag.innerHTML=`<span class="effect-icon">🩸</span><span>Blood Pact: +5 mult, -1 hand</span>`;
      container.appendChild(tag);
    }
    if(ch.id==='reroll_addict'){
      const tag=document.createElement('div');
      tag.className='effect-tag buff';
      tag.innerHTML=`<span class="effect-icon">🎡</span><span>+1 reroll/encounter</span>`;
      container.appendChild(tag);
    }
    if(ch.id==='chrono_die'){
      const tag=document.createElement('div');
      tag.className='effect-tag buff';
      tag.innerHTML=`<span class="effect-icon">⏳</span><span>+1 reroll/encounter</span>`;
      container.appendChild(tag);
    }
    if(ch.id==='the_first_die'){
      const tag=document.createElement('div');
      tag.className='effect-tag buff';
      tag.innerHTML=`<span class="effect-icon">💠</span><span>All dice +1</span>`;
      container.appendChild(tag);
    }
  });

  // Extra hand/reroll from scrolls
  if(G.extraHandNext>0){
    const tag=document.createElement('div');
    tag.className='effect-tag buff';
    tag.innerHTML=`<span class="effect-icon">📜</span><span>+${G.extraHandNext} hand this encounter</span>`;
    container.appendChild(tag);
  }
  if(G.extraRerollNext>0){
    const tag=document.createElement('div');
    tag.className='effect-tag buff';
    tag.innerHTML=`<span class="effect-icon">🎲</span><span>+${G.extraRerollNext} reroll this encounter</span>`;
    container.appendChild(tag);
  }
}

function render(){renderActiveEffects();renderDice();renderCharms();renderCategories();renderHUD();renderActions();renderConsumables()}

let _justRolled=[false,false,false,false,false];
function renderDice(){
  const area=document.getElementById('dice-area');area.innerHTML='';
  const modColors={weighted:'#d4a520',lucky:'#40e060',steel:'#90a8c0',gilded:'#ffd700',void:'#a050e0',wild:'#ff60ff',cursed:'#e03030',mirrored:'#50c0e8'};
  // Face value assignments: front=1, back=6, right=3, left=4, top=2, bottom=5
  const faceMap=[
    {cls:'face-front',val:1},
    {cls:'face-back', val:6},
    {cls:'face-right',val:3},
    {cls:'face-left', val:4},
    {cls:'face-top',  val:2},
    {cls:'face-bottom',val:5},
  ];
  // Build set of die values targeted by active charms
  const charmTargets=new Set();
  const numMap={ace_devotion:1,twin_fangs:2,trinity:3,quad_core:4,high_five:5,sixth_sense:6,warm_ember:1,obsidian_shard:6};
  G.charms.forEach(ch=>{if(!G.disabledCharms.includes(ch.id)&&numMap[ch.id]!==undefined)charmTargets.add(numMap[ch.id])});

  for(let i=0;i<5;i++){
    const div=document.createElement('div');
    let cls='die';
    if(!G.hasRolled)cls+=' unrolled';
    if(G.kept[i])cls+=' kept';
    if(G.mods[i])cls+=` mod-${G.mods[i]}`;
    if(G.hidden[i])cls+=' die-hidden';
    div.className=cls;
    const displayVal=G.dice[i]||1;
    const dotVal=Math.min(getDieValue(i)||displayVal,7);
    if(G.hasRolled&&charmTargets.has(G.dice[i]))div.classList.add('charm-boosted');

    // Build 3D cube
    const scene=document.createElement('div');
    scene.className='die-3d-scene';
    const cube=document.createElement('div');
    cube.className='die-cube';
    cube.style.transform=CUBE_ROTATIONS[dotVal]||CUBE_ROTATIONS[1];

    faceMap.forEach(f=>{
      const face=document.createElement('div');
      face.className=`die-face ${f.cls}`;
      // Front face shows actual value (including 7); other faces show their fixed value
      const faceVal=(f.cls==='face-front')?dotVal:f.val;
      face.innerHTML=createDieDots(faceVal);
      cube.appendChild(face);
    });

    scene.appendChild(cube);
    div.appendChild(scene);

    if(G.mods[i]){
      const label=document.createElement('span');
      label.className='die-mod-label';
      label.style.color=modColors[G.mods[i]]||'#a090c0';
      label.textContent=G.mods[i];
      div.appendChild(label);
    }
    if(_justRolled[i])div.classList.add('roll-settle');
    div.addEventListener('click',()=>toggleKeep(i));
    area.appendChild(div);
  }
  _justRolled=[false,false,false,false,false];
}

let _dragCharmIdx=null;
function renderCharms(){
  const c=document.getElementById('charm-slots');c.innerHTML='';
  for(let i=0;i<G.maxCharmSlots;i++){
    if(i<G.charms.length){
      const ch=G.charms[i];const dis=G.disabledCharms.includes(ch.id);
      const d=document.createElement('div');d.className='charm-slot';
      d.style.opacity=dis?'0.3':'1';
      d.draggable=true;d.dataset.idx=i;
      d.innerHTML=`<div class="charm-header"><span class="charm-icon">${ch.icon||'?'}</span><div><div class="charm-name">${ch.name}</div><span class="charm-rarity rarity-${ch.rarity}">${ch.rarity}</span></div></div><div class="charm-desc">${ch.desc}</div>`;
      d.addEventListener('dragstart',e=>{_dragCharmIdx=i;d.classList.add('dragging');e.dataTransfer.effectAllowed='move'});
      d.addEventListener('dragend',()=>{_dragCharmIdx=null;d.classList.remove('dragging');document.querySelectorAll('.charm-slot,.empty-charm').forEach(el=>el.classList.remove('drag-over'))});
      d.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';d.classList.add('drag-over')});
      d.addEventListener('dragleave',()=>d.classList.remove('drag-over'));
      d.addEventListener('drop',e=>{e.preventDefault();d.classList.remove('drag-over');if(_dragCharmIdx!==null&&_dragCharmIdx!==i){const moved=G.charms.splice(_dragCharmIdx,1)[0];G.charms.splice(i>_dragCharmIdx?i-1:i,0,moved);_dragCharmIdx=null;render()}});
      c.appendChild(d);
    } else {
      const d=document.createElement('div');d.className='empty-charm';d.textContent='Empty';
      d.addEventListener('dragover',e=>{e.preventDefault();d.classList.add('drag-over')});
      d.addEventListener('dragleave',()=>d.classList.remove('drag-over'));
      d.addEventListener('drop',e=>{e.preventDefault();d.classList.remove('drag-over');if(_dragCharmIdx!==null){const moved=G.charms.splice(_dragCharmIdx,1)[0];G.charms.push(moved);_dragCharmIdx=null;render()}});
      c.appendChild(d);
    }
  }
}

function renderCategories(){
  const list=document.getElementById('cat-list');list.innerHTML='';
  const avail=G.hasRolled?detectCategories(G.dice):[];const aids=avail.map(a=>a.id);

  // Calculate scores for all valid categories and find best
  let scored=[];
  if(G.hasRolled){
    aids.forEach(id=>{
      if(G.disabledCategories.includes(id))return;
      const r=scoreHand(id);
      scored.push({id,total:r.total,chips:r.chips,mult:r.mult});
    });
    scored.sort((a,b)=>b.total-a.total);
  }
  const bestId=scored.length>0?scored[0].id:null;

  // Show best pick banner at top
  if(bestId&&scored[0].total>0){
    const best=scored[0];const cat=getCatDef(bestId);
    const banner=document.createElement('div');
    banner.className='cat-item valid best-pick';
    banner.innerHTML=`<div class="cat-name">\u2b50 ${cat.name}</div>
      <div class="cat-stats"><span class="cat-chips">${best.chips} chips</span><span class="cat-mult-val">\u00d7${best.mult}</span><span class="cat-total">= ${fmt(best.total)}</span></div>`;
    banner.addEventListener('click',()=>{if(G.phase!=='rolling'||G.animating||!G.hasRolled)return;doScore(bestId)});
    list.appendChild(banner);
  }

  // Sort categories: valid ones first (by score desc), then invalid
  const catOrder=[...CATEGORIES];
  if(scored.length>0){
    catOrder.sort((a,b)=>{
      const sa=scored.find(s=>s.id===a.id);
      const sb=scored.find(s=>s.id===b.id);
      if(sa&&sb)return sb.total-sa.total;
      if(sa)return -1;if(sb)return 1;
      return 0;
    });
  }

  catOrder.forEach(cat=>{
    const d=document.createElement('div');
    const valid=aids.includes(cat.id);const dis=G.disabledCategories.includes(cat.id);
    let cls='cat-item';if(valid&&!dis)cls+=' valid';if(dis)cls+=' disabled';
    if(cat.id===bestId)cls+=' best-pick-match';
    d.className=cls;
    const lvl=G.catLevels[cat.id]||0;
    const sc=scored.find(s=>s.id===cat.id);
    d.innerHTML=`<div class="cat-name">${cat.name}</div>
      <div class="cat-stats"><span class="cat-chips">${getCatChips(cat.id)} chips</span><span class="cat-mult-val">\u00d7${getCatMult(cat.id)} mult</span>${sc?`<span class="cat-total">= ${fmt(sc.total)}</span>`:''}</div>
      ${lvl>0?`<span class="cat-level">Lv ${lvl}</span>`:''}`;
    d.addEventListener('click',()=>{if(G.phase!=='rolling'||G.animating||!G.hasRolled||!valid||dis)return;doScore(cat.id)});
    list.appendChild(d);
  });
}

function renderHUD(){
  document.getElementById('hud-gold').textContent=G.gold;
  document.getElementById('hud-hands').textContent=G.hands;
  document.getElementById('hud-rerolls').textContent=G.rerolls;
  document.getElementById('hud-score').textContent=fmt(G.cumulativeScore);
  document.getElementById('hud-target').textContent=fmt(G.targetScore);
  document.getElementById('hud-trial').textContent=G.trial+1;
  document.getElementById('hud-encounter').textContent=G.encounter+1;
  document.getElementById('score-fill').style.width=clamp(G.cumulativeScore/G.targetScore*100,0,100)+'%';
  const e=getEnemy();
  document.getElementById('enemy-name').textContent=isBoss()?e.name||'':'';
  document.getElementById('enemy-effect').textContent='';
  document.getElementById('game').classList.toggle('boss-encounter',isBoss());
  if(!G.animating){['score-chips','score-mult','score-result'].forEach(id=>document.getElementById(id).textContent='');document.querySelector('.score-x').textContent='';document.querySelector('.score-eq').textContent=''}
}

function renderActions(){
  const bar=document.getElementById('actions');bar.innerHTML='';
  if(G.phase!=='rolling')return;
  if(!G.hasRolled){
    bar.innerHTML=`<button class="btn btn-primary" onclick="doRoll()">ROLL DICE</button>`;
  } else {
    const cr=G.rerolls>0&&G.kept.some(k=>!k);
    let rl=`REROLL (${G.rerolls})`;
    bar.innerHTML=`<button class="btn btn-primary" onclick="doRoll()" ${cr?'':'disabled'}>${rl}</button>`;
    const fb=G.charms.find(ch=>ch.id==='fate_bender');
    if(fb&&!fb.usedThisEncounter)bar.innerHTML+=`<button class="btn btn-small" onclick="useFateBender()">FATE BENDER</button>`;
  }
}

function renderConsumables(){
  const bar=document.getElementById('consumables');bar.innerHTML='';
  G.enchantments.forEach((e,i)=>{
    const d=document.createElement('div');d.className='consumable';
    d.innerHTML=`<div class="consumable-name">${e.name}</div><div class="consumable-desc">${e.desc}</div><div class="consumable-hint">Click to apply to a die</div>`;
    d.addEventListener('click',()=>useEnchantment(i));bar.appendChild(d);
  });
  G.blessings.forEach((b,i)=>{
    const d=document.createElement('div');d.className='consumable';
    const cat=getCatDef(b.category);
    d.innerHTML=`<div class="consumable-name">${b.name}</div><div class="consumable-desc">Level up ${cat.name}</div>`;
    d.addEventListener('click',()=>useBlessing(i));bar.appendChild(d);
  });
}

// ============================================================
// GAME ACTIONS
// ============================================================
function toggleKeep(i){
  if(handleDieSelect(i))return;
  if(G.phase!=='rolling'||!G.hasRolled||G.animating)return;
  const e=getEnemy();
  if(e.effect==='molten_sentinel'&&G.dice[i]===6)return;
  if(e.effect==='void_flickerer'&&i===G.phased)return;
  playSound(G.kept[i]?'unkeep':'keep');
  G.kept[i]=!G.kept[i];
  // Update die in-place for smooth transition (no DOM rebuild)
  const die=document.querySelectorAll('.die')[i];
  if(die){
    if(G.kept[i]){
      die.classList.add('kept');
      die.classList.remove('roll-settle');
      die.querySelector('.die-cube').style.animation='none';
    }else{
      die.classList.remove('kept');
    }
  }
  // Update non-dice UI
  renderActiveEffects();renderCategories();renderHUD();renderActions();
}

function doRoll(){
  if(G.animating)return;
  if(G.hasRolled){
    if(G.rerolls<=0)return;
    const e=getEnemy();if(e.effect==='stellar_wisp'){if(G.gold<1)return;G.gold-=1}
    G.rerolls--;G.rerollCount++;if(!G.firstRerollDone)G.firstRerollDone=true;
    if(G.kept.every(k=>!k))G.charms.forEach(ch=>{if(ch.id==='fortunes_wheel')ch.accumulated=(ch.accumulated||0)+3});
  }
  playSound('roll');
  G.animating=true;
  const keptSnapshot = [...G.kept];
  const els=document.querySelectorAll('.die');
  const ROLL_DURATIONS=[0.45,0.48,0.44,0.46,0.50];
  const keptValues=G.dice.map((v,i)=>keptSnapshot[i]?v:null);

  // Determine new values before animating so the roll lands on the correct face
  const newValues=[];
  for(let i=0;i<5;i++){
    if(keptSnapshot[i]){newValues.push(keptValues[i]);continue;}
    newValues.push(rollDie(i));
  }

  // Parse target rotation for each die value
  function parseRot(val){
    const s=CUBE_ROTATIONS[val]||CUBE_ROTATIONS[1];
    const rx=(s.match(/rotateX\(([^)]+)\)/)||[])[1]||'0deg';
    const ry=(s.match(/rotateY\(([^)]+)\)/)||[])[1]||'0deg';
    return{rx:parseFloat(rx),ry:parseFloat(ry)};
  }

  let staggerMs=0;
  // Remove old dynamic roll keyframes
  document.querySelectorAll('style[data-roll-kf]').forEach(s=>s.remove());

  for(let i=0;i<5;i++){
    if(keptSnapshot[i])continue;
    els[i]?.classList.add('rolling');
    const cube=els[i]?.querySelector('.die-cube');
    if(cube){
      // Start from current face rotation
      const currentVal=Math.min(getDieValue(i)||G.dice[i]||1,7);
      const start=parseRot(currentVal);
      const target=parseRot(Math.min(newValues[i],7));
      // Add extra full spins so the roll looks energetic
      const spinsX=2+Math.floor(Math.random()*2);
      const spinsY=1+Math.floor(Math.random()*2);
      const dirX=Math.random()>0.5?1:-1;
      const dirY=Math.random()>0.5?1:-1;
      const endRx=target.rx+spinsX*360*dirX;
      const endRy=target.ry+spinsY*360*dirY;
      // Intermediate points relative to start→end travel
      const dRx=endRx-start.rx, dRy=endRy-start.ry;
      const name=`roll-land-${i}-${Date.now()}`;
      const style=document.createElement('style');
      style.setAttribute('data-roll-kf','');
      style.textContent=`@keyframes ${name}{`+
        `0%{transform:rotateX(${start.rx}deg) rotateY(${start.ry}deg) scale(1)}`+
        `25%{transform:rotateX(${start.rx+dRx*0.3}deg) rotateY(${start.ry+dRy*0.3}deg) scale(0.9)}`+
        `55%{transform:rotateX(${start.rx+dRx*0.6}deg) rotateY(${start.ry+dRy*0.6}deg) scale(1.05)}`+
        `85%{transform:rotateX(${start.rx+dRx*0.93}deg) rotateY(${start.ry+dRy*0.93}deg) scale(0.98)}`+
        `100%{transform:rotateX(${endRx}deg) rotateY(${endRy}deg) scale(1)}`+
      `}`;
      document.head.appendChild(style);
      const dur=ROLL_DURATIONS[i];
      cube.style.animation=`${name} ${dur}s cubic-bezier(0.2,0.6,0.3,1) ${staggerMs}ms both`;
      staggerMs+=30+Math.floor(Math.random()*30);
    }
  }
  setTimeout(()=>{
    // Commit pre-decided values
    for(let i=0;i<5;i++){
      if(keptSnapshot[i])G.dice[i]=keptValues[i];
      else G.dice[i]=newValues[i];
    }
    handlePostRoll();
    G.hasRolled=true;G.animating=false;

    // Settle dice in-place instead of rebuilding DOM (no flash)
    const settled=document.querySelectorAll('.die');
    for(let i=0;i<5;i++){
      // Skip kept dice unless handlePostRoll modified them
      const wasKept=keptSnapshot[i];
      const wasModifiedByPostRoll=wasKept&&G.dice[i]!==keptValues[i];
      if((wasKept&&!wasModifiedByPostRoll)||!settled[i])continue;
      const cube=settled[i].querySelector('.die-cube');
      if(cube){
        // Compute the normalized target matching end of animation
        const dotVal=Math.min(getDieValue(i)||G.dice[i],7);
        const finalTransform=CUBE_ROTATIONS[dotVal]||CUBE_ROTATIONS[1];
        // Freeze at current animated position, then swap to canonical rotation
        const computed=getComputedStyle(cube).transform;
        cube.style.animation='none';
        cube.style.transform=computed; // hold current matrix (prevents flash)
        // Force reflow so the browser commits the matrix
        cube.offsetHeight;
        // Swap to canonical rotation (same visual orientation, no flash)
        cube.style.transform=finalTransform;
        // Rebuild front face dots to show correct value
        const front=cube.querySelector('.face-front');
        if(front)front.innerHTML=createDieDots(dotVal);
      }
      settled[i].classList.remove('rolling','unrolled');
      settled[i].classList.add('roll-settle');
      // Update kept class if handlePostRoll changed it
      if(wasModifiedByPostRoll){
        settled[i].classList.remove('kept');
      }
    }
    _justRolled=keptSnapshot.map(k=>!k);
    // Render everything except dice
    renderActiveEffects();renderCharms();renderCategories();renderHUD();renderActions();renderConsumables();
  },700);
}

// Discards removed

async function doScore(categoryId){
  if(G.animating)return;G.animating=true;
  playSound('score');
  const result=scoreHand(categoryId);
  const chipsEl=document.getElementById('score-chips'),multEl=document.getElementById('score-mult'),
    resultEl=document.getElementById('score-result'),xEl=document.querySelector('.score-x'),
    eqEl=document.querySelector('.score-eq'),logEl=document.getElementById('scoring-log');
  const diceEls=document.querySelectorAll('.die');
  if(result.scoredIndices)result.scoredIndices.forEach(i=>diceEls[i]?.classList.add('scored'));
  logEl.innerHTML='';
  for(let i=0;i<result.log.length;i++){
    await sleep(180);
    const entry=document.createElement('div');entry.className='log-entry';entry.textContent=result.log[i];
    logEl.appendChild(entry);logEl.scrollTop=logEl.scrollHeight;
  }
  await sleep(250);
  playSound('chip');
  chipsEl.textContent=fmt(result.chips);chipsEl.style.animation='chipAdd 0.4s ease-out';
  await sleep(350);
  playSound('mult');
  xEl.textContent='\u00d7';multEl.textContent=fmt(result.mult);multEl.style.animation='multAdd 0.4s ease-out';
  await sleep(400);
  if(result.total>250)playSound('bigScore');
  eqEl.textContent='=';resultEl.textContent=fmt(result.total);resultEl.style.animation='scorePop 0.7s ease-out';
  if(result.total>250)screenShake();
  await sleep(700);
  G.cumulativeScore+=result.total;G.handsUsed++;G.hands--;
  G.lastScoredCategory=categoryId;
  G.catUsedThisEncounter.push({id:categoryId,score:result.total});
  G.charms.forEach(ch=>{if(ch.id==='bone_abacus'&&categoryId==='four_kind')ch.accumulated=(ch.accumulated||0)+1});
  G.charms.forEach(ch=>{if(ch.id==='field_mouse'&&result.total<100)G.gold+=2});
  G.charms.forEach(ch=>{if(ch.id==='golden_ticket'){let sixes=0;for(let i=0;i<5;i++)if(G.dice[i]===6)sixes++;if(sixes>0)G.gold+=sixes}});
  // New scaling triggers
  G.charms.forEach(ch=>{if(ch.id==='rage_crystal')ch.accumulated=(ch.accumulated||0)+0.5});
  G.charms.forEach(ch=>{if(ch.id==='herd_instinct'&&['three_kind','four_kind','yahtzee'].includes(categoryId))ch.accumulated=(ch.accumulated||0)+1});
  G.charms.forEach(ch=>{if(ch.id==='wanderlust'&&['small_straight','large_straight'].includes(categoryId))ch.accumulated=(ch.accumulated||0)+2});
  // Momentum tracking
  G.charms.forEach(ch=>{if(ch.id==='momentum'){if(result.total>=100)ch._streak=(ch._streak||0)+1;else ch._streak=0}});
  G.charms.forEach(ch=>{if(ch.id==='recycler'&&G.rerollCount>=G.maxRerolls)ch.accumulated=(ch.accumulated||0)+1});
  G.charms.forEach(ch=>{if(ch.id==='overkill'&&result.total>=G.targetScore*2)G.gold+=5});
  // Second Wind: if hand scored 0, get a hand back
  G.charms.forEach(ch=>{if(ch.id==='second_wind'&&!ch.usedThisEncounter&&result.total===0){G.hands++;ch.usedThisEncounter=true}});
  // All In hand penalty
  G.charms.forEach(ch=>{if(ch.id==='all_in'&&G.hands>0){}});
  for(let i=0;i<5;i++)if(G.mods[i]==='cursed'&&G.dice[i]===1)G.hands=Math.max(0,G.hands-1);
  const enemy=getEnemy();
  if(enemy.effect==='flame_keeper')G.targetScore+=25;
  if(enemy.effect==='gloomjaw'&&G.catUsedThisEncounter.length>0){
    let low=G.catUsedThisEncounter.reduce((a,b)=>a.score<b.score?a:b);
    if(!G.disabledCategories.includes(low.id))G.disabledCategories.push(low.id);
  }
  if(G.cumulativeScore>=G.targetScore){G.animating=false;await sleep(400);encounterWon();return}
  if(G.hands<=0){G.animating=false;await sleep(400);encounterLost();return}
  G.animating=false;G.hasRolled=false;G.kept=[false,false,false,false,false];
  G.rerolls=G.maxRerolls;G.rerollCount=0;G.firstRerollDone=false;
  G.turnBonusChips=0;G.turnBonusMult=0;G.hidden=[false,false,false,false,false];
  render();
}

function sleep(ms){return new Promise(r=>setTimeout(r,ms))}

function useFateBender(){
  const fb=G.charms.find(ch=>ch.id==='fate_bender');if(!fb||fb.usedThisEncounter)return;
  enterDieSelectMode('Click a die to set its value',(i)=>{
    const val=parseInt(prompt('Set to what value? (1-6)'));
    if(val>=1&&val<=6){G.dice[i]=val;fb.usedThisEncounter=true;render();}
  });
}
// Die-selection mode for enchantments
let _dieSelectMode=null; // {label, callback} or null

function enterDieSelectMode(label,callback){
  _dieSelectMode={label,callback};
  // Highlight dice as selectable
  document.querySelectorAll('.die').forEach((el,i)=>{
    el.classList.add('die-selectable');
  });
  // Show instruction banner
  let banner=document.getElementById('die-select-banner');
  if(!banner){
    banner=document.createElement('div');
    banner.id='die-select-banner';
    document.getElementById('center').appendChild(banner);
  }
  banner.innerHTML=`<span>${label}</span><button class="btn btn-small" onclick="cancelDieSelect()" style="margin-left:12px;padding:4px 12px;font-size:10px">Cancel</button>`;
  banner.style.display='flex';
}

function cancelDieSelect(){
  _dieSelectMode=null;
  document.querySelectorAll('.die').forEach(el=>el.classList.remove('die-selectable'));
  const banner=document.getElementById('die-select-banner');
  if(banner)banner.style.display='none';
}
window.cancelDieSelect=cancelDieSelect;

function handleDieSelect(i){
  if(!_dieSelectMode)return false;
  _dieSelectMode.callback(i);
  cancelDieSelect();
  return true;
}

function useEnchantment(idx){
  const en=G.enchantments[idx];if(!en)return;
  const label=en.mod==='remove'
    ?'Click a die to remove its modification'
    :`Click a die to apply <b>${en.name}</b>`;
  enterDieSelectMode(label,(i)=>{
    if(en.mod==='remove')G.mods[i]=null;
    else G.mods[i]=en.mod;
    G.enchantments.splice(idx,1);
    playSound('charm');
    render();
  });
}
function useBlessing(idx){const b=G.blessings[idx];if(!b)return;G.catLevels[b.category]=(G.catLevels[b.category]||0)+1;G.blessings.splice(idx,1);render()}

// ============================================================
// ENCOUNTER FLOW
// ============================================================
function startEncounter(){
  G.currentEnemy=null;cacheEnemy();
  const e=getEnemy();G.targetScore=getTargetScore();G.cumulativeScore=0;
  G.hands=G.maxHands+G.extraHandNext;
  G.rerolls=G.maxRerolls+G.extraRerollNext;G.extraHandNext=0;G.extraRerollNext=0;
  G.phase='rolling';G.hasRolled=false;G.rerollCount=0;G.firstRerollDone=false;
  G.handsUsed=0;G.lastScoredCategory=null;G.catUsedThisEncounter=[];
  G.disabledCategories=[];G.disabledCharms=[];
  G.turnBonusChips=0;G.turnBonusMult=0;
  G.kept=[false,false,false,false,false];G.hidden=[false,false,false,false,false];
  G.phased=-1;G.flameKeeperBonus=0;G.shopRerollCost=3;
  G.bossDebuffNum=-1;G.bossBannedNums=[];G.bossDevoured=[];
  G.charms.forEach(ch=>{if(ch.id==='fate_bender')ch.usedThisEncounter=false});
  G.charms.forEach(ch=>{if(ch.id==='chrono_die')G.rerolls++});
  G.charms.forEach(ch=>{if(ch.id==='reroll_addict')G.rerolls++});
  G.charms.forEach(ch=>{if(ch.id==='second_wind')ch.usedThisEncounter=false});
  G.charms.forEach(ch=>{if(ch.id==='blood_pact')G.hands=Math.max(1,G.hands-1)});
  G.charms.forEach(ch=>{if(ch.id==='all_in')G.hands=Math.max(1,G.hands-1)});
  if(isBoss()){
    if(e.effect==='pyraxxus')G.bossDebuffNum=6;
    if(e.effect==='nihilex')G.bossBannedNums=shuffle([1,2,3,4,5,6]).slice(0,2);
    if(e.effect==='aeonax'){G.bossBannedNums=shuffle([1,2,3,4,5,6]).slice(0,3);G.hands=Math.max(1,G.hands-1)}
  }
  if(e.effect==='drowned_revenant')G.maxRerolls=2;else G.maxRerolls=3;
  if(e.effect==='fungal_shaman')G.disabledCategories.push('chance');
  if(e.effect==='void_flickerer')G.phased=rng(0,4);
  if(e.effect==='obsidian_warden')G.hands=Math.max(1,G.hands-1);
  if(e.effect==='shardcaster'&&G.charms.length>0)G.disabledCharms.push(G.charms[rng(0,G.charms.length-1)].id);
  if(e.effect==='rune_breaker'){let ml=0,mc=null;Object.entries(G.catLevels).forEach(([id,l])=>{if(l>ml){ml=l;mc=id}});if(mc&&ml>0)G.catLevels[mc]--}
  if(G.dicePolishNext){const pi=rng(0,4);G.dice[pi]=6;G.kept[pi]=true;G.dicePolishNext=false}
  G.charms.forEach(ch=>{
    if(ch.id==='eternitys_gambit'){const c=prompt("Eternity's Gambit: Pick category (1-13):\n"+CATEGORIES.map((c,i)=>`${i+1}. ${c.name}`).join('\n'));const idx=parseInt(c)-1;if(idx>=0&&idx<CATEGORIES.length)ch.chosenCategory=CATEGORIES[idx].id}
  });
  document.getElementById('scoring-log').innerHTML='';render();
}

function encounterWon(){
  playSound('victory');
  const breakdown=[];
  let pay=isBoss()?7:3;
  breakdown.push({label:isBoss()?'Boss bonus':'Win bonus',amount:isBoss()?7:3});
  if(G.hands>0){breakdown.push({label:`Unused hands (${G.hands})`,amount:G.hands});pay+=G.hands}
  const interest=Math.min(5,Math.floor(G.gold/5));
  if(interest>0){breakdown.push({label:`Interest ($${G.gold}\u00f75)`,amount:interest});pay+=interest}
  G.charms.forEach(ch=>{
    if(ch.id==='copper_ring'){pay+=1;breakdown.push({label:'Copper Ring',amount:1})}
    if(ch.id==='hexed_coin'){pay+=4;breakdown.push({label:'Hexed Coin',amount:4})}
    if(ch.id==='tax_collector'){const b=G.hands*2;pay+=b;breakdown.push({label:`Tax Collector (${G.hands} hands)`,amount:b})}
    if(ch.id==='bounty_hunter'&&G.hands===0){pay+=3;breakdown.push({label:'Bounty Hunter (last hand)',amount:3})}
    if(ch.id==='piggy_bank'){ch.accumulated=(ch.accumulated||0)+1;pay+=1;breakdown.push({label:`Piggy Bank (+$1, total $${ch.accumulated})`,amount:1})}
    if(ch.id==='treasure_hunter')ch.accumulated=(ch.accumulated||0)+3;
    if(ch.id==='war_drum')ch.accumulated=(ch.accumulated||0)+1;
    // Blessing-granting charms
    if(ch.id==='scholar'&&G.catUsedThisEncounter.length>0){
      const usage={};G.catUsedThisEncounter.forEach(u=>usage[u.id]=(usage[u.id]||0)+1);
      let bestCat=null,bestCount=0;for(const[id,c]of Object.entries(usage)){if(c>bestCount){bestCount=c;bestCat=id}}
      if(bestCat){G.catLevels[bestCat]=(G.catLevels[bestCat]||0)+1;breakdown.push({label:`Scholar: +1 ${getCatDef(bestCat).name} level`,amount:0})}
    }
    if(ch.id==='ancient_tome'){ch.accumulated=(ch.accumulated||0)+1;if(ch.accumulated%3===0){const cats=CATEGORIES.map(c=>c.id);const rc=cats[rng(0,cats.length-1)];G.catLevels[rc]=(G.catLevels[rc]||0)+1;breakdown.push({label:`Ancient Tome: +1 ${getCatDef(rc).name} level`,amount:0})}}
    if(ch.id==='temple_pilgrim'&&isBoss()){for(let j=0;j<2;j++){const cats=CATEGORIES.map(c=>c.id);const rc=cats[rng(0,cats.length-1)];G.catLevels[rc]=(G.catLevels[rc]||0)+1}breakdown.push({label:'Temple Pilgrim: +2 random levels',amount:0})}
  });
  G.gold+=pay;
  G._lastPayBreakdown=breakdown;G._lastPayTotal=pay;
  if(isBoss()){triggerDiceCascade();if(G.trial>=4){showVictory();return}showTrialReward()}
  else{G.encounter++;showShop()}
}

function encounterLost(){
  G.charms.forEach(ch=>{if(ch.id==='ouroboros')ch.accumulated=(ch.accumulated||0)+1});
  G.charms.forEach(ch=>{if(ch.id==='gamblers_ruin')G.gold=Math.max(0,G.gold-5)});
  showDefeat();
}

// ============================================================
// OVERLAYS
// ============================================================
function showOverlay(html){document.getElementById('overlay-content').innerHTML=html;document.getElementById('overlay').classList.add('active')}
function closeOverlay(){document.getElementById('overlay').classList.remove('active');resetOverlayStyles()}

function showBonuses(){
  let html=`<div style="max-width:600px;margin:0 auto">
    <h2 style="margin-bottom:16px">📊 Bonuses & Multipliers</h2>`;

  // Category Levels Section
  html+=`<h3 style="color:#e8d080;margin-top:16px;border-bottom:1px solid rgba(232,208,128,0.2);padding-bottom:6px">Category Levels</h3>`;
  html+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-top:8px">`;
  let hasLevels=false;
  CATEGORIES.forEach(cat=>{
    const lvl=G.catLevels[cat.id]||0;
    if(lvl>0){
      hasLevels=true;
      const bonusChips=cat.chipPer*lvl;
      const bonusMult=cat.multPer*lvl;
      html+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(232,208,128,0.25);border-radius:8px;padding:10px">
        <div style="font-weight:700;color:#d0c0e8;font-size:13px">${cat.name} <span style="color:#ffd700;font-size:11px">Lv ${lvl}</span></div>
        <div style="font-size:11px;margin-top:4px">
          <span style="color:#6fbbff">+${bonusChips} chips</span>
          <span style="color:#8878a8;margin:0 4px">|</span>
          <span style="color:#ff6b6b">+${bonusMult} mult</span>
        </div>
      </div>`;
    }
  });
  if(!hasLevels)html+=`<div style="color:#6858a0;font-size:12px;padding:10px">No category levels yet</div>`;
  html+=`</div>`;

  // Charm Bonuses Section
  html+=`<h3 style="color:#a090c0;margin-top:20px;border-bottom:1px solid rgba(120,80,200,0.2);padding-bottom:6px">Active Charm Bonuses</h3>`;
  html+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin-top:8px">`;
  if(G.charms.length===0){
    html+=`<div style="color:#6858a0;font-size:12px;padding:10px">No charms equipped</div>`;
  }else{
    G.charms.forEach((ch,i)=>{
      const disabled=G.disabledCharms.includes(ch.id);
      let bonusText='';
      if(ch.chips)bonusText+=`<span style="color:#6fbbff">+${ch.chips} chips</span> `;
      if(ch.mult)bonusText+=`<span style="color:#ff6b6b">+${ch.mult} mult</span> `;
      if(ch.accumulated&&ch.scaleStat){
        const total=ch.scaleStat==='chips'?ch.accumulated:ch.accumulated;
        bonusText+=`<span style="color:#7ee87e">Accumulated: +${total} ${ch.scaleStat}</span>`;
      }
      if(!bonusText)bonusText=`<span style="color:#8878a8">${ch.desc}</span>`;
      html+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(120,80,200,0.25);border-radius:8px;padding:10px;${disabled?'opacity:0.4':''}">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">${ch.icon||'?'}</span>
          <div style="font-weight:700;color:#d0c0e8;font-size:12px">${ch.name}${disabled?' (disabled)':''}</div>
        </div>
        <div style="font-size:11px;margin-top:6px">${bonusText}</div>
      </div>`;
    });
  }
  html+=`</div>`;

  // Die Modifications Section
  html+=`<h3 style="color:#90a8c0;margin-top:20px;border-bottom:1px solid rgba(144,168,192,0.2);padding-bottom:6px">Die Modifications</h3>`;
  html+=`<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">`;
  let hasMods=false;
  const modColors={weighted:'#d4a520',lucky:'#40e060',steel:'#90a8c0',gilded:'#ffd700',void:'#a050e0',wild:'#ff60ff',cursed:'#e03030',mirrored:'#50c0e8'};
  const modDescs={weighted:'More likely to roll 5-6',lucky:'+2 chips when scored',steel:'Always counts as 3',gilded:'+$1 when scored',void:'Random value, ×2 chips',wild:'Counts as any number',cursed:'×1.5 mult, but -1 hand on 1',mirrored:'Copies adjacent die'};
  for(let i=0;i<5;i++){
    if(G.mods[i]){
      hasMods=true;
      html+=`<div style="background:rgba(25,20,45,0.9);border:1px solid ${modColors[G.mods[i]]||'#7848c0'}40;border-radius:8px;padding:10px;min-width:100px;text-align:center">
        <div style="font-weight:700;color:${modColors[G.mods[i]]||'#d0c0e8'};font-size:13px;text-transform:capitalize">Die ${i+1}: ${G.mods[i]}</div>
        <div style="font-size:10px;color:#8878a8;margin-top:4px">${modDescs[G.mods[i]]||''}</div>
      </div>`;
    }
  }
  if(!hasMods)html+=`<div style="color:#6858a0;font-size:12px;padding:10px">No die modifications</div>`;
  html+=`</div>`;

  // Enemy Effects Section
  const enemy=getEnemy();
  if(enemy&&enemy.effect!=='none'){
    html+=`<h3 style="color:#e8a0a0;margin-top:20px;border-bottom:1px solid rgba(232,160,160,0.2);padding-bottom:6px">Current Enemy Effect</h3>`;
    html+=`<div style="background:rgba(40,20,20,0.6);border:1px solid rgba(232,160,160,0.25);border-radius:8px;padding:12px;margin-top:8px">
      <div style="font-weight:700;color:#e8a0a0;font-size:14px">${enemy.name}</div>
      <div style="font-size:12px;color:#c09090;margin-top:4px">${enemy.desc}</div>
    </div>`;
  }

  html+=`<div class="text-center" style="margin-top:24px">
    <button class="btn btn-primary" onclick="closeOverlay()" style="padding:12px 36px">CLOSE</button>
  </div></div>`;
  showOverlay(html);
}

function showTitleScreen(){
  G.phase='title';
  document.getElementById('overlay').classList.add('active');
  const oc=document.getElementById('overlay-content');
  oc.style.padding='0';
  oc.style.background='transparent';
  oc.style.border='none';
  oc.style.boxShadow='none';
  oc.style.maxWidth='100%';
  oc.style.width='100%';
  oc.style.maxHeight='100%';
  oc.style.overflow='hidden';
  oc.style.animation='none';
  // Build a 3D die for the title using the same structure as in-game
  const dieFaces=[
    {cls:'face-front',val:1},{cls:'face-back',val:6},
    {cls:'face-right',val:3},{cls:'face-left',val:4},
    {cls:'face-top',val:2},{cls:'face-bottom',val:5}
  ];
  let dieFacesHTML='';
  dieFaces.forEach(f=>{
    dieFacesHTML+=`<div class="die-face ${f.cls}">${createDieDots(f.val)}</div>`;
  });
  oc.innerHTML=`
    <div class="title-splash">
      <div class="title-die-wrap">
        <div class="sigil-ring sigil-ring-outer"></div>
        <div class="sigil-ring sigil-ring-inner"></div>
        <div class="title-die">
          <div class="die-3d-scene">
            <div class="die-cube title-die-cube">${dieFacesHTML}</div>
          </div>
        </div>
      </div>
      <h1 class="title-logo">DICERO</h1>
      <p class="title-tagline">The house always loses eventually.</p>
      <p class="title-flavor">Push your luck at the table. Build monster combos.<br>Stack Charms. Beat the house across five high-stakes rounds.</p>
      <div class="title-buttons">
        <button class="btn btn-primary title-begin" onclick="showRulesScreen()">BEGIN RUN</button>
        <button class="btn title-comp" onclick="showInfoPage()">COMPENDIUM</button>
      </div>
      <div class="title-particles" id="title-particles"></div>
    </div>
  `;
  // Spawn floating particles
  const pc=document.getElementById('title-particles');
  for(let i=0;i<20;i++){
    const p=document.createElement('div');
    p.className='title-particle';
    p.style.left=Math.random()*100+'%';
    p.style.animationDelay=Math.random()*6+'s';
    p.style.animationDuration=(4+Math.random()*4)+'s';
    p.style.opacity=0.2+Math.random()*0.4;
    p.style.width=p.style.height=(2+Math.random()*3)+'px';
    pc.appendChild(p);
  }
}

function showRulesScreen(){
  playSound('click');
  const oc=document.getElementById('overlay-content');
  // Reset overlay-content styles for normal overlay
  oc.style.padding='';
  oc.style.background='';
  oc.style.border='';
  oc.style.boxShadow='';
  oc.style.maxWidth='';
  oc.style.width='';
  oc.style.maxHeight='';
  oc.style.overflow='';
  oc.style.animation='';
  oc.innerHTML=`
    <div class="title text-center">
      <h2 style="margin-bottom:16px;font-size:26px">HOW TO PLAY</h2>
      <div style="text-align:left;max-width:460px;margin:0 auto 24px">
        <ul style="font-size:13px;color:#a090c0;line-height:2.2;padding-left:20px">
          <li><b style="color:#e0d0f0">Roll</b> 5 dice, then <b style="color:#e0d0f0">click dice</b> to keep them</li>
          <li><b style="color:#e0d0f0">Reroll</b> unkept dice (3 rerolls per hand)</li>
          <li>Click a <b style="color:#e0d0f0">scoring category</b> on the right to score</li>
          <li>Score = <span style="color:#6fbbff">Chips</span> \u00d7 <span style="color:#ff6b6b">Mult</span></li>
          <li>Visit the <b style="color:#ffd700">Shop</b> between fights to buy <b style="color:#e0d0f0">Charms</b></li>
          <li>Defeat <b style="color:#e8a0a0">4 enemies + 1 boss</b> per Trial</li>
          <li>Survive all <b style="color:#e8d080">5 Trials</b> to win</li>
        </ul>
      </div>
      <div style="display:flex;gap:14px;justify-content:center">
        <button class="btn" onclick="showTitleScreen()" style="padding:12px 32px;font-size:14px">BACK</button>
        <button class="btn btn-primary" onclick="startRun()" style="font-size:18px;padding:14px 48px;letter-spacing:2px">START</button>
      </div>
    </div>
  `;
}

function showInfoPage(){
  resetOverlayStyles();
  const rarityOrder=['common','uncommon','rare','legendary'];
  const rarityColors={common:'#80d080',uncommon:'#80b0ff',rare:'#ff9060',legendary:'#ffd700'};

  let html=`<div style="max-width:760px;margin:0 auto;display:flex;flex-direction:column;height:80vh">
    <div style="flex-shrink:0">
      <h2 style="margin-bottom:4px">Compendium</h2>
      <p style="color:#6858a0;font-size:12px;margin-bottom:12px;text-align:center">Every upgrade you can find during a run</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:12px">
        <button class="btn btn-small info-tab active" onclick="switchInfoTab('charms',this)">Charms</button>
        <button class="btn btn-small info-tab" onclick="switchInfoTab('enchantments',this)">Enchantments</button>
        <button class="btn btn-small info-tab" onclick="switchInfoTab('blessings',this)">Blessings</button>
        <button class="btn btn-small info-tab" onclick="switchInfoTab('categories',this)">Categories</button>
        <button class="btn btn-small info-tab" onclick="switchInfoTab('specials',this)">Specials</button>
        <button class="btn btn-small info-tab" onclick="switchInfoTab('trials',this)">Trials</button>
      </div>
    </div>
    <div id="info-content" style="flex:1;overflow-y:auto;min-height:0"></div>
    <div style="flex-shrink:0;text-align:center;padding-top:12px">
      <button class="btn btn-primary" onclick="showTitleScreen()" style="padding:12px 36px">BACK</button>
    </div>
  </div>`;
  showOverlay(html);
  switchInfoTab('charms',document.querySelector('.info-tab'));
}

window.switchInfoTab=function(tab,btn){
  document.querySelectorAll('.info-tab').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  const el=document.getElementById('info-content');
  const rarityColors={common:'#80d080',uncommon:'#80b0ff',rare:'#ff9060',legendary:'#ffd700'};

  if(tab==='charms'){
    let h='';
    ['common','uncommon','rare','legendary'].forEach(r=>{
      const group=CHARMS.filter(c=>c.rarity===r);
      if(!group.length)return;
      h+=`<h3 style="color:${rarityColors[r]};border-bottom:1px solid ${rarityColors[r]}33;padding-bottom:6px;margin-top:16px">${r.charAt(0).toUpperCase()+r.slice(1)} Charms</h3>`;
      h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;margin-top:8px">`;
      group.forEach(c=>{
        h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid ${rarityColors[r]}40;border-radius:10px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start">
          <span style="font-size:26px;flex-shrink:0">${c.icon||'?'}</span>
          <div>
            <div style="font-weight:700;color:#e0d4f0;font-size:13px">${c.name}</div>
            <div style="color:#a090c8;font-size:11px;margin-top:3px;line-height:1.4">${c.desc}</div>
            <div style="color:#ffd700;font-size:10px;margin-top:4px">Cost: $${c.cost}</div>
          </div>
        </div>`;
      });
      h+='</div>';
    });
    el.innerHTML=h;
  }
  else if(tab==='enchantments'){
    let h=`<h3>Die Enchantments</h3><p style="color:#7868a0;font-size:12px;margin-bottom:12px">Apply to individual dice to modify their behavior. Bought in the shop as consumables.</p>`;
    h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">`;
    ENCHANTMENTS.forEach(e=>{
      const modColors={steel:'#90a8c0',gilded:'#ffd700',void:'#a050e0',wild:'#ff60ff',lucky:'#40e060',cursed:'#e03030',remove:'#8070b0',weighted:'#d4a520',mirrored:'#50c0e8'};
      h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid ${(modColors[e.mod]||'#7848c0')}40;border-radius:10px;padding:12px;display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:22px;flex-shrink:0">\u{1F52E}</span>
        <div>
          <div style="font-weight:700;color:${modColors[e.mod]||'#d0c0e8'};font-size:13px">${e.name}</div>
          <div style="color:#a090c8;font-size:11px;margin-top:3px;line-height:1.4">${e.desc}</div>
          <div style="color:#ffd700;font-size:10px;margin-top:4px">Cost: $${e.cost}</div>
        </div>
      </div>`;
    });
    h+='</div>';
    el.innerHTML=h;
  }
  else if(tab==='blessings'){
    let h=`<h3>Blessings</h3><p style="color:#7868a0;font-size:12px;margin-bottom:12px">Level up a scoring category, increasing its base chips and mult permanently.</p>`;
    h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">`;
    BLESSINGS.forEach(b=>{
      const cat=getCatDef(b.category);
      h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(232,208,128,0.25);border-radius:10px;padding:12px;display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:22px;flex-shrink:0">\u{1F64F}</span>
        <div>
          <div style="font-weight:700;color:#e8d080;font-size:13px">${b.name}</div>
          <div style="color:#a090c8;font-size:11px;margin-top:3px">Levels up <b style="color:#d0c0e8">${cat.name}</b></div>
          <div style="color:#6fbbff;font-size:10px;margin-top:2px">+${cat.chipPer} chips, <span style="color:#ff6b6b">+${cat.multPer} mult</span> per level</div>
          <div style="color:#ffd700;font-size:10px;margin-top:2px">Cost: $${b.cost}</div>
        </div>
      </div>`;
    });
    h+='</div>';
    el.innerHTML=h;
  }
  else if(tab==='categories'){
    let h=`<h3>Scoring Categories</h3><p style="color:#7868a0;font-size:12px;margin-bottom:12px">Click a valid category after rolling to score. Score = <span style="color:#6fbbff">Chips</span> \u00d7 <span style="color:#ff6b6b">Mult</span></p>`;
    h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px">`;
    CATEGORIES.forEach(c=>{
      h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(120,80,200,0.25);border-radius:10px;padding:12px">
        <div style="font-weight:700;color:#d0c0e8;font-size:14px;margin-bottom:4px">${c.name}</div>
        <div style="color:#8878a8;font-size:11px;margin-bottom:6px">${c.desc}</div>
        <div style="display:flex;gap:12px;font-size:11px">
          <span style="color:#6fbbff">${c.baseChips} chips (+${c.chipPer}/lv)</span>
          <span style="color:#ff6b6b">\u00d7${c.baseMult} mult (+${c.multPer}/lv)</span>
        </div>
      </div>`;
    });
    h+='</div>';
    el.innerHTML=h;
  }
  else if(tab==='specials'){
    let h=`<h3>Special Items</h3><p style="color:#7868a0;font-size:12px;margin-bottom:12px">One-time use items available in the shop.</p>`;
    h+=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">`;
    SPECIALS.forEach(s=>{
      h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(120,80,200,0.25);border-radius:10px;padding:12px;display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:26px;flex-shrink:0">${s.icon}</span>
        <div>
          <div style="font-weight:700;color:#d0c0e8;font-size:13px">${s.name}</div>
          <div style="color:#a090c8;font-size:11px;margin-top:3px">${s.desc}</div>
          <div style="color:#ffd700;font-size:10px;margin-top:4px">Cost: $${s.cost}</div>
        </div>
      </div>`;
    });
    h+='</div>';
    el.innerHTML=h;
  }
  else if(tab==='trials'){
    let h=`<h3>The Five Trials</h3><p style="color:#7868a0;font-size:12px;margin-bottom:12px">Each trial has 3 enemies and 1 boss. Defeat them all to advance.</p>`;
    TRIALS.forEach((t,ti)=>{
      h+=`<div style="background:rgba(25,20,45,0.9);border:1px solid rgba(120,80,200,0.2);border-radius:12px;padding:14px;margin-bottom:10px">
        <div style="font-weight:700;color:#e8d080;font-size:16px;margin-bottom:2px">Trial ${ti+1}: ${t.name}</div>
        <div style="color:#7868a0;font-size:11px;font-style:italic;margin-bottom:8px">${t.desc}</div>
        <div style="font-size:11px;color:#8878a8;margin-bottom:6px">Base target: <span style="color:#e8d080">${t.base.toLocaleString()}</span> | Boss target: <span style="color:#ff6b6b">${t.bossTarget.toLocaleString()}</span></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px">`;
      t.enemies.forEach(e=>{
        h+=`<div style="background:rgba(15,12,30,0.6);border-radius:8px;padding:8px 10px">
          <div style="font-weight:700;color:#e8a0a0;font-size:12px">${e.name}</div>
          <div style="color:#8070a8;font-size:10px;margin-top:2px">${e.desc}</div>
        </div>`;
      });
      h+=`<div style="background:rgba(40,15,15,0.6);border:1px solid rgba(255,215,0,0.2);border-radius:8px;padding:8px 10px">
        <div style="font-weight:700;color:#ffd700;font-size:12px">\u{1F451} ${t.boss.name}</div>
        <div style="color:#c09060;font-size:10px;margin-top:2px">${t.boss.desc}</div>
      </div>`;
      h+=`</div></div>`;
    });
    el.innerHTML=h;
  }
};

function showTrialPreview(onContinue){
  const t=TRIALS[G.trial];
  if(!t){onContinue();return;}
  const boss=t.boss;
  showOverlay(`
    <div class="text-center" style="max-width:500px;margin:0 auto">
      <div style="font-size:11px;color:#a090c0;text-transform:uppercase;letter-spacing:3px;margin-bottom:8px">Trial ${G.trial+1} of 5</div>
      <h2 style="margin-bottom:4px;font-size:24px">${t.name}</h2>
      <p style="color:#6858a0;font-size:13px;font-style:italic;margin-bottom:12px">${t.desc}</p>
      <p style="color:#8878b0;font-size:12px;margin-bottom:20px">3 encounters then a boss fight</p>
      <div style="background:rgba(40,15,15,0.5);border:1.5px solid rgba(200,60,60,0.3);border-radius:14px;padding:18px 22px;margin-bottom:16px;text-align:left">
        <div style="font-size:10px;color:#c08080;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">Boss Awaits</div>
        <div style="font-size:18px;font-weight:700;color:#e8a0a0;margin-bottom:6px;text-shadow:0 0 16px rgba(200,60,60,0.3)">${boss.name}</div>
        <div style="font-size:13px;color:#c09090;line-height:1.6;margin-bottom:12px">${boss.desc}</div>
        <div style="display:flex;gap:16px;font-size:12px">
          <span style="color:#6fbbff">Target: ${t.bossTarget.toLocaleString()}</span>
        </div>
      </div>
      <button class="btn btn-primary" onclick="window._trialPreviewCb()" style="font-size:16px;padding:12px 42px;letter-spacing:1.5px">ENTER TRIAL</button>
    </div>
  `);
  window._trialPreviewCb=function(){closeOverlay();onContinue()};
}

function maybeShowTrialPreview(onStart){
  if(G.encounter===0)showTrialPreview(onStart);
  else onStart();
}

function startRun(){
  playSound('click');
  resetOverlayStyles();
  newRun();closeOverlay();
  offerCharmPick('Choose a Starting Charm',getRandomCharms('common',3),()=>maybeShowTrialPreview(()=>startEncounter()));
}

function resetOverlayStyles(){
  const oc=document.getElementById('overlay-content');
  oc.style.padding='';oc.style.background='';oc.style.border='';
  oc.style.boxShadow='';oc.style.maxWidth='';oc.style.width='';
  oc.style.maxHeight='';oc.style.overflow='';oc.style.animation='';
}

function getRandomCharms(rarity,count){
  let pool=CHARMS.filter(c=>{if(rarity&&c.rarity!==rarity)return false;return!G.charms.some(gc=>gc.id===c.id)});
  return shuffle(pool).slice(0,count).map(c=>({...c,accumulated:c.accumulated||0}));
}

function offerCharmPick(title,choices,onDone){
  let html=`<h2 style="font-size:20px;margin-bottom:8px">${title}</h2><div class="pick-row">`;
  choices.forEach((ch,i)=>{
    html+=`<div class="pick-card" onclick="pickCharm(${i})">
      <div style="font-size:28px;margin-bottom:2px;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.5))">${ch.icon||'?'}</div>
      <span class="charm-rarity rarity-${ch.rarity}">${ch.rarity}</span>
      <div style="font-size:14px;font-weight:700;color:#d0c0e8;margin:4px 0;letter-spacing:0.5px">${ch.name}</div>
      <div style="font-size:11px;color:#8878a8;line-height:1.3">${ch.desc}</div>
    </div>`;
  });
  html+='</div>';showOverlay(html);
  document.getElementById('overlay-content').style.padding='16px 24px';
  window._pickChoices=choices;window._pickCallback=onDone;
}
window.pickCharm=function(i){playSound('charm');const ch=window._pickChoices[i];if(G.charms.length<G.maxCharmSlots)G.charms.push({...ch});closeOverlay();window._pickCallback()};

function showTrialReward(){
  const rc=getRandomCharms('rare',1);const bl=shuffle(BLESSINGS).slice(0,1);const blCat=getCatDef(bl[0].category);
  let html=`<h2>Trial ${G.trial+1} Complete!</h2>
    <p class="text-center" style="color:#8878a8;margin-bottom:18px;font-style:italic">${TRIALS[G.trial].name} conquered!</p>
    <h3>Choose a Reward</h3><div class="pick-row">
    ${rc.length>0?`<div class="pick-card" onclick="pickTrialReward('charm')"><div style="font-size:36px;margin-bottom:6px">${rc[0].icon||'?'}</div><span class="charm-rarity rarity-rare">rare</span><div style="font-size:17px;font-weight:700;color:#d0c0e8;margin:10px 0">${rc[0].name}</div><div style="font-size:12px;color:#8878a8">${rc[0].desc}</div></div>`:''}
    <div class="pick-card" onclick="pickTrialReward('blessing')"><div style="font-size:28px;margin-bottom:6px">\u{1F64F}</div><div style="font-size:17px;font-weight:700;color:#d0c0e8;margin:6px 0">${bl[0].name}</div><div style="font-size:12px;color:#8878a8">Level up ${blCat.name}</div></div>
    <div class="pick-card" onclick="pickTrialReward('gold')"><div style="font-size:28px;margin-bottom:6px">\u{1F4B0}</div><div style="font-size:17px;font-weight:700;color:#ffd700;margin:6px 0">+$15 Gold</div></div>
    </div>`;
  showOverlay(html);window._trialRewardCharm=rc[0];window._trialRewardBlessing=bl[0];
}
window.pickTrialReward=function(type){
  if(type==='charm'&&window._trialRewardCharm&&G.charms.length<G.maxCharmSlots)G.charms.push({...window._trialRewardCharm});
  else if(type==='blessing'){const b=window._trialRewardBlessing;G.catLevels[b.category]=(G.catLevels[b.category]||0)+1}
  else if(type==='gold')G.gold+=15;
  closeOverlay();G.trial++;G.encounter=0;maybeShowTrialPreview(()=>startEncounter());
};

function shopDiscount(cost){return G.charms.some(ch=>ch.id==='merchant')?Math.max(1,cost-1):cost}
function showShop(){
  G.phase='shop';G.shopRerollCost=3;
  window._shopCharms=getRandomCharms(null,2);window._shopBlessing=shuffle(BLESSINGS)[0];
  window._shopEnchantment=shuffle(ENCHANTMENTS)[0];window._shopSpecial=shuffle(SPECIALS)[0];
  window._shopSold={};renderShop();
}

function renderShop(){
  const ch=window._shopCharms,bl=window._shopBlessing,en=window._shopEnchantment,sp=window._shopSpecial,sold=window._shopSold;
  const blCat=getCatDef(bl.category);
  let html=`<h2>Shop <span style="font-size:15px;color:#ffd700;text-shadow:0 0 8px rgba(255,215,0,0.3)">$${G.gold}</span></h2>`;
  if(G._lastPayBreakdown){
    html+=`<div class="gold-breakdown"><div class="gold-breakdown-title">Gold Earned: +$${G._lastPayTotal}</div>`;
    G._lastPayBreakdown.forEach(b=>{html+=`<div class="gold-breakdown-row"><span>${b.label}</span><span style="color:#ffd700">+$${b.amount}</span></div>`});
    html+=`</div>`;
  }

  html+=`<div class="shop-row" style="margin-bottom:8px">`;
  ch.forEach((c,i)=>{
    const dc=shopDiscount(c.cost);
    const can=G.gold>=dc&&G.charms.length<G.maxCharmSlots&&!sold['c'+i];
    html+=`<div class="shop-card ${can?'':'disabled'} ${sold['c'+i]?'sold':''}" onclick="${can?`buyShopCharm(${i})`:''}"><div class="shop-icon">${c.icon||'?'}</div><span class="charm-rarity rarity-${c.rarity}">${c.rarity}</span><div class="shop-name">${c.name}</div><div class="shop-cost">$${dc}${dc<c.cost?' <s style="opacity:0.4">$'+c.cost+'</s>':''}</div><div class="shop-desc">${c.desc}</div></div>`;
  });
  html+=`<div class="shop-card" onclick="rerollShop()" style="display:flex;flex-direction:column;align-items:center;justify-content:center"><div class="shop-icon">\u{1F504}</div><div class="shop-name">Reroll</div><div class="shop-cost">$${G.shopRerollCost}</div><div class="shop-desc">Shuffle all items currently on offer. Does not affect your dice in combat.</div></div></div>`;

  const canBl=G.gold>=bl.cost&&!sold.bl;
  const canEn=G.gold>=en.cost&&G.enchantments.length<G.maxEnchSlots&&!sold.en;
  const canSp=G.gold>=sp.cost&&!sold.sp;
  html+=`<div class="shop-row" style="margin-bottom:8px">`;
  html+=`<div class="shop-card ${canBl?'':'disabled'} ${sold.bl?'sold':''}" onclick="${canBl?'buyShopBlessing()':''}"><div class="shop-icon">\u{1F64F}</div><div class="shop-name">${bl.name}</div><div class="shop-cost">$${bl.cost}</div><div class="shop-desc">+${blCat.chipPer} chips, +${blCat.multPer} mult to ${blCat.name}</div></div>`;
  html+=`<div class="shop-card ${canEn?'':'disabled'} ${sold.en?'sold':''}" onclick="${canEn?'buyShopEnchantment()':''}"><div class="shop-icon">\u{1F52E}</div><div class="shop-name">${en.name}</div><div class="shop-cost">$${en.cost}</div><div class="shop-desc">${en.desc}</div></div>`;
  html+=`<div class="shop-card ${canSp?'':'disabled'} ${sold.sp?'sold':''}" onclick="${canSp?'buyShopSpecial()':''}"><div class="shop-icon">${sp.icon}</div><div class="shop-name">${sp.name}</div><div class="shop-cost">$${sp.cost}</div><div class="shop-desc">${sp.desc}</div></div>`;
  html+=`</div>`;

  if(G.charms.length>0){
    html+=`<div style="margin-top:4px;margin-bottom:6px;text-align:center;font-size:11px;color:#a08060;text-transform:uppercase;letter-spacing:2px">Sell Charms</div>`;
    html+=`<div class="shop-row" style="margin-bottom:8px;flex-wrap:wrap">`;
    G.charms.forEach((c,i)=>{
      let sp=Math.floor((c.cost||4)/2);
      if(c.id==='piggy_bank')sp+=(c.accumulated||0);
      html+=`<div class="shop-card" onclick="sellCharm(${i})" style="min-width:120px"><div class="shop-icon">${c.icon||'?'}</div><span class="charm-rarity rarity-${c.rarity}" style="font-size:9px">${c.rarity}</span><div class="shop-name">${c.name}</div><div class="shop-desc">${c.desc}</div><div class="shop-cost" style="color:#80e080">Sell +$${sp}</div></div>`;
    });
    html+='</div>';
  }
  html+=`<div class="text-center" style="margin-top:6px"><button class="btn btn-primary" onclick="leaveShop()" style="padding:10px 36px;font-size:15px;letter-spacing:1px">CONTINUE</button></div>`;
  showOverlay(html);
}

function trackMidasSpend(amount){G.charms.forEach(ch=>{if(ch.id==='midas_touch')ch.accumulated=(ch.accumulated||0)+amount*2})}
window.buyShopCharm=function(i){const c=window._shopCharms[i];if(!c)return;const dc=shopDiscount(c.cost);if(G.gold<dc||G.charms.length>=G.maxCharmSlots)return;playSound('charm');G.gold-=dc;trackMidasSpend(dc);G.charms.push({...c,accumulated:c.accumulated||0});window._shopSold['c'+i]=true;renderShop()};
window.buyShopBlessing=function(){const b=window._shopBlessing;if(G.gold<b.cost)return;playSound('buy');G.gold-=b.cost;trackMidasSpend(b.cost);G.catLevels[b.category]=(G.catLevels[b.category]||0)+1;window._shopSold.bl=true;renderShop()};
window.buyShopEnchantment=function(){const e=window._shopEnchantment;if(G.gold<e.cost||G.enchantments.length>=G.maxEnchSlots)return;playSound('buy');G.gold-=e.cost;trackMidasSpend(e.cost);G.enchantments.push({...e});window._shopSold.en=true;renderShop()};
window.buyShopSpecial=function(){const s=window._shopSpecial;if(G.gold<s.cost)return;playSound('buy');G.gold-=s.cost;trackMidasSpend(s.cost);if(s.effect==='extra_hand')G.extraHandNext++;if(s.effect==='extra_reroll')G.extraRerollNext++;if(s.effect==='dice_polish')G.dicePolishNext=true;if(s.effect==='charm_slot')G.maxCharmSlots++;window._shopSold.sp=true;renderShop()};
window.sellCharm=function(i){const ch=G.charms[i];let sellPrice=Math.floor((ch.cost||4)/2);if(ch.id==='piggy_bank')sellPrice+=(ch.accumulated||0);G.gold+=sellPrice;G.charms.splice(i,1);renderShop()};
window.rerollShop=function(){if(G.gold<G.shopRerollCost)return;G.gold-=G.shopRerollCost;trackMidasSpend(G.shopRerollCost);G.shopRerollCost++;window._shopCharms=getRandomCharms(null,2);window._shopBlessing=shuffle(BLESSINGS)[0];window._shopEnchantment=shuffle(ENCHANTMENTS)[0];window._shopSpecial=shuffle(SPECIALS)[0];window._shopSold={};renderShop()};
window.leaveShop=function(){playSound('click');closeOverlay();startEncounter()};

function showVictory(){
  G.phase='victory';screenShake();playSound('victory');
  showOverlay(`<div class="victory text-center">
    <div style="font-size:50px;animation:float 2s ease-in-out infinite">\u{1F3C6}</div>
    <h1>VICTORY!</h1>
    <p style="color:#a090c0;font-size:17px;margin:16px 0;font-style:italic">You have conquered all five Trials!</p>
    <div style="margin:24px auto;max-width:300px;background:rgba(15,12,30,0.5);padding:16px;border-radius:12px;border:1px solid rgba(120,80,200,0.2)">
      <div class="stat-row"><span>Gold</span><span class="gold-display">$${G.gold}</span></div>
      <div class="stat-row"><span>Charms</span><span style="color:#d0c0e8">${G.charms.length}</span></div>
      <div class="stat-row"><span>Categories Leveled</span><span style="color:#e8d080">${Object.values(G.catLevels).filter(v=>v>0).length}</span></div>
    </div>
    <button class="btn btn-primary" onclick="newRun();showTitleScreen()" style="font-size:18px;padding:14px 42px;letter-spacing:1px">PLAY AGAIN</button>
  </div>`);
}

function showDefeat(){
  G.phase='defeat';const e=getEnemy();screenShake();playSound('defeat');
  showOverlay(`<div class="text-center">
    <div style="font-size:40px;margin-bottom:10px">\u{1F480}</div>
    <h2 style="color:#ff6b6b;font-size:28px;letter-spacing:1px">DEFEATED</h2>
    <p style="color:#a08080;margin:12px 0;font-style:italic">${e.name} overwhelmed you.</p>
    <div style="margin:20px auto;max-width:300px;background:rgba(15,12,30,0.5);padding:16px;border-radius:12px;border:1px solid rgba(120,80,200,0.2)">
      <div class="stat-row"><span>Score</span><span style="color:#e8d080">${fmt(G.cumulativeScore)} / ${fmt(G.targetScore)}</span></div>
      <div class="stat-row"><span>Trial</span><span style="color:#e8a0a0">${G.trial+1} \u2014 ${TRIALS[G.trial].name}</span></div>
      <div class="stat-row"><span>Encounter</span><span>${G.encounter+1}/4</span></div>
      <div class="stat-row"><span>Charms</span><span style="color:#d0c0e8">${G.charms.length}</span></div>
    </div>
    <button class="btn btn-primary" onclick="newRun();showTitleScreen()" style="padding:14px 42px;font-size:16px;letter-spacing:1px">TRY AGAIN</button>
  </div>`);
}

// ============================================================
// INIT
// ============================================================
newRun();
