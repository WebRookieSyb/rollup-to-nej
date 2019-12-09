# rollup-to-nej

transform *.vue to *.js with nej define


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
```
{
  "input": "raw",
  "output": "src"
}
```
### Support api
```
const doRollup = require('rollup-to-nej')
doRollup.build('vue', {input:"raw", output:"src"});
```
