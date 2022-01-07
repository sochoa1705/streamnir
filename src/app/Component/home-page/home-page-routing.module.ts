import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprarComponent } from './comprar/comprar.component';
import { ConformidadComponent } from './conformidad/conformidad.component';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './home/home.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { AerolineasComponent } from './aerolineas/aerolineas.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { DocumentacionViajeComponent } from './documentacion-viaje/documentacion-viaje.component';
import { NuestraEmpresaComponent } from './nuestra-empresa/nuestra-empresa.component';
import { NuestrasAgenciasComponent } from './nuestras-agencias/nuestras-agencias.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch:'full' },
      { path: '', component: HomeComponent },
      { path: 'paquetes', component: PaquetesComponent },
      { path: 'comprar', component: ComprarComponent },
      { path: 'vuelos/resultados', component: ResultadosComponent },
      { path: 'conformidad', component: ConformidadComponent },
      { path: 'aerolineas', component: AerolineasComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
      { path: 'documentacion-viaje', component: DocumentacionViajeComponent },
      {
        path: 'seguros',
        loadChildren: () => import('./seguros/seguros.module').then(
          m => m.SegurosModule
        )
      },
      {
        path: 'vuelos',
        loadChildren: () => import('./vuelos/vuelos.module').then(
          m => m.VuelosModule
        )
      },
      { path: 'nuestra-empresa', component: NuestraEmpresaComponent },
      { path: 'nuestras-agencias', component: NuestrasAgenciasComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
