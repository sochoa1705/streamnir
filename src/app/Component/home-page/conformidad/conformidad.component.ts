import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-conformidad',
  templateUrl: './conformidad.component.html',
  styleUrls: ['./conformidad.component.scss']
})
export class ConformidadComponent implements OnInit {
  listBank: any
  listBooking: any

  result: any
  resultJson: any
  safe0: any
  safe0Json: any
  shopData: any
  shopString: any
  unidadNegocio: any

  constructor(
    public route: Router,
    public secureBookingService: SecureBookingService,
    public loaderSubjectService: LoaderSubjectService,
    public generatePayService: GeneratePayService,
  ) {
    //shopdata
    this.shopData = localStorage.getItem('shop')
    this.shopString = JSON.parse(this.shopData)
    //plan
    this.safe0 = localStorage.getItem('safe0')
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    console.log(this.resultJson);
    console.log(this.safe0Json);
  }

  ngOnInit(): void {
    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);

    this.getGeneratePay()
    this.getSecureBooking()
  }

  getSecureBooking() {
    let lregistro: RegistrarSeguroRQ = {
      fec_salida: new Date('09/09/2021'),                     // FECHA DE PARTIDA
      fec_retorno: new Date('16/09/2021'),                    // FECHA DE RETORNO
      cant_paxes: 3,                                          // CANTIDAD DE PASAJEROS
      destino: 'Varios Destinos',                             // NOMBRE DEL DESTINO
      edades: '41;29;0;',                                     // EDADES CONCATENADAS CON PUNTO Y COMA
      prod_id: 'N0-96011-1/E16',                              // obtener desde plansAC.idProducto
      prod_nom: 'AC 30 NM MULTIDESTINOS (INCLUSION DM)',      // obtener desde plansAC.producto
      prod_familia: '',
      moneda_lista: 'USD',
      moneda_local: 'USD',
      precio_bruto: 0.0,                                      // obtener desde plansAC.precioBruto
      precio_bruto_local: 43.20,                              // obtener desde plansAC.precioBrutoLocal
      precio_emision: 0.0,                                    // obtener desde plansAC.precioEmision
      precio_emision_local: 43.20,                            // obtener desde plansAC.precioEmisionLocal
      precio_unitario: 0.0,                                   // obtener desde plansAC.precioUnitario
      tipo_cambio: '4.12',                                    // TIPO DE CAMBIO DEL DIA
      vuelo_res_id: 0,
      contacto_nom: 'MARTIN LOUIS',                           // NOMBRE DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_ape: 'GALLO MARAVI',                           // APELLIDOS DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_email: '',                                     // CORREO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_direccion: '',                                 // DIRECCION DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_telfs: '0',                                    // TELEFONO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR CERO
      contacto_emerg_nom: 'MARTIN',                           // NOMBRE DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_ape: 'GALLO MARAVI',                     // APELLIDOS DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_email: '-',                              // CORREO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      contacto_emerg_telf: '991689619',                       // TELEFONO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      ruc: 'BV-00112233',                                     // TIPO DE COMPROBANTE DE PAGO (BV / FC) Y DOCUMENTO (DNI / RUC) DEL PRIMER PASAJERO ADULTO
      razon_social: 'MARTIN LOUIS GALLO MARAVI',              // NOMBRE Y APELLIDO DEL PRIMER PASAJERO ADULTO O LA RAZON SOCIAL CUANDO SEA FACTURA
      direccion_fiscal: 'AV. JOSE PARDO NRO. 801',            // DIRECCION DEL PRIMER PASAJERO ADULTO O DIRECCION DE LA EMPRESA
      comentario: '',
      webs_cid: 1,
      usuweb_id: 6996,
      destinonacional: 'N',                                   // obtener desde destiny.EsDestinoNacional
      numeroruc: '',
      comprobantepago: 'BV',                                  // TIPO DE COMPROBANTE DE PAGO (BV / FC)
      usobilletera: 'N',
      codigobloqueo: '',
      dkcliente: environment.dkAgenciaAC,
      producto: 'AC 30 NM MULTIDESTINOS (INCLUSION DM)',      // obtener desde plansAC.producto
      pnr: '',
      pais_ac: this.unidadNegocio.id_pais_ac,
      agencia_ac: this.unidadNegocio.codigo_ac,
      sucursal_ac: this.unidadNegocio.sucursal_ac,
      counter_ac: 'ACNET',
      id_destino: 12,                                         // obtener desde destiny.id_destino
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
      forma_de_pago: 'CASH',                                  // TARJETA, SAFETYPAY
      porcentaje_descuento: 0,
      usosafetypay: 'N',
      codigo_safetypay: '',
      nro_pedido_srv: 0,
      fee_safetypay: 0,
      validarDuplicidad: false,
      pasajeros: [
        {
          pax_nom: 'LUIS',                                    // NOMBRE DEL PASAJERO
          pax_ape_pat: 'GALLO',                               // APELLIDOS DEL PASAJERO
          doc_cid: 'PSP',                                     // TIPO DE DOUMENTO DE IDENTIDAD (DNI, PSP, CE)
          pax_num_doc: '112563259',                           // DOCUMENTO DE IDENTIDAD
          pax_fec_nac: new Date('20/10/1979'),                // FECHA DE NACIMIENTO
          pax_voucher_travelace: '-',
          pax_control_travelace: '-',
          pax_void_travelace: 'N',
          pax_boleto: '-',
          pax_voideo_pta: '0',
          pax_facturado_pta: 0,
          pax_precio_emision: 0.0,                            // obtener desde plansAC.producto.tarifario.precioEmision (FILTRAR POR CAMPO EDAD)
          pax_precio_emision_local: 14.40,                    // obtener desde plansAC.producto.tarifario.precioEmisionLocal (FILTRAR POR CAMPO EDAD)
          pax_precio_neto: 11.376                             // obtener desde plansAC.producto.tarifario.precioBrutoLocal (FILTRAR POR CAMPO EDAD)
        }
      ],
      cobertura: [
        {
          unidad: '',                                         // obtener desde coverageList.Unidad
          atr_nom: 'C.4.1.10.1 ASIST. MÉDICA POR ACCIDENTE',  // obtener desde coverageList.Codigo + ' ' + coverageList.Nombre
          valor: 'EUR 30.000/ RESTO DEL MUNDO USD 30.000'     // obtener desde coverageList.Valor
        }
      ],
      nro_intentos_facturacion: 0,
      nro_intentos_emision: 0,
      idfileautomatico: 0,
      xPagarSafetyPay: 0,
      idTipoTarifa: 0,
      idReciboSafetyPay: 0
    };

    let payload = new NMRequestBy<RegistrarSeguroRQ>(lregistro);

    this.secureBookingService.secureBooking(payload).subscribe((e: any) => console.log(e))
  }

  getGeneratePay() {
    const textSend = 'SE ESTA PROCESANDO TU PAGO!'
    this.loaderSubjectService.showText(textSend)
    this.loaderSubjectService.showLoader()
    // let payload = {
    //   "Aplicacion": "Intranet",
    //   "CodigoSeguimiento": "[Web: midominio.com - Agente: demo - Id: 19082021101601]",
    //   "CodigosEntorno": "DESA/NMO/NMO",
    //   "Parametros": {
    //     "PromoterName": "",
    //     "CustomerName": "PEREZ ANA",
    //     "CustomerDocumentNumber": "10078410452",
    //     "IdClient": 12758,
    //     "WebId": "3",
    //     "Mail": "anaperez@gmail.com",
    //     "DKClient": "61649",
    //     "UserAgent": "Assist Card",
    //     "IdUser": "87614",
    //     "IpUser": "119.5.166.59",
    //     "Amount": {
    //       "FeeAmount": 0.9,
    //       "RechargeAmount": 64,
    //       "Currency": "USD"
    //     }
    //   }
    // }

    let lsafetypay: GenerarSafetyPayRQ = {
      PromoterName: 'PASAJERO DIRECTO',                 //NOMBRE DEL PRIMER PASAJERO ADULTO
      CustomerName: 'PASAJERO DIRECTO',                 //NOMBRE DEL PRIMER PASAJERO ADULTO
      CustomerDocumentNumber: '00112298',               //DOCUMENTO DEL PRIMER PASAJERO ADULTO
      IdClient: Number(environment.dkAgenciaAC),
      WebId: '3',
      Mail: this.shopString.formContact.mailContacto,   //MAIL DEL PASAJERO
      DKClient: environment.dkAgenciaAC,
      UserAgent: environment.identifierAC,
      IdUser: '6996',
      IpUser: '0.0.0.0',                                //IP DEL CLIENTE
      Amount: {
        FeeAmount: 0,
        RechargeAmount: 100,                            //COSTO TOTAL DEL SEGURO; SOLO SI destiny.EsDestinoNacional = 'S' ENTONCES MULTIPLICAR POR 1.18 (IGV)
        Currency: 'USD'
      }
    }

    let payload = new NMRequestBy<GenerarSafetyPayRQ>(lsafetypay);

    this.generatePayService.generatePay(payload).subscribe({
      next: (response) => {
        console.log(response)
        this.listBank = response
        this.loaderSubjectService.closeLoader()

        let lactualizar: SafetyPayRQ = {
          res_seguro_id: 1111,                          // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
          usosafetypay: 'S',
          codigo_safetypay: '',                         // obtener desde this.listBank.TransactionIdentifier
          nro_pedido_srv: 11,                           // obtener desde this.listBank.IDPedido
          fee_safetypay: 0
        }
    
        let payloadupdate = new NMRequestBy<SafetyPayRQ>(lactualizar);

        //>>>> EJECUTAR SERVICIO EN CASO SE HAYA GENERADO CORRECTAMENTE LOS DATOS DE PAGO DE SAFETYPAY
      }
      ,
      error: error => {
        console.log(error)
        this.loaderSubjectService.closeLoader()
        this.route.navigateByUrl('/home/seguros');

        //>>>> EN CASO SALGA ERROR SE DEBE DE ELIMINAR LA SOLICITUD

        let lanular: CambiarEstadoRQ = {
          res_seguro_id: 1111,                          // CODIGO DE LA SOLICITUD DE REGISTRO GENERADO (this.secureBookingService.)
          estado: 7
        }
    
        let payloadanular = new NMRequestBy<CambiarEstadoRQ>(lanular);
      }
    })
  }


}
