import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ModulesModule } from 'src/app/core/modules/modules.module';
import { UserComponent } from './user.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    UserComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModulesModule
  ]
})
export class UserModule { }
