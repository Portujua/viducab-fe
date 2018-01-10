import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

/*
  Generated class for the GoogleDriveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleDriveProvider {
  public static API_KEY: string = 'AIzaSyAvUtWU9IiqYZm-MNQdDtNg2Ki6m-ZKECE';
  public static CLIENT_ID: string = '875716120882-691jrpsla6j96p0esihfgqaa9s96ut8r.apps.googleusercontent.com';
  private pickerLoaded: boolean = false;
  private authToken: string = null;

  private filePromise: any;

  constructor() {
    //this.readAPI();
  }

  private readAPI(){ 
    if (!window['gapi']) {
      setTimeout(() => {
        this.readAPI();
      }, 100)
    }
    else {
      this.getFile();
    }
  }

  getFile() {
    this.filePromise = new Subject();
  
    window['gapi'].load('auth', {'callback': () => { this.cbLoad() }});
    window['gapi'].load('picker', {'callback': () => { this.pickerLoaded = true; this.createPicker(); }});

    return this.filePromise;
  }

  private cbLoad() {
    window['gapi'].auth.authorize(
      {
        'client_id': GoogleDriveProvider.CLIENT_ID,
        'scope': ['https://www.googleapis.com/auth/drive.readonly'],
        'immediate': false
      },
      (result) => { this.cbAuth(result) });
  }

  private cbAuth(authResult: any) {
    this.authToken = authResult.access_token;
    this.createPicker();
  }

  private createPicker() {
    if (this.pickerLoaded && this.authToken) {
      let picker = new window['google'].picker.PickerBuilder().
          addView(window['google'].picker.ViewId.DOCS_VIDEOS).
          setOAuthToken(this.authToken).
          setDeveloperKey(GoogleDriveProvider.API_KEY).
          setCallback((data) => {
            this.cbPicker(data);
          }).
          build();

      picker.setVisible(true);
    }
  }

  private cbPicker(data: any) {
    if (data.action === 'picked') {
      if (data.docs.length > 0) {
        let file = data.docs[0];
        this.filePromise.next(file);
      }
    }
  }

}
