import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertsComponent } from './modal/modal-alerts/modal-alerts.component';
import { ModalContentComponent } from './modal/modal-content/modal-content.component';



@NgModule({
  declarations: [
    ModalAlertsComponent,
    ModalContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
