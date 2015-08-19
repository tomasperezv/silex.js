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
    connection.on("text", function (messageContent) {

      var requestData = self.parseUrl(connection.path);
      try {
        var message = JSON.parse(messageContent);
        if (typeof message.wsPath !== 'undefined') {
          requestData.path = message.wsPath;
          requestData.parameters = message;
        }
      } catch (e) {
        // Ignore an invalid message
      }
      var responseHandler = self._getResponseHandler(connection);
      dispatch(requestData.path, requestData.parameters, responseHandler);
    });
  }).listen(port);
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
