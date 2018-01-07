import { Component } from '@angular/core';

import { ToastController, LoadingController, ViewController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import * as _ from 'underscore/underscore';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {
  isBusy: boolean = false;
  username: string = 'portujua';
  password: string = '1234';

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private AuthService: AuthService) {
    //
  }

  login() {
    this.isBusy = true;

    let loading = this.loadingCtrl.create({
      content: 'Logging in...'
    })

    loading.present();

    this.AuthService.login(this.username, this.password)
      .finally(() => {
        this.isBusy = false;
        loading.dismiss()
      }).subscribe(response => {
        //this.AuthService.setSession(response['data']);
        let session = null;

        _.each(response['data']['content'], (user) => {
          if (user.nickname === this.username) {
            session = user;
          }
        })

        if (!_.isNull(session)) {
          this.AuthService.setSession(session);
          this.dismiss(session);
        }
        else {
          this.toastCtrl.create({
            message: `Username or password incorrect`,
            duration: 2500,
            position: 'top'
          }).present()
        }

        this.reset();
      }, response => {
        this.toastCtrl.create({
          message: `Username or password incorrect`,
          duration: 2500,
          position: 'top'
        }).present()
      })
  }

  reset() {
    this.username = ''
    this.password = ''
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
