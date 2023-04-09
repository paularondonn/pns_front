import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';

@Component({
  selector: 'app-edit-cities',
  templateUrl: './edit-cities.component.html',
  styleUrls: ['./edit-cities.component.scss']
})
export class EditCitiesComponent implements OnInit {
  /* Variable */
  edit: boolean = false;
  idCity: number = 0;

  /* Listas */
  listCountry: any = [];

  form: FormGroup = this.fb.group({
    idCountry: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute,
    private countryService: CountriesService, private cityService: CitiesService, private dialog: MatDialog) {
    this.idCity = this.actRoute.snapshot.params['id'];
    this.edit = !!this.idCity ? true : false;
  }

  ngOnInit(): void {
    this.listCountries();
    this.detailCity();
  }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }

  private listCountries() {
    this.countryService.listCountries().subscribe((resp) => {
      if (resp.data != null) {
        this.listCountry = [{ idCountry: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listCountry = [];
      }
    });
  }

  private detailCity() {
    if (this.edit) {
      this.cityService.consultCities(this.idCity).subscribe((resp) => {
        this.fc['idCountry'].setValue(resp.data.idCountry);
        this.fc['name'].setValue(resp.data.name);
      });
    }
  }

  public cancel() {
    this.router.navigate(['/menu', 'ciudades']);
  }

  public save() {
    let message: string = this.edit ? 'Ciudad actualizada con exito' : 'Ciudad creada con exito';
    let data = { idCity: this.idCity, idCountry: this.fv.idCountry, name: this.fv.name }
    this.cityService.createUpdateCity(data).subscribe((resp) => {
      if (resp.ok) {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRef = this.modal.modalSuccess(message, '', '30em');
        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          this.router.navigate(['/menu', 'ciudades']);
          dialogRef.close();
        });
      }
    });
  }

}
