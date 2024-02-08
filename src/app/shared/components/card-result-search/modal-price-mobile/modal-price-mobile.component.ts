import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';

@Component({
    selector: 'app-modal-price-mobile',
    templateUrl: './modal-price-mobile.component.html',
	styleUrls: ['./modal-price-mobile.component.scss'],
})

export class ModalPriceMobileComponent implements OnInit {
    constructor(@Optional() private _activeModal?: NgbActiveModal) { }
    @Input() flight: Group;
	@Input() currency = 'USD';
    
    ngOnInit() { 

    }

    clickCloseModal(){
        if (this._activeModal) 
            this._activeModal.close();
      }
}