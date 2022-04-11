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
  }

  ngOnInit(): void {
    let lcadena: any = localStorage.getItem('businessunit')
    this.unidadNegocio = JSON.parse(lcadena)

    // if(localStorage.getItem('planes')) {
    //   let planesAC: any = localStorage.getItem('planes')
    //   this.plansAC = JSON.parse(planesAC)

    // } else {
    //   if (localStorage.getItem('safe0')) {
    //     localStorage.removeItem('safe0');
    //     this.listPlansAC()
    //   } else {
    //     this.listPlansAC()
    //   }
    // }

    if (localStorage.getItem('safe0')) {
      localStorage.removeItem('safe0');
      this.listPlansAC()
    }
    else
      this.listPlansAC()
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
    const textSend = '¡ESTAMOS BUSCANDO LOS MEJORES PLANES!';

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

    debugger

    console.log('listPlansAC');
    console.log(JSON.stringify(payload))


    this.plansACService.plansAC(payload).pipe(take(1)).subscribe({
      next: (response) => {
        this.plansAC = response.map((e: any, index: number) => {
          e.change = (e.precioEmisionLocal * this.dollar).toFixed(2)
          e.precioBrutochange = (e.precioBrutoLocal * this.dollar).toFixed(2)
          return e
        }
        )

        let maxi = this.bestPlan()
        let clase = { clase: 'best' }
        this.plans = { ...this.plansAC[maxi], ...clase }
        this.plansAC.splice(maxi, 1)
        this.plansAC.unshift(this.plans)

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
    });

    let state2 = { ...this.json, ...service }
    localStorage.setItem('safe0', JSON.stringify(state2));

    const navigationExtras: NavigationExtras = { state: { ...this.json, ...service } };

    this.route.navigateByUrl('/comprar', navigationExtras);
  }
}