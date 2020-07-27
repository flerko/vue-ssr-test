/* eslint-disable no-console */
import fetch from 'isomorphic-fetch';

export default class Api {
  constructor (url, token) {
    this.url = url;
    this.token = token;
  }

  _getToken () {
    return this.token || localStorage.getItem('api_token');
  }

  _request = async (path = '', params = {}) => {
    params.headers = new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${this._getToken()}`,
      'Content-Type': 'application/json',
      ...params.headers
    });

    try {
      const response = await fetch(this.url + path, params);

      const json = await response.json();
      if (response.status < 200 || response.status > 300) {
        const error = new Error();
        Object.assign(error, json);
        throw error;
      }
      return json;
    } catch (error) {
      console.log('Fetch Error', error);
      throw error;
    }
  };

  get (path, params) {
    return this._request(path, {
      ...params,
      method: 'GET'
    });
  }

  post (path, params) {
    return this._request(path, {
      ...params,
      method: 'POST'
    });
  }

  put (path, params) {
    return this._request(path, {
      ...params,
      method: 'PUT'
    });
  }

  delete (path, params) {
    return this._request(path, {
      ...params,
      method: 'DELETE'
    });
  }
}
