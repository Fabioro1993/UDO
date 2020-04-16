import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  ruta_env = environment.ruta_base;
  viewMenu: any[] = [];
  checkArray: any[] = [];
  usuario: any;
  menu: any;
  isHidden=true;

  
  constructor(private menuService: MenuService, private router: Router) { 
    this.usuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user : null;
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenu().subscribe(
      resultado => {
        this.menu = resultado;
        this.viewMenu = this.menu;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

  check(e){
    const valid = this.checkArray.filter(item => item == e); //Retorna lo que es igual a e
    if(valid.length) {
      this.checkArray = this.checkArray.filter(item => item != e);
    } else {
      this.checkArray.push(e);
    }

    if(this.checkArray.length) {
      this.isHidden=false;
    }else{
      this.isHidden=true;
    }
  }

  pedido() {
    this.menuService.pedidoFuntion(this.checkArray);
    this.router.navigate(['/pedido']);
  }
}