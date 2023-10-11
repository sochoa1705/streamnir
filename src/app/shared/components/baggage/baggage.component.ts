import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GlobalComponent } from '../../global';
import { CheckoutService } from 'src/app/api/api-checkout/services/checkout.service';

@Component({
	selector: 'app-baggage',
	templateUrl: './baggage.component.html',
	styleUrls: ['./baggage.component.scss']
})
export class BaggageComponent implements OnInit {
	@Input() type: String = 'backpack';
	@Input() active = true;
	title = '';
	description = '';
	img = '';

	constructor(private _checkoutService: CheckoutService) {
    this._checkoutService.selectUpSell.subscribe({
      next: () => {
        this.changeBaggage();
      }
    });
  }
 
	ngOnInit() {
		this.changeBaggage();
	}
	changeBaggage() {
    if(GlobalComponent.upSellSeleted){
      if(this.type == 'hand-luggage') this.active=GlobalComponent.upSellSeleted?.includeHandBag || false;
      if(this.type == 'hold-luggage') this.active=GlobalComponent.upSellSeleted?.includesHoldBag || false;
    }
		switch (this.type) {
			case 'backpack':
				this.title = 'Incluye una mochila o cartera';
				this.description = 'Debe caber bajo el asiento delantero';
				this.img = `./assets/svg/${this.active ? '' : 'no-'}backpack.svg`;
				break;
			case 'hand-luggage':
				this.title = 'Incluye un equipaje de mano';
				this.description = 'Debe caber en el compartimiento superior del avión.';
				this.img = `./assets/svg/${this.active ? '' : 'no-'}hand-luggage.svg`;
				break;
			default:
				this.title = 'Incluye equipaje de bodega';
				this.description = 'No debe superar unas medidas de 158cm lineales y 23 kilos.';
				this.img = `./assets/svg/${this.active ? '' : 'no-'}hold-luggage.svg`;
				break;
		}
		if (!this.active) {
			this.title = 'No ' + this.title.toLowerCase();
		}
	}
}
