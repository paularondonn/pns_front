import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuppliersComponent } from './list-suppliers/list-suppliers.component';
import { EditSuppliersComponent } from './edit-suppliers/edit-suppliers.component';

const routes: Routes = [
  {
    path: '',
    component: ListSuppliersComponent,
  },
  {
    path: ':type',
    component: EditSuppliersComponent,
  },
  {
    path: ':type/:id',
    component: EditSuppliersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
