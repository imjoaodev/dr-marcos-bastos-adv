import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BadgeCheck,
  Clock3,
  BriefcaseBusiness,
  Facebook,
  Gavel,
  Instagram,
  LockKeyholeOpen,
  Mail,
  MessageCircle,
  MapPin,
  Menu,
  Plus,
  Scale,
  ShieldCheck,
  Siren,
  X,
} from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-witn-icon";
import { ScrollStackingCards } from "@/components/ui/scroll-stacking-cards";
import { FACEBOOK_URL, INSTAGRAM_URL, OFFICE_DIRECTIONS_URL, OFFICE_MAP_URL, PROFESSIONAL, WHATSAPP_URL, whatsappUrl } from "./site";
import brandLogo from "./brand/mb-monograma.webp";
import heroPortrait from "./portraits/maicon-abertura.webp";
import aboutPortrait from "./portraits/maicon-sobre.webp";
import { Faq, Principles, Process } from "./editorial";

const navigation = [
  ["inicio", "Início"],
  ["sobre", "O advogado"],
  ["servicos", "Atuação"],
  ["atendimento", "Atendimento"],
  ["perguntas", "FAQ"],
  ["contato", "Contato"],
];

function WhatsAppLink({ className = "" }: { className?: string }) {
  return (
    <ButtonWithIcon
      className={`whatsapp-button whatsapp-tone ${className}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Falar no WhatsApp
    </ButtonWithIcon>
  );
}

function Brand() {
  return (
    <>
      <img className="brand-logo" src={brandLogo} width="480" height="320" alt="" />
      <span className="brand-copy"><strong>{PROFESSIONAL.name}</strong><small>Advocacia criminal</small></span>
    </>
  );
}

function Header({ innerPage }: { innerPage: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const menuButton = useRef<HTMLButtonElement>(null);
  const prefix = innerPage ? "/" : "";

  useEffect(() => {
    if (innerPage) return;
    const sections = navigation.map(([id]) => document.getElementById(id)).reverse();
    let frame: number | undefined;

    function updateHeader() {
      frame = undefined;
      setScrolled(window.scrollY > 24);
      const readingLine = Math.min(135, window.innerHeight * .3);
      const section = sections.find((item) => item && item.getBoundingClientRect().top <= readingLine);
      setActiveSection(section?.id ?? "inicio");
    }

    function requestUpdate() {
      if (frame === undefined) frame = window.requestAnimationFrame(updateHeader);
    }

    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [innerPage]);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || innerPage ? "" : undefined}>
      <div className="shell header-inner">
        <a className="brand" href={prefix + "#inicio"} aria-label={PROFESSIONAL.name + ", início"} onClick={() => setOpen(false)}><Brand /></a>
        <nav className="desktop-nav" aria-label="Principal">
          {navigation.map(([id, label]) => (
            <a key={id} href={prefix + "#" + id} aria-current={!innerPage && activeSection === id ? "location" : undefined}>{label}</a>
          ))}
        </nav>
        <WhatsAppLink className="header-cta" />
        <button className="menu-button" type="button" ref={menuButton} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav shell" aria-label="Menu móvel" hidden={!open}>
        {navigation.map(([id, label]) => (
          <a key={id} href={prefix + "#" + id} aria-current={!innerPage && activeSection === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <WhatsAppLink />
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="shell hero-inner">
        <div className="hero-content">
          <div className="hero-intro">
            <h1>
              <span>Defesa criminal com estratégia</span>{" "}
              <span>e compromisso com seus direitos.</span>
            </h1>
            <p className="hero-description">Maicon Bastos, advogado criminalista em Nova Iguaçu, RJ. Orientação e defesa em Direito Penal para pessoas e famílias.</p>
          </div>
          <div className="hero-actions">
            <a className="button button-outline" href="#servicos">Conhecer a atuação</a>
            <WhatsAppLink className="hero-whatsapp-button" />
          </div>
          <ul className="hero-facts" aria-label="Informações do atendimento">
            <li><Clock3 aria-hidden="true" />{PROFESSIONAL.experience}</li>
            <li><BadgeCheck aria-hidden="true" />{PROFESSIONAL.oab}</li>
          </ul>
        </div>
        <div className="hero-image">
          <img src={heroPortrait} alt="Dr. Maicon Bastos em pé ao lado da estante do escritório" fetchPriority="high" width="903" height="911" />
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: BriefcaseBusiness,
    title: "Defesa em processos criminais",
    description: "Orientação jurídica e acompanhamento dos atos do processo penal.",
    detail: "A atuação inclui a análise da acusação e dos elementos do processo, a explicação das etapas e a avaliação das manifestações e medidas de defesa pertinentes ao caso.",
  },
  {
    icon: Siren,
    title: "Prisão em flagrante",
    description: "Orientação e acompanhamento jurídico em situações de prisão em flagrante.",
    detail: "A atuação pode incluir acompanhamento na delegacia, análise dos registros da prisão e orientação sobre as etapas seguintes.",
  },
  {
    icon: LockKeyholeOpen,
    title: "Liberdade provisória",
    description: "Análise e pedido para responder ao processo em liberdade, quando cabível.",
    detail: "A análise considera os fundamentos da prisão e as medidas cautelares que podem ser aplicáveis à situação.",
  },
  {
    icon: ShieldCheck,
    title: "Habeas corpus",
    description: "Medida judicial diante de ameaça ou restrição ilegal à liberdade de locomoção.",
    detail: "O atendimento avalia os fundamentos da ameaça ou restrição e a adequação dessa medida ao caso.",
  },
  {
    icon: Scale,
    title: "Relaxamento de prisão ilegal",
    description: "Análise da legalidade da prisão e apresentação do pedido, quando cabível.",
    detail: "A análise abrange as circunstâncias da prisão e os requisitos legais que devem ser observados pela autoridade.",
  },
  {
    icon: Gavel,
    title: "Audiências criminais e de custódia",
    description: "Preparação e acompanhamento jurídico em audiências, inclusive de custódia.",
    detail: "O acompanhamento inclui orientação sobre os atos da audiência e atuação jurídica de acordo com a etapa do processo.",
  },
];

function Services() {
  const serviceDialogRef = useRef<HTMLDialogElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);
  const detailTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeService, setActiveService] = useState<(typeof services)[number] | null>(null);

  useEffect(() => {
    const dialog = serviceDialogRef.current;
    if (!activeService || !dialog || dialog.open) return;
    dialog.showModal();
    panelHeadingRef.current?.focus({ preventScroll: true });
  }, [activeService]);

  function closeDetails() {
    serviceDialogRef.current?.close();
  }

  function restoreDetailsFocus() {
    setActiveService(null);
    detailTriggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <section id="servicos" className="paper section services-section" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-heading services-heading">
          <h2 id="services-title">Áreas de atuação</h2>
          <p>Orientação e defesa em situações de prisão, audiências e processos criminais.</p>
        </div>
        <ScrollStackingCards
          id="lista-servicos"
          items={services.map((service) => {
            const { icon: Icon, title, description } = service;
            const expanded = activeService === service;

            return { key: title, content: (
              <article className="service-card" data-selected={expanded ? "" : undefined}>
                <span className="service-icon"><Icon aria-hidden="true" /></span>
                <div className="service-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <button
                    type="button"
                    className="service-action"
                    aria-label={`Saiba mais sobre ${title}`}
                    aria-haspopup="dialog"
                    aria-controls="detalhes-servico"
                    onClick={(event) => {
                      detailTriggerRef.current = event.currentTarget;
                      setActiveService(service);
                    }}
                  >
                    Saiba mais <Plus aria-hidden="true" />
                  </button>
                </div>
              </article>
            ) };
          })}
        />
        <div className="services-contact">
          <p>Informações sobre atendimento em Direito Penal</p>
          <a className="button button-gold" href="#contato">Canais de atendimento</a>
        </div>
        <dialog
          id="detalhes-servico"
          className="service-dialog"
          ref={serviceDialogRef}
          aria-labelledby="detalhes-servico-titulo"
          aria-describedby="detalhes-servico-texto"
          onClose={restoreDetailsFocus}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
        >
          {activeService && (
            <div className="service-panel">
              <span className="service-icon"><activeService.icon aria-hidden="true" /></span>
              <div className="service-panel-copy">
                <h3 id="detalhes-servico-titulo" ref={panelHeadingRef} tabIndex={-1}>{activeService.title}</h3>
                <p id="detalhes-servico-texto">{activeService.detail}</p>
              </div>
              <button type="button" className="service-panel-close" aria-label="Fechar detalhes do serviço" onClick={closeDetails}>
                <X aria-hidden="true" />
              </button>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="paper section about-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-image">
          <img src={aboutPortrait} alt="Maicon Bastos sentado à mesa do escritório" width="715" height="634" loading="lazy" />
        </div>
        <div className="about-copy">
          <p className="section-label">Advocacia criminal</p>
          <h2 id="about-title">Maicon Bastos</h2>
          <p>Advogado criminalista em Nova Iguaçu, na Baixada Fluminense. Atua em Direito Penal e Processo Penal, com orientação a pessoas investigadas, acusadas e seus familiares.</p>
          <p>A prática profissional é pautada pela análise técnica, pelo sigilo e pela proteção dos direitos e garantias fundamentais.</p>
          <section className="professional-profile" aria-labelledby="formacao">
            <h3 id="formacao">Formação acadêmica e inscrição na OAB</h3>
            <dl className="professional-details">
              <div><dt>Curso</dt><dd>{PROFESSIONAL.education.course ?? "A confirmar"}</dd></div>
              <div><dt>Instituição de ensino</dt><dd>{PROFESSIONAL.education.institution ?? "A confirmar"}</dd></div>
              <div><dt>Ano de conclusão</dt><dd>{PROFESSIONAL.education.graduationYear ?? "A confirmar"}</dd></div>
              <div><dt>Inscrição profissional</dt><dd>{PROFESSIONAL.oab}</dd></div>
              <div><dt>Seccional da OAB</dt><dd>Rio de Janeiro</dd></div>
              <div><dt>Trajetória</dt><dd>{PROFESSIONAL.experience}</dd></div>
            </dl>
          </section>
          <a className="button button-gold" href="#atendimento">Como funciona o atendimento</a>
        </div>
      </div>
    </section>
  );
}

const contactTopics = [
  "Prisão em flagrante",
  "Audiência criminal ou de custódia",
  "Habeas corpus ou medida relacionada à prisão",
  "Defesa em processo criminal",
  "Outro assunto",
];

function ContactForm() {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const topic = String(fields.get("assunto") ?? "");
    if (!contactTopics.includes(topic)) return;
    const name = String(fields.get("nome") ?? "").trim();
    const message = [
      "Olá, gostaria de informações sobre atendimento em Direito Penal.",
      name && `Meu nome é ${name}.`,
      `Assunto: ${topic}.`,
    ].filter(Boolean).join("\n");
    window.location.assign(whatsappUrl(message));
  }

  return (
    <form className="contact-form" method="post" onSubmit={prepareMessage} aria-labelledby="contact-form-title" aria-describedby="contact-form-note">
      <h3 id="contact-form-title">Preparar mensagem</h3>
      <div className="form-field">
        <label htmlFor="contact-name">Nome <span>(opcional)</span></label>
        <input id="contact-name" name="nome" autoComplete="given-name" maxLength={80} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-topic">Assunto</label>
        <select id="contact-topic" name="assunto" defaultValue="" required>
          <option value="" disabled>Selecione um assunto</option>
          {contactTopics.map(topic => <option key={topic}>{topic}</option>)}
        </select>
      </div>
      <p id="contact-form-note">Ao continuar, você poderá revisar a mensagem no WhatsApp. Reserve detalhes do caso e documentos para o atendimento.</p>
      <button className="button whatsapp-tone" type="submit" disabled={!ready}>Continuar no WhatsApp</button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contato" className="paper section contact-section" aria-labelledby="contact-title">
      <div className="shell">
        <div className="section-heading">
          <h2 id="contact-title">Contato e orientação jurídica</h2>
          <p>Fale com o escritório para obter informações sobre o atendimento em advocacia criminal.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-panel">
            <div className="contact-channels">
              <h3>Canais de atendimento</h3>
              <p>WhatsApp {PROFESSIONAL.whatsappDisplay}</p>
              <a className="contact-email text-link" href={`mailto:${PROFESSIONAL.email}`}><Mail aria-hidden="true" />{PROFESSIONAL.email}</a>
            </div>
            <ContactForm />
          </div>
          <div className="office-map">
            <div className="office-map-header">
              <div>
                <h3>Escritório em Nova Iguaçu</h3>
                <address>{PROFESSIONAL.address}<br />{PROFESSIONAL.city}, {PROFESSIONAL.state} · CEP {PROFESSIONAL.postalCode}</address>
              </div>
              <a className="button button-gold" href={OFFICE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Como chegar</a>
            </div>
            <p className="office-advice">Consulte o escritório para combinar o atendimento presencial e verificar a disponibilidade online.</p>
            <iframe
              title={`Mapa do escritório na ${PROFESSIONAL.address}, ${PROFESSIONAL.city}`}
              src={OFFICE_MAP_URL}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-identity">
          <div className="brand"><Brand /></div>
          <p className="footer-registration">{PROFESSIONAL.oab}</p>
          <p className="footer-note">As informações deste site têm caráter informativo. Cada caso requer análise jurídica individual.</p>
        </div>

        <div className="footer-group">
          <h2 className="footer-heading">Contato</h2>
          <a className="footer-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" /><span>WhatsApp {PROFESSIONAL.whatsappDisplay}</span>
          </a>
          <a className="footer-link" href={`mailto:${PROFESSIONAL.email}`}>
            <Mail aria-hidden="true" /><span>{PROFESSIONAL.email}</span>
          </a>
          <address className="footer-link footer-address">
            <MapPin aria-hidden="true" />
            <span>{PROFESSIONAL.address}<br />{PROFESSIONAL.city}, {PROFESSIONAL.state} · CEP {PROFESSIONAL.postalCode}</span>
          </address>
        </div>

        <nav className="footer-group" aria-labelledby="footer-social">
          <h2 className="footer-heading" id="footer-social">Redes sociais</h2>
          <a className="footer-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram aria-hidden="true" />Instagram</a>
          <a className="footer-link" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"><Facebook aria-hidden="true" />Facebook</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="shell footer-bottom-inner">
          <p>© 2026 {PROFESSIONAL.name}. Todos os direitos reservados.</p>
          <a className="privacy-link" href="/politica-de-privacidade/">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

function Privacy() {
  return (
    <main id="conteudo" className="paper section inner-page">
      <article className="shell privacy reading-page">
        <h1>Política de Privacidade</h1>
        <h2>Responsável pelo tratamento</h2>
        <p>{PROFESSIONAL.name}, {PROFESSIONAL.oab}. Solicitações sobre dados pessoais podem ser enviadas para <a className="text-link" href={`mailto:${PROFESSIONAL.email}`}>{PROFESSIONAL.email}</a>.</p>
        <h2>Dados de navegação</h2>
        <p>O site não usa ferramentas de análise de visitas nem cookies de marketing próprios. O provedor de hospedagem pode registrar dados técnicos de acesso para segurança e funcionamento.</p>
        <h2>Formulário e atendimento</h2>
        <p>Os campos de nome opcional e assunto são usados no navegador para preparar uma mensagem. Ao continuar, esses dados são encaminhados ao WhatsApp na mensagem editável. O escritório recebe a mensagem quando você confirma o envio no aplicativo. O formulário não grava os campos em uma base de dados do site.</p>
        <p>As informações recebidas por WhatsApp ou e-mail são usadas para responder ao contato e, quando aplicável, para providências solicitadas antes da contratação ou para a prestação do serviço. O escritório trata os dados sob sigilo profissional, guarda o necessário para essas finalidades e observa as obrigações legais aplicáveis.</p>
        <h2>Serviços de terceiros</h2>
        <p>O mapa incorporado é fornecido pelo Google Maps e pode receber dados técnicos de acesso. WhatsApp, Google, Instagram e Facebook operam de acordo com suas próprias políticas de privacidade.</p>
        <h2>Direitos previstos na LGPD</h2>
        <p>Você pode solicitar confirmação de tratamento, acesso e correção de dados, além das demais providências aplicáveis previstas na Lei Geral de Proteção de Dados. Use o e-mail deste escritório para exercer esses direitos.</p>
        <a className="button button-paper" href="/">Voltar ao início</a>
      </article>
    </main>
  );
}

function FloatingContact() {
  const [showOnMobile, setShowOnMobile] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!hero || !contact || !("IntersectionObserver" in window)) {
      setShowOnMobile(true);
      return;
    }

    let pastHero = false;
    let beforeContact = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        } else {
          beforeContact = !entry.isIntersecting && entry.boundingClientRect.top > 0;
        }
      }
      setShowOnMobile(pastHero && beforeContact);
    });

    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="floating-contact" data-mobile-visible={showOnMobile ? "" : undefined}>
      <WhatsAppLink />
    </div>
  );
}

export function App({ pathname }: { pathname: string }) {
  const privacy = pathname === "/politica-de-privacidade/";
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header innerPage={privacy} />
      {privacy ? <Privacy /> : (
        <main id="conteudo"><Hero /><About /><Services /><Process /><Principles /><Faq /><Contact /></main>
      )}
      <Footer />
      {!privacy && <FloatingContact />}
    </>
  );
}
