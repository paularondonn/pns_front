import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPipe } from './cities/cities.pipe';
import { CountriesPipe } from './countries/countries.pipe';
import { TablesPipe } from './tables/tables.pipe';
import { ProductsPipe } from './products/products.pipe';
import { OrdersPipe } from './orders/orders.pipe';
import { PayPipe } from './pay/pay.pipe';



@NgModule({
  declarations: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe,
    ProductsPipe,
    OrdersPipe,
    PayPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CitiesPipe,
    CountriesPipe,
    ProductsPipe,
    TablesPipe,
    OrdersPipe,
    PayPipe
  ]
})
export class PipeModule { }
