import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { SuppliersService } from 'src/app/core/services/suppliers/suppliers.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  /* Variable */
  edit: boolean = false;
  idProduct: number = 0;

  /* Listas */
  listSupplier: any = [];

  form: FormGroup = this.fb.group({
    idSuppliers: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute,
    private suppliersService: SuppliersService, private productService: ProductsService, private dialog: MatDialog) {
    this.idProduct = this.actRoute.snapshot.params['id'];
    this.edit = !!this.idProduct ? true : false;
  }

  ngOnInit(): void {
    this.listSuppliers();
    this.detailProduct();
  }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }

  private listSuppliers() {
    this.suppliersService.listSuppliers().subscribe((resp) => {
      if (resp.data != null) {
        this.listSupplier = [{ idSuppliers: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listSupplier = [];
      }
    });
  }

  private detailProduct() {
    if (this.edit) {
      this.productService.consultProducts(this.idProduct).subscribe((resp) => {
        this.fc['idSuppliers'].setValue(resp.data.idSuppliers);
        this.fc['name'].setValue(resp.data.name);
      });
    }
  }

  public cancel() {
    this.router.navigate(['/menu', 'ciudades']);
  }

  public save() {
    let message: string = this.edit ? 'Producto actualizado con exito' : 'Producto creado con exito';
    let data = { idProduct: this.idProduct, idSuppliers: this.fv.idSuppliers, name: this.fv.name }
    this.productService.createUpdateProduct(data).subscribe((resp) => {
      if (resp.ok) {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRef = this.modal.modalSuccess(message, '', '30em');
        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          this.router.navigate(['/menu', 'productos']);
          dialogRef.close();
        });
      }
    }, (error) => {
      if (error.error.message === 'Nombre de producto existente') {
        const combinationExist = { combinationExist: true };
        this.fc['name'].setErrors(combinationExist);
        this.fc['name'].markAsTouched();
      }
    });
  }

  /* Mensajes de error */
  get ProductNameErrorMessage() {
    if (this.fc['name'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de producto existente';
    }
  }
}
