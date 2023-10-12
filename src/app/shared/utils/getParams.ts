import { Search } from "src/app/api/api-nmviajes/models/ce-metasearch";
import { GlobalComponent } from "../global";

export const getParams = (params: any) => {
	let departureLocation='';
	let arrivalLocation='';
	let lastDateMulti='';
	const objSearch: any = {
		flightType: Number(params.get('flightType')),
		flightClass: Number(params.get('flightClass')),
		adults: Number(params.get('adults')),
		children: Number(params.get('children')),
		infants: Number(params.get('infants')),
		email: params.get('email')
	};
	if (objSearch.flightType == 2) {
		const json=JSON.parse(params.get('json')?.replace(/\\/g, '') || '');
		objSearch.multicity = json.map((item: any,index:number) => {
			if(index==0) departureLocation=item.departureLocation.split(' ')[1];
			if(index==json.length - 1) arrivalLocation=item.arrivalLocation.split(' ')[1];
			
			item.departureLocation = item.departureLocation.split(' ')[0];
			item.arrivalLocation = item.arrivalLocation.split(' ')[0];
			const date = item.departureDate.split('/');
			item.departureDate = date[2] + '-' + date[1] + '-' + date[0];
			if(index==json.length - 1) lastDateMulti=item.departureDate;
			return item;
		});
	} else {
		departureLocation=params.get('departureLocation').split(' ')[1];
		arrivalLocation=params.get('arrivalLocation').split(' ')[1];
		objSearch.departureLocation = params.get('departureLocation')?.split(' ')[0];
		objSearch.arrivalLocation = params.get('arrivalLocation')?.split(' ')[0];
		const date = params.get('departureDate')?.split('/');
		if (date) objSearch.departureDate = date[2] + '-' + date[1] + '-' + date[0];
		if (objSearch.flightType == 0) {
			const date2 = params.get('arrivalDate')?.split('/');
			if (date2) objSearch.arrivalDate = date2[2] + '-' + date2[1] + '-' + date2[0];
		}
	}

	const searchData:Search = {
		flightClass: objSearch.flightClass,
		adults: objSearch.adults,
		children: objSearch.children,
		infants: objSearch.infants,
		arrivalLocation,
		departureLocation,
		flightType:objSearch.flightType,
		arrivalDate: objSearch.flightType==0 ? objSearch.arrivalDate : objSearch.flightType==2 ? lastDateMulti : '',
		departureDate: objSearch.flightType!==2 ? objSearch.departureDate : objSearch.multicity[0].departureDate
	}

	console.log(searchData,'dat')

	GlobalComponent.searchData=searchData;
	return objSearch;
};