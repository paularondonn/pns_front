import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.scss']
})
export class ListReportsComponent {
  /* Formulario */
  form: FormGroup = this.fb.group({
    idReport: ['', [Validators.required]],
    initialDate: ['', [Validators.required]],
    finalDate: ['', [Validators.required]]
  });

  /* Listas */
  listReports: any = [
    { id: '', name: 'Seleccione una opción' },
    { id: 1, name: 'Reporte de productos' }
  ];

  constructor(private fb: FormBuilder) { }

  /* Metodo para obtener los controls de cada variable del formulario reactivo */
  get fc() {
    return this.form.controls;
  }

  /* Metodo para obtener el valor de cada variable del formulario reactivo */
  get fv() {
    return this.form.value;
  }
}
