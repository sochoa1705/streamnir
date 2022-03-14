import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosComponent } from './resultados.component';
import { FilterResultModule } from 'src/app/shared/components/filter-result/filter-result.module';
import { FlightsModule } from 'src/app/shared/components/flights/flights.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { ResultadosService } from './services/resultados.service';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { FareBreakPipe } from './pipes/fare-break-downs.pipe';
import { DisplayOrderPipe } from './pipes/display-order-by.pipe';
import { FilterTabsModule } from 'src/app/shared/components/filter-tabs/filter-tabs.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [ ResultadosComponent,DisplayOrderPipe ],
  imports: [
    CommonModule,
    FilterResultModule,
    FlightsModule,
    FilterModule,
    MaterialModule,
    FormsModule,
    FilterTabsModule,
    PipesModule
  ],
  exports: [ ResultadosComponent ],
  providers:[ResultadosService,FareBreakPipe]

})
export class ResultadosModule { }
