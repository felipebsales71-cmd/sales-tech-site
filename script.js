(() => {
  const config = window.SALES_TECH_CONFIG || {};
  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  const currentYear = $('#currentYear');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const menuButton = $('#menuButton');
  const siteNav = $('#siteNav');
  if (menuButton && siteNav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      siteNav.classList.toggle('open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    $$('#siteNav a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) closeMenu();
    });
  }

  const whatsappLink = $('#whatsappLink');
  if (whatsappLink && config.whatsappNumber && !String(config.whatsappNumber).includes('X')) {
    const message = encodeURIComponent(config.whatsappMessage || 'Olá! Gostaria de falar com a Sales Tech.');
    whatsappLink.href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
  } else if (whatsappLink) {
    whatsappLink.href = '#';
    whatsappLink.addEventListener('click', (event) => {
      event.preventDefault();
      alert('WhatsApp comercial ainda não configurado.');
    });
  }

  const instagramLink = $('#instagramLink');
  if (instagramLink && config.instagramUrl && !String(config.instagramUrl).includes('SEUINSTAGRAM')) {
    instagramLink.href = config.instagramUrl;
    instagramLink.target = '_blank';
    instagramLink.rel = 'noopener noreferrer';
  } else if (instagramLink) {
    instagramLink.href = '#';
    instagramLink.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Instagram da Sales Tech ainda não configurado.');
    });
  }

  const projects = $$('.project-card');
  const dots = $$('#projectDots button');
  const prevButton = $('#prevProject');
  const nextButton = $('#nextProject');
  let projectIndex = 0;

  const syncVideos = () => {
    projects.forEach((project, index) => {
      const frame = $('.video-frame', project);
      if (!frame) return;
      frame.dataset.videoUrl = (config.demoVideos && config.demoVideos[index]) || '';
      frame.setAttribute('role', 'button');
      frame.setAttribute('tabindex', '0');
      frame.setAttribute('aria-label', `Abrir demonstração em vídeo do projeto ${index + 1}`);
    });
  };

  const showProject = (index) => {
    if (!projects.length) return;
    projectIndex = (index + projects.length) % projects.length;
    projects.forEach((card, idx) => card.classList.toggle('active', idx === projectIndex));
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === projectIndex));
  };

  prevButton?.addEventListener('click', () => showProject(projectIndex - 1));
  nextButton?.addEventListener('click', () => showProject(projectIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => showProject(Number(dot.dataset.go))));

  const modal = $('#videoModal');
  const modalContent = $('#videoModalContent');
  const closeButtons = $$('[data-close-modal]');

  const youtubeId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1);
      if (parsed.hostname.includes('youtube.com')) {
        if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2];
        if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2];
        return parsed.searchParams.get('v');
      }
    } catch (_) {}
    return null;
  };

  const openVideo = (url) => {
    if (!modal || !modalContent) return;
    if (!url) {
      alert('Esta demonstração em vídeo será adicionada em breve.');
      return;
    }

    const yt = youtubeId(url);
    if (yt) {
      modalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(yt)}?autoplay=1&rel=0" title="Demonstração Sales Tech" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      const safeUrl = String(url).replace(/"/g, '&quot;');
      modalContent.innerHTML = `<video src="${safeUrl}" controls autoplay playsinline></video>`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeVideo = () => {
    if (!modal || !modalContent) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalContent.innerHTML = '';
  };

  $$('.video-frame').forEach((frame) => {
    const activate = () => openVideo(frame.dataset.videoUrl || '');
    frame.addEventListener('click', activate);
    frame.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
  closeButtons.forEach((button) => button.addEventListener('click', closeVideo));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeVideo();
  });

  syncVideos();
  showProject(0);

  const diagnosticForm = $('#diagnosticForm');
  if (diagnosticForm) {
    const submitButton = $('button[type="submit"]', diagnosticForm);
    const formNote = $('.form-note', diagnosticForm);
    const originalButtonHtml = submitButton?.innerHTML || 'Enviar solicitação';

    if (submitButton) submitButton.innerHTML = 'Enviar solicitação <span>↗</span>';
    if (formNote) {
      formNote.textContent = 'Ao enviar, seus dados serão encaminhados ao e-mail comercial da Sales Tech por um serviço de formulário.';
    }

    diagnosticForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const email = String(config.contactEmail || '').trim();
      const value = (id) => document.getElementById(id)?.value.trim() || '';
      const name = value('leadName');
      const company = value('leadCompany');
      const city = value('leadCity');
      const contact = value('leadContact');
      const problem = value('leadProblem');

      if (!email || !name || !company || !contact || !problem) {
        if (formNote) formNote.textContent = 'Preencha os campos obrigatórios antes de enviar.';
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }
      if (formNote) formNote.textContent = 'Enviando sua solicitação...';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `Novo diagnóstico Sales Tech — ${company}`,
            _template: 'table',
            _honey: '',
            Nome: name,
            Empresa: company,
            Cidade: city || 'Não informado',
            Contato: contact,
            'Problema informado': problem,
            Origem: 'salestech.agency'
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.success === false) throw new Error(data.message || 'Falha no envio');

        diagnosticForm.reset();
        if (submitButton) submitButton.textContent = 'Solicitação enviada ✓';
        if (formNote) formNote.textContent = 'Recebemos sua solicitação. A Sales Tech entrará em contato pelos dados informados.';

        window.setTimeout(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHtml.replace('Preparar solicitação', 'Enviar solicitação');
          }
        }, 3500);
      } catch (error) {
        console.error('Falha ao enviar diagnóstico:', error);
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Tentar novamente <span>↗</span>';
        }
        if (formNote) formNote.textContent = `Não foi possível enviar agora. Você também pode escrever para ${email}.`;
      }
    }, true);
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();
