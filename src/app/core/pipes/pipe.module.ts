import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPipe } from './cities/cities.pipe';
import { CountriesPipe } from './countries/countries.pipe';
import { TablesPipe } from './tables/tables.pipe';



@NgModule({
  declarations: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CitiesPipe,
    CountriesPipe,
    TablesPipe
  ]
})
export class PipeModule { }
