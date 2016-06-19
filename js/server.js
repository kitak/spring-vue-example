import 'babel-polyfill';
import ejs from 'ejs';
import {CommentBox} from './components';
import createRenderer from './vue/packages/vue-server-renderer';
import awaitServer from './utils/awaitServer';
const { renderToString } = createRenderer();

global.renderServer = (template, model) => {
  var comments = Java.from(model.comments);
  var commentsJson = model.commentsJson;

  var results = awaitServer((done) => {
    const vm = new CommentBox();
    vm.comments = comments;
    renderToString(vm, (err, res) => {
      done(err, res);
    });
  });
  if (results.error) {
    throw results.error;
  }
  return ejs.render(template, {
    content: results.result,
    json: commentsJson
  });
};
