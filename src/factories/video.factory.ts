import { BaseFactory } from './base.factory';

export class Video extends BaseFactory {
  constructor({ id = null, owner = null, title = null, description = null, link = null, privacyType = null }) {
    super({ id, owner, title, description, link, privacyType });
  }
} 