window.SALES_TECH_CONFIG = {
  contactEmail: "sales.tech.rr.dev@gmail.com",
  whatsappNumber: "",
  whatsappMessage: "Olá! Conheci a Sales Tech pelo site e gostaria de conversar sobre uma solução para minha empresa.",
  instagramUrl: "https://instagram.com/salestech.rr",
  demoVideos: []
};

(() => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'instagram-v2.css?v=2.0.0';
  document.head.appendChild(stylesheet);

  const brandScript = document.createElement('script');
  brandScript.src = 'brand.js?v=20260824';
  brandScript.async = false;
  document.head.appendChild(brandScript);
})();