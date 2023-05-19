import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPipe } from './cities/cities.pipe';
import { CountriesPipe } from './countries/countries.pipe';
import { TablesPipe } from './tables/tables.pipe';
import { ProductsPipe } from './products/products.pipe';



@NgModule({
  declarations: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe,
    ProductsPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CitiesPipe,
    CountriesPipe,
    ProductsPipe,
    TablesPipe
  ]
})
export class PipeModule { }
