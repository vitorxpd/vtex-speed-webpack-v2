const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const { variables } = require('./variables.js')

module.exports = () => {
  if (process.env.STORE_ENV === 'checkout') {
    variables.webpack.assets = './files'
    variables.webpack.entryFile = path.resolve(
      __dirname,
      '../src/js/checkout-custom.js'
    )
    variables.webpack.outputScriptFilename = 'checkout6-custom.js'
    variables.webpack.outputStyleFilename = 'checkout6-custom.css'
    variables.webpack.templatesSubPaths = ['checkout']
  }

  if (process.env.STORE_ENV === 'orderplaced') {
    variables.webpack.assets = './files'
    variables.webpack.entryFile = path.resolve(
      __dirname,
      '../src/js/checkout-orderplaced.js'
    )
    variables.webpack.outputScriptFilename = 'checkout-confirmation4-custom.js'
    variables.webpack.outputStyleFilename = 'checkout-confirmation4-custom.css'
    variables.webpack.templatesSubPaths = ['checkout']
  }

  return {
    entry: variables.webpack.entryFile,
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: `${variables.webpack.assets}/${variables.webpack.outputScriptFilename}`,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${variables.webpack.assets}/${variables.webpack.outputStyleFilename}`,
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: 'url-loader',
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  }
}
