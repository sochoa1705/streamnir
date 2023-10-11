import { Component, Input, OnInit } from '@angular/core';
import { Departure } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';
import { GlobalComponent } from '../../global';

@Component({
    selector: 'app-card-detail-fly',
    templateUrl: './card-detail-fly.component.html',
    styleUrls: ['./card-detail-fly.component.scss']
})

export class CardDetailFlyComponent implements OnInit {
    constructor(private _checkoutService: CheckoutService) {
        this._checkoutService.selectUpSell.subscribe({
			next: () => {
               this.changeBaggage();
			}
		});
    }
    @Input() item:Departure; // Return ambos tienen la misma estrcutura
    @Input() totalADT=0;
    @Input() totalCNN=0;
    @Input() totalINF=0;
    @Input() classFligh='';
    @Input() nameUpSellSelect='';
    @Input() indexSegment=0;
    showDropdown=false;
    includeHandLuggage=false; 
    includeHoldLuggage=false;
    
    ngOnInit() {
        if(GlobalComponent.upSellSeleted) this.changeBaggage(); 
        else{
            this.includeHandLuggage=this.item.segments[this.indexSegment].equipaje?.cabina ? true : false || false;
            this.includeHoldLuggage=this.item.segments[this.indexSegment].equipaje?.piezas ?? 0 > 0 ? true : false || false;
        }
    }

    changeBaggage(){
        const upsell=GlobalComponent.upSellSeleted;
        this.includeHandLuggage=upsell?.includeHandBag || false;
        this.includeHoldLuggage=upsell?.includesHoldBag || false;
    }

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