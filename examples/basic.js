// Run with: node examples/basic.js
import { isPortFree, isPortInUse, findFreePort, waitForPort, slugify } from "../src/index.js";

const port = await findFreePort(3000);
console.log(`Found free port: ${port}`);

console.log(`Is ${port} free?`, await isPortFree(port));
console.log(`Is ${port} in use?`, await isPortInUse(port));

// Wait for a server that is (almost certainly) not there — demonstrates the timeout error.
try {
  await waitForPort(port, { timeout: 500, interval: 100 });
  console.log("Something answered on", port);
} catch (err) {
  console.log("Expected timeout:", err.message);
}

console.log(slugify("Hello World!"));            // hello-world
console.log(slugify("Café  Crème & Co."));       // cafe-creme-co
