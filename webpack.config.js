const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.npm_lifecycle_event === 'build';

let htmlConfig = {
  filename: 'index.html',
  template: 'src/index.html'
};

if(isProduction) {
  htmlConfig.inlineSource = '.(js|css)$'
}

let config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'script.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { "modules": false }]
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin(htmlConfig),
    new HtmlWebpackInlineSourcePlugin(),
    new CopyWebpackPlugin([
      { from: 'src/res/sprites.png', to: 'src/res/sprites.png' },
      { from: 'src/res/tiles.png', to: 'src/res/tiles.png' },
      { from: 'src/res/creature.png', to: 'src/res/creature.png' },
      ])
  ],
  stats: 'minimal',
  devServer: {
    stats: 'minimal'
  }
};

if(!isProduction) {
  config.devtool = 'eval-source-map'
} else {
  config.plugins = config.plugins.concat([
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		})
  ])
}

module.exports = config;
