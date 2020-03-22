/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.6
* @path  __test__/build/dist/removeComments/index.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(['exports'], function (exports) {

  function shouldExecBefore(type) {
    return ["before", "around"].includes(type);
  }
  function shouldExecAfter(type) {
    return ["after", "around"].includes(type);
  }
  function shouldExecAfterReturn(type) {
    return ["afterReturn"].includes(type);
  }
  function aop(origin, target, aopType) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var event = {
        args: args
      };
      if (shouldExecBefore(aopType)) target(event);
      event.value = origin.apply(null, event.args);
      if (shouldExecAfter(aopType)) target(event);
      if (shouldExecAfterReturn(aopType)) return target(event.value);
      return event.value;
    };
  }

  exports.aop = aop;

  Object.defineProperty(exports, '__esModule', { value: true });

});
