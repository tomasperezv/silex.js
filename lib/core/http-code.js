/*jslint node: true */
'use strict';

/**
 * Storage for HTTP response codes
 */
var HTTPCode = {
  /**
   * 2xx Success
   */
  'OK': 200,

  /**
   * 4xx Client error
   */
  'BAD_REQUEST': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,

  /**
   * 5xx Server error
   */
  'INTERNAL_ERROR': 500,
  'SERVICE_UNAVAILABLE': 503
};

module.exports = HTTPCode;
