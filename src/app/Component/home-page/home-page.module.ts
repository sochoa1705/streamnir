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
import { GoogleMapsModule } from '@angular/google-maps'
import { FlightsService } from 'src/app/Services/flights/flights.service';
import { SegurosModule } from './seguros/seguros.module';
import { PerfilModule } from './perfil/perfil.module';
import { ToolbarModule } from 'src/app/shared/components/toolbar/toolbar.module';
import { ComprarModule } from './comprar/comprar.module';
import { ResultadosModule } from './resultados/resultados.module';
import { HomeModule } from './home/home.module';
import { PreFooterModule } from 'src/app/shared/components/pre-footer/pre-footer.module';
import { ConformidadModule } from './conformidad/conformidad.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { VuelosModule } from './vuelos/vuelos.module';
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { DollarChangeService } from '../../Services/dollarChange/dollar-change.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HomeModule,
    SegurosModule,
    VuelosModule,
    AerolineasModule,
    PerfilModule,
    ToolbarModule,
    PreFooterModule,
    FooterModule,
    GoogleMapsModule,
    ComprarModule,
    ConformidadModule,
    ResultadosModule,
    LoaderModule,
  ],
  exports: [HomePageComponent],
  providers: [DollarChangeService, OffersService, PackagesService, AsidePresenterService, DataPagePresenterService, FlightsService]
})
export class HomePageModule { }
