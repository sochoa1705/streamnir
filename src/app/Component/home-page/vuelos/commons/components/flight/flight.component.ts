import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';

import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { SignatureModel } from 'src/app/Models/Request/SignatureModel';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';

import { interval, Observable } from 'rxjs';
import { FlightService } from './flight.service';
import { IFlightRates, TYPE_PARAM } from './flight.models';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  public OfertaVuelosRequest :  ListaTarifaRequest = new  ListaTarifaRequest();
  //  ListaTarifa : any;

   $vuelosInternacionales:Observable<IFlightRates[]>;
   $vuelosNacionales:Observable<IFlightRates[]>;
   $aereolineas:Observable<IAereolineas[]>;
   
  constructor(
    public route: Router,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    // private coreService: DestinyService,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
 
    this.OfertaVuelos();

    this.loadVuelosInternacionales();
    this.loadVuelosNacionales();
    this.loadAereolineas();

  }

  loadVuelosInternacionales(){
    this.$vuelosInternacionales = this.flightService.getPasajesAereos(TYPE_PARAM.INTERNACIONAL);
  }
  loadVuelosNacionales(){
    this.$vuelosNacionales = this.flightService.getPasajesAereos(TYPE_PARAM.NACIONAL);
  }
  loadAereolineas(){
    this.$aereolineas = this.flightService.getAereolineas();
  }

  toLine(e: any){
    this.route.navigateByUrl('/home/aerolineas')
  }


  OfertaVuelos(){
    //debugger;
    this.OfertaVuelosRequest.IdLang = 1;
    this.OfertaVuelosRequest.IdWeb = 7;
  
    let signatureModel =  new SignatureModel();
    signatureModel.IdLang = 1;
    signatureModel.IdSecuencia = 40;
    signatureModel.IdWeb = 7;
    signatureModel.KeyAccess = "20w3bnmvi4j3$14!";
    signatureModel.Usuario =  "nmv_web";
  
    this.OfertaVuelosRequest.Signature = signatureModel;
  
    // this.coreService
    //   .ObtenerOfertaVuelos(this.OfertaVuelosRequest)
    //   .subscribe(
    //     (data: any) => {
    //     this.ListaTarifa =  data["tarifas"];
    //     console.log( this.ListaTarifa);
         
    //     },
    //     (error: any) => {
    //       console.log(error);
    //     }
    //   );
  
    }


  /* end code */

}
