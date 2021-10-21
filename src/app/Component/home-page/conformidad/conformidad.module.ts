import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConformidadComponent } from './conformidad.component';
import { CoverageModule } from 'src/app/shared/components/coverage/coverage.module';
import { HttpClientModule } from '@angular/common/http';
import { SecureBookingService } from 'src/app/Services/secureBooking/secure-booking.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ ConformidadComponent ],
  imports: [
    CommonModule,
    CoverageModule,
    HttpClientModule,
  ],
  exports: [ ConformidadComponent ],
  providers: [SecureBookingService]
})
export class ConformidadModule { }
