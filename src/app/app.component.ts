import { Component } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthService } from './core/services/config-services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalData } from './core/models/modal/modalData';
import { ModalAlertsComponent } from './core/shared/modal/modal-alerts/modal-alerts.component';
import { ModalColor } from './core/models/modal/modalColor';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pns_front';

  timedOut = false;
  idleState = 'Not started.';
  lastPing: Date | undefined;

  constructor(private idle: Idle, private keepalive: Keepalive, private autService: AuthService, private dialog: MatDialog) {
    idle.setIdle(18000);
    // sets a timeout period of 300 seconds. 5 min
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // sessionStorage.removeItem('token')

      var expiracion = new Date();
      expiracion.setTime(expiracion.getTime() - 1);
      document.cookie = "token=;expires=" + expiracion.toUTCString() + ";path=/";

      this.openInactiveTime();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      /* console.log("te queda poco tiempo!") */
    });

    idle.onTimeoutWarning.subscribe((countdown: string) => {
      this.idleState = 'Se agotara el tiempo en ' + countdown + ' segundos!';
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.autService.system.subscribe(r => {
      if (r) {
        //const token = sessionStorage.getItem('token');
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if (token != null) {
          this.idle.watch();
          this.timedOut = false;
        } else {
          this.idle.stop();
        }
      }
    })
  }

  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  /* modal msj de aviso de sesión cerrada */
  private openInactiveTime(): void {
    const destroy$: Subject<boolean> = new Subject<boolean>();
    const data: ModalData = {
      primaryInformation: `¡Tu sesión ha expirado!`,
      secondaryInformation: `Hemos cerrado tu sesión por inactividad`,
      image: '../assets/img/logoInicioPrimeraVez.png',
      border: true,
      title: '',
      color: ModalColor.green,
      letterColor: ModalColor.white
    };

    const dialogRef = this.dialog.open(ModalAlertsComponent, {
      disableClose: true,
      width: '380px',
      data,

    });

    dialogRef.componentInstance.primaryEvent.pipe(takeUntil(destroy$)).subscribe((_) => {
      dialogRef.close();
      this.logout();
    });
  }

  logout() {
    if (this.autService.logout()) {
      window.location.reload();
    }
  }
}
