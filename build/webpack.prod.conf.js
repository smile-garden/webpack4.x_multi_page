const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// 清除目录等
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfigBase = require('./webpack.base.conf.js');
const webpackConfigProd = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].[hash].js',
    publicPath: './',
  },
  devtool: 'cheap-source-map',
  plugins: [
    // 删除dist目录
    new CleanWebpackPlugin({
      verbose: true, // 开启在控制台输出信息
      dry: false,
    }),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
      filename: 'css/[name].[hash:8].min.css',
    }),
    // 压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // 打包文件分析工具
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // warnings: false,
          drop_console: true, //console
          pure_funcs: ['console.log'] //移除console
        }
      },
    })],
  },
  module: {
    rules: [],
  },
};

module.exports = merge(webpackConfigBase, webpackConfigProd);