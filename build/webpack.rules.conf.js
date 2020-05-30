const extractTextPlugin = require('extract-text-webpack-plugin');
const rules = [
  {
    test: /\.(css|scss|sass)$/,
    use: process.env.NODE_ENV === 'development' ? ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'] : extractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader', 'postcss-loader'],
      // css中的基础路径
      publicPath: '../',
    })
  },
  {
    test: /\.js$/,
    use: ['babel-loader'],
    // 不检查node_modules下的js文件
    exclude: '/node_modules/',
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 5 * 1024, // 小于 会base64大宝处理
        outputPath: 'images', // 图片文件输出的文件夹
      }
    }],
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
      }
    }],
  },
  // ejs模版
  {
    test: /\.ejs$/,
    loader: 'ejs-html-loader',			     
  },
  {
    test: /\.html$/,
    // html中的img标签
    use: ['html-withimg-loader'],
  },
  {
    test: /\.less$/,
    use: process.env.NODE_ENV === 'development' ? ['style-loader', 'css-loader', 'less-loader'] : extractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader'],
      // css中的基础路径
      publicPath: '../',
    })
  },
];

module.exports = rules;