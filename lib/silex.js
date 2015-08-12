/**
 * @constructor
 */
var SilexJS = function() {
  this._readConfig();
  this._route();
  this._initializeApp();
  this.HTTP = require('./http');
};

/**
 * @method _route
 * @private
 */
SilexJS.prototype._route = function() {
  var Router = require('./router');
  this.Router = new Router();
};

/**
 * @method _initializeApp
 * @private
 */
SilexJS.prototype._initializeApp = function() {
  var App = require('./app');
  this.App = new App(this.Router);
};

/**
 * @method _readConfig
 * @private
 */
SilexJS.prototype._readConfig = function() {
  var path = require('path');
  this.config = require(path.dirname(module.parent.filename) + '/config.json');
};

/**
 * @method start
 * @public
 */
SilexJS.prototype.start = function () {
  var http = require('http');
  var self = this;

  http.createServer(function (req, res) {
    self.Router.dispatch(req, res);
  }).listen(this.config.port);

};

module.exports = new SilexJS();
