import 'babel-polyfill';
import {CommentBox} from './components';

global.renderClient = (comments) => {
  var data = comments || [];

  const vm = new CommentBox();
  vm.comments = data;
  vm.$mount('#content');
};
