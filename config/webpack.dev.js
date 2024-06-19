const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const proxy = require('proxy-middleware')
const serveStatic = require('serve-static')
const { merge } = require('webpack-merge')

const pkg = require('../package.json')
const common = require('./webpack.common.js')
const {
  setCompression,
  setHeaders,
  setHost,
  setBody,
  proxyConfig,
} = require('./proxy.js')

module.exports = merge(common(), {
  mode: 'development',
  plugins: [
    new BrowserSyncPlugin({
      host: `${pkg.accountName}.vtexlocal.com.br`,
      port: 443,
      https: true,
      server: './src',
      watch: true,
      open: 'external',
      middleware: [
        setCompression,
        setHeaders,
        setHost,
        setBody,
        serveStatic('./build'),
        proxy(proxyConfig()),
      ],
    }),
  ],
})
