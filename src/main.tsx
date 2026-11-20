import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const root = document.getElementById("root")!;
const pathname = window.location.pathname.replace(/\/index\.html$/, "/").replace(/([^/])$/, "$1/");
const legacySection = new Map([["#conteudos", "perguntas"], ["#avaliacoes", "abordagem"]]).get(window.location.hash);

if (pathname === "/" && legacySection) {
  window.history.replaceState(null, "", `#${legacySection}`);
  document.getElementById(legacySection)?.scrollIntoView();
}

const app = <App pathname={pathname} />;

if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
