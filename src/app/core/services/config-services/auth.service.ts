import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() system: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private cs: ConfigService) { }

  login(name_user: string, password: string, id_headquarters: number): Observable<any> {
    const body = { name_user, password, id_headquarters }
    return this.http.post(`${this.cs.base}login`, body).pipe(
      map((resp: any) => {
        if (resp.ok) {
          localStorage.clear();
          sessionStorage.setItem('token', 'true');
          localStorage.setItem('username', resp.data.userName);
          sessionStorage.setItem('idUser', resp.data.idUser);
          sessionStorage.setItem('name', resp.data.name);
          sessionStorage.setItem('idRole', resp.data.idRole);
          sessionStorage.setItem('idHeadquarters', resp.data.idHeadquarters);
          return resp;
        }
      }));
  }

  isAuthenticate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token != null && token != '') {
      return true;
    } else {
      return false;
    }
  }

  menu(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}menu/${Number(sessionStorage.getItem('idRole'))}`);
  }

  validUserName(name_user: string): Observable<any> {
    return this.http.get<any>(`${this.cs.base}validUserName/${name_user}`);
  }

  logout(): boolean {
    const username = localStorage.getItem('username');
    const remember = localStorage.getItem('rememberUser');
    let filtro = (sessionStorage.getItem('filtros') != null) ? JSON.parse(sessionStorage.getItem('filtros') || '') : ''
    let filtro1 = (sessionStorage.getItem('filtros2') != null) ? JSON.parse(sessionStorage.getItem('filtros2') || '') : '';
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('username', String(username));
    localStorage.setItem('rememberUser', String(remember));
    if (filtro != '') {
      sessionStorage.setItem('filtros', JSON.stringify(filtro))
    }
    if (filtro1 != '') {
      sessionStorage.setItem('filtros2', JSON.stringify(filtro1))
    }
    return true
  }
}
