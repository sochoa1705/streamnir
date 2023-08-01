import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { AsidePresenterService } from 'src/app/Services/presenter/aside/aside-presenter.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { SegurosModule } from './seguros/seguros.module';
import { PerfilModule } from './perfil/perfil.module';
import { ToolbarModule } from 'src/app/shared/components/toolbar/toolbar.module';
import { ResultadosModule } from './resultados/resultados.module';
import { HomeModule } from './home/home.module';
import { PreFooterModule } from 'src/app/shared/components/pre-footer/pre-footer.module';
import { ConformidadModule } from './conformidad/conformidad.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { VuelosModule } from './vuelos/vuelos.module';
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { DollarChangeService } from '../../Services/dollarChange/dollar-change.service';
import { TerminosCondicionesModule } from './terminos-condiciones/terminos-condiciones.module';
import { DocumentacionViajeModule } from './documentacion-viaje/documentacion-viaje.module';
import { NuestrasAgenciasModule } from './nuestras-agencias/nuestras-agencias.module';
import { NuestraEmpresaModule } from './nuestra-empresa/nuestra-empresa.module';
import { MainService } from '../../Services/presenter/main/main.service';
import { LibroReclamacionesModule } from './libro-reclamaciones/libro-reclamaciones.module';
import { PoliticasModule } from './politicas/politicas.module';
import { ResponsabilidadSocialModule } from './resonsabilidad-social/responsabilidad-social.module';
import { ComprarModule } from './comprar/comprar.module';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { ItineraryModule } from './itinerary/itinerary.module';
import { RetailModule } from './retail/retail.module';
import { OffersModule } from './offers/offers.module';

@NgModule({
	declarations: [ HomePageComponent, PageNotFoundComponent ],
	imports: [
		CommonModule,
		HomePageRoutingModule,
		HomeModule,
		HttpClientModule,
		SegurosModule,
		VuelosModule,
		AerolineasModule,
		PerfilModule,
		TerminosCondicionesModule,
		DocumentacionViajeModule,
		ToolbarModule,
		PreFooterModule,
		FooterModule,
		ConformidadModule,
		ResultadosModule,
		ItineraryModule,
		LoaderModule,
		NuestrasAgenciasModule,
		NuestraEmpresaModule,
		LibroReclamacionesModule,
		PoliticasModule,
		ResponsabilidadSocialModule,
		ComprarModule,
		RetailModule,
		OffersModule
	],
	exports: [ HomePageComponent ],
	providers: [
		MainService,
		DollarChangeService,
		OffersService,
		PackagesService,
		AsidePresenterService,
		DataPagePresenterService,
		FlightsService
	]
})
export class HomePageModule {
}
