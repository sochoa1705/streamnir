import { ICardAutocomplete } from "../../card-autocomplete/card-autocomplete.interface";

export interface IGeoTree {
    aerocodiata: string,
    city: string,
    city_code: string,
    country: string,
    country_id: string,
    destination_id: number,
    language_id: string,
    state: string,
    state_id: string,
    tipo_busqueda: string,
    tn_iata_padre_fn?: "0" | "2"
}

export interface IForm {
    clase: string;
    viajes: number;
    origen: ICardAutocomplete;
    destino: ICardAutocomplete;
    origenHotel: string;
}

export interface ISuggest {
    airport?: boolean,
    cityLoc?: boolean,
    countryCode?: string,
    hasoffice?: string,
    iata?: string,
    latitude?: number,
    longitude?: number,
    region?: string,
    timezone?: string,
    trainLoc?: boolean,
    value?: string
}

export interface IPackageCountry {
    code?: string,
    label?: string,
    name?: string
}
