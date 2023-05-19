import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Listar productos */
  public listProducts(): Observable<any> {
    return this.http.get<any>(`${this.cs.base}listProducts`);
  }

  /* Detalle productos */
  public consultProducts(idProduct: number): Observable<any> {
    return this.http.get<any>(`${this.cs.base}consultProducts/${idProduct}`);
  }

  /* Crear/Editar productos */
  public createUpdateProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}createUpdateProduct`, product);
  }
}
