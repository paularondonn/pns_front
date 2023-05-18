import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ModulesModule } from 'src/app/core/modules/modules.module';


@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ModulesModule
  ]
})
export class ProductsModule { }
