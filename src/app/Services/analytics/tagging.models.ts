import { generateLabelTag } from 'src/app/shared/utils';

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
    public eCategory: string | number = 'Vertical Vuelos + Hoteles',
    public eAction: string | number = 'Buscar V+H',
    public event: string | number = 'nmv.vuelosHoteles_ga_buscar'
  ) {}
}

export class ModelTaggingHoteles {
  constructor(
    public nombre: string | number,
    public destino: string | number,
    public numPasajeros: string | number,
    public adultos: string | number,
    public ninos: string | number,
    public infantes: string | number,
    public habitaciones: string | number,
    public fechaSalida: string | number,
    public fechaRegreso: string | number,
    public diasAnticipacion: string | number,
    public duracionViaje: string | number,
    public eLabel = generateLabelTag(),
    public eCategory = 'Vertical Hoteles',
    public eAction = 'Buscar Hoteles',
    public event = 'nmv.hoteles_ga_buscar'
  ) {}
}

export class ModelTaggingVuelos {
  constructor(
    public nombre: number | string,
    public origen: number | string,
    public destino: number | string,
    public clase: number | string,
    public tipo: number | string,
    public numPasajeros: number | string,
    public adultos: number | string,
    public ninos: number | string,
    public infantes: number | string,
    public habitaciones: number | string,
    public fechaSalida: number | string,
    public fechaRegreso: number | string,
    public diasAnticipacion: number | string,
    public duracionViaje: number | string,
    public eLabel = generateLabelTag(),
    public eCategory = 'Vertical Vuelos',
    public eAction = 'Buscar Vuelos',
    public event = 'nmv.vuelos_ga_buscar'
  ) {}
}

export class ModelTaggingActividades {
  constructor(
    public nombre: string | number,
    public destino: string | number,
    public numPasajeros: string | number,
    public adultos: string | number,
    public ninos: string | number,
    public infantes: string | number,
    public habitaciones: string | number,
    public fechaSalida: string | number,
    public fechaRegreso: string | number,
    public diasAnticipacion: string | number,
    public duracionViaje: string | number,
    public eLabel = generateLabelTag(),
    public eCategory = 'Vertical Actividades',
    public eAction = 'Buscar Actividades',
    public event = 'nmv.actividades_ga_buscar'
  ) {}
}

export class ModelTaggingSlidersBanners {
  constructor(
    public src: string,
    public title: string,
    public nombre: 'Slider Principal' | 'Banner Principal',
    public position: string
  ) {}

  generateTag() {
    return {
      event: 'nmv.promos_eecga3_promosDestacadas',
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: this.src,
              name: this.title,
              creative: this.nombre,
              position: this.position,
            },
          ],
        },
      },
      eCategory: "Promociones: " + this.nombre,
      eAction: this.title,
      eLabel: generateLabelTag(),
    };
  }
}
