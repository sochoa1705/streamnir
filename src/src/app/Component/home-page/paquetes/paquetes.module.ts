import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaquetesComponent } from './paquetes.component';
import { PaquetesRoutingModule } from './paquetes-routing.module';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { PackagesModule } from '../packages/packages.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PaquetesComponent],
  imports: [
    CommonModule,
    PaquetesRoutingModule,
    TabsModule,
    PackagesModule
  ],
  exports: [PaquetesComponent]
})
export class PaquetesModule { }
