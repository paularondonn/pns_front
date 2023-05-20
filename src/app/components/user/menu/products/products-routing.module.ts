import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
  },
  {
    path: ':type',
    component: EditProductsComponent,
  },
  {
    path: ':type/:id',
    component: EditProductsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
