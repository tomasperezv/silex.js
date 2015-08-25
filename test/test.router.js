/*jslint node: true */
/*global describe, it */
'use strict';

var expect = require('expect.js');

/**
 * Unit tests for the Router class
 * @see ../lib/router.js
 */
describe('Router', function(){

  describe('Utils', function() {

    it('Identify a promise object', function() {
      var Router = require('../lib/router');
      var router = new Router();

      expect(router._isPromise('')).to.be(false);

      var promise = new Promise(function() {});
      expect(router._isPromise(promise)).to.be(true);
    });

    it('Processing route paths', function() {
      var Router = require('../lib/router');
      var router = new Router();

      var result = router._processRoutePath('/test/{param}');
      expect(result.id).to.be('/test/');
      expect(typeof result.httpGetParams.param).to.be('object');
    });

  });

});
