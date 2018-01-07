import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './services/auth.service';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  session: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private Auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      Observable.interval(100).subscribe(() => {
        this.session = this.Auth.getSession()
      })
    });
  }

  logout() {
    this.Auth.logout()
  }
}
