import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  viewTipo: any;
  ruta_env = environment.ruta_base;

  constructor( private httpClient:HttpClient) { }

  getTipo(){
    this.httpClient.get(this.ruta_env + "/tipo").subscribe(
      resultado => {
        this.viewTipo = resultado;
      }
    );

    return this.httpClient.get(this.ruta_env+"/tipo");
  }
}
