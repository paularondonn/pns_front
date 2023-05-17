import { Component, OnInit } from '@angular/core';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';

@Component({
  selector: 'app-list-pay',
  templateUrl: './list-pay.component.html',
  styleUrls: ['./list-pay.component.scss']
})
export class ListPayComponent implements OnInit {
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

  /* Menu opciones */
  public OpenOp(num: number) {
    const con = document.getElementById('tbl_pay') as HTMLTableElement;
    this.listTable.forEach((element: any) => {
      const op2 = document.getElementById('option' + element.id) as HTMLDivElement;
      if (op2 != null) {
        if (element.id == num) {
          if (op2.style.display == 'block') {
            op2.style.display = 'none';
          } else {
            op2.style.display = 'block';
            let diferencia = con.getClientRects()[0].bottom - op2.getClientRects()[0].bottom;
            if (diferencia < 0) {
              op2.style.borderBottom = 'none';
            }
          }
        } else {
          op2.style.display = 'none';
        }
      }
    });
  };
}
