import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$ = new Subject<boolean>();

  constructor() { }

  /* Función para abrir cargador */
  show(): void {
    this.isLoading$.next(true);
  }

  /* Función para cerrar cargador */
  hide(): void {
    this.isLoading$.next(false);
  }
}
