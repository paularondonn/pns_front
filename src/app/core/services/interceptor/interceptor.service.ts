import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from "rxjs/operators";
import { LoaderService } from '../loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from '../../globals/Modal/modal';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  /* Modales */
  modal = new Modal(this.dialog);

  constructor(private loaderService: LoaderService, private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (!request.url.split('/api/')[1].includes('validUserName')) {
      this.loaderService.show();
    }

    return next.handle(request).pipe(
      finalize(() => { this.loaderService.hide(); }),
      catchError((err: any) => {
        this.loaderService.hide();
        return this.alertError(err);
      }));
  }

  private alertError(error: HttpErrorResponse) {
    console.log(error)
    if (window.location.href.includes('menu')) {
      const destroy$: Subject<boolean> = new Subject<boolean>();
      const dialogRefM = this.modal.modalError('Error', error.error.toLowerCase().message, '35em');
      dialogRefM.componentInstance.primaryEvent?.pipe(takeUntil(destroy$)).subscribe((_) => {
        dialogRefM.close();
      });
    }

    return throwError(error);
  }
}
