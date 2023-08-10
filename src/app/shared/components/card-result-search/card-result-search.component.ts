import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { getPricingFareBreakDowns } from '../../utils/fareBreakDowns';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalFlightDetailComponent } from './modal-flight-detail/modal-flight-detail.component';

@Component({
    selector: 'app-card-result-search',
    templateUrl: './card-result-search.component.html',
    styleUrls: ['./card-result-search.component.scss']
})

export class CardResultSearchComponent implements OnInit, OnChanges {
    @Input() flight:Group;
    constructor(public _matDialog: MatDialog) { }
    indexSegmentDeparture:number[];
    indexSegmentReturn:number;
    showHoursDeparture=false;
    showHoursReturn=false;

    indexHoverReturn:number;
    indexHoverDeparture:number;
    detailPricing:any;

    modalDialogRef: MatDialogRef<ModalFlightDetailComponent>;
    ngOnInit() { 
    }

    ngOnChanges(changes: SimpleChanges){
        if (changes['flight']) {
			if(changes['flight'].currentValue){
                if(this.flight.returns) this.indexSegmentReturn=0;
                this.indexSegmentDeparture = new Array(this.flight.departure.length).fill(0);
                this.detailPricing=getPricingFareBreakDowns(this.flight.pricingInfo.itinTotalFare.fareBreakDowns);
            }
		}
    }

    changeSegmentDeparture(index:number, indexSegment:number){
        this.indexSegmentDeparture[index]=indexSegment;
    }

    changeSegmentReturn(index:number){
        this.indexSegmentReturn=index;
    }

    hoverSegmentReturn(index:number, type:string){
        this.indexHoverReturn = type=='enter' ? index:-1;
    }

    hoverSegmentDeparture(index:number, type:string){
        this.indexHoverDeparture = type=='enter' ? index:-1;
    }

    openModalDetail(){
        this.modalDialogRef = this._matDialog.open(ModalFlightDetailComponent, {
			disableClose: true
		});
		this.modalDialogRef.componentInstance.flight = this.flight;
        this.modalDialogRef.componentInstance.segmentDeparture=this.indexSegmentDeparture;
        this.modalDialogRef.componentInstance.segmentReturn=this.indexSegmentReturn;
        this.modalDialogRef.componentInstance.detailPricing=this.detailPricing;

		this.modalDialogRef.afterClosed().subscribe((result) => {
			if (result !== true) {
				console.log('close modal not x')
			}
		});
    }

}