const chalk =
    import ('chalk');

class Logging {
    static log = (args) => this.info(args);
    static info = (args) => console.log(chalk.green(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.greenBright(args) : args);
    static warn = (args) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
    static err = (args) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERR]`), typeof args === 'string' ? chalk.redBright(args) : args);
}