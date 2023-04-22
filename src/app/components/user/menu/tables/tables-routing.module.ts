import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTablesComponent } from './list-tables/list-tables.component';
import { EditTablesComponent } from './edit-tables/edit-tables.component';

const routes: Routes = [
  {
    path: '',
    component: ListTablesComponent,
  },
  {
    path: ':type',
    component: EditTablesComponent,
  },
  {
    path: ':type/:id',
    component: EditTablesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
