import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoService } from '../service/tipo.service';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';
import { RestauranteService } from '../service/restaurante.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  formMenu = new FormGroup({
    nombre_menu: new FormControl('', [Validators.required]),
    descr_menu: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    imag_menu: new FormControl('', [Validators.required]),
    id_tipo: new FormControl('', [Validators.required]),
    id_restaurant: new FormControl(''),
  });

  restMenuVar: any;
  viewMenu: any;

  constructor(public tipoService:TipoService, private menuService:MenuService, private restauranteService:RestauranteService, private router:Router) { }

  ngOnInit() {
    this.restMenu();
  }

  onMenu(){
    this.formMenu.get('id_restaurant').setValue(this.restauranteService.newRest.id_restaurant);
    this.menuService.addMenuRest(this.formMenu.value).subscribe(
      resultado =>{
        this.restMenu();
        this.formMenu.reset();
      }
    );
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
  
  /*updateProfilePhoto(idUser: number, file: File): Observable<any>{
    const data = new FormData();
    data.append('file', file, file.name);
    data.append('user_id', idUser.toString());

    const apiUrl = `:API_URL/resources/avatar`;
    const request = this.http.post(apiUrl, data);
    return this.fetch(request);
  }

  handleFileInput(files: File[]){
    if (files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        const newPreview = (e.srcElement as any).result;
        this.formMenu.get('avatar').patchValue(newPreview);
        this.imagePreview = newPreview;
        this.avatarFile = files[0];
      }
    }
  }

  async saveProfile(){
    try{
      this.isLoading = true;
      const values =  this.formMenu.value as IUser;
      await this.handleNewPhtones();
      if (this.avatarFile) {
        await this.userService.updateProfilePhoto(values.id, this.avatarFile).toPromise();
      }else{
        if (this.photoHasBeenDelete()) {
          await this.userService.deleteProfile(values.id).toPromise();
        }
      }
      delete values.email;
      const user =  await this.userService.updateUser(values).toPromise();
      this.storage.userDataSource.next(user as IUser);
      this.toast.showSucces('PAGES.PROFILE.NOTIFICATIO_SAVE_PROFILE_TEXT').subscribe();
      this.authService.updateDataUser(user);
      this.location.back();
    }catch(e){
      this.toast.showError('ERROR.SOMETHING').subscribe();
    }finally{
      this.isLoading = false;
    }
  }*/
}