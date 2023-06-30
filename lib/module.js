const path = require('path');

// Change this to match your module name
const moduleName = 'ralph-module-streamify';

const defaults = {
  name: moduleName,
  nameShort: 'streamify',
  debug: true,
  apiToken: '',
  apiBaseUrl: 'https://api.streamify.io',
  apiEndpointGetStreams:
    '/live/broadcast?type=upcoming&direction=asc&per_page=1'
};

module.exports = async function(moduleOptions) {
  const { nuxt } = this;

  const options = {
    ...defaults,
    ...this.options[moduleName],
    ...moduleOptions
  };

  if (!options.enabled) {
    return false;
  }

  consola.info(`[${options.name}]`, 'Initializing module...');

  this.addTemplate({
    src: path.resolve(__dirname, 'module.utils.js'),
    fileName: `${moduleName}.utils.js`,
    options
  });

  this.addPlugin({
    src: path.resolve(__dirname, 'module.plugin.js'),
    fileName: `${moduleName}.plugin.js`,
    options
  });

  /*
  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),
      prefix: 'Geins',
      extensions: ['vue']
    });
  });*/

  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: path.resolve(__dirname, 'components'),
      prefix: 'Geins',
      extensions: ['vue']
    });
  });

  return true;
};

module.exports.meta = require('../package.json');
