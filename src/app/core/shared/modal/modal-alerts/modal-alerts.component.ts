import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalColor } from 'src/app/core/models/modal/modalColor';
import { ModalData } from 'src/app/core/models/modal/modalData';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.scss']
})
export class ModalAlertsComponent {
  /* Definición de variables */
  title?: string;
  primaryInformation?: string;
  secondaryInformation?: string;
  image?: string;
  border?: any;
  content?: TemplateRef<any>;
  primaryButton?: string;
  secondaryButton?: string;
  color?: ModalColor;
  letterColor?: ModalColor;

  /* Definición de colores */
  error = ModalColor.red;
  informative = ModalColor.yellow;
  successful = ModalColor.green;
  warning = ModalColor.purple;

  /* Definición de eventos de salida */
  @Output() primaryEvent: EventEmitter<void>;
  @Output() secondaryEvent: EventEmitter<void>;

  constructor(public dialogRef: MatDialogRef<ModalAlertsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,) {
    this.title = this.data?.title;
    this.primaryInformation = this.data?.primaryInformation;
    this.secondaryInformation = this.data?.secondaryInformation;
    this.image = this.data?.image;
    this.border = this.data?.border;
    this.content = this.data?.content;
    this.primaryButton = this.data?.primaryButton;
    this.secondaryButton = this.data.secondaryButton;
    this.color = this.data.color;
    this.letterColor = this.data.letterColor;

    this.primaryEvent = new EventEmitter<void>();
    this.secondaryEvent = new EventEmitter<void>();
  }

  /* Función para emitir el evento secundario */
  close() {
    this.secondaryEvent?.emit();
  }

  /* Función para emitir el evento principal */
  primary() {
    this.primaryEvent?.emit();
  }
}
