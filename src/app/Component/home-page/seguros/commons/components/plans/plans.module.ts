import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { PlansACService } from '../../../../../../Services/plansAC/plans-ac.service';
import { CoverageService } from '../../../../../../Services/coverage/coverage.service';
import { RouterModule } from '@angular/router';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
  ],
  exports: [PlansComponent],
  providers: [PlansACService, CoverageService]
})
export class PlansModule { }
