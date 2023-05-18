import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config-services/config.service';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar ordenes */
  public listOrdersPay(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listOrdersPay`);
  }
}
