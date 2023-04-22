import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCitiesComponent } from './list-cities/list-cities.component';
import { EditCitiesComponent } from './edit-cities/edit-cities.component';

const routes: Routes = [
  {
    path: '',
    component: ListCitiesComponent,
  },
  {
    path: ':type',
    component: EditCitiesComponent,
  },
  {
    path: ':type/:id',
    component: EditCitiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
