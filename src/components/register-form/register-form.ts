import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.provider';
import { User } from '../../factories/user.factory';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, private userProvider: UserProvider) {
    //
  }

  create(data) {
    data = new User(data);

    this.userProvider.create(data.postPayload())
    .finally(() => {
      this.dismiss()
    })
    .subscribe(response => {
      this.toastCtrl.create({
        message: 'User created successfully',
        duration: 2000
      }).present()
    }, response => {
      this.toastCtrl.create({
        message: response['error']['message'][0],
        duration: 2000
      }).present()
    })
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
