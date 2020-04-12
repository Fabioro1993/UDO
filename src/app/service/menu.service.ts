import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  ruta_env = environment.ruta_base;
  menuFilter: any;
  viewMenu: any;
  id_new: any;
  titulo: string = 'Todo';

  constructor( private httpClient:HttpClient) { }

  getMenu(){
    this.httpClient.get(this.ruta_env+"/menu").subscribe(
      resultado => {
        this.viewMenu = resultado;
      }
    );
    return this.httpClient.get(this.ruta_env+"/menu");
  }

  menuSelect(objSidebar){
    this.id_new = objSidebar.id;
    
    this.httpClient.get(this.ruta_env+"/menu").subscribe(
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
    this.httpClient.get(this.ruta_env+"/menu").subscribe(
      resultado => {
        this.menuFilter = resultado;
        this.viewMenu = this.menuFilter;
        
        this.viewMenu = this.menuFilter.filter(item => {
          if (item.nombre_menu.trim().toLowerCase().indexOf(texto.trim().toLowerCase()) != -1) {
            return item;
          }
        });
      }
    );
    return this.viewMenu;
  }

  addMenuRest(menu: any){
    return this.httpClient.post(this.ruta_env + "/menu/store", menu);
  }

  updateMenuRest(updatemenu: any, id:number){
    let param = new HttpParams()
    .set('updatemenu',updatemenu);
    //console.log(updatemenu)
    //return this.httpClient.get(this.ruta_env + "/menu/"+id+"/update", {params:param});
    return this.httpClient.post(this.ruta_env + "/menu/"+id+"/update", updatemenu);
  }

  deleteMenuRest(id){
    //let header = new HttpHeaders().set('Content-type', 'application/json')
    return this.httpClient.get(this.ruta_env + "/menu/"+id+"/delete");
  }
}