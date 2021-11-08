export class PLANSAC {
    idProductoPadrePTA!: number;
    idProductoPadre!: string;
    idProductoPTA!: number;
    idProducto!: string;
    codProducto!: string;
    codTarifa!: string;
    codModalidad!: string;
    producto!: string;
    precioEmision!: string;
    precioEmisionLocal!: string;
    precioBruto!: string;
    precioBrutoLocal!: string;
    precioUnitario!: string;
    precioUnitarioLocal!: string;
    precioComision!: string;
    precioIncentivo!: string;
    precioIncentivoContactCenter!: string;
    monedaLista!: string;
    monedaLocal!: string;
    tipoCambio!: string;
    packFamiliar!: string;
    familiaProducto!: string;
    nombreProducto!: string;
    IdTipoTarifa!: number;
    EsMultitrip!: boolean;
    TipoTarifa!: number;
    tarifario!: TARIFARIO[];
}

export class TARIFARIO {
    Edad!: string;
    monedaLocal!: string;
    precioEmision!: string;
    precioEmisionLocal!: string;
    precioBruto!: string;
    precioBrutoLocal!: string;
    precioComision!: string;
    precioIncentivo!: string;
    precioIncentivoContactCenter!: string;
}