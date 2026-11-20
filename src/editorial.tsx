import { ClipboardList, ListChecks, MessageCircle, Search } from "lucide-react";
import HowItWorks02 from "@/components/ui/how-it-works-02";
import { questions } from "./content";

const steps = [
  { icon: MessageCircle, title: "Primeiro contato", body: "Apresente a situação e informe a fase em que ela se encontra." },
  { icon: ClipboardList, title: "Compreensão da situação", body: "O escritório esclarece o contexto e identifica as necessidades jurídicas." },
  { icon: Search, title: "Análise jurídica", body: "O advogado examina os fatos e os documentos relevantes." },
  { icon: ListChecks, title: "Orientação sobre os próximos passos", body: "O escritório explica as medidas cabíveis e as próximas etapas." },
];

const principles = [
  ["Sigilo profissional", "As informações são tratadas com a confidencialidade própria da relação entre advogado e cliente."],
  ["Análise individualizada", "A análise considera os fatos e as particularidades de cada situação."],
  ["Defesa técnica", "A atuação se fundamenta na legislação e nas garantias constitucionais."],
  ["Comunicação clara", "A orientação explica as medidas cabíveis e as etapas do atendimento em linguagem acessível."],
];

export function Process() {
  return (
    <section id="atendimento" className="section process-section" aria-labelledby="process-title">
      <div className="shell process-layout">
        <div className="section-heading">
          <h2 id="process-title">Como funciona o atendimento</h2>
          <p>Do primeiro contato à orientação sobre as medidas cabíveis.</p>
        </div>
        <HowItWorks02 steps={steps} />
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section id="abordagem" className="paper section principles-section" aria-labelledby="principles-title">
      <div className="shell">
        <div className="section-heading">
          <p className="section-label">Abordagem profissional</p>
          <h2 id="principles-title">Uma atuação pautada pela responsabilidade e pela técnica</h2>
        </div>
        <ul className="principles-grid" role="list">
          {principles.map(([title, description]) => (
            <li key={title}><h3>{title}</h3><p>{description}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="perguntas" className="paper section faq-section" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="section-heading">
          <h2 id="faq-title">Perguntas frequentes</h2>
          <p>Informações gerais sobre prisão, defesa criminal e primeiro atendimento.</p>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question} name="duvidas-penais">
              <summary>{question}</summary>
              <div className="faq-answer"><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
