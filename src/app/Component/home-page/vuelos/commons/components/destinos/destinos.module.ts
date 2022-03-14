import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinosComponent } from './destinos.component';
import { MaterialModule } from '../../../../../../shared/material.module';
import { TabsModule } from '../../../../../../shared/components/tabs/tabs.module';
import { DestinosService } from './services/destinos.service';
import { ActivityComponent } from './activity/activity.component';
import { HotelsComponent } from './hotels/hotels.component';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { DestinationsComponent } from './destinations/destinations.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DestinosComponent,
    ActivityComponent,
    HotelsComponent,
    DestinationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TabsModule,
    CarouselModule,
    GalleriaModule
  ],
  exports: [
    DestinosComponent
  ],
  providers: [DestinosService]
})
export class DestinosModule { }
