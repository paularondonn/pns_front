import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReportsComponent } from './list-reports/list-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ListReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
