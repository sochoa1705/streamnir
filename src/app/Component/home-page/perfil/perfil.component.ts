import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { StringMappingType } from 'typescript';

interface MenuItem {
  texto: string,
  ruta: string
}

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

  route: string = '';

  menus: MenuItem[] = [
    {
      texto: 'Mi Perfil',
      ruta: './mi-perfil'
    },
    {
      texto: 'Datos de contacto',
      ruta: './datos-de-contacto'
    },
    {
      texto: 'Preferencias',
      ruta: './preferencias'
    },
    {
      texto: 'Pasajeros',
      ruta: './pasajeros'
    }
  ];

  constructor(
    public accountService: AccountsService,
    private router: Router
  ) {
    this.user = localStorage.getItem('usuario')
    this.userData = JSON.parse(this.user)
  }

  ngOnInit(): void {
    this.userStorage = this.accountService.getUserStorage();
  }

  agregaTarjeta = false;
  showAgregaTarjeta(valElem: boolean) {
    this.agregaTarjeta = valElem;
  }

  agregaPasajero = false;
  showAgregaPasajero(valElem: boolean) {
    this.agregaPasajero = valElem;
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

  toggleModalEliminar() {
    const modal = document.getElementById("ModalEliminaCorreo");

    if (!modal) {
      return;
    }

    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }
}