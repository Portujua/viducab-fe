import { Injectable } from '@angular/core';
import { RESTService } from '../../app/services/_rest.service';
import { AuthService } from '../../app/services/auth.service';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private RESTful: RESTService, private authService: AuthService) {
    //
  }

  list(query: any = { }) {
    return this.RESTful.get('users', query)
  }

  create(payload) {
    return this.RESTful.post('users', payload);
  }

  update(payload) {
    return this.RESTful.put('users', payload)
  }

  getVideos(userId: string) {
    return this.RESTful.get(`users/${userId}/videos`)
  }

  getSubscribers(userId: string) {
    return this.RESTful.get(`users/${userId}/subscribers`)
  }

  getSubscriptions(userId: string) {
    return this.RESTful.get(`users/${userId}/subscriptions`)
  }

  subscribe(toUser: string) {
    let payload = {
      subscriber: this.authService.getSession(),
      owner: toUser
    }

    return this.RESTful.post('subscribe', payload)
  }

  unsubscribe(toUser: string) {
    let payload = {
      subscriber: this.authService.getSession(),
      owner: toUser
    }

    return this.RESTful.post('unsubscribe', payload)
  }

}
