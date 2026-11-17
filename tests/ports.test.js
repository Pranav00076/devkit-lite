import { describe, it, expect, afterEach } from "vitest";
import net from "node:net";
import { isPortFree, isPortInUse, findFreePort, waitForPort } from "../src/ports.js";

/** @type {import("node:net").Server[]} */
const servers = [];

/** Start a TCP server on the given port (or an OS-assigned port when omitted). */
function listen(port = 0) {
  return new Promise((resolve, reject) => {
    const server = net.createServer(() => {});
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      servers.push(server);
      resolve(server.address().port);
    });
  });
}

function closeAll() {
  return Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise((resolve) => {
          server.closeAllConnections?.();
          server.close(() => resolve());
        })
    )
  );
}

afterEach(closeAll);

describe("isPortFree / isPortInUse", () => {
  it("returns false / true for an occupied port", async () => {
    const port = await listen();
    await expect(isPortFree(port)).resolves.toBe(false);
    await expect(isPortInUse(port)).resolves.toBe(true);
  });

  it("returns true / false for a port after its server is closed", async () => {
    const port = await listen();
    await closeAll();
    await expect(isPortFree(port)).resolves.toBe(true);
    await expect(isPortInUse(port)).resolves.toBe(false);
  });

  it.each([0, -1, 70000, 3.14, "3000"])("throws for invalid port %p", async (port) => {
    await expect(isPortFree(port)).rejects.toThrow(TypeError);
    await expect(isPortInUse(port)).rejects.toThrow(TypeError);
  });
});

describe("findFreePort", () => {
  it("returns a port that is actually bindable", async () => {
    const port = await findFreePort();
    expect(Number.isInteger(port)).toBe(true);
    expect(port).toBeGreaterThanOrEqual(3000);
    expect(port).toBeLessThanOrEqual(65535);
    // The reported port must really be free right now.
    await expect(isPortFree(port)).resolves.toBe(true);
  });

  it("skips occupied ports and finds the next free one", async () => {
    const occupied = await listen();
    // Occupy a few consecutive ports after it too.
    const extra = [await listen(), await listen()];
    expect(extra.every((p) => p > occupied)).toBe(true);

    const port = await findFreePort(occupied);
    expect(port).toBeGreaterThan(occupied);
  });

  it("throws for an invalid start port", async () => {
    await expect(findFreePort(99999)).rejects.toThrow(TypeError);
  });
});

describe("waitForPort", () => {
  it("resolves once a server is accepting connections", async () => {
    const port = await listen();
    await expect(waitForPort(port, { timeout: 3000, interval: 50 })).resolves.toBeUndefined();
  });

  it("resolves when a server starts after a delay", async () => {
    const port = await listen();
    await closeAll();
    const restarted = listen(port);
    await expect(waitForPort(port, { timeout: 3000, interval: 50 })).resolves.toBeUndefined();
    await restarted;
  });

  it("rejects with a meaningful error on timeout", async () => {
    const port = await listen();
    await closeAll();
    await expect(waitForPort(port, { timeout: 300, interval: 50 })).rejects.toThrow(
      /did not accept connections within 300ms/
    );
  });

  it("throws for an invalid port or options", async () => {
    await expect(waitForPort(0)).rejects.toThrow(TypeError);
    await expect(waitForPort(3000, { timeout: -1 })).rejects.toThrow(TypeError);
    await expect(waitForPort(3000, { interval: 0 })).rejects.toThrow(TypeError);
  });
});
