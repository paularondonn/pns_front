import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ModulesModule
  ]
})
export class ReportsModule { }
