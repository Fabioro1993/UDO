import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor( private httpClient:HttpClient) { }

  getRestaurante(){
    //return this.httpClient.get("http://localhost:8000/restaurante");
    return this.httpClient.get("http://localhost/FastExpress/public/restaurante");
  }
  
  addRestaurante(restaurante: any){
    console.log(restaurante)
    let json = JSON.stringify(restaurante);

    let headrs = new HttpHeaders().set('Content-type', 'application/json'); 

    return this.httpClient.post("http://localhost/FastExpress/public/restaurante/store", json, { headers: headrs});

  }
}
