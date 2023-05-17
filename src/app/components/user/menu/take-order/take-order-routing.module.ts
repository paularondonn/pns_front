import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrderComponent } from './list-order/list-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrderComponent,
  },
  {
    path: ':type',
    component: EditOrderComponent,
  },
  {
    path: ':type/:id',
    component: EditOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TakeOrderRoutingModule { }
