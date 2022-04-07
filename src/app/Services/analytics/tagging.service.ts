import { Injectable } from '@angular/core';
import {  routerToCapitalice } from 'src/app/shared/utils';
import { ModelTaggingActividades, ModelTaggingHoteles, ModelTaggingVuelos, ModelTaggingVuelosHoteles } from './tagging.models';

@Injectable({ providedIn: 'root' })
export class TaggingService {
  constructor() {}

  public static triggerTag(datos: any) {
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

  public static buscarVuelosHoteles(modelTaggingVuelosHoteles: ModelTaggingVuelosHoteles) {
    this.triggerTag(modelTaggingVuelosHoteles);
  }

  public static buscarHoteles(modelTaggingVuelosHoteles: ModelTaggingHoteles) {
    this.triggerTag(modelTaggingVuelosHoteles);
  }

  public static buscarVuelos(modelTaggingVuelos: ModelTaggingVuelos) {
    this.triggerTag(modelTaggingVuelos);
  }
  
  public static buscarActividades(modelTaggingActividades: ModelTaggingActividades) {
    this.triggerTag(modelTaggingActividades);
  }



}
