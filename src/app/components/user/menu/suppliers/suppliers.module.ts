import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';
import { ListSuppliersComponent } from './list-suppliers/list-suppliers.component';


@NgModule({
  declarations: [
    EditSuppliersComponent,
    ListSuppliersComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
