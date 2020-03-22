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

