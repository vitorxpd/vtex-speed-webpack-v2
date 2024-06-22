const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const { storeEnv } = require('./storeEnv.js')
const { variables } = require('./variables.js')

module.exports = () => {
  storeEnv(process.env.STORE_ENV)

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
