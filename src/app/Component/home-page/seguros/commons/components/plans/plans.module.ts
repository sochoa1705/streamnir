import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { CoverageService } from 'src/app/Services/coverage/coverage.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    CardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [PlansComponent],
  providers: [CoverageService]
})
export class PlansModule { }
