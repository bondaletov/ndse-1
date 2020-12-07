module.exports.yargsOptions = {
    help: { type: "boolean", alias: "h", describe: "показать помощь" },
    version: { type: "boolean", alias: "v", describe: "показать версию" },
    file: { type: "string", alias: "f", describe: "путь к лог-файлу", required: true },
};