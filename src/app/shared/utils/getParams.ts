import { Multicity, Params, Search } from 'src/app/api/api-nmviajes/models/ce-metasearch';
import { GlobalComponent } from '../global';

export const getParamsByRoute = (params?: Params) => {
	const _params: any = params;
	const urlParamsString = params
			? Object.keys(params)
					.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(_params[key]))
					.join('&')
			: localStorage.getItem('searchParams')!;
	localStorage.setItem('searchParams', urlParamsString);

	const urlParams = new URLSearchParams(urlParamsString)!;
	if (!urlParams) return null;
	if (window.location.href.includes('resultados') && urlParams) {
		let departureLocation = '';
		let arrivalLocation = '';
		let lastDateMulti = '';
		let multiCity: Multicity[] = [];

		const objSearch: any = {
			flightType: Number(urlParams.get('flightType')),
			flightClass: Number(urlParams.get('flightClass')),
			adults: Number(urlParams.get('adults')),
			children: Number(urlParams.get('children')),
			infants: Number(urlParams.get('infants')),
			email: urlParams.get('email')
		};

		if (objSearch.flightType == 2) {
			const json = JSON.parse(urlParams.get('json')?.replace(/\\/g, '') ?? '');
			objSearch.multicity = json.map((item: any, index: number) => {
				if (index == 0) departureLocation = item.departureLocation.split(' ')[1];
				if (index == json.length - 1) arrivalLocation = item.arrivalLocation.split(' ')[1];
				const date = item.departureDate.split('/');
				item.departureDate = date[2] + '-' + date[1] + '-' + date[0];
				if (index == json.length - 1) lastDateMulti = item.departureDate;

				multiCity.push({
					departureLocation:item.departureLocation.split(' ')[1],
					arrivalLocation:item.arrivalLocation.split(' ')[1],
					departureDate:item.departureDate,
					fullArrivalLocation:item.arrivalLocation,
					fullDepartureLocation:item.departureLocation,
					arrivalDate:''
				})

				item.departureLocation = item.departureLocation.split(' ')[0];
				item.arrivalLocation = item.arrivalLocation.split(' ')[0];
				return item;
			});
		} else {
			departureLocation = urlParams.get('departureLocation')?.split(' ')[1] ?? '';
			arrivalLocation = urlParams.get('arrivalLocation')?.split(' ')[1] ?? '';
			objSearch.departureLocation = urlParams.get('departureLocation')?.split(' ')[0];
			objSearch.arrivalLocation = urlParams.get('arrivalLocation')?.split(' ')[0];
			const date = urlParams.get('departureDate')?.split('/');
			if (date) objSearch.departureDate = date[2] + '-' + date[1] + '-' + date[0];
			if (objSearch.flightType == 0) {
				const date2 = urlParams.get('arrivalDate')?.split('/');
				if (date2) objSearch.arrivalDate = date2[2] + '-' + date2[1] + '-' + date2[0];
			}
		}
		const searchData: Search = {
			flightClass: objSearch.flightClass,
			adults: objSearch.adults,
			children: objSearch.children,
			infants: objSearch.infants,
			arrivalLocation,
			departureLocation,
			multicity: multiCity,
			flightType: objSearch.flightType,
			arrivalDate: objSearch.flightType == 0 ? objSearch.arrivalDate : objSearch.flightType == 2 ? lastDateMulti : '',
			departureDate: objSearch.flightType !== 2 ? objSearch.departureDate : objSearch.multicity[0].departureDate,
			fullArrivalLocation:urlParams.get('arrivalLocation') ?? multiCity[multiCity.length-1].fullArrivalLocation,
			fullDepartureLocation:urlParams.get('departureLocation') ??  multiCity[0].fullDepartureLocation,
		};
		GlobalComponent.searchData = searchData;
		return objSearch;
	}
	return null;
};
