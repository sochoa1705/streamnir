import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PlansACService } from '../../../../../../Services/plansAC/plans-ac.service';
import { LoaderSubjectService } from '../../../../../../shared/components/loader/service/loader-subject.service';
import { take } from 'rxjs/operators';
import { CoverageService } from '../../../../../../Services/coverage/coverage.service';
import { NMRequestBy } from 'src/app/Models/base/NMRequestBy';
import { CotizarSeguroRQ } from 'src/app/Models/seguros/cotizacionRQ.interface';
import { environment } from 'src/environments/environment';
import { CoberturaSeguroRQ } from 'src/app/Models/seguros/coberturaRQ.interface';
import { NotificationService } from 'src/app/Services/notification.service';

import * as moment from 'moment';

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

  asistenciaMedicaMonto: any;

  existPlans: boolean = true;

  callFirstService: boolean = false;

  //datoUsuario:any = localStorage.getItem('form');
  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public plansACService: PlansACService,
    public coverageService: CoverageService,
    public loaderSubjectService: LoaderSubjectService,
    private notification: NotificationService,
  ) {

  }

  ngOnInit(): void {

    this.result = localStorage.getItem('Datasafe');
    this.resultJson = JSON.parse(this.result);
    this.dollar = localStorage.getItem('tipoCambio');

    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);

    if (localStorage.getItem('safe0'))
      localStorage.removeItem('safe0');

    this.getPlansAC()
  }

  bestPlan() {
    let array = this.plansAC
    array.sort((a: any, b: any) => a['change'] - b['change'])
    let longitud = array.length;
    longitud = longitud / 2;
    return Math.floor(longitud - 1)
  }

  getPlansAC() {
    const textSend = '¡ESTAMOS BUSCANDO LOS MEJORES PLANES!';

    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()

    /* const clienteCotizacion : Array<{Edad: string, FechaNacimiento: string}> = this.resultJson.forEach(element => {
      'Edad': element.age,
      'FechaNacimiento': element.fecha
    }); */

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
          ClienteCotizacion: this.resultJson.passengers
        }
      }
    };

    let payload = new NMRequestBy<CotizarSeguroRQ>(lcotizacion)

    setTimeout(() => {
      this.callFirstService = true;
    }, 500);

    this.plansACService.plansAC(payload).pipe(take(1)).subscribe({
      next: (response) => {

        if (response.length > 0) {
          this.existPlans = true;

          this.plansAC = response.map((elem: any) => {
            elem.change = Number(elem.precioEmisionLocal ? elem.precioEmisionLocal : 0).toFixed(2)
            elem.precioBrutochange = Number(elem.precioBrutoLocal ? elem.precioBrutoLocal : 0).toFixed(2)
            return elem;
          })

          let maxi = this.bestPlan()
          let clase = { clase: 'best' }
          this.plans = { ...this.plansAC[maxi], ...clase }
          this.plansAC.splice(maxi, 1)
          this.plansAC.unshift(this.plans)
          localStorage.setItem('planes', JSON.stringify(this.plansAC))
        }
        else {
          this.existPlans = false;
        }

        this.loaderSubjectService.closeLoader();
        this.callFirstService = false;
      },
      error: error => {
        console.error(error);
        this.notification.showNotificacion("Error", "Error de autenticación", 10);
        this.loaderSubjectService.closeLoader()
        this.route.navigateByUrl('/seguros');
        this.callFirstService = false;
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
      Edad: this.resultJson.passengers[0].edad,     // COLOCAR LA PRIMERA EDAD DE BUSQUEDA
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
          this.asistenciaMedicaMonto = this.asistMedic.includes('USD') ? Number(this.asistMedic.substring(4).replace('.', '')) : this.asistMedic;
        }
      },
      error: error => console.error(error)
    });
  }

  data(id: any) {
    this.listCoverage(id);
    this.pop = id;
  }
  shop(card: any) {
    let service = this.plansAC.find((e: any) => {
      if (e.idProducto === card.idProducto) return e;
    });
    let state2 = { ...this.json, ...service, planType: '' }

    localStorage.setItem('safe0', JSON.stringify(state2));

    const navigationExtras: NavigationExtras = { state: { ...this.json, ...service } };
    this.route.navigateByUrl('/comprar', navigationExtras);
  }

  private getResultJsonData(resultJson: any): any {
    return {
      pasajeros: {
        adultos: resultJson.passengers.filter((p: any) => Number(p.edad) >= 18).length,
        ninos: resultJson.passengers.filter((p: any) => Number(p.edad) > 5 && Number(p.edad) < 18).length,
        infantes: resultJson.passengers.filter((p: any) => Number(p.edad) <= 5).length,
        total: resultJson.passengers.length
      },
      fechas: {
        salida: moment(resultJson.fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        retorno: moment(resultJson.toDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        estadia: Number(resultJson.days)
      }
    }
  }

  getPromedioEdades(resultJson: any): number {
    let promedio: number = 0;
    resultJson.passengers.forEach((element: any) => {
      promedio = promedio + parseInt(element.edad);
    });
    //console.log("promedio:", promedio) 
    //console.log("length:", resultJson.passengers.length) 
    return (promedio / resultJson.passengers.length);
  }
}