import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar ciudades */
  public listProducts(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listCities`);
  }

  /* Detalle ciudad */
  public consultProducts(idCity: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultCities/${idCity}`);
  }

  /* Crear/Editar ciudades */
  public createUpdateProduct(city: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateCity`, city);
  }
}
