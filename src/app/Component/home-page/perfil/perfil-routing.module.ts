import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { MyProfyleComponent } from './my-profyle/my-profyle.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PerfilComponent } from './perfil.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';

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
        path: 'mis-reservas',
        component: MisReservasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
