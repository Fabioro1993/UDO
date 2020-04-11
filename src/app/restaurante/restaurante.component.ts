import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestauranteService } from '../service/restaurante.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})

export class RestauranteComponent implements OnInit {

  viewMenu: any;
  FormRest: FormGroup;
  file: any;

  constructor(private restauranteService:RestauranteService, private cd: ChangeDetectorRef, private router:Router) {
    this.FormRest = new FormGroup(
      {
        nombre_rest: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        telefono_rest: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
        social: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        direccion_rest: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        nombre: new FormControl('', [Validators.required, Validators.maxLength(191)]),
        cedula: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        telefono: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(191)]),
        direccion: new FormControl('', [Validators.required, Validators.maxLength(191)]),
      }
    )
   }
  
  ngOnInit() {}

  fileRest(event) {
    this.file = event.target.files[0];
  }

  onRest(){
    const data = new FormData();
    data.append('logo_rest', this.file, this.file.name);
    data.append('nombre_rest', this.FormRest.value.nombre_rest);
    data.append('telefono_rest', this.FormRest.value.telefono_rest);
    data.append('social', this.FormRest.value.social);
    data.append('direccion_rest', this.FormRest.value.direccion_rest);
    data.append('nombre', this.FormRest.value.nombre);
    data.append('cedula', this.FormRest.value.cedula);
    data.append('telefono', this.FormRest.value.telefono);
    data.append('email', this.FormRest.value.email);
    data.append('direccion', this.FormRest.value.direccion);

    this.restauranteService.addRestaurante(data).subscribe(
      resultado => {
        this.restauranteService.newRest = resultado;
        this.viewMenu = '1';
      }
    )
  }
}