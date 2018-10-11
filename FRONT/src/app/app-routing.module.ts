import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CompetenceFormComponent } from './competence-form/competence-form.component';
import { CharacterFormComponent } from './character-form/character-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'posts',
    component: CompetenceFormComponent,
  },
  {
    path: 'newchar',
    component: CharacterFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
