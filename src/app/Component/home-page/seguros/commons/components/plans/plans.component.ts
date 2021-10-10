import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { PlansACService } from '../../../../../../Services/plansAC/plans-ac.service';
import { LoaderSubjectService } from '../../../../../../shared/components/loader/service/loader-subject.service';
import { map } from 'rxjs/operators';
import { CoverageService } from '../../../../../../Services/coverage/coverage.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  pop:any
  plansAC: any = []
  coverageList: any
  json = {
    detailPay: 'safe',
    filter: 'filtersafe',
    title: 'Viaja seguro',
    asistencia: false,
    reembolso: false,
    detalleViaje: false,
    detalleCobertura: true,
    cupon: false,
  }

  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public plansACService: PlansACService,
    public coverageService: CoverageService,
    public loaderSubjectService: LoaderSubjectService,
  ) {

  }
  ngOnInit(): void {
    this.listPlansAC()
    this.listCoverage()
  }

  listCoverage() {
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO",
      "Parametros": {
        "CodigoISOPais": "510",
        "Agencia": "87823",
        "Sucursal": "0",
        "CodigoProducto": "MX",
        "CodigoTarifa": "96045",
        "Edad": "40",
        "TipoModalidad": "1"
      }
    }
    this.coverageService.getCoverage(payload).subscribe({
      next: (response) => {
        this.coverageList = response['Resultado']
        console.log(this.coverageList)
      },
      error: error => console.log(error),
    }
      // data => console.log(data['Resultado']),

    )
  }

  listPlansAC() {
    this.loaderSubjectService.showLoader()
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO",
      "Parametros": {
        "UnidadNegocio": 5,
        "Dk": "23571",
        "SubCodigo": null,
        "CotizacionAC": {
          "Pais": "510",
          "CodigoAgencia": "87823",
          "NumeroSucursal": "0",
          "PlanFamiliar": "false",
          "Destino": "12",
          "CantidadDias": "10",
          "Clientes": {
            "ClienteCotizacion": [
              {
                "Edad": "40",
                "FechaNacimiento": "17/08/1981"
              },
              {
                "Edad": "10",
                "FechaNacimiento": "17/08/2011"
              }
            ]
          }
        }
      }
    }
    this.plansACService.plansAC(payload).subscribe({
      next: (response) => {
        this.plansAC = response
        // .pipe(
        //   map(money => {
        //     return money.map((item: any, index: any) => {
        //       return {
        //         change: item[index].precioEmision * item[index].tipoCambio
        //       }
        //     })
        //   })
        // )
        this.loaderSubjectService.closeLoader()
        // this.price()
        console.log(this.plansAC)
      },
      error: error => {
        console.log(error)
        this.loaderSubjectService.closeLoader()
        this.route.navigateByUrl('/home/seguros');
      }
    }
    )
  }

  // price() {
  //   let price = Number(this.plansAC[0].precioEmision)
  //   let change = Number(this.plansAC.tipoCambio)
  //   let priceSol = price * change
  //   console.log(price);

  //   this.priceSol = priceSol
  //   return price
  // }

  data(id: any){
    let service = this.plansAC.find((e: any) => {
      if(e.idProducto === id){
        console.log(e);
        return e
      }
    })
    this.pop = service

  }

  shop(id: any) {
    let service = this.plansAC.find((e: any) => {
      if(e.idProducto === id){
        return e
      }
    })
    const navigationExtras: NavigationExtras = { state: {...this.json, ...service} };
    this.route.navigateByUrl('/home/comprar', navigationExtras);}
}
