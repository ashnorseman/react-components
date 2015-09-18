/**
 * Created by AshZhang on 15/9/18.
 */


'use strict';


/**
 * Guess dataType by url
 * @param {string} url
 * @returns {string}
 */
function parseDataType(url) {

  if (/\.html?$/.test(url)) {
    return 'html';
  } else if (/\.jsx?$/.test(url)) {
    return 'script';
  }

  return 'json';
}


/**
 * Parse response according to response
 * @param {Response} res
 * @param {string} dataType
 * @returns {Response}
 */
function parseResponse(res, dataType) {
  const methodMap = {
    html: 'text',
    script: 'text',
    json: 'json'
  };

  return res[methodMap[dataType] || 'json']();
}


/**
 * Encode an object to a query string
 * @param {Object} obj
 * @returns {string}
 */
function makeQueryString(obj) {
  let result = [];

  for (let prop in obj) if (obj.hasOwnProperty(prop)) {
    result.push(prop + '=' + encodeURIComponent(obj[prop]));
  }

  return result.length
    ? '?' + result.join('&')
    : '';
}


/**
 * Throw error when response status is not between 200 and 299
 * @param {Response} res
 * @returns {Response}
 */
function checkStatus(res) {

  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}


/**
 * General settings for `post`, `put` and `delete`
 * @param {string} url
 * @param {string} method
 * @param {Object} [data]
 * @returns {Promise}
 */
function sendData(url, method, data = {}) {
  let option = {
    method: method.toUpperCase()
  };

  if ('FormData' in window && data instanceof FormData) {

    // Form
    option.body = data;
  } else {

    // JSON
    option.headers = {
      'Content-Type': 'application/json'
    };
    option.body = JSON.stringify(data);
  }

  return fetch(url, option)
    .then(checkStatus)
    .then((res) => {
      return res.json();
    });
}


/**
 * API
 * @type {{get, post, put, delete}}
 */
export default {

  get(url, data = {}) {
    let query = data ? makeQueryString(data) : '';
    let dataType = parseDataType(url);

    return fetch(url + query)
      .then(checkStatus)
      .then((res) => {
        return parseResponse(res, dataType);
      });
  },

  post(url, data = {}) {
    return sendData(url, 'POST', data);
  },

  put(url, data = {}) {
    return sendData(url, 'PUT', data);
  },

  delete(url, data = {}) {
    return sendData(url, 'DELETE', data);
  }
};