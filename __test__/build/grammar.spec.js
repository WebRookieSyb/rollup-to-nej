const { formatOptionsForRollup } = require("../../lib/rollup");
const { rollup } = require("rollup");
const fs = require("fs");
const util = require("util");

const readFilePromsise = util.promisify(fs.readFile); // promise

const replaceRandomString = source => {
  const reg = /data-v-\w*_0/g;
  return source.replace(reg, "data-v-all_0");
};
const getOutputFromGenerated = generated =>
  generated.output ? generated.output[0] : generated;

async function getCodeFromBundle(bundle, customOptions = {}) {
  const options = Object.assign({}, customOptions);
  return getOutputFromGenerated(await bundle.generate(options)).code;
}

describe("build:js", () => {
  it("support for optional chaining", async () => {
    const { inputOptions, outputOptions } = formatOptionsForRollup({
      type: "vue",
      path: "__test__/build/src/optionalChain/index.js",
      input: "__test__/build/src",
      output: "__test__/build/dist"
    });
    const bundle = await rollup(inputOptions);
    const code = await getCodeFromBundle(bundle, outputOptions);
    const realResult = await readFilePromsise(
      "__test__/build/dist/optionalChain/index.js",
      "utf-8"
    );

    expect(replaceRandomString(code)).toEqual(replaceRandomString(realResult));
  });
  it("support for optional nullish coalescing operator", async () => {
    const { inputOptions, outputOptions } = formatOptionsForRollup({
      type: "vue",
      path: "__test__/build/src/nullish/index.js",
      input: "__test__/build/src",
      output: "__test__/build/dist"
    });
    const bundle = await rollup(inputOptions);
    const code = await getCodeFromBundle(bundle, outputOptions);
    const realResult = await readFilePromsise(
      "__test__/build/dist/nullish/index.js",
      "utf-8"
    );

    expect(replaceRandomString(code)).toEqual(replaceRandomString(realResult));
  });
});

describe("build:ts", () => {
  it("support for normal ts file", async () => {
    const { inputOptions, outputOptions } = formatOptionsForRollup({
      type: "vue",
      path: "__test__/build/src/ts/index.ts",
      input: "__test__/build/src",
      output: "__test__/build/dist"
    });
    const bundle = await rollup(inputOptions);
    const code = await getCodeFromBundle(bundle, outputOptions);
    const realResult = await readFilePromsise(
      "__test__/build/dist/ts/index.js",
      "utf-8"
    );

    expect(replaceRandomString(code)).toEqual(replaceRandomString(realResult));
  });
});