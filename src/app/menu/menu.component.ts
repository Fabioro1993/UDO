import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoService } from '../service/tipo.service';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';
import { RestauranteService } from '../service/restaurante.service';
import Swal from 'sweetalert2'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  closeResult: string;

  formUpdate = new FormGroup({
    nombre_menu: new FormControl('', [Validators.required]),
    descr_menu: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    imag_menu: new FormControl('', [Validators.required]),
    id_tipo: new FormControl('', [Validators.required]),
  });

  restMenuVar: any;
  viewMenu: any;
  modalMenuVar: any;
  viewMenuModal: any;
  var: any;
  file: any;
  formMenu: FormGroup;


  @ViewChild('fileUploader') fileUploader:ElementRef;

  constructor(public tipoService:TipoService, private menuService:MenuService, private restauranteService:RestauranteService, private router:Router, private modalService: NgbModal) { 

    this.formMenu = new FormGroup(
      {
        nombre_menu: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        descr_menu: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        precio: new FormControl('', [Validators.required]),
        id_tipo: new FormControl('', [Validators.required]),
        id_restaurant: new FormControl(''),
      }
    )
  }

  open(content, idModal) {
    this.modalMenuFun(idModal);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
     
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

    this.menuService.addMenuRest(data).subscribe(
      resultado => {
        this.restMenu();
        this.formMenu.reset();
        this.resetFileUploader();
      }
    )
  }

  resetFileUploader() { 
    this.fileUploader.nativeElement.value = null;
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
        this.formUpdate.setValue({
          
          nombre_menu: this.viewMenuModal.nombre_menu,
          descr_menu: this.viewMenuModal.descr_menu,
          precio: this.viewMenuModal.precio,
          imag_menu: this.viewMenuModal.imag_menu,
          id_tipo: this.viewMenuModal.id_tipo,

        })
      }
      )
  }

  eliminarPlato(id_menu: number){
    console.log(id_menu)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.menuService.deleteMenuRest(id_menu).subscribe(resultado => {
          this.restMenu();
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
        },
        error =>{
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        });
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  fileMenu(event) {
    this.file = event.target.files[0];
  }

}
