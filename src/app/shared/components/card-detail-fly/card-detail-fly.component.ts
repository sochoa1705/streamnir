import { Component, Input, OnInit } from '@angular/core';
import { Departure } from 'src/app/api/api-checkout/models/rq-checkout-search';

@Component({
    selector: 'app-card-detail-fly',
    templateUrl: './card-detail-fly.component.html',
    styleUrls: ['./card-detail-fly.component.scss']
})

export class CardDetailFlyComponent implements OnInit {
    constructor() { }
    @Input() item:Departure; // Return ambos tienen la misma estrcutura
    @Input() totalADT=0;
    @Input() totalCNN=0;
    @Input() totalINF=0;
    @Input() classFligh='';
    @Input() nameUpSellSelect='';
    @Input() indexSegment=0;
    showDropdown=false;

    ngOnInit() {}

    calcDurationScale(previousDate:string, currentDate:string){
        const start:any = new Date(previousDate);
        const end:any = new Date(currentDate);
        let differenceInMilliseconds = end - start;

        let hours = Math.floor(differenceInMilliseconds / 3600000); // 1 hora = 3600000 milisegundos
        differenceInMilliseconds %= 3600000;
        let minutes = Math.floor(differenceInMilliseconds / 60000); // 1 minuto = 60000 milisegundos
        
        return `${hours}h ${minutes < 9 ? '0' + minutes:minutes}m`;
    }
}