import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from 'src/app/core/guards/security.guard';
import { UserComponent } from './user.component';
import { LoginComponent } from '../login/login/login.component';

const routes: Routes = [
  {
    path:'',
    component: UserComponent,
    canActivateChild: [SecurityGuard]
  },
  {
    path: 'usuarios',
    component: UserComponent,
    /* loadChildren: () => import('./components/user/user.module').then(m => m.UserModule), */
  },
  {
    path: 'paises',
    component: UserComponent,
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule),
  },
  {
    path: 'ciudades',
    component: UserComponent,
    loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
