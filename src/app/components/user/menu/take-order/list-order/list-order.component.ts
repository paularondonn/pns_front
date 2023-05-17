import { Component, OnInit } from '@angular/core';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';

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

  constructor() { }

  ngOnInit(): void {
    console.log();
  }

  public addEdit(id?: number) { }

}
