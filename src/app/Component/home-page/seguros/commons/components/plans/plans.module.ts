import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { CardModule } from 'src/app/shared/components/card/card.module';
@NgModule({
  declarations: [ PlansComponent ],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports: [ PlansComponent ],

})
export class PlansModule { }
