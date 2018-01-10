import { BaseFactory } from './base.factory';
import * as _ from 'underscore/underscore';

export class Session extends BaseFactory {
  constructor({ id = null, nickname = null, password = null, firstName = null, lastName = null, clientid = null, clientSecret = null, createdAt = null }) {
    super({ id, nickname, password, firstName, lastName, clientid, clientSecret, createdAt });
  }

  isActive() {
    return !_.isEmpty(this.id);
  }
} 