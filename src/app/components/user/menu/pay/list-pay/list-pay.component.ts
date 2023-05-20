import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { ModalColor } from 'src/app/core/models/modal/modalColor';
import { ModalData } from 'src/app/core/models/modal/modalData';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { PayService } from 'src/app/core/services/pay/pay.service';
import { ModalContentComponent } from 'src/app/core/shared/modal/modal-content/modal-content.component';

@Component({
  selector: 'app-list-pay',
  templateUrl: './list-pay.component.html',
  styleUrls: ['./list-pay.component.scss']
})
export class ListPayComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  paginadorDetail: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listTable: any = [];
  listDetailOrder: any = null;

  /* Modales */
  modal = new Modal(this.dialog);

  /* Templeate */
  @ViewChild('detailOrder') detailOrder!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private payService: PayService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.listOrderPay();
  }

  /* Función para listar ordenes */
  private listOrderPay() {
    this.payService.listOrdersPay().subscribe((resp) => {
      if (resp.data != null) {
        this.listTable = resp.data;
      }
    })
  }

  /* Menu opciones */
  public OpenOp(num: number) {
    const con = document.getElementById('tbl_pay') as HTMLTableElement;
    this.listTable.forEach((element: any) => {
      const op2 = document.getElementById('option' + element.idTakeOrder) as HTMLDivElement;
      if (op2 != null) {
        if (element.idTakeOrder == num) {
          if (op2.style.display == 'block') {
            op2.style.display = 'none';
          } else {
            op2.style.display = 'block';
            let diferencia = con.getClientRects()[0].bottom - op2.getClientRects()[0].bottom;
            if (diferencia < 0) {
              op2.style.borderBottom = 'none';
            }
          }
        } else {
          op2.style.display = 'none';
        }
      }
    });
  };

  /* Función para consultar detalle de orden o finalizar orden */
  public detailOrders(id: number, finalize: boolean = false, dataOrder?: any) {
    this.orderService.detailOrder(id).subscribe((resp) => {
      if (resp.data != null) {
        this.paginadorDetail = 1;
        this.listDetailOrder = resp.data;
        const destroy$: Subject<boolean> = new Subject<boolean>();
        /* Variables recibidas por el modal */
        const data: ModalData = {
          content: this.detailOrder,
          color: ModalColor.green,
          letterColor: ModalColor.white,
          primaryButton: finalize ? 'Finalizar' : 'Aceptar',
          secondaryButton: finalize ? 'Cancelar' : 'none',
          border: true
        };

        const dialogRef = this.dialog.open(ModalContentComponent, { width: '60em', data, disableClose: true });

        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_: any) => {
          if (finalize) {
            const destroyQ$: Subject<boolean> = new Subject<boolean>();
            const dialogRefQ = this.modal.modalQuestion('¿Esta seguro de finalizar la orden?', `Su valor total es de ${this.listDetailOrder[0].totalValue}`, 'Cancelar', 'Aceptar', '32em');
            dialogRefQ.componentInstance.primaryEvent?.pipe(takeUntil(destroyQ$)).subscribe((_) => {
              let dataPay = {
                action: 2,
                idTakeOrder: dataOrder.idTakeOrder,
                date: new Date(),
                totalValue: dataOrder.totalValue,
                idTable: dataOrder.idTable,
                idUser: Number(sessionStorage.getItem('idUser')),
                paid: false
              }
              this.orderService.createUpdateOrder(dataPay).subscribe((resp) => {
                if (resp.ok) {
                  const destroy$: Subject<boolean> = new Subject<boolean>();
                  const dialogRefS = this.modal.modalSuccess(resp.message, '', '32em');
                  dialogRefS.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
                    dialogRef.close();
                    dialogRefQ.close();
                    dialogRefS.close();
                    this.listOrderPay();
                  });
                }
              });
            });

            dialogRefQ.componentInstance.secondaryEvent?.pipe(takeUntil(destroyQ$)).subscribe((_) => {
              dialogRefQ.close();
            });

            dialogRef.componentInstance.secondaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
              dialogRef.close();
            });
          } else {
            dialogRef.close();
          }
        });

        dialogRef.componentInstance.secondaryEvent?.pipe(takeUntil(destroy$)).subscribe((_: any) => {
          dialogRef.close();
        });
      }
    });
  }
}
