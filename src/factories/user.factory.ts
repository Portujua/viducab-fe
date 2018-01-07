import { BaseFactory } from './base.factory';

export class User extends BaseFactory {
  id?: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  clientId?: string;
  clientSecret?: string;
  createdAt?: string;

  constructor({ id = null, nickname = null, firstName = null, lastName = null, clientId = null, clientSecret = null, createdAt = null }) {
    super({ id, nickname, firstName, lastName, clientId, clientSecret, createdAt });
  }

  postPayload() {
    return {
      nickname: this.nickname,
      firstName: this.firstName,
      lastName: this.lastName
    }
  }
} 