import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { ListCitiesComponent } from './list-cities/list-cities.component';
import { EditCitiesComponent } from './edit-cities/edit-cities.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListCitiesComponent,
    EditCitiesComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    ModulesModule
  ]
})
export class CitiesModule { }
