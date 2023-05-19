import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsPaginador } from 'src/app/core/globals/paginador/ItemsPaginador';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  /* Paginador */
  paginador: number = 1;
  objItems: ItemsPaginador = new ItemsPaginador();

  /* Filtro */
  filter: string = '';

  /* Listas */
  listUser: any = [];

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.listUsers();
  }

  private listUsers() {
    this.userService.listUsers().subscribe((resp) => {
      if (resp.data != null) {
        this.listUser = resp.data;
        setTimeout(() => this.positionPagination(), 100);
      } else {
        this.listUser = [];
      }
    });
  }

  public addEdit(id: number = 0) {
    if (id > 0) {
      this.router.navigate(['/menu/usuarios', 'edit', id], { skipLocationChange: true });
    } else {
      this.router.navigate(['/menu/usuarios', 'add'], { skipLocationChange: true });
    }
  }

  /* HostListener */
  @HostListener('window:resize', ['$event'])
  Resolucion(event: any) {
    setTimeout(() => this.positionPagination(), 500);
  }

  /* Función tamaño tabla */
  private positionPagination() {
    let tm = $('#user_table').position().top - $('#tbl_user').position().top;
    let tr = $('tbody>tr').height();
    this.objItems.ShowItemsP(tm, tr);
  }
}

