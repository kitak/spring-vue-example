import { compileToFunctions } from '../vue/dist/compiler.common.js';

const compileTemplate = (options) => {
  const res = compileToFunctions(options.template, {
    preserveWhitespace: false
  });
  Object.assign(options, res);
  delete options.template;
  return options;
};

export default compileTemplate;
