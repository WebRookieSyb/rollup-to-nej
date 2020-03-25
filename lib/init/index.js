const fs = require("fs");
const jsonfile = require("jsonfile");
const { join } = require("path");

const { config, fileName } = require("../util/defaultConfig");
async function init() {
  console.log(`\nconfig file is generating...\n`);
  await createConfigFile();
  console.log(`\nconfig file was generated\n`);
}

async function createConfigFile() {
  try {
    fs.readFileSync(join(process.cwd(), `./${fileName}`));
    console.log(`\nconfig file is already exist`);
    process.exit(0);
  } catch (error) {}
  const filePath = join(process.cwd(), `./${fileName}`);
  return jsonfile.writeFile(filePath, config, { spaces: 4 });
}

module.exports = init;