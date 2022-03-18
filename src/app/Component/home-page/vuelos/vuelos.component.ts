import { Component, OnInit } from '@angular/core';
import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { SignatureModel } from 'src/app/Models/Request/SignatureModel';
import { CoreService } from 'src/app/Services/core.service';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  destiny: any = []
  destinyString: any

  public OfertaVuelosRequest :  ListaTarifaRequest = new  ListaTarifaRequest();
   ListaTarifa : any; 

  constructor(
    private coreService: DestinyService
  ) { }

  ngOnInit(): void {
    this.addTag()
    this.listDestiny()

   // this.OfertaVuelos();
  }
  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'virtualPageView',
      'virtualPagePath': '/home/vuelos',
      'virtualPageTitle': 'Vuelos'
    })
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
      this.ListaTarifa =  data["tarifas"];
      console.log(data);
       
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
  listDestiny() {
    let payload = new NMRequest();

    this.coreService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.destiny = response['Resultado']
        localStorage.setItem('destiny', JSON.stringify(this.destiny));
        console.log(this.destiny)
      },
      error: error => console.log(error),
    }
    )
  }
}
