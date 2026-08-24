(() => {
  const style = document.createElement('style');
  style.textContent = `
    .brand{gap:12px;letter-spacing:-.03em}
    .brand-mark{width:44px;height:44px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(180deg,rgba(22,40,63,.96),rgba(8,19,34,.96));border:1px solid rgba(92,232,255,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 12px 28px rgba(0,0,0,.28)}
    .brand-mark span{display:none!important}
    .brand-mark svg{width:28px;height:28px;display:block}
    .brand>span{display:flex;align-items:baseline;gap:2px}
    .brand>span span{color:var(--cyan)}

    #problemas .section-heading h2{max-width:980px;font-size:clamp(46px,5vw,78px);line-height:.95}
    .problem-card b{display:block;margin-bottom:22px;font-size:28px;line-height:1;color:var(--cyan);font-weight:900;letter-spacing:-.03em}
    .problem-card h3{margin-top:0}

    .process-list article{display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:start;padding:30px 0;border-bottom:1px solid rgba(255,255,255,.08)}
    .process-list article span{display:block;color:var(--cyan);font-size:28px;line-height:1;font-weight:900;letter-spacing:-.03em;padding-top:3px}

    .about-card{background:linear-gradient(145deg,rgba(255,255,255,.03),rgba(255,255,255,.015));border-color:rgba(255,255,255,.08)}
    .about-card .about-mark{background:linear-gradient(135deg,#7fefff,#48c9ff);box-shadow:0 12px 36px rgba(92,232,255,.18)}
    .about-card span{font-size:12px;color:#9bb0c4}

    .portfolio-scroll-hint{display:none}
    @media(max-width:760px){
      .st-project-grid{display:flex!important;overflow-x:auto;gap:14px;scroll-snap-type:x mandatory;padding-bottom:12px;margin-inline:-2px;padding-left:2px}
      .st-project-grid::-webkit-scrollbar{display:none}
      .st-project{min-width:86%;scroll-snap-align:start}
      .st-project p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;overflow:hidden}
      .st-project-tags span:nth-child(n+4){display:none}
      .portfolio-scroll-hint{display:block;color:#95a8bc;font-size:12px;margin:14px 0 10px}
      .problem-card b,.process-list article span{font-size:24px}
      .process-list article{grid-template-columns:56px 1fr;padding:22px 0}
    }

    .social-grid-v4{display:grid;grid-template-columns:.92fr 1.08fr;gap:44px;align-items:center}
    .social-showcase{display:grid;grid-template-columns:1.15fr .85fr;gap:16px}
    .social-primary-post,.social-mini-post{border:1px solid rgba(255,255,255,.08);border-radius:24px;background:linear-gradient(165deg,#091526,#0d1d31);overflow:hidden;position:relative}
    .social-primary-post{min-height:440px;padding:20px}
    .social-mini-stack{display:grid;gap:16px}
    .social-mini-post{min-height:212px;padding:18px}
    .social-topbar{display:flex;align-items:center;justify-content:space-between;color:#cfe4f7;font-size:12px;font-weight:800;letter-spacing:.01em;margin-bottom:18px}
    .social-avatar{display:flex;align-items:center;gap:10px}
    .social-avatar i{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#6eefff,#57cfff);color:#08111f;font-style:normal;font-weight:900}
    .social-chip{padding:6px 10px;border-radius:999px;background:rgba(92,232,255,.08);border:1px solid rgba(92,232,255,.14);color:var(--cyan);font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
    .social-post-body{display:flex;flex-direction:column;justify-content:space-between;height:calc(100% - 48px)}
    .social-eyebrow{color:var(--cyan);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
    .social-primary-post h3,.social-mini-post h3{margin:10px 0 0;line-height:.98;letter-spacing:-.04em;color:#f4f8fd}
    .social-primary-post h3{font-size:48px;max-width:340px}
    .social-mini-post h3{font-size:28px;max-width:240px}
    .social-post-footer{display:flex;align-items:center;justify-content:space-between;color:#8fa2b7;font-size:11px;font-weight:700;padding-top:18px}
    .social-glow{position:absolute;inset:auto auto 24px 24px;width:180px;height:180px;border-radius:999px;background:radial-gradient(circle,rgba(92,232,255,.28),transparent 65%);filter:blur(4px);pointer-events:none}
    .social-grid-v4 .button{width:max-content}
    .social-caption{color:#8ea3b7;font-size:13px;line-height:1.65;max-width:540px}
    @media(max-width:980px){
      .social-grid-v4{grid-template-columns:1fr;gap:28px}
      .social-showcase{grid-template-columns:1fr;gap:14px}
      .social-primary-post{min-height:340px}
      .social-mini-stack{grid-template-columns:1fr 1fr}
      .social-primary-post h3{font-size:40px}
    }
    @media(max-width:760px){
      .social-mini-stack{grid-template-columns:1fr}
      .social-primary-post{min-height:300px;padding:18px}
      .social-mini-post{min-height:170px;padding:16px}
      .social-primary-post h3{font-size:34px;max-width:260px}
      .social-mini-post h3{font-size:22px;max-width:220px}
    }
  `;
  document.head.appendChild(style);

  const logoSvg = `
    <svg viewBox="0 0 48 48" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#84f3ff"/>
          <stop offset="100%" stop-color="#4ebeff"/>
        </linearGradient>
      </defs>
      <path d="M8 14.5c0-2 1.6-3.5 3.5-3.5h18.5c1.7 0 3 1.3 3 3s-1.3 3-3 3H15c-1.4 0-2.5 1.1-2.5 2.5S13.6 22 15 22h8.8c1.7 0 3 1.3 3 3s-1.3 3-3 3H15.2C11.2 28 8 24.8 8 20.8v-6.3Z" fill="url(#stg)"/>
      <path d="M39.5 16.5c0-1.9-1.6-3.5-3.5-3.5H21.7c-1.7 0-3 1.3-3 3s1.3 3 3 3h11.6c1.4 0 2.5 1.1 2.5 2.5S34.7 24 33.3 24h-8.1c-1.7 0-3 1.3-3 3s1.3 3 3 3H36c4 0 7.2-3.2 7.2-7.2v-6.3Z" fill="url(#stg)" opacity=".95"/>
      <rect x="8" y="31.5" width="15" height="5.5" rx="2.75" fill="url(#stg)" opacity=".9"/>
      <rect x="26" y="31.5" width="14" height="5.5" rx="2.75" fill="url(#stg)" opacity=".9"/>
    </svg>`;
  document.querySelectorAll('.brand-mark').forEach(mark => {
    mark.innerHTML = logoSvg;
  });

  document.querySelectorAll('*').forEach((el) => {
    if (el.children.length === 0) {
      const txt = el.textContent.trim();
      if (txt.includes('BOA VISTA')) {
        el.textContent = 'ATENDIMENTO EM TODO O BRASIL';
      }
    }
  });

  const aboutCard = document.querySelector('.about-card');
  if (aboutCard) {
    aboutCard.innerHTML = `
      <div>
        <div class="about-mark">ST</div>
        <strong>Sales Tech</strong>
        <span>Atendimento em todo o Brasil</span>
        <span>Operação remota • soluções sob medida</span>
      </div>`;
  }

  const socialGrid = document.querySelector('#conteudo .social-grid');
  if (socialGrid) {
    socialGrid.classList.add('social-grid-v4');
    socialGrid.innerHTML = `
      <div class="social-copy reveal">
        <div class="eyebrow"><span></span> CONTEÚDO</div>
        <h2>Bastidores, demonstrações e <em>tecnologia aplicada.</em></h2>
        <p class="social-caption">A Sales Tech usa o Instagram para mostrar soluções de forma mais concreta: problemas reais, ideias de automação, antes e depois de processos e demonstrações do que está sendo construído.</p>
        <a class="button button-primary instagram-button" href="https://instagram.com/salestech.rr" id="instagramLinkV4" target="_blank" rel="noopener">Acompanhar no Instagram ↗</a>
      </div>
      <div class="social-showcase reveal delay-1" aria-label="Prévia do conteúdo da Sales Tech no Instagram">
        <article class="social-primary-post">
          <div class="social-topbar"><div class="social-avatar"><i>ST</i><span>@salestech.rr</span></div><span class="social-chip">Conteúdo real</span></div>
          <div class="social-post-body">
            <div>
              <div class="social-eyebrow">PROCESSO</div>
              <h3>Primeiro a dor. Depois a tecnologia.</h3>
            </div>
            <div class="social-post-footer"><span>Sales Tech</span><span>Veja no Instagram</span></div>
          </div>
          <div class="social-glow"></div>
        </article>
        <div class="social-mini-stack">
          <article class="social-mini-post">
            <div class="social-topbar"><div class="social-avatar"><i>ST</i><span>salestech.rr</span></div><span>• • •</span></div>
            <div class="social-post-body">
              <div>
                <div class="social-eyebrow">SISTEMAS</div>
                <h3>Planilha resolve até o dia em que vira gargalo.</h3>
              </div>
              <div class="social-post-footer"><span>Post educativo</span><span>↗</span></div>
            </div>
          </article>
          <article class="social-mini-post">
            <div class="social-topbar"><div class="social-avatar"><i>ST</i><span>salestech.rr</span></div><span>• • •</span></div>
            <div class="social-post-body">
              <div>
                <div class="social-eyebrow">AUTOMAÇÃO</div>
                <h3>Seu time ainda repete esse processo todo dia?</h3>
              </div>
              <div class="social-post-footer"><span>Post de diagnóstico</span><span>↗</span></div>
            </div>
          </article>
        </div>
      </div>`;
  }

  const portfolioGrid = document.querySelector('.st-project-grid');
  if (portfolioGrid && !document.querySelector('.portfolio-scroll-hint')) {
    const hint = document.createElement('div');
    hint.className = 'portfolio-scroll-hint';
    hint.textContent = 'Arraste para ver os projetos →';
    portfolioGrid.parentNode.insertBefore(hint, portfolioGrid);
  }
})();
