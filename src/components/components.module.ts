import { NgModule } from '@angular/core';
import { PrivacySelectorComponent } from './privacy-selector/privacy-selector';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { VideoListComponent } from './video-list/video-list';
import { UploadFormComponent } from './upload-form/upload-form';
import { VideoViewComponent } from './video-view/video-view';
import { ChangePasswordComponent } from './change-password/change-password';
@NgModule({
	declarations: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterFormComponent,
    VideoListComponent,
    UploadFormComponent,
    VideoViewComponent,
    ChangePasswordComponent],
	imports: [],
	exports: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    VideoListComponent,
    UploadFormComponent,
    VideoViewComponent,
    ChangePasswordComponent]
})
export class ComponentsModule {}
