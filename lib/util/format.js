const formatAlias = (str) => {
  let alias = {};
  str.split(',').map(item => {
    const arr = item.split('=')
    if(arr[0].length && arr[1].length){
      alias[arr[0]] = arr[1];
    }
  })
  return alias;
}
module.exports = {
  formatAlias
}
