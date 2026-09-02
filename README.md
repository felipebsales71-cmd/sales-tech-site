# Sales Tech — site institucional e comercial

Site oficial da Sales Tech, publicado em `https://salestech.agency` por Cloudflare Workers Builds.

## Arquivos principais

- `index.html` — estrutura e conteúdo institucional.
- `styles.css` — identidade visual e responsividade.
- `script.js` — Instagram, formulário, portfólio e vídeos.
- `config.js` — e-mail, Instagram, links e projetos editáveis.
- `privacidade.html` — aviso de privacidade.
- `termos.html` — termos de uso.
- `GUIA-ALTERAR-PORTFOLIO.md` — instruções detalhadas para alterações manuais.

## Alterações comerciais rápidas

Para mudar Instagram, e-mail, links ou vídeos, edite somente `config.js`.

### E-mail

```js
contactEmail: "sales.tech.rr.dev@gmail.com",
```

### Instagram

```js
instagramUrl: "https://www.instagram.com/salestech.rr/",
```

### Links e vídeos do portfólio

Cada projeto possui:

```js
projectUrl: "",
videoUrl: ""
```

- Coloque o endereço do sistema em `projectUrl`.
- Coloque um link do YouTube, YouTube Shorts, `youtu.be` ou MP4 em `videoUrl`.
- Deixe `""` para esconder o botão correspondente.

Consulte `GUIA-ALTERAR-PORTFOLIO.md` para exemplos completos.

## Publicação

A branch de produção é `main`. Cada alteração aprovada e enviada para `main` inicia uma publicação automática na Cloudflare.

O Worker usa a rota:

```text
salestech.agency/*
```

## Rodar localmente

```bash
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Cuidados

- Não publique números pessoais, senhas, tokens ou chaves no repositório.
- Não remova vírgulas ou aspas do `config.js`.
- Não anuncie integrações ou resultados que ainda não tenham sido validados.
- Revise o Aviso de Privacidade e os Termos sempre que o formulário, prestadores ou modelo de negócio mudarem.
