# portbind

<img src="docs/logo.svg" alt="portbind mark" width="96" height="96">

**Scan files for 0.0.0.0 and PORT or $PORT. Exit 0 only when both patterns exist.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/portbind?display_name=release)
[![npm](https://img.shields.io/npm/v/@magnexis/portbind.svg)](https://www.npmjs.com/package/@magnexis/portbind)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/portbind/) · **Source:** [`theworker02/portbind`](https://github.com/theworker02/portbind) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/portbind/releases/tag/v1.0.0) · **npm:** [`@magnexis/portbind`](https://www.npmjs.com/package/@magnexis/portbind)

## Why it exists

PaaS hosts like Render require listening on 0.0.0.0 and the provided PORT. portbind is a cheap static check you can run in CI so a merge cannot ship a localhost-only server.

## Who it is for

Service authors targeting cloud hosts with ephemeral ports, and reviewers of Dockerfiles or Node servers.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm install -g @magnexis/portbind
portbind --help
```

Package page: https://www.npmjs.com/package/@magnexis/portbind

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/portbind.git
portbind --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/portbind.git
cd portbind
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/portbind --help
node src/cli.js --help
```

## Quick start

```bash
portbind ./src
echo exit:$?
```

## CLI reference

```text
portbind 1.00 (1.0.0)

Usage:
  portbind [options] [files-or-globs...]

Scan UTF-8 files for bind-all and PORT patterns:
  * 0.0.0.0          bind-all address
  * $PORT or PORT    port from the environment

Exit 0 only when every required pattern is present (they may be in
different files). Default requirement is BOTH host and port.

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             Structured result including matching files
  --list             List files that contain host and/or port patterns
  --require-host     Require 0.0.0.0 (default: on unless only --require-port)
  --require-port     Require PORT/$PORT (default: on unless only --require-host)

Arguments:
  files-or-globs     Files, directories, or globs such as src/**/*.js
                     Default: current directory (skips node_modules, .git)

Exit codes:
  0  required patterns found
  1  missing pattern, missing path, or unknown option

Examples:
  portbind
  portbind src/server.js
  portbind --list "src/**/*.js"
  portbind --require-host --json ./src
```

Print the same text locally:

```bash
portbind --help
portbind -h
portbind --version
portbind -V
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. Default requirement is both host and port. `--require-host` or `--require-port` alone narrows the check.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Required patterns found. |
| `1` | Missing pattern, missing path, or unknown option. |

## Examples

### Success path

Both 0.0.0.0 and PORT appear in the tree.

```bash
portbind ./src
```

```text
portbind: OK
  0.0.0.0   found
  PORT      found
```

### Failure path

A missing path exits 1.

```bash
portbind no-such-path
```

```text
path not found: no-such-path
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/portbind/](https://theworker02.github.io/portbind/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
