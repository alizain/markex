#!/usr/bin/env node

'use strict';

var fs = require('fs'),
  parser = require('./src/parser'),
  render = require('./src/render');

fs.readFile(process.argv[process.argv.length - 1], function(err, src) {
  if(!err) {
    var result = parser(src);
    console.log(result);
  } else {
    console.log(err);
  }
});
