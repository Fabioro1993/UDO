import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  menu: any;
  viewMenu: any[] = [];

  constructor(private menuService: MenuService) { }

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

}
