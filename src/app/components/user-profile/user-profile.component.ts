import { Component, OnInit, Input, OnChanges , SimpleChanges } from '@angular/core';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnChanges {
  menu: any;
  viewMenu: any[] = [];
  id_new: number = null;
  nuevoValor: any;

  @Input() valorSidebar: any;

  constructor( private menuService:MenuService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.valorSidebar)  {
      
      //this.nuevoValor = this.valorSidebar;
      this.filter(this.valorSidebar);
      console.log(this.valorSidebar); 
    }  
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    this.menuService.getMenu().subscribe(
      resultado => {
         this.menu = resultado;
       // this.menu = resultado;
        this.viewMenu = this.menu ;
       //console.log(resultado, this.viewMenu);
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
  }

  filter(busqueda) {
    console.log(busqueda)
    this.id_new = busqueda.id;
    if (busqueda.tipo == 'producto') {
      this.viewMenu = this.menu.filter(item => {
        if(item.id_tipo == this.id_new) {
          return item;
        }
      });
    }

    if (busqueda.tipo == 'restaurante') {
      this.viewMenu = this.menu.filter(item => {
        if(item.id_restaurant == this.id_new) {
          return item;
        }
      });
    }
  }
}