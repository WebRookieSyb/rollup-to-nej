/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.5
* @path  __test__/build/dist/optionalChain/index.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(function () {

  var _obj$foo, _obj$foo$bar, _obj$qux, _obj$foo$bar2, _obj$foo2, _obj$foo2$bar;

  var obj = {
    foo: {
      bar: {
        baz: 42
      }
    }
  };
  var baz = obj === null || obj === void 0 ? void 0 : (_obj$foo = obj.foo) === null || _obj$foo === void 0 ? void 0 : (_obj$foo$bar = _obj$foo.bar) === null || _obj$foo$bar === void 0 ? void 0 : _obj$foo$bar.baz; // 42

  var safe = obj === null || obj === void 0 ? void 0 : (_obj$qux = obj.qux) === null || _obj$qux === void 0 ? void 0 : _obj$qux.baz; // undefined
  // Optional chaining and normal chaining can be intermixed

  obj === null || obj === void 0 ? void 0 : (_obj$foo$bar2 = obj.foo.bar) === null || _obj$foo$bar2 === void 0 ? void 0 : _obj$foo$bar2.baz; // Only access `foo` if `obj` exists, and `baz` if
  // `bar` exists
  // Example usage with bracket notation:

  obj === null || obj === void 0 ? void 0 : (_obj$foo2 = obj['foo']) === null || _obj$foo2 === void 0 ? void 0 : (_obj$foo2$bar = _obj$foo2.bar) === null || _obj$foo2$bar === void 0 ? void 0 : _obj$foo2$bar.baz; // 42

});
