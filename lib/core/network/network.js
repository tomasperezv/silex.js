/*jslint node: true */
'use strict';

/**
 * Functionality related with network connections, providing
 * support for HTTP and WebSockets servers.
 */
var Network = function() {

  /**
   * Supported protocols
   * @type {Object} Protocol
   * @private
   */
  this.Protocol = {
    HTTP: 'HTTP',
    WEBSOCKET: 'WEBSOCKET'
  };

  this.Exception = require('./exception');
};

/**
 * @param {String} protocolId
 * @method isValidProtocol
 * @return {Boolean}
 * @throws InvalidProtocol
 * @public
 */
Network.prototype.assertIsValidProtocol = function(protocolId) {
  if (typeof this.Protocol[protocolId] === 'undefined') {
    throw new this.Exception.InvalidProtocol('Protocol ' + protocolId + ' not recognized.');
  }
};

/**
 * Factory method for creating network protocol handlers.
 *
 * @method createServer
 * @param {String} protocolId
 * @param {Number} port
 * @param {Function} requestHandler
 * @throws InvalidProtocol
 * @public
 */
Network.prototype.createServer = function(protocolId, port, requestHandler) {

  this.assertIsValidProtocol(protocolId);

  var handler = null;

  switch (protocolId) {
    case this.Protocol.HTTP:
      var HTTPHandler = require('./http');
      handler = new HTTPHandler();
      handler.listen(port, requestHandler);
      break;

    case this.Protocol.WEBSOCKET:
      var WebsocketHandler = require('./websocket');
      handler = new WebsocketHandler();
      handler.listen(port, requestHandler);
      break;
  }

  return handler;
};

module.exports = new Network();
