/*jslint node: true */
'use strict';

var ProtocolHandler = require('./protocol-handler');

/**
 * @constructor
 */
var HTTP = function() {
  ProtocolHandler.call(this);
  this.id = 'HTTP';
};

HTTP.prototype = new ProtocolHandler();

/**
 * @method listen
 * @param {Number} port
 * @param {Function} dispatch
 * @public
 */
HTTP.prototype.listen = function(port, dispatch) {
  var self = this;
  var http = require('http');
  http.createServer(function (request, response) {
    var responseHandler = self._getResponseHandler(response);
    dispatch(request.url, responseHandler);
  }).listen(port);
};

/**
 * @param {Response} response
 * @private
 * @method _getResponseHandler
 */
HTTP.prototype._getResponseHandler = function(response) {
  // Adapter function to avoid exposing directly the response method.
  return {
    writeHead: response.writeHead.bind(response),
    send: response.end.bind(response)
  };
};

module.exports = HTTP;
