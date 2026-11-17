import { useState } from "react";
import { Check, CircleCheck, Copy, Info, Terminal } from "lucide-react";
import { slugify } from "../../../src/slugify.js";
import { Code, CopyButton } from "./ui.jsx";
import { useCopy } from "../lib/useCopy.js";

const EXAMPLES = [
  "Hello World!",
  "Café  Crème & Co.",
  "Über Straße 42 ×",
  "My_Blog -- Post  #1",
  "  ...  ",
  "日本語 テスト",
  "Emoji 🚀 & <tags>",
];

const PIPELINE = [
  "normalize NFKD",
  "strip diacritics",
  "lowercase",
  "remove specials",
  "collapse hyphens",
  "trim",
];

const CHECK_CODE = `import { isPortFree, isPortInUse }
  from "portslug";

await isPortFree(3000);  // can it bind?
await isPortInUse(3000); // taken?
await isPortFree(3001, "0.0.0.0"); // host?`;

const FIND_CODE = `import { findFreePort } from "portslug";

// Scan upward from 3000 until a bind works
const port = await findFreePort(3000);
console.log(port); // or the next free port`;

const WAIT_CODE = `import { waitForPort } from "portslug";

await waitForPort(3000, {
  host: "127.0.0.1", // host to connect to
  timeout: 10000,    // total wait, ms
  interval: 250,     // retry delay, ms
}); // resolves when the server is listening`;

const PORT_CARDS = [
  { file: "check-port.mjs", code: CHECK_CODE },
  { file: "find-port.mjs", code: FIND_CODE },
  { file: "wait-for-server.mjs", code: WAIT_CODE },
];

function SlugTab() {
  const [text, setText] = useState("Hello World!");
  const slug = slugify(text);
  const [copied, copy] = useCopy();

  return (
    <div className="play-body">
      <div className="play-grid">
        <div className="play-cell">
          <div className="play-label">Input</div>
          <input
            type="text"
            className="play-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type anything…"
            spellCheck="false"
            aria-label="Text to slugify"
          />
          <div className="example-chips">
            {EXAMPLES.map((example) => (
              <button
                type="button"
                key={example}
                className={`chip${example === text ? " chip-active" : ""}`}
                onClick={() => setText(example)}
              >
                {example.trim() === "" ? '"  "' : example}
              </button>
            ))}
          </div>
          <p className="play-hint">
            Try the examples: accents are transliterated, punctuation
            disappears, and everything collapses into one clean hyphen
            between words.
          </p>
        </div>

        <div className="play-cell play-cell-out">
          <div className="play-label">
            Output — slugify(text)
            <button
              type="button"
              className="copy-btn"
              onClick={() => copy(slug)}
              aria-label="Copy slug"
            >
              {copied ? (
                <Check size={14} className="copy-icon copied" />
              ) : (
                <Copy size={14} className="copy-icon" />
              )}
            </button>
          </div>
          <div className={`slug-out${slug ? "" : " slug-out-empty"}`}>
            {slug || "— empty —"}
          </div>
          <div className="pipeline">
            {PIPELINE.map((step, i) => (
              <span className="pipeline-step" key={step}>
                {i > 0 && <span className="pipeline-arrow">→</span>}
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortTab() {
  return (
    <div className="play-body">
      <div className="port-note">
        <Info size={16} className="port-note-icon" />
        <p>
          The port utilities talk to the operating system through Node’s
          <code className="inline-code"> net </code> module — they bind and
          connect real TCP sockets. A browser sandbox can’t do that, so these
          examples are for your terminal. Run them with Node.js 18+; nothing
          here is faked with mock results.
        </p>
      </div>
      <div className="port-grid">
        {PORT_CARDS.map((card) => (
          <div className="port-card" key={card.file}>
            <div className="code-tabbar">
              <Terminal size={14} className="port-card-icon" />
              <span className="code-tab active">{card.file}</span>
              <CopyButton text={card.code} className="port-copy" />
            </div>
            <Code code={card.code} className="port-code" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Playground() {
  const [tab, setTab] = useState("slug");

  return (
    <section className="section container-wide" id="playground">
      <h2 className="section-title center">Playground.</h2>
      <p className="section-lead center">
        Try <code className="inline-code">slugify()</code> live — this page
        runs the real implementation from portslug’s source.
      </p>
      <div className="play-panel">
        <div className="play-tabbar">
          <button
            type="button"
            className={`play-tab${tab === "slug" ? " active" : ""}`}
            onClick={() => setTab("slug")}
          >
            <CircleCheck size={14} /> Slug Playground
          </button>
          <button
            type="button"
            className={`play-tab${tab === "port" ? " active" : ""}`}
            onClick={() => setTab("port")}
          >
            <Terminal size={14} /> Port Utilities
          </button>
        </div>
        {tab === "slug" ? <SlugTab /> : <PortTab />}
      </div>
    </section>
  );
}
