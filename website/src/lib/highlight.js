// Tiny syntax highlighter for the static JS snippets on this site.
// Produces HTML strings with token spans; content is always our own, never user input.

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
const escapeHtml = (s) => s.replace(/[&<>]/g, (c) => ESC[c]);

const KEYWORDS = new Set([
  "import", "from", "export", "const", "let", "var", "await", "async",
  "function", "return", "new", "throw", "if", "else", "for", "of", "in",
  "try", "catch", "typeof", "true", "false", "null", "default",
]);

const TOKEN = new RegExp(
  [
    "(\\/\\/[^\\n]*)", // 1 line comment
    "(\\/\\*[\\s\\S]*?\\*\\/)", // 2 block comment
    "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\")", // 3 string
    "(`(?:[^`\\\\]|\\\\.)*`)", // 4 template string
    "(\\b\\d+(?:\\.\\d+)?\\b)", // 5 number
    "([A-Za-z_$][\\w$]*)(?=\\s*\\()", // 6 function call
  ].join("|"),
  "g"
);

const KEYWORD_WORD =
  /(?<![\w$])([A-Za-z_$][\w$]*)(?![\w$])/g;

function highlightPlain(text) {
  return escapeHtml(text).replace(KEYWORD_WORD, (word) =>
    KEYWORDS.has(word) ? `<span class="tok-k">${word}</span>` : word
  );
}

export function highlight(code) {
  let out = "";
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    out += highlightPlain(code.slice(last, m.index));
    const [full, line, block, str, tpl, num, fn] = m;
    if (line !== undefined || block !== undefined) {
      out += `<span class="tok-c">${escapeHtml(full)}</span>`;
    } else if (str !== undefined || tpl !== undefined) {
      out += `<span class="tok-s">${escapeHtml(full)}</span>`;
    } else if (num !== undefined) {
      out += `<span class="tok-n">${escapeHtml(full)}</span>`;
    } else if (fn !== undefined) {
      out += `<span class="tok-f">${escapeHtml(full)}</span>`;
    }
    last = m.index + full.length;
  }
  out += highlightPlain(code.slice(last));
  return out;
}
