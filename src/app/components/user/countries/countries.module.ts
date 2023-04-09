import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { ListCountriesComponent } from './list-countries/list-countries.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListCountriesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ModulesModule
  ]
})
export class CountriesModule { }
