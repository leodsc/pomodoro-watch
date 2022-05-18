import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ButtonComponent } from './components/button/button.component';
import { MessageComponent } from './components/message/message.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormValidationComponent } from './components/form-validation/form-validation.component';

import { EmailvalidatorDirective } from './directives/validation/emailvalidator.directive';
import { PasswordValidatorDirective } from './directives/validation/password-validator.directive';
import { NgChartsModule } from 'ng2-charts';
import { TrackComponent } from './pages/track/track.component';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ButtonComponent,
    MessageComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FormValidationComponent,
    EmailvalidatorDirective,
    PasswordValidatorDirective,
    TrackComponent,
    TranslatePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
