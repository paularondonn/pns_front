import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadquartersService } from 'src/app/core/services/headquarters/headquarters.service';
import { ReportsService } from 'src/app/core/services/reports/reports.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.scss']
})
export class ListReportsComponent implements OnInit {
  /* Formulario */
  form: FormGroup = this.fb.group({
    idReport: ['', [Validators.required]],
    initialDate: ['', [Validators.required]],
    finalDate: ['', [Validators.required]],
    idSede: ['']
  });

  /* Listas */
  listReports: any = [
    { id: '', name: 'Seleccione una opción' },
    { id: 1, name: 'Reporte de productos vendidos' },
    { id: 2, name: 'Reporte de cantidad de productos vendidos' },
    { id: 3, name: 'Reporte de ventas' },
    { id: 4, name: 'Reporte de cajas por sede' },
    { id: 5, name: 'Reporte de inventario' },
  ];

  listSedes: any = [];

  constructor(private fb: FormBuilder, private reportService: ReportsService, private sedeService: HeadquartersService) { }

  ngOnInit(): void {
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

  private changesForm() {
    this.fc['idReport'].valueChanges.subscribe((resp) => {
      this.fc['idSede'].setValue('');
      if (resp == 4) {
        this.fc['idSede'].setValidators([Validators.required]);
        this.listSede();
      }
    });
  }

  private listSede() {
    this.sedeService.listHeadquarters().subscribe((resp) => {
      if (resp.data != null) {
        this.listSedes = [{ idHeadquarters: '', name: 'Seleccionar una opción' }, ...resp.data];
      } else {
        this.listSedes = [];
      }
    });
  }

  public generateReport() {
    if (this.form.valid) {
      let data = {
        action: this.fv.idReport,
        initialDate: this.fv.initialDate,
        finalDate: this.fv.finalDate,
        idSede: this.fv.idSede != '' ? this.fv.idSede : 0
      }
      this.reportService.reportExcel(data).subscribe((resp) => {
        const nameReport = `reporte ${new Date().toLocaleDateString("es-CO")}.xlsx`;
        this.downloadReport(resp.data, nameReport);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private downloadReport(file: any, nameReport: string): void {
    const source = `data:application/xlsx;base64,${file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = nameReport;
    link.click();
    this.form.reset();
  }
}
