import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor( private httpClient:HttpClient) { }

  getRestaurante(){
    return this.httpClient.get("http://localhost/FastExpress/public/restaurante");
  }
}
