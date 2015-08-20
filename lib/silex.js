/*jslint node: true */
'use strict';

/**
 * @constructor
 */
var SilexJS = function(serviceId) {

  if (typeof serviceId === 'undefined') {
    serviceId = null;
  }

  this._serviceId = serviceId;
  this._readConfig();
  this._route();
  this._initializeApp();
  this.HTTPCode = require('./core/http-code');
};

// Extend SilexJS to inherit EventEmitter interface
var EventEmitter = require('events').EventEmitter;
var util = require('util');
util.inherits(SilexJS, EventEmitter);

/**
 * @param {String} serviceId
 * @method setServiceConfig
 * @public
 */
SilexJS.prototype.setServiceConfig = function(serviceId) {
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
 * Allow to test methods directly performing the request call.
 *
 * @method testMethod
 * @public
 */
SilexJS.prototype.testMethod = function(path) {
  var http = require('http');

  var callback = function(response) {
    var message = '';

    response.on('data', function (chunk) {
      message += chunk;
    });

    response.on('end', function () {
      console.log(message);
    });
  };

  http.request('http://localhost:' + this.config['http-port'] + path, callback).end();
};

/**
 * @method _readConfig
 * @private
 */
SilexJS.prototype._readConfig = function() {
  try {
    var path = '';
    if (this._serviceId === null) {
      // Services without identifier take the configuration from the default file
      path = require('path');
      this.config = require(path.dirname(module.parent.filename) + '/config.json');
    } else {
      // We use the service identifier to determine the service configuration
      // in the config.json file
      path = require('path');
      this.config = require(path.dirname(module.parent.filename) + '/config.json');
      if (typeof this.config.services[this._serviceId] !== 'undefined') {
        this.config['http-port'] = this.config.services[this._serviceId]['http-port'];
        this.config['websocket-port'] = this.config.services[this._serviceId]['websocket-port'];
      }
    }
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
  var handler = function(path, parameters, response) {
    router.dispatch(path, parameters, response);
  };

  var Network = require('./core/network/network');
  var httpHandler = Network.createServer(Network.Protocol.HTTP, this.config['http-port'], handler);
  if (this.config['websocket-port'] !== null) {
    Network.createServer(Network.Protocol.WEBSOCKET, this.config['websocket-port'], handler);
  }

  // Propagate the 'ready' event to be able to identify when
  // the HTTP server is ready to serve.
  var self = this;
  httpHandler.on('ready', function() {
    self.emit('ready');
  });
};

/**
 * Allow services to define their service identifier
 * in order to set their own configuration.
 */
module.exports = function(serviceId) {
  return new SilexJS(serviceId);
};
