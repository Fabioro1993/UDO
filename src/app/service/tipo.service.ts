import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor( private httpClient:HttpClient) { }

  getTipo(){
    return this.httpClient.get("http://localhost/FastExpress/public/tipo");
  }
}
