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
 * @param {Function} dispatch
 * @public
 */
Websocket.prototype.listen = function(port, dispatch) {
  var self = this;
  var ws = require("nodejs-websocket");
  ws.createServer(function(connection) {
    connection.on("text", function (str) {
      var url = self._filterUrl(connection.path);
      var responseHandler = self._getResponseHandler(connection);
      dispatch(url, responseHandler);
    });
  }).listen(port);
};

/**
 * @param {String} path
 * @private
 * @method _filterUrl
 */
Websocket.prototype._filterUrl = function(path) {
  var url = require('url');
  return url.parse(path, true);
};

/**
 * @param {Connection} connection
 * @private
 * @method _getResponseHandler
 */
Websocket.prototype._getResponseHandler = function(connection) {
  // Adapter function to avoid exposing directly the response method.
  return {
    writeHead: function() {},
    send: function(data) {
      connection.sendText(data);
    },
    close: connection.close.bind(connection)
  };
};

module.exports = Websocket;
