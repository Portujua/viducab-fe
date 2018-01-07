import { NgModule } from '@angular/core';
import { PrivacySelectorComponent } from './privacy-selector/privacy-selector';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
@NgModule({
	declarations: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterFormComponent],
	imports: [],
	exports: [PrivacySelectorComponent,
    LoginFormComponent,
    RegisterFormComponent]
})
export class ComponentsModule {}
