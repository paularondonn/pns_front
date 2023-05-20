import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config-services/config.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar mesas */
  public listTables(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listTables`);
  }

  /* Listar mesas segun la sede */
  public listTablesHeadquarters(idHeadquarters: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listTablesHeadquarters/${idHeadquarters}`);
  }

  /* Detalle mesa */
  public consultTable(idTable: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultTable/${idTable}`);
  }

  /* Crear/Editar mesa */
  public createUpdateTable(data: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateTable`, data);
  }
}
