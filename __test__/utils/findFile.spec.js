const { findFiles } = require("../../lib/util/findFile");

describe("findFile", () => {
  it("test find pack file", () => {
    const file = ["examples/raw/another/util.js", "examples/raw/jsx-test/test.js", "examples/raw/test/test.js"];
    return findFiles("examples/raw").then(data => {
      expect(data).toEqual(file);
    });
  });
  it("test can not find pack file", () => {
    // expect.assertions(1);
    const file = [];
    return findFiles("domytest")
    .then(data => {
      expect(data).toEqual(file);
    });
    // .catch(e => expect(e).toMatch('error'))
  });
  it('test buy async/await', async () => {
    expect.assertions(1)
    const file = ["examples/raw/another/util.js", "examples/raw/jsx-test/test.js", "examples/raw/test/test.js"];
    const data = await findFiles("examples/raw")
    expect(data).toEqual(file);
  })
});
