const path = require('path')

const pkg = require('../package.json')

const variables = {
  webpack: {
    assets: './arquivos',
    entryFile: path.resolve(__dirname, '../src/js/main-store.js'),
    outputScriptFilename: `${pkg.accountName}-${pkg.version}.min.js`,
    outputStyleFilename: `${pkg.accountName}-${pkg.version}.min.css`,
    templatesBasePath: path.resolve(__dirname, '../src/pug'),
    templatesSubPaths: ['templates', 'subtemplates'],
  },
}

module.exports = { variables }
