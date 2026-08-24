#!/usr/bin/env node
const { scanPaths } = require("./index.js");

const targets = process.argv.slice(2);
const result = scanPaths(targets.length ? targets : ["."]);
process.stdout.write(`${JSON.stringify(result)}\n`);
process.exit(result.ok ? 0 : 1);
