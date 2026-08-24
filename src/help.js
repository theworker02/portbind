const HELP = "portbind 1.00 (1.0.0)\n\nUsage:\n  portbind [options] [files-or-dirs...]\n\nScan UTF-8 files for:\n  * 0.0.0.0          bind-all address\n  * $PORT or PORT    port from the environment\n\nExit 0 only when BOTH are present (they may be in different files).\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nExamples:\n  portbind\n  portbind src/server.js\n  portbind ./src ./bin\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
