'use strict';

var parse = require('../parse.js'),
  render = require('../render.js');

module.exports = function main(src) {
  var ast = parse(src);
  var out = render(ast);
  return out;
};
