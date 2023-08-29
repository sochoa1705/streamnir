import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group, ISearchResponse } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { SearchService } from 'src/app/api/api-nmviajes/services/search.service';
import { TokenService } from 'src/app/api/api-nmviajes/services/token.service';
import { GlobalComponent } from 'src/app/shared/global';
import { getParams } from 'src/app/shared/utils/getParams';
import { environment } from 'src/environments/environment';
import { dataAirlineMulti, dataBagFilterInit, dataFiltersInit, dataScaleFilterInit } from './utils';
import { getPricingFareBreakDowns } from 'src/app/shared/utils/fareBreakDowns';
import { LoadingService } from 'src/app/Services/intermediary/loading.service';
import { getMoreOptionsFilter } from 'src/app/shared/utils/getMoreOptionsFilter';
import { getDatesBySegment } from 'src/app/shared/utils/getDatesBySort';

interface Item {
	value: any;
	name: string;
	active: boolean;
	total: number;
}

interface Filter {
	arrayAirline: string[];
	arrayBaggage: string[];
	arrayScales: string[];
	isMultiticket: boolean;
}

interface Order {
	price: number;
	duration: number;
}

interface IOption {
	value: number;
	nameOption: string;
	nameSeleted: string;
	subNameSeled: string;
}

@Component({
	selector: 'app-results-search-page',
	templateUrl: './results-search-page.component.html',
	styleUrls: ['./results-search-page.component.scss']
})
export class ResultsSearchPageComponent implements OnInit {
	constructor(
		private _searchService: SearchService,
		private _tokenService: TokenService,
		private route: ActivatedRoute,
		private _loadingService: LoadingService
	) {}

	allDataGroups: Group[] = [];
	dataGroupsPaginate: Group[] = [];
	dataFilterGroups: Group[] = [];
	dataPreviewFilter: Group[] = [];

	indexPaginate = 8;
	dataBagFilter: Item[] = [];
	dataScaleFilter: Item[] = [];
	dataAirlines: Item[] = [];
	dataAirlinesTemp: Item[] = [];
	filters: Filter = dataFiltersInit;
	exchangeRate = 0;
	currency = 'USD';

	theCheapest: Order;
	betterOption: Order;
	shorterDuration: Order;

	arrayMoreOptionsSort: IOption[] = [];

	totalMultiticket = 0;
	sortBy = 0;

	ngOnInit() {
		this.getToken();
		this.dataBagFilter = dataBagFilterInit.map((item) => {
			item.total = 0;
			return item;
		});
		this.dataScaleFilter = dataScaleFilterInit.map((item) => {
			item.total = 0;
			return item;
		});
		this.dataAirlines = [];
		this.dataAirlinesTemp = [];
		this._loadingService.requestSearchCount = 0;
	}

	getToken() {
		this._tokenService.getAndSaveToken('Chrome').subscribe({
			next: (response) => {
				GlobalComponent.tokenMotorVuelo = response.accessToken;
				GlobalComponent.appReglasVentaAnticipada = response.reglasVentaAnticipada;
				GlobalComponent.appConfigurations = response.configuraciones;
				this.getObjectParams();
			}
		});
	}

	getObjectParams() {
		this.route.queryParamMap.subscribe((params) => {
			const objParams = getParams(params);
			this.arrayMoreOptionsSort = getMoreOptionsFilter(objParams);
			if (environment.urlApiMotorVuelos.includes('qa')) this.getAllDataSearch(objParams);
			else this.getAllDataAnterior(objParams);
		});
	}

	getAllDataSearch(objSearch: any) {
		this._searchService.getAllDataSearch(objSearch).subscribe({
			next: (res) => {
				this._loadingService.requestSearchCount++;
				if (res.groups) {
					if (this.exchangeRate == 0) this.exchangeRate = res.exchangeRate.amount;
					this.getDataFilters(res);
					if (this._loadingService.requestSearchCount == 9) {
						this.endsearch();
					}
				}
				if (!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate = res.exchangeRate;
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	endsearch() {
		this._searchService.endSearch().subscribe({
			next: (res) => {
				console.log(res, 'end Results');
			},
			error: (err) => {
				alert('Error');
			}
		});
	}

	getAllDataAnterior(objSearch: any) {
		this._searchService.getAllDataGroups(objSearch).subscribe({
			next: (res) => {
				this._loadingService.requestSearchCount = 9;
				this.exchangeRate = res.exchangeRate.amount;
				this.getDataFilters(res);
				if (!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate = res.exchangeRate;
			},
			error: (err) => {
				console.log(err, 'err');
			}
		});
	}

	getDataFilters(res: ISearchResponse) {
		res.airlinesFilter.forEach((item) => {
			if (!this.dataAirlinesTemp.some((airline) => airline.value == item.code)) {
				this.dataAirlinesTemp.push({
					value: item.code,
					name: item.name,
					active: false,
					total: 0
				});
			}
		});

		res.groups.forEach((item) => {
			const codeMarketing = item.departure[0].segments[0].flightSegments[0].marketingAirline.code;
			const isAllCodeMarketing =
				item.departure.every(
					(departure) => departure.segments[0].flightSegments[0].marketingAirline.code == codeMarketing
				) && (item.returns ? item.returns.segments[0].flightSegments[0].marketingAirline.code == codeMarketing : true);

			if (isAllCodeMarketing) {
				const indexAirline = this.dataAirlinesTemp.findIndex((obj) => {
					return obj.value === codeMarketing;
				});
				if (indexAirline !== -1) this.dataAirlinesTemp[indexAirline].total++;
			}

			item.airlineCodeFilter = isAllCodeMarketing ? codeMarketing : 'MT';
			if (item.airlineCodeFilter == 'MT') this.totalMultiticket++;

			const isBagHold =
				item.departure.every((departure) => departure.segments[0].equipaje.piezas > 0) &&
				(item.returns ? item.returns.segments[0].equipaje.piezas > 0 : true);
			const isBagHand =
				item.departure.every((departure) => departure.segments[0].equipaje.cabina || false) &&
				(item.returns ? item.returns.segments[0].equipaje.cabina || false : true) &&
				!isBagHold;

			item.typeBag = isBagHold ? 'holdbag' : isBagHand ? 'handbag' : 'backpack';
			if (isBagHand) this.dataBagFilter[0].total++;
			if (isBagHold) this.dataBagFilter[1].total++;

			item.isDirect =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 0)) &&
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 0) : true);
			item.isOneScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 1)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 1) : false);
			item.isMultiScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops >= 2)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops >= 2) : false);

			if (item.isDirect) this.dataScaleFilter[0].total++;
			if (item.isOneScale) this.dataScaleFilter[1].total++;
			if (item.isMultiScale) this.dataScaleFilter[2].total++;
			item.orderByScales =
				item.isDirect && !item.isOneScale && !item.isMultiScale
					? 1
					: (item.isDirect && item.isOneScale && !item.isMultiScale) ||
					  (!item.isDirect && item.isOneScale && !item.isMultiScale)
					? 2
					: 3;
			item.detailPricing = getPricingFareBreakDowns(item.pricingInfo.itinTotalFare.fareBreakDowns);

			const durationSegments: number[] = [];

			item.departure.forEach((departure) => {
				let shortDuration = 0;
				departure.segments.forEach((segment, index) => {
					segment.flightDurationMin = this.convertFlightDurationToMin(segment.flightDuration);
					shortDuration =
						index == 0
							? segment.flightDurationMin
							: segment.flightDurationMin < shortDuration
							? segment.flightDurationMin
							: shortDuration;
				});
				durationSegments.push(shortDuration);
			});

			if (item.returns) {
				let shortDuration = 0;
				item.returns.segments.forEach((segment, index) => {
					segment.flightDurationMin = this.convertFlightDurationToMin(segment.flightDuration);
					shortDuration =
						index == 0
							? segment.flightDurationMin
							: segment.flightDurationMin < shortDuration
							? segment.flightDurationMin
							: shortDuration;
				});
				durationSegments.push(shortDuration);
			}
			item.flightDurationProm = this.calcAverageFlightDuration(durationSegments);
			item.dateOrder = [getDatesBySegment(item.departure[0].segments)];
			if (item.returns) item.dateOrder.push(getDatesBySegment(item.returns.segments));
		});
		if (this._loadingService.requestSearchCount == 9) {
			this.dataAirlinesTemp.push({ ...dataAirlineMulti, total: this.totalMultiticket });
			this.dataAirlines = this.dataAirlinesTemp;
		}
		this.allDataGroups = [...this.allDataGroups, ...res.groups];
		this.dataFilterGroups = [...this.allDataGroups];
		this.sortData();
	}

	sortData() {
		switch (this.sortBy) {
			case 0:
				this.dataFilterGroups = [...this.orderByPrincing()];
				break;
			case 1:
				this.dataFilterGroups = [...this.orderByBestOption()];
				break;
			case 2:
				this.dataFilterGroups = [...this.orderByDuration()];
				break;
			case 3:
				this.dataFilterGroups = [...this.orderByDate(true,true,0)];
				break;
			case 4:
				this.dataFilterGroups = [...this.orderByDate(false,true,0)];
				break;
			case 5:
				this.dataFilterGroups = [...this.orderByDate(true,false,0)];
				break;
			case 6:
				this.dataFilterGroups = [...this.orderByDate(false, false,0)];
				break;
			case 7:
				this.dataFilterGroups = [...this.orderByDate(true,true,1)];
				break;
			case 8:
				this.dataFilterGroups = [...this.orderByDate(false,true,1)];
				break;
			case 9:
				this.dataFilterGroups = [...this.orderByDate(true,false,1)];
				break;
			default:
				this.dataFilterGroups = [...this.orderByDate(false,false,1)];
				break;
		}
		this.dataGroupsPaginate = [...this.dataFilterGroups.slice(0, 8)];
		this.indexPaginate = 8;
		this.getValuesTabsSort();
	}

	orderByDate(isEarly:boolean, isStartDate:boolean, index:number){
		const dataFilter = [...this.dataFilterGroups];
		if(isEarly && isStartDate){ //salida  temprano x fecha inicio
			return dataFilter.slice().sort((a, b) => {
				if(a.dateOrder && b.dateOrder) return a.dateOrder[index].dateEarlyDep - b.dateOrder[index].dateEarlyDep;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			})
		}

		if(!isEarly && isStartDate){ //salida tarde x fecha inicio
			return dataFilter.slice().sort((a, b) => {
				if(a.dateOrder && b.dateOrder) return a.dateOrder[index].dateLaterDep - b.dateOrder[index].dateLaterDep;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			})
		}

		if(isEarly && !isStartDate){ //llegada  temprano x fecha fin
			return dataFilter.slice().sort((a, b) => {
				if(a.dateOrder && b.dateOrder) return a.dateOrder[index].dateEarlyArr - b.dateOrder[index].dateEarlyArr;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			})
		}

		 //llegada  tarde x fecha fin
		return dataFilter.slice().sort((a, b) => {
				if(a.dateOrder && b.dateOrder) return a.dateOrder[index].dateLaterArr - b.dateOrder[index].dateLaterArr;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
		})
		
	}

	getValuesTabsSort() {
		const groupsSortByPrice = this.orderByPrincing();

		this.theCheapest = {
			price: groupsSortByPrice[0].detailPricing?.totalPay || 0,
			duration: groupsSortByPrice[0].flightDurationProm || 0
		};

		const groupsSortByBest = this.orderByBestOption();

		this.betterOption = {
			price: groupsSortByBest[0].detailPricing?.totalPay || 0,
			duration: groupsSortByBest[0].flightDurationProm || 0
		};

		const groupsSortByDuration = this.orderByDuration();

		this.shorterDuration = {
			price: groupsSortByDuration[0].detailPricing?.totalPay || 0,
			duration: groupsSortByDuration[0].flightDurationProm || 0
		};
	}

	updateArrayAirlinesFilter($event: string[]) {
		this.filters.arrayAirline = $event;
		this.applyFilters();
	}

	changeArrayFilters($event: any) {
		const item = $event.item;
		const key = $event.key;
		switch (key) {
			case 'multiticket':
				this.filters.isMultiticket = item.active;
				break;
			case 'typeBag':
				if (item.active) this.filters.arrayBaggage.push(item.value);
				else this.filters.arrayBaggage = this.filters.arrayBaggage.filter((bag) => bag !== item.value);
				break;
			case 'airlineCodeFilter':
				if (item.active) this.filters.arrayAirline.push(item.value);
				else this.filters.arrayAirline = this.filters.arrayAirline.filter((airline) => airline !== item.value);
				break;
			default:
				if (item.active) this.filters.arrayScales.push(item.value);
				else this.filters.arrayScales = this.filters.arrayScales.filter((bag) => bag !== item.value);
				break;
		}
		this.applyFilters();
	}

	applyFilters() {
		this.dataFilterGroups = [];
		this.dataGroupsPaginate = [];
		const dataFilter = this.allDataGroups.filter(
			(item) =>
				(this.filters.isMultiticket ? item.airlineCodeFilter == 'MT' : true) &&
				(this.filters.arrayAirline.length > 0
					? this.filters.arrayAirline.includes(item.airlineCodeFilter || '')
						? true
						: false
					: true) &&
				(this.filters.arrayBaggage.length > 0
					? this.filters.arrayBaggage.includes(item.typeBag || '')
						? true
						: false
					: true) &&
				(this.filters.arrayScales.includes('isDirect') ? item.isDirect : true) &&
				(this.filters.arrayScales.includes('isOneScale') ? item.isOneScale : true) &&
				(this.filters.arrayScales.includes('isMultiScale') ? item.isMultiScale : true)
		);
		this.dataFilterGroups = [...dataFilter];
		console.log(this.dataFilterGroups);
		this.indexPaginate = 8;
		this.sortData();
	}

	changeExchangeRate($event: string) {
		this.currency = $event == 'Soles' ? 'PEN' : 'USD';
	}

	calcAverageFlightDuration(durationSegments: number[]) {
		const sum = durationSegments.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
		return sum / durationSegments.length;
	}

	convertFlightDurationToMin(duration: string) {
		const parts = duration.split('.');
		const hours = parseInt(parts[0], 10);
		const min = parseInt(parts[1], 10);
		const totalMin = hours * 60 + min;
		return totalMin;
	}

	orderByBestOption() {
		const dataFilter = [...this.dataFilterGroups];

		const groupsSortByBest = dataFilter.sort((a, b) => {
			if (a.orderByScales !== undefined && b.orderByScales !== undefined) {
				if (a.orderByScales < b.orderByScales) return -1;
				if (a.orderByScales > b.orderByScales) return 1;
			}

			if (a.detailPricing?.totalPay !== undefined && b.detailPricing?.totalPay !== undefined) {
				if (a.detailPricing?.totalPay < b.detailPricing?.totalPay) return -1;
				if (a.detailPricing?.totalPay > b.detailPricing?.totalPay) return 1;
			}

			if (a.flightDurationProm !== undefined && b.flightDurationProm !== undefined) {
				if (a.flightDurationProm < b.flightDurationProm) return -1;
				if (a.flightDurationProm > b.flightDurationProm) return 1;
			}
			return 0;
		});

		return groupsSortByBest;
	}

	orderByDuration() {
		const dataFilter = [...this.dataFilterGroups];
		dataFilter.sort((a, b) => {
			if (a.flightDurationProm && b.flightDurationProm) return a.flightDurationProm - b.flightDurationProm;
			if (!a.flightDurationProm) return 1;
			if (!b.flightDurationProm) return -1;
			return 0;
		});
		return dataFilter;
	}

	orderByPrincing() {
		const dataFilter = [...this.dataFilterGroups];
		dataFilter.sort((a, b) => {
			if (a.detailPricing && b.detailPricing) return a.detailPricing.totalPay - b.detailPricing.totalPay;
			if (!a.detailPricing) return 1;
			if (!b.detailPricing) return -1;
			return 0;
		});
		return dataFilter;
	}

	showMoreResults() {
		this.indexPaginate = this.indexPaginate + 8;
		this.dataGroupsPaginate = [
			...this.dataGroupsPaginate,
			...this.dataFilterGroups.slice(this.dataGroupsPaginate.length, this.indexPaginate)
		];
	}
	clickTabSort($event: any) {
		this.sortBy = $event;
		this.sortData();
	}
}
