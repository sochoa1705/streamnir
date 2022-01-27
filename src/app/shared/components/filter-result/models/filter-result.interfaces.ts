import { Airline } from "src/app/Component/home-page/resultados/models/resultados.interfaces";

export class FilterBlock {
  name: string;
  filterType: number;
}

export interface AirlineFilter extends Airline {
  checked: boolean;
}

export class FilterResult{
  airlines:AirlineFilter[] = [];
}