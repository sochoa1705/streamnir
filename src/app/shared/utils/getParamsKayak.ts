export const getUrlSearchByKayak=(params:any)=>{
    const random = '?rand=' + Math.round(Math.random() * 10000000000);
    const userStr: string = localStorage.getItem('usuario') || '';
    const userStorage=userStr.length > 0 ? JSON.parse(userStr) : ''
    const email = userStorage!=='' ? userStorage.email : '';
    const flightType = params.get('flightType');
    const departureLocation = params.get('departureLocation');
    const arrivalLocation = params.get('arrivalLocation');
    const departureDate = convertToDDMMYYYY(params.get('departureDate') || '');
    const arrivalDate =  convertToDDMMYYYY(params.get('arrivalDate') || '');
    const adults = params.get('adults');
    const children = params.get('children');
    const infants = params.get('infants');
    const flightClass = params.get('flightClass');
    const url=`/resultados${random}&departureLocation=${departureLocation}&arrivalLocation=${arrivalLocation}&departureDate=${departureDate}&arrivalDate=${arrivalDate}&adults=${adults}&children=${children}&infants=${infants}&flightType=${flightType}&flightClass=${flightClass}&lang=ES&email=${email}`;
    localStorage.setItem('searchParams', url);
    return url;
}

export const convertToDDMMYYYY=(date:string)=>{
    if(date === undefined) return;
    let dates = date.split("-");
    return `${dates[2]}/${dates[1]}/${dates[0]}`;
  }
