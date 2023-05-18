import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { TablesService } from 'src/app/core/services/tables/tables.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  /* Variable */
  edit: boolean = false;
  idTakeOrder: number = 0;

  /* Paginador */
  paginador: number = 1;

  /* Listas */
  listTable: any = [];
  listDataProduct: any = [];

  form: FormGroup = this.fb.group({
    idTable: ['', [Validators.required]],
    idProduct: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    totalValue: ['', [Validators.required]],
  });

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute, private dialog: MatDialog,
    private tableService: TablesService, private orderService: OrdersService) {
    this.idTakeOrder = this.actRoute.snapshot.params['id'];
    this.edit = !!this.idTakeOrder ? true : false;
  }

  ngOnInit(): void {
    this.lists();
    this.detailOrder();
  }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }

  private lists() {
    this.listTables();
  }

  private listTables() {
    this.tableService.listTablesHeadquarters(Number(sessionStorage.getItem('idHeadquarters'))).subscribe((resp) => {
      if (resp.data != null) {
        this.listTable = [{ idTable: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listTable = [];
      }
    });
  }

  private detailOrder() {
    if (this.edit) {
      this.orderService.detailOrder(this.idTakeOrder).subscribe((resp) => {
      });
    }
  }

  public addProduct(product?: any) {

  }

  public removeProduct(product?: any) {

  }

  public cancel() {
    this.router.navigate(['/menu', 'ciudades']);
  }

  public save() {
    let message: string = this.edit ? 'Ciudad actualizada con exito' : 'Ciudad creada con exito';
    let data = { idCity: this.idTakeOrder, idCountry: this.fv.idCountry, name: this.fv.name }
    /* this.cityService.createUpdateCity(data).subscribe((resp) => {
      if (resp.ok) {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRef = this.modal.modalSuccess(message, '', '30em');
        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          this.router.navigate(['/menu', 'ciudades']);
          dialogRef.close();
        });
      }
    }, (error) => {
      if (error.error.message === 'Nombre de ciudad existente') {
        const combinationExist = { combinationExist: true };
        this.fc['name'].setErrors(combinationExist);
        this.fc['name'].markAsTouched();
      }
    }); */
  }

  /* Mensajes de error */
  get CityNameErrorMessage() {
    if (this.fc['name'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de ciudad existente';
    }
  }
}
