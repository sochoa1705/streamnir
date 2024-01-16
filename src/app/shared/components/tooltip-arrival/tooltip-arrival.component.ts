import { Component, Input, OnInit } from '@angular/core';
import { Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';

@Component({
  selector: 'app-tooltip-arrival',
  templateUrl: './tooltip-arrival.component.html',
  styleUrls: ['./tooltip-arrival.component.scss']
})
export class TooltipArrivalComponent implements OnInit {
  @Input() isRight=true;
  @Input() segment:Segment; 
  isHover=false;
  constructor() { }

  ngOnInit(): void {
  }

}
