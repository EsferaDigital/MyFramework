
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const JS_DIR = path.resolve(__dirname, './src');
const JS_DIST = path.resolve(__dirname, 'dist');

// Entry

const entry = {
  bundle:  JS_DIR + '/index.js'
}

// Output

const output = {
  path: JS_DIST,
  filename: './js/[name].[chunkhash].js'
}

// Rules

const jsRule = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: 'babel-loader'
}

const hbsRule = {
  test: /\.hbs$/i,
  loader: 'handlebars-loader'
}

const cssRule = {
  test: /\.s[ac]ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader?url=false'
    },
    {
      loader: 'postcss-loader'
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}

const imgRule = {
  test: /\.(gif|png|jpe?g|svg|webp|ico)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: './assets/img/[name].[ext]'
      }
    },
    {
      loader: 'image-webpack-loader'
    }
  ]
}

const fontRule = {
  test: /\.(woff)$/i,
  loader: 'file-loader',
  options: {
    name: './assets/fonts/[name].[ext]'
  }
}
// Plugins

const HbsToHtml = new HtmlWebpackPlugin({
  template: './src/hbs/paginas/index.hbs'
});

const ScssToCss = new MiniCssExtractPlugin({
  filename: './css/styles.[chunkhash].css'
});

const JsonToJson = new CopyPlugin({
  patterns: [
    {
      from: './src/assets/data/data.json',
      to: './assets/data/[name].[ext]'
    }
  ]
})

module.exports = {
  entry: entry,
  output: output,
  devServer: {
    port: 3000,
    open: true,
  },
  module:{
    rules: [hbsRule, jsRule, cssRule, imgRule, fontRule]
  },
  devtool: 'source-map',
  target: 'web',
  plugins: [HbsToHtml, ScssToCss, JsonToJson]
}
