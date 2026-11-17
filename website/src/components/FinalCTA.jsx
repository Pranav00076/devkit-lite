import { ArrowRight, Github } from "lucide-react";
import { InstallChip, NPM_URL, GITHUB_URL } from "./ui.jsx";

export default function FinalCTA() {
  return (
    <section className="cta">
      <h2 className="cta-title">Make your next Node.js project a little simpler.</h2>
      <div className="cta-actions">
        <a href="#docs" className="btn-light">
          Get Started <ArrowRight size={16} />
        </a>
        <InstallChip />
      </div>
      <div className="cta-links">
        <a href={NPM_URL} target="_blank" rel="noreferrer">
          npm
        </a>
        <span className="cta-dot">·</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="cta-gh">
          <Github size={14} /> GitHub
        </a>
      </div>
    </section>
  );
}
