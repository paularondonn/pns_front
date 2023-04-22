import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { SecurityGuard } from 'src/app/core/guards/security.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivateChild: [SecurityGuard]
  },
  {
    path: 'paises',
    component: MenuComponent,
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
  },
  {
    path: 'ciudades',
    component: MenuComponent,
    loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule),
  },
  {
    path: 'mesas',
    component: MenuComponent,
    loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
