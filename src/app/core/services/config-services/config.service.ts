import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /* Definición de variable para tomar el apuntamiento */
  base = environment.api;

  constructor() { }
}
