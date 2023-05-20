import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/config-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private userService: AuthService) { }

  /* Función que decide si el usuario actual tiene permiso para cargar las rutas secundarias solicitadas. */
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.isAuthenticate()) {
      return true;
    } else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }

  /* Función que verifica si el usuario actual tiene permiso para activar la ruta secundaria solicitada. */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.isAuthenticate()) {
      return true;
    } else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }

  /* Función que verifica si el usuario actual tiene permiso para activar la ruta solicitada. */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticate()) {
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }

}
