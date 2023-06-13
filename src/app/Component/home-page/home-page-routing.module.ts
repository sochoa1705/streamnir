import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConformidadComponent } from './conformidad/conformidad.component';
import { HomePageComponent } from './home-page.component';
import { HomeComponent } from './home/home.component';
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
import { CierrapuertasComponent } from './cierrapuertas/cierrapuertas.component';
import { CierrapuertasOfertasComponent } from './cierrapuertas-ofertas/cierrapuertas-ofertas.component';
import { TusdatosComponent } from './tusdatos/tusdatos.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { EventosComponent } from './eventos/eventos.component';
import { GifCardComponent } from './gif-card/gif-card.component';
import {RetailComponent} from "./retail/retail.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      // {
      //   path: 'filtro/:tab',
      //   component: HomeComponent
      // },
      {
        path: 'vuelos/resultados',
        component: ResultadosComponent
      },
      {
        path: 'booking/itinerary/:transactionId/:idGroup/:segments/:flightType/:departureLocation/:arrivalLocation/:departureDate/:arrivalDate/:adults/:children/:infants/:flightClass',
        component: ItineraryComponent
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
        path: 'documentacion_de_viaje.html',
        component: DocumentacionViajeComponent
      },
      {
        path: 'confirmacion/:id',
        component: HomeComponent
      },
      {
        path: 'vuelos',
        loadChildren: () => import('./vuelos/vuelos.module').then(m => m.VuelosModule)
      },
      {
        path: 'paquetes',
        loadChildren: () => import('./paquetes/paquetes.module').then(m => m.PaquetesModule)
      },
      {
        path: 'armapaquete',
        loadChildren: () => import('./build-your-trip/build-your-trip.module').then(m => m.BuildYourTripModule)
      },
      {
        path: 'vuelohotel',
        loadChildren: () => import('./flights-plus-hotel/flights-plus-hotel.module').then(m => m.FlightsPlusHotelModule)
      },
      {
        path: 'hoteles',
        loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)
      },
      {
        path: 'autos',
        loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
      },
      {
        path: 'actividades',
        loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
      },
      {
        path: 'seguros',
        loadChildren: () => import('./seguros/seguros.module').then(m => m.SegurosModule)
      },
      {
        path: 'nuestra-empresa',
        component: NuestraEmpresaComponent
      },
      {
        path: 'tiendas',
        component: NuestrasAgenciasComponent
      },
      {
        path: '28dejulio',
        component: RetailComponent
      },
      {
        path: 'libro-reclamaciones',
        component: LibroReclamacionesComponent
      },
      {
        path: 'cierrapuertas',
        component: CierrapuertasComponent,
      },
      {
        path: 'cierrapuertas/ofertas',
        component: CierrapuertasOfertasComponent,
      },
      {
        path: 'tusdatos',
        component: TusdatosComponent,
      },
      {
        path: 'eventos',
        component: EventosComponent,
      },
      {
        path: 'agenda-tu-cita',
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
      },
      {
        path: 'gif-card',
        component: GifCardComponent
      },
      {
        path: 'canales-de-atencion',
        loadChildren: () => import('../../../app/Component/home-page/canales-atencion/canales-atencion.module').then(m => m.CanalesAtencionModule)
      },
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
