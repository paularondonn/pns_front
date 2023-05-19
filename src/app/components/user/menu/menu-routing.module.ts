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
  },
  {
    path: 'ordenes',
    component: MenuComponent,
    loadChildren: () => import('./take-order/take-order.module').then(m => m.TakeOrderModule),
  },
  {
    path: 'recaudo',
    component: MenuComponent,
    loadChildren: () => import('./pay/pay.module').then(m => m.PayModule),
  },
  {
    path: 'reportes',
    component: MenuComponent,
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'productos',
    component: MenuComponent,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'usuarios',
    component: MenuComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
