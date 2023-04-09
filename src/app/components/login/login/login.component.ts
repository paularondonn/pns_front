import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Modal } from 'src/app/core/globals/Modal/modal';
import { AuthService } from 'src/app/core/services/config-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* Variables */
  hide = true;
  headquarters: any = [];

  /* Formulario reactivo */
  form: FormGroup = this.fb.group({
    user: [localStorage.getItem('username'), Validators.required],
    password: ['', [Validators.required]],
    idHeadquarters: ['', Validators.required],
    remember: [localStorage.getItem('rememberUser')],
  });

  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('username') != null) {
      this.Username();
    }
  }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }

  public Username() {
    if (this.fv.user != '' && this.fv.user != null) {
      this.userService.validUserName(this.fv.user).subscribe((resp) => {
        if (resp.ok) {
          if (resp.data != null) {
            this.headquarters = [{ idSities: '', idHeadquarters: '', name: 'Seleccione una opción' }, ...resp.data];
          } else {
            this.headquarters = [];
          }
        }
      }, (error) => {
        console.log('entraaa')
        const combinationExist = { combinationExist: true };
        this.fc['user'].setErrors(combinationExist);
        this.fc['user'].markAsTouched();
      });
    }
  }

  public login() {
    if (this.form.valid) {
      this.userService.login(this.fv.user, this.fv.password, this.fv.idHeadquarters).subscribe((resp) => {
        if (resp.ok) {
          if (this.fv.remember) {
            localStorage.setItem('username', this.fv.user);
            localStorage.setItem('rememberUser', 'true');
          }
          this.router.navigateByUrl('/menu');
        }
      }, (error) => {
        const destroy$: Subject<boolean> = new Subject<boolean>();
        const dialogRef = this.modal.modalError('Error', 'Contraseña incorrecta', '35em');
        dialogRef.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
          dialogRef.close();
        });
      });
    }
  }

  /* Mensajes de error */
  get UsernameErrorMessage() {
    if (this.fc['user'].hasError('required')) {
      return 'Campo obligatorio: Ingresar información.';
    } else {
      return 'Error: Usuario no encontrado';
    }
  }
}
