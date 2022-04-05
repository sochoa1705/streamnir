import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PackagesService } from 'src/app/Services/mock/packages.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { PlansACService } from '../../../../../../Services/plansAC/plans-ac.service';
import { LoaderSubjectService } from '../../../../../../shared/components/loader/service/loader-subject.service';
import { take } from 'rxjs/operators';
import { CoverageService } from '../../../../../../Services/coverage/coverage.service';
import { NMRequestBy } from 'src/app/Models/base/NMRequestBy';
import { CotizarSeguroRQ } from 'src/app/Models/seguros/cotizacionRQ.interface';
import { environment } from 'src/environments/environment';
import { CoberturaSeguroRQ } from 'src/app/Models/seguros/coberturaRQ.interface';
import { NotificationService } from 'src/app/Services/notification.service';

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
  plans: any = []
  coverageList: any
  coverageDisplay: boolean = false
  asistMedic: any
  unidadNegocio: any
  dollar: any
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
    private notification: NotificationService,
  ) {
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    this.dollar = localStorage.getItem('tipoCambio')


    // console.log(this.resultJson);
    // console.log(this.resultJson.ClienteCotizacion);
  }
  ngOnInit(): void {
    let lcadena: any = localStorage.getItem('businessunit')
    this.unidadNegocio = JSON.parse(lcadena)

    if(localStorage.getItem('planes')) {
      let planesAC: any = localStorage.getItem('planes')
      this.plansAC = JSON.parse(planesAC)
  
    } else {
      if (localStorage.getItem('safe0')) {
        localStorage.removeItem('safe0')
        this.listPlansAC()
        // this.route.navigateByUrl('/home/seguros');
      } else {
        this.listPlansAC()
      }
    }


  }

  bestPlan() {
    let arrai = this.plansAC
    arrai.sort((a: any, b: any) => a['change'] - b['change'])
    var longitud = arrai.length;
    longitud = longitud / 2;
    let medium = Math.floor(longitud - 1)
    return medium
  }

  listPlansAC() {
    const textSend = '¡ESTAMOS BUSCANDO LOS MEJORES PLANES!'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()

    let lcotizacion: CotizarSeguroRQ = {
      UnidadNegocio: environment.undidadNegocioAC,
      Dk: environment.dkAgenciaAC,
      SubCodigo: environment.subcodigoAgenciaAC,
      CotizacionAC: {
        Pais: this.unidadNegocio.id_pais_ac,
        CodigoAgencia: this.unidadNegocio.codigo_ac,
        NumeroSucursal: this.unidadNegocio.sucursal_ac,
        PlanFamiliar: 'false',
        Destino: this.resultJson.destinoSafe,
        CantidadDias: this.resultJson.days,
        Clientes: {
          ClienteCotizacion: this.resultJson.ClienteCotizacion
        }
      }
    };

    let payload = new NMRequestBy<CotizarSeguroRQ>(lcotizacion)

    console.log(payload)
    

    this.plansACService.plansAC(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.plansAC = response.map((e: any, index: number) => {
          e.change = (e.precioEmisionLocal * this.dollar).toFixed(2)
          e.precioBrutochange = (e.precioBrutoLocal * this.dollar).toFixed(2)
          return e
        }
        )
        //   this.plansAC = response.filter((price: any) => {
        //     if (price.precioEmisionLocal != '0') {
        //     // console.log(price);
        //     return price
        //   }
        // })
        let maxi = this.bestPlan()
        let clase = { clase: 'best' }
        this.plans = { ...this.plansAC[maxi], ...clase }
        this.plansAC.splice(maxi, 1)
        this.plansAC.unshift(this.plans)

        // AGREGAR CPVERAGE
        // this.plansAC.map((plan: any) => {
        //   console.log(plan);

        //   let planes: any = this.listCoverage(plan)

        //   if (planes.Codigo === 'C.4.1.10.1') {
        //     plan.aMedica = plan.valor
        //   }
        //   return plan

        //           let payload = {
        //             "Aplicacion": "Intranet",
        //             "CodigoSeguimiento": "Test",
        //             "CodigosEntorno": "DESA/NMO/NMO",
        //             "Parametros": {
        //               "CodigoISOPais": this.resultJson.destinoSafe,
        //               "Agencia": "87823",
        //               "Sucursal": "0",
        //               "CodigoProducto": plan.codProducto,
        //               "CodigoTarifa": plan.codTarifa,
        //               "Edad": "40",
        //               "TipoModalidad": plan.codModalidad
        //             }
        //           }

        //           this.coverageService.getCoverage(payload).subscribe(
        //             response.map((n: any)=>{
        //               if(n.Codigo === 'C.4.1.10.1'){
        //               plan.cobertura = n.valor
        //               }

        //             })

        //             // data => console.log(data['Resultado']),
        //           )
        // return plan
        // })
        // this.listCoverage(this.plansAC)

        // .map((e: any) => {
        //   // let max = this.bestPlan()
        //   let max = 2
        //   console.log(e[max])
        //   console.log(e);

        //   if (e === e[max]) {
        //     console.log(e);
        //   }
        //   // price[this.bestPlan()] = {...clase, ...price[this.bestPlan()]}
        //   //price[0] = {...clase, ...price[0]}
        //   //  console.log(e[this.bestPlan()]);

        //   return e
        // })
        //console.log(this.bestPlan());


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
        console.log(this.plans)

        localStorage.setItem('planes', JSON.stringify(this.plansAC))

      },
      error: error => {
        console.log(error)
        this.notification.showNotificacion("Error", "Error de autenticación", 10);
        this.loaderSubjectService.closeLoader()
        this.route.navigateByUrl('/seguros');
      }
    })
  }

  listCoverage(data: any) {
    this.coverageDisplay = false

    let lcobertura: CoberturaSeguroRQ = {
      CodigoISOPais: this.resultJson.destinoSafe,
      Agencia: this.unidadNegocio.codigo_ac,
      Sucursal: this.unidadNegocio.sucursal_ac,
      CodigoProducto: data.codProducto,
      CodigoTarifa: data.codTarifa,
      // Edad: this.resultJson.ClienteCotizacion.shift().Edad,     // COLOCAR LA PRIMERA EDAD DE BUSQUEDA
      Edad: this.resultJson.ClienteCotizacion[0].Edad,     // COLOCAR LA PRIMERA EDAD DE BUSQUEDA
      TipoModalidad: data.codModalidad
    }

    let payload = new NMRequestBy<CoberturaSeguroRQ>(lcobertura);

    this.coverageService.getCoverage(payload).pipe(take(5)).subscribe({
      next: (response) => {
        this.coverageList = response['Resultado']
        this.coverageDisplay = true

        if (Object.keys(this.coverageList).length === 0) {
          this.asistMedic = 0
        } else {
          this.asistMedic = this.coverageList.find((e: any) => {
            if (e.Codigo === 'C.4.1.10.1') {
              return e
            }
          })['Valor']
        }
      },
      error: error => console.log(error),
    }
      // data => console.log(data['Resultado']),
    )
  }

  data(id: any) {
    console.log(id);
    this.pop = id
    this.listCoverage(id)
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
    this.route.navigateByUrl('/comprar', navigationExtras);
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