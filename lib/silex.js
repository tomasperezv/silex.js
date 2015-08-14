/*jslint node: true */
'use strict';

/**
 * @constructor
 */
var SilexJS = function() {
  this._readConfig();
  this._route();
  this._initializeApp();
  this.HTTPCode = require('./core/http-code');
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
  try {
    var path = require('path');
    this.config = require(path.dirname(module.parent.filename) + '/config.json');
  } catch (e) {
    // Loading default configuration
    this.config = require('./config/default.json');
  }
};

/**
 * @method start
 * @public
 */
SilexJS.prototype.start = function () {
  var router = this.Router;
  var handler = function(url, response) {
    router.dispatch(url, response);
  };

  var Network = require('./core/network/network');
  Network.createServer(Network.Protocol.HTTP, this.config.port, handler);
  Network.createServer(Network.Protocol.WEBSOCKET, this.config.websocketPort, handler);
};

module.exports = new SilexJS();
