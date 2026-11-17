/**
 * Options for {@link waitForPort}.
 */
export interface WaitForPortOptions {
  /** Host to connect to. Default: "127.0.0.1" */
  host?: string;
  /** Total time to wait, in milliseconds. Default: 10000 */
  timeout?: number;
  /** Delay between connection attempts, in milliseconds. Default: 250 */
  interval?: number;
}

/**
 * Check whether a TCP port can be bound on the given host.
 * @throws {TypeError} if the port is invalid
 */
export declare function isPortFree(port: number, host?: string): Promise<boolean>;

/**
 * Check whether a TCP port is currently occupied on the given host.
 * @throws {TypeError} if the port is invalid
 */
export declare function isPortInUse(port: number, host?: string): Promise<boolean>;

/**
 * Find the first available port starting at startPort (inclusive).
 * @throws {TypeError} if startPort is invalid
 * @throws {Error} if no port is free up to 65535
 */
export declare function findFreePort(startPort?: number, host?: string): Promise<number>;

/**
 * Wait until a TCP server is accepting connections on the given port.
 * @throws {TypeError} if the port or options are invalid
 * @throws {Error} if the timeout expires before the port becomes available
 */
export declare function waitForPort(
  port: number,
  options?: WaitForPortOptions
): Promise<void>;

/**
 * Convert a string into a URL-friendly slug.
 * @throws {TypeError} if text is not a string
 */
export declare function slugify(text: string): string;
