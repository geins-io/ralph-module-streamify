const path = require('path')
const { requireNuxtVersion } = require('./compatibility')

// Change this to match your module name
const moduleName = 'streamify'

const defaults = {
  name: moduleName,
  debug: true,
  apiToken: '',
  apiBaseUrl: 'https://api.streamify.io',
  apiEndpointGetStreams: '/live/broadcast?type=upcoming&direction=asc&per_page=1'
}

module.exports = async function(moduleOptions) {
  requireNuxtVersion(this.nuxt, '2.0.0')
  const { nuxt } = this
  const consola = require('consola')

  const options = {
    ...defaults,
    ...this.options[moduleName],
    ...moduleOptions
  }

  if (!options.enabled) {
    return false
  }

  consola.info(`[${options.name}]`, 'Initializing module...')

  this.addTemplate({
    src: path.resolve(__dirname, 'module.utils.js'),
    fileName: `${moduleName}.utils.js`,
    options
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'module.plugin.js'),
    fileName: `${moduleName}.plugin.js`,
    options
  })

  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),
      prefix: 'Ca',
      extensions: ['vue']
    })
  })

  return true
}

module.exports.meta = require('../package.json')