import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { CitiesService } from 'src/app/core/services/cities/cities.service';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listCity: any = [];

  constructor(private cityService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.listCities();
  }

  /* Función para listar ciudades */
  private listCities() {
    this.cityService.listCities().subscribe((resp) => {
      if (resp.data != null) {
        this.listCity = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listCity = [];
      }
    });
  }

  /* Función para ir a la vista de agregar/editar */
  public addEdit(id: number = 0) {
    if (id > 0) {
      this.router.navigate(['/menu/ciudades', 'edit', id], { skipLocationChange: true });
    } else {
      this.router.navigate(['/menu/ciudades', 'add'], { skipLocationChange: true });
    }
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#city_table').position().top - $('#tbl_city').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }
}
