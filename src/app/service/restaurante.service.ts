import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  newRest: any;
  ruta_env = environment.ruta_base;
  constructor( private httpClient:HttpClient) { }

  getRestaurante(){
    return this.httpClient.get(this.ruta_env+"/restaurante");
  }
  
  addRestaurante(restaurante: any){
    let json = JSON.stringify(restaurante);
    let headrs = new HttpHeaders().set('Content-type', 'application/json'); 
    return this.httpClient.post(this.ruta_env+"/restaurante/store", restaurante);
  }
}
