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


// event: 'nmv.vuelosHoteles_ga_buscar',  
// nombre: '<Cod Origen>_<Cod Destino>_<Cod Clase>', //Ejemplo: LIM_CUN_EC
// origen: '<Origen Seleccionado>', //Ejemplo: Lima, Perú
// destino: '<Destino Seleccionado>', //Ejemplo: Cancún, México
// clase: '<Clase de Vuelo>',
// numPasajeros: '<Cantidad Total Pasajeros>', // Integer
// adultos: '<Número de pasajeros Adultos>', // Integer
// ninos: '<Número de pasajeros Niños>', // Integer
// infantes: '<Número de pasajeros Infantes>', // Integer
// habitaciones: '<Número total de Habitaciones>', // Integer
// fechaSalida: '<Fecha de Salida>',
// fechaRegreso: '<Fecha de Regreso>',
// diasAnticipacion:  '<Días de anticipación>', 
// duracionViaje:  '<Duración del viaje>', 
// eCategory: 'Vertical Vuelos + Hoteles',
// eAction: 'Buscar V+H',
// eLabel: '<Nombre del Widget>' 