import { GITHUB_URL } from "./ui.jsx";

const NAV_LINKS = [
  { label: "Documentation", href: "#docs" },
  { label: "Playground", href: "#playground" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "npm", href: "https://www.npmjs.com/package/portslug", external: true },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#top" className="brand">
          <img src="/portsluglogo.png" alt="portslug logo" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-word">
              <span className="brand-white">PORT</span>
              <span className="brand-accent">SLUG</span>
            </span>
            <span className="brand-tag">Tiny Node.js dev utilities</span>
          </span>
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="header-cta">
          <a href="#docs" className="get-started-btn">
            <span className="prompt-mark">&gt;_</span> Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
