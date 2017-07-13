'use strict';

var path = require('path'),
    config;

config = {
  production: {},
  development: {
    api: {
      host:  'http://api.openweathermap.org/data/2.5',
      appid: '4b47edf6f8e1df9122cc57269bff40dd'
    }
  }
};

module.exports = config;
