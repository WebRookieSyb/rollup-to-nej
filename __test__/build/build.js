const doRollup = require("../../lib/rollup");
const normalList = [
  "another",
  "jsx-test",
  "nullish",
  "optionalChain",
  "test",
  "ts"
];
const rmCommentList =  [
  "removeComments"
];
const externalHelpersList = [
  "externalHelpers"
]
normalList.map(normal => {
  doRollup.doBuild("vue", {
    input: `__test__/build/src/${normal}`,
    output: `__test__/build/dist/${normal}`,
    alias: {
      "@nej": "../"
    }
  });
});
rmCommentList.map(rm => {
  doRollup.doBuild("vue", {
    input: `__test__/build/src/${rm}`,
    output: `__test__/build/dist/${rm}`,
    removeComments: true
  });
})
externalHelpersList.map(item => {
  doRollup.doBuild("vue", {
    input: `__test__/build/src/${item}`,
    output: `__test__/build/dist/${item}`,
    externalHelpers: true
  });
})
