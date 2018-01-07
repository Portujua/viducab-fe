import { Injectable } from '@angular/core';
import { RESTService } from '../../app/services/_rest.service';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private RESTful: RESTService) {
    //
  }

  list(query: any = { }) {
    return this.RESTful.get('users', query)
  }

  create(payload) {
    return this.RESTful.post('users', payload);
  }

}
