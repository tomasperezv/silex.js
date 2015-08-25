/*jslint node: true */
'use strict';

/**
 * The Router object handles the routes that represent the different application
 * methods.
 *
 * @class Router
 * @test ../test/test.router.js
 */
var Router = function() {
  /**
   * @type {Object} _map
   */
  this._map = {};

  var ResponseHandler = require('./core/response-handler');

  /**
   * @type {ResponseHandler} _responseHandler
   */
  this._responseHandler = new ResponseHandler();

  /**
   * @type {RegularExpression} REGEX_PATH
   */
  this.REGEX_PATH = /(\/\w*\/)(\{([a-zA-Z,]*)\})?/;
};

/**
 * @param {Promise|mixed} result
 * @return {Boolean}
 * @method _isPromise
 * @private
 */
Router.prototype._isPromise = function(result) {
  return (typeof result.constructor !== 'undefined' && result.constructor.name === 'Promise');
};

/**
 * @param {string} path
 * @param {string} parameters
 * @param {response} response
 * @method dispatch
 * @public
 */
Router.prototype.dispatch = function(path, parameters, response) {
  var HTTPCode = require('./core/http-code');
  var self = this;
  if (typeof this._map[path] !== 'undefined') {
    var route = this._map[path];
    route.map(function(current) {
      var composedRequest = self._composeRequest(parameters, current.get);
      var result = current.callback(composedRequest);

      if (self._isPromise(result)) {
        self._responseHandler.promise(response, result);
      } else {
        self._responseHandler.send(response, result[1], result[0]);
      }

    });
  } else {
     this._responseHandler.send(response, HTTPCode.NOT_FOUND);
  }
};

/**
 * @param {Object} query
 * @param {Object} getParams
 * @method _composeRequest
 * @private
 */
Router.prototype._composeRequest = function(query, getParams) {
  var result = {};

  for (var name in getParams) {
    if (typeof query[name] !== 'undefined') {
      result[name] = query[name];
    } else {
      result[name] = null;
    }
  }

  return result;
};

/**
 * @param {String} method
 * @return {Object}
 * @method _processRoutePath
 * @private
 */
Router.prototype._processRoutePath = function(method) {

  var regexMatch = method.match(this.REGEX_PATH);
  var httpGetParams = {};
  if (typeof regexMatch[3] !== 'undefined') {
    regexMatch[3].split(',').map(function(currentParam) {
      httpGetParams[currentParam] = null;
    });
  }

  return {
    id: regexMatch[1],
    httpGetParams: httpGetParams
  };
};

/**
 * @param {String} method
 * @param {Function} callback
 * @method addRoute
 * @public
 */
Router.prototype.addRoute = function(method, callback) {
  var routePath = this._processRoutePath(method);
  if (typeof this._map[routePath.id] === 'undefined') {
    this._map[routePath.id] = [];
  }

  this._map[routePath.id].push({
    'get': routePath.httpGetParams,
    'callback': callback
  });
};

module.exports = Router;
