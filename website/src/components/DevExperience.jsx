import { CircleCheck, Code, Package } from "lucide-react";
import { GITHUB_URL, LICENSE_URL, NPM_URL, VERSION } from "./ui.jsx";

const CLAIMS = [
  "Lightweight — two tiny ES modules, tree-shakeable",
  "Zero runtime dependencies",
  "JavaScript ES Modules (pure ESM)",
  "TypeScript declarations included",
  "Node.js 18+ support",
];

export default function DevExperience() {
  return (
    <section className="section dx-band" id="dx">
      <div className="container dx-grid">
        <div>
          <h2 className="dx-title">Developer experience first.</h2>
          <ul className="dx-list">
            {CLAIMS.map((claim) => (
              <li key={claim}>
                <CircleCheck size={16} className="dx-check" />
                {claim}
              </li>
            ))}
          </ul>
          <div className="dx-stats">
            <div>
              <div className="dx-stat-label">EXPORTS</div>
              <div className="dx-stat-value">5</div>
            </div>
            <div>
              <div className="dx-stat-label">DEPENDENCIES</div>
              <div className="dx-stat-value">0</div>
            </div>
            <div>
              <div className="dx-stat-label">MIN NODE</div>
              <div className="dx-stat-value">18+</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="dx-title">Open source.</h2>
          <div className="dx-cards">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="dx-card"
            >
              <Code size={20} className="dx-card-icon" />
              <span className="dx-card-title">GitHub</span>
              <span className="dx-card-sub">MIT License</span>
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              className="dx-card"
            >
              <Package size={20} className="dx-card-icon" />
              <span className="dx-card-title">npm</span>
              <span className="dx-card-sub">v{VERSION} · Latest</span>
            </a>
            <a href={LICENSE_URL} target="_blank" rel="noreferrer" className="dx-card">
              <span className="dx-card-title">License</span>
              <span className="dx-card-sub">MIT — free to use</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
