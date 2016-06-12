import { compileToFunctions } from '../vue/packages/vue-template-compiler';

const compileTemplate = (options) => {
  const res = compileToFunctions(options.template, {
    preserveWhitespace: false
  });
  Object.assign(options, res);
  delete options.template;
  return options;
};

export default compileTemplate;
