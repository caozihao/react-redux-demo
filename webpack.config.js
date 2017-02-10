const path = require('path');
const webpack = require('webpack');

const APP_PATH = path.resolve(__dirname,'./src/index'); //    以应用程序为起点，根据参数字符串解析出一个绝对路径
const BUILD_PATH = path.resolve(__dirname, './dist');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    APP_PATH
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/,loaders: ['babel-loader?presets[]=es2015&presets[]=react'],include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.(jpg|png)$/, loader: "url-loader?limit=100000" }
    ]
  },
  // webpack会将css一起打包到最后的js文件中去，造成这个js文件体积十分庞大，于是就考虑先把第三方库去除掉。这一步倒是很好实现，只需要配置下externals就可以了。
/*  externals:{
    'react': 'window.React',
    'bootstrap':'bootstrap'
  }*/
};
