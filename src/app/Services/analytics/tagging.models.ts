export class ModelTaggingVuelosHoteles {
    constructor(
        public nombre: string,
        public origen: string,
        public destino: string,
        public clase: string,
        public numPasajeros: string,
        public adultos: string,
        public ninos: string,
        public infantes: string,
        public habitaciones: string,
        public fechaSalida: string,
        public fechaRegreso: string,
        public diasAnticipacion: string,
        public duracionViaje: string,
        public eLabel: string = "",
        public eCategory: string = "Vertical Vuelos + Hoteles",
        public eAction: string = "Buscar V+H",
        public event: string = "nmv.vuelosHoteles_ga_buscar",
    ){}
}