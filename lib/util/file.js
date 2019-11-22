const findup = require("findup-sync");
const color = require('./color');

const findFile = (fileName) => {
  let filePath = findup(fileName);
  if(filePath) {
    return filePath;
  }
  console.log(color(`can not find file: ${fileName}`).red)
}

module.exports = {
  findFile
}