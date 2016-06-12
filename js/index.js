import Vue from './vue/dist/vue.common';
import createRenderer from './vue/packages/vue-server-renderer';
import compileTemplate from './utils/compileTemplate';
const { renderToString } = createRenderer();

console.assert(global.exec);

global.renderServer = (comments) => {
  var data = Java.from(comments);
  return global.exec(() => {
    const done = global.async();
    renderToString(new Vue(compileTemplate({
      data: function() { return {}; },
      template: '<p>hello</p>'
    })), (err, res) => {
      setTimeout(() => {
        done(err, res);
      }, 0);
    });
  }, -1);
};
