const HELP = `portbind 1.00 (1.0.0)

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
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
