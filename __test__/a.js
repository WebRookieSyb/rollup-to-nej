const { doBuild, doWatch } = require( "../lib/rollup");
doBuild('vue', {
  input: "examples/raw",
  output: "examples/src"
})