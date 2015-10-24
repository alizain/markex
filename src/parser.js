'use strict';

module.exports = function parser(input) {

  if(input instanceof Buffer) {
    input = input.toString('utf8');
  }

  // normalize linebreaks to \n.
  input = input.replace(/\r\n?/g, '\n');

  // split string based on newline characters
  input = input.split(/[\n]+/);

  console.log(input);


}
