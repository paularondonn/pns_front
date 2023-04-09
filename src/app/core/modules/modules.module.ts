import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';
// This module centralize everything related to Angular Material modules

@NgModule({
  imports: [],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
  ]
})
export class ModulesModule { }
