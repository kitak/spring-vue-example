var global = this;

var console = {};
console.debug = print;
console.error = print;
console.assert = print;
console.warn = print;
console.log = print;
global.console = console;

var process = {};
process.env = {};
process.nextTick = function(fn) {
  global.setTimeout(fn, 0);
};
global.process = process;
