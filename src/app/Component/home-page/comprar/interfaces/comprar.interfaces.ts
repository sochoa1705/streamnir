

export interface IFiltroVuelo {
    adultos: number,
    businessClass: boolean,
    destino: string,
    endDate: string,
    flightType: 1 | 2 | 3,
    habitacion: number,
    idDestino: string,
    idOrigen: string,
    infantes: number,
    ninos: number,
    origen: string,
    pasajeros: number,
    startDate: string
}

export interface IRequestInterface {
    TrackingCode?: string;
    MuteExceptions?: boolean;
    Caller?: IRequestCallerInterface;
}

export interface IRequestCallerInterface {
    Company?: string;
    Application?: string;
    FromIP?: string;
    FromBrowser?: string;
}

export interface ICardRequestInterfaceGeneric<T> extends IRequestInterface {
    Parameter?: T
}

export interface ICardRequestData {
    Number?: string;
}


export interface ICardRequest extends ICardRequestInterfaceGeneric<ICardRequestData> { };

