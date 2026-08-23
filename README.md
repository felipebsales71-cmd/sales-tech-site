# Sales Tech — Site institucional/comercial

Site estático, rápido e pronto para Cloudflare Pages.

## Antes de publicar

Edite somente `config.js`:

1. `whatsappNumber`: DDI + DDD + número, apenas dígitos. Ex.: `5595999999999`.
2. `instagramUrl`: URL completa do Instagram.
3. `demoVideos`: três URLs, na ordem dos projetos. Aceita YouTube ou MP4.

## Rodar localmente

Você pode abrir `index.html` diretamente ou executar um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Cloudflare Pages

Este projeto não precisa de build.

Ao conectar o repositório no Cloudflare Pages:

- Framework preset: `None`
- Build command: deixar em branco
- Build output directory: `/` ou raiz do projeto

Depois, em `Custom domains`, adicione `salestech.agency`.

## Estrutura

- `index.html` — conteúdo do site
- `styles.css` — layout e responsividade
- `script.js` — navegação, animações, portfólio e modal de vídeo
- `config.js` — links comerciais e vídeos
- `assets/favicon.svg` — ícone do site
