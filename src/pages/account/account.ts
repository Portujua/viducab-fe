import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form';
import { LoginFormComponent } from '../../components/login-form/login-form';
import * as _ from 'underscore/underscore';
import { UserProvider } from '../../providers/user/user.provider';
import { GoogleDriveProvider } from '../../providers/google-drive/google-drive';
import { ChangePasswordComponent } from '../../components/change-password/change-password';

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
  subscriptions: any[];
  subscribers: any[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private Auth: AuthService, private userProvider: UserProvider, private googleDriveProvider: GoogleDriveProvider) {
    //
  }

  openRegisterModal() {
    let modal = this.modalCtrl.create(RegisterFormComponent, { });
    modal.present();
  }

  openLoginModal() {
    let modal = this.modalCtrl.create(LoginFormComponent, { });

    modal.onDidDismiss(response => {
      this.session = this.Auth.getSession();
      
      if (!this.session.isActive()) {
        return;
      }

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

        // We add the suscribed value
        this.userProvider.getSubscriptions(this.session.id).subscribe(response => {
          this.subscriptions = response['data'];

          _.each(this.allUsers, user => {
            _.each(this.subscriptions, subscriber => {
              user.subscribed = user.id === subscriber.id;
            })
          })

          this.userProvider.getSubscribers(this.session.id).subscribe(response => {
            this.subscribers = response['data']
            loading.dismiss();
          })
        })
      })
    })

    modal.present();
  }

  subscribe(user: any) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    })

    loading.present();

    this.userProvider.subscribe(user).subscribe(response => {
      user.subscribed = true;
      this.toastCtrl.create({
        message: `You subscribed to ${user.nickname} channel!`,
        duration: 2500,
        position: 'top'
      }).present()

      loading.dismiss();
    })
  }

  unsubscribe(user: any) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    })

    loading.present();

    this.userProvider.unsubscribe(user).subscribe(response => {
      user.subscribed = false;
      this.toastCtrl.create({
        message: `You unsubscribed to ${user.nickname} channel!`,
        duration: 2500,
        position: 'top'
      }).present()

      loading.dismiss();
    })
  }

  openChangePasswordModal() {
    let modal = this.modalCtrl.create(ChangePasswordComponent, { user: this.session });
    modal.present();
  }

}
