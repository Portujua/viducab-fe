import { BaseFactory } from './base.factory';

export class User extends BaseFactory {
  id?: string;
  nickname?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  clientId?: string;
  clientSecret?: string;
  createdAt?: string;

  constructor({ id = null, nickname = null, password = null, firstName = null, lastName = null, clientId = null, clientSecret = null, createdAt = null }) {
    super({ id, nickname, password, firstName, lastName, clientId, clientSecret, createdAt });
  }

  postPayload() {
    return {
      nickname: this.nickname,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }
  }

  changePasswordPayload() {
    return {
      id: this.id,
      password: this.password
    }
  }
} 