import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayComponent } from './list-pay/list-pay.component';
import { FinishPayComponent } from './finish-pay/finish-pay.component';

const routes: Routes = [
  {
    path: '',
    component: ListPayComponent,
  },
  {
    path: ':type',
    component: FinishPayComponent,
  },
  {
    path: ':type/:id',
    component: FinishPayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
