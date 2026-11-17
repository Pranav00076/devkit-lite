import { GITHUB_URL, LICENSE_URL, NPM_URL, VERSION } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/portsluglogo.png" alt="" className="footer-logo" />
          <span>portslug</span>
          <span className="footer-version">v{VERSION}</span>
        </div>
        <nav className="footer-links">
          <a href="#docs">Documentation</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={NPM_URL} target="_blank" rel="noreferrer">
            npm
          </a>
          <a href={LICENSE_URL} target="_blank" rel="noreferrer">
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}
