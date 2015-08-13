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
  if (typeof this._map[urlParts.pathname] !== 'undefined') {
    var route = this._map[urlParts.pathname];
    var self = this;
    route.map(function(current) {
      var composedRequest = self._composeRequest(urlParts.query, current);
      var result = current.callback(composedRequest);
      response.writeHead(result[1], {"Content-Type": "application/json"});
      response.end(JSON.stringify(result[0]));
    });
  } else {
     var HTTP = require('./http');
     response.writeHead(HTTP.NOT_FOUND, {"Content-Type": "application/json"});
     response.end(JSON.stringify({}));
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
