import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service'
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';

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
  menu: any[] = [];
  menuFun: any;
  valid: any;
  sumaTotal: number = 0;
  //viewMenu: any[] = [];

  textoDeInput: any[] = [];


  constructor(private usuarioService:UsuarioService, public menuService: MenuService, private router: Router) { 

  }

  ngOnInit() {
    this.getUser();
    this.getMenu();
    //const sum = pista.pistas.reduce((actual, anterior) => return actual + anterior);
  }

  getMenu() {
    
    if (this.menuService.pedidoMenu==undefined) {
      this.router.navigate(['/']);
    }
    
    this.menuService.getMenu().subscribe(
      resultado => {
        
        this.menuFun = resultado;

        this.menuService.pedidoMenu.forEach( a =>
          this.menuFun.forEach(item => {
            if (item.id_menu == a) {
              this.menu.push(item)
            }
          })
        )
        
        this.menu.map(x =>
          this.sumaTotal += x.precio
        )
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

  cantPrecio(e){
    
    console.log('aa', this.textoDeInput[e], e, this.textoDeInput);
  }

}
