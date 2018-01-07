import { Injectable } from '@angular/core';
import { RESTService } from './_rest.service';
import { LoadingController } from 'ionic-angular';
import { Session } from '../../factories/session.factory';

@Injectable()
export class AuthService {
  session: any;

  constructor(public loadingCtrl: LoadingController, private RESTFul: RESTService) {
    this.session = new Session({ });
  }

  login(username?: string, password?: string) {
    //return this.RESTFul.post('auth', { username, password });
    return this.RESTFul.get('users')
  }

  logout() {
    let loading = this.loadingCtrl.create({
      content: 'Logging out...'
    })

    loading.present()

    setTimeout(() => {
      this.setSession(new Session({ }))
      loading.dismiss();
    }, 1000)
  }

  getSession() {
    return this.session;
  }

  setSession(session: any = null) {
    this.session = new Session(session);
  }
}