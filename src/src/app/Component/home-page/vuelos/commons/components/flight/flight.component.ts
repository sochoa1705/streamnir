import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { Router } from '@angular/router';

import { ListaTarifaRequest } from 'src/app/Models/Request/ListaTarifasRequest';
import { SignatureModel } from 'src/app/Models/Request/SignatureModel';
import { DestinyService } from 'src/app/Services/destiny/destiny.service';

import { Observable } from 'rxjs';
import { FlightService } from './flight.service';
import { IFlightRates, IVuelos, TYPE_PARAM } from './flight.models';
import { IAereolineas } from 'src/app/shared/components/aereolineas/aereolineas.interfaces';
import { NMRequest } from 'src/app/Models/base/NMRequest';
import { take } from 'rxjs/operators';
import { toUp } from '../../../../../../shared/utils';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  public OfertaVuelosRequest: ListaTarifaRequest = new ListaTarifaRequest();
  destiny: any = []
  $vuelosInternacionales: Observable<IFlightRates[]>;
  $vuelosNacionales: Observable<IFlightRates[]>;
  $aereolineas: Observable<IAereolineas[]>;
  $vuelos: Observable<IVuelos[]>;

  constructor(
    public route: Router,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    private flightService: FlightService,
    public destinyService: DestinyService,
  ) { }

  ngOnInit(): void {
    toUp()
    this.listDestiny()
    this.OfertaVuelos();

    this.loadVuelosInternacionales();
    this.loadVuelosNacionales();
    this.loadAereolineas();
    this.loadVuelos();
  }

  loadVuelosInternacionales() {
    this.$vuelosInternacionales = this.flightService.getPasajesAereos(TYPE_PARAM.INTERNACIONAL);
  }
  loadVuelosNacionales() {
    this.$vuelosNacionales = this.flightService.getPasajesAereos(TYPE_PARAM.NACIONAL);
  }
  loadAereolineas() {
    this.$aereolineas = this.flightService.getAereolineas();
  }
  loadVuelos() {
    this.$vuelos = this.flightService.getVuelos();
  }

  toLine(e: any) {
    this.route.navigateByUrl('/aerolineas')
  }

  OfertaVuelos() {
    this.OfertaVuelosRequest.IdLang = 1;
    this.OfertaVuelosRequest.IdWeb = 7;

    let signatureModel = new SignatureModel();
    signatureModel.IdLang = 1;
    signatureModel.IdSecuencia = 40;
    signatureModel.IdWeb = 7;
    signatureModel.KeyAccess = "20w3bnmvi4j3$14!";
    signatureModel.Usuario = "nmv_web";

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

  redirigirVuelo(vuelo: IVuelos) {
    console.log(vuelo);
    this.route.navigate(['/vuelos/', vuelo.Slug])
  }


  toDestiny(vuelo: IFlightRates) {
    this.route.navigate(['/vuelos/destino/LIM', vuelo.DestinationCode])
  }

  /* end code */
  listDestiny() {
    let payload = new NMRequest();

    this.destinyService.getDestiny(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.destiny = response['Resultado']
        localStorage.setItem('destiny', JSON.stringify(this.destiny));
      },
      error: error => console.log(error),
    }
    )
  }
}
