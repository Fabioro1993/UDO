import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  FormLogin: FormGroup;

  constructor( private loginService:LoginService, private router:Router ) {
    this.FormLogin = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(191)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20)])
      }
    )
   }

  ngOnInit() {}

  onLogin(){
    this.loginService.servLogin(this.FormLogin.value).subscribe(
      resultado => {
        if (resultado == 'success') {
          this.router.navigate(['/']);
        } else {
          alert('error');
        }
      }
    )
  }
}
