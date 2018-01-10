import { Injectable } from '@angular/core';
import { RESTService } from '../../app/services/_rest.service';

/*
  Generated class for the VideoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {

  constructor(public RESTful: RESTService) {
    //
  }

  list(query?: any) {
    return this.RESTful.get('videos', query)
  }

  create(payload) {
    return this.RESTful.post('videos', payload)
  }

}
