import { CircleCheck, CircleX } from "lucide-react";

const ROWS = [
  ["40+ lines of net plumbing per project", "One await per task"],
  ["Hand-rolled regex slug logic", "Unicode-aware slugify()"],
  ["Guess a port and hope", "findFreePort() scans for you"],
  ["Polling loops and timer spaghetti", "waitForPort() with timeout & interval"],
  ["Reinvent it — then test it yourself", "Zero deps, fully typed, MIT licensed"],
];

export default function Comparison() {
  return (
    <section className="section container" id="why">
      <h2 className="section-title center">Why portslug?</h2>
      <p className="section-lead center">
        Every Node.js project reinvents the same two chores: finding a free
        port and turning a title into a URL. portslug does both — in five
        small functions.
      </p>
      <div className="why-table">
        <div className="why-head">
          <div>Without portslug</div>
          <div className="why-head-good">With portslug</div>
        </div>
        {ROWS.map(([bad, good]) => (
          <div className="why-row" key={good}>
            <div className="why-bad">
              <CircleX size={15} className="icon-bad" />
              <span>{bad}</span>
            </div>
            <div className="why-good">
              <CircleCheck size={15} className="icon-good" />
              <span>{good}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
