import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config-services/config.service';

@Injectable({
  providedIn: 'root'
})
export class HeadquartersService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar sedes */
  public listHeadquarters(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listHeadquarters`);
  }

  /* Listar sedes por ciudad */
  public listHeadquartersCity(idCity: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listHeadquartersCity/${idCity}`);
  }
}
