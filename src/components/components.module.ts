import { NgModule } from '@angular/core';
import { PrivacySelectorComponent } from './privacy-selector/privacy-selector';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { VideoListComponent } from './video-list/video-list';
import { UploadFormComponent } from './upload-form/upload-form';
@NgModule({
	declarations: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterFormComponent,
    VideoListComponent,
    UploadFormComponent],
	imports: [],
	exports: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    VideoListComponent,
    UploadFormComponent]
})
export class ComponentsModule {}
