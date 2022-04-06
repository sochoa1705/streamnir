import { Injectable } from '@angular/core';
import { routerToCapitalice } from 'src/app/shared/utils';



@Injectable({ providedIn: 'root' })
export class TaggingService {
  constructor() {}

  public static triggerTag(datos: any) {
    console.log(datos);
    const dataLayer = (<any>(<any>window)).dataLayer || [];
    dataLayer.push(datos);
  }

  public static pageView(url: string) {
    const virtualPageTitle = 'NMV ' + routerToCapitalice(url);
    this.triggerTag({
      event: 'virtualPageView',
      virtualPagePath: url,
      virtualPageTitle: virtualPageTitle,
    });
  }

  public static errorService(eCategory:string, eAction:string,eLabel:string) {
    this.triggerTag({
      event: 'nmv.Error',           
      eCategory: eCategory,                   
      eAction: eAction,                   
      eLabel: eLabel   
    });
  }


  public static buscarVuelosHoteles(url: string) {
    this.triggerTag({
      event: 'nmv.vuelosHoteles_ga_buscar',  
      nombre: '<Cod Origen>_<Cod Destino>_<Cod Clase>', //Ejemplo: LIM_CUN_EC
      origen: '<Origen Seleccionado>', //Ejemplo: Lima, Perú
      destino: '<Destino Seleccionado>', //Ejemplo: Cancún, México
      clase: '<Clase de Vuelo>',
      numPasajeros: '<Cantidad Total Pasajeros>', // Integer
      adultos: '<Número de pasajeros Adultos>', // Integer
      ninos: '<Número de pasajeros Niños>', // Integer
      infantes: '<Número de pasajeros Infantes>', // Integer
      habitaciones: '<Número total de Habitaciones>', // Integer
      fechaSalida: '<Fecha de Salida>',
      fechaRegreso: '<Fecha de Regreso>',
      diasAnticipacion:  '<Días de anticipación>', 
      duracionViaje:  '<Duración del viaje>', 
      eCategory: 'Vertical Vuelos + Hoteles',
      eAction: 'Buscar V+H',
      eLabel: '<Nombre del Widget>' 
    });
  }



  // public static consultaVuelosHoteles(url: string) {
  //   const virtualPageTitle = 'NMV ' + routerToCapitalice(url);

  //   this.triggerTag({
  //     event: 'nmv.vuelosHoteles_ga_buscar',
  //     virtualPagePath: url,
  //     virtualPageTitle: virtualPageTitle,
  //   });
  // }
}
