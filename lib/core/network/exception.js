/*jslint node: true */
'use strict';

/**
 * @param {String} message
 * @constructor
 */
var InvalidProtocol = function(message) {
  this.message = message;
  this.name = 'InvalidProtocol';
};

module.exports = {
  InvalidProtocol: InvalidProtocol
};
