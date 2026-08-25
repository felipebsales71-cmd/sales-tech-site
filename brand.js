(() => {
  const logoSrc = 'assets/logo-st.svg?v=20260825-2';

  const style = document.createElement('style');
  style.textContent = `
    .official-st-logo{display:block;object-fit:contain;border-radius:50%;flex:0 0 auto;box-shadow:0 8px 24px rgba(0,0,0,.28)}
    .brand .official-st-logo{width:48px!important;height:48px!important}
    .about-signature .official-st-logo{width:124px!important;height:124px!important;margin:0 auto 16px}
    .content-card .official-st-logo{width:64px!important;height:64px!important}
    .official-st-fallback{display:grid;place-items:center;border-radius:50%;background:#071b4b;border:2px solid #10d9ff;color:#fff;font-weight:900;letter-spacing:-.06em}
    .brand .official-st-fallback{width:48px;height:48px;font-size:16px}
    .about-signature .official-st-fallback{width:124px;height:124px;margin:0 auto 16px;font-size:34px}
    .content-card .official-st-fallback{width:64px;height:64px;font-size:20px}
    @media(max-width:600px){
      .brand .official-st-logo,.brand .official-st-fallback{width:42px!important;height:42px!important}
      .about-signature .official-st-logo,.about-signature .official-st-fallback{width:104px!important;height:104px!important}
    }
  `;
  document.head.appendChild(style);

  const makeFallback = (className = '') => {
    const fallback = document.createElement('span');
    fallback.className = `official-st-fallback ${className}`.trim();
    fallback.textContent = 'ST';
    fallback.setAttribute('aria-label', 'Sales Tech');
    return fallback;
  };

  const makeLogo = (className = '') => {
    const img = document.createElement('img');
    img.src = logoSrc;
    img.alt = 'Sales Tech';
    img.className = `official-st-logo ${className}`.trim();
    img.decoding = 'async';
    img.addEventListener('error', () => img.replaceWith(makeFallback(className)), { once: true });
    return img;
  };

  document.querySelectorAll('.brand').forEach((brand) => {
    const old = brand.querySelector('.brand-symbol, svg, .official-st-logo, .official-st-fallback');
    if (old) old.replaceWith(makeLogo('brand-symbol'));
  });

  document.querySelectorAll('.about-signature').forEach((card) => {
    const old = card.querySelector('svg, .about-logo, .official-st-logo, .official-st-fallback');
    if (old) old.replaceWith(makeLogo('about-logo'));
    else card.prepend(makeLogo('about-logo'));
  });

  document.querySelectorAll('.content-card-logo').forEach((old) => {
    old.replaceWith(makeLogo('content-card-logo'));
  });

  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = logoSrc;
  if (!favicon.parentNode) document.head.appendChild(favicon);
})();
