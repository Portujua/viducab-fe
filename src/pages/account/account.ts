import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form';
import { LoginFormComponent } from '../../components/login-form/login-form';
import * as _ from 'underscore/underscore';
import { UserProvider } from '../../providers/user/user.provider';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  session: any = this.Auth.getSession();
  segment: string = 'videos';
  loremImages: string[] = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature'];
  loremFiles: string[] = ['Birthday.mp4', 'Pool.mp4', 'Party.mp4', 'Party p2.mp4'];
  allUsers: any[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private Auth: AuthService, private userProvider: UserProvider) {
    // Refresh the session
    // Observable.interval(100).subscribe(() => {
    //   this.session = this.Auth.getSession()
    // })
  }

  openRegisterModal() {
    let modal = this.modalCtrl.create(RegisterFormComponent, { });
    modal.present();
  }

  openLoginModal() {
    let modal = this.modalCtrl.create(LoginFormComponent, { });

    modal.onDidDismiss(response => {
      this.session = this.Auth.getSession();

      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      })

      loading.present();

      this.userProvider.list().subscribe(response => {
        this.allUsers = [];

        _.each(response['data']['content'], user => {
          if (user.id !== this.Auth.getSession().id) {
            this.allUsers.push(user)
          }
        })

        loading.dismiss();
      })
    })

    modal.present();
  }

}
