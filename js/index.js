import createRenderer from './vue/dist/server-renderer'
//import Vue from './vue/dist/vue.common'

//const { renderToString } = createRenderer();

global.renderServer = (comments) => {
  var data = Java.from(comments);
  // TODO
  return data.length;
};
