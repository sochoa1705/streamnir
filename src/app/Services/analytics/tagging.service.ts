import { Injectable } from '@angular/core';
import { routerToCapitalice } from 'src/app/shared/utils';

export interface ITaggingTrigger {
  event: string;
  virtualPagePath: string;
  virtualPageTitle: string;
}

@Injectable({ providedIn: 'root' })
export class TaggingService {
  constructor() {}

  public static triggerTag(datos: ITaggingTrigger) {
    const dataLayer = (<any>(<any>window)).dataLayer || [];
    const shot = {
      event: datos.event,
      virtualPagePath: datos.virtualPagePath,
      virtualPageTitle: datos.virtualPageTitle,
    };

    dataLayer.push(shot);
  }

  public static pageView(url: string) {
    const virtualPageTitle = 'NMV ' + routerToCapitalice(url);

    this.triggerTag({
      event: 'virtualPageView',
      virtualPagePath: url,
      virtualPageTitle: virtualPageTitle,
    });
  }
}
