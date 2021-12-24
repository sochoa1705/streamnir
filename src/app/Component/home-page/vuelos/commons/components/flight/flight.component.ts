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


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  public OfertaVuelosRequest :  ListaTarifaRequest = new  ListaTarifaRequest();
   ListaTarifa : any;// ListaTarifaResponse[] = new Array <ListaTarifaResponse>(); 

   $vuelosInternacioales:Observable<IFlightRates[]>;
   
  constructor(
    public route: Router,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    private coreService: DestinyService,
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
 
    this.OfertaVuelos();

    this.loadVuelosInternacionales()

    const contador = interval(4000);
    contador.subscribe((n)=> {
      this.counter < 3 ? this.counter++ : this.counter = 1;
      this.counterMovil < 8 ? this.counterMovil++ : this.counterMovil = 1;
    })

  }

  loadVuelosInternacionales(){
    this.$vuelosInternacioales = this.flightService.getPasajesAereos(TYPE_PARAM.INTERNACIONAL);
  }

  toLine(e: any){
    this.route.navigateByUrl('/home/aerolineas')
  }
 /* codigo para los sliders de las compañias */
  counter: number = 1;
  counterMovil: number = 1;
  nextBtn() {
    this.counter < 3 ? this.counter++ : this.counter = 1;
  }
  afterBtn() {
    this.counter > 1 ? this.counter-- : this.counter = 3;
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
  
    this.coreService
      .ObtenerOfertaVuelos(this.OfertaVuelosRequest)
      .subscribe(
        (data: any) => {
      // debugger;
        this.ListaTarifa =  data["tarifas"];
        console.log( this.ListaTarifa);
         
        },
        (error: any) => {
          console.log(error);
        }
      );
  
    }


  /* end code */

}
