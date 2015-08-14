/*jslint node: true */
'use strict';

var ProtocolHandler = require('./protocol-handler');

/**
 * @constructor
 */
var Websocket = function() {
  ProtocolHandler.call(this);
  this.id = 'Websocket';
};

Websocket.prototype = new ProtocolHandler();

/**
 * @method listen
 * @param {Number} port
 * @param {Function} requestHandler
 * @public
 */
Websocket.prototype.listen = function(port, requestHandler) {

  var ws = require("nodejs-websocket");
  ws.createServer(function(connection) {
  }, port);

};

module.exports = Websocket;
