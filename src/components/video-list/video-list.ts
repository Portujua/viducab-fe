import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { UserProvider } from '../../providers/user/user.provider';
import { UploadFormComponent } from '../../components/upload-form/upload-form';

/**
 * Generated class for the VideoListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'video-list',
  templateUrl: 'video-list.html'
})
export class VideoListComponent implements OnInit {
  data: any[] = [];
  @Input('ownerId') ownerId: string = '';
  @Input('userId') userId: string = '';
  @Input('self') self: any = null;

  constructor(private userProvider: UserProvider, private videoProvider: VideoProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    //
  }

  ngOnInit() {
    if (this.self) {
      this.userProvider.getVideos(this.self.id).subscribe(response => {
        this.data = response['data']
      })
    }
    else {
      this.videoProvider.list({ ownerId: this.ownerId, userId: this.userId }).subscribe(response => {
        this.data = response['data']
      })
    }
  }

  openUploadModal() {
    let modal = this.modalCtrl.create(UploadFormComponent, { id: 'holaaa' });

    modal.onDidDismiss(response => {
      //
    })

    modal.present();
  }

}
