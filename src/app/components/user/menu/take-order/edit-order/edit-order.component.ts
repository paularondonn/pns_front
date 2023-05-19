import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
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
  listProduct: any = [];
  listDataProduct: any = [];

  form: FormGroup = this.fb.group({
    idTable: ['', [Validators.required]],
    idProduct: ['']
  });

  amountProduct: boolean = false;
  amountProducts = new FormControl(1);
  totalValue: number = 0;

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute, private dialog: MatDialog,
    private tableService: TablesService, private orderService: OrdersService, private productService: ProductsService) {
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
    this.listProducts();
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

  private listProducts() {
    this.productService.listProducts().subscribe((resp) => {
      if (resp.data != null) {
        this.listProduct = [{ idProduct: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listProduct = [];
      }
    });
  }

  private detailOrder() {
    if (this.edit) {
      this.orderService.detailOrder(this.idTakeOrder).subscribe((resp) => {
        if (resp.ok) {
          this.totalValue = Number(resp.data[0].totalValue);
          this.fc['idTable'].setValue(Number(resp.data[0].idTable));
          resp.data.forEach((i: any) => {
            let dataProduct = {
              idProduct: i.idProduct,
              name: i.nameProduct,
              price: i.price,
              amount: i.amount,
              supplierName: i.nameSupplier,
              totalProduct: String(Number(i.price) * Number(i.amount)),
              idOrderProduct: i.idOrderProduct
            };

            this.listDataProduct.push(dataProduct);
          });

          setTimeout(() => {
            resp.data.forEach((i: any) => {
              const inputAmount = $('#amount' + i.idProduct);
              inputAmount.val(i.amount);
              this.amountProduct = i.amount > 1;
            });
          }, 50);
        }
      });
    }
  }

  public addProduct(product?: any) {
    if (product.idProduct != '') {
      let dataProduct = { ...product, totalProduct: product.price, idOrderProduct: 0 };
      if (this.listDataProduct.length > 0) {
        const index = this.listDataProduct.filter((i: any) => i.idProduct == product.idProduct);
        if (index.length > 0) {
          const destroy$: Subject<boolean> = new Subject<boolean>();
          const dialogRefM = this.modal.modalInformative('Producto ya asociado', '', '35em');
          dialogRefM.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
            dialogRefM.close();
          });
        } else {
          this.listDataProduct.push(dataProduct);
        }
      } else {
        this.listDataProduct.push(dataProduct);
      }

      this.calculateTotal();
      this.fc['idProduct'].setValue('');
    }
  }

  public removeProduct(product?: any) {
    if (product.idProduct != '') {
      const index = this.listDataProduct.findIndex((i: any) => i.idProduct == product.idProduct);
      if (index >= 0) {
        this.listDataProduct.splice(index, 1);
        this.calculateTotal();
      }
    }
  }

  public quantityProduct(id: number, sum: boolean) {
    const inputAmount = $('#amount' + id);
    let amount: number = Number(inputAmount.val());
    const index = this.listDataProduct.findIndex((i: any) => i.idProduct == id);
    if (sum) {
      amount++;
      this.listDataProduct[index].totalProduct = String(parseFloat(this.listDataProduct[index].price) * amount);
    } else {
      amount--;
      this.listDataProduct[index].totalProduct = String(parseFloat(this.listDataProduct[index].price) * amount);
    }

    inputAmount.val(amount);
    this.amountProduct = amount > 1;
    this.listDataProduct[index].amount = amount;
    this.calculateTotal();
  }

  public calculateTotal() {
    this.totalValue = 0;
    this.listDataProduct.forEach((i: any) => {
      this.totalValue += parseFloat(i.totalProduct);
    });
  }

  public cancel() {
    this.router.navigate(['/menu', 'ordenes']);
  }

  public save() {
    if (this.form.valid && this.listDataProduct.length > 0) {
      let message: string = this.edit ? 'Ciudad actualizada con exito' : 'Ciudad creada con exito';
      let data = {
        action: this.idTakeOrder != undefined ? 2 : 1,
        idTakeOrder: this.idTakeOrder != undefined ? Number(this.idTakeOrder) : 0,
        date: new Date(),
        totalValue: String(this.totalValue),
        idTable: this.fv.idTable,
        idUser: Number(sessionStorage.getItem('idUser')),
        paid: true
      };
      this.orderService.createUpdateOrder(data).subscribe((resp) => {
        if (resp.ok) {
          this.saveProducts(this.idTakeOrder != undefined ? this.idTakeOrder : resp.data.idOrder);
        }
      }, (error) => {
        if (error.error.message == 'Mesa con orden en proceso') {
          const combinationExist = { combinationExist: true };
          this.fc['idTable'].setErrors(combinationExist);
          this.fc['idTable'].markAsTouched();
        }
      });
    } else {
      this.form.markAllAsTouched();
      if (this.listDataProduct.length == 0) {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRefM = this.modal.modalInformative('Debe registrar productos', '', '35em');
        dialogRefM.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          dialogRefM.close();
        });
      }
    }
  }

  private saveProducts(idOrder: number) {
    if (idOrder > 0) {
      let idProduct: any = [];
      this.listDataProduct.forEach((i: any) => {
        let dataProduct = {
          idOrderProduct: i.idOrderProduct,
          idTakeOrder: Number(idOrder),
          idProduct: i.idProduct,
          amount: String(i.amount)
        }

        this.orderService.createUpdateOrderProduct(dataProduct).subscribe((resp) => {
          if (resp.ok) {
            idProduct.push(dataProduct.idProduct);

            if (idProduct.length == this.listDataProduct.length) {
              const destroy$: Subject<boolean> = new Subject<boolean>();
              const dialogRef = this.modal.modalSuccess(resp.message, '', '30em');
              dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
                this.router.navigate(['/menu', 'ordenes']);
                dialogRef.close();
              });
            }
          }
        });
      });
    }
  }

  /* Mensajes de error */
  get TableErrorMessage() {
    if (this.fc['idTable'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Mesa con orden en proceso';
    }
  }
}
