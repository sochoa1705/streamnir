import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/api/api-tickets/services';
import { Guid } from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: [ './activity.component.scss' ]
})
export class ActivityComponent implements OnInit, AfterViewInit {
	@Input() city: any;
	@Input() site: any;
	@Input() isFlight: any;

	tickets: Array<any>;

	tileConfig: NguCarouselConfig = {
		grid: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, all: 0 },
		speed: 500,
		point: { visible: false },
		load: 3,
		touch: false,
		loop: false,
		easing: 'cubic-bezier(0, 0, 0.2, 1)'
	};

	carouselConfig: NguCarouselConfig = {
		grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
		speed: 250,
		point: { visible: true, hideOnSingleSlide: true },
		touch: true,
		loop: true,
		interval: { timing: 3000 },
		animation: 'lazy'
	};

	constructor(private _ticketsService: TicketsService,
	            private _activatedRoute: ActivatedRoute,
	            private _cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe(params => {
			let city: string = this.city || params.city;
			let site: string = this.site || params.site;
			let isFlight: boolean = this.isFlight === undefined ? params.isflight : this.isFlight;
			this.getAllTickets(city, site, isFlight);
		});
	}

	ngAfterViewInit() {
		this._cdr.detectChanges();
	}

	getAllTickets(city: string, site: string, isFlight: boolean) {
		this._ticketsService.v1ApiTicketsGet({
			'Parameter.Country': 'PE',
			'Parameter.City': city,
			'Parameter.Site': site,
			'Parameter.IsFlight': isFlight,
			TrackingCode: Guid(),
			MuteExceptions: environment.muteExceptions,
			'Caller.Company': 'Expertia',
			'Caller.Application': 'NMViajes'
		}).subscribe((res: any) => {
			this.tickets = JSON.parse(res).Result;
		});
	}
}
