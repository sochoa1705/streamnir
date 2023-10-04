import { ParamMap } from '@angular/router';
import { GlobalComponent } from '../global';
import { Search } from 'src/app/api/api-nmviajes/models/ce-metasearch';
import { countries } from '../code-countries';
import { getBodyGTMSearch } from './GTMSearch';

export const setParamsByKayak = (paramMap: ParamMap) => {
	const groupSelected = GlobalComponent.appGroupSeleted;
	const destination = groupSelected.departure[0].destinationCity;
	const origin = groupSelected.departure[0].originCity;
	const searchToTagManager: Search = {
		flightClass: Number(paramMap.get('flightClass')) || 0,
		adults: GlobalComponent.detailPricing.totalADT,
		children: GlobalComponent.detailPricing.totalCNN,
		infants: GlobalComponent.detailPricing.totalINF,
		arrivalLocation: `${destination.code} ${destination.name}, ${destination.country == 'PE' ? 'Perú' : getNameCountry(destination.country)}`,
		departureLocation: `${origin.code} ${origin.name}, ${origin.country == 'PE' ? 'Perú' : getNameCountry(origin.country)}`,
		flightType: Number(paramMap.get('flightType')) || 0,
		arrivalDate: paramMap.get('arrivalDate') || '',
		departureDate: paramMap.get('departureDate') || ''
	};
	GlobalComponent.searchFlightParams = searchToTagManager;
	const bodyGTMSearch=getBodyGTMSearch();
	GlobalComponent.GMTSearch=bodyGTMSearch;
};

export const getNameCountry = (code: string): string => {
	const arrayCode = countries.filter((item) => item.code == code);
	return arrayCode.length > 0 ? arrayCode[0].name : code;
};
