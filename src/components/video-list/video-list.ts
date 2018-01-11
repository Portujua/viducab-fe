import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { UserProvider } from '../../providers/user/user.provider';
import { UploadFormComponent } from '../../components/upload-form/upload-form';
import { VideoViewComponent } from '../../components/video-view/video-view';
import { AuthService } from '../../app/services/auth.service';
import { Observable } from 'rxjs/Rx';

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

  constructor(private userProvider: UserProvider, private videoProvider: VideoProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private authService: AuthService) {
    //
  }

  ngOnInit() {
    if (!this.self) {
      Observable.interval(100).subscribe(() => {
        if (VideoProvider.shouldReload) {
          VideoProvider.shouldReload = false;
          this.userId = this.authService.getSession().id;
          this.load();
          console.log('Reloading video list for user id:', this.authService.getSession().id)
        }
      });
    }

    this.load();
  }

  load() {
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
    let modal = this.modalCtrl.create(UploadFormComponent, { user: this.self });

    modal.onDidDismiss(response => {
      if (response === true) {
        this.load();
      }
    })

    modal.present();
  }

  openViewModal(item) {
    let modal = this.modalCtrl.create(VideoViewComponent, { video: item });
    modal.present();
  }

}
