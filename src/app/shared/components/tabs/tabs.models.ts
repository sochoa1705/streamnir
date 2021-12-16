interface Pasajeros{
    adultos:number;
    ninos:number;
    infantes:number;
}

// habitacion:number;

export class PasajerosConHabitacion implements Pasajeros{
    constructor(
        public adultos:number,
        public ninos:number,
        public infantes:number,
        public habitacion:number
    ){}
}

export class PasajerosSinHabitacion implements Pasajeros{
    constructor(
        public adultos:number,
        public ninos:number,
        public infantes:number
    ){}
}