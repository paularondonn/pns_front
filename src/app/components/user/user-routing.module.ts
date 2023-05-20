import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from 'src/app/core/guards/security.guard';
import { UserComponent } from './user.component';
import { LoginComponent } from '../login/login/login.component';

const routes: Routes = [
  {
    path:'menu',
    component: UserComponent,
    loadChildren:()=>import('./menu/menu.module').then(m=>m.MenuModule),
    canActivateChild: [SecurityGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
