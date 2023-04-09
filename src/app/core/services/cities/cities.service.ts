import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar ciudades */
  public listCities(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listCities`);
  }

  /* Listar ciudades segun el pais */
  public consultCitiesCountry(idCountry: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultCitiesCountry/${idCountry}`);
  }

  /* Detalle ciudad */
  public consultCities(idCity: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultCities/${idCity}`);
  }

  /* Crear/Editar ciudades */
  public createUpdateCity(city: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateCity`, city);
  }
}
