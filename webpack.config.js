var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: path.join(__dirname, "app", "index.js"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index.js"
  },
  watchOptions: { poll: true },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.(svg|jpg|png)$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: '/images/[hash:32].[ext]'
      }
    }, {
      test: /\.(css|scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", {
          loader: 'sass-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('autoprefixer')
              ]
            }
          }
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin("index.css")
  ]
}
