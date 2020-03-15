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

  constructor(private restauranteService:RestauranteService /*private cd: ChangeDetectorRef, private router:Router */) {
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
        logo_rest: new FormControl('', [Validators.required, Validators.maxLength(191)])
      }
    )
   }
  
  ngOnInit() {}

  /*onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.FormRest.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }*/

  onRest(){
    this.restauranteService.addRestaurante(this.FormRest.value).subscribe(
      resultado => {
        this.restauranteService.newRest = resultado;
        //console.log(resultado)
        this.viewMenu = '1';
      }
    )
  }
}