import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { TipoService } from '../../service/tipo.service'
import { RestauranteService } from '../../service/restaurante.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
   // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  tipoComida: any;
  selectTipo: any = "P";
  
  objetoNavbar: any = {
    id: '', tipo: ''
  }

  @Output() sidebarSelect = new EventEmitter();

  constructor( private tipoService:TipoService, private restauranteService:RestauranteService) { 
    this.getTipo();
  }

  sidebarTipo(tipo, restaurante ){
    //console.log(tipo, restaurante)
    if (tipo != null) {
      this.objetoNavbar.id = tipo;
      this.objetoNavbar.tipo = 'producto';
      this.sidebarSelect.emit(this.objetoNavbar);
    }
    if (restaurante != null) {
      this.objetoNavbar.id = restaurante;
      this.objetoNavbar.tipo = 'restaurante';
      this.sidebarSelect.emit(this.objetoNavbar);
    }
  }
  
  selectNavbar(){
    if (this.selectTipo == "P") {
      this.getTipo();
    }else{
      this.getRestaurant();
    }
  }

  getTipo(){
    this.tipoService.getTipo().subscribe(
      resultado => {
        this.tipoComida = resultado;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

  getRestaurant(){
    this.restauranteService.getRestaurante().subscribe(
      resultado => {
        this.tipoComida = resultado;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
