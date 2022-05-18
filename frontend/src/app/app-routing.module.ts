import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TrackComponent } from './pages/track/track.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'cadastrar', component: SignupComponent },
  { path: 'uso', component: TrackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
