(() => {
  const logoSrc = 'data:image/webp;base64,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';

  const style = document.createElement('style');
  style.textContent = `
    .official-st-logo{display:block;object-fit:cover;border-radius:50%;flex:0 0 auto;box-shadow:0 8px 24px rgba(0,0,0,.28)}
    .brand .official-st-logo{width:48px!important;height:48px!important}
    .about-signature .official-st-logo{width:124px!important;height:124px!important;margin:0 auto 16px}
    .content-card .official-st-logo{width:64px!important;height:64px!important}
    @media(max-width:600px){.brand .official-st-logo{width:42px!important;height:42px!important}.about-signature .official-st-logo{width:104px!important;height:104px!important}}
  `;
  document.head.appendChild(style);

  const makeLogo = (className = '') => {
    const img = document.createElement('img');
    img.src = logoSrc;
    img.alt = 'Sales Tech';
    img.className = `official-st-logo ${className}`.trim();
    return img;
  };

  const replaceBranding = () => {
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

    document.querySelectorAll('.content-card-logo').forEach((old) => old.replaceWith(makeLogo('content-card-logo')));

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) { favicon.href = logoSrc; favicon.type = 'image/webp'; }
    else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/webp';
      link.href = logoSrc;
      document.head.appendChild(link);
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', replaceBranding);
  else replaceBranding();
})();
