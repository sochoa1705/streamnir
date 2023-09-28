import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SearchFiltersService {
    constructor() { }

    isResetFilterPrice  = new EventEmitter();
    isResetFilterDuration  = new EventEmitter();
    isResetFilterBaggage = new EventEmitter();
    isResetFilterAirlines = new EventEmitter();
    isSetValuesDropdown = new EventEmitter();
    isResetFilterScales = new EventEmitter();
    isFinishGDS = new EventEmitter();
    isCounterDinamic = new EventEmitter();
    isSetValuesDuration = new EventEmitter();
    isSetValuesPrices = new EventEmitter();
    isSetParams = new EventEmitter();
    isSetParamsMulti = new EventEmitter();
    isLoader = new EventEmitter();
}