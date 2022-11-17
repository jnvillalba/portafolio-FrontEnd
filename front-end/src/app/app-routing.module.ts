import { EditEducacionComponent } from './components/education/edit-educacion/edit-educacion.component';
import { NewEducacionComponent } from './components/education/new-educacion/new-educacion.component';
import { EditExperienciaComponent } from './components/experience/edit-experiencia/edit-experiencia.component';
import { NewExperienciaComponent } from './components/experience/new-experiencia/new-experiencia.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import {RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevaexp', component: NewExperienciaComponent },
  { path: 'editexp/:id', component: EditExperienciaComponent },
  { path: 'nuevaeduc', component: NewEducacionComponent },
  { path: 'editeduc/:id', component: EditEducacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
