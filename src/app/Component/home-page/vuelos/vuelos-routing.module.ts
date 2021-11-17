import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VuelosComponent } from './vuelos.component';
import { FlightComponent } from './commons/components/flight/flight.component';
import { DestinosComponent } from './commons/components/destinos/destinos.component';

const routes: Routes = [
  {
    path: '', component: VuelosComponent,
    children: [
      { path: '', component: FlightComponent },
      { path: 'lista', component: FlightComponent },
      { path: 'destinos', component: DestinosComponent }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VuelosRoutingModule { }
