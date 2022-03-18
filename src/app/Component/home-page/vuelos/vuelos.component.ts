import { Component, OnInit } from '@angular/core';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { SignatureModel } from 'src/app/Models/Request/SignatureModel';
import { CoreService } from 'src/app/Services/core.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {

  public OfertaVuelosRequest: ListaTarifaRequest = new ListaTarifaRequest();
  ListaTarifa: any;

  constructor(
    private coreService: DestinyService
  ) { }

  ngOnInit(): void {
    this.addTag()
    // this.OfertaVuelos();
  }
  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/vuelos',
      'virtualPageTitle': 'Vuelos'
    })
  }

  OfertaVuelos() {
    //debugger;
    this.OfertaVuelosRequest.IdLang = 1;
    this.OfertaVuelosRequest.IdWeb = 7;

    let signatureModel = new SignatureModel();
    signatureModel.IdLang = 1;
    signatureModel.IdSecuencia = 40;
    signatureModel.IdWeb = 7;
    signatureModel.KeyAccess = "20w3bnmvi4j3$14!";
    signatureModel.Usuario = "nmv_web";


    this.OfertaVuelosRequest.Signature = signatureModel;

    /*
     this.OfertaVuelosRequest.Signature.forEach((element) => {
        element.IdLang = 1;
        element.IdSecuencia = 40;
        element.IdWeb = 7;
        element.KeyAccess = "20w3bnmvi4j3$14!";
        element.Usuario = "nmv_web"
       
     });*/



    this.coreService
      .ObtenerOfertaVuelos(this.OfertaVuelosRequest)
      .subscribe(
        (data: any) => {
          this.ListaTarifa = data["tarifas"];
          console.log(data);

        },
        (error: any) => {
          console.log(error);
        }
      );

  }

}
