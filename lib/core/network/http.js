/*jslint node: true */
'use strict';

var ProtocolHandler = require('./protocol-handler');

/**
 * @constructor
 */
var HTTP = function() {
  ProtocolHandler.call(this);
  this.id = 'HTTP';

  /**
   * Stores the headers sent automatically for each http connection request.
   * @type {Object} _headers
   * @private
   */
  this._headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  };
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
    var requestData = self.parseUrl(request.url);
    var responseHandler = self._getResponseHandler(response);
    dispatch(requestData.path, requestData.parameters, responseHandler);
  }).listen(port, function() {
    self.emit('ready');
  });
};

/**
 * @param {Response} response
 * @private
 * @method _getResponseHandler
 */
HTTP.prototype._getResponseHandler = function(response) {
  var self = this;
  // Adapter object to avoid exposing directly the response object.
  return {
    writeHead: function(httpCode) {
      response.writeHead(httpCode, self._headers);
    },
    send: response.end.bind(response)
  };
};

module.exports = HTTP;
