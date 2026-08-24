(() => {
  const init = () => {
    if (document.documentElement.dataset.salesTechV3 === 'ready') return;
    document.documentElement.dataset.salesTechV3 = 'ready';

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    const css = document.createElement('style');
    css.textContent = `
      :root{--v3-card:#0b1b2d;--v3-line:rgba(255,255,255,.09)}
      .v3-kicker{display:inline-flex;align-items:center;gap:9px;margin-bottom:16px;padding:7px 10px;border:1px solid rgba(92,232,255,.16);border-radius:999px;background:rgba(92,232,255,.045);color:#9fb4c9;font-size:9px;font-weight:850;letter-spacing:.11em;text-transform:uppercase}
      .v3-kicker i{width:7px;height:7px;border-radius:50%;background:var(--lime);box-shadow:0 0 0 5px rgba(145,245,193,.07)}
      .v3-trust{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,255,255,.015)}
      .v3-trust-grid{min-height:96px;display:grid;grid-template-columns:repeat(4,1fr);align-items:center}
      .v3-trust-item{padding:18px 26px;border-right:1px solid var(--line)}.v3-trust-item:last-child{border-right:0}
      .v3-trust-item strong,.v3-trust-item span{display:block}.v3-trust-item strong{font-size:13px}.v3-trust-item span{margin-top:5px;color:#7890a7;font-size:10px;line-height:1.5}
      .v3-featured{padding:105px 0 30px}.v3-featured-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:34px}.v3-featured-head .section-heading{margin:0}
      .v3-featured-grid{display:grid;grid-template-columns:1.2fr .9fr .9fr;gap:16px}.v3-case{position:relative;overflow:hidden;border:1px solid var(--v3-line);border-radius:24px;background:linear-gradient(145deg,rgba(20,39,64,.9),rgba(7,17,30,.92));min-height:390px;padding:28px;display:flex;flex-direction:column;transition:.25s ease}.v3-case:hover{transform:translateY(-4px);border-color:rgba(92,232,255,.25)}
      .v3-case:first-child{min-height:470px}.v3-case-type{color:var(--cyan);font-size:8px;letter-spacing:.13em;font-weight:900}.v3-case h3{font-size:30px;letter-spacing:-.04em;line-height:1.03;margin:14px 0 12px}.v3-case p{margin:0;color:#91a4b8;font-size:13px;line-height:1.65;max-width:500px}.v3-case ul{list-style:none;padding:0;margin:22px 0 26px}.v3-case li{padding:8px 0;color:#b8c6d5;font-size:11px;border-bottom:1px solid rgba(255,255,255,.05)}.v3-case li:before{content:'✓';color:var(--cyan);margin-right:8px}.v3-case a{margin-top:auto;color:var(--cyan);font-weight:850;font-size:11px}.v3-case-art{height:115px;margin:20px 0;border:1px solid rgba(255,255,255,.08);border-radius:17px;background:linear-gradient(145deg,#0f263e,#091625);padding:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:9px;align-items:end}.v3-case:first-child .v3-case-art{height:150px}.v3-bar{border-radius:8px 8px 4px 4px;background:linear-gradient(180deg,var(--cyan),rgba(92,232,255,.12));min-height:35px}.v3-bar:nth-child(2){height:72%}.v3-bar:nth-child(3){height:92%}
      .v3-calculator{padding:110px 0;background:linear-gradient(180deg,transparent,rgba(16,35,59,.38),transparent)}.v3-calc-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:60px;align-items:center}.v3-calc-card{border:1px solid var(--v3-line);border-radius:26px;background:linear-gradient(145deg,rgba(20,39,64,.85),rgba(8,18,31,.9));padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.24)}.v3-calc-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.v3-field label{display:block;color:#9cb0c4;font-size:10px;font-weight:800;margin-bottom:7px}.v3-field input{width:100%;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#081625;color:white;padding:13px 12px;outline:none}.v3-field input:focus{border-color:rgba(92,232,255,.42)}.v3-calc-result{margin-top:18px;padding:20px;border-radius:18px;border:1px solid rgba(92,232,255,.14);background:rgba(92,232,255,.045);display:grid;grid-template-columns:1fr 1fr;gap:16px}.v3-result-item small,.v3-result-item strong{display:block}.v3-result-item small{color:#7890a7;font-size:9px}.v3-result-item strong{font-size:27px;letter-spacing:-.035em;margin-top:4px}.v3-result-item:last-child strong{color:var(--cyan)}.v3-calc-note{color:#6f879d;font-size:9px;margin:13px 0 0}.v3-calc-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}
      .v3-ref-chip{display:none;position:fixed;right:18px;bottom:82px;z-index:31;padding:8px 11px;border:1px solid rgba(92,232,255,.18);border-radius:999px;background:rgba(7,16,28,.88);backdrop-filter:blur(14px);color:#90a7bc;font-size:9px}.v3-ref-chip.show{display:block}
      .v3-mobile-cta{display:none;position:fixed;z-index:35;left:12px;right:12px;bottom:12px;min-height:52px;border-radius:15px;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--cyan),#9df3ff);color:#06111c;font-size:13px;font-weight:900;box-shadow:0 16px 40px rgba(0,0,0,.38)}
      #portfolio.v3-portfolio .st-project-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}#portfolio.v3-portfolio .st-project:first-child{border-color:rgba(92,232,255,.22);box-shadow:0 18px 55px rgba(0,0,0,.17)}
      #portfolio.v3-portfolio .portfolio-honesty{max-width:760px}
      .v3-divider-label{display:flex;align-items:center;gap:14px;margin:34px 0 0;color:#71869d;font-size:9px;font-weight:850;letter-spacing:.12em;text-transform:uppercase}.v3-divider-label:before,.v3-divider-label:after{content:'';height:1px;background:var(--line);flex:1}
      @media(max-width:1050px){.v3-featured-grid{grid-template-columns:1fr 1fr}.v3-case:first-child{grid-column:1/-1;min-height:390px}.v3-calc-grid{grid-template-columns:1fr}.v3-trust-grid{grid-template-columns:repeat(2,1fr)}.v3-trust-item:nth-child(2){border-right:0}.v3-trust-item:nth-child(-n+2){border-bottom:1px solid var(--line)}}
      @media(max-width:760px){.v3-featured{padding-top:80px}.v3-featured-head{align-items:flex-start;flex-direction:column}.v3-featured-grid{grid-template-columns:1fr}.v3-case:first-child{grid-column:auto}.v3-case,.v3-case:first-child{min-height:0}.v3-calc-fields{grid-template-columns:1fr}.v3-calc-result{grid-template-columns:1fr}.v3-trust-grid{grid-template-columns:1fr}.v3-trust-item{border-right:0!important;border-bottom:1px solid var(--line)}.v3-trust-item:last-child{border-bottom:0}.v3-mobile-cta{display:flex}.v3-ref-chip{bottom:76px}.v3-calculator{padding:85px 0}.hero{min-height:auto}.hero h1{font-size:clamp(42px,12vw,62px)}}
    `;
    document.head.appendChild(css);

    // HERO: explica em segundos o que a empresa vende.
    const heroCopy = $('.hero-copy');
    if (heroCopy) {
      const oldEyebrow = $('.eyebrow', heroCopy);
      if (oldEyebrow) oldEyebrow.insertAdjacentHTML('beforebegin', '<div class="v3-kicker"><i></i> Boa Vista • atendimento para todo o Brasil</div>');
      const h1 = $('h1', heroCopy);
      const lead = $('.hero-lead', heroCopy);
      if (h1) h1.innerHTML = 'Sistemas sob medida para empresas que cansaram do <em>improviso.</em>';
      if (lead) lead.textContent = 'Transformamos planilhas, WhatsApp e tarefas manuais em sistemas, automações e dashboards construídos para a operação real da sua empresa.';
      const primary = $('.button-primary', heroCopy);
      if (primary) primary.innerHTML = 'Solicitar diagnóstico gratuito <span>↗</span>';
    }

    // Faixa objetiva de confiança.
    const proof = $('.proof-strip');
    if (proof) {
      const trust = document.createElement('section');
      trust.className = 'v3-trust';
      trust.innerHTML = `<div class="container v3-trust-grid">
        <div class="v3-trust-item"><strong>Desenvolvimento próprio</strong><span>Projetos construídos e versionados pela Sales Tech.</span></div>
        <div class="v3-trust-item"><strong>Atendimento nacional</strong><span>Operação remota a partir de Boa Vista, Roraima.</span></div>
        <div class="v3-trust-item"><strong>Escopo antes do código</strong><span>Primeiro entendemos o processo. Depois propomos tecnologia.</span></div>
        <div class="v3-trust-item"><strong>Evolução pós-entrega</strong><span>O sistema pode crescer quando existe motivo de negócio.</span></div>
      </div>`;
      proof.replaceWith(trust);
    }

    // Cases protagonistas para dar hierarquia ao portfólio.
    const portfolio = $('#portfolio');
    if (portfolio) {
      portfolio.classList.add('v3-portfolio');
      const featured = document.createElement('section');
      featured.className = 'v3-featured';
      featured.innerHTML = `<div class="container">
        <div class="v3-featured-head">
          <div class="section-heading"><div class="eyebrow"><span></span> PROJETOS EM DESTAQUE</div><h2>Software aplicado a <em>operações diferentes.</em></h2><p>Três exemplos que mostram a amplitude técnica da Sales Tech sem vender a ilusão de um produto genérico para todo mundo.</p></div>
          <a class="button button-ghost" href="#portfolio">Ver todos os projetos</a>
        </div>
        <div class="v3-featured-grid">
          <article class="v3-case"><span class="v3-case-type">GESTÃO FINANCEIRA</span><h3>Controle Financeiro</h3><p>Transforma lançamentos dispersos em uma visão centralizada de caixa, movimentações e relatórios.</p><div class="v3-case-art"><i class="v3-bar" style="height:42%"></i><i class="v3-bar"></i><i class="v3-bar"></i></div><ul><li>Entradas, saídas e categorias</li><li>Dashboard de acompanhamento</li><li>Relatórios e visão de caixa</li></ul><a href="#portfolio">Ver no portfólio →</a></article>
          <article class="v3-case"><span class="v3-case-type">EDUCAÇÃO</span><h3>Meu Inova</h3><p>Portal acadêmico, financeiro e administrativo com jornadas separadas para aluno e administração.</p><div class="v3-case-art"><i class="v3-bar" style="height:80%"></i><i class="v3-bar" style="height:52%"></i><i class="v3-bar" style="height:67%"></i></div><ul><li>Portal do aluno</li><li>Financeiro e avaliações</li><li>Gestão acadêmica</li></ul><a href="#portfolio">Ver no portfólio →</a></article>
          <article class="v3-case"><span class="v3-case-type">GESTÃO PÚBLICA • DADOS</span><h3>IPER Dashboard</h3><p>Painel de arrecadação previdenciária com filtros, indicadores, rankings e exportação de dados.</p><div class="v3-case-art"><i class="v3-bar" style="height:48%"></i><i class="v3-bar" style="height:76%"></i><i class="v3-bar" style="height:58%"></i></div><ul><li>Indicadores e filtros</li><li>Evolução por fundo</li><li>Ranking por órgão</li></ul><a href="#portfolio">Ver no portfólio →</a></article>
        </div>
      </div>`;
      portfolio.parentNode.insertBefore(featured, portfolio);
      const grid = $('.st-project-grid', portfolio);
      if (grid) grid.insertAdjacentHTML('beforebegin','<div class="v3-divider-label">Portfólio completo</div>');
    }

    // Calculadora comercial: transforma uma dor abstrata em custo mensal estimado.
    const process = $('#processo');
    if (process) {
      const calc = document.createElement('section');
      calc.className = 'v3-calculator';
      calc.id = 'calculadora';
      calc.innerHTML = `<div class="container v3-calc-grid">
        <div class="section-heading"><div class="eyebrow"><span></span> CUSTO DO PROCESSO MANUAL</div><h2>Quanto custa continuar fazendo isso <em>na mão?</em></h2><p>Uma conta simples ajuda a decidir se vale automatizar: pessoas envolvidas × horas gastas × custo do tempo. Não é promessa de economia; é um ponto de partida para o diagnóstico.</p></div>
        <div class="v3-calc-card">
          <div class="v3-calc-fields">
            <div class="v3-field"><label>Pessoas envolvidas</label><input id="v3People" type="number" min="1" step="1" value="2"></div>
            <div class="v3-field"><label>Horas por semana / pessoa</label><input id="v3Hours" type="number" min="0" step="0.5" value="5"></div>
            <div class="v3-field"><label>Custo médio por hora (R$)</label><input id="v3Cost" type="number" min="0" step="1" value="25"></div>
          </div>
          <div class="v3-calc-result"><div class="v3-result-item"><small>CUSTO ESTIMADO / MÊS</small><strong id="v3Monthly">R$ 1.082,50</strong></div><div class="v3-result-item"><small>CUSTO ESTIMADO / ANO</small><strong id="v3Yearly">R$ 12.990,00</strong></div></div>
          <p class="v3-calc-note">Estimativa usando 4,33 semanas por mês. O ganho real depende do processo, automação possível e custo de implantação.</p>
          <div class="v3-calc-actions"><a class="button button-primary" id="v3CalcCTA" href="#diagnostico">Quero avaliar esse processo ↗</a></div>
        </div>
      </div>`;
      process.parentNode.insertBefore(calc, process);

      const formatBRL = value => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value || 0);
      const recalc = () => {
        const people = Math.max(0, Number($('#v3People')?.value || 0));
        const hours = Math.max(0, Number($('#v3Hours')?.value || 0));
        const cost = Math.max(0, Number($('#v3Cost')?.value || 0));
        const monthly = people * hours * cost * 4.33;
        const yearly = monthly * 12;
        const m = $('#v3Monthly'), y = $('#v3Yearly');
        if (m) m.textContent = formatBRL(monthly);
        if (y) y.textContent = formatBRL(yearly);
        return {people,hours,cost,monthly,yearly};
      };
      ['v3People','v3Hours','v3Cost'].forEach(id => $('#'+id)?.addEventListener('input',recalc));
      recalc();
      $('#v3CalcCTA')?.addEventListener('click', () => {
        const r = recalc();
        const problem = $('#leadProblem');
        if (problem && !problem.value.trim()) problem.value = `Quero avaliar um processo manual que hoje envolve aproximadamente ${r.people} pessoa(s), ${r.hours} hora(s) por semana por pessoa e custo estimado de ${formatBRL(r.monthly)} por mês.`;
      });
    }

    // Referência comercial para João/Juan e demais canais.
    const url = new URL(location.href);
    const ref = (url.searchParams.get('ref') || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,32);
    if (ref) {
      sessionStorage.setItem('salesTechRef', ref);
      localStorage.setItem('salesTechLastRef', ref);
    }
    const currentRef = ref || sessionStorage.getItem('salesTechRef') || localStorage.getItem('salesTechLastRef') || '';
    const refChip = document.createElement('div');
    refChip.className = 'v3-ref-chip' + (currentRef ? ' show' : '');
    refChip.textContent = currentRef ? `Atendimento indicado por: ${currentRef}` : '';
    document.body.appendChild(refChip);

    // Intercepta apenas o envio ao FormSubmit para anexar a origem comercial.
    if (currentRef && !window.__salesTechFetchWrapped) {
      window.__salesTechFetchWrapped = true;
      const originalFetch = window.fetch.bind(window);
      window.fetch = (input, init = {}) => {
        const target = typeof input === 'string' ? input : input?.url || '';
        if (target.includes('formsubmit.co/ajax/') && typeof init.body === 'string') {
          try {
            const payload = JSON.parse(init.body);
            payload['Origem comercial'] = currentRef;
            init = {...init, body: JSON.stringify(payload)};
          } catch (_) {}
        }
        return originalFetch(input, init);
      };
    }

    // CTA fixo somente no mobile.
    if (!$('.v3-mobile-cta')) {
      const mobileCTA = document.createElement('a');
      mobileCTA.className = 'v3-mobile-cta';
      mobileCTA.href = '#diagnostico';
      mobileCTA.textContent = 'Solicitar diagnóstico gratuito';
      document.body.appendChild(mobileCTA);
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(init, 120));
  else setTimeout(init, 120);
})();