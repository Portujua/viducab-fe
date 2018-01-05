import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  session: any;
  loadingPromise: any;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private AuthService: AuthService) {
    //
  }

  login() {
    this.AuthService.login(this.username).subscribe(response => {
      this.AuthService.setSession(response);

      this.session = this.AuthService.getSession();
      this.reset();
    }, response => {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: `The username '${this.username}' does not exist.`,
        buttons: ['Okay']
      }).present()
    })
  }

  reset() {
    this.username = ''
    this.password = ''
  }

  clear() {
    this.session = null;
  }

}
