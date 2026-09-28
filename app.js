(() => {
const phone='917397559527';
const services={
A:{label:'AI POWERED',title:'Yes, I create with AI.',description:'AI posters, videos and practical automation built for business.',message:'Hi Prakash, I am interested in AI content or automation.'},
B:{label:'BRAND IDENTITY',title:'Yes, I build brands.',description:'Clear visual identities and brand systems people remember.',message:'Hi Prakash, I need help with branding.'},
C:{label:'CONTENT CREATION',title:'Yes, I create content.',description:'Useful content strategies, copy and campaigns that earn attention.',message:'Hi Prakash, I need content creation support.'},
D:{label:'DIGITAL DESIGN',title:'Yes, I design.',description:'Professional digital creatives, campaign visuals and social graphics.',message:'Hi Prakash, I need digital design support.'},
E:{label:'EMAIL MARKETING',title:'Yes, I build email campaigns.',description:'Focused email content that nurtures interest and drives action.',message:'Hi Prakash, I want to discuss email marketing.'},
G:{label:'GOOGLE PRESENCE',title:'Yes, I help you get found.',description:'Google Business Profile support and search-ready digital foundations.',message:'Hi Prakash, I need help improving my Google presence.'},
M:{label:'SOCIAL MEDIA',title:'Yes, I manage social media.',description:'Planning, publishing and creative management for consistent growth.',message:'Hi Prakash, I need social media management.'},
R:{label:'REELS & SHORT VIDEO',title:'Yes, I create reels.',description:'Short-form video concepts and edits designed to stop the scroll.',message:'Hi Prakash, I need reels and short videos.'},
S:{label:'SEARCH VISIBILITY',title:'Yes, I do SEO.',description:'Search-friendly websites and content that help customers discover you.',message:'Hi Prakash, I need SEO support.'},
V:{label:'AI VIDEO',title:'Yes, I create AI videos.',description:'Distinctive AI-assisted promotional videos made for your brand.',message:'Hi Prakash, I am interested in AI video creation.'},
W:{label:'WEB DEVELOPMENT',title:'Yes, I build websites.',description:'Fast, mobile-friendly websites designed to turn visits into enquiries.',message:'Hi Prakash, I would like to build a website.'},
P:{label:'PHONE',title:'Call Prakash.',description:'+91 73975 59527 — let’s talk about what your business needs.',action:'CALL NOW ↗',href:'tel:+917397559527',event:'call_click'},
L:{label:'LOCATIONS',title:'Pondicherry. Bangalore. Chennai.',description:'Available for local businesses and remote projects everywhere.',message:'Hi Prakash, I would like to discuss a project in my city.'}};
const grid=document.querySelector('#keyGrid'),content=document.querySelector('#screenContent'),display=document.querySelector('#keyDisplay'),label=document.querySelector('#screenLabel'),title=document.querySelector('#screenTitle'),description=document.querySelector('#screenDescription'),action=document.querySelector('#screenAction');
function track(name,details={}){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...details})}
function selectKey(rawKey){const key=rawKey.toUpperCase();if(!/^[A-Z]$/.test(key))return;const item=services[key];document.querySelectorAll('[data-key]').forEach(b=>b.classList.toggle('active',b.dataset.key===key));content.classList.add('changing');setTimeout(()=>{display.textContent=key;if(item){label.textContent=item.label;title.textContent=item.title;description.textContent=item.description;action.textContent=item.action||'START A CONVERSATION ↗';action.href=item.href||`https://wa.me/${phone}?text=${encodeURIComponent(item.message)}`;action.target=item.href?'':'_blank';action.rel=item.href?'':'noopener';action.dataset.event=item.event||'whatsapp_click';track('service_key_selected',{key,service:item.label})}else{label.textContent='NO MATCH FOUND';title.textContent='Sorry, no matching service found.';description.textContent='Try W, S, C, D, M, A, P or L—or tell me what you need on WhatsApp.';action.textContent='ASK PRAKASH ↗';action.href=`https://wa.me/${phone}?text=${encodeURIComponent('Hi Prakash, I need a digital service and would like to know if you can help.')}`;action.target='_blank';action.rel='noopener';action.dataset.event='whatsapp_click';track('no_match_key',{key})}action.classList.remove('hidden');content.classList.remove('changing')},160)}
const keyboardRows=[
  [{t:'esc',w:1.2},'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',{t:'del',w:1.2}],
  ['`','1','2','3','4','5','6','7','8','9','0','-','=',{t:'backspace',w:2}],
  [{t:'tab',w:1.5},'Q','W','E','R','T','Y','U','I','O','P','[',']',{t:'\\',w:1.5}],
  [{t:'caps',w:1.8},'A','S','D','F','G','H','J','K','L',';',{t:"'"},{t:'enter',w:2.2}],
  [{t:'shift',w:2.2},'Z','X','C','V','B','N','M',',','.','/',{t:'shift',w:2.7}],
  [{t:'ctrl',w:1.3},{t:'fn',w:1.1},{t:'⊞',w:1.1},{t:'alt',w:1.2},{t:'',w:6},{t:'alt',w:1.2},{t:'ctrl',w:1.2},{t:'◀',w:1},{t:'▲▼',w:1},{t:'▶',w:1}]
];
keyboardRows.forEach((row,rowIndex)=>{const rowElement=document.createElement('div');rowElement.className=`key-row row-${rowIndex+1}`;row.forEach(item=>{const config=typeof item==='string'?{t:item}:item;const key=config.t;const b=document.createElement('button');b.type='button';b.textContent=key||' ';b.style.setProperty('--key-width',config.w||1);const isLetter=/^[A-Z]$/.test(key);if(isLetter){b.dataset.key=key;b.setAttribute('aria-label',`Select ${key}`);b.addEventListener('click',()=>selectKey(key))}else{b.classList.add('utility-key');b.tabIndex=-1;b.setAttribute('aria-hidden','true')}rowElement.appendChild(b)});grid.appendChild(rowElement)});
document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>selectKey(b.dataset.key)));
document.addEventListener('keydown',e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.repeat)return;if(/^[a-z]$/i.test(e.key))selectKey(e.key)});
action.addEventListener('click',()=>track(action.dataset.event||'screen_action_click',{selected_key:display.textContent}));
document.querySelectorAll('.track-whatsapp').forEach(a=>a.addEventListener('click',()=>track('whatsapp_click',{placement:a.closest('.mobile-contact')?'mobile_bar':'page'})));
document.querySelectorAll('.track-call').forEach(a=>a.addEventListener('click',()=>track('call_click',{placement:a.closest('.mobile-contact')?'mobile_bar':'page'})));
})();
