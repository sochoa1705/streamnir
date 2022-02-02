import { Component, OnInit, ViewChild } from '@angular/core';
import { SecureBookingService } from 'src/app/Services/secureBooking/secure-booking.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';
import { GeneratePayService } from 'src/app/Services/generatePay/generate-pay.service';
import { Router } from '@angular/router';
import { GenerarSafetyPayRQ } from 'src/app/Models/seguros/generarSafetypayRQ.interface';
import { environment } from 'src/environments/environment';
import { NMRequestBy } from 'src/app/Models/base/NMRequestBy';
import { RegistrarSeguroRQ } from 'src/app/Models/seguros/registroRQ.interface';
import { SafetyPayRQ } from 'src/app/Models/seguros/safetypayRQ.interface';
import { CambiarEstadoRQ } from 'src/app/Models/seguros/cambiarEstadoRQ.interface';
import { UpdatePayService } from 'src/app/Services/updatePay/update-pay.service';
import { StatePayService } from 'src/app/Services/statePay/state-pay.service';
import { ReservaVuelosService } from '../../../Services/reservaVuelos/reserva-vuelos.service';
import { CardPaymentService } from '../../../Services/cardPayment/card-payment.service';
import { toUp } from 'src/app/shared/utils';

@Component({
  selector: 'app-conformidad',
  templateUrl: './conformidad.component.html',
  styleUrls: ['./conformidad.component.scss']
})
export class ConformidadComponent implements OnInit {
  listBank: any
  timeShow!: number
  ShowComponentTime!: boolean
  bankSteps: any
  listBooking: any
  reservation: any
  agesCustomers: any
  //COBERTURA
  coverageList: any
  coverage: any
  result: any
  resultJson: any
  safe0: any
  safe0Json: any
  shopData: any
  cambio: any
  tipodeCambio: any
  ip: any
  ipCliente: any
  shopString: any
  unidadNegocio: any
  typePay: string
  resevaVuelo: any
  // vuelos: any
  // vuelosJson: any
  token: any
  tokenJson: any
  filtroVuelo: any
  filtroVueloJson: any
  detalleVuelosStr: any
  detalleVuelos: any
  reservaJSON: any
  reservaStr: any
  
  constructor(
    public route: Router,
    public secureBookingService: SecureBookingService,
    public loaderSubjectService: LoaderSubjectService,
    public generatePayService: GeneratePayService,
    public updatePayService: UpdatePayService,
    public statePayService: StatePayService,
    public reservaVuelosService: ReservaVuelosService,
    public cardPaymentService: CardPaymentService,

  ) {

    // RESERVA
    this.reservaJSON = localStorage.getItem('reserva')
    this.reservaStr = JSON.parse(this.reservaJSON)

    // shopdata
    this.shopData = localStorage.getItem('shop')
    this.shopString = JSON.parse(this.shopData)
    // VUELOS
    // this.vuelos = localStorage.getItem('flight0')
    // this.vuelosJson = JSON.parse(this.vuelos)

    this.detalleVuelosStr = localStorage.getItem('detalleVuelo')
    this.detalleVuelos = JSON.parse(this.detalleVuelosStr)

    //filtro
    this.filtroVuelo = localStorage.getItem('filtroVuelo')
    this.filtroVueloJson = JSON.parse(this.filtroVuelo)

    // Token
    this.token = localStorage.getItem('token')
    this.tokenJson = JSON.parse(this.token)

    // plan
    this.safe0 = localStorage.getItem('safe0')
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    // COBERTURA
    this.coverageList = localStorage.getItem('coverage')
    this.coverage = JSON.parse(this.coverageList)
    // TIPO DE CAMBIO
    this.cambio = localStorage.getItem('tipoCambio')
    this.tipodeCambio = JSON.parse(this.cambio)
    // IP DEL CLIENTE
    this.ipCliente = localStorage.getItem('ipCliente')
    // TIPO DE PAGO
    this.typePay = this.shopString.formCard.select21
  }

  ngOnInit(): void {
    toUp()
    this.ShowComponentTime = false
    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);
    this.edades()
    console.log(this.safe0Json['reservaVuelos'])

    // if (this.safe0Json['reservaVuelos']) {
    //   console.log('INICIA RESERVA V');
    //   this.getReserva()
    // } else {
    //   this.getSecureBooking()
    // }
    // this.getGeneratePay()
  }

  timeShop(data: string) {
    let dayPay = data
    let day = dayPay.substr(0, 2)
    let month = dayPay.substr(3, 2)
    let year = dayPay.substr(6, 4)
    let hour = dayPay.substr(11, 5)
    let newDate = `${year}/${month}/${day} ${hour}`
    let datePay = new Date(newDate)

    var dayStart = new Date();
    var difference = datePay.getTime() - dayStart.getTime()
    var resultInMinutes = Math.round(difference / 60000)
    var totalSeconds = resultInMinutes * 60
    this.timeShow = totalSeconds
    this.ShowComponentTime = true
    // return totalSeconds
  }

  edades() {
    let Ages = []
    // Obtiene la fecha de hoy
    let Today = new Date()
    let day = String(Today.getDate()).padStart(2, '0') + String(Today.getMonth() + 1).padStart(2, '0') + String(Today.getFullYear())
    // Obtiene la fecha de nacimiento
    let fNac = this.shopString.customers
    for (let e of this.shopString.customers) {
      let customer = e.dayCustomer.padStart(2, '0') + e.monthCustomer.padStart(2, '0') + e.yearCustomer
      let Edad = Math.ceil((Number(day) - Number(customer)) / (1000 * 300)) + 1
      Ages.push(Edad)
    }
    this.agesCustomers = Ages.join(';')
    // return Edad
  }

  formattFecha() {
    let arrCustomer = this.shopString.customers[0]
    let fechaNac = arrCustomer.dayCustomer + '/' + arrCustomer.monthCustomer + '/' + arrCustomer.yearCustomer
    return fechaNac
  }

  pasajerosVuelos() {
    let pasajeros: any = []
    this.shopString.customers.forEach((value: any, index: number) => {
      let jsonPasajeros = {
        type: "ADT",
        name: value.nameCustomer,
        lastName: value.lastNameCustomer,
        birthday: value.yearCustomer + '-' + value.monthCustomer + '-' + value.dayCustomer,
        documentType: (value.typeDocCustomer === 'dni') ? 0 : 1,
        documentNumber: value.numDocCustomer,
        gender: (value.sexCustomer === 'masculino') ? 'M' : '',
        email: this.shopString.formContact.mailContacto,
        phone: this.shopString.formContact.numberPhone0
      }
      pasajeros.push(jsonPasajeros)
    })
    return pasajeros
  }

  pasajerosArr() {
    let pasajeros: any = []
    this.shopString.customers.forEach((value: any, index: number) => {
      let jsonPasajeros = {
        pax_nom: value.nameCustomer,
        pax_ape_pat: value.lastNameCustomer,
        doc_cid: (value.typeDocCustomer).toUpperCase(),
        pax_num_doc: value.numDocCustomer,
        pax_fec_nac: value.dayCustomer + '/' + value.monthCustomer + '/' + value.yearCustomer,
        pax_voucher_travelace: '-',
        pax_control_travelace: '-',
        pax_void_travelace: 'N',
        pax_boleto: '-',
        pax_voideo_pta: '0',
        pax_facturado_pta: 0,
        pax_precio_emision: this.safe0Json.tarifario[index].precioEmision,            // obtener desde plansAC.producto.tarifario.precioEmision (FILTRAR POR CAMPO EDAD)
        pax_precio_emision_local: this.safe0Json.tarifario[index].precioEmisionLocal, // obtener desde plansAC.producto.tarifario.precioEmisionLocal (FILTRAR POR CAMPO EDAD)
        pax_precio_neto: this.safe0Json.tarifario[index].precioBrutoLocal
      }
      pasajeros.push(jsonPasajeros)
    })
    return pasajeros
  }

  // SAFETYPAY
  getGeneratePay() {
    const textSend = 'SE ESTA PROCESANDO TU PAGO!'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()

    let lsafetypay: GenerarSafetyPayRQ = {
      PromoterName: this.shopString.customers[0].nameCustomer,                 //NOMBRE DEL PRIMER PASAJERO ADULTO
      CustomerName: this.shopString.customers[0].nameCustomer,                 //NOMBRE DEL PRIMER PASAJERO ADULTO
      CustomerDocumentNumber: this.shopString.customers[0].numDocCustomer,     //DOCUMENTO DEL PRIMER PASAJERO ADULTO
      IdClient: Number(environment.dkAgenciaAC),
      WebId: '7',
      Mail: this.shopString.formContact.mailContacto,   //MAIL DEL PASAJERO
      DKClient: environment.dkAgenciaAC,
      UserAgent: environment.identifierAC,
      IdUser: '56190',
      IpUser: this.ipCliente,                           //IP DEL CLIENTE
      Amount: {
        FeeAmount: 0,
        RechargeAmount: (this.safe0Json['reservaVuelos']) ? this.detalleVuelos.pricingInfo.precioFinal : (this.resultJson.destinyString.es_nacional === 1) ? (this.shopString.PriceTotal * 1.18) : this.shopString.PriceTotal, //COSTO TOTAL DEL SEGURO; SOLO SI destiny.EsDestinoNacional = 'S' ENTONCES MULTIPLICAR POR 1.18 (IGV)
        Currency: 'USD'
      }
    }
    let payload = new NMRequestBy<GenerarSafetyPayRQ>(lsafetypay)
    this.generatePayService.generatePay(payload).subscribe({
      next: (response) => {
        this.listBank = response
        this.timeShop(this.listBank['ExpirationDateTime'])
        this.bankSteps = this.listBank.PaymentLocations.filter((e: any) => {
          let namco = this.shopString.formCard.bankPay
          if (namco === e.ID) {
            return e
          }
        })

        this.loaderSubjectService.closeLoader()

        let lactualizar: SafetyPayRQ = {
          res_seguro_id: (this.safe0Json['reservaVuelos']) ? this.resevaVuelo.idCotizacion : this.reservation.Reserva,                // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
          usosafetypay: 'S',
          codigo_safetypay: this.listBank.TransactionIdentifier,  // obtener desde this.listBank.TransactionIdentifier
          nro_pedido_srv: this.listBank.IDPedido,                 // obtener desde this.listBank.IDPedido
          fee_safetypay: 0
        }

        let payloadupdate = new NMRequestBy<SafetyPayRQ>(lactualizar)

        //>>>> EJECUTAR SERVICIO EN CASO SE HAYA GENERADO CORRECTAMENTE LOS DATOS DE PAGO DE SAFETYPAY
        // this.updatePayService.updatePay(payloadupdate).subscribe({
        //   next: _ => {
        //     console.log('Update SafetyPay');
        //   }
        // })
      }
      ,
      error: error => {
        console.log(error)
        this.loaderSubjectService.closeLoader()

        //>>>> EN CASO SALGA ERROR SE DEBE DE ELIMINAR LA SOLICITUD

        let lanular: CambiarEstadoRQ = {
          res_seguro_id: (this.safe0Json['reservaVuelos']) ? this.resevaVuelo.idCotizacion : this.reservation.Reserva,  // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
          estado: 7
        }

        let payloadanular = new NMRequestBy<CambiarEstadoRQ>(lanular)

        // this.statePayService.updateState(payloadanular).subscribe({
        //   next: _ => {
        //     console.log('Actualizar Estado');
        //   }
        // })

        // si ocurre un error
        this.route.navigateByUrl('/home/seguros');
      }
    })
  }
  // TARJETA
  getCardPayment() {
    const textSend = 'SE ESTA GENERANDO SU PAGO!'
    this.loaderSubjectService.showText(textSend)

    const payload = {
      TrackingCode: "000",
      MuteExceptions: false,
      Caller: {
        Company: "Agil",
        Application: "Expertia"
      },
      Parameter: {
        Ip: this.ipCliente,
        Browser: this.shopString.browser,
        Client: {
          Firstname: this.shopString.formContact.nameContacto,
          Lastname: this.shopString.formContact.lastnameContacto,
          Address: this.shopString.formCard.address,
          DocumentType: this.shopString.formCard.tipoDoc,
          DocumentNumber: this.shopString.formCard.numDoc,
          Email: this.shopString.formContact.mailContacto
        },
        Booking: {
          NumberInsurance: (this.safe0Json['reservaVuelos']) ? this.resevaVuelo.idCotizacion : this.reservation.Reserva,
          DateStart: this.resultJson.fromDate, // AAAA-MM-DD
          DateEnd: this.resultJson.toDate,
          NumberOfAdult: this.shopString.customers.length,
          NumberOfChildren: 0
        },
        Payment: {
          Card: {
            HolderName: this.shopString.formCard.nameCard,
            Number: this.shopString.formCard.numberCard,
            Expiration: this.expired(this.shopString.formCard.expiredCard), // 2022/05
            SecurityCode: Number(this.shopString.formCard.ccvCard)
          },
          AmountOfFees: Number(this.shopString.formCard.feePay),
          Amount: (this.safe0Json['reservaVuelos']) ? this.detalleVuelos.pricingInfo.precioFinal : (this.resultJson.destinyString.es_nacional === 1) ? (this.shopString.PriceTotal * 1.18) : this.shopString.PriceTotal,
        }
      }
    }
    console.log(payload)

    this.cardPaymentService.cardPayment(payload).subscribe({
      next: (response) => {
        console.log(response)
        this.loaderSubjectService.closeLoader()
      },
      error: (err) => {
        console.log(err)
        this.loaderSubjectService.closeLoader()
      }
    })
  }

  // fecha de expiracion tarjeta
  expired(e: any) {
    const year = e.substring(0, 4)
    const month = e.substring(4, 6)
    const expiredFormatt = `${year}/${month}`
    return expiredFormatt
  }

}


