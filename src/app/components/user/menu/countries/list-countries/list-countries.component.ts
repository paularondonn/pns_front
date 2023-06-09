import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { ModalColor } from 'src/app/core/models/modal/modalColor';
import { ModalData } from 'src/app/core/models/modal/modalData';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { ModalContentComponent } from 'src/app/core/shared/modal/modal-content/modal-content.component';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss']
})
export class ListCountriesComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listCountry: any = [];

  /* Variables */
  edit: boolean = false;

  /* Form control */
  name = new FormControl('', [Validators.required]);

  /* Modales */
  modal = new Modal(this.dialog);

  /* Templeate */
  @ViewChild('createUpdateCountry') createUpdateCountry!: TemplateRef<any>;

  constructor(private countryService: CountriesService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listCountries();
  }

  /* Función para listar paises */
  private listCountries() {
    this.countryService.listCountries().subscribe((resp) => {
      if (resp.data != null) {
        this.listCountry = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listCountry = [];
      }
    });
  }

  /* Función para agregar o editar pais */
  public addEdit(id: number = 0) {
    if (id > 0) {
      this.edit = true;
      this.countryService.consultCountries(id).subscribe((resp) => {
        this.name.setValue(resp.data.name);
      });
    } else {
      this.edit = false;
      this.name.setValue('');
    }
    const destroy$: Subject<boolean> = new Subject<boolean>();
    /* Variables recibidas por el modal */
    const data: ModalData = {
      content: this.createUpdateCountry,
      color: ModalColor.green,
      letterColor: ModalColor.white,
      primaryButton: 'Agregar',
      secondaryButton: 'Cancelar',
      border: true
    };

    const dialogRef = this.dialog.open(ModalContentComponent, { width: '30em', data, disableClose: true });

    dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_: any) => {
      if (this.name.valid) {
        const data = { idCountry: id, name: this.name.value }
        this.countryService.createUpdateCountry(data).subscribe((resp) => {
          if (resp.ok) {
            dialogRef.close();
            const dialogRefM = this.modal.modalSuccess(resp.message, '', '35em');
            dialogRefM.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
              dialogRefM.close();
              this.listCountries();
            });
          }
        }, (error) => {
          if (error.error.message == 'Nombre de país existente') {
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
    let tm = $('#country_table').position().top - $('#tbl_country').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }

  /* Mensajes de error */
  get CountryNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de pais existente';
    }
  }
}
