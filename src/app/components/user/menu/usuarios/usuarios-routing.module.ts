import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent,
  },
  {
    path: ':type',
    component: EditUserComponent,
  },
  {
    path: ':type/:id',
    component: EditUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
