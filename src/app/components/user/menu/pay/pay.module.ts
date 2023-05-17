import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { ListPayComponent } from './list-pay/list-pay.component';
import { FinishPayComponent } from './finish-pay/finish-pay.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListPayComponent,
    FinishPayComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule,
    ModulesModule
  ]
})
export class PayModule { }
