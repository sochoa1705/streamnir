import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './commons/components/flight/flight.component';
import { DestinosComponent } from './commons/components/destinos/destinos.component';
import { OffersContinentComponent } from './commons/components/offers-continent/offers-continent.component';
import { VuelosComponent } from './vuelos.component';

const routes: Routes = [
  {
    path: '',
    component: VuelosComponent,
    children: [
      { path: '', component: FlightComponent },
      { path: 'lista', component: FlightComponent },
      { path: 'destino/LIM/:codigoCiudad', component: DestinosComponent },
      { path: ':slug', component: OffersContinentComponent },
      //{ path: '**', component: FlightComponent }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VuelosRoutingModule { }
