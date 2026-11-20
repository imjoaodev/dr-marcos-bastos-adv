export const PROFESSIONAL = {
  name: "Dr. Maicon Bastos",
  oab: "OAB/RJ 216.839",
  education: {
    course: null,
    institution: null,
    graduationYear: null,
  },
  city: "Nova Iguaçu",
  state: "RJ",
  address: "Rua Getúlio Vargas, 80, Centro",
  postalCode: "26255-170",
  email: "contato@maiconbastos.com.br",
  whatsappDisplay: "(21) 96848-9834",
  experience: "Registros de atuação desde 2020",
};

export const SITE_URL = "https://maicon-bastos-advocacia.zanyplover3.chatgpt.site";

const officeMapQuery = encodeURIComponent(`${PROFESSIONAL.address}, ${PROFESSIONAL.city} - ${PROFESSIONAL.state}, Brasil`);
export const OFFICE_MAP_URL = `https://www.google.com/maps?q=${officeMapQuery}&hl=pt-BR&z=17&output=embed`;
export const OFFICE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${officeMapQuery}`;

const WHATSAPP_NUMBER = "5521968489834";
const MESSAGE = "Olá, gostaria de informações sobre atendimento em Direito Penal.";

export function whatsappUrl(message = MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappUrl();
export const INSTAGRAM_URL = "https://www.instagram.com/adv.maiconbastos/";
export const FACEBOOK_URL = "https://www.facebook.com/maicon.bastos.10";
