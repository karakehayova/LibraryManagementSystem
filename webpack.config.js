var path = require('path')
var combineLoaders = require('webpack-combine-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, 'client/index.jsx') // the files which will be compiled
  },
  output: {
    path: path.join(__dirname, 'client/build'),
    filename: '[name].js'
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          combineLoaders([
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }])
        )
        // include: path.join(__dirname, 'views/layouts/', 'test.css') all css files that we use should be included
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
        // include: path.join(__dirname, 'node_modules/foundation-sites/scss/foundation.scss'),
        // include: path.join(__dirname, 'web/public/scss/app.scss')
      }

    ]
  },
  resolve: {
    extensions: ['.js', '.es6', '.jsx']
  },
  plugins: [new ExtractTextPlugin('app.css')]

}
