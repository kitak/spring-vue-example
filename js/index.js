import 'babel-polyfill';
import Vue from './vue/dist/vue.common';
import createRenderer from './vue/packages/vue-server-renderer';
import compileTemplate from './utils/compileTemplate';
import awaitServer from './utils/awaitServer';
const { renderToString } = createRenderer();

const CommentForm = Vue.extend(compileTemplate({
  props: ['onCommentSubmit'],
  template: `
<form>
  <input type="text" v-model="author">
  <input type="text" v-model="text">
  <input type="submit" value="Post" @click.prevent="handleSubmit">
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
      const author = this.author.trim();
      const text = this.text.trim();
      if (!author || !text) {
          return;
      }
      this.onCommentSubmit({author: this.author, text: this.text});
      this.author = '';
      this.text = '';
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
  data: function() {
    return {
      comments: [],
      url: "comments.json",
      pollInterval: 5000
    };
  },
  methods: {
    handleCommentSubmit: function(comment) {
      this.comments.push(comment);
      Vue.nextTick(() => {
        fetch(this.url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment)
        }).then((response) => {
          return response.json();
        }).then((comments) => {
          this.comments = comments;
        }).catch((e) => {
          console.error(e);
        });
      });
    },
    loadCommentsFromServer: function() {
      fetch(this.url).then((response) => {
        return response.json();
      }).then((comments) => {
        this.comments = comments;
      }).catch((e) => {
        console.error(e);
      });
    }
  },
  mounted: function() {
    console.log(this.$isServer);
    if (!this.$isServer) {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer.bind(this), this.pollInterval);
    }
  },
  components: {
    'comment-list': CommentList,
    'comment-form': CommentForm
  },
  template: `
<div class="commentBox">
  <h1>Comments</h1>
  <comment-list :comments="comments"></comment-list>
  <comment-form :on-comment-submit="handleCommentSubmit"></comment-form>
</div>
`
}));

global.renderClient = (comments) => {
  var data = comments || [];

  const vm = new CommentBox();
  vm.comments = data;
  vm.$mount('#content');
};

global.renderServer = (comments) => {
  Vue.config._isServer = true;

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
