# rollup-to-nej

Transform *.js to *.js with nej define
If you want to use Vue or Vue Jsx, you still need a *.js to be entry file.
You can see how to use it in the examples file

## Usage

``` sh
npm install

* build
roll build vue -i *** -o ***

* watch
roll dev vue -i *** -o ***
```

### Support config
.rolltonejrc.json
``` json
{
  "input": "raw",
  "output": "src"
}
```
### Support api
``` js
const doRollup = require('rollup-to-nej')
doRollup.build('vue', {input:"raw", output:"src"});
```
