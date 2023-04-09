import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  base = environment.api;

  constructor() { }
}