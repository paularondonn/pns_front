import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { HeadquartersService } from 'src/app/core/services/headquarters/headquarters.service';
import { TablesService } from 'src/app/core/services/tables/tables.service';

@Component({
  selector: 'app-edit-tables',
  templateUrl: './edit-tables.component.html',
  styleUrls: ['./edit-tables.component.scss']
})
export class EditTablesComponent implements OnInit {
  /* Variable */
  edit: boolean = false;
  idTable: number = 0;

  /* Listas */
  listCountry: any = [];
  listCities: any = [];
  listHeadquarters: any = [];
  listTables: any = [];

  form: FormGroup = this.fb.group({
    idCountry: ['', [Validators.required]],
    idCity: ['', [Validators.required]],
    idHeadquarters: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute, private sedeService: HeadquartersService,
    private countryService: CountriesService, private cityService: CitiesService, private tableService: TablesService, private dialog: MatDialog) {
    this.idTable = this.actRoute.snapshot.params['id'];
    this.edit = !!this.idTable ? true : false;
  }

  ngOnInit(): void {
    this.listCountries();
    this.changes();
    this.detailTable();
  }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }

  /* Listado de paises */
  private listCountries() {
    this.countryService.listCountries().subscribe((resp) => {
      if (resp.data != null) {
        this.listCountry = [{ idCountry: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listCountry = [];
      }
    });
  }

  /* Listado de ciduades */
  private listCity(idCountry: number) {
    this.cityService.consultCitiesCountry(idCountry).subscribe((resp) => {
      if (resp.data != null) {
        this.listCities = [{ idCity: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listCities = [];
      }
    });
  }

  /* Listado de sedes */
  private listSede(idCity: number) {
    this.sedeService.listHeadquartersCity(idCity).subscribe((resp) => {
      if (resp.data != null) {
        this.listHeadquarters = [{ idHeadquarters: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listHeadquarters = [];
      }
    });
  }

  /* Funcion para detectar cambios del formulario */
  private changes() {
    this.fc['idCountry'].valueChanges.subscribe((resp) => {
      if (resp != '') {
        this.listCity(resp);
      }
    });

    this.fc['idCity'].valueChanges.subscribe((resp) => {
      if (resp != '') {
        this.listSede(resp);
      }
    });
  }

  /* Función para traer el detalle de la mesa seleccionada */
  private detailTable() {
    if (this.edit) {
      this.tableService.consultTable(this.idTable).subscribe((resp) => {
        this.fc['idCountry'].setValue(resp.data.idCountry);
        setTimeout(() => {
          this.fc['idCity'].setValue(resp.data.idCity);
          this.fc['idHeadquarters'].setValue(resp.data.idHeadquarters);
          this.fc['name'].setValue(resp.data.name);
        }, 50);
      });
    }
  }

  /* Funcion para volver a la vista principal de mesas */
  public cancel() {
    this.router.navigate(['/menu', 'mesas']);
  }

  /* Función para crear o actualizar mesa */
  public save() {
    let message: string = this.edit ? 'Mesa actualizada con exito' : 'Mesa creada con exito';
    let data = { idTable: this.idTable, idHeadquarters: this.fv.idHeadquarters, name: this.fv.name }
    this.tableService.createUpdateTable(data).subscribe((resp) => {
      if (resp.ok) {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRef = this.modal.modalSuccess(message, '', '30em');
        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          this.router.navigate(['/menu', 'mesas']);
          dialogRef.close();
        });
      }
    }, (error) => {
      if (error.error.message === 'Nombre de mesa existente en sede seleccionada') {
        const combinationExist = { combinationExist: true };
        this.fc['name'].setErrors(combinationExist);
        this.fc['name'].markAsTouched();
      }
    });
  }

  /* Mensajes de error */
  get TableNameErrorMessage() {
    if (this.fc['name'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de mesa existente';
    }
  }

}
