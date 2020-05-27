const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

// 分离css  消除冗余的css
const purifyCssWebpack = require('purifycss-webpack');
// html模版
const htmlWebpackPlugin = require('html-webpack-plugin');
// 静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules.conf.js');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
  return {
    template: `./scr/pages/${name}/index.html`,
    filename: `${name}.html`,
    inject: true,
    hash: true,
    chunks: chunks,
    minify: process.env.NODE_ENV === 'development' ? false : {
      removeComments: true, // 移除HMTL中的注释
      collapseWhitespace: true, // 折叠空白区域 即压缩代码
      removeAttributeQuotes: true, // 去除属性引用
    },
  };
};

module.exports = {
  entry: {
    // 多入口文件
    index: './src/pages/index/index.js',
    login: './src/pages/login/index.js',
  },
  module: {
    rules: [...rules],
  },
  // 将外部变量或者模块加载进来
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

// 配置页面
const htmlArray = [
  {
    name: 'index',
    title: '首页',
    chunks: ['index'],
  },
  {
    name: 'login',
    title: '登录',
    chunks: ['login'],
  },
];

// 自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.name, element.chunks)));
});
