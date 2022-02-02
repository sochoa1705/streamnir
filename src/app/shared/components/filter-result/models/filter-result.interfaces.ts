import { Airline } from "src/app/Component/home-page/resultados/models/resultados.interfaces";

export class FilterBlock {
  name: string;
  filterType: number;
}

export interface AirlineFilter extends Airline {
  checked: boolean;
}

export class RangeFilter {
  min: number = 0;
  max: number = 0;
}


export class FilterResult{
  airlines:AirlineFilter[] = [];
  price: RangeFilter = new RangeFilter();
  exchangeRate: number;
  flightDurationExit: RangeFilter = new RangeFilter();
}