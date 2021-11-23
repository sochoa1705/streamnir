import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConformidadComponent } from './conformidad.component';
import { CoverageModule } from 'src/app/shared/components/coverage/coverage.module';
import { HttpClientModule } from '@angular/common/http';
import { SecureBookingService } from 'src/app/Services/secureBooking/secure-booking.service';
import { GeneratePayService } from 'src/app/Services/generatePay/generate-pay.service';
import { RouterModule } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ConformidadComponent ],
  imports: [
    CommonModule,
    CoverageModule,
    RouterModule,
    HttpClientModule,
    CountdownModule,
  ],
  exports: [ ConformidadComponent ],
  providers: [SecureBookingService, GeneratePayService]
})
export class ConformidadModule { }
