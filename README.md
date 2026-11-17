# portslug

Tiny Node.js dev utilities: TCP port checks and a slugify helper.
Zero runtime dependencies, ES modules, Node.js 18+.

## Installation

```bash
npm install portslug
```

## API

The package exports exactly five functions.

### `isPortFree(port, host = "127.0.0.1")`

Returns `true` if the TCP port can be bound on `host`.

```js
import { isPortFree } from "portslug";
await isPortFree(3000); // true or false
```

### `isPortInUse(port, host = "127.0.0.1")`

Returns `true` if the TCP port is occupied on `host`.

```js
import { isPortInUse } from "portslug";
await isPortInUse(3000); // true or false
```

### `findFreePort(startPort = 3000, host = "127.0.0.1")`

Returns the first available port starting at `startPort` (inclusive). Throws if no port is free up to 65535.

```js
import { findFreePort } from "portslug";
const port = await findFreePort(3000); // e.g. 3000, or the next free port
```

### `waitForPort(port, options = {})`

Resolves once a TCP server is accepting connections on `port`. Options: `host` (default `"127.0.0.1"`), `timeout` (default `10000` ms), `interval` (default `250` ms). Rejects with a descriptive error if the timeout expires.

```js
import { waitForPort } from "portslug";
await waitForPort(3000, { timeout: 5000, interval: 100 }); // resolves, or rejects on timeout
```

### `slugify(text)`

Converts text into a URL-friendly slug: lowercases, normalizes Unicode, replaces spaces with hyphens, removes special characters, collapses and trims hyphens.

```js
import { slugify } from "portslug";
slugify("Hello World!");      // "hello-world"
slugify("Café  Crème & Co."); // "cafe-creme-co"
```

## Example

```js
import { findFreePort, waitForPort, slugify } from "portslug";

const port = await findFreePort(3000);
startMyServer(port);          // your own server
await waitForPort(port);      // resolves when the server accepts connections
console.log(slugify("My Blog Post Title!"));
```

## Requirements

- Node.js 18+
- No external runtime dependencies

## Notes & limitations

- `isPortFree`/`findFreePort` briefly bind the port to test it; in rare cases another process could claim it in between ("TOCTOU" race — kept as small as practical).
- `slugify` keeps ASCII letters, digits and hyphens; accented Latin characters are transliterated by Unicode normalization, while non-Latin scripts (e.g. CJK) are dropped.

## License

MIT
