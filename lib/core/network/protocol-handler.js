/*jslint node: true */
'use strict';

/**
 * @constructor
 */
var ProtocolHandler = function() {
  this.id = '';
};

/**
 * This method is implemented by the child instances.
 * @method listen
 * @public
 */
ProtocolHandler.prototype.listen = function() {
  throw new Error('Custom listen for protocol handler ' + this.id + ' not implemented');
};

module.exports = ProtocolHandler;
