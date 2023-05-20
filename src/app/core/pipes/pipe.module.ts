import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPipe } from './cities/cities.pipe';
import { CountriesPipe } from './countries/countries.pipe';
import { TablesPipe } from './tables/tables.pipe';
import { ProductsPipe } from './products/products.pipe';

import { SuppliersPipe } from './suppliers/suppliers.pipe';

import { OrdersPipe } from './orders/orders.pipe';
import { PayPipe } from './pay/pay.pipe';
import { UsersPipe } from './users/users.pipe';




@NgModule({
  declarations: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe,
    ProductsPipe,
    SuppliersPipe,
    OrdersPipe,
    PayPipe,
    UsersPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CitiesPipe,
    CountriesPipe,
    ProductsPipe,
    SuppliersPipe,
    TablesPipe,
    OrdersPipe,
    PayPipe,
    UsersPipe
  ]
})
export class PipeModule { }
