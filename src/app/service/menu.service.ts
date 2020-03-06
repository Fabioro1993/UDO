import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuFilter: any;
  viewMenu: any;
  id_new: any;
  titulo: string = 'Todo';

  constructor( private httpClient:HttpClient) { }

  getMenu(){
    this.httpClient.get("http://localhost/FastExpress/public/menu").subscribe(
    //this.httpClient.get("http://localhost:8000/menu").subscribe(
      resultado => {
        this.viewMenu = resultado;
      }
    );
    //return this.httpClient.get("http://localhost:8000/menu");
    return this.httpClient.get("http://localhost/FastExpress/public/menu");
  }

  menuSelect(objSidebar){
    this.id_new = objSidebar.id;

    //this.httpClient.get("http://localhost:8000/menu").subscribe(
    this.httpClient.get("http://localhost/FastExpress/public/menu").subscribe(
      resultado => {
        this.menuFilter = resultado;
        this.viewMenu = this.menuFilter;
        
        if (objSidebar.tipo == 'producto') {
          this.viewMenu = this.menuFilter.filter(item => {
            if (item.id_tipo == this.id_new ) {
              return item;
            }
          });
          this.titulo = this.viewMenu[0].tipo_comida.nombre_tipo;
        }
        if (objSidebar.tipo == 'restaurante') {
          this.viewMenu = this.menuFilter.filter(item => {
            if (item.id_restaurant == this.id_new) {
              return item;
            }
          });
          this.titulo = this.viewMenu[0].restaurante.nombre_rest;
        }
      }
    );
    return this.viewMenu;
  }

  navbarBuscar(texto){
    //this.httpClient.get("http://localhost:8000/menu").subscribe(
    this.httpClient.get("http://localhost/FastExpress/public/menu").subscribe(
      resultado => {
        this.menuFilter = resultado;
        this.viewMenu = this.menuFilter;
        
        this.viewMenu = this.menuFilter.filter(item => {
          if (item.nombre_menu.indexOf(texto) != -1) {
            return item;
          }
        });
      }
    );
    return this.viewMenu;
  }
}