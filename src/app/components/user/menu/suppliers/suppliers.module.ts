import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ListSuppliersComponent } from './list-suppliers/list-suppliers.component';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListSuppliersComponent,
    EditSuppliersComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    ModulesModule
  ]
})
export class SuppliersModule { }
