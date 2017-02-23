/* jshint node: true */
'use strict';

const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'spectrums',
  lazyLoading: false,
  isDevelopingAddon: function() {
    return true;
  }
});
