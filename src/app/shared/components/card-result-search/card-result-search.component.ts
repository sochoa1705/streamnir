import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group, IDetailPricing } from 'src/app/api/api-checkout/models/rq-checkout-search';
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
    @Input() currency='USD';

    constructor(public _matDialog: MatDialog) { }
    indexSegmentDeparture:number[];
    indexSegmentReturn:number;

    segmentDeparture:number[];
    segmentReturn:number;

    showHoursDeparture=false;
    showHoursReturn=false;

    indexHoverReturn:number;
    indexHoverDeparture:number;
    detailPricing:IDetailPricing;

    modalDialogRef: MatDialogRef<ModalFlightDetailComponent>;
    ngOnInit() { 
    }

    ngOnChanges(changes: SimpleChanges){
        if (changes['flight']) {
			if(changes['flight'].currentValue){
                if(this.flight.returns) {
                    this.segmentReturn=this.flight.returns.segments[0].segmentId;
                    this.indexSegmentReturn=0;
                }

                if( this.flight.departure){
                    this.segmentDeparture = this.flight.departure.map(item=>item.segments[0].segmentId);
                    this.indexSegmentDeparture = new Array(this.flight.departure.length).fill(0);
                }

                if(this.flight.detailPricing){
                    this.detailPricing=this.flight.detailPricing;
                }
            }
		}
    }

    changeSegmentDeparture(index:number, indexSegment:number, idSegment:number){
        this.indexSegmentDeparture[index]=indexSegment;
        this.segmentDeparture[index]=idSegment;
        console.log(this.segmentDeparture)
    }

    changeSegmentReturn(index:number, idSegment:number){
        this.indexSegmentReturn=index;
        this.segmentReturn=idSegment;
        console.log(this.segmentReturn)
    }

    hoverSegmentReturn(index:number, type:string){
        this.indexHoverReturn = type=='enter' ? index:-1;
    }

    hoverSegmentDeparture(index:number, type:string){
        this.indexHoverDeparture = type=='enter' ? index:-1;
    }

    openModalDetail(){
        this.modalDialogRef = this._matDialog.open(ModalFlightDetailComponent, {
			disableClose: true,
            panelClass: 'custom-dialog-flight'
		});
		this.modalDialogRef.componentInstance.flight = this.flight;
        this.modalDialogRef.componentInstance.segmentDeparture=this.segmentDeparture;
        this.modalDialogRef.componentInstance.segmentReturn=this.segmentReturn;
        this.modalDialogRef.componentInstance.indexSegmentDeparture=this.indexSegmentDeparture;
        this.modalDialogRef.componentInstance.indexSegmentReturn=this.indexSegmentReturn;
        this.modalDialogRef.componentInstance.detailPricing=this.detailPricing;

		this.modalDialogRef.afterClosed().subscribe((result) => {
			if (result !== true) {
				console.log('close modal not x')
			}
		});
    }

}