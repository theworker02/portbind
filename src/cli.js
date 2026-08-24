#!/usr/bin/env node
const { scanPaths, formatHuman } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (const arg of argv) {
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--list") flags.list = true;
    else if (arg === "--require-host") flags.requireHost = true;
    else if (arg === "--require-port") flags.requirePort = true;
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  let requireHost = true;
  let requirePort = true;
  if (flags.requireHost || flags.requirePort) {
    requireHost = Boolean(flags.requireHost);
    requirePort = Boolean(flags.requirePort);
  }

  const result = scanPaths(positional, { requireHost, requirePort });
  if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  else process.stdout.write(formatHuman(result, { list: flags.list }));
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  fail(err.message);
}
