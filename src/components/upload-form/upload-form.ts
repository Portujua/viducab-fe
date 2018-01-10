import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user.provider';
import { GoogleDriveProvider } from '../../providers/google-drive/google-drive';

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
  privacies: string[] = ['Public', 'Private', 'Only selected users'];

  constructor(public viewCtrl: ViewController, public toastCtrl: ToastController, private userProvider: UserProvider, private googleDriveProvider: GoogleDriveProvider) {
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
    let payload = data;
    payload.googleId = this.selectedFile.id;

    console.log(payload)
    //data = new User(data);

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
