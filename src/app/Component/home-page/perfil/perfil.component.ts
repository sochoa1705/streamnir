import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']

})
export class PerfilComponent implements OnInit {

  user: any
  userData: any
  distritos: any
  departamentos: any
  paises: any

  userStorage: UserStorage;

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public accountService: AccountsService,
    private router: Router,
  ) {
    this.user = localStorage.getItem('usuario')
    this.userData = JSON.parse(this.user)
  }

  id: any = "mnuPerfil";
  showOption(ids: any) {
    this.id = ids;
    //console.log(this.id);
  }

  agregaTarjeta = false;
  showAgregaTarjeta(valElem: boolean) {
    this.agregaTarjeta = valElem;
    //console.log(this.agregaTarjeta);
  }

  agregaPasajero = false;
  showAgregaPasajero(valElem: boolean) {
    this.agregaPasajero = valElem;
    //console.log(this.agregaPasajero);
  }

  ngOnInit(): void {
    this.userStorage = this.accountService.getUserStorage();
  }


  toggleModalEliminar() {
    const modal = document.getElementById("ModalEliminaCorreo");

    if (!modal) { 
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }


  eliminarCuenta() {
    this.accountService.deleteAccount(this.userStorage.id).subscribe(data => {
      if (data.IsSuccess) {
        this.toggleModalEliminar();
        this.accountService.signOut();
        this.router.navigateByUrl("/")
      }
    })
  }



}
