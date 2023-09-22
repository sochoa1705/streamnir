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
import { SaveModelVuelos } from 'src/app/shared/components/tabs/tabs.models';
import { SearchFiltersService } from 'src/app/api/api-nmviajes/services/search-filters.service';
import { getWaitingTime } from 'src/app/shared/utils/waitingTimeScale';

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
	minPrice: number;
	maxPrice: number;
	isMultiticket: boolean;
	isPrices: boolean;
	isDurationDeparture: boolean;
	isDurationReturn: boolean;
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

interface IFilterDuration {
	minDurationDeparture: number;
	maxDurationDeparture: number;
	minDurationReturn: number;
	maxDurationReturn: number;
	waitingTimeDep: number;
	waitingTimeRet: number;
	minWaitingTimeDep: number;
	minWaitingTimeRet: number;
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
		private _loadingService: LoadingService,
		private _searchFiltersService: SearchFiltersService
	) {
		/*this.route.queryParamMap.subscribe((params) => {
			this.resetData()
			
		});*/
	}

	allDataGroups: Group[] = [];
	dataGroupsPaginate: Group[] = [];
	dataFilterGroups: Group[] = [];

	indexPaginate = 8;
	dataBagFilter: Item[] = [];
	dataScaleFilter: Item[] = [];
	dataAirlines: Item[] = [];

	dataAirlinesTemp: Item[] = [];
	dataAirlinesInit: Item[] = [];

	dataBagTemp: Item[] = [];
	dataScaleTemp: Item[] = [];

	filters: Filter;
	exchangeRate = 0;
	currency = 'USD';

	theCheapest: Order | null;
	betterOption: Order | null;
	shorterDuration: Order | null;

	arrayMoreOptionsSort: IOption[] = [];

	totalMultiticket = 0;
	sortBy = 0;

	minPrice = 0;
	maxPrice = 0;

	valuesFilterDuration: IFilterDuration;

	valuesFilterDurationInit: IFilterDuration;

	showError = false;
	showNotResults = false;
	titleNotResults = '';

	isLoader = true;
	saveModel: SaveModelVuelos;

	flightType = 0;
	idBest = '0';
	idCheap = '0';

	ngOnInit() {
		//this.resetData();
		GlobalComponent.paramsSearch = {};
		this.dataBagFilter = dataBagFilterInit.map((item) => {
			item.total = 0;
			item.active = false;
			return item;
		});
		this.dataScaleFilter = dataScaleFilterInit.map((item) => {
			item.total = 0;
			item.active = false;
			return item;
		});
		this.dataBagTemp = [...this.dataBagFilter];
		this.dataScaleTemp = [...this.dataScaleFilter];
		this.arrayMoreOptionsSort = [];
		this._loadingService.requestSearchCount = 0;

		this.valuesFilterDuration = {
			minDurationDeparture: 0,
			maxDurationDeparture: 0,
			minDurationReturn: 0,
			maxDurationReturn: 0,
			waitingTimeDep: 0,
			waitingTimeRet: 0,
			minWaitingTimeDep: 0,
			minWaitingTimeRet: 0
		};

		this.filters = {
			arrayAirline: [],
			arrayBaggage: [],
			arrayScales: [],
			minPrice: 0,
			maxPrice: 0,
			isMultiticket: false,
			isPrices: false,
			isDurationDeparture: false,
			isDurationReturn: false
		};

		this.getToken();
	}

	getToken() {
		this.showNotResults = false;
		this._tokenService.getAndSaveToken('Chrome').subscribe({
			next: (response) => {
				GlobalComponent.tokenMotorVuelo = response.accessToken;
				GlobalComponent.appReglasVentaAnticipada = response.reglasVentaAnticipada;
				GlobalComponent.appConfigurations = response.configuraciones;
				this.getObjectParams();
			},
			error: () => {
				this.isLoader = false;
				this.showError = true;
			}
		});
	}

	getObjectParams() {
		this.route.queryParamMap.subscribe((params) => {
			const objParams = getParams(params);
			this.arrayMoreOptionsSort = getMoreOptionsFilter(objParams);
			GlobalComponent.classFligh =
				objParams.flightClass == 0 ? 'Economy' : objParams.flightClass == 1 ? 'Business' : 'First Class';
			GlobalComponent.paramsSearch = { ...objParams };
			this.flightType = objParams.flightType;
			this.titleNotResults =
				objParams.flightType !== 2
					? `No encontramos vuelos coincidentes entre ${objParams.departureLocation} y ${objParams.arrivalLocation} para estas fechas.`
					: `No encontramos vuelos coincidentes para esas fechas.`;
			if (environment.urlApiMotorVuelos.includes('qa')) this.getAllDataSearch(objParams);
			else this.getAllDataAnterior(objParams);
		});
	}

	getAllDataSearch(objSearch: any) {
		this._searchService.getAllDataSearch(objSearch).subscribe({
			next: (res) => {
				this._loadingService.requestSearchCount++;
				if (res.groups) {
					this.isLoader = false;
					if (this.exchangeRate == 0) this.exchangeRate = res.exchangeRate.amount;
					this.getDataFilters(res);
				}
				if (this._loadingService.requestSearchCount == 9) {
					this.showNotResults = this.dataFilterGroups.length == 0 ? true : false;
					if (!this.showNotResults) {
						this.endsearch();
						this.minPrice = this.dataFilterGroups[0].detailPricing?.totalPay || 0;
						this.maxPrice = this.dataFilterGroups[this.dataFilterGroups.length - 1].detailPricing?.totalPay || 0;
						this.filters.minPrice = this.minPrice;
						this.filters.maxPrice = this.maxPrice;
						this.getValuesByFilterDuration();
						this.valuesFilterDurationInit = { ...this.valuesFilterDuration };
					}
				}
				if (!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate = res.exchangeRate;
			},
			error: (err) => {
				this.isLoader = false;
				this.showError = true;
			}
		});
	}

	endsearch() {
		this._searchService.endSearch().subscribe({
			next: (res) => {
				console.log(res, 'end Results gneral');
				this._searchFiltersService.isFinishGDS.emit();
			},
			error: (err) => {
				this.showError = true;
			}
		});
	}

	getAllDataAnterior(objSearch: any) {
		this._searchService.getAllDataGroups(objSearch).subscribe({
			next: (res) => {
				this._loadingService.requestSearchCount = 9;
				this.exchangeRate = res.exchangeRate.amount;
				if (!GlobalComponent.appExchangeRate) GlobalComponent.appExchangeRate = res.exchangeRate;
				if (res.groups && res.groups.length > 0) {
					this.isLoader = false;
					this.getDataFilters(res);
					this.minPrice = this.dataFilterGroups[0].detailPricing?.totalPay || 0;
					this.maxPrice = this.dataFilterGroups[this.dataFilterGroups.length - 1].detailPricing?.totalPay || 0;
					this.filters.minPrice = this.minPrice;
					this.filters.maxPrice = this.maxPrice;
					this.getValuesByFilterDuration();
					this.valuesFilterDurationInit = { ...this.valuesFilterDuration };
					this._searchFiltersService.isFinishGDS.emit();
				} else this.showNotResults = true;
			},
			error: (err) => {
				this.showError = true;
			},
			complete: () => {
				if (this.dataFilterGroups.length == 0) this.showNotResults = true;
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
				item.departure.every((departure) => departure.segments[0]?.equipaje?.piezas > 0) &&
				(!item.returns || item.returns.segments[0]?.equipaje?.piezas > 0);

			const isBagHand =
				item.departure.every((departure) => departure.segments[0]?.equipaje?.cabina || false) &&
				(!item.returns || item.returns.segments[0]?.equipaje?.cabina || false) &&
				!isBagHold;

			item.typeBag = isBagHold ? 'holdbag' : isBagHand ? 'handbag' : 'backpack';
			if (isBagHand) this.dataBagTemp[0].total++;
			if (isBagHold) this.dataBagTemp[1].total++;

			item.isDirect =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 0)) &&
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 0) : true);
			item.isOneScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops == 1)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops == 1) : false);
			item.isMultiScale =
				item.departure.some((departure) => departure.segments.some((segment) => segment.stops >= 2)) ||
				(item.returns ? item.returns.segments.some((segment) => segment.stops >= 2) : false);

			if (item.isDirect) this.dataScaleTemp[0].total++;
			if (item.isOneScale) this.dataScaleTemp[1].total++;
			if (item.isMultiScale) this.dataScaleTemp[2].total++;
			item.orderByScales =
				item.isDirect && !item.isOneScale && !item.isMultiScale
					? 1
					: (item.isDirect && item.isOneScale && !item.isMultiScale) ||
					  (!item.isDirect && item.isOneScale && !item.isMultiScale)
					? 2
					: 3;
			item.detailPricing = getPricingFareBreakDowns(item.pricingInfo.itinTotalFare.fareBreakDowns);

			const durationSegments: number[] = [];

			item.departure.forEach((departure, indexDep) => {
				let shortDuration = 0;
				let longDuration = 0;
				let waitingTime = 0;
				departure.segments.forEach((segment, index) => {
					segment.flightDurationMin = this.convertFlightDurationToMin(segment.flightDuration);
					segment.waitingTime = getWaitingTime(segment.flightSegments);
					shortDuration =
						index == 0
							? segment.flightDurationMin
							: segment.flightDurationMin < shortDuration
							? segment.flightDurationMin
							: shortDuration;
					if (indexDep == 0) {
						longDuration =
							index == 0
								? segment.flightDurationMin
								: segment.flightDurationMin > longDuration
								? segment.flightDurationMin
								: longDuration;

						waitingTime =
							index == 0 ? segment.waitingTime : segment.waitingTime > waitingTime ? segment.waitingTime : waitingTime;
						item.durationDeparture = longDuration;
						item.maxWaitingTimeDep = waitingTime;
					}
				});
				durationSegments.push(shortDuration);
			});

			if (item.returns) {
				let shortDuration = 0;
				let longDuration = 0;
				let waitingTime = 0;

				item.returns.segments.forEach((segment, index) => {
					segment.flightDurationMin = this.convertFlightDurationToMin(segment.flightDuration);
					segment.waitingTime = getWaitingTime(segment.flightSegments);
					shortDuration =
						index == 0
							? segment.flightDurationMin
							: segment.flightDurationMin < shortDuration
							? segment.flightDurationMin
							: shortDuration;
					longDuration =
						index == 0
							? segment.flightDurationMin
							: segment.flightDurationMin > longDuration
							? segment.flightDurationMin
							: longDuration;
					waitingTime =
						index == 0 ? segment.waitingTime : segment.waitingTime > waitingTime ? segment.waitingTime : waitingTime;
				});
				item.durationReturn = longDuration;
				item.maxWaitingTimeRet = waitingTime;
				durationSegments.push(shortDuration);
			}
			item.flightDurationProm = this.calcAverageFlightDuration(durationSegments);
			item.dateOrder = [getDatesBySegment(item.departure[0].segments)];
			if (item.returns) item.dateOrder.push(getDatesBySegment(item.returns.segments));
		});
		if (this._loadingService.requestSearchCount == 9)
			this.dataAirlinesTemp.push({ ...dataAirlineMulti, total: this.totalMultiticket });
		this.dataBagFilter = [...this.dataBagTemp];
		this.dataScaleFilter = [...this.dataScaleTemp];
		this.dataAirlinesTemp = this.dataAirlinesTemp.filter(airline=>airline.total>0);
		this.dataAirlines = [...this.dataAirlinesTemp];
		this.dataAirlinesInit = [...this.dataAirlinesTemp];
		this.allDataGroups = [...this.allDataGroups, ...res.groups];
		this.dataFilterGroups = [...this.allDataGroups];
		console.log(this.allDataGroups, 'seeeeeee')
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
				this.dataFilterGroups = [...this.orderByDate(true, true, 0)];
				break;
			case 4:
				this.dataFilterGroups = [...this.orderByDate(false, true, 0)];
				break;
			case 5:
				this.dataFilterGroups = [...this.orderByDate(true, false, 0)];
				break;
			case 6:
				this.dataFilterGroups = [...this.orderByDate(false, false, 0)];
				break;
			case 7:
				this.dataFilterGroups = [...this.orderByDate(true, true, 1)];
				break;
			case 8:
				this.dataFilterGroups = [...this.orderByDate(false, true, 1)];
				break;
			case 9:
				this.dataFilterGroups = [...this.orderByDate(true, false, 1)];
				break;
			default:
				this.dataFilterGroups = [...this.orderByDate(false, false, 1)];
				break;
		}
		this.dataGroupsPaginate = [...this.dataFilterGroups.slice(0, 8)];
		this.indexPaginate = 8;
		if (this.dataGroupsPaginate.length > 0) this.getValuesTabsSort();
	}

	orderByDate(isEarly: boolean, isStartDate: boolean, index: number) {
		const dataFilter = [...this.dataFilterGroups];
		if (isEarly && isStartDate) {
			//salida  temprano x fecha inicio
			return dataFilter.slice().sort((a, b) => {
				if (a.dateOrder && b.dateOrder) return a.dateOrder[index].dateEarlyDep - b.dateOrder[index].dateEarlyDep;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			});
		}

		if (!isEarly && isStartDate) {
			//salida tarde x fecha inicio
			return dataFilter.slice().sort((a, b) => {
				if (a.dateOrder && b.dateOrder) return b.dateOrder[index].dateLaterDep - a.dateOrder[index].dateLaterDep;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			});
		}

		if (isEarly && !isStartDate) {
			//llegada  temprano x fecha fin
			return dataFilter.slice().sort((a, b) => {
				if (a.dateOrder && b.dateOrder) return a.dateOrder[index].dateEarlyArr - b.dateOrder[index].dateEarlyArr;
				if (!a.dateOrder) return 1;
				if (!b.dateOrder) return -1;
				return 0;
			});
		}

		//llegada  tarde x fecha fin
		return dataFilter.slice().sort((a, b) => {
			if (a.dateOrder && b.dateOrder) return b.dateOrder[index].dateLaterArr - a.dateOrder[index].dateLaterArr;
			if (!a.dateOrder) return 1;
			if (!b.dateOrder) return -1;
			return 0;
		});
	}

	getValuesTabsSort() {
		const groupsSortByPrice = this.orderByPrincing();

		this.theCheapest = {
			price: groupsSortByPrice[0].detailPricing?.totalPay || 0,
			duration: groupsSortByPrice[0].flightDurationProm || 0
		};

		this.idCheap = groupsSortByPrice[0].id;

		const groupsSortByBest = this.orderByBestOption();

		this.betterOption = {
			price: groupsSortByBest[0].detailPricing?.totalPay || 0,
			duration: groupsSortByBest[0].flightDurationProm || 0
		};

		this.idBest = groupsSortByBest[0].id;

		const groupsSortByDuration = this.orderByDuration();

		this.shorterDuration = {
			price: groupsSortByDuration[0].detailPricing?.totalPay || 0,
			duration: groupsSortByDuration[0].flightDurationProm || 0
		};
	}

	resetCounters() {
		if (this.filters.arrayAirline.length==0) {
			this.totalMultiticket = 0;
			this.dataAirlinesTemp.forEach((airline) => {
				airline.total = 0;
			});
		}
		this.dataBagTemp = dataBagFilterInit.map((item) => {
			item.total = 0;
			return item;
		});
		this.dataScaleTemp = dataScaleFilterInit.map((item) => {
			item.total = 0;
			return item;
		});
		const dataFilter = [...this.dataFilterGroups];
		dataFilter.forEach((item) => {
			if (this.filters.arrayAirline.length==0) {
				const indexAirline = this.dataAirlinesTemp.findIndex((obj) => {
					return obj.value === item.airlineCodeFilter;
				});
				if (indexAirline !== -1) this.dataAirlinesTemp[indexAirline].total++;

				this.dataAirlines = [...this.dataAirlinesTemp];
			}

			if (item.typeBag == 'handbag') this.dataBagTemp[0].total++;
			if (item.typeBag == 'holdbag') this.dataBagTemp[1].total++;
			if (item.isDirect) this.dataScaleTemp[0].total++;
			if (item.isOneScale) this.dataScaleTemp[1].total++;
			if (item.isMultiScale) this.dataScaleTemp[2].total++;

			this.dataBagFilter = [...this.dataBagTemp];
			this.dataScaleFilter = [...this.dataScaleTemp];
		});
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
		///ver cuando todas las air. vacio 
		this.applyFilters();
	}

	applyFilters() {
		
		if(this.filters.arrayAirline.length==0){
			this.dataAirlines={...this.dataAirlinesInit}
		}

		this.dataFilterGroups = [];
		this.dataGroupsPaginate = [];
		const dataFilter = [...this.allDataGroups].filter((item) => {
			let isDurationDepartureValid = true;
			let isDurationReturnValid = true;
			let isDurationScaleDep = true;
			let isDurationScaleRet = true;

			if (item.durationDeparture || item.durationDeparture == 0) {
				isDurationDepartureValid =
					item.durationDeparture >= this.valuesFilterDuration.minDurationDeparture &&
					item.durationDeparture <= this.valuesFilterDuration.maxDurationDeparture;
			}

			if (this.flightType == 0 && (item.durationReturn || item.durationReturn==0)) {
				isDurationReturnValid =
					item.durationReturn >= this.valuesFilterDuration.minDurationReturn &&
					item.durationReturn <= this.valuesFilterDuration.maxDurationReturn;
			}

			if (item.maxWaitingTimeDep || item.maxWaitingTimeDep == 0) {
				isDurationScaleDep =
					item.maxWaitingTimeDep >= this.valuesFilterDuration.minWaitingTimeDep &&
					item.maxWaitingTimeDep <= this.valuesFilterDuration.waitingTimeDep;
			}

			if (this.flightType == 0 && (item.maxWaitingTimeRet || item.maxWaitingTimeRet == 0)) {
				isDurationScaleRet =
					item.maxWaitingTimeRet >= this.valuesFilterDuration.minWaitingTimeRet &&
					item.maxWaitingTimeRet <= this.valuesFilterDuration.waitingTimeRet;
			}

			return (
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
				(this.filters.arrayScales.includes('isMultiScale') ? item.isMultiScale : true) &&
				(item.detailPricing?.totalPay || 0) >= this.filters.minPrice &&
				(item.detailPricing?.totalPay || 0) <= this.filters.maxPrice &&
				isDurationDepartureValid &&
				isDurationReturnValid &&
				isDurationScaleDep &&
				isDurationScaleRet
			);
		});
		this.dataFilterGroups = [...dataFilter];
		this.indexPaginate = 8;
		this.sortData();
		this.resetCounters();
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

	getValuesByFilterDuration() {
		console.log('getValuesfiltres',this.dataFilterGroups)
		const dataFilterDep = [...this.dataFilterGroups].sort(
			(a, b) => (a.durationDeparture || 0) - (b.durationDeparture || 0)
		);
		this.valuesFilterDuration = {
			...this.valuesFilterDuration,
			minDurationDeparture: dataFilterDep[0].durationDeparture || 0,
			maxDurationDeparture: dataFilterDep[dataFilterDep.length - 1].durationDeparture || 0
		};

		if (this.flightType === 0) {
			const dataFilterRet = [...this.dataFilterGroups].sort(
				(a, b) => (a.durationReturn || 0) - (b.durationReturn || 0)
			);
			this.valuesFilterDuration = {
				...this.valuesFilterDuration,
				minDurationReturn: dataFilterRet[0].durationReturn || 0,
				maxDurationReturn: dataFilterRet[dataFilterRet.length - 1].durationReturn || 0
			};
		}
		this.getValuesByFilterScales();
	}

	getValuesByFilterScales() {
		const dataFilterDep1 = [...this.dataFilterGroups].sort(
			(a, b) => (b.maxWaitingTimeDep || 0) - (a.maxWaitingTimeDep || 0)
		);

		this.valuesFilterDuration = {
			...this.valuesFilterDuration,
			waitingTimeDep: dataFilterDep1[0].maxWaitingTimeDep || 0
		};

		if (this.flightType === 0) {
			const dataFilterRet1 = [...this.dataFilterGroups].sort(
				(a, b) => (b.maxWaitingTimeRet || 0) - (a.maxWaitingTimeRet || 0)
			);
			this.valuesFilterDuration = {
				...this.valuesFilterDuration,
				waitingTimeRet: dataFilterRet1[0].maxWaitingTimeRet || 0
			};
		}

		console.log(this.valuesFilterDuration,'valuesDuration')
		this._searchFiltersService.isSetValuesDuration.emit(this.valuesFilterDuration);
	}

	showMoreResults() {
		this.indexPaginate = this.indexPaginate + 8;
		this.dataGroupsPaginate = [
			...this.dataGroupsPaginate,
			...this.dataFilterGroups.slice(this.dataGroupsPaginate.length, this.indexPaginate)
		];
	}

	filterByPrice($event: any) {
		this.filters.minPrice = $event.value;
		this.filters.maxPrice = $event.highValue;
		this.filters.isPrices = this.filters.minPrice !== this.minPrice || this.filters.maxPrice !== this.maxPrice;
		this.applyFilters();
	}

	filterByDuration($event: any) {
		if ($event.isDeparture) {
			this.valuesFilterDuration.minDurationDeparture = $event.value;
			this.valuesFilterDuration.maxDurationDeparture = $event.highValue;
			this.filters.isDurationDeparture =
				$event.value !== this.valuesFilterDurationInit.minDurationDeparture ||
				$event.highValue !== this.valuesFilterDurationInit.maxDurationDeparture;
		} else {
			this.valuesFilterDuration.minDurationReturn = $event.value;
			this.valuesFilterDuration.maxDurationReturn = $event.highValue;
			this.filters.isDurationReturn =
				$event.value !== this.valuesFilterDurationInit.minDurationReturn ||
				$event.highValue !== this.valuesFilterDurationInit.maxDurationReturn;
		}
		this.applyFilters();
	}

	filterByDurationScale($event: any) {
		if ($event.isDeparture) {
			this.valuesFilterDuration.waitingTimeDep = $event.highValue;
			this.valuesFilterDuration.minWaitingTimeDep = $event.value;
			this.filters.isDurationDeparture =
				$event.value !== 0 || $event.highValue !== this.valuesFilterDurationInit.waitingTimeDep;
		} else {
			this.valuesFilterDuration.waitingTimeRet = $event.highValue;
			this.valuesFilterDuration.minWaitingTimeRet = $event.value;
			this.filters.isDurationReturn =
				$event.value !== 0 || $event.highValue !== this.valuesFilterDurationInit.waitingTimeRet;
		}
		this.applyFilters();
	}

	cleanFilters($event: Filter) {
		this.filters = { ...$event };
		if (!this.filters.isPrices) {
			this.filters.minPrice = this.minPrice;
			this.filters.maxPrice = this.maxPrice;
			this._searchFiltersService.isResetFilterPrice.emit();
		}
		if (!this.filters.isDurationDeparture) {
			this.valuesFilterDuration = { ...this.valuesFilterDurationInit }
			this._searchFiltersService.isSetValuesDuration.emit(this.valuesFilterDurationInit)
		};
		if (this.filters.arrayBaggage.length == 0)
			this.dataBagFilter = this.dataBagFilter.map((item) => {
				item.active = false;
				return item;
			});

		if (this.filters.arrayScales.length == 0)
			this.dataScaleFilter = this.dataScaleFilter.map((item) => {
				item.active = false;
				return item;
			});

		if (this.filters.arrayAirline.length == 0)
			this.dataAirlines = this.dataAirlines.map((item) => {
				item.active = false;
				return item;
			});

		this.applyFilters();
	}

	resetFilterByDuration() {
		this.valuesFilterDuration = { ...this.valuesFilterDurationInit };
		this.applyFilters();
	}

	clickTabSort($event: any) {
		this.sortBy = $event;
		this.sortData();
	}
}
