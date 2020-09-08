const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const merged = merge(common, {
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: __dirname + '/dist/'
  },
  devtool: 'inline-source-map',
  plugins: [
    // HTMLファイル出力
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // 画像ファイル出力
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
  ]
});

// 確認用
console.log(merged);

module.exports = merged;
