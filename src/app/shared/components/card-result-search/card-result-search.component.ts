import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Group, Segment } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { ModalFlightDetailComponent } from './modal-flight-detail/modal-flight-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ModalPriceMobileComponent } from './modal-price-mobile/modal-price-mobile.component';
interface Filter {
	arrayAirline: string[];
	arrayBaggage: string[];
	arrayScales: string[];
	minPrice: number;
	maxPrice: number;
	isMultiticket: boolean;
	isPrices: boolean;
	isDurationDeparture: boolean;
	isDurationReturn: boolean;
}
@Component({
	selector: 'app-card-result-search',
	templateUrl: './card-result-search.component.html',
	styleUrls: ['./card-result-search.component.scss']
})
export class CardResultSearchComponent implements OnInit, OnChanges {
	@Input() flight: Group;
	@Input() currency = 'USD';
	@Input() sortBy = 0;
	@Input() filters:Filter;
	@Input() idCheap:string;
	@Input() idBest:string;

	constructor(private _modalService: NgbModal) {}
	indexSegmentDeparture: number[];
	indexSegmentReturn: number;

	segmentDeparture: number[];
	segmentReturn: number;

	showHoursDeparture = false;
	showHoursReturn = false;

	indexHoverReturn: number;
	indexHoverDeparture: number;

	ngOnInit() {
		
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['flight']) {
			if (changes['flight'].currentValue) {
				if (this.flight.returns) {
					this.segmentReturn = this.flight.returns.segments[0].segmentId;
					this.indexSegmentReturn = 0;
				}

				if (this.flight.departure) {
					this.segmentDeparture = this.flight.departure.map((item) => item.segments[0].segmentId);
					this.indexSegmentDeparture = new Array(this.flight.departure.length).fill(0);
				}
			}
		}
		if (changes['sortBy']) {
			this.sortSegments();
		}
	}

	sortSegments() {
		this.showHoursDeparture = false;
		this.showHoursReturn = false;
		if (this.flight.returns) {
			const index =
				this.sortBy == 2
					? this.findIndexFlightDuration(this.flight.returns.segments)
					: this.sortBy == 0 || this.sortBy == 1
					? 0
					: this.findIndexMoreOption(this.flight.returns.segments);
			this.segmentReturn = this.flight.returns.segments[index].segmentId;
			this.indexSegmentReturn = index;
		}

		if (this.flight.departure) {
			if (this.sortBy == 0 || this.sortBy == 1) {
				this.segmentDeparture = this.flight.departure.map((item) => item.segments[0].segmentId);
				this.indexSegmentDeparture = new Array(this.flight.departure.length).fill(0);
			} else {
				const arraySegments: number[] = [];
				const arrayIndex: number[] = [];
				this.flight.departure.forEach((departure) => {
					const index =
						this.sortBy == 2
							? this.findIndexFlightDuration(departure.segments)
							: this.findIndexMoreOption(departure.segments);
					arraySegments.push(departure.segments[index].segmentId);
					arrayIndex.push(index);
				});
				this.segmentDeparture = arraySegments;
				this.indexSegmentDeparture = arrayIndex;
			}
		}
	}

	findIndexFlightDuration(segments: Segment[]) {
		let lowestDuration = Number.POSITIVE_INFINITY;
		let lowestDurationIndex = -1;

		for (let i = 0; i < segments.length; i++) {
			const currentDuration = segments[i].flightDurationMin || 0;

			if (currentDuration < lowestDuration) {
				lowestDuration = currentDuration;
				lowestDurationIndex = i;
			}
		}
		return lowestDurationIndex;
	}

	findIndexMoreOption(segments: Segment[]) {
		let indexDateSort = this.sortBy >= 3 && this.sortBy <= 6 ? 0 : 1;
		let dateOrderConverted = '';
		const key =
			this.sortBy == 3 || this.sortBy == 4 || this.sortBy == 7 || this.sortBy == 8 ? 'startDateTime' : 'endDateTime';
		if (this.flight.dateOrder) {
			switch (this.sortBy) {
				case 3:
				case 7:
					dateOrderConverted = this.convertDateToSegmentDate(this.flight.dateOrder[indexDateSort].dateEarlyDep);
					break;
				case 4:
				case 8:
					dateOrderConverted = this.convertDateToSegmentDate(this.flight.dateOrder[indexDateSort].dateLaterDep);
					break;
				case 5:
				case 9:
					dateOrderConverted = this.convertDateToSegmentDate(this.flight.dateOrder[indexDateSort].dateEarlyArr);
					break;
				default:
					dateOrderConverted = this.convertDateToSegmentDate(this.flight.dateOrder[indexDateSort].dateLaterArr);
					break;
			}
		}

		const indexSegment = segments.findIndex((segment) => segment[key] == dateOrderConverted);
		return indexSegment == -1 ? 0 : indexSegment;
	}

	changeSegmentDeparture(index: number, indexSegment: number, idSegment: number) {
		this.indexSegmentDeparture[index] = indexSegment;
		this.segmentDeparture[index] = idSegment;
	}

	changeSegmentReturn(index: number, idSegment: number) {
		this.indexSegmentReturn = index;
		this.segmentReturn = idSegment;
	}

	hoverSegmentReturn(index: number, type: string) {
		this.indexHoverReturn = type == 'enter' ? index : -1;
	}

	hoverSegmentDeparture(index: number, type: string) {
		this.indexHoverDeparture = type == 'enter' ? index : -1;
	}

	convertDateToSegmentDate(date: any) {
		const dateSort = new Date(date);
		const momentDate = moment(dateSort);
		return momentDate.format('YYYY-MM-DDTHH:mm:ss');
	}

	openModalDetail() {
		const modalRef = this._modalService.open(ModalFlightDetailComponent, {
			centered: true,
			backdrop: 'static',
			windowClass: 'modal-detail-flight'
		});

		modalRef.componentInstance.flight = this.flight;
		modalRef.componentInstance.segmentDeparture = this.segmentDeparture;
		modalRef.componentInstance.segmentReturn = this.segmentReturn;
		modalRef.componentInstance.indexSegmentDeparture = this.indexSegmentDeparture;
		modalRef.componentInstance.indexSegmentReturn = this.indexSegmentReturn;
		modalRef.componentInstance.currency = this.currency;
		if (this.flight.detailPricing) modalRef.componentInstance.detailPricing = this.flight.detailPricing;
	}

	openModalDetailPriceMobile(){
		const modalRef = this._modalService.open(ModalPriceMobileComponent,{
			centered: true,
			backdrop: 'static',
		})
		modalRef.componentInstance.flight=this.flight;
		modalRef.componentInstance.currency=this.currency;
	}
}
