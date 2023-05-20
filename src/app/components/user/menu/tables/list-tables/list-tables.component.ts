import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { TablesService } from 'src/app/core/services/tables/tables.service';

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.scss']
})
export class ListTablesComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listTable: any = [];

  constructor(private router: Router, private tableService: TablesService) { }

  ngOnInit(): void {
    this.listTables();
  }

  /* Listado de mesas */
  private listTables() {
    this.tableService.listTables().subscribe((resp) => {
      if (resp.data != null) {
        this.listTable = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listTable = [];
      }
    });
  }

  /* Funcion para enrutar */
  public addEdit(id: number = 0) {
    if (id > 0) {
      this.router.navigate(['/menu/mesas', 'edit', id], { skipLocationChange: true });
    } else {
      this.router.navigate(['/menu/mesas', 'add'], { skipLocationChange: true });
    }
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#mesa_table').position().top - $('#tbl_mesa').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }
}
