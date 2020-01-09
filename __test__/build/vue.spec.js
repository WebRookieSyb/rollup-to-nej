const { formatOptionsForRollup } = require('../../lib/rollup');
const { rollup } = require('rollup');
const fs = require('fs');
const util = require('util');

const readFilePromsise = util.promisify(fs.readFile); // promise


const getOutputFromGenerated = generated => (generated.output ? generated.output[0] : generated);

async function getCodeFromBundle(bundle, customOptions = {}) {
	const options = Object.assign({}, customOptions);
	return getOutputFromGenerated(await bundle.generate(options)).code;
}

describe("build:vue", () => {
  it.only("a normal vue component in *.vue",async ()=> {
    const { inputOptions,outputOptions} = formatOptionsForRollup({
        type:'vue',
        path:'__test__/build/src/test.js',
        input:'__test__/build/src',
        output:'__test__/build/dist'
    })
    const bundle = await rollup(inputOptions);
    const code = await getCodeFromBundle(bundle,outputOptions);
    const realResult = await readFilePromsise('__test__/build/dist/test.js','utf-8')
    expect(code).toEqual(realResult);
  });
});
