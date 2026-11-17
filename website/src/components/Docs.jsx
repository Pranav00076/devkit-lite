import { Code, CopyButton, InstallChip } from "./ui.jsx";

const NAV = [
  ["installation", "Installation"],
  ["requirements", "Requirements"],
  ["api", "API Reference"],
  ["errors", "Error Handling"],
  ["notes", "Notes"],
];

const IMPORT_CODE = `import {
  isPortFree,
  isPortInUse,
  findFreePort,
  waitForPort,
  slugify,
} from "portslug";`;

const API = [
  {
    name: "isPortFree",
    sig: "isPortFree(port: number, host?: string): Promise<boolean>",
    params: [
      ["port", "number", "Port number (1–65535). Required."],
      ["host", "string", 'Host interface to bind. Default: "127.0.0.1".'],
    ],
    returns: "Promise<boolean> — true if the TCP port can be bound on host.",
    throws: "TypeError if the port is invalid.",
    example: `await isPortFree(3000); // true or false`,
  },
  {
    name: "isPortInUse",
    sig: "isPortInUse(port: number, host?: string): Promise<boolean>",
    params: [
      ["port", "number", "Port number (1–65535). Required."],
      ["host", "string", 'Host interface to check. Default: "127.0.0.1".'],
    ],
    returns: "Promise<boolean> — true if the port is currently occupied.",
    throws: "TypeError if the port is invalid.",
    example: `await isPortInUse(3000); // true or false`,
  },
  {
    name: "findFreePort",
    sig: "findFreePort(startPort?: number, host?: string): Promise<number>",
    params: [
      ["startPort", "number", "Port to start searching from. Default: 3000."],
      ["host", "string", 'Host interface to bind. Default: "127.0.0.1".'],
    ],
    returns:
      "Promise<number> — the first available port, starting at startPort (inclusive).",
    throws:
      "TypeError if startPort is invalid. Error if no port is free up to 65535.",
    example: `const port = await findFreePort(3000); // e.g. 3000, or the next free port`,
  },
  {
    name: "waitForPort",
    sig: "waitForPort(port: number, options?: WaitForPortOptions): Promise<void>",
    params: [
      ["port", "number", "Port number (1–65535). Required."],
      ["options.host", "string", 'Host to connect to. Default: "127.0.0.1".'],
      ["options.timeout", "number", "Total time to wait, in ms. Default: 10000."],
      ["options.interval", "number", "Delay between attempts, in ms. Default: 250."],
    ],
    returns: "Promise<void> — resolves as soon as the port accepts connections.",
    throws:
      "TypeError if the port or options are invalid. Error if the timeout expires before the port becomes available.",
    example: `await waitForPort(3000, { timeout: 5000, interval: 100 });
// resolves, or rejects on timeout`,
  },
  {
    name: "slugify",
    sig: "slugify(text: string): string",
    params: [["text", "string", "Text to slugify. Required."]],
    returns: "string — the URL-friendly slug. Empty string for empty input.",
    throws: "TypeError if text is not a string.",
    example: `slugify("Hello World!");      // "hello-world"
slugify("Café  Crème & Co."); // "cafe-creme-co"`,
  },
];

const ERRORS_CODE = `// TypeErrors — bad arguments, thrown synchronously
findFreePort(0);        // Invalid port number: 0.
findFreePort(70000);    // Expected an integer between 1 and 65535.
slugify(42);            // Expected a string, got number.

// Errors — runtime failures, thrown asynchronously
await findFreePort(65535);  // No free port found on 127.0.0.1 …
await waitForPort(3000, { timeout: 1000 });
// Port 3000 on 127.0.0.1 did not accept connections
// within 1000ms (last error: ECONNREFUSED)`;

export default function Docs() {
  return (
    <section className="section container-wide" id="docs">
      <h2 className="section-title center">Documentation.</h2>
      <p className="section-lead center">
        Everything portslug exports — signatures taken straight from the
        shipped TypeScript declarations.
      </p>

      <div className="docs-layout">
        <aside className="docs-nav">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="docs-nav-link">
              {label}
            </a>
          ))}
        </aside>

        <div className="docs-content">
          <h3 id="installation" className="docs-h3">
            Installation
          </h3>
          <div className="docs-install">
            <InstallChip />
            <Code code={IMPORT_CODE} className="docs-code" />
          </div>

          <h3 id="requirements" className="docs-h3">
            Requirements
          </h3>
          <ul className="docs-list">
            <li>
              <strong>Node.js 18+</strong> — uses{" "}
              <code className="inline-code">node:net</code> and modern ES
              module syntax.
            </li>
            <li>
              <strong>ES Modules only</strong> — the package is pure ESM ({" "}
              <code className="inline-code">"type": "module"</code> ). No
              CommonJS entry point.
            </li>
            <li>
              <strong>Zero runtime dependencies</strong> — install once, no
              transitive updates to babysit.
            </li>
            <li>
              <strong>TypeScript declarations included</strong> —{" "}
              <code className="inline-code">types/index.d.ts</code> ships with
              the package.
            </li>
          </ul>

          <h3 id="api" className="docs-h3">
            API Reference
          </h3>
          {API.map((fn) => (
            <article className="api-entry" key={fn.name}>
              <h4 className="api-name">{fn.name}</h4>
              <div className="api-sig">{fn.sig}</div>
              <table className="param-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {fn.params.map(([name, type, desc]) => (
                    <tr key={name}>
                      <td className="mono">{name}</td>
                      <td className="mono param-type">{type}</td>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="api-meta">
                <div>
                  <span className="api-key">Returns</span>
                  {fn.returns}
                </div>
                <div>
                  <span className="api-key">Throws</span>
                  {fn.throws}
                </div>
              </div>
              <Code code={fn.example} className="api-code" />
            </article>
          ))}

          <h3 id="errors" className="docs-h3">
            Error Handling
          </h3>
          <p className="docs-p">
            Invalid arguments throw <strong>TypeError</strong> with a message
            that shows the offending value. Runtime failures — no free port,
            server never came up — throw <strong>Error</strong> with the host,
            port and the last OS error code.
          </p>
          <Code code={ERRORS_CODE} className="docs-code" />

          <h3 id="notes" className="docs-h3">
            Notes
          </h3>
          <ul className="docs-list">
            <li>
              <strong>TOCTOU race:</strong> isPortFree / findFreePort briefly
              bind the port to test it; in rare cases another process could
              claim it in between. The window is kept as small as practical.
            </li>
            <li>
              <strong>Unicode scope:</strong> slugify keeps ASCII letters,
              digits and hyphens. Accented Latin characters are transliterated
              via Unicode normalization; non-Latin scripts (e.g. CJK) are
              dropped — try it in the playground above.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
