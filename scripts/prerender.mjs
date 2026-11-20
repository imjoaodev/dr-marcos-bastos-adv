import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pages, pageSchema, renderPage, SITE_URL, socialImage } from "../.prerender/render-page.js";

const template = await readFile("dist/index.html", "utf8");
const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escapeHtml = value => value.replace(/[&<>"]/g, char => entities[char]);

for (const { pathname, title, description } of pages) {
  const canonical = SITE_URL + pathname;
  const schema = pageSchema(pathname);
  const metadata = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${socialImage}">`,
    '<meta property="og:image:alt" content="Maicon Bastos no escritório em Nova Iguaçu">',
    '<meta property="og:type" content="website">',
    schema ? `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>` : "",
  ].filter(Boolean).join("\n    ");
  const html = template
    .replace(/<title>.*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`)
    .replace("<!-- page-meta -->", () => metadata)
    .replace("<body>", () => pathname === "/" ? "<body>" : '<body data-page="inner">')
    .replace('<div id="root"></div>', () => `<div id="root">${renderPage(pathname)}</div>`);
  const file = join("dist", pathname, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const formerContentPaths = [
  "/conteudos/",
  "/conteudos/audiencia-de-custodia/",
  "/conteudos/habeas-corpus/",
  "/conteudos/inquerito-policial/",
];
const redirectPage = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=/#perguntas">
  <title>Perguntas frequentes | Maicon Bastos</title>
</head>
<body><main><h1>Perguntas frequentes</h1><p><a href="/#perguntas">Ir para as perguntas frequentes</a></p></main></body>
</html>
`;
for (const pathname of formerContentPaths) {
  const file = join("dist", pathname, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, redirectPage);
}

const urls = pages.map(({ pathname }) => `  <url><loc>${SITE_URL}${pathname}</loc></url>`).join("\n");
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
