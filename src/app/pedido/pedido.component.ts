import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service'
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  usuario: any = {
    nombre: '', cedula: '', telefono: '', direccion: ''
  }
  usuarioFilter: any;
  menu: any;
  sumaTotal: number = 0;
  //viewMenu: any[] = [];

  constructor(private usuarioService:UsuarioService, private menuService: MenuService) { }

  ngOnInit() {
    this.getUser();
    this.getMenu();
    //const sum = pista.pistas.reduce((actual, anterior) => return actual + anterior);
  }

  getMenu() {
    this.menuService.getMenu().subscribe(
      resultado => {
        this.menu = resultado;

        this.menu.map(x =>
          this.sumaTotal += x.precio
       )
        //console.log(this.sumaTotal)
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

  getUser(){
    this.usuarioService.getUsuario().subscribe(
      resultado => {
        
        this.usuarioFilter = resultado;
        this.usuario.nombre = this.usuarioFilter[0].nombre;
        this.usuario.cedula = this.usuarioFilter[0].cedula;
        this.usuario.telefono = this.usuarioFilter[0].telefono;
        this.usuario.direccion = this.usuarioFilter[0].direccion;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

}
