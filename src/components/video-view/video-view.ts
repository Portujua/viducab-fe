import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoProvider } from '../../providers/video/video';
import { AuthService } from '../../app/services/auth.service';

/**
 * Generated class for the VideoViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'video-view',
  templateUrl: 'video-view.html'
})
export class VideoViewComponent implements OnInit {
  data: any;
  realVideoURL: any;
  comments: any = [];
  newComment: string = '';

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private sanitizer: DomSanitizer, private videoProvider: VideoProvider, public loadingCtrl: LoadingController, private authService: AuthService) {
    //
  }

  ngOnInit() {
    this.data = this.navParams.get('video');
    this.videoURL()

    this.loadComments()
  }

  loadComments() {
    let loading = this.loadingCtrl.create({
      content: 'Loading comments...'
    })

    loading.present();

    this.videoProvider.listComments(this.data.id).subscribe(response => {
      this.comments = response['data'];
      loading.dismiss();
    })
  }

  videoURL() {
    this.realVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/file/d/${ this.data.googleId }/preview`)
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
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

  comment() {
    let payload = {
      video: this.data,
      subscriber: this.authService.getSession(),
      text: this.newComment
    }

    let loading = this.loadingCtrl.create({
      content: 'Commenting...'
    })

    loading.present();

    this.videoProvider.comment(this.data.id, payload).subscribe(response => {
      this.newComment = '';
      this.loadComments();

      loading.dismiss()
    })
  }

  canComment() {
    return this.authService.getSession().isActive();
  }

}
