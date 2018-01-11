import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    //
  }

  ngOnInit() {
    this.data = this.navParams.get('video');
  }

  videoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://drive.google.com/file/d/${ this.data.googleId }/preview`)
  }

  dismiss(t?: any) {
    this.viewCtrl.dismiss(t);
  }

}
