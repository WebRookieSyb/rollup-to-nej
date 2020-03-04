type HTMLSelector = string | HTMLElement;
type HTMLElementKey = keyof HTMLElementTagNameMap;
type Eachable<T> = T[] | ObjectType<T>;
interface ObjectType<T> {
  [key: string]: T;
}
interface SubstringOptions {
  itself: boolean;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;

function substringFromChar(
  string: string,
  char: string,
  options: SubstringOptions = {
    itself: false
  }
) {
  const { itself } = options;
  if (string.indexOf(char) === -1) return "";
  const indexOfChar = itself ? string.indexOf(char) : string.indexOf(char) + 1;
  return string.substring(indexOfChar);
}
function substringToChar(
  string: string,
  char: string,
  options: SubstringOptions = {
    itself: false
  }
) {
  const { itself } = options;
  if (string.indexOf(char) === -1) return "";
  const indexOfChar = itself ? string.indexOf(char) + 1 : string.indexOf(char);
  return string.substring(0, indexOfChar);
}

function deepGet(path: string, object: ObjectType<any>): any {
  const index = path.indexOf(".");
  const k = path.slice(0, index);
  const rest = path.slice(index + 1);
  const firstObj = object[k];
  if (index === -1) {
    if (hasOwnProperty.call(object, path)) {
      return object[path];
    }
  } else {
    return deepGet(rest, firstObj);
  }
}

function isType(value: any, type: string): boolean {
  return toString.call(value) === "[object " + type + "]";
}

function isString(str: any) {
  return isType(str, "String");
}

function isNumber(str: any) {
  return isType(str, "Number");
}

function isArray(value: any) {
  return Array.isArray ? Array.isArray(value) : isType(value, "Array");
}

function isObject(value: any) {
  const type = typeof value;
  return (value !== null && type === "object") || type === "function";
}

function get(str: HTMLSelector) {
  if (!str) {
    return null;
  }
  if (!isString(str)) {
    return str as HTMLElement;
  }
  let node = document.getElementById(str as string);
  if (node === null) {
    node = document.querySelector(str as string);
  }
  return node;
}


export default {
    get,
    isObject,
    isArray,
    isNumber,
    deepGet,
    substringToChar,
    substringFromChar
}