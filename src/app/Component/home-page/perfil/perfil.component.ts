import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import * as bootstrap from 'bootstrap';
import { StringMappingType } from 'typescript';
import { PerfilService } from './perfil.service';

interface MenuItem {
  texto: string,
  ruta: string,
  newWindow?: boolean;
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
    },
    {
      texto: 'Mis Reservas Vuelos',
      ruta: './mis-reservas-vuelos'
    }//,
    // {
    //   texto: 'Mis Reservas Seguros',
    //   ruta: './mis-reservas-seguros'
    // }
  ];

  constructor(
    public accountService: AccountsService,
    private router: Router,
    private perfilService: PerfilService,
  ) {
    this.user = localStorage.getItem('usuario')
    this.userData = JSON.parse(this.user)
  }

  ngOnInit(): void {
    this.userStorage = this.accountService.getUserStorage();
    this.perfilService.generarToken(this.userStorage.email).subscribe({
      next: (data: any) => {
        if(data.Result.IsSuccess){
          this.menus.push({
            texto: 'Otras Reservas',
            ruta: `https://vacaciones.nmviajes.com/profile/dashboard.xhtml?selectedSection=BOOKINGS&token=${data.Result.Token}&submit=true`,
            newWindow: true
          })
        }

      }
    })
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
