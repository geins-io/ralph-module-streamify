const path = require('path')
const { requireNuxtVersion } = require('./compatibility')

// Change this to match your module name
const moduleName = 'ralph-module-streamify'

const defaults = {
  name: moduleName,
  debug: true
  // your default options goes here
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
  
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),      
      prefix: 'Ca',
      extensions: ['vue']
    });
  });

  return true
}

module.exports.meta = require('../package.json')

