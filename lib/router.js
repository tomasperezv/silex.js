/*jslint node: true */
'use strict';

/**
 * @class Router
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
};

/**
 * @param {request} request
 * @param {response} response
 * @method dispatch
 * @public
 */
Router.prototype.dispatch = function(request, response) {
  var url = require('url');
  var urlParts = url.parse(request.url, true);
  var self = this;
  if (typeof this._map[urlParts.pathname] !== 'undefined') {
    var route = this._map[urlParts.pathname];
    route.map(function(current) {
      var composedRequest = self._composeRequest(urlParts.query, current);
      var result = current.callback(composedRequest);
      self._responseHandler.send(response, result[1], result[0]);
    });
  } else {
     var HTTP = require('./core/http');
     this._responseHandler.send(response, HTTP.NOT_FOUND);
  }
};

/**
 * @param {Object} query
 * @param {Object} route
 * @method _composeRequest
 * @private
 */
Router.prototype._composeRequest = function(query, route) {
  return {GET: query};
};

/**
 * @param {String} method
 * @method _getPath
 * @private
 */
Router.prototype._getPath = function(method) {
  // TODO: Implement regex matching + parameters extraction
  return '/hello';
};

/**
 * @param {String} method
 * @param {Function} callback
 * @method addRoute
 * @public
 */
Router.prototype.addRoute = function(method, callback) {
  var path = this._getPath(method);
  if (typeof this._map[path] === 'undefined') {
    this._map[path] = [];
  }
  this._map[path].push({'get': 'name', 'callback': callback});
};

module.exports = Router;
