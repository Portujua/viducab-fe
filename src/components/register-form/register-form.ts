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

    this.userProvider.create(data.postPayload()).subscribe(response => {
      this.toastCtrl.create({
        message: 'User created successfully',
        duration: 2000
      }).present()

      this.dismiss()
    })
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
