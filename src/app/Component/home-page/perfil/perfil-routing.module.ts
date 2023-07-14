import { MisReservasVuelosComponent } from './mis-reservas-vuelos/mis-reservas-vuelos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { MyProfyleComponent } from './my-profyle/my-profyle.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PerfilComponent } from './perfil.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { MisReservasSegurosComponent } from './mis-reservas-seguros/mis-reservas-seguros.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      {
        path: 'mi-perfil',
        component: MyProfyleComponent
      },
      {
        path: 'datos-de-contacto',
        component: ContactoComponent
      },
      {
        path: 'preferencias',
        component: PreferenciasComponent
      },
      {
        path: 'pasajeros',
        component: PassengerComponent
      },
      {
        path: 'mis-reservas-vuelos',
        component: MisReservasVuelosComponent
      },
      {
        path: 'mis-reservas-seguros',
        component: MisReservasSegurosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
