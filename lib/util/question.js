const inquirer = require("inquirer");

const promptdata = name => message => choices => ({
  type: "list",
  name,
  message,
  choices
});

async function getCssType(list) {
  const chooses = [
    promptdata("cssType")("Choose CSS preprocessing language")(list)
  ];
  const prompt = inquirer.createPromptModule();
  return await prompt(chooses);
}

module.exports = {
  getCssType
}
