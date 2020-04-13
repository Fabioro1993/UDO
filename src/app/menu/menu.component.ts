import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoService } from '../service/tipo.service';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';
import { RestauranteService } from '../service/restaurante.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  ruta_env = environment.ruta_base;
  closeResult: string;
  restMenuVar: any;
  viewMenu: any;
  modalMenuVar: any;
  viewMenuModal: any;
  //var: any;
  file: any;
  //imagUpdate: any;
  formMenu: FormGroup;
  formUpdate: FormGroup;


 // @ViewChild('fileUploader') fileUploader:ElementRef;

  constructor(public tipoService:TipoService, private menuService:MenuService, private restauranteService:RestauranteService, private router:Router, private modalService: NgbModal) { 

    this.formMenu = new FormGroup(
      {
        nombre_menu: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        descr_menu: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        precio: new FormControl('', [Validators.required, Validators.pattern('/^[1-9]\d{6,10}$/')]),
        id_tipo: new FormControl('', [Validators.required]),
        id_restaurant: new FormControl(''),
      }
    );

    this.formUpdate = new FormGroup({
      nombre_menu: new FormControl('', [Validators.required]),
      descr_menu: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      imag_menu: new FormControl('', [Validators.required]),
      id_tipo: new FormControl('', [Validators.required]),
      id_nivel: new FormControl('', [Validators.required]),
      id_restaurant: new FormControl(''),
    });
  }

  open(content, idModal) {
    this.modalMenuFun(idModal);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.onMenuUpdate();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.restMenu();
  }
  
  onMenu(){
    const data = new FormData();

    data.append('imag_menu', this.file, this.file.name);
    data.append('nombre_menu', this.formMenu.value.nombre_menu);
    data.append('descr_menu', this.formMenu.value.descr_menu);
    data.append('precio', this.formMenu.value.precio);
    data.append('id_tipo', this.formMenu.value.id_tipo);
    data.append('id_restaurant', this.restauranteService.newRest.id_restaurant);

    console.log(data);
    this.menuService.addMenuRest(data).subscribe(
      resultado => {
        this.restMenu();
        this.formMenu.reset();
        let btnCancel: any = document.querySelector('.btn.btn-danger.btn-round');
        btnCancel.click();
      }
    )
  }

  restMenu(){
    this.menuService.getMenu().subscribe(
      resultado =>
      {
        this.restMenuVar = resultado;
        this.viewMenu = this.restMenuVar;
        this.viewMenu = this.restMenuVar.filter(item => {
          if (item.id_restaurant == this.restauranteService.newRest.id_restaurant ) {
            return item;
          }
        });
      }
    )
  }

  modalMenuFun(idModalFun){
    this.menuService.getMenu().subscribe(
      resultado =>
      {
        this.modalMenuVar = resultado;
        this.viewMenuModal = this.modalMenuVar.filter(item => {
         if (item.id_menu == idModalFun ) {
            return item;
          }
        })[0];

        if (this.viewMenuModal.id_nivel == 4) {
          this.viewMenuModal.id_nivel = true;
        } else {
          this.viewMenuModal.id_nivel = false;
        };
        
        this.formUpdate.setValue({
          
          nombre_menu: this.viewMenuModal.nombre_menu,
          descr_menu: this.viewMenuModal.descr_menu,
          precio: this.viewMenuModal.precio,
          imag_menu: this.viewMenuModal.imag_menu,
          id_tipo: this.viewMenuModal.id_tipo,
          id_nivel: this.viewMenuModal.id_nivel,
          id_restaurant: this.viewMenuModal.id_restaurant,
        })
      }
      )
  }

  onMenuUpdate(){

    const data = new FormData();

    data.append('imag_menu', this.file, this.file.name);
    data.append('nombre_menu', this.formUpdate.value.nombre_menu);
    data.append('descr_menu', this.formUpdate.value.descr_menu);
    data.append('precio', this.formUpdate.value.precio);
    data.append('id_tipo', this.formUpdate.value.id_tipo);
    data.append('id_nivel', this.formUpdate.value.id_nivel);
    data.append('id_restaurant', this.viewMenuModal.id_restaurant);

    const idmenu = this.viewMenuModal.id_menu;
    
    this.menuService.updateMenuRest(data, idmenu).subscribe(
      resultado => {
        this.restMenu();

      }
    )
  }
  
  eliminarPlato(id_menu: number){
    Swal.fire({
      title: 'Desea eliminar?',
      text: 'El platillo sera eliminado del menu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, a salvo'
    }).then((result) => {
      if (result.value) {
        this.menuService.deleteMenuRest(id_menu).subscribe(resultado => {
          this.restMenu();
          Swal.fire(
            'Eliminado!',
            'El platillo a sido eliminado.',
            'success'
          )
        },
        error =>{
          Swal.fire(
            'Cancelado',
            'Tu platillo esta a salvo! :)',
            'error'
          )
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu platillo esta a salvo! :)',
          'error'
        )
      }
    })
  }

  fileMenu(event) {
    this.file = event.target.files[0];
  }
}