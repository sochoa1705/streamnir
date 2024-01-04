import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanalesAtencionRoutingModule } from './canales-atencion-routing.module';
import { CanalesAtencionComponent } from './canales-atencion.component';


@NgModule({
  declarations: [
    CanalesAtencionComponent
  ],
  imports: [
    CommonModule,
    CanalesAtencionRoutingModule
  ]
})
export class CanalesAtencionModule { }
