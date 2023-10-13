import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPipe } from '../../pipes/format-day.pipe';
import { TooltipArrivalComponent } from './tooltip-arrival.component';
import { GetDaysPipe } from '../../pipes/get-days.pipe';

@NgModule({
  declarations: [FormatPipe, TooltipArrivalComponent,GetDaysPipe],
  imports: [CommonModule],
  exports: [TooltipArrivalComponent],
})
export class ToolTipArrivalModule { }
