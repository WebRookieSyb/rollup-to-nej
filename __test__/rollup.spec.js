const { doBuild, doWatch } = require( "../lib/rollup");
// const fs = require("jest-plugin-fs");
const { findFiles } = require("../lib/util/findFile");
// const fs = require('fs');
jest.mock('fs', () => require('jest-plugin-fs/mock'));

const path = require("path");

describe("rolluo to nej", () => {
  let options;
  beforeEach(() => {
    fs.mock();
    options = {
      input: "examples/raw",
      output: "examples/src"
    };
  });
  afterEach(() => fs.restore());
  it('打包正常', () => {
    // const file = ["examples/src/test/test.js"];
    // expect.assertions(1);
    doBuild('vue', {
        input: "examples/raw",
        output: "examples/src"
      })

    // await  findFiles('examples/src').then(data => {
    //   expect(data).toEqual(file);
    // })
      // expect(1).toBe(1);
      // const wrapper = fs.readFileSync('../examples/src/test/test.js')
      // expect(wrapper).toMatchSnapshot()
      
  })

  // it('快照测试', () => {

      
  // })
});
