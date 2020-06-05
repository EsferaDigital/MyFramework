
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')

// Plugins

// Para transpilar de handlebars a html
const HbsToHtml = new HtmlWebpackPlugin({
  template: './src/hbs/paginas/index.hbs'
})

const ScssToCss = new MiniCssPlugin({
  filename: './css/styles.css'
})

// Rules

const jsRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

// MiniCssPlugin.loader,
//     'css-loader',
//     'sass-loader'

const cssRules = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssPlugin.loader,
      options: {
        publicPath: './dist/css'
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('autoprefixer'),
          require('cssnano')({
            preset: 'default'
          })
        ],
        sourceMap: true
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}

const hbsRules = {
  test: /\.hbs/,
  loader: 'handlebars-loader'
}

// esto carga sólo un archivo de imagen si es que a su vez está importada en app.js (falta mejorarlo)
const imgRules = {
  test: /\.(jpg|png|gif|jpeg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        output: 'static/img/',
        useRelativePath: true
      }
    }
  ]
}



module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      './src/js/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/bundle.js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  module: {
    rules: [jsRules, cssRules, hbsRules]
  },
  plugins: [HbsToHtml, ScssToCss]
}