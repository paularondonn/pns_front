import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/config-services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterContentInit {
  /* Variable la cual nos permite poner en menú en solo iconos */
  Expandable = false;

  /* Variable observa el tamaño de pantalla, para hacer las respectivas validaciones en el html y ocultar el sidenav
  cuando esta nos devuelva un true y cambiar el modo en el cual se desplaza */
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  /* Variables time out */
  userActivity: any;
  userInactive: Subject<any> = new Subject();

  /* Variables */
  name = sessionStorage.getItem('name');
  sede = 'Sede 1';
  filter = '';
  anglesMenu = false;
  anglesUp = false;
  anglesDown = true;

  /* Menu */
  menus: any;
  menu: any;
  subMenu: any;
  url: any;

  /* Calendario */
  calendarDate = false;
  calendarDate1 = false;

  /* Iconos */
  iconTooltip: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, public router: Router, private autService: AuthService) {
    this.menuModule();
    this.autService.system.emit(true);
    this.url = this.router.url.split('menu/');
    this.url = this.url[1];
  }

  ngAfterContentInit(): void {
    setTimeout(() => { this.layout(); }, 100);
    setTimeout(() => { this.menuLayout(); }, 300);
  }

  ngOnInit(): void {
    console.log()
  }

  public filtroMenu() {
  }

  routerMenu() {
    this.router.navigate(['/menu']);
  }

  async menuModule() {
    console.log('entra')
    if (sessionStorage.getItem('modules') == null) {
      await this.autService.menu().subscribe(resp => {
        sessionStorage.setItem("modules", JSON.stringify(resp.data.menu));
        this.menus = resp.data.menu;
        if (this.menus.length > 7) {
          this.anglesMenu = true;
        } else {
          this.anglesMenu = false;
        }
        this.menu = resp.data.menu;
      });
    } else {
      const modulo = JSON.parse(sessionStorage.getItem('modules') || '');
      this.menus = modulo;
      if (this.menus.length > 7) {
        this.anglesMenu = true;
      } else {
        this.anglesMenu = false;
      }
      this.menu = modulo;
    }
  }

  recargar(id: string) {
    const ruta = document.getElementById(id) as HTMLLinkElement;
    if (ruta.style.color == 'white') {
      window.location.reload();
    }
  }

  public active(id: number) {
    /* const ids = [id];
    sessionStorage.setItem('itemActive', JSON.stringify(ids));
    const sbb = id != '' ? document.getElementById('sbbb' + id + idP + idPp + idA) as HTMLLinkElement : idPp == '' ?
      document.getElementById('sb' + id + idP) as HTMLLinkElement : document.getElementById('sbb' + id + idP + idPp) as HTMLLinkElement;

    this.menus.forEach((element: any) => {
      if (idPp == '' && idA == '') {
        if (element.idMenu == id) {
          sbb.style.color = 'white';
          sbb.style.textDecorationLine = 'underline';
          $('#cm' + id).addClass('activeModule');
          setTimeout(() => { this.Expandable = false; }, 200);
        } else {
          const Nsb = document.getElementById('m' + element.idMenu) as HTMLLinkElement;
          Nsbb.style.maxHeight = '0';
          Nsbb.style.minHeight = '0';
          Nsbb.style.opacity = '0';
          Nsb.style.color = 'rgba(255,255,255,.7)';
          Nsb.style.color = 'rgba(255,255,255,.7)';
          Nsb.style.textDecorationLine = 'none';
        }
      }
    }); */
  }

  /* Metodo para mostrar tooltip */
  mostrar(id: any) {
    $('#tc' + id).css('width', '100px');
    $('#tc' + id).css('opacity', '1');
    $('#cm' + id).addClass('activeTooltip');
    const diferencia = ($('#compressedMenu').width()! - $('#cm' + id).width()!);
    $('#tc' + id).css('left', `calc(${$('#compressedMenu').width()}px - ${diferencia}px)`);
    $('#tc' + id).offset({ top: $('#cm' + id).position().top });
    $('#tc' + id).css('height', $('#cm' + id).height() + 'px');
    this.iconTooltip = true;
  }

  /* Metodo para cerrar tooltip */
  cerrar(id: any) {
    $('#tc' + id).css('width', '0');
    $('#tc' + id).css('opacity', '0');
    $('#cm' + id).removeClass('activeTooltip');
    this.iconTooltip = false;
  }

  public logout() {
    if (this.autService.logout()) {
      window.location.reload();
    }
   }

  /* Metodo para calcular el tamaño de la carta */
  layout() {
    let fondo = $('#cont_router');
    let separador = $('#cont_separador');
    let carta = $('#cont_card');
    let info = $('#cont_info');
    let footer = $('#footer');
    let height = footer.position().top - fondo.position().top;
    fondo.css('height', height + 'px');
    separador.css('height', `calc(${height}px - calc(${separador.css('padding')} + ${separador.css('padding')}))`);
    carta.css('height', `calc(${separador.height()}px - calc(${carta.css('padding')} + ${carta.css('padding')}))`);
    info.css('height', `${carta.height()}px`);
    console.log(carta.height())
  }

  public calculateMenu() {
    setTimeout(() => { this.menuLayout(); }, 100);
  }

  public menuLayout() {
    let sidenav = $('#sidenav');
    /* Menu comprimido */
    let compressedMenu = $('#compressedMenu');
    let buttonMenuIcon = $('#buttonMenuIcon');
    let iconoLogo = $('#iconoLogo');
    let compressedMenuButtons = $('#compressedMenuButtons');
    let iconoLogoFooter = $('#iconoLogoFooter');
    let compressedItemsMenu = $('#compressedItemsMenu');

    /* Menu descomprimido */
    let iconoBar = $('#iconoBar');
    let contentPerfil = $('#contentPerfil');
    let buscador = $('#buscador');
    let unzippedMenu = $('#unzippedMenu');
    let nav_menu = $('#nav_menu');
    let iconoFooter = $('#iconoFooter');

    if (this.Expandable) {
      unzippedMenu.css('height', `calc(${sidenav.height()}px - calc(${iconoBar.height()}px + ${iconoBar.css('padding-top')} + ${contentPerfil.height()}px + ${contentPerfil.css('padding-top')} +
      ${buscador.height()}px + ${unzippedMenu.css('padding-top')} + ${unzippedMenu.css('padding-bottom')} + ${iconoFooter.height()}px + ${iconoFooter.css('padding-bottom')}))`);
      nav_menu.css('height', `calc(${unzippedMenu.height()}px - calc(${nav_menu.css('margin-top')} + ${nav_menu.css('margin-bottom')}))`);
    } else {
      compressedMenuButtons.css('height', `calc(${sidenav.height()}px - calc(${buttonMenuIcon.height()}px + ${iconoLogo.css('padding-top')}
      + ${iconoLogo.height()}px + ${iconoLogoFooter.css('padding-bottom')} + ${iconoLogoFooter.height()}px + ${compressedMenuButtons.css('padding-top')}
      + ${compressedMenuButtons.css('padding-bottom')}))`);
      compressedMenu.css('height', `calc(${compressedMenuButtons.height()}px - ${compressedMenu.css('padding-top')})`);
      compressedItemsMenu.css('height', `calc(${compressedMenu.height()}px - calc(${compressedItemsMenu.css('padding-top')} + ${compressedItemsMenu.css('padding-bottom')} + ${compressedMenu.css('padding-top')}))`);
    }
  }

  @HostListener('window:resize', ['$event'])
  Resolucion() {
    setTimeout(() => { this.layout(); this.menuLayout(); }, 500);
  }
}
