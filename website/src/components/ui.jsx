import { Check, Copy } from "lucide-react";
import { highlight } from "../lib/highlight.js";
import { useCopy } from "../lib/useCopy.js";

export const GITHUB_URL = "https://github.com/Pranav00076/devkit-lite";
export const NPM_URL = "https://www.npmjs.com/package/portslug";
export const LICENSE_URL =
  "https://github.com/Pranav00076/devkit-lite/blob/main/LICENSE";
export const VERSION = "0.1.2";

/** Static, pre-highlighted code block. */
export function Code({ code, className = "" }) {
  return (
    <pre className={`code ${className}`}>
      <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
    </pre>
  );
}

/** Small copy button that shows a check mark after copying. */
export function CopyButton({ text, className = "" }) {
  const [copied, copy] = useCopy();
  return (
    <button
      type="button"
      className={`copy-btn ${className}`}
      onClick={() => copy(text)}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="copy-icon copied" size={14} />
      ) : (
        <Copy className="copy-icon" size={14} />
      )}
    </button>
  );
}

/** `$ npm install portslug` chip with copy, used in hero + CTA. */
export function InstallChip() {
  const cmd = "npm install portslug";
  const [copied, copy] = useCopy();
  return (
    <button
      type="button"
      className="install-chip"
      onClick={() => copy(cmd)}
      title="Copy install command"
    >
      <span className="dollar">$</span> npm install portslug
      {copied ? (
        <Check className="chip-icon copied" size={15} />
      ) : (
        <Copy className="chip-icon" size={15} />
      )}
    </button>
  );
}
