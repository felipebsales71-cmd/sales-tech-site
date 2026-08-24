(() => {
  const config = window.SALES_TECH_CONFIG || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const year = $('#currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = $('#menuButton');
  const nav = $('#siteNav');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('#siteNav a').forEach(a => a.addEventListener('click', closeMenu));

  const instagram = $('#instagramLink');
  if (instagram && config.instagramUrl) instagram.href = config.instagramUrl;
  ['directEmail','footerEmail','aboutEmail'].forEach(id => {
    const a = document.getElementById(id);
    if (a && config.contactEmail) {
      a.href = `mailto:${config.contactEmail}`;
      a.textContent = id === 'aboutEmail' ? `${config.contactEmail} →` : config.contactEmail;
    }
  });

  const params = new URLSearchParams(location.search);
  const refFromUrl = params.get('ref');
  if (refFromUrl) localStorage.setItem('salesTechRef', refFromUrl.slice(0, 80));
  const commercialRef = refFromUrl || localStorage.getItem('salesTechRef') || 'site-direto';

  const people = $('#calcPeople');
  const hours = $('#calcHours');
  const rate = $('#calcRate');
  const monthOut = $('#calcMonth');
  const yearOut = $('#calcYear');
  const calcCta = $('#calcCta');
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const calc = () => {
    const p = Math.max(0, Number(people?.value || 0));
    const h = Math.max(0, Number(hours?.value || 0));
    const r = Math.max(0, Number(rate?.value || 0));
    const monthly = p * h * r * 4.33;
    if (monthOut) monthOut.textContent = money.format(monthly);
    if (yearOut) yearOut.textContent = money.format(monthly * 12);
    return monthly;
  };
  [people, hours, rate].forEach(el => el?.addEventListener('input', calc));
  calc();
  calcCta?.addEventListener('click', () => {
    const problem = $('#leadProblem');
    if (problem && !problem.value.trim()) {
      problem.value = `Quero avaliar um processo manual que hoje custa aproximadamente ${money.format(calc())} por mês, segundo a estimativa do site.`;
    }
  });

  const form = $('#diagnosticForm');
  if (form) {
    const button = $('button[type="submit"]', form);
    const note = $('.form-note', form);
    const original = button?.innerHTML || 'Enviar solicitação';

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const value = id => document.getElementById(id)?.value.trim() || '';
      const name = value('leadName');
      const company = value('leadCompany');
      const city = value('leadCity');
      const contact = value('leadContact');
      const problem = value('leadProblem');

      if (!name || !company || !contact || !problem || !config.contactEmail) {
        if (note) note.textContent = 'Preencha os campos obrigatórios antes de enviar.';
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = 'Enviando...';
      }
      if (note) note.textContent = 'Enviando sua solicitação...';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${config.contactEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `Novo diagnóstico Sales Tech — ${company}`,
            _template: 'table',
            _honey: '',
            Nome: name,
            Empresa: company,
            Cidade: city || 'Não informado',
            Contato: contact,
            'Problema informado': problem,
            'Origem comercial': commercialRef,
            Origem: 'salestech.agency'
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.success === false) throw new Error(data.message || 'Falha no envio');

        form.reset();
        if (button) button.textContent = 'Solicitação enviada ✓';
        if (note) note.textContent = 'Recebemos sua solicitação. A Sales Tech entrará em contato pelos dados informados.';
        setTimeout(() => {
          if (button) {
            button.disabled = false;
            button.innerHTML = original;
          }
        }, 3500);
      } catch (err) {
        console.error(err);
        if (button) {
          button.disabled = false;
          button.innerHTML = 'Tentar novamente <span>↗</span>';
        }
        if (note) note.textContent = `Não foi possível enviar agora. Você também pode escrever para ${config.contactEmail}.`;
      }
    });
  }

  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
    reveals.forEach(el => observer.observe(el));
    setTimeout(() => {
      reveals.forEach(el => {
        if (!el.classList.contains('visible') && el.getBoundingClientRect().top < innerHeight * 1.2) {
          el.classList.add('visible');
        }
      });
    }, 800);
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const header = $('.site-header');
  const headerState = () => header?.classList.toggle('scrolled', scrollY > 15);
  headerState();
  addEventListener('scroll', headerState, { passive: true });
})();
