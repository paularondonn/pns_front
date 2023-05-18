import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayComponent } from './list-pay/list-pay.component';

const routes: Routes = [
  {
    path: '',
    component: ListPayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
