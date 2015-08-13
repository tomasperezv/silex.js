/**
 * Encapsulates functionality in charge of sending response content
 * to the API clients.
 *
 * @class ResponseHandler
 */
var ResponseHandler = function() {
};

/**
 * @param {Response} response
 * @param {Number} httpCode
 * @param {Object} result
 * @method send
 * @public
 */
ResponseHandler.prototype.send = function(response, httpCode, result) {
  if (typeof result === 'undefined') {
    result = {};
  }

  response.writeHead(httpCode, {"Content-Type": "application/json"});
  response.end(JSON.stringify(result));
};

/**
 * @param {Response} response
 * @param {Promise} promise
 * @method promise
 * @public
 */
ResponseHandler.prototype.promise = function(response, promise) {
  var HTTP = require('./http');
  var self = this;
  promise.then(function(data) {
    self.send(response, HTTP.OK, data);
  },
  function(errorMessage) {
    self.send(response, HTTP.INTERNAL_ERROR, errorMessage);
  });
};

module.exports = ResponseHandler;
