import { useCallback, useEffect, useRef, useState } from "react";

/** Copy-to-clipboard hook with a short "copied" feedback window. */
export function useCopy(timeout = 1500) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard unavailable (e.g. insecure context) — still show feedback.
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );

  return [copied, copy];
}
