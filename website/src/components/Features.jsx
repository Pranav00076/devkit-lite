import { Ban, Link2, Package, Plug, Radar, Timer } from "lucide-react";
import { Code } from "./ui.jsx";

const FEATURES = [
  {
    icon: Plug,
    name: "isPortFree()",
    desc: "Try-bind a TCP port to see whether it can actually be used.",
    sig: "(port, host?) → Promise<boolean>",
    code: `import { isPortFree } from "portslug";
await isPortFree(3000); // true or false`,
  },
  {
    icon: Ban,
    name: "isPortInUse()",
    desc: "The same check, inverted — true when the port is occupied.",
    sig: "(port, host?) → Promise<boolean>",
    code: `import { isPortInUse } from "portslug";
await isPortInUse(3000); // true or false`,
  },
  {
    icon: Radar,
    name: "findFreePort()",
    desc: "Scans upward from a start port and returns the first free one.",
    sig: "(startPort?, host?) → Promise<number>",
    code: `import { findFreePort } from "portslug";
const port = await findFreePort(3000);`,
  },
  {
    icon: Timer,
    name: "waitForPort()",
    desc: "Resolves once a server accepts connections — with timeout & interval.",
    sig: "(port, options?) → Promise<void>",
    code: `import { waitForPort } from "portslug";
await waitForPort(port, { timeout: 5000 });`,
  },
  {
    icon: Link2,
    name: "slugify()",
    desc: "Unicode-aware, URL-safe slugs: diacritics stripped, hyphens collapsed.",
    sig: "(text) → string",
    code: `import { slugify } from "portslug";
slugify("Café  Crème & Co.");
// "cafe-creme-co"`,
  },
];

const EXPORTS_CODE = `// src/index.js — the entire public API
export { isPortFree, isPortInUse,
         findFreePort, waitForPort }
  from "./ports.js";

export { slugify } from "./slugify.js";`;

export default function Features() {
  return (
    <section className="section container" id="features">
      <h2 className="section-title center">Five exports. That’s the package.</h2>
      <p className="section-lead center">
        No plugins, no options object maze. Each function does one thing and
        tells you exactly what it throws.
      </p>
      <div className="feature-grid">
        {FEATURES.map((f) => (
          <article className="feature-card" key={f.name}>
            <div className="feature-head">
              <f.icon size={20} className="feature-icon" />
              <h3 className="feature-name">{f.name}</h3>
            </div>
            <p className="feature-desc">{f.desc}</p>
            <div className="feature-sig">{f.sig}</div>
            <Code code={f.code} className="feature-code" />
          </article>
        ))}
        <article className="feature-card feature-card-accent">
          <div className="feature-head">
            <Package size={20} className="feature-icon" />
            <h3 className="feature-name">Nothing else.</h3>
          </div>
          <p className="feature-desc">
            The full surface is a single index.js with these five exports —
            no side effects, tree-shakeable, zero runtime dependencies.
          </p>
          <Code code={EXPORTS_CODE} className="feature-code" />
        </article>
      </div>
    </section>
  );
}
