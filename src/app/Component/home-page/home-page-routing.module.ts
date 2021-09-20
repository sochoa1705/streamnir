import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { ConformidadComponent } from './conformidad/conformidad.component';
import { HomePageComponent } from './home-page.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { SegurosComponent } from './seguros/seguros.component';
import { VuelosComponent } from './vuelos/vuelos.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'vuelos', component: VuelosComponent},
  { path: 'paquetes', component: PaquetesComponent },
  { path: 'comprar', component: ComprarComponent },
  { path: 'vuelos/resultados', component: ResultadosComponent },
  { path: 'conformidad', component: ConformidadComponent },
  { path: 'seguros', component: SegurosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
