import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  ruta_env = environment.ruta_base;
  viewUsuario: any;
  usuarioFilter: any;

  constructor(private httpClient:HttpClient) {
    this.getUsuario();
   }

  getUsuario(){
    this.httpClient.get(this.ruta_env+"/usuario").subscribe(
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
    return this.httpClient.get(this.ruta_env+"/usuario");
  } 
}