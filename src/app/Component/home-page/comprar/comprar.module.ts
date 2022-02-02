import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprarComponent } from './comprar.component';
import { CustomersModule } from 'src/app/shared/components/customers/customers.module';
import { CardOfferModule } from 'src/app/shared/components/card-offer/card-offer.module';
import { FilterModule } from 'src/app/shared/components/filter/filter.module';
import { FiltersafeModule } from 'src/app/shared/components/filtersafe/filtersafe.module';
import { CoverageModule } from 'src/app/shared/components/coverage/coverage.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FiltroDetallePipe } from './pipes/filtro-detalle.pipe';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { HoraPipe } from './pipes/hora.pipe';
import { ModalsModule } from 'src/app/shared/components/modals/modals.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';
import { ReservaVuelosService } from '../../../Services/reservaVuelos/reserva-vuelos.service';

@NgModule({
  declarations: [ ComprarComponent,FiltroDetallePipe,HoraPipe ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomersModule,
    CardOfferModule,
    FilterModule,
    FiltersafeModule,
    CoverageModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    DirectivesModule,
    ModalsModule
  ],
  exports: [ ComprarComponent ],
  providers: [LoaderSubjectService, ReservaVuelosService]
})
export class ComprarModule { }
