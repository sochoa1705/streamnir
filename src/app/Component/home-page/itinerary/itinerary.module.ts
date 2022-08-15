import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryComponent } from './itinerary.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DisplayOrderPipe } from '../resultados/pipes/display-order-by.pipe';
import { FilterResultModule } from 'src/app/shared/components/filter-result/filter-result.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { FilterTabsModule } from 'src/app/shared/components/filter-tabs/filter-tabs.module';
import { FareBreakPipe } from '../resultados/pipes/fare-break-downs.pipe';




@NgModule({
  declarations: [
    ItineraryComponent
  ],
  imports: [
    CommonModule,
    FilterResultModule,
    FilterModule,
    MaterialModule,
    FormsModule,
    FilterTabsModule,
    PipesModule
  ],
  exports: [ItineraryComponent],
  providers: [FareBreakPipe]
})
export class ItineraryModule { }
