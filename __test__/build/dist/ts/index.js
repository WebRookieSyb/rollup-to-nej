/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.6
* @path  __test__/build/dist/ts/index.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(function () {

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;

  function substringFromChar(string, char) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      itself: false
    };
    var itself = options.itself;
    if (string.indexOf(char) === -1) return "";
    var indexOfChar = itself ? string.indexOf(char) : string.indexOf(char) + 1;
    return string.substring(indexOfChar);
  }

  function substringToChar(string, char) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      itself: false
    };
    var itself = options.itself;
    if (string.indexOf(char) === -1) return "";
    var indexOfChar = itself ? string.indexOf(char) + 1 : string.indexOf(char);
    return string.substring(0, indexOfChar);
  }

  function deepGet(path, object) {
    var index = path.indexOf(".");
    var k = path.slice(0, index);
    var rest = path.slice(index + 1);
    var firstObj = object[k];

    if (index === -1) {
      if (hasOwnProperty.call(object, path)) {
        return object[path];
      }
    } else {
      return deepGet(rest, firstObj);
    }
  }

  function isType(value, type) {
    return toString.call(value) === "[object " + type + "]";
  }

  function isString(str) {
    return isType(str, "String");
  }

  function isNumber(str) {
    return isType(str, "Number");
  }

  function isArray(value) {
    return Array.isArray ? Array.isArray(value) : isType(value, "Array");
  }

  function isObject(value) {
    var type = _typeof(value);

    return value !== null && type === "object" || type === "function";
  }

  function get(str) {
    if (!str) {
      return null;
    }

    if (!isString(str)) {
      return str;
    }

    var node = document.getElementById(str);

    if (node === null) {
      node = document.querySelector(str);
    }

    return node;
  }

  var index = {
    get: get,
    isObject: isObject,
    isArray: isArray,
    isNumber: isNumber,
    deepGet: deepGet,
    substringToChar: substringToChar,
    substringFromChar: substringFromChar
  };

  return index;

});
