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
 * @param {Function} requestHandler
 * @public
 */
HTTP.prototype.listen = function(port, requestHandler) {
  var http = require('http');
  http.createServer(function (request, response) {
    requestHandler(request,response);
  }).listen(port);
};

module.exports = HTTP;
