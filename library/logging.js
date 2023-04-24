const chalk = require('chalk');

const Logging = {
    log: (args) => this.info(args),
    info: (args) => console.log(chalk.green(`[${new Date().toLocaleString()}] [INFO]`), chalk.greenBright(args)),
    warn: (args) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), chalk.yellowBright(args)),
    err: (args) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERR]`), chalk.redBright(args))
}

module.exports = { Logging };