import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { HomePageComponent } from './home-page.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { VuelosComponent } from './vuelos/vuelos.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'vuelos', component: VuelosComponent},
  { path: 'paquetes', component: PaquetesComponent },
  { path: 'comprar', component: ComprarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
