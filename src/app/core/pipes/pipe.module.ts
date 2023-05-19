import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPipe } from './cities/cities.pipe';
import { CountriesPipe } from './countries/countries.pipe';
import { TablesPipe } from './tables/tables.pipe';
import { ProductsPipe } from './products/products.pipe';
import { SuppliersPipe } from './suppliers/suppliers.pipe';



@NgModule({
  declarations: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe,
    ProductsPipe,
    SuppliersPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CitiesPipe,
    CountriesPipe,
    ProductsPipe,
    SuppliersPipe,
    TablesPipe
  ]
})
export class PipeModule { }
