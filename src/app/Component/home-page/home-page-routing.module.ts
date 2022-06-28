import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConformidadComponent } from './conformidad/conformidad.component';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './home/home.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { AerolineasComponent } from './aerolineas/aerolineas.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { DocumentacionViajeComponent } from './documentacion-viaje/documentacion-viaje.component';
import { NuestraEmpresaComponent } from './nuestra-empresa/nuestra-empresa.component';
import { NuestrasAgenciasComponent } from './nuestras-agencias/nuestras-agencias.component';
import { LibroReclamacionesComponent } from './libro-reclamaciones/libro-reclamaciones.component';
import { CitaComponent } from './cita/cita.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { ResponsabilidadSocialComponent } from './resonsabilidad-social/responsabilidad-social.component';
import { PromocionesComponent } from '../promociones/promociones.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { ComprarComponent } from './comprar/comprar.component';
import { CondicionesDeReservaComponent } from './condiciones-de-reserva/condiciones-de-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'filtro/:tab',
        component: HomeComponent
      },
      {
        path: 'paquetes',
        component: PaquetesComponent
      },
      {
        path: 'vuelos/resultados',
        component: ResultadosComponent
      },
      {
        path: 'conformidad',
        component: ConformidadComponent
      },
      {
        path: 'aerolineas/:code',
        component: AerolineasComponent
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'terminos-condiciones',
        component: TerminosCondicionesComponent
      },
      {
        path: 'documentacion-viaje',
        component: DocumentacionViajeComponent
      },
      {
        path: 'confirmacion/:id',
        component: HomeComponent
      },
      {
        path: 'seguros',
        loadChildren: () => import('./seguros/seguros.module').then(m => m.SegurosModule)
      },
      {
        path: 'vuelos',
        loadChildren: () => import('./vuelos/vuelos.module').then(m => m.VuelosModule)
      },
      {
        path: 'nuestra-empresa',
        component: NuestraEmpresaComponent
      },
      {
        path: 'nuestras-agencias',
        component: NuestrasAgenciasComponent
      },
      {
        path: 'libro-reclamaciones',
        component: LibroReclamacionesComponent
      },
      {
        path: 'agendar-cita',
        component: CitaComponent
      },
      {
        path: 'politicas',
        component: PoliticasComponent
      },
      {
        path: 'condiciones-de-reserva',
        component: CondicionesDeReservaComponent
      },
      {
        path: 'promociones',
        component: PromocionesComponent
      },
      {
        path: 'responsabilidad-social',
        component: ResponsabilidadSocialComponent
      },
      {
        path: 'comprar',
        component: ComprarComponent
      }
    ],
  },
  {
    path: 'widgets',
    loadChildren: () => import('../../../app/widgets/widgets.module').then(m => m.WidgetsModule)
  },
  {
    path: 'tuscitas',
    loadChildren: () => import('../../../app/Component/home-page/tuscitas/tuscitas.module').then(m => m.TuscitasModule)
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
