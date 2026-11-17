import { ArrowRight, Github } from "lucide-react";
import { InstallChip, GITHUB_URL, Code } from "./ui.jsx";

const WITHOUT_CODE = `// Finding a free port, by hand
import net from "node:net";

const server = net.createServer();
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") tryNextPort();
});
server.listen(3000, () => {
  const port = server.address().port;
  server.close(() => resolve(port));
});

// ...and your own slug logic:
// lowercase, strip accents, remove special
// chars, collapse hyphens, trim edges...`;

const WITH_CODE = `import { findFreePort, slugify }
  from "portslug";

const port = await findFreePort(3000);
// 3000, or the next free port

const slug = slugify("Hello World!");
// "hello-world"

// No servers, no regex gymnastics.
// That's the whole toolkit.`;

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <h1 className="hero-title">
        Small Utilities.
        <br />
        Less Developer Friction.
      </h1>
      <p className="hero-sub">
        Check ports, discover available connections, and generate clean URL
        slugs with a tiny Node.js toolkit.
      </p>

      <div className="hero-actions">
        <a href="#docs" className="btn-primary">
          Get Started <ArrowRight size={16} />
        </a>
        <InstallChip />
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          aria-label="portslug on GitHub"
        >
          <Github size={16} /> GitHub
        </a>
      </div>

      <div className="compare-panel">
        <div className="compare-cell bad">
          <div className="compare-label">Without portslug</div>
          <Code code={WITHOUT_CODE} className="code-bad" />
        </div>
        <div className="compare-cell good">
          <div className="compare-label">With portslug</div>
          <Code code={WITH_CODE} className="code-good" />
        </div>
      </div>
    </section>
  );
}
