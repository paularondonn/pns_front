import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { ModalColor } from "../../models/modal/modalColor";
import { ModalData } from "../../models/modal/modalData";
import { ModalAlertsComponent } from "../../shared/modal/modal-alerts/modal-alerts.component";

export class Modal {

  constructor(private dialog: MatDialog) { }

  modalSuccess(msj: string, msj2?: string, widht?: string) {
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    let data: ModalData = {
      title: '',
      primaryInformation: msj,
      secondaryInformation: '',
      image: 'assets/img/modal/check.png',
      color: ModalColor.green,
      letterColor: ModalColor.white,
      border: true
    };

    const dialogRef = this.dialog.open(ModalAlertsComponent, { width: widht, data, disableClose: true });

    return dialogRef;
  }

  modalInformative(msj: string, msj2?: string, widht?: string) {
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    let data: ModalData = {
      title: '',
      primaryInformation: msj,
      secondaryInformation: msj2,
      image: 'assets/img/modal/alert.png',
      color: ModalColor.yellow,
      letterColor: ModalColor.white,
      border: true
    };

    const dialogRef = this.dialog.open(ModalAlertsComponent, { width: widht, data, disableClose: true });

    return dialogRef;
  }

  modalQuestion(msj: string, msj2?: string, widht?: string) {
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    let data: ModalData = {
      title: '',
      primaryInformation: msj,
      secondaryInformation: msj2,
      image: 'assets/img/modal/pregunta.png',
      color: ModalColor.purple,
      letterColor: ModalColor.white,
      border: true
    };

    const dialogRef = this.dialog.open(ModalAlertsComponent, { width: widht, data, disableClose: true });

    return dialogRef;
  }

  modalError(msj: string, msj2?: string, widht?: string) {
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    let data: ModalData = {
      title: '',
      primaryInformation: msj,
      secondaryInformation: msj2,
      image: 'assets/img/modal/equis.png',
      color: ModalColor.red,
      letterColor: ModalColor.white,
      border: true,
    };

    const dialogRef = this.dialog.open(ModalAlertsComponent, { width: widht, data, disableClose: true });

    return dialogRef;
  }
}
