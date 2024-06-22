const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function buildTemplates(templatePath) {
  return fs.readdirSync(templatePath).map((filename) => {
    const _splitPath = templatePath.split('/')
    const filePath = _splitPath[_splitPath.length - 1]

    return new HtmlWebpackPlugin({
      template: `${templatePath}/${filename}`,
      filename: `./html/${filePath}/${filename.replace('pug', 'html')}`,
      inject: false,
      minify: false,
    })
  })
}

/**
 * Generates HtmlWebpackPlugin instances for templates located in specified subdirectories.
 * @param {string} basePath - The base path where subdirectories are located.
 * @param {string[]} subPaths - Array of subdirectory names within basePath.
 * @returns {HtmlWebpackPlugin[]} An array of HtmlWebpackPlugin instances.
 * @example
 * // Example: Integrating templates function in webpack plugins configuration
 * module.exports = {
 *   // Other webpack configuration...
 *   plugins: [
 *     ...templates(path.resolve(__dirname, './src/pug'), ['templates', 'subtemplates']),
 *   ],
 * };
 */
function templates(basePath, subPaths) {
  let allPlugins = []

  subPaths.map((subPath) => {
    const templatePath = `${basePath}/${subPath}`
    const plugins = buildTemplates(templatePath)

    allPlugins = [...allPlugins, ...plugins]
  })

  return allPlugins
}

module.exports = { templates }
