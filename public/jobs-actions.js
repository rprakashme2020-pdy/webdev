(() => {
  document.querySelectorAll('.job-grid article').forEach(card => {
    const title=card.querySelector('h3')?.textContent.trim()||'marketing role';
    const company=card.querySelector('h4')?.textContent.trim()||'the company';
    const message=`Hi Prakash, I want the FREE mock interview for the ${title} role at ${company}.`;
    const button=document.createElement('a');
    button.href=`https://wa.me/917397559527?text=${encodeURIComponent(message)}`;
    button.target='_blank';button.rel='noopener';button.className='job-whatsapp';
    button.textContent='WHATSAPP ME — FREE MOCK INTERVIEW ↗';
    button.style.cssText='display:block;width:100%;margin-top:14px;padding:12px 10px;border:1px solid #111;background:#ff5a45;color:#111;text-align:center;font:700 9px DM Mono,monospace;text-decoration:none;box-shadow:4px 4px 0 #111';
    button.addEventListener('mouseenter',()=>button.style.transform='translate(-2px,-2px)');
    button.addEventListener('mouseleave',()=>button.style.transform='');
    button.addEventListener('click',()=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'free_mock_interview_click',job_title:title,company})});
    card.appendChild(button);
  });
})();
