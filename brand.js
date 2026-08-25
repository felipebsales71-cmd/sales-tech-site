(() => {
  const logoSrc = 'assets/logo-st.svg?v=20260825-1';

  const style = document.createElement('style');
  style.textContent = `
    .official-st-logo{display:block;object-fit:cover;border-radius:50%;flex:0 0 auto;box-shadow:0 8px 24px rgba(0,0,0,.28)}
    .brand .official-st-logo{width:48px!important;height:48px!important}
    .about-signature .official-st-logo{width:124px!important;height:124px!important;margin:0 auto 16px}
    .content-card .official-st-logo{width:64px!important;height:64px!important}
    @media(max-width:600px){
      .brand .official-st-logo{width:42px!important;height:42px!important}
      .about-signature .official-st-logo{width:104px!important;height:104px!important}
    }
  `;
  document.head.appendChild(style);

  const makeLogo = (className = '') => {
    const img = document.createElement('img');
    img.src = logoSrc;
    img.alt = 'Sales Tech';
    img.decoding = 'async';
    img.className = `official-st-logo ${className}`.trim();
    return img;
  };

  document.querySelectorAll('.brand').forEach((brand) => {
    const old = brand.querySelector('.brand-symbol, svg, .official-st-logo');
    if (old) old.replaceWith(makeLogo('brand-symbol'));
    else brand.prepend(makeLogo('brand-symbol'));
  });

  document.querySelectorAll('.about-signature').forEach((card) => {
    const old = card.querySelector('svg, .about-logo, .official-st-logo');
    if (old) old.replaceWith(makeLogo('about-logo'));
    else card.prepend(makeLogo('about-logo'));
  });

  document.querySelectorAll('.content-card-logo, .content-card .official-st-logo').forEach((old) => {
    old.replaceWith(makeLogo('content-card-logo'));
  });

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = logoSrc;
    favicon.type = 'image/svg+xml';
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = logoSrc;
    document.head.appendChild(link);
  }
})();
