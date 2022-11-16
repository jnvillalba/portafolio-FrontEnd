import { NewExperienciaComponent } from './components/experience/new-experiencia/new-experiencia.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import {RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevaexp', component: NewExperienciaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
