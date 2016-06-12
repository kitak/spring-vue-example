import Vue from '../../dist/vue.common.js';
import template from './template.html';
import compileTemplate from '../../utils/compileTemplate';

const CommentList = Vue.extend(compileTemplate({
  template: template
}));

export default CommentList;
