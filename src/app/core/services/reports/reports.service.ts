import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient, private cs: ConfigService) { }

  /* Reportes */
  public reportExcel(data:any): Observable<any> {
    return this.http.post<any>(`${this.cs.base}reportExcel`, data);
  }
}
