var global = this;

var console = {};
console.debug = print;
console.error = print;
console.assert = print;
console.warn = print;
console.log = print;

var process = {};
process.env = {};
process.env.VUE_ENV = 'server';
process.nextTick = function(fn) {
  global.setTimeout(fn, 0);
};
