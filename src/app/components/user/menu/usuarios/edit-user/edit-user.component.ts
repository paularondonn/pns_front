import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { CitiesService } from 'src/app/core/services/cities/cities.service';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  /* Variable */
  edit: boolean = false;
  idUser: number = 0;

  /* Listas */
  listDocumentType: any = [];
  listCountry: any = [];
  listCity: any = [];
  listRole: any = [];

  form: FormGroup = this.fb.group({
    idDocumentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    names: ['', [Validators.required]],
    surnames: ['', [Validators.required]],
    nameUser: ['', [Validators.required]],
    password: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    idCountry: ['', [Validators.required]],
    idCity: ['', [Validators.required]],
    idRole: ['', [Validators.required]]
  });

  hide = true;

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute, private userService: UsersService,
    private dialog: MatDialog, private countryService: CountriesService, private cityService: CitiesService) {
    this.idUser = this.actRoute.snapshot.params['id'];
    this.edit = !!this.idUser ? true : false;
  }

  ngOnInit(): void {
    this.lists();
    this.detailUser();
    this.changesForm();
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
    this.listDocumentsType();
    this.listCountries();
    this.listRoles();
  }

  private listDocumentsType() {
    this.userService.listDocumentType().subscribe((resp) => {
      if (resp.data != null) {
        this.listDocumentType = [{ idDocumentType: '', name: 'Seleccionar una opción' }, ...resp.data]
      } else {
        this.listDocumentType = [];
      }
    });
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

  private listCities(idCountry: number) {
    this.cityService.consultCitiesCountry(idCountry).subscribe((resp) => {
      if (resp.data != null) {
        this.listCity = [{ idCity: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listCity = [];
      }
    });
  }

  private listRoles() {
    this.userService.listRoles().subscribe((resp) => {
      if (resp.data != null) {
        this.listRole = [{ idRole: '', name: 'Seleccione una opción' }, ...resp.data];
      } else {
        this.listRole = [];
      }
    });
  }

  private changesForm() {
    this.fc['idCountry'].valueChanges.subscribe((resp) => {
      if (resp != '') {
        this.listCities(resp);
      }
    });

    if (this.edit) {
      this.fc['password'].clearValidators();
      this.fc['password'].updateValueAndValidity();
    }
  }

  private detailUser() {
    if (this.edit) {
      this.userService.consultUser(this.idUser).subscribe((resp) => {
        this.fc['idDocumentType'].setValue(resp.data.idDocumentType);
        this.fc['documentNumber'].setValue(resp.data.documentNumber)
        this.fc['names'].setValue(resp.data.names);
        this.fc['surnames'].setValue(resp.data.surnames)
        this.fc['nameUser'].setValue(resp.data.nameUser);
        this.fc['birthDate'].setValue(resp.data.birthDate);
        this.fc['idCountry'].setValue(resp.data.idCountry)
        this.fc['idCity'].setValue(resp.data.idCity);
        this.fc['idRole'].setValue(resp.data.idRole);
      });
    }
  }

  public cancel() {
    this.router.navigate(['/menu', 'usuarios']);
  }

  public save() {
    if (this.form.valid) {
      let data = {
        idUser: this.edit ? Number(this.idUser) : 0,
        ...this.fv
      };

      this.userService.createUpdateUsers(data).subscribe((resp) => {
        if (resp.ok) {
          if (this.fv.password != '' && this.fv.password != null && this.edit) {
            let dataPassword = {
              idUser: Number(this.idUser),
              password: this.fv.password
            }
            this.userService.updatePassword(dataPassword).subscribe((resp) => {
              if (resp.ok) {
                const destroy$: Subject<boolean> = new Subject<boolean>();
                const dialogRef = this.modal.modalSuccess(resp.message, '', '30em');
                dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
                  this.router.navigate(['/menu', 'usuarios']);
                  dialogRef.close();
                });
              }
            });
          } else {
            const destroy$: Subject<boolean> = new Subject<boolean>();
            const dialogRef = this.modal.modalSuccess(resp.message, '', '30em');
            dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
              this.router.navigate(['/menu', 'usuarios']);
              dialogRef.close();
            });
          }
        }
      }, (error) => {
        if (error.error.message == "Usuario con tipo y número de documento existente") {
          const combinationExist = { combinationExist: true };
          this.fc['idDocumentType'].setErrors(combinationExist);
          this.fc['documentNumber'].setErrors(combinationExist);
          this.fc['idDocumentType'].markAsTouched();
          this.fc['documentNumber'].markAsTouched();
        }

        if (error.error.message == "Nombre de usuario existente") {
          const combinationExist = { combinationExist: true };
          this.fc['nameUser'].setErrors(combinationExist);
          this.fc['nameUser'].markAsTouched();
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  /* Mensajes de error */
  get TypeDocumentErrorMessage() {
    if (this.fc['idDocumentType'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Usuario con tipo y número de documento existente';
    }
  }

  get DocumentErrorMessage() {
    if (this.fc['documentNumber'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Usuario con tipo y número de documento existente';
    }
  }

  get NameUserErrorMessage() {
    if (this.fc['nameUser'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Nombre de usuario existente';
    }
  }
}
