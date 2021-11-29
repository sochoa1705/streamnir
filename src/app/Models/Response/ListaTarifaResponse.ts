export class ListaTarifaResponse{
   
    cantADT: string;// null
    cantCHD: string;// null
    cantINF: string;// null
    cantidadBusq: number;// 0
    ciudad: string;//""
    clase: string;// null
    continente: string;// ""
    fechaRetorno: string;// ""
    fechaSalida: string;// ""
    idCiuDestino: string;// ""
    idCiuOrigen:string;// ""
    idCiudad:string;// ""
    idContinente:string;// ""
    idLineaAerea: string;// ""
    idMoneda:string;// ""
    idOrientacion: string;// ""
    idPais: string;// ""
    impuestos: number
    nomCiuDestino: string;//"Mexico"
    nomCiuOrigen:string;// ""
    pais: string;// ""
    tarifaNeta: number;//357
    textoTiempoBusq: string;// ""
    tipoCambio: number;
    tipoDestino: string;// ""
    url: string;// ""
    MonedaPrecio : string;


    constructor (){

        this.cantADT= "";
        this.cantCHD= "";
        this.cantINF= "";
        this.cantidadBusq = 0;
        this.ciudad= "";
        this.clase= "";
        this.continente= "";
        this.fechaRetorno= "";
        this.fechaSalida= "";
        this.idCiuDestino= "";
        this.idCiuOrigen= "";
        this.idCiudad= "";
        this.idContinente= "";
        this.idLineaAerea= "";
        this.idMoneda= "";
        this.idOrientacion= "";
        this.idPais= "";
        this.impuestos = 0;
        this.nomCiuDestino= "";
        this.nomCiuOrigen= "";
        this.pais= "";
        this.tarifaNeta= 0;
        this.textoTiempoBusq= "";
        this.tipoCambio= 0;
        this.tipoDestino= "";
        this.url= "";
        this.MonedaPrecio = "";
       
    }


}