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
import { SecureBookingService } from 'src/app/Services/secureBooking/secure-booking.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneratePayService } from 'src/app/Services/generatePay/generate-pay.service';

@NgModule({
  declarations: [ ComprarComponent ],
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
  ],
  exports: [ ComprarComponent ],
  providers: [SecureBookingService, GeneratePayService]
})
export class ComprarModule { }
