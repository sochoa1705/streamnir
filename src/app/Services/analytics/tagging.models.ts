import * as moment from 'moment';
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
  ) { }
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
  ) { }
}

export class ModelTaggingVuelos {
  constructor(
    public nombre: number | string,
    public origen: number | string,
    public destino: number | string,
    public clase: string,
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
  ) { }
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
  ) { }
}

export class ModelTaggingSlidersBanners {
  constructor(
    public src: string,
    public title: string,
    public nombre: 'Slider Principal' | 'Banner Principal',
    public position: string
  ) { }

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

export class ModelTaggingOfertasVuelos {
  constructor(
    public src: string,
    public title: string,
    public nombre: 'Oferta de Vuelos',
    public position: string,
    public url: string,
  ) { }

  generateTag() {
    return {
      event: 'nmv.promos_eecga3_ofertasVuelos',
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


export class ModelTaggingSubscripcionOfertas {
  constructor(
    public event = "nmv.users_ga_formSuscripcion",
    public eCategory = "Form Ofertas Exclusivas",
    public eAction = "Suscripción a Ofertas",
    public eLabel = generateLabelTag(),
  ) { }
}

export class ModelTaggingLogin {
  constructor(
    public accion: "Login" | "Signup",
    public perfilUsuario: "Cuenta Personal" | "Cuenta Empresa",
    public userMetodo: "Password" | "Facebook" | "Google",
    public userEmail: string,
    public userId: string | number
  ) { }

  generateTag() {
    return {
      event: "nmv.users_ga_" + this.accion,
      userPerfil: this.perfilUsuario,
      userMetodo: this.userMetodo,
      userEmail: this.userEmail,
      userId: this.userId,
      eCategory: this.accion,
      eAction: this.perfilUsuario,
      eLabel: this.userMetodo
    }
  }
}

export class ModelTaggingLibroReclamaciones {

  public eCategory: "Libro de Reclamaciones";
  public event = "nmv.users_ga_libroReclamaciones";

  constructor(
    public bienTipo: "Servicio" | "Producto",
    public bienDescripcion: string,
    public tipoReclamo: "Reclamo" | "Queja",
  ) { }

  generateTag() {
    return {
      event: this.event,
      bienTipo: this.bienTipo,
      bienDescripcion: this.bienDescripcion,
      tipoReclamo: this.tipoReclamo,
      eCategory: this.eCategory,
      eAction: this.bienTipo,
      eLabel: this.bienDescripcion,
    }
  }
}

export class ModelTaggingBuscarSeguros {
  constructor(
    public nombreRegionDestino: string,
    public codigoRegionDestino: string,
    public cantidadPasajeros: string | number,
    public promedioEdad: string | number,
    /**Formato DD/MM/YYYY */
    public fechaSalida: string | number,
    /**Formato DD/MM/YYYY */
    public fechaRegreso: string | number,
    public codigoPaisOrigen = "PE",
    public nombrePaisOrigen = "Peru",
    public duration: number
  ) { }

  generateTag() {
    return {
      event: "nmv.seguros_ga_buscar",
      nombre: this.nombrePaisOrigen + "_" + this.nombreRegionDestino,
      numPasajeros: this.cantidadPasajeros,
      promEdad: this.promedioEdad,
      fechaSalida: moment(this.fechaSalida, "DD/MM/YYYY").format("YYYY/MM/DD"),
      fechaRegreso: moment(this.fechaRegreso, "DD/MM/YYYY").format("YYYY/MM/DD"),
      diasAnticipacion: moment(this.fechaSalida, "DD/MM/YYYY").diff(moment(), 'days'),
      duracionViaje: this.duration,
      paisOrigen: this.nombrePaisOrigen,
      regionDestino: this.nombreRegionDestino,
      eCategory: "Vertical Seguros",
      eAction: "Cotizar Seguros",
      eLabel: generateLabelTag()
    }
  }
}

export class ModelTaggingMostrarResultados {
  constructor(
    public event: "nmv.seguros_eecga3_productimpression",
    public ecommerce: Ecommerce,
  ) { }
}
export class Ecommerce {
  constructor(
    public currencyCode: string,
    public impressions: Impression[]
  ) { }

}
export class Impression {
  constructor(
    public name: string,
    public position: number,
    public list: string,
    public id: string,
    public price: string,
    public brand: string,
    public category: string,
    public category2: string,
    public variant: string,
    public quantity: number,
    public metric10: number,
    public dimension9: string,
    public dimension11: string,
    public dimension12: string,
    public metric11: number,
    public metric12: number,
  ) { }

}

export class ModelTaggingDetalleBeneficio {
  constructor(
    public event: string,
    public ecommerce: EcommerceDetalleBeneficio,
  ) { }
}
export class EcommerceDetalleBeneficio {
  constructor(
    public detail: Detail,
  ) { }

}
export class Detail {
  constructor(
    public actionField: ActionField,
    public products: Product[]
  ) { }

}
export class ActionField {
  constructor(
    public list: string,
  ) { }

}

export class Product {
  constructor(
    public name: string,
    public id: string,
    public price: string,
    public brand: string,
    public category: string,
    public category2: string,
    public variant: string,
    public quantity: number,
    public metric10: number,
    public dimension9: string,
    public dimension11: string,
    public dimension12: string,
    public metric11: number,
    public metric12: number
  ) { }

}
export class ModelTaggingAddToCart {
  constructor(
    public event: string,
    public ecommerce: EcommerceAddToCart,
  ) { }
}
export class EcommerceAddToCart {
  constructor(
    public currencyCode: string,
    public add: Add,
  ) { }
}
export class Add {
  constructor(
    public actionField: ActionFieldAddToCart,
    public products: ProductAddToCart[],
  ) { }
}
export class ActionFieldAddToCart {
  constructor(
    public list: string,
  ) { }
}
export class ProductAddToCart {
  constructor(
    public name: string,
    public id: string,
    public price: string,
    public brand: string,
    public category: string,
    public category2: string,
    public variant: string,
    public quantity: number,
    public metric10: number,
    public dimension9: string,
    public dimension11: string,
    public dimension12: string,
    public metric11: number,
    public metric12: number,
    public dimension16: string,
    public dimension17: string
  ) { }
}
export class ModelTaggingCheckout {
  constructor(
    public event: string,
    public ecommerce: EcommerceCheckout,
  ) { }
}
export class EcommerceCheckout {
  constructor(
    public checkout: Checkout,
  ) { }
}
export class Checkout {
  constructor(
    public actionField: ActionFieldCheckout,
    public products: ProductAddToCart[],
  ) { }
}
export class ActionFieldCheckout {
  constructor(
    public step: number,
  ) { }
}
export class ModelTaggingcheckoutOption {
  constructor(
    public event: string,
    public ecommerce: EcommercecheckoutOption,
  ) { }

}
export class EcommercecheckoutOption {
  constructor(
    public checkout_option: CheckoutOption,
  ) { }
}
export class CheckoutOption {
  constructor(
    public actionField: ActionFieldCheckoutOption,
  ) { }
}
export class ActionFieldCheckoutOption {
  constructor(
    public step: number,
    public option: string,
  ) { }
}
