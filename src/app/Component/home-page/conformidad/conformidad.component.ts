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
  constructor(
    public route: Router,
    public secureBookingService: SecureBookingService,
    public loaderSubjectService: LoaderSubjectService,
    public generatePayService: GeneratePayService,
    public updatePayService: UpdatePayService,
    public statePayService: StatePayService,
    public reservaVuelosService: ReservaVuelosService,
  ) {
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
    this.ShowComponentTime = false
    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);
    this.edades()
    console.log(this.safe0Json['reservaVuelos'])
    
    if(this.safe0Json['reservaVuelos']) {
      this.getReserva()
    } else {
      this.getSecureBooking()
    }
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


  getSecureBooking() {
    const textSend = 'SE ESTA GENERANDO SU RESERVA!'
    this.loaderSubjectService.showText(textSend)
    let lregistro: RegistrarSeguroRQ = {
      fec_salida: this.resultJson.fromDate,                       // FECHA DE PARTIDA
      fec_retorno: this.resultJson.toDate,                        // FECHA DE RETORNO
      cant_paxes: this.shopString.customers.length,               // CANTIDAD DE PASAJEROS
      destino: this.resultJson.destinyString.descripcion_destino, // NOMBRE DEL DESTINO
      edades: `${this.agesCustomers};`,                           // EDADES CONCATENADAS CON PUNTO Y COMA
      prod_id: this.safe0Json.idProducto,                         // obtener desde plansAC.idProducto
      prod_nom: this.safe0Json.producto,                          // obtener desde plansAC.producto
      prod_familia: '',
      moneda_lista: 'USD',
      moneda_local: 'USD',
      precio_bruto: this.safe0Json.precioBruto,                  // obtener desde plansAC.precioBruto
      precio_bruto_local: this.safe0Json.precioBrutoLocal,       // obtener desde plansAC.precioBrutoLocal
      precio_emision: this.safe0Json.precioEmision,              // obtener desde plansAC.precioEmision
      precio_emision_local: this.safe0Json.precioEmisionLocal,   // obtener desde plansAC.precioEmisionLocal
      precio_unitario: this.safe0Json.precioUnitario,            // obtener desde plansAC.precioUnitario
      tipo_cambio: this.tipodeCambio,                            // TIPO DE CAMBIO DEL DIA
      vuelo_res_id: 0,
      contacto_nom: this.shopString.formContact.nameContacto,           // NOMBRE DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_ape: this.shopString.formContact.lastnameContacto,       // APELLIDOS DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_email: this.shopString.formContact.mailContacto,         // CORREO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_direccion: (this.shopString.formContact.chkFac) ? this.shopString.formContact.recibo[0].direccion : '',  // DIRECCION DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_telfs: this.shopString.formContact.numberPhone0,         // TELEFONO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR CERO
      contacto_emerg_nom: this.shopString.formContact.nameContacto,     // NOMBRE DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_ape: this.shopString.formContact.lastnameContacto, // APELLIDOS DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_email: this.shopString.formContact.mailContacto,   // CORREO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      contacto_emerg_telf: this.shopString.formContact.numberPhone0,    // TELEFONO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      ruc: (this.shopString.formContact.recibo.length === 0) ? `BV-${this.shopString.customers[0].numDocCustomer}` : this.shopString.formContact.recibo[0].ruc, // TIPO DE COMPROBANTE DE PAGO (BV / FC) Y DOCUMENTO (DNI / RUC) DEL PRIMER PASAJERO ADULTO
      razon_social: this.shopString.formContact.nameContacto + ' ' + this.shopString.formContact.lastnameContacto,  // NOMBRE Y APELLIDO DEL PRIMER PASAJERO ADULTO O LA RAZON SOCIAL CUANDO SEA FACTURA
      direccion_fiscal: (this.shopString.formContact.recibo.length === 0) ? '' : this.shopString.formContact.recibo[0].direccion, // DIRECCION DEL PRIMER PASAJERO ADULTO O DIRECCION DE LA EMPRESA
      comentario: '',
      webs_cid: 7,
      usuweb_id: 339,
      destinonacional: (this.resultJson.destinyString.es_nacional !== 0) ? 'N' : 'I', // obtener desde destiny.EsDestinoNacional
      numeroruc: (this.shopString.formContact.recibo.length === 0) ? `BV-${this.shopString.customers[0].numDocCustomer}` : this.shopString.formContact.recibo[0].ruc,
      comprobantepago: (this.shopString.formContact.chkFac) ? 'FC' : 'BV',  // TIPO DE COMPROBANTE DE PAGO (BV / FC)
      usobilletera: 'N',
      codigobloqueo: '',
      dkcliente: environment.dkAgenciaAC,
      producto: this.safe0Json.nombreProducto,      // obtener desde plansAC.producto
      pnr: '',
      pais_ac: this.unidadNegocio.id_pais_ac,
      agencia_ac: this.unidadNegocio.codigo_ac,
      sucursal_ac: this.unidadNegocio.sucursal_ac,
      counter_ac: 'ACNET',
      id_destino: this.resultJson.destinoSafe,     // obtener desde destiny.id_destino
      facturar_pta: 1,
      id_sucursal: Number(environment.sucursalAgenciaAC),
      id_punto: Number(environment.ptoventaAgenciaAC),
      id_subcodigo: Number(environment.subcodigoAgenciaAC),
      id_solicitante_agencia: '',
      id_comisionista: environment.comisionistaAgenciaAC,
      id_solicitante_area: '',
      comision: 0,
      incentivo: 0,
      incentivo_adicional: 0,
      gasto_emision: 0,
      id_file: 0,
      aplica_descuento: 0,
      id_unidad_negocio: environment.undidadNegocioAC,
      aplica_factura_comision: 0,
      forma_de_pago: this.shopString.formCard.select21, // TARJETA, SAFETYPAY
      porcentaje_descuento: 0,
      usosafetypay: 'N',
      codigo_safetypay: '',
      nro_pedido_srv: 0,
      fee_safetypay: 0,
      validarDuplicidad: false,
      pasajeros: this.pasajerosArr(),
      // pasajeros: [
      //   {
      //     pax_nom: this.shopString.customers[0].nameCustomer,                   // NOMBRE DEL PASAJERO
      //     pax_ape_pat: this.shopString.customers[0].lastNameCustomer,           // APELLIDOS DEL PASAJERO
      //     doc_cid: (this.shopString.customers[0].typeDocCustomer).toLowerCase(),// TIPO DE DOUMENTO DE IDENTIDAD (DNI, PSP, CE)
      //     pax_num_doc: this.shopString.customers[0].numDocCustomer,             // DOCUMENTO DE IDENTIDAD
      //     pax_fec_nac: new Date(this.formattFecha()),                           // FECHA DE NACIMIENTO
      //     pax_voucher_travelace: '-',
      //     pax_control_travelace: '-',
      //     pax_void_travelace: 'N',
      //     pax_boleto: '-',
      //     pax_voideo_pta: '0',
      //     pax_facturado_pta: 0,
      //     pax_precio_emision: this.safe0Json.tarifario[0].precioEmision,            // obtener desde plansAC.producto.tarifario.precioEmision (FILTRAR POR CAMPO EDAD)
      //     pax_precio_emision_local: this.safe0Json.tarifario[0].precioEmisionLocal, // obtener desde plansAC.producto.tarifario.precioEmisionLocal (FILTRAR POR CAMPO EDAD)
      //     pax_precio_neto: this.safe0Json.tarifario[0].precioBrutoLocal             // obtener desde plansAC.producto.tarifario.precioBrutoLocal (FILTRAR POR CAMPO EDAD)
      //   }
      // ],
      cobertura: [
        {
          unidad: this.coverage.Unidad,                                 // obtener desde coverageList.Unidad
          atr_nom: this.coverage.Codigo + ' ' + this.coverage.Nombre,   // obtener desde coverageList.Codigo + ' ' + coverageList.Nombre
          valor: this.coverage.Valor                                    // obtener desde coverageList.Valor
        }
      ],
      nro_intentos_facturacion: 0,
      nro_intentos_emision: 0,
      idfileautomatico: 0,
      xPagarSafetyPay: 0,
      idTipoTarifa: 0,
      idReciboSafetyPay: 0
    }

    let payload = new NMRequestBy<RegistrarSeguroRQ>(lregistro);

    this.secureBookingService.secureBooking(payload).subscribe((response: any) => {
      this.reservation = response
    })
  }

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
        RechargeAmount: (this.resultJson.destinyString.es_nacional === 1) ? (this.shopString.PriceTotal * 1.18) : this.shopString.PriceTotal, //COSTO TOTAL DEL SEGURO; SOLO SI destiny.EsDestinoNacional = 'S' ENTONCES MULTIPLICAR POR 1.18 (IGV)
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
          res_seguro_id: this.reservation.Reserva,                // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
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
          res_seguro_id: this.reservation.Reserva,  // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
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

  getReserva() {
    console.log(this.shopString.formContact.recibo);
    
    let payload = {
      "segmentSelected": [
        this.safe0Json.departure, this.safe0Json.return
      ],
      "IdGroup": this.safe0Json.idGroup,
      "passengers": this.pasajerosVuelos(),
      // "passengers": [
      //   {
      //     "type": "ADT",
      //     "name": "RODRIGO",
      //     "lastName": "CCANCCE",
      //     "birthday": "1998-02-20",
      //     "documentType": 0,
      //     "documentNumber": "72154521",
      //     "gender": "M",
      //     "email": "rodrigo98_22@outlook.com",
      //     "phone": "989454123"
      //   }
      // ],
      contact: {
        name: this.shopString.formContact.nameContacto,
        lastName: this.shopString.formContact.lastnameContacto,
        email: this.shopString.formContact.mailContacto,
        address: (this.shopString.formContact.recibo === undefined) ? this.shopString.formContact.recibo[0].direccion : this.shopString.formCard.address,
        phones: [
          {
            phoneNumber: this.shopString.formContact.numberPhone0
          }
        ]
      }
    }
    console.log(payload);

    // this.reservaVuelosService.reserva(payload, this.tokenJson).subscribe({
    //   next: (response: any) => {
    //     console.log(response)
    //     this.resevaVuelo = response
    // if (this.shopString.formCard.select21 === 'SAFETYPAY') {
    //   this.getGeneratePay()
    // } else {
    //   this.getCardPayment()
    // }
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })
  }

}
