/*jslint node: true */
'use strict';

/**
 * @constructor
 */
var ProtocolHandler = function() {
  this.id = '';
};

// Extend ProtocolHandler to inherit EventEmitter interface
var EventEmitter = require('events').EventEmitter;
var util = require('util');
util.inherits(ProtocolHandler, EventEmitter);

/**
 * This method is implemented by the child instances.
 * @method listen
 * @public
 */
ProtocolHandler.prototype.listen = function() {
  throw new Error('Custom listen for protocol handler ' + this.id + ' not implemented');
};

/**
 * @param {String} requestUrl
 * @method parseUrl
 * @return {Object}
 * @public
 */
ProtocolHandler.prototype.parseUrl = function(requestUrl) {
  var url = require('url');
  var urlParts = url.parse(requestUrl, true);
  return {
    path: urlParts.pathname,
    parameters: urlParts.query
  };
};

module.exports = ProtocolHandler;
