(() => {
  const laptop=document.querySelector('.laptop');
  const stage=document.querySelector('.stage');
  const screen=document.querySelector('.screen');
  const trackpad=document.querySelector('.trackpad');
  const screenBar=document.querySelector('.screen-bar');
  const cursor=document.createElement('span');
  const toast=document.createElement('div');
  cursor.className='os-cursor';toast.className='command-toast';toast.setAttribute('role','status');
  screen.append(cursor,toast);
  trackpad.removeAttribute('aria-hidden');trackpad.setAttribute('role','application');trackpad.setAttribute('aria-label','Laptop trackpad: drag to move the screen cursor and tap to select');trackpad.tabIndex=0;

  const sound=document.createElement('button');sound.type='button';sound.className='sound-toggle';sound.textContent='SOUND OFF';sound.setAttribute('aria-pressed','false');screenBar.insertBefore(sound,screenBar.lastElementChild);
  let soundOn=false,audioContext=null;
  sound.addEventListener('click',()=>{soundOn=!soundOn;sound.classList.toggle('on',soundOn);sound.textContent=soundOn?'SOUND ON':'SOUND OFF';sound.setAttribute('aria-pressed',String(soundOn));if(soundOn&&!audioContext)audioContext=new(window.AudioContext||window.webkitAudioContext)()});
  function clickSound(){if(!soundOn||!audioContext)return;const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.value=150;gain.gain.setValueAtTime(.035,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.045);osc.connect(gain).connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+.05)}
  document.addEventListener('keydown',event=>{if(/^[a-z]$/i.test(event.key))clickSound()});
  document.querySelector('#keyGrid').addEventListener('click',event=>{if(event.target.closest('[data-key]'))clickSound()});

  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){stage.addEventListener('pointermove',event=>{const rect=stage.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;stage.style.setProperty('--glow-x',`${x*100}%`);stage.style.setProperty('--glow-y',`${y*100}%`);laptop.style.transform=`rotateY(${(x-.5)*4}deg) rotateX(${(.5-y)*3}deg)`});stage.addEventListener('pointerleave',()=>laptop.style.transform='')}

  let cursorX=.5,cursorY=.5,start=null,moved=0;
  function placeCursor(){cursor.style.left=`${cursorX*100}%`;cursor.style.top=`${cursorY*100}%`}
  trackpad.addEventListener('pointerdown',event=>{start={x:event.clientX,y:event.clientY,lastX:event.clientX,lastY:event.clientY};moved=0;trackpad.setPointerCapture(event.pointerId);screen.classList.add('trackpad-active')});
  trackpad.addEventListener('pointermove',event=>{if(!start)return;const rect=trackpad.getBoundingClientRect(),dx=(event.clientX-start.lastX)/rect.width,dy=(event.clientY-start.lastY)/rect.height;cursorX=Math.max(.02,Math.min(.98,cursorX+dx*1.7));cursorY=Math.max(.03,Math.min(.97,cursorY+dy*1.7));moved+=Math.abs(event.clientX-start.lastX)+Math.abs(event.clientY-start.lastY);start.lastX=event.clientX;start.lastY=event.clientY;placeCursor()});
  trackpad.addEventListener('pointerup',event=>{if(start&&moved<8){const rect=screen.getBoundingClientRect(),target=document.elementFromPoint(rect.left+cursorX*rect.width,rect.top+cursorY*rect.height);if(target&&target!==cursor&&target.closest('button,a'))target.closest('button,a').click()}start=null});

  let buffer='';function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2200)}
  const commands={PRAKASH:()=>{document.querySelector('[data-app="about"]').click();showToast('FOUNDER PROFILE UNLOCKED')},GROW:()=>{document.querySelector('[data-app="services"]').click();showToast('GROWTH MODE ACTIVATED')},HELP:()=>showToast('TRY: W · M · S · B · A · P · L · HIRE'),HIRE:()=>{document.querySelector('[data-app="contact"]').click();showToast('LET\'S START A PROJECT')}};
  document.addEventListener('keydown',event=>{if(!/^[a-z]$/i.test(event.key))return;buffer=(buffer+event.key.toUpperCase()).slice(-12);Object.entries(commands).forEach(([command,action])=>{if(buffer.endsWith(command)){action();buffer=''}})});

  const cores=navigator.hardwareConcurrency||4,memory=navigator.deviceMemory||4;if(cores<=4||memory<=4||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('low-power');
})();
