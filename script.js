(() => {
  "use strict";

  const config = window.SALES_TECH_CONFIG || {};
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const text = (value, fallback = "") => {
    const normalized = String(value ?? "").trim();
    return normalized || fallback;
  };

  const currentYear = $("#currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  /* Cabeçalho e menu */
  const header = $(".header");
  const menuButton = $("#menuButton");
  const nav = $("#siteNav");

  const closeMenu = () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    nav?.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
    nav?.classList.toggle("open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  $$("#siteNav a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (!nav?.classList.contains("open")) return;
    if (nav.contains(event.target) || menuButton?.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Canais comerciais */
  const whatsappNumber = text(config.whatsappNumber).replace(/\D/g, "");
  const defaultWhatsappMessage = text(
    config.whatsappMessage,
    "Olá! Vim pelo site da Sales Tech e gostaria de conversar."
  );

  const whatsappUrl = (customMessage) => {
    const message = text(customMessage, defaultWhatsappMessage);
    if (!whatsappNumber) return "#contato";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  $$("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.message);
    if (whatsappNumber) {
      link.target = "_blank";
      link.rel = "noopener";
    }
  });

  const whatsappDisplay = $("#whatsappDisplay");
  if (whatsappDisplay && config.whatsappDisplay) {
    whatsappDisplay.textContent = text(config.whatsappDisplay);
  }

  const instagramUrl = text(config.instagramUrl);
  $$("[data-instagram]").forEach((link) => {
    if (!instagramUrl) {
      link.hidden = true;
      return;
    }
    link.href = instagramUrl;
    link.target = "_blank";
    link.rel = "noopener";
  });

  ["directEmail", "footerEmail", "aboutEmail"].forEach((id) => {
    const link = document.getElementById(id);
    const email = text(config.contactEmail);
    if (!link || !email) return;
    link.href = `mailto:${email}`;
    if (id !== "footerEmail") {
      const strong = link.querySelector("strong");
      if (strong) strong.textContent = email;
      else link.textContent = email;
    }
  });

  /* Origem comercial simples */
  const params = new URLSearchParams(window.location.search);
  const refFromUrl = text(params.get("ref")).slice(0, 80);
  let storedRef = "";
  try {
    if (refFromUrl) localStorage.setItem("salesTechRef", refFromUrl);
    storedRef = text(localStorage.getItem("salesTechRef")).slice(0, 80);
  } catch {
    storedRef = "";
  }
  const commercialRef = refFromUrl || storedRef || "site-direto";

  /* Portfólio configurável */
  const portfolioGrid = $("#portfolioGrid");
  const projects = Array.isArray(config.projects)
    ? config.projects.filter((project) => project && project.visible !== false)
    : [];

  const createElement = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = String(content);
    return element;
  };

  const isSafeHttpUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  const parseVideoUrl = (rawValue) => {
    const raw = text(rawValue);
    if (!raw) return null;

    if (/\.mp4(?:$|[?#])/i.test(raw) && isSafeHttpUrl(raw)) {
      return { type: "mp4", src: raw };
    }

    try {
      const url = new URL(raw);
      const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
      let id = "";

      if (host === "youtu.be") {
        id = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
        if (url.pathname === "/watch") {
          id = url.searchParams.get("v") || "";
        } else {
          const parts = url.pathname.split("/").filter(Boolean);
          if (["shorts", "embed", "live"].includes(parts[0])) id = parts[1] || "";
        }
      }

      if (/^[A-Za-z0-9_-]{6,}$/.test(id)) {
        return {
          type: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
        };
      }
    } catch {
      return null;
    }

    return isSafeHttpUrl(raw) ? { type: "external", src: raw } : null;
  };

  const videoModal = $("#videoModal");
  const videoContent = $("#videoContent");
  const videoTitle = $("#videoTitle");
  let lastFocusedElement = null;

  const closeVideo = () => {
    if (!videoModal || !videoContent) return;
    videoContent.replaceChildren();
    videoModal.hidden = true;
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocusedElement?.focus?.();
    lastFocusedElement = null;
  };

  const openVideo = (project) => {
    const video = parseVideoUrl(project.videoUrl);
    if (!video) return;

    if (video.type === "external") {
      window.open(video.src, "_blank", "noopener");
      return;
    }

    if (!videoModal || !videoContent || !videoTitle) return;
    lastFocusedElement = document.activeElement;
    videoTitle.textContent = `Demonstração — ${text(project.title, "Projeto")}`;
    videoContent.replaceChildren();

    if (video.type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = video.src;
      iframe.title = `Vídeo de demonstração do projeto ${text(project.title)}`;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      videoContent.appendChild(iframe);
    } else {
      const videoElement = document.createElement("video");
      videoElement.src = video.src;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoContent.appendChild(videoElement);
    }

    videoModal.hidden = false;
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".video-close", videoModal)?.focus();
  };

  $$("[data-close-video]").forEach((element) => {
    element.addEventListener("click", closeVideo);
  });

  if (portfolioGrid) {
    portfolioGrid.replaceChildren();

    if (!projects.length) {
      const empty = createElement(
        "p",
        "noscript-message",
        "Os projetos serão publicados em breve."
      );
      portfolioGrid.appendChild(empty);
    }

    projects.forEach((project) => {
      const article = createElement(
        "article",
        `portfolio-card${project.featured ? " featured" : ""}`
      );

      const meta = createElement("div", "portfolio-meta");
      meta.appendChild(
        createElement("span", "portfolio-category", text(project.category, "Projeto"))
      );
      meta.appendChild(
        createElement("span", "portfolio-status", text(project.status, "Desenvolvido"))
      );

      article.appendChild(meta);
      article.appendChild(createElement("h3", "", text(project.title, "Projeto Sales Tech")));
      article.appendChild(
        createElement("p", "", text(project.description, "Solução desenvolvida pela Sales Tech."))
      );

      const tags = Array.isArray(project.tags)
        ? project.tags.map((tag) => text(tag)).filter(Boolean)
        : [];

      if (tags.length) {
        const tagList = createElement("ul", "portfolio-tags");
        tags.forEach((tag) => tagList.appendChild(createElement("li", "", tag)));
        article.appendChild(tagList);
      }

      const actions = createElement("div", "portfolio-actions");
      let hasAction = false;

      const projectUrl = text(project.projectUrl);
      if (projectUrl && isSafeHttpUrl(projectUrl)) {
        const projectLink = createElement(
          "a",
          "",
          text(project.projectLabel, "Abrir projeto")
        );
        projectLink.href = projectUrl;
        projectLink.target = "_blank";
        projectLink.rel = "noopener";
        projectLink.setAttribute(
          "aria-label",
          `${text(project.projectLabel, "Abrir projeto")}: ${text(project.title)}`
        );
        actions.appendChild(projectLink);
        hasAction = true;
      }

      const video = parseVideoUrl(project.videoUrl);
      if (video) {
        const videoButton = createElement("button", "", "Ver demonstração");
        videoButton.type = "button";
        videoButton.addEventListener("click", () => openVideo(project));
        actions.appendChild(videoButton);
        hasAction = true;
      }

      if (hasAction) article.appendChild(actions);
      portfolioGrid.appendChild(article);
    });
  }

  /* Formulário comercial */
  const form = $("#diagnosticForm");
  if (form) {
    const button = $('button[type="submit"]', form);
    const note = $(".form-note", form);
    const originalButtonLabel = button?.textContent || "Enviar solicitação";
    const originalNote = note?.innerHTML || "";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const value = (id) => text(document.getElementById(id)?.value);
      const name = value("leadName");
      const company = value("leadCompany");
      const city = value("leadCity");
      const contact = value("leadContact");
      const problem = value("leadProblem");
      const email = text(config.contactEmail);

      if (!name || !company || !contact || !problem || !email) {
        if (note) note.textContent = "Preencha os campos obrigatórios antes de enviar.";
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "Enviando...";
      }
      if (note) note.textContent = "Enviando sua solicitação...";

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            _subject: `Novo diagnóstico Sales Tech — ${company}`,
            _template: "table",
            Nome: name,
            Empresa: company,
            Cidade: city || "Não informado",
            Contato: contact,
            "Necessidade informada": problem,
            "Origem comercial": commercialRef,
            Origem: "salestech.agency"
          })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.success === false) {
          throw new Error(data.message || "Falha no envio");
        }

        form.reset();
        if (button) button.textContent = "Solicitação enviada";
        if (note) {
          note.textContent = "Recebemos sua solicitação. A Sales Tech fará o retorno pelos dados informados.";
        }

        window.setTimeout(() => {
          if (button) {
            button.disabled = false;
            button.textContent = originalButtonLabel;
          }
          if (note) note.innerHTML = originalNote;
        }, 5000);
      } catch (error) {
        console.error("Falha no formulário:", error);
        if (button) {
          button.disabled = false;
          button.textContent = "Tentar novamente";
        }
        if (note) {
          note.textContent = `Não foi possível enviar agora. Fale pelo WhatsApp ou escreva para ${email}.`;
        }
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (videoModal && !videoModal.hidden) {
      closeVideo();
      return;
    }
    closeMenu();
  });
})();
