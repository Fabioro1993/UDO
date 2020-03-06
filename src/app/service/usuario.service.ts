import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  viewUsuario: any;
  usuarioFilter: any;

  constructor(private httpClient:HttpClient) {
    this.getUsuario();
   }

  getUsuario(){
    this.httpClient.get("http://localhost/FastExpress/public/usuario").subscribe(
    //this.httpClient.get("http://localhost:8000/usuario").subscribe(
      resultado => {
        this.usuarioFilter = resultado;
        this.viewUsuario = this.usuarioFilter;

        this.viewUsuario = this.usuarioFilter.filter(item => {
          if (item.id_users == 1) {
            return item;
          }
        });

      }
    );
    //console.log(this.viewUsuario, 'a', this.usuarioFilter)
    //return this.httpClient.get("http://localhost:8000/usuario");
    return this.httpClient.get("http://localhost/FastExpress/public/usuario");
    
  }
  
}
