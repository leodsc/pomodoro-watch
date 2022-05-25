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
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormValidationComponent } from './components/form-validation/form-validation.component';

import { EmailvalidatorDirective } from './directives/validation/emailvalidator.directive';
import { PasswordValidatorDirective } from './directives/validation/password-validator.directive';
import { NgChartsModule } from 'ng2-charts';
import { TrackComponent } from './pages/track/track.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { ModalComponent } from './components/modal/modal.component';

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
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
