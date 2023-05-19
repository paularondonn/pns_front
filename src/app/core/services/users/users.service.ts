import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config-services/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar roles */
  public listRoles(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listRoles`);
  }

  /* Listar tipos de documneto */
  public listDocumentType(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listDocumentType`);
  }

  /* Listar usurios */
  public listUsers(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listUsers`);
  }

  /* Listar mesas segun la sede */
  public consultUser(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultUser/${idUser}`);
  }

  /* Crear/Editar mesa */
  public createUpdateUsers(data: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateUsers`, data);
  }

  /* Crear/Editar mesa */
  public updatePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}updatePassword`, data);
  }
}
