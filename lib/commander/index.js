const program = require("commander");
const build = require("../build");
const dev = require("../dev");
// const minimist = require("minimist")

module.exports = v => {
  const camelize = (str)=>{
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
  }
  const cleanArgs = (cmd)=>{
    const args = {}
    cmd.options.forEach(o => {
      const key = camelize(o.long.replace(/^--/, ''))
      if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key]
      }
    })
    return args
  }

  program.version(v, "-v, --version").usage("<command> [options]");

  program.command("build <cmd>")
  .description('run rullup build to NEJ')
  .allowUnknownOption()
  .option('-i, --input [input]', 'witch file to input')
  .option('-o, --output [output]', 'witch file to output')
  .option('-s, --srcAlias [srcAlias]', 'witch alias to use')
  .action((command, cmd) => {
    const options = cleanArgs(cmd)
    console.log(options)
    build(command, options);
  })
  program.command("dev <cmd>")
  .description('run rullup build to NEJ')
  .allowUnknownOption()
  .option('-i, --input [input]', 'witch file to input')
  .option('-o, --output [output]', 'witch file to output')
  .option('-s, --srcAlias [srcAlias]', 'witch alias to use')
  .action((command, cmd) => {
    const options = cleanArgs(cmd)
    console.log(options)
    dev(command, options);
  })
  // .action((command, cmd) => {
  //   const options = minimist(process.argv.slice(2))
  //   // const options = cleanArgs(cmd)
  //   require("../build")(command, options);
  // })

  program.parse(process.argv);
}