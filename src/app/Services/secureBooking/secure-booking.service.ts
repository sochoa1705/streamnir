import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINT_API } from 'src/app/shared/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecureBookingService {

  constructor(
    private http: HttpClient
  ) { }

  // payload = {
  //   "Aplicacion": "Intranet",
  //   "CodigoSeguimiento": "Test",
  //   "CodigosEntorno": "PROD/NMO/NMO",
  //   "Parametros": {
  //     "fec_salida": "09/09/2021",
  //     "fec_retorno": "16/09/2021",
  //     "cant_paxes": 3,
  //     "destino": "Varios Destinos",
  //     "edades": "41;29;0;",
  //     "prod_id": "N0-96011-1/E16",
  //     "prod_nom": "AC 30 NM MULTIDESTINOS (INCLUSION DM)",
  //     "moneda_lista": "USD",
  //     "moneda_local": "USD",
  //     "precio_bruto": 0.0,
  //     "precio_bruto_local": 43.20,
  //     "precio_emision": 0.0,
  //     "precio_emision_local": 43.20,
  //     "precio_unitario": 0.0,
  //     "tipo_cambio": "4.12",
  //     "vuelo_res_id": 0,
  //     "contacto_nom": "MARTIN LOUIS",
  //     "contacto_ape": "GALLO MARAVI",
  //     "contacto_telfs": "-",
  //     "contacto_emerg_nom": "MARTIN",
  //     "contacto_emerg_ape": "GALLO MARAVI",
  //     "contacto_emerg_telf": "991689619",
  //     "ruc": "RUC-20109796841",
  //     "razon_social": "DESTINOS MUNDIALES S.A.C",
  //     "comentario": "",
  //     "webs_cid": 1,
  //     "usuweb_id": 81655,
  //     "destinonacional": "N",
  //     "comprobantepago": "FC",
  //     "usobilletera": "N",
  //     "codigobloqueo": "",
  //     "dkcliente": "771",
  //     "producto": "AC 30 NM MULTIDESTINOS (INCLUSION DM)",
  //     "pnr": "",
  //     "pais_ac": 510,
  //     "agencia_ac": 87823,
  //     "sucursal_ac": 0,
  //     "counter_ac": "ACNET",
  //     "id_destino": 12,
  //     "facturar_pta": 0,
  //     "id_sucursal": 3,
  //     "id_punto": 133,
  //     "id_subcodigo": 12,
  //     "id_solicitante_agencia": "V69",
  //     "id_comisionista": "V69",
  //     "id_solicitante_area": "T55",
  //     "comision": 0.0,
  //     "incentivo": 0.0,
  //     "incentivo_adicional": 0.0,
  //     "gasto_emision": 0.0,
  //     "id_file": 0,
  //     "aplica_descuento": 0,
  //     "direccion_fiscal": "AV. JOSE PARDO NRO. 801",
  //     "id_unidad_negocio": 3,
  //     "aplica_factura_comision": 0,
  //     "forma_de_pago": "CASH",
  //     "porcentaje_descuento": 0.0,
  //     "usosafetypay": "N",
  //     "codigo_safetypay": "",
  //     "nro_pedido_srv": 0,
  //     "fee_safetypay": 0.0,
  //     "validarDuplicidad": false
  //   },
  //   "Pasajeros": [
  //     {
  //       "pax_nom": "LUIS",
  //       "pax_ape_pat": "GALLO",
  //       "doc_cid": "PSP",
  //       "pax_num_doc": "112563259",
  //       "pax_fec_nac": "20/10/1979",
  //       "pax_voucher_travelace": "-",
  //       "pax_control_travelace": "-",
  //       "pax_void_travelace": "N",
  //       "pax_boleto": "-",
  //       "pax_voideo_pta": "",
  //       "pax_facturado_pta": 0,
  //       "pax_precio_emision": 0.0,
  //       "pax_precio_emision_local": 14.40,
  //       "pax_precio_neto": 11.376
  //     }
  //   ],
  //   "cobertura": [
  //     {
  //       "atr_nom": "C.4.1.10.1 ASIST. MÉDICA POR ACCIDENTE",
  //       "valor": "EUR 30.000/ RESTO DEL MUNDO USD 30.000"
  //     }
  //   ]
  // }

  secureBooking(payload: any): Observable<any> {
    let url_api = `${environment.urlBase}${ENDPOINT_API.SECURE_BOOKING}`;

    return this.http.post<any>(url_api, payload, { observe: 'response' }).pipe(
      map((observe: any) => observe['body']['Resultado'])
    )
  }
}
