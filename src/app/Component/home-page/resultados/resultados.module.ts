import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosComponent } from './resultados.component';
import { FilterResultModule } from 'src/app/shared/components/filter-result/filter-result.module';
import { FlightsModule } from 'src/app/shared/components/flights/flights.module';



@NgModule({
  declarations: [ ResultadosComponent ],
  imports: [
    CommonModule,
    FilterResultModule,
    FlightsModule,
  ],
  exports: [ ResultadosComponent ],

})
export class ResultadosModule { }
