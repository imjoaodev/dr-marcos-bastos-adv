# Maicon Bastos Advocacia

Site institucional do Dr. Maicon Bastos, advogado criminalista em Nova Iguaçu, RJ. O site apresenta as áreas de atuação, as etapas do atendimento, as perguntas frequentes e os canais de contato do escritório.

[Acessar o site](https://maicon-bastos-advocacia.zanyplover3.chatgpt.site/)

## Como rodar localmente

Use Node.js 22.12 ou superior e Bun. O arquivo `bun.lock` fixa as versões das dependências.

```bash
git clone https://github.com/imjoaodev/dr-marcos-bastos-adv.git
cd dr-marcos-bastos-adv
bun install --frozen-lockfile
bunx vite
```

Abra o endereço indicado no terminal, normalmente `http://localhost:5173`.

## Verificação e build

```bash
bun run check
bun run build
bunx vite preview
```

`check` verifica os tipos. `build` gera o site estático em `dist/`, incluindo a página inicial, a política de privacidade e o sitemap. `vite preview` serve o build localmente. Para publicar, use `dist/` como diretório de saída.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| [src/site.ts](src/site.ts) | Dados profissionais, endereço, contatos, redes sociais e URL do site |
| [src/App.tsx](src/App.tsx) | Estrutura das páginas, textos dos serviços e formulário de contato |
| [src/editorial.tsx](src/editorial.tsx) | Etapas do atendimento e abordagem profissional |
| [src/content.ts](src/content.ts) | Perguntas frequentes |
| [src/styles.css](src/styles.css) | Identidade visual, estilos responsivos e ajustes para movimento reduzido |
| [src/components/ui/](src/components/ui/) | Botões, empilhamento dos cards de atuação e linha do tempo |
| [src/render-page.tsx](src/render-page.tsx) e [scripts/prerender.mjs](scripts/prerender.mjs) | Pré-renderização, metadados e sitemap |

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, componentes na estrutura shadcn/ui, Motion e Lucide.
