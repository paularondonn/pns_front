import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TakeOrderRoutingModule } from './take-order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    TakeOrderRoutingModule,
    ModulesModule
  ]
})
export class TakeOrderModule { }
