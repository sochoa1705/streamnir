import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toUp } from 'src/app/shared/utils';
import { CryptoService } from 'src/app/Services/util/crypto.service';

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
  agesCustomers: any
  //COBERTURA
  coverageList: any
  coverage: any
  asistMedic: any;

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

  paymentDataStr: any;
  paymentData: any;

  reservationCode: string;
  timeLimit: string;
  deadLine: string;

  constructor(
    public route: Router,
    private _cryptoService: CryptoService
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
    this.typePay = this.shopString.paymentMethodForm.select21;

    this.paymentDataStr = localStorage.getItem('paymentData');
    this.paymentData = JSON.parse(this.paymentDataStr);
  }

  ngOnInit(): void {
    toUp();

    let userID: string = '';
    let user_existingCustomer: boolean = false;
    const credentials = localStorage.getItem('usuario');
    const bookings = localStorage.getItem('bookings');

    if (credentials) {
      const credentialsJson = JSON.parse(credentials);
      userID = this._cryptoService.encrypt(credentialsJson.email);

      if (bookings)
        user_existingCustomer = JSON.parse(bookings).length > 0;
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "user_info",
      userID: userID,
      user_existingCustomer: user_existingCustomer
    });

    (window as any).dataLayer.push({
      event: "virtualPageView",
      virtualPagePath: "/conformidad",
      virtualPageTitle: "NMV: Conformidad"
    });

    this.ShowComponentTime = false
    let lcadena: any = localStorage.getItem('businessunit');
    this.unidadNegocio = JSON.parse(lcadena);
    this.edades()
    console.log(this.safe0Json['reservaVuelos'])


    if (this.paymentData.Result.ServiceResponse.Status === 'SUCCESS') {

      this.reservationCode = this.paymentData.Result.ServiceResponse.Code;
      const expirationDatetime = this.paymentData.Result.ServiceResponse.Result.Payment_Expiration_Datetime;

      this.timeShop(expirationDatetime);
      this.timeLimit = this.paymentData.Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(11, 5);
      this.deadLine = this.paymentData.Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(0, 10);

      /*this.reservationCode = JSON.parse(this.paymentData).Result.ServiceResponse.Code;
      this.timeShop(JSON.parse(this.paymentData).Result.ServiceResponse.Result.Payment_Expiration_Datetime);
      this.timeLimit = JSON.parse(this.paymentData).Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(11, 5);
      this.deadLine = JSON.parse(this.paymentData).Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(0, 10);*/

      if (Object.keys(this.coverage).length === 0) {
        this.asistMedic = 0
      } else {
        this.asistMedic = this.coverage.find((e: any) => {
          if (e.Codigo === 'C.4.1.10.1') {
            return e
          }
        })['Valor']
      }
    }

    /* if (this.safe0Json['reservaVuelos']) {
      console.log('INICIA RESERVA V');
      this.getReserva()
    } else {
      this.getSecureBooking()
    }
    this.getGeneratePay()
    this.getCardPayment()
    if (this.shopString.paymentMethodForm.select21 === 'SAFETYPAY') {
      this.getGeneratePay()
    } else {
      this.getCardPayment()
    } */
  }

  timeShop(expirationDatetime: string) {
    let dayPay = expirationDatetime;
    let day = dayPay.substr(0, 2);
    let month = dayPay.substr(3, 2);
    let year = dayPay.substr(6, 4);
    let hour = dayPay.substr(11, 5);
    let newDate = `${year}/${month}/${day} ${hour}`;
    let datePay = new Date(newDate);

    const dayStart = new Date();
    const difference = datePay.getTime() - dayStart.getTime();
    const resultInMinutes = Math.round(difference / 60000);
    this.timeShow = resultInMinutes * 60;
    this.ShowComponentTime = true;
  }

  edades() {
    let Ages = []
    // Obtiene la fecha de hoy
    let Today = new Date()
    let day = String(Today.getDate()).padStart(2, '0') + String(Today.getMonth() + 1).padStart(2, '0') + String(Today.getFullYear())
    // Obtiene la fecha de nacimiento
    for (let e of this.shopString.customers) {
      let customer = e.dayCustomer.padStart(2, '0') + e.monthCustomer.padStart(2, '0') + e.yearCustomer
      let Edad = Math.ceil((Number(day) - Number(customer)) / (1000 * 300)) + 1
      Ages.push(Edad)
    }
    this.agesCustomers = Ages.join(';')
    // return Edad
  }

}
