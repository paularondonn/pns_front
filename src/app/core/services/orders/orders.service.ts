import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar ordenes */
  public listOrder(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listOrder`);
  }

  /* Detalle orden */
  public detailOrder(idTakeOrder: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}detailOrder/${idTakeOrder}`);
  }

  /* Crear orden */
  public createUpdateOrder(data: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateOrder`, data);
  }

  /* Crear detalle de orden */
  public createUpdateOrderProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateOrderProduct`, data);
  }
}
