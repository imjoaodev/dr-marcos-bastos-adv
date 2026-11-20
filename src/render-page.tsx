import { renderToString } from "react-dom/server";
import { App } from "./App";
import { FACEBOOK_URL, INSTAGRAM_URL, PROFESSIONAL, SITE_URL, WHATSAPP_URL } from "./site";
import portrait from "./portraits/maicon-abertura.webp";

const professionalId = `${SITE_URL}/#maicon-bastos`;
const officeId = `${SITE_URL}/#escritorio`;

export const pages = [
  {
    pathname: "/",
    title: "Maicon Bastos | Advogado criminalista em Nova Iguaçu, RJ",
    description: "Maicon Bastos, OAB/RJ 216.839. Advocacia criminal em Nova Iguaçu, na Baixada Fluminense. Áreas de atuação, etapas do atendimento e contato com o escritório.",
  },
  {
    pathname: "/politica-de-privacidade/",
    title: "Política de Privacidade | Maicon Bastos",
    description: "Como o site de Maicon Bastos trata dados pessoais e como enviar solicitações relacionadas à LGPD.",
  },

];

export const socialImage = new URL(portrait, SITE_URL).href;

export function pageSchema(pathname: string) {
  if (pathname === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "@id": officeId,
          name: "Maicon Bastos – Advocacia Criminal",
          url: SITE_URL + "/",
          image: socialImage,
          email: PROFESSIONAL.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: PROFESSIONAL.address,
            addressLocality: PROFESSIONAL.city,
            addressRegion: PROFESSIONAL.state,
            postalCode: PROFESSIONAL.postalCode,
            addressCountry: "BR",
          },
          areaServed: { "@type": "City", name: PROFESSIONAL.city },
          contactPoint: { "@type": "ContactPoint", contactType: "Atendimento jurídico", url: WHATSAPP_URL },
        },
        {
          "@type": "Person",
          "@id": professionalId,
          name: "Maicon Bastos",
          jobTitle: "Advogado criminalista",
          identifier: PROFESSIONAL.oab,
          url: SITE_URL + "/",
          sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
          worksFor: { "@id": officeId },
        },
      ],
    };
  }
  return null;
}

export function renderPage(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}

export { SITE_URL };
