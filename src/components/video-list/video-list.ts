import { Component, OnInit, Input } from '@angular/core';
import { Refresher, ModalController, LoadingController, ToastController } from 'ionic-angular';
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
  @Input('refresh') canRefresh: boolean = false;

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
        }
      });
    }

    this.load();
  }

  load(refresher?: any) {
    let loading = this.loadingCtrl.create({
      content: 'Loading'
    })

    loading.present();

    let obs = null;

    if (this.self) {
      obs = this.userProvider.getVideos(this.self.id)
    }
    else {
      obs = this.videoProvider.list({ ownerId: this.ownerId, userId: this.userId })
    }

    obs.subscribe(response => {
      this.data = response['data']
      loading.dismiss()
      
      if (refresher) { refresher.complete() }
    }, response => {
      this.toastCtrl.create({
        message: 'Couldn\'t get the feed.',
        duration: 2500,
        position: 'top'
      }).present()

      if (refresher) { refresher.complete() }
      loading.dismiss()
    })
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

  getPrivacyStr(privacyType) {
    return privacyType === 'ONLYSOME' ? 'ONLY SOME' : privacyType;
  }

  getDurationStr(_seconds) {
    let minutes = 0;
    let seconds = _seconds;

    while (seconds >= 60) {
      seconds -= 60;
      minutes++;
    }

    return `${minutes.toString().length === 1 ? '0' : ''}${minutes}:${seconds.toString().length === 1 ? '0' : ''}${seconds}`
  }

  refresh(e) {
    this.load(e)
  }

}
