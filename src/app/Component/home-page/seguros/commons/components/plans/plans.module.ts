import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { CoverageService } from 'src/app/Services/coverage/coverage.service';
@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports: [PlansComponent],
  providers: [CoverageService]
})
export class PlansModule { }
