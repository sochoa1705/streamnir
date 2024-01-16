interface IOption {
	value: number;
	nameOption: string;
	nameSeleted: string;
	subNameSeled: string;
}

/**
 * 
 * {
    "flightType": 0,
    "flightClass": 0,
    "adults": 1,
    "children": 0,
    "infants": 0,
    "email": "yovana.ulc@gmail.com",
    "departureLocation": "LIM",
    "arrivalLocation": "TCQ",
    "departureDate": "2023-08-31",
    "arrivalDate": "2023-09-07"
}
 */
export const getMoreOptionsFilter = (objParams: any): IOption[] => {
	const index = objParams.flightType == 0 ? 8 : 4;
	let isTextSalida = false;
	let value = 3;
	let code = '';
	const arrayOptions: IOption[] = [];
	if (objParams.flightType !== 2) {
		for (let i = 0; i < index; i++) {
		
            if (i % 2==0) {
                isTextSalida=!isTextSalida;
			}
            code = isTextSalida ? objParams.departureLocation:objParams.arrivalLocation;
            if(i==4 || i==5) code = objParams.arrivalLocation;
            if(i>=6) code = objParams.departureLocation;
            
			arrayOptions.push({
				value,
				nameOption: `${isTextSalida?'Salida':'Llegada'} más ${i % 2==0 ? 'temprano' : 'tarde'} (${code})`,
				nameSeleted: `${isTextSalida?'Salida':'Llegada'} ${isTextSalida?'de':'a'} ${code}`,
				subNameSeled: i % 2==0 ? 'Más temprano ' : 'Más tarde '
			});

			value++;
		}
	}
	return arrayOptions;
};
