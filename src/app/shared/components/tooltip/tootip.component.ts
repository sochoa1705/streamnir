import { Component, Input, OnInit } from '@angular/core';
import { Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';


@Component({
    selector: 'app-tooltip',
    templateUrl: './tootip.component.html',
    styleUrls: [ './tootip.component.scss' ]
})

export class ToolTipComponent implements OnInit {
    @Input() isTop=false;
    @Input() text='';
    @Input() isHandLuggage=false;
    @Input() isHoldLuggage=false;
    @Input() isRight=true;
    isHover=false;
    
    constructor() { }

    ngOnInit() { }
}