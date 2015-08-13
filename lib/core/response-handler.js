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

module.exports = ResponseHandler;
