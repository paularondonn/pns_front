import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { ModalColor } from 'src/app/core/models/modal/modalColor';
import { ModalData } from 'src/app/core/models/modal/modalData';
import { SuppliersService } from 'src/app/core/services/suppliers/suppliers.service';
import { ModalContentComponent } from 'src/app/core/shared/modal/modal-content/modal-content.component';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.scss']
})
export class ListSuppliersComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listSupplier: any = [];

  /* Variables */
  edit: boolean = false;

  /* Form control */
  name = new FormControl('', [Validators.required]);
  nit = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  telephone = new FormControl('', [Validators.required]);

  /* Modales */
  modal = new Modal(this.dialog);

  /* Templeate */
  @ViewChild('createUpdateSupplier') createUpdateSupplier!: TemplateRef<any>;

  constructor(private supplierService: SuppliersService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listSuppliers();
  }

  private listSuppliers() {
    this.supplierService.listSuppliers().subscribe((resp) => {
      if (resp.data != null) {
        this.listSupplier = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listSupplier = [];
      }
    });
  }

  public addEdit(id: number = 0) {
    let message: string = '';
    if (id > 0) {
      this.edit = true;
      this.supplierService.consultSuppliers(id).subscribe((resp) => {
        this.name.setValue(resp.data.name);
        this.nit.setValue(resp.data.nit);
        this.email.setValue(resp.data.email);
        this.telephone.setValue(resp.data.telephone);
      });
      message = 'Proveedor actualizado con exito';
    } else {
      this.edit = false;
      this.name.setValue('');
      this.nit.setValue('');
      this.email.setValue('');
      this.telephone.setValue('');
      message = 'Proveedor creado con exito';
    }
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    const data: ModalData = {
      content: this.createUpdateSupplier,
      color: ModalColor.green,
      letterColor: ModalColor.white,
      primaryButton: 'Agregar',
      secondaryButton: 'Cancelar',
      border: true
    };

    const dialogRef = this.dialog.open(ModalContentComponent, { width: '30em', data, disableClose: true });

    dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_: any) => {
      if (this.name.valid) {
        const data = { idSupplier: id, name: this.name.value, nit: this.nit.value, email: this.email.value, telephone: this.telephone.value }
        this.supplierService.createUpdateSupplier(data).subscribe((resp) => {
          if (resp.ok) {
            dialogRef.close();
            const dialogRefM = this.modal.modalSuccess(message, '', '35em');
            dialogRefM.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
              dialogRefM.close();
              this.listSuppliers();
            });
          }
        }, (error) => {
          if (error.error.message == 'Nombre de proveedor existente') {
            const combinationExist = { combinationExist: true };
            this.name.setErrors(combinationExist);
            this.name.markAsTouched();
          }
        });
      } else {
        this.name.markAsTouched();
      }
    });

    dialogRef.componentInstance.secondaryEvent?.pipe(takeUntil(destroy$)).subscribe((_: any) => {
      dialogRef.close();
    });
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#supplier_table').position().top - $('#tbl_supplier').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }

  /* Mensajes de error */
  get SupplierNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else if (this.nit.hasError('required')){
      return 'Campo obligatorio: Ingresar información.';
    } else if (this.email.hasError('required')){
      return 'Campo obligatorio: Ingresar información.';
    } else if (this.telephone.hasError('required')){
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de proveedor existente';
    }
  }
}
