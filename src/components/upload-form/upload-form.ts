import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.provider';
import { VideoProvider } from '../../providers/video/video';
import { GoogleDriveProvider } from '../../providers/google-drive/google-drive';
import { AuthService } from '../../app/services/auth.service';
import * as _ from 'underscore/underscore';

/**
 * Generated class for the UploadFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload-form',
  templateUrl: 'upload-form.html'
})
export class UploadFormComponent {
  selectedFile: any;
  allUsers: any;
  privacies: any[] = [
    {
      name: 'Public',
      value: 'PUBLIC'
    },
    { 
      name: 'Private',
      value: 'PRIVATE'
    },
    { 
      name: 'Only selected users',
      value: 'ONLYSOME'
    }
  ];
  categories: any[] = [
    {
      name: 'Music',
      value: 'MUSIC'
    },
    {
      name: 'Entertainment',
      value: 'ENTERTAINMENT'
    },
    {
      name: 'Comedy',
      value: 'COMEDY'
    },
    {
      name: 'Games',
      value: 'GAMES'
    },
    {
      name: 'Sports',
      value: 'SPORTS'
    },
    {
      name: 'Science',
      value: 'SCIENCE'
    },
  ];
  privacy: string;
  category: string;

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, private userProvider: UserProvider, private googleDriveProvider: GoogleDriveProvider, private videoProvider: VideoProvider, public loadingCtrl: LoadingController, private authService: AuthService, public navParams: NavParams) {
    this.userProvider.list().subscribe(response => {
      this.allUsers = response['data']['content'];
    })
  }

  selectFile() {
    this.selectedFile = null;

    this.googleDriveProvider.getFile().subscribe(response => {
      this.selectedFile = response;
    })
  }

  create(data) {
    let payload = {
      users: [],
      video: data
    }

    payload.video.owner = this.navParams.get('user') || this.authService.getSession();
    payload.video.googleId = this.selectedFile.id;
    payload.video.duration = this.selectedFile.duration;
    payload.video.link = this.selectedFile.id;
    payload.video.privacyType = this.privacy;
    payload.video.category = this.category;

    if (payload.video.privacyType === 'ONLYSOME') {
      _.each(this.allUsers, user => {
        if (user.selected) {
          payload.users.push(user)
        }
      })
    }

    let loading = this.loadingCtrl.create({
      content: 'Loading'
    })

    loading.present();

    this.videoProvider.create(payload).subscribe(response => {
      this.toastCtrl.create({
        message: 'Video has been uploaded successfully',
        duration: 2500,
        position: 'top'
      }).present()

      VideoProvider.shouldReload = true;
      loading.dismiss();
      this.dismiss(true)
    }, response => {
      loading.dismiss();
      this.toastCtrl.create({
        message: response['error']['message'][0],
        duration: 2500,
        position: 'top'
      }).present()
    })

    // this.userProvider.create(data.postPayload())
    // .finally(() => {
    //   this.dismiss()
    // })
    // .subscribe(response => {
    //   this.toastCtrl.create({
    //     message: 'User created successfully',
    //     duration: 2000
    //   }).present()
    // }, response => {
    //   this.toastCtrl.create({
    //     message: response['error']['message'][0],
    //     duration: 2000
    //   }).present()
    // })
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
