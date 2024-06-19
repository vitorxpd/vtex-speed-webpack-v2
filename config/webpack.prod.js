const { merge } = require('webpack-merge')

const { templates } = require('./templates.js')
const { variables } = require('./variables.js')
const common = require('./webpack.common.js')

module.exports = merge(common(), {
  mode: 'production',
  plugins: [
    ...templates(
      variables.webpack.templatesBasePath,
      variables.webpack.templatesSubPaths
    ),
  ],
})
