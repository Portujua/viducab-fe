import { Component } from '@angular/core';

import { ToastController, LoadingController, ViewController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { VideoProvider } from '../../providers/video/video';

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
  password: string = '21115476';

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public viewCtrl: ViewController, private AuthService: AuthService, private videoProvider: VideoProvider) {
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
        this.AuthService.setSession(response['data']);
        VideoProvider.shouldReload = true;
        this.reset();
        this.dismiss();
      }, response => {
        this.toastCtrl.create({
          message: response['error']['message'][0],
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
