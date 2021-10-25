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
  // result: any[] = JSON.parse(localStorage.getItem('form'))
  result: any
  resultJson: any
  pop: any
  plansAC: any = []
  coverageList: any
  json = {
    detailPay: 'safe',
    filter: 'filtersafe',
    title: '!Viaja seguro!',
    asistencia: false,
    reembolso: false,
    detalleViaje: false,
    detalleCobertura: true,
    cupon: false,
  }
  //datoUsuario:any = localStorage.getItem('form');
  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public packagesService: PackagesService,
    public dataPagePresenterService: DataPagePresenterService,
    public plansACService: PlansACService,
    public coverageService: CoverageService,
    public loaderSubjectService: LoaderSubjectService,
  ) {
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    console.log(this.resultJson);
    console.log(this.resultJson.ClienteCotizacion);
  }
  ngOnInit(): void {
    this.listPlansAC()
  }

  test(){
    console.log('HOLA');
    
  }

  listPlansAC() {
    const textSend = '¡ESTAMOS BUSCANDO LOS MEJORES PLANES!'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()
    // let payload = {
    //   "Aplicacion": "Intranet",
    //   "CodigoSeguimiento": "Test",
    //   "CodigosEntorno": "DESA/NMO/NMO",
    //   "Parametros": {
    //     "UnidadNegocio": 5,
    //     "Dk": "23571",
    //     "SubCodigo": null,
    //     "CotizacionAC": {
    //       "Pais": "510",
    //       "CodigoAgencia": "87823",
    //       "NumeroSucursal": "0",
    //       "PlanFamiliar": "false",
    //       "Destino": this.resultJson.destinoSafe,
    //       "CantidadDias": this.resultJson.days,
    //       "Clientes": {
    //         "ClienteCotizacion": this.resultJson.ClienteCotizacion
    //       }
    //     }
    //   }
    // }
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
                "FechaNacimiento": "22/10/1981"
              },
              {
                "Edad": "10",
                "FechaNacimiento": "22/10/2011"
              }
            ]
          }
        }
      }
    }
    this.plansACService.plansAC(payload).subscribe({
      next: (response) => {
        this.plansAC = response
        // .map((m: any, index: any) => {
        //   let payload2 = {
        //     "Aplicacion": "Intranet",
        //     "CodigoSeguimiento": "Test",
        //     "CodigosEntorno": "DESA/NMO/NMO",
        //     "Parametros": {
        //       "CodigoISOPais": this.resultJson.destinoSafe,
        //       "Agencia": "87823",
        //       "Sucursal": "0",
        //       "CodigoProducto": m.codProducto,
        //       "CodigoTarifa": m.codTarifa,
        //       "Edad": "40",
        //       "TipoModalidad": m.codModalidad
        //     }
        //   }
        //   let omac
        //   let medica = this.coverageService.getCoverage(payload2).subscribe({
        //     next: (infoData)=>{
        //       omac = infoData['Resultado'][index].map( (el:any) => {
        //         if(el.Codigo = 'C.4.1.10.1'){
        //           console.log(el.Valor);
        //           return el.Valor
        //         }
        //       })
        //   }
        //   })
        //   // this.listCoverage(response[index]).filter((medic: any) => {
        //   //   return r
        //   // })
        //     m.AsistenciaMEdica = omac
        //     return m
        //   })
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
  listCoverage(data: any) {
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "Test",
      "CodigosEntorno": "PROD/NMO/NMO",
      "Parametros": {
        "CodigoISOPais": this.resultJson.destinoSafe,
        "Agencia": "87823",
        "Sucursal": "0",
        "CodigoProducto": data.codProducto,
        "CodigoTarifa": data.codTarifa,
        "Edad": "40",
        "TipoModalidad": data.codModalidad
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
  data(id: any) {
    let service = this.plansAC.find((e: any) => {
      this.listCoverage(e)
      if (e.idProducto === id) {
        console.log(e);
        return e
      }
    })
    this.pop = service
  }
  shop(id: any) {
    let service = this.plansAC.find((e: any) => {
      if (e.idProducto === id) {
        return e
      }
    })
    let state2 = { ...this.json, ...service }
    localStorage.setItem('safe0', JSON.stringify(state2));
    const navigationExtras: NavigationExtras = { state: { ...this.json, ...service } };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }
  // price() {
  //   let price = Number(this.plansAC[0].precioEmision)
  //   let change = Number(this.plansAC.tipoCambio)
  //   let priceSol = price * change
  //   console.log(price);
  //   this.priceSol = priceSol
  //   return price
  // }
}