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
 * @param {Request} req
 * @param {Response} res
 * @method dispatch
 * @public
 */
Router.prototype.dispatch = function(req, res) {
  var url = require('url');
  var urlParts = url.parse(req.url, true);
  if (typeof this._map[urlParts.pathname] !== 'undefined') {
    var route = this._map[urlParts.pathname];
    var self = this;
    route.map(function(current) {
      var request = self._composeRequest(urlParts.query, current);
      current.callback(request);
    });
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
