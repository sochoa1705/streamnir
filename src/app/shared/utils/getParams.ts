export const getParams = (params: any) => {
	const objSearch: any = {
		flightType: Number(params.get('flightType')),
		flightClass: Number(params.get('flightClass')),
		adults: Number(params.get('adults')),
		children: Number(params.get('children')),
		infants: Number(params.get('infants')),
		email: params.get('email')
	};
	if (objSearch.flightType == 2) {
		objSearch.multicity = JSON.parse(params.get('json')?.replace(/\\/g, '') || '').map((item: any) => {
			item.departureLocation = item.departureLocation.split(' ')[0];
			item.arrivalLocation = item.arrivalLocation.split(' ')[0];
			const date = item.departureDate.split('/');
			item.departureDate = date[2] + '-' + date[1] + '-' + date[0];
			return item;
		});
	} else {
		objSearch.departureLocation = params.get('departureLocation')?.split(' ')[0];
		objSearch.arrivalLocation = params.get('arrivalLocation')?.split(' ')[0];
		const date = params.get('departureDate')?.split('/');
		if (date) objSearch.departureDate = date[2] + '-' + date[1] + '-' + date[0];
		if (objSearch.flightType == 0) {
			const date2 = params.get('arrivalDate')?.split('/');
			if (date2) objSearch.arrivalDate = date2[2] + '-' + date2[1] + '-' + date2[0];
		}
	}
	return objSearch;
};


export const getParamsSearch = (params:any) =>{
	const objSearch: any = {
		flightType: Number(params.get('flightType')),
		flightClass: Number(params.get('flightClass')),
		adults: Number(params.get('adults')),
		children: Number(params.get('children')),
		infants: Number(params.get('infants'))
	};
	if (objSearch.flightType == 2) {
		objSearch.multicity = JSON.parse(params.get('json')?.replace(/\\/g, '') || '').map((item: any) => {
			item.departureLocation = item.departureLocation.split(' ')[0];
			item.arrivalLocation = item.arrivalLocation.split(' ')[0];
			const date = item.departureDate.split('/');
			item.departureDate = date[0] + '/' + date[1] + '/' + date[2];
			return item;
		});
	} else {
		objSearch.departureLocation = params.get('departureLocation')?.split(' ')[0];
		objSearch.arrivalLocation = params.get('arrivalLocation')?.split(' ')[0];
		objSearch.departureDate = params.get('departureDate');
		if (objSearch.flightType == 0) {
			objSearch.arrivalDate = params.get('arrivalDate');
		}
	}
	return objSearch;
}
