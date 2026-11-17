import { ArrowRight } from "lucide-react";
import { Code } from "./ui.jsx";

const STEPS = [
  { label: "Check", fn: "isPortFree / isPortInUse", accent: false },
  { label: "Find", fn: "findFreePort", accent: "purple" },
  { label: "Wait", fn: "waitForPort", accent: false },
  { label: "Slugify", fn: "slugify", accent: "cyan" },
];

const EXAMPLE_CODE = `import { findFreePort, waitForPort, slugify } from "portslug";

const port = await findFreePort(3000);
startMyServer(port);        // your own server
await waitForPort(port);    // resolves when it accepts connections
console.log(slugify("My Blog Post Title!"));`;

export default function HowItWorks() {
  return (
    <section className="section container" id="how-it-works">
      <h2 className="section-title center">The portslug pipeline</h2>
      <div className="flow">
        {STEPS.map((step, i) => (
          <div className="flow-step" key={step.label}>
            {i > 0 && <ArrowRight size={16} className="flow-arrow" />}
            <div
              className={`flow-pill${
                step.accent === "purple"
                  ? " flow-pill-accent"
                  : step.accent === "cyan"
                    ? " flow-pill-cyan"
                    : ""
              }`}
            >
              <span className="flow-label">{step.label}</span>
              <span className="flow-fn">{step.fn}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="section-lead center flow-lead">
        The typical dev-server dance: check the port you want, scan for the
        next free one, wait until your server is really listening — then slug
        a title for the URL.
      </p>
      <div className="example-panel">
        <div className="code-tabbar">
          <span className="code-tab active">basic.js</span>
        </div>
        <Code code={EXAMPLE_CODE} className="example-code" />
      </div>
    </section>
  );
}
