import 'babel-polyfill';
import {CommentBox} from './components';
import {createRenderer} from './vue/packages/vue-server-renderer';
import awaitServer from './utils/awaitServer';
const { renderToString } = createRenderer();

global.renderServer = (comments) => {
  var data = Java.from(comments);

  var results = awaitServer((done) => {
    const vm = new CommentBox();
    vm.comments = data;
    renderToString(vm, (err, res) => {
      done(err, res);
    });
  });
  if (results.error) {
    throw results.error;
  } else {
    return results.result;
  }
};
