const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const pages = require('../src/config/page');

// 分离css  消除冗余的css
const purifyCssWebpack = require('purifycss-webpack');
// html模版
const htmlWebpackPlugin = require('html-webpack-plugin');
// 静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules.conf.js');
const util = require('./utils.js');

module.exports = {
  // 多入口文件
  entry: util.generateEntryConfig(pages),
  module: {
    rules: [...rules],
  },
  // 将外部变量或者模块加载进来
  //externals就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
  externals: {
    // 'jquery': 'window.jQuery'
  },
  plugins: [
    // 全局暴露统一入口
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jQuery',
      'window.jQuery': 'jquery',
    }),
    // 静态资源输出
    new copyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../src/assets'),
        to: './assets',
        // ignore: ['.*'],
      }],
    }),
    // 消除冗余的css代码
    new purifyCssWebpack({
      paths: glob.sync(path.join(__dirname, '../src/pages/*/*.html')),
    }),
  ],
};

// 自动生成html模板
pages.forEach((item) => {
  module.exports.plugins.push(new htmlWebpackPlugin(util.generateHtmlConfig(item)));
});
