import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ModulesModule
  ]
})
export class UsuariosModule { }
