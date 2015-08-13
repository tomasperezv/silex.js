/*jslint node: true */
'use strict';

/**
 * @constructor
 * @param {Router} router
 */

var App = function(router) {
  /**
   * @type {Router} _router
   * @private
   */
  this._router = router;
};

/**
 * @param {String} path
 * @param {Function} callback
 * @method get
 */
App.prototype.get = function(path, callback) {
  this._router.addRoute(path, callback);
};

module.exports = App;
