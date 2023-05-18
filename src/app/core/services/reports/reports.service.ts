import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config-services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient, private cs: ConfigService) { }
}
