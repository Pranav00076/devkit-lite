import net from "node:net";

/**
 * Validate that a value is a usable TCP port number.
 * @param {number} port
 * @returns {void}
 * @throws {TypeError} if the port is not an integer between 1 and 65535
 */
function assertPort(port) {
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new TypeError(
      `Invalid port number: ${JSON.stringify(port)}. Expected an integer between 1 and 65535.`
    );
  }
}

/**
 * Try to bind a temporary TCP server to the given port.
 * Resolves true if the bind succeeded (port is free), false otherwise.
 * The server is always closed and its sockets destroyed.
 * @param {number} port
 * @param {string} host
 * @returns {Promise<boolean>}
 */
function tryBind(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => {
      // EADDRINUSE, EACCES, bad host, ... — in any case the port is not usable.
      server.close(() => resolve(false));
    });
    server.listen(port, host, () => {
      server.close(() => resolve(true));
    });
  });
}

/**
 * Attempt a single TCP connection.
 * Resolves once connected; rejects if the connection fails or times out.
 * The socket and timer are always cleaned up.
 * @param {number} port
 * @param {string} host
 * @param {number} timeout per-attempt timeout in ms
 * @returns {Promise<void>}
 */
function tryConnect(port, host, timeout) {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ port, host });
    let settled = false;

    const finish = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      if (err) reject(err);
      else resolve();
    };

    const timer = setTimeout(() => finish(new Error("Connection timed out")), timeout);

    socket.once("connect", () => finish());
    socket.once("error", (err) => finish(err));
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check whether a TCP port can be bound on the given host.
 * @param {number} port Port number (1-65535)
 * @param {string} [host="127.0.0.1"] Host interface to bind
 * @returns {Promise<boolean>} true if the port is available
 * @throws {TypeError} if the port is invalid
 */
export async function isPortFree(port, host = "127.0.0.1") {
  assertPort(port);
  return tryBind(port, host);
}

/**
 * Check whether a TCP port is currently occupied on the given host.
 * @param {number} port Port number (1-65535)
 * @param {string} [host="127.0.0.1"] Host interface to check
 * @returns {Promise<boolean>} true if the port is in use
 * @throws {TypeError} if the port is invalid
 */
export async function isPortInUse(port, host = "127.0.0.1") {
  return !(await isPortFree(port, host));
}

/**
 * Find the first available port starting at startPort (inclusive).
 * @param {number} [startPort=3000] Port to start searching from
 * @param {string} [host="127.0.0.1"] Host interface to bind
 * @returns {Promise<number>} the first available port number
 * @throws {TypeError} if startPort is invalid
 * @throws {Error} if no port is free up to 65535
 */
export async function findFreePort(startPort = 3000, host = "127.0.0.1") {
  assertPort(startPort);
  for (let port = startPort; port <= 65535; port++) {
    if (await tryBind(port, host)) {
      return port;
    }
  }
  throw new Error(`No free port found on ${host} between ${startPort} and 65535`);
}

/**
 * Wait until a TCP server is accepting connections on the given port.
 * @param {number} port Port number (1-65535)
 * @param {object} [options={}]
 * @param {string} [options.host="127.0.0.1"] Host to connect to
 * @param {number} [options.timeout=10000] Total time to wait, in ms
 * @param {number} [options.interval=250] Delay between connection attempts, in ms
 * @returns {Promise<void>} resolves as soon as the port accepts connections
 * @throws {TypeError} if the port is invalid
 * @throws {Error} if the timeout expires before the port becomes available
 */
export async function waitForPort(port, options = {}) {
  assertPort(port);
  const { host = "127.0.0.1", timeout = 10000, interval = 250 } = options;
  if (typeof timeout !== "number" || timeout <= 0) {
    throw new TypeError(`Invalid timeout: ${JSON.stringify(timeout)}. Expected a positive number of milliseconds.`);
  }
  if (typeof interval !== "number" || interval <= 0) {
    throw new TypeError(`Invalid interval: ${JSON.stringify(interval)}. Expected a positive number of milliseconds.`);
  }

  const deadline = Date.now() + timeout;
  let lastError = null;

  while (Date.now() < deadline) {
    const remaining = deadline - Date.now();
    try {
      await tryConnect(port, host, Math.min(remaining, interval));
      return;
    } catch (err) {
      lastError = err;
      const wait = Math.min(interval, deadline - Date.now());
      if (wait > 0) await sleep(wait);
    }
  }

  const reason = lastError ? ` (last error: ${lastError.code ?? lastError.message})` : "";
  throw new Error(
    `Port ${port} on ${host} did not accept connections within ${timeout}ms${reason}`
  );
}
