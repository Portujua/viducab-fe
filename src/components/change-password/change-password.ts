import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.provider';
import { User } from '../../factories/user.factory';

/**
 * Generated class for the ChangePasswordComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordComponent implements OnInit {
  data: any;
  newPassword: string = '';

  constructor(public viewCtrl: ViewController, private userProvider: UserProvider, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    //
  }

  ngOnInit() {
    this.data = new User(this.navParams.get('user'));
  }

  save() {
    this.data.password = this.newPassword;

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    })

    loading.present();

    this.userProvider.update(this.data.changePasswordPayload()).subscribe(response => {
      loading.dismiss();

      this.toastCtrl.create({
        message: 'Password has been changed',
        duration: 2500,
        position: 'top'
      }).present()

      this.dismiss();
    })
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
