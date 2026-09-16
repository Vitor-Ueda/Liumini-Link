# Liumini Links

Cockpit de links da Liumini Home — uma página única com os canais da marca (redes sociais, lojas/marketplaces e produtos em destaque), na identidade visual da Liumini Home.

Site estático (HTML/CSS/JS puro), sem build ou dependências.

## Rodar localmente

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Editar os canais

Todos os links ficam centralizados no array `SECTIONS` em [`script.js`](script.js):

- Preencha `url` para ativar um canal (deixe `null` para manter como "Em breve").
- `primary: true` destaca um canal como principal (CTA em destaque). Com `ctaLabel` definido, o texto do CTA aparece automaticamente assim que `url` for preenchido.
- Para adicionar um produto, inclua um item na seção "Produtos".

## Deploy

Qualquer host de arquivos estáticos funciona (Vercel, Netlify, GitHub Pages) — basta apontar para esta pasta.
