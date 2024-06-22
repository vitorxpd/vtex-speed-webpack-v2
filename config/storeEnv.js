const path = require('path')

const { variables } = require('./variables.js')

function storeEnv(env) {
  if (env === 'checkout') {
    variables.webpack.assets = './files'
    variables.webpack.entryFile = path.resolve(
      __dirname,
      '../src/js/checkout-custom.js'
    )
    variables.webpack.outputScriptFilename = 'checkout6-custom.js'
    variables.webpack.outputStyleFilename = 'checkout6-custom.css'
    variables.webpack.templatesSubPaths = ['checkout']
  }

  if (env === 'orderplaced') {
    variables.webpack.assets = './files'
    variables.webpack.entryFile = path.resolve(
      __dirname,
      '../src/js/checkout-orderplaced.js'
    )
    variables.webpack.outputScriptFilename = 'checkout-confirmation4-custom.js'
    variables.webpack.outputStyleFilename = 'checkout-confirmation4-custom.css'
    variables.webpack.templatesSubPaths = ['checkout']
  }
}

module.exports = { storeEnv }
