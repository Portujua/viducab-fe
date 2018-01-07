import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api.constants';
import * as _ from 'underscore/underscore';

@Injectable()
export class RESTService {
  session: any;

  constructor(private http: HttpClient) {
    //
  }

  _parseFilters(filters: any) {
    if (!_.isArray(filters)) {
      return filters;
    }

    if (filters.length === 0) {
      return '';
    }

    let qs = '';

    _.each(filters, (filter: any) => {
      qs += filter.toString()
    })

    return qs;
  }

  _createParams(params: Object) {
    let p = '';

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        p += `&${key}=${params[key]}`
      }
    }

    return p;
  }

  _createUrl(endpoint: string, queryStrings: any) {
    // Has query strings?
    if (!_.isEmpty(queryStrings) && _.isObject(queryStrings)) {
      endpoint += endpoint.indexOf('?') === -1 ? '?' : '&';

      if (!_.isUndefined(queryStrings.filter)) {
        queryStrings.filter = this._parseFilters(queryStrings.filter);
      }

      endpoint += this._createParams(queryStrings);
    }
    return API.url + endpoint;
  }

  get(endpoint: string, queryStrings: any = '', config: any = { }) {
    return this.http.get(this._createUrl(endpoint, queryStrings), config)
  }

  post(endpoint: string, payload: Object = { }, queryStrings: any = '', config: any = { }) {
    if (!payload || !_.isObject(payload)) {
      payload = { }
    }

    return this.http.post(this._createUrl(endpoint, queryStrings), payload, config)
  }

  put(endpoint: string, payload: Object = { }, queryStrings: any = '', config: any = { }) {
    if (!payload || !_.isObject(payload)) {
      payload = { }
    }

    return this.http.put(this._createUrl(endpoint, queryStrings), payload, config)
  }

  delete(endpoint: string, queryStrings: any = '', config: any = { }) {
    return this.http.delete(this._createUrl(endpoint, queryStrings), config)
  }

  patch(endpoint: string, payload, queryStrings: any = '', config: any = { }) {
    if (!payload || !_.isObject(payload)) {
      payload = { }
    }

    return this.http.patch(this._createUrl(endpoint, queryStrings), payload, config)
  }
}