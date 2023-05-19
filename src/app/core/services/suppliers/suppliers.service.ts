import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar proveedor */
  public listSuppliers(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listSuppliers`);
  }

  /* Detalle proveedor */
  public consultSuppliers(idSupplier: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultSuppliers/${idSupplier}`);
  }

  /* Crear/Editar proveedor */
  public createUpdateSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateSupplier`, supplier);
  }
}
