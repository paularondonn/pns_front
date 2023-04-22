import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private loaderService: LoaderService) { }

  handleError(error: any) {
    this.loaderService.hide();
    if (error.rejection != undefined) {
      if (error.rejection.status == undefined) {
      } else {
        if (error.rejection.error == null) {
        } else {
          if (error.rejection.status != 500 && error.rejection.status != 404 && error.rejection.status != 401) {
          }
        }
      }
    } else {
      console.log('undefined', error)
    }
    return throwError(error);
  }
}
