import 'babel-polyfill';
import Vue from './vue/dist/vue.common';
import createRenderer from './vue/packages/vue-server-renderer';
import compileTemplate from './utils/compileTemplate';
import awaitServer from './utils/awaitServer';
const { renderToString } = createRenderer();

Vue.config._isServer = true;

const CommentForm = Vue.extend(compileTemplate({
  props: ['onCommentSubmit'],
  template: `
<form v-on:submit.prevent>
  <input type="text" v-model="author">
  <input type="text" v-model="text">
  <input type="submit" value="Post" @click="handleSubmit">
</form>
  `,
  data: function() {
    return {
      author: '',
      text: ''
    };
  },
  methods: {
    handleSubmit() {
      this.onCommentSubmit({author: this.author, text: this.text});
    }
  }
}));

const CommentList = Vue.extend(compileTemplate({
  props: ['comments'],
  template: `
<div class="commentList">
  <div class="comment" v-for="comment in comments">
    <h2>{{ comment.author }}</h2>
    <span v-html="comment.text"></span>
  </div>
</div>
`
}));

const CommentBox = Vue.extend(compileTemplate({
  props: ['data', 'url', 'pollInterval'],
  data: function() {
    return {
      handleCommentSubmit: () => {}
    };
  },
  components: {
    'comment-list': CommentList,
    'comment-form': CommentForm
  },
  template: `
<div class="commentBox">
  <h1>Comments</h1>
  <comment-list :comments="data"></comment-list>
  <comment-form :on-comment-submit="handleCommentSubmit"></comment-form>
</div>
`
}));

global.renderServer = (comments) => {
  var data = Java.from(comments);

  var results = awaitServer((done) => {
      renderToString(new Vue(compileTemplate({
        data: function() {
          return {
            data: data,
            url: "comments.json",
            pollInterval: 5000
          };
        },
        components: {
          'comment-box': CommentBox
        },
        template: `
<comment-box :data="data" :url="url" :poll-interval="pollInterval"></comment-box>
`
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
