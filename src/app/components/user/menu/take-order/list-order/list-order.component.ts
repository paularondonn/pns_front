import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { OrdersService } from 'src/app/core/services/orders/orders.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listTable: any = [];

  constructor(private router: Router, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.listOrder();
  }

  private listOrder() {
    this.orderService.listOrder().subscribe((resp) => {
      if (resp.data != null) {
        this.listTable = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listTable = [];
      }
    });
  }

  public addEdit(id: number = 0) {
    if (id > 0) {
      this.router.navigate(['/menu/ordenes', 'edit', id], { skipLocationChange: true });
    } else {
      this.router.navigate(['/menu/ordenes', 'add'], { skipLocationChange: true });
    }
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#order_table').position().top - $('#tbl_order').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }
}
