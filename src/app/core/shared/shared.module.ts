import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertsComponent } from './modal/modal-alerts/modal-alerts.component';
import { ModalContentComponent } from './modal/modal-content/modal-content.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    ModalAlertsComponent,
    ModalContentComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalAlertsComponent,
    ModalContentComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
