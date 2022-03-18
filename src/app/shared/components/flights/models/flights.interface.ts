export enum EnumFlightType {
    ida_vuelta= 0,
    // ida_vuelta= 2,
    ida=1,
    multy_city=3
}

export enum EnumCabins {
    economico = 'Y',
    business = 'B',
    primera_clase = 'F'
}


export interface IMovDetalleSegment{
    dia:string,
    cod_ciudad:string,
    hora:string,
    aeropuerto?:string 
}
export interface IVueloDetalleSegment{
    num_vuelo:number,
    aerolinea:string,
    duracion?:string,
    logo?:string,
}
export interface IEscalaDetalleSegment{
    ciudad:string,
    tiempo_espera:string,
}