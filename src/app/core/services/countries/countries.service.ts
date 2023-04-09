import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar paises */
  public listCountries(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listCountries`);
  }

  /* Detalle pais */
  public consultCountries(idCountry: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultCountries/${idCountry}`);
  }

  /* Crear/Editar paises */
  public createUpdateCountry(country: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateCountry`, country);
  }
}
