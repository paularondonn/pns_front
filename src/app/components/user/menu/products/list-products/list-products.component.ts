import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listProduct: any = [];

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.listSuppliers();
  }

  private listSuppliers() {
    this.productService.listProducts().subscribe((resp) => {
      if (resp.data != null) {
        this.listProduct = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listProduct = [];
      }
    });
  }

  public addEdit(id: number = 0) {
    if (id > 0) {
      this.router.navigate(['/menu/productos', 'edit', id], { skipLocationChange: true });
    } else {
      this.router.navigate(['/menu/productos', 'add'], { skipLocationChange: true });
    }
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#product_table').position().top - $('#tbl_product').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }
}
