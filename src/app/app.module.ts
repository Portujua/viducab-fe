import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AccountPage } from '../pages/account/account';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginFormComponent } from '../components/login-form/login-form';
import { RegisterFormComponent } from '../components/register-form/register-form';

import { HttpClientModule } from '@angular/common/http';

import { RESTService } from './services/_rest.service'
import { AuthService } from './services/auth.service';
import { UserProvider } from '../providers/user/user.provider';

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginFormComponent,
    RegisterFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RESTService,
    AuthService,
    UserProvider
  ]
})
export class AppModule {}
