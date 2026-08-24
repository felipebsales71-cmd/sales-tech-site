window.SALES_TECH_CONFIG = {
  contactEmail: "sales.tech.rr.dev@gmail.com",
  whatsappNumber: "",
  whatsappMessage: "Olá! Conheci a Sales Tech pelo site e gostaria de conversar sobre uma solução para minha empresa.",
  instagramUrl: "https://instagram.com/salestech.rr",
  demoVideos: ["", "", ""]
};

(() => {
  const loadV4 = () => {
    const v4 = document.createElement('script');
    v4.src = 'v4.js?v=4.0.0';
    v4.async = false;
    document.head.appendChild(v4);
  };

  const loadV3 = () => {
    const v3 = document.createElement('script');
    v3.src = 'v3.js?v=4.0.0';
    v3.async = false;
    v3.onload = loadV4;
    v3.onerror = loadV4;
    document.head.appendChild(v3);
  };

  const portfolio = document.createElement('script');
  portfolio.src = 'portfolio.js?v=4.0.0';
  portfolio.async = false;
  portfolio.onload = loadV3;
  portfolio.onerror = loadV3;
  document.head.appendChild(portfolio);
})();
