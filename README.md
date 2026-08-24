# portbind

<img src="docs/logo.svg" alt="portbind mark" width="88" height="88">

**Scan files for 0.0.0.0 and PORT or $PORT. Exit 0 only when both patterns exist.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/portbind?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

PaaS hosts like Render require listening on 0.0.0.0 and the provided PORT. portbind is a cheap static check you can run in CI so a merge cannot ship a localhost-only server.

## Who it is for

Service authors targeting cloud hosts with ephemeral ports, and reviewers of Dockerfiles or Node servers.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/portbind.git --help
node src/cli.js --help
```

## Quick start

```bash
portbind ./src
echo exit:$?
```

## CLI reference

Synopsis:

```text
portbind [options] [files-or-dirs...]
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `[files-or-dirs...]` | Targets to scan. Default: current directory. Skips node_modules, .git, dist, coverage. |

Print the same text locally:

```bash
portbind --help
portbind --version
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration. A match for 0.0.0.0 anywhere plus a match for $PORT or the word PORT (word boundary) anywhere — they may live in different files.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Both bind-all and PORT were found. |
| `1` | One or both patterns missing. |

## Examples

### Success path

Two files together satisfy the rule.

```bash
portbind ./app
```

```json
{"ok":true,"hasBindAll":true,"hasPort":true}
```

### Failure path

Only PORT is present.

```bash
portbind ./broken
```

```json
{"ok":false,"hasBindAll":false,"hasPort":true}
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
