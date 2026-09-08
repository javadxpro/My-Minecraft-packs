// Assembles the Node smoke-test environment:
//  - copies the version-controlled API mock into node_modules/
//  - copies the real pack scripts next to the test (as they would run)
// Run automatically by `npm test`.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const packScripts = path.join(here, "..", "TrueCraft+_Real_Survival_BP", "scripts");

fs.mkdirSync(path.join(here, "node_modules", "@minecraft", "server"), { recursive: true });
fs.cpSync(path.join(here, "mocks", "@minecraft", "server"), path.join(here, "node_modules", "@minecraft", "server"), { recursive: true });

fs.rmSync(path.join(here, "scripts"), { recursive: true, force: true });
fs.cpSync(packScripts, path.join(here, "scripts"), { recursive: true });

console.log("[testenv] mock + pack scripts ready");
