'use client';
import { useState } from 'react';
import { auditMessage, aiMessage, callHref, whatsappHref } from '@/lib/config';

type EventName = 'whatsapp_click' | 'call_click' | 'audit_click' | 'ai_interest_click';
export function track(event: EventName, location: string) {
  const win = window as Window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, cta_location: location });
  window.dispatchEvent(new CustomEvent('portfolio:conversion', { detail: { event, location } }));
}
export function CTA({ children, kind = 'audit', location, secondary = false, message }: { children: React.ReactNode; kind?: 'audit' | 'call' | 'ai' | 'whatsapp'; location: string; secondary?: boolean; message?: string }) {
  const href = kind === 'call' ? callHref : whatsappHref(message || (kind === 'ai' ? aiMessage : auditMessage));
  return <a className={`btn ${secondary ? 'btn-secondary' : ''}`} href={href} target={kind === 'call' ? undefined : '_blank'} rel={kind === 'call' ? undefined : 'noopener noreferrer'} onClick={() => {track(kind === 'call' ? 'call_click' : 'whatsapp_click', location); if(kind === 'audit') track('audit_click',location); if(kind === 'ai') track('ai_interest_click',location);}}>{children}</a>;
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="nav-wrap"><a className="brand" href="#top" aria-label="Prakash Ravikumar home"><span className="brand-mark">pr<span>.</span></span><span>PRAKASH RAVIKUMAR<small>School Admission Engine + AI</small></span></a><button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}>{open ? 'Close' : 'Menu'}</button><nav id="main-navigation" className={open ? 'nav open' : 'nav'} aria-label="Main navigation"><a onClick={()=>setOpen(false)} href="#engine">The system</a><a onClick={()=>setOpen(false)} href="#ai">AI for schools</a><a onClick={()=>setOpen(false)} href="#about">About</a><CTA location="navigation">Free school audit</CTA></nav></div></header>;
}
const questions = ['Can parents easily find your school on Google?', 'Does your website make it easy to WhatsApp or call?', 'Does your website clearly explain why parents should choose your school?', 'Is your Instagram regularly active?', 'Do you create useful Reels/videos?', 'Do you have strong genuine Google reviews?', 'Can parents book a school visit easily?', 'Do you know where every admission enquiry came from?', 'Does your team follow up every enquiry?', 'Can you see which parents need follow-up today?'];
export function AdmissionCheck() {
  const [answers,setAnswers] = useState<Record<number,boolean>>({});
  const answered = Object.keys(answers).length;
  const yes = Object.values(answers).filter(Boolean).length;
  const gaps = questions.filter((_,i)=>answers[i] === false);
  const message = `${auditMessage}\nI completed your Quick Digital Admission Check: ${yes} of 10 answered Yes.${gaps.length ? '\nI would like help with: '+gaps.join(' ') : ''}`;
  return <div className="checker"><div className="check-intro"><span className="pill">Quick Digital Admission Check</span><p>A starting conversation, not a scientific score. Answer all 10 questions to spot possible gaps.</p><div className="progress" role="progressbar" aria-label="Questions answered" aria-valuenow={answered} aria-valuemin={0} aria-valuemax={10}><span style={{width:`${answered*10}%`}} /></div><p className="small">{answered} of 10 answered</p></div><div className="questions">{questions.map((q,i)=><fieldset key={q}><legend><span>{String(i+1).padStart(2,'0')}</span>{q}</legend><div className="yes-no">{[true,false].map(value=><button key={String(value)} type="button" aria-pressed={answers[i] === value} className={answers[i] === value ? 'selected' : ''} onClick={()=>setAnswers({...answers,[i]:value})}>{value ? 'Yes' : 'No'}</button>)}</div></fieldset>)}</div><div className="check-result" aria-live="polite">{answered === 10 ? <><h3>{yes} of 10 areas are in place.</h3><p>{yes === 10 ? 'You have useful foundations. A full audit can explore how well they work together.' : `Your school may have opportunities to improve its digital admission journey. Start by reviewing the ${10-yes} areas you marked No.`}</p><CTA location="check-result" message={message}>Get a complete free audit on WhatsApp</CTA><button className="text-button" onClick={()=>setAnswers({})}>Start again</button></> : <p>Choose Yes or No for every question to see your readiness result.</p>}</div></div>;
}
const conversations = [
 ['How many new admission enquiries came this week?', '24 enquiries are recorded.'],
 ['How many still need follow-up?', '7 currently require follow-up.'],
 ["Show tomorrow’s scheduled school visits.", '4 visits are scheduled.']
];
export function SchoolDemo() {
 const [selected,setSelected] = useState(0);
 return <div className="phone-demo"><div className="phone-top"><span>9:41</span><span>DEMO</span></div><div className="phone-heading"><span className="mini-icon">✦</span><div>Your School Assistant<small>Connected to approved school data</small></div></div><div className="chat"><p className="chat-role">SCHOOL OWNER</p><div className="chat-owner">{conversations[selected][0]}</div><p className="chat-role">AI ASSISTANT · DEMO DATA</p><div className="chat-ai">{conversations[selected][1]}<small>Source: example admission CRM</small></div></div><p className="small demo-prompt">Try another example</p><div className="chat-options">{['This week’s enquiries','Follow-up due','Tomorrow’s visits'].map((label,i)=><button key={label} onClick={()=>setSelected(i)} aria-pressed={selected===i}>{label}</button>)}</div><div className="phone-note">Answers stay within your school’s authorised information.</div></div>;
}
const demoRecords = [
 {name:'Priya',stage:'Visit Scheduled',source:'Google',next:'Confirm school visit'},
 {name:'Karthik',stage:'Follow-up',source:'Instagram',next:'Call back as requested'},
 {name:'Divya',stage:'New Enquiry',source:'Website',next:'Send admission information'},
 {name:'Arun',stage:'Admitted',source:'Referral',next:'Completed'}
];
export function CRMDemo() {
 const [filter,setFilter] = useState('All');
 const records = filter === 'All' ? demoRecords : demoRecords.filter(x=>x.stage==='Follow-up');
 return <div className="crm"><div className="crm-head"><div><strong>Admission desk</strong><span>EXAMPLE RECORDS · DEMO ONLY</span></div><div className="crm-filters">{['All','Follow-up due'].map(x=><button key={x} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}</button>)}</div></div><div className="crm-table-wrap"><table><caption className="sr-only">Fictional admission enquiry records</caption><thead><tr><th>Parent</th><th>Status</th><th>Source</th><th>Next action</th></tr></thead><tbody>{records.map((x,i)=><tr key={x.name}><td><span className="avatar">{x.name[0]}</span><strong>{x.name}</strong></td><td><span className={`status status-${i}`}>{x.stage}</span></td><td>{x.source}</td><td>{x.next}</td></tr>)}</tbody></table></div></div>;
}
export function ConversionBars() {
 return <><a className="floating-wa" aria-label="WhatsApp Prakash for a free school audit" href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={()=>{track('whatsapp_click','floating');track('audit_click','floating');}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z"/><path d="M8 7c0 4 2 6 6 7l1-2-2-1-1 1-2-2 1-1-1-2Z"/></svg></a><div className="mobile-bar"><CTA kind="call" location="mobile-sticky" secondary>Call Prakash</CTA><CTA location="mobile-sticky">WhatsApp Prakash</CTA></div></>;
}
