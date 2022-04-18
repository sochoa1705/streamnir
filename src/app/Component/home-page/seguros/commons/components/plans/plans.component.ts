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
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { ActionField, ActionFieldAddToCart, Add, Detail, Ecommerce, EcommerceAddToCart, EcommerceDetalleBeneficio, Impression, ModelTaggingAddToCart, ModelTaggingDetalleBeneficio, ModelTaggingMostrarResultados, Product, ProductAddToCart } from 'src/app/Services/analytics/tagging.models';
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

  }

  ngOnInit(): void {
    ////debugger

    this.result = localStorage.getItem('Datasafe');
    this.resultJson = JSON.parse(this.result);
    this.dollar = localStorage.getItem('tipoCambio');

    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);


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
      this.getPlansAC()
    }
    else
      this.getPlansAC()
  }

  bestPlan() {
    let arrai = this.plansAC
    arrai.sort((a: any, b: any) => a['change'] - b['change'])
    var longitud = arrai.length;
    longitud = longitud / 2;
    let medium = Math.floor(longitud - 1)
    return medium
  }

  getPlansAC() {
    const textSend = '¡ESTAMOS BUSCANDO LOS MEJORES PLANES!';

    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()

    // const clienteCotizacion : Array<{Edad: string, FechaNacimiento: string}> = this.resultJson.forEach(element => {
    //   'Edad': element.age,
    //   'FechaNacimiento': element.fecha
    // });

    ////debugger

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

    ////debugger

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
    this.sendDataLayerDetalleBeneficio(this.plansAC, this.resultJson);    
    console.log(id);
    this.pop = id;
    this.listCoverage(id);    

  }
  sendDataLayerAddToCart(plansAC: any, resultJson: any) {
    let products:    ProductAddToCart[] = [];
    let pp :ProductAddToCart={
      name: '',
      id: '',
      price: '',
      brand: '',
      category: '',
      category2: '',
      variant: '',
      quantity: 0,
      metric10: 0,
      dimension9: '',
      dimension11: '',
      dimension12: '',
      metric11: 0,
      metric12: 0,
      dimension16: '',
      dimension17: ''
    }
    let actionField : ActionFieldAddToCart ={
      list: 'Resultados de Seguros'
    }
    let add :Add ={
      actionField: actionField,
      products: products
    }
    let ecommerce : EcommerceAddToCart={
      currencyCode: '',
      add: add
    }
    let modelTaggingAddToCart : ModelTaggingAddToCart ={
      event: 'nmv.seguros_eecga3_addtocart',
      ecommerce: ecommerce
    }
    let index: number = 0;
    ecommerce.currencyCode = plansAC[0].monedaLocal;
    plansAC.forEach((element : any) => {
        pp = ({
          name: element.nombreProducto,
          id: element.codProducto,
          price: element.precioEmisionLocal,
          brand: 'AssistCard?',
          category: 'Seguros',
          category2: index === 0 ? 'EL MEJOR PLAN' : 'FECHA FLEXIBLE',
          variant: resultJson.destinyString.descripcion_destino,
          quantity: resultJson.passengers.length,
          metric10: this.getPromedioEdades(resultJson),
          dimension9: 'MontoAsistenciaMedica?',
          dimension11: resultJson.destinyString.fromDate,
          dimension12: resultJson.passengers.toDate,
          metric11: this.getDiasAnticipacion(resultJson),
          metric12: this.getDuracionViaje(resultJson),
          dimension16:'PE?',
          dimension17:resultJson.destinyString.id_destino,
      });
      products.push(pp);
      index++;
    });
    TaggingService.tagMostrarAddToCart(modelTaggingAddToCart);
}

  sendDataLayerDetalleBeneficio(plansAC: any, resultJson: any) {
    ////debugger;
    let actionField : ActionField ={
      list: 'Resultado de Seguros',
    }
    let products : Product[] = [];
    let pp : Product = {
      name: '',
      id: '',
      price: '',
      brand: '',
      category: '',
      category2: '',
      variant: '',
      quantity: 0,
      metric10: 0,
      dimension9: '',
      dimension11: '',
      dimension12: '',
      metric11: 0,
      metric12: 0
    }
    
    let detail : Detail = {
      actionField: actionField,
      products: products
    }
    let ecommerce : EcommerceDetalleBeneficio={
      detail: detail
    }
    let modelTaggingDetalleBeneficio:ModelTaggingDetalleBeneficio={
      event: 'nmv.seguros_eecga3_productview',
      ecommerce: ecommerce
    }
    let index: number = 0;
    plansAC.forEach((element : any) => {
      pp = {
        name: element.nombreProducto,
        id: element.codProducto,
        price: element.precioEmisionLocal,
        brand: 'AssistCard?',
        category: 'Seguros',
        category2: index === 0 ? 'EL MEJOR PLAN' : 'FECHA FLEXIBLE',
        variant: resultJson.destinyString.descripcion_destino,
        quantity: resultJson.passengers.length,
        metric10: this.getPromedioEdades(resultJson),
        dimension9: 'MontoAsistenciaMedica?',
        dimension11: resultJson.destinyString.fromDate,
        dimension12: resultJson.passengers.toDate,
        metric11: this.getDiasAnticipacion(resultJson),
        metric12: this.getDuracionViaje(resultJson)
      }
      index++;
      products.push(pp);
    });
    console.log("modelTaggingDetalleBeneficio", modelTaggingDetalleBeneficio)
    TaggingService.tagMostrarDetalleBeneficio(modelTaggingDetalleBeneficio);
  }

  shop(card: any) {
    console.log("plansAC: ", this.plansAC);
    console.log("resultJson: ", this.resultJson);
    this.sendDataLayerMostrarResultados(this.plansAC, this.resultJson);
    this.sendDataLayerAddToCart(this.plansAC, this.resultJson);
    let service = this.plansAC.find((e: any) => {
      if (e.idProducto === card.idProducto) {
        return e
      }
    });
    let state2 = { ...this.json, ...service }
    localStorage.setItem('safe0', JSON.stringify(state2));
    const navigationExtras: NavigationExtras = { state: { ...this.json, ...service } };
    this.route.navigateByUrl('/comprar', navigationExtras);
    
  }
  sendDataLayerMostrarResultados(plansAC: any, resultJson: any) {
    let ecommerce: Ecommerce = {
        currencyCode: '',
        impressions: []
    };
    let impressions: Impression[] = [];
    let ii: Impression = {
        name: '',
        position: 0,
        list: '',
        id: '',
        price: '',
        brand: '',
        category: '',
        category2: '',
        variant: '',
        quantity: 0,
        metric10: 0,
        dimension9: '',
        dimension11: '',
        dimension12: '',
        metric11: 0,
        metric12: 0
    };
    let modelTaggingMostrarResultados: ModelTaggingMostrarResultados = {
        event: 'nmv.seguros_eecga3_productimpression',
        ecommerce: ecommerce
    };
    let index: number = 0;
    ecommerce.currencyCode = plansAC[0].monedaLocal;
    plansAC.forEach((element: any) => {
        ii = ({
            name: element.nombreProducto,
            position: index,
            list: 'Resultados de Seguros',
            id: element.codProducto,
            price: element.precioEmisionLocal,
            brand: 'AssistCard?',
            category: 'Seguros',
            category2: index === 0 ? 'EL MEJOR PLAN' : 'FECHA FLEXIBLE',
            variant: resultJson.destinyString.descripcion_destino,
            quantity: resultJson.passengers.length,
            metric10: this.getPromedioEdades(resultJson),
            dimension9: 'MontoAsistenciaMedica?',
            dimension11: resultJson.destinyString.fromDate,
            dimension12: resultJson.passengers.toDate,
            metric11: this.getDiasAnticipacion(resultJson),
            metric12: this.getDuracionViaje(resultJson)
        });
        impressions.push(ii);
        index++;
    });
    ecommerce.impressions = impressions;
    modelTaggingMostrarResultados.ecommerce = ecommerce;
    TaggingService.tagMostrarResultados(modelTaggingMostrarResultados);
}
  getDuracionViaje(fromDate: any): number {
    let fechaFormats : number[] = fromDate.fromDate.split('/');
    let fechaFormats2 : number[] = fromDate.toDate.split('/');
    const _fromDate = new Date(fechaFormats[2],fechaFormats[1],fechaFormats[0]);
    const _toDate = new Date(fechaFormats2[2],fechaFormats2[1],fechaFormats2[0]);
    let diferencia = (_toDate.getTime() - _fromDate.getTime())/ 1000 / 60 / 60 / 24;
    //console.log("DuracionViaje:", diferencia)    
    return diferencia;
  }
  getDiasAnticipacion(fromDate: any): number {
    let fechaFormats : number[] = fromDate.fromDate.split('/');
    const _fromDate = new Date(fechaFormats[2],fechaFormats[1],fechaFormats[0]);
    const _toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    let diferencia = (( _fromDate.getTime() - _toDate.getTime())/ 1000 / 60 / 60 / 24) - 40;
    return diferencia;    
  }
  
  getPromedioEdades(resultJson: any): number {
    let promedio:number=0;
    resultJson.passengers.forEach((element : any) => {
      promedio = promedio + parseInt(element.edad);
    });
    //console.log("promedio:", promedio) 
    //console.log("length:", resultJson.passengers.length) 
    return (promedio/resultJson.passengers.length);
  }
}