import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { ListTablesComponent } from './list-tables/list-tables.component';
import { EditTablesComponent } from './edit-tables/edit-tables.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListTablesComponent,
    EditTablesComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    ModulesModule
  ]
})
export class TablesModule { }
