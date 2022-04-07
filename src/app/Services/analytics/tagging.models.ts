import { generateLabelTag } from "src/app/shared/utils";

export class ModelTaggingVuelosHoteles {
    constructor(
        public nombre: string | number,
        public origen: string | number,
        public destino: string | number,
        public clase: string | number,
        public numPasajeros: string | number,
        public adultos: string | number,
        public ninos: string | number,
        public infantes: string | number,
        public habitaciones: string | number,
        public fechaSalida: string | number,
        public fechaRegreso: string | number,
        public diasAnticipacion: string | number,
        public duracionViaje: string | number,
        public eLabel: string | number = generateLabelTag(),
        public eCategory: string | number = "Vertical Vuelos + Hoteles",
        public eAction: string | number = "Buscar V+H",
        public event: string | number = "nmv.vuelosHoteles_ga_buscar",
    ){}
}


export class ModelTaggingHoteles {
    constructor(
        public nombre:string | number,
        public destino:string | number,
        public numPasajeros:string | number,
        public adultos:string | number,
        public ninos:string | number,
        public infantes:string | number,
        public habitaciones:string | number,
        public fechaSalida:string | number,
        public fechaRegreso:string | number,
        public diasAnticipacion: string | number,
        public duracionViaje: string | number,
        public eLabel = generateLabelTag(),
        public eCategory = 'Vertical Hoteles',
        public eAction = 'Buscar Hoteles',
        public event = 'nmv.hoteles_ga_buscar',  
    ){}
}
