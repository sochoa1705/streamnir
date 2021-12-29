import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinosComponent } from './destinos.component';
import { MaterialModule } from '../../../../../../shared/material.module';
import { TabsModule } from '../../../../../../shared/components/tabs/tabs.module';
import { DestinosService } from './services/destinos.service';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DestinosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TabsModule,
  ],
  exports: [
    DestinosComponent
  ],
  providers:[DestinosService]
})
export class DestinosModule { }
