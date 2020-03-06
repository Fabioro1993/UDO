import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestauranteService } from '../service/restaurante.service'

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent implements OnInit {

  varRest: any = {
    nombre_rest: '', direccion_rest: '', telefono_rest: '', social: '',  logo_rest: '', email: ''
  }
  //formulario: FormGroup;

  constructor(private frmBuilder: FormBuilder, private restauranteService:RestauranteService) { 
    //formulario
   /* this.formulario = this.frmBuilder.group({
      nombre_rest: ['', Validators.required],
      direccion_rest: ['', Validators.required],
      telefono_rest: ['', Validators.required],
      social: ['', Validators.required],
      logo_rest: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]]
    })*/
  }
  
  ngOnInit() {
   
  }

  /*onSubmit(parametro){
    console.log(parametro)
  }*/
  saveRest(){
    console.log(this.varRest)
    this.restauranteService.addRestaurante(this.varRest).subscribe(resultado => {
      console.log('agregar', )
      //this.obtenerPersonas();
    },
    error => {
      console.log(JSON.stringify(error));
    })
    //console.log(parametro)
  }

}