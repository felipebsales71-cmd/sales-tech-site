# Como alterar o portfólio do site manualmente

O portfólio do site é controlado pelo arquivo `config.js`. Você não precisa editar `index.html`, `styles.css` ou `script.js` para trocar links e vídeos.

## 1. Abrir o arquivo no GitHub

1. Entre no repositório `felipebsales71-cmd/sales-tech-site`.
2. Abra o arquivo `config.js`.
3. Clique no ícone de lápis, **Edit this file**.
4. Faça a alteração.
5. Clique em **Commit changes**.
6. Confirme o commit na branch `main`.

A Cloudflare publica a nova versão automaticamente.

## 2. Colocar o link de um sistema

Localize o projeto desejado. Exemplo:

```js
{
  id: "sales-tech-finance",
  title: "Sales Tech Finance",
  projectUrl: "",
  projectLabel: "Abrir sistema",
  videoUrl: ""
}
```

Troque somente o conteúdo entre as aspas:

```js
projectUrl: "https://app.salestech.agency",
```

O botão aparecerá automaticamente.

Para mudar o texto do botão:

```js
projectLabel: "Testar demonstração",
```

Para retirar o botão, volte a deixar vazio:

```js
projectUrl: "",
```

## 3. Colocar um vídeo

Links aceitos:

- YouTube comum;
- YouTube Shorts;
- `youtu.be`;
- arquivo MP4 público.

Exemplo:

```js
videoUrl: "https://www.youtube.com/watch?v=SEU_VIDEO",
```

O botão **Ver demonstração** aparecerá automaticamente e abrirá o vídeo dentro do site.

Para retirar o vídeo:

```js
videoUrl: "",
```

## 4. Alterar título, descrição, status e etiquetas

Exemplo:

```js
{
  category: "Gestão financeira",
  title: "Sales Tech Finance",
  status: "Produto Sales Tech",
  description: "Texto atualizado do projeto.",
  tags: ["Financeiro", "Estoque", "NF-e"]
}
```

Cada item de `tags` precisa estar entre aspas e separado por vírgula.

## 5. Esconder um projeto

Sem apagar o cadastro:

```js
visible: false,
```

Para mostrar novamente:

```js
visible: true,
```

## 6. Mudar a ordem

Recorte o bloco completo do projeto e cole acima ou abaixo de outro bloco. A ordem no site será a mesma ordem do arquivo.

## 7. Adicionar um novo projeto

Copie um bloco existente e altere os dados:

```js
{
  id: "nome-curto-sem-espacos",
  visible: true,
  featured: false,
  category: "Categoria",
  title: "Nome do projeto",
  status: "Desenvolvido",
  description: "Descrição objetiva do problema e da solução.",
  tags: ["Recurso 1", "Recurso 2"],
  projectUrl: "",
  projectLabel: "Abrir projeto",
  videoUrl: ""
}
```

O bloco anterior precisa terminar com vírgula quando houver outro projeto depois dele.

## 8. Destacar um projeto

Use:

```js
featured: true,
```

Recomenda-se manter apenas o Sales Tech Finance como destaque principal.

## 9. Erros comuns

- apagar uma vírgula;
- usar aspas “curvas” copiadas de editor de texto;
- deixar uma URL fora das aspas;
- editar o arquivo errado;
- publicar número pessoal, senha, token ou chave no repositório;
- fazer commit em outra branch e esperar alteração imediata em produção.

## 10. Conferência final

Depois do commit:

1. acompanhe a publicação automática da Cloudflare no GitHub;
2. abra `https://salestech.agency`;
3. atualize com `Ctrl + F5`;
4. teste o botão;
5. teste também no celular.
