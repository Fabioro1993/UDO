import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ruta_env = environment.ruta_base;

  constructor(private http:HttpClient) { }

  servLogin(param){
    return this.http.post(this.ruta_env + '/api/auth/login', param)
    .pipe(
      map(
        (resultado:any) => {
         if (resultado.access_token) {
           localStorage.setItem('user' , JSON.stringify(resultado));
           return 'success';
         }
        }
      )
    )
  }

  servLogout(){    
    return this.http.get(this.ruta_env + '/api/auth/logout')
    .pipe(
      map(res => {
        localStorage.removeItem('user');
        return res;
      })
    )
  }
}
