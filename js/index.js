import 'babel-polyfill';
import Vue from './vue/dist/vue.common';
import createRenderer from './vue/packages/vue-server-renderer';
import compileTemplate from './utils/compileTemplate';
import awaitServer from './utils/awaitServer';
const { renderToString } = createRenderer();

global.renderServer = (comments) => {
  var data = Java.from(comments);

  var results = awaitServer((done) => {
      renderToString(new Vue(compileTemplate({
        data: function() { return {}; },
        template: '<p>hello</p>'
      })), (err, res) => {
        done(err, res);
      });
    });
  if (results.error) {
    throw results.error;
  } else {
    return results.result;
  }
};
