
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoberturaSeguroRQ } from 'src/app/Models/seguros/coberturaRQ.interface';
import { CoverageService } from 'src/app/Services/coverage/coverage.service';
import { NMRequestBy } from 'src/app/Models/base/NMRequestBy';
import { take } from 'rxjs/operators';
import { ICardRequest, IFiltroVuelo } from './interfaces/comprar.interfaces';
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';
import { ActualizarCodigoSafetyPaySeguroRQ, ActualizarEstadoSeguroRQ, RegistrarSeguroRQ } from '../../../Models/seguros/registroRQ.interface';
import { environment } from '../../../../environments/environment.prod';
import { SecureBookingService } from '../../../Services/secureBooking/secure-booking.service';
import { Guid, toUp, Utilities } from 'src/app/shared/utils';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CardPaymentService } from 'src/app/Services/cardPayment/card-payment.service';
import { GeneratePayService } from 'src/app/Services/generatePay/generate-pay.service';
import { CardService, PaymentService } from 'src/app/api/api-payment/services';
import { PaymentMethodEnum, RqPaymentCeRequest1 } from 'src/app/api/api-payment/models';
import * as moment from 'moment';
import { PreferenceService } from 'src/app/Services/preference/preference.service';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { ActionFieldCheckout, ActionFieldCheckoutOption, Checkout, CheckoutOption, EcommerceCheckout, EcommercecheckoutOption, ModelTaggingCheckout, ModelTaggingcheckoutOption, ProductAddToCart } from 'src/app/Services/analytics/tagging.models';
import { TaggingService } from 'src/app/Services/analytics/tagging.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { MessageService } from 'src/app/api/api-correos/services';
import { CeResponse, CeSeguroCeEmailParameterCustomCeRequest1, EnumRequestApplications, EnumRequestCompanies } from 'src/app/api/api-correos/models';
import { UtilService } from 'src/app/Services/util/util.service';

interface Methods {
  id: string;
  name: string;
  value: string;
  img: string;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit, AfterViewInit {

  formShop!: FormGroup;
  paymentMethodForm: FormGroup;
  contactForm: FormGroup;

  errors: any[] = [];
  MSG_EMPTY: string = 'none';
  //COBERTURA

  showInvoiceData: boolean = false;

  coverageDisplay: boolean = false;
  unidadNegocio: any;
  businessunit: any;
  // coverageList: any
  coverageL: any;
  asistMedic: any;
  asistenciaMedicaMonto: number;
  listBank: any;
  timeShow!: number;
  ShowComponentTime!: boolean;

  countries: Array<any> = [];
  months: Array<any> = [];

  current: any
  detailPay!: string
  filter!: string
  title!: string
  asistencia!: boolean
  reembolso!: boolean
  detalleViaje!: boolean
  detalleCobertura!: boolean
  cupon!: boolean
  mobile!: boolean
  selectedPay: string
  selectedPopup: string = 'agencia'
  result: any
  resultJson: any
  safe0: any
  safe0Json: any
  filtroVuelo: any
  filtroVueloJson: IFiltroVuelo;
  banca: boolean = true

  pressedToBuy: boolean = false;

  banks = [
    { name: 'Banco de Crédito', value: 1005 },
    { name: 'Interbank', value: 1011 },
    { name: 'Scotiabank', value: 1006 },
    { name: 'Western Union', value: 8320 },
    { name: 'Banco Ripley', value: 8320 },
    { name: 'Caja Arequipa', value: 8324 },
    { name: 'Caja Huancayo', value: 8250 },
    { name: 'Caja Tacna', value: 1024 },
    { name: 'Caja Trujillo', value: 1025 }
  ];

  metodoPago: Methods[]

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  detalleVuelos: any;

  modalDetalle: any | null;

  resevaVuelo: any
  shopData: any
  shopString: any
  token: any
  tokenJson: any
  agesCustomers: any
  cambio: any
  tipodeCambio: any
  coverageList: any
  coverage: any

  planesList: any
  planes: any

  reservation: any
  dataShop: any
  bankSteps: any
  paymentData: any

  @ViewChild('adultoCdr', { static: false }) adulto!: ElementRef<HTMLInputElement>
  @ViewChild('nameContactForm', { static: false }) inputNameContactForm!: ElementRef<HTMLInputElement>
  @ViewChild('lastNameContactForm', { static: false }) inputLastNameContactForm!: ElementRef<HTMLInputElement>

  nombre: string;
  apellido: string;
  showAgregarAdulto: boolean = true;
  showDetalle: boolean = false;
  showAdulto: number;

  checkedCard = false;

  isVisa = false;
  isMasterCard = false;
  isAmericanExpress = false;
  isDinners = false;
  count: number = 0;
  countInfante: number = 0;
  countNinio: number = 0;
  countAdulto: number = 0;

  totalToPay: number = 0;

  ip: string = '';

  constructor(
    private _router: Router,
    private _coverageService: CoverageService,
    private _loaderSubjectService: LoaderSubjectService,
    private _secureBookingService: SecureBookingService,
    private _cardPaymentService: CardPaymentService,
    private _generatePayService: GeneratePayService,
    private _paymentService: PaymentService,
    private _preferencesService: PreferenceService,
    private _validatorsService: ValidatorsService,
    private _cardService: CardService,
    private _formBuilder: FormBuilder,
    private _notification: NotificationService,
    private _messageService: MessageService,
    public utilService: UtilService
  ) {
    // COBERTURA
    this.coverageList = localStorage.getItem('coverage');
    this.coverage = JSON.parse(this.coverageList);

    this.planesList = localStorage.getItem('planes');
    this.planes = JSON.parse(this.planesList);

    // Token
    this.token = localStorage.getItem('token');
    this.tokenJson = JSON.parse(this.token);
    // TIPO DE CAMBIO
    this.cambio = localStorage.getItem('tipoCambio');
    this.tipodeCambio = JSON.parse(this.cambio);
    // shopdata
    this.shopData = localStorage.getItem('shop');
    this.shopString = JSON.parse(this.shopData);

    this.filtroVuelo = localStorage.getItem('filtroVuelo');
    this.filtroVueloJson = JSON.parse(this.filtroVuelo);

    this.safe0 = localStorage.getItem('safe0');
    this.safe0Json = JSON.parse(this.safe0);

    const detalleVuelosStr: any = localStorage.getItem('detalleVuelo');
    this.detalleVuelos = JSON.parse(detalleVuelosStr);

    this.unidadNegocio = localStorage.getItem('businessunit')
    this.businessunit = JSON.parse(this.unidadNegocio)
    console.log("resultJson", this.resultJson);
    console.log("safe0Json", this.safe0Json);
    console.log(screen.width);

    if (screen.width < 769) {
      this.mobile = true
    } else {
      this.mobile = false
    }

    this.current = this._router.getCurrentNavigation()!.extras.state as any
    if (!this.current) {
      this._router.navigate(['/seguros'])
    }

    this.selectedPay = (this.current['filter'] === 'filter') ? 'tarjeta' : 'safetypay'
    if (this.current['filter'] === 'filter') {
      this.metodoPago = [
        { name: 'optionm-1', value: 'TARJETA', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: true, id: "0" },
        { name: 'optionm-2', value: 'SAFETYPAY', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: false, id: "1" },
      ]
    } else {
      this.metodoPago = [
        { name: 'optionm-2', value: 'SAFETYPAY', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: true, id: "1" },
        { name: 'optionm-1', value: 'TARJETA', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: false, id: "0" },
      ]
    }
  }

  getIp(): void {
    this.utilService.getIP().subscribe(res => {
      this.ip = res.ip;
    });
  }

  ngOnInit(): void {
    this.getIp();
    this.count = 0;
    this.countAdulto = 0;
    this.countInfante = 0;
    this.countNinio = 0;
    toUp();
    this.loadShop();

    this.result = localStorage.getItem('Datasafe');
    this.resultJson = JSON.parse(this.result);

    this.totalToPay = this.safe0Json.tarifario.reduce((acc: number, item: any) => acc + Number(item.precioEmisionLocal), 0).toFixed(2);

    this.months = [
      { value: "01", name: "Enero" },
      { value: "02", name: "Febrero" },
      { value: "03", name: "Marzo" },
      { value: "04", name: "Abril" },
      { value: "05", name: "Mayo" },
      { value: "06", name: "Junio" },
      { value: "07", name: "Julio" },
      { value: "08", name: "Agosto" },
      { value: "09", name: "Septiembre" },
      { value: "10", name: "Octubre" },
      { value: "11", name: "Noviembre" },
      { value: "12", name: "Diciembre" }
    ];

    this.formShop = this.createInsuranceForm();

    console.log(this.resultJson);
    console.log(this.filtroVueloJson);

    const pasajeros = this.resultJson !== null ? this.resultJson['passengers'] : this.filtroVueloJson['pasajeros'];
    console.log(pasajeros);

    pasajeros.forEach((element: any) => {
      let formGroup = this.createCustomerForm();

      formGroup.patchValue(element);

      (<FormArray>this.formShop.controls['customers']).push(formGroup);
    });

    this.getCountries();

    if (this.current['filter'] !== 'filter') this.listCoverage();
    this.dataLayerPushCheckout(this.safe0Json, this.resultJson);
  }

  getCountries() {
    this._preferencesService.getCountries().subscribe({
      next: response => {
        this.countries = response['Result'];
      }
    })
  }

  createPaymentMethodForm(): FormGroup {
    return this._formBuilder.group({
      bankPay: [''],
      select21: [this.current['filter'] === 'filter' ? 'TARJETA' : 'SAFETYPAY'],
      numberCard: [''],
      nameCard: [''],
      expiredCard: [''],
      ccvCard: [''],
      tipoDoc: [''],
      numDoc: [''],
      feePay: [''],
      cityCard: [''],
      address: ['']
    });
  }

  createContactForm(): FormGroup {
    return this._formBuilder.group({
      chkCustomer: [''],
      nameContacto: [this.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this._validatorsService.lettersPattern)]],
      lastnameContacto: [this.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this._validatorsService.lettersPattern)]],
      mailContacto: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      mailConfirmContacto: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      typePhone0: ['', [Validators.required]],
      code0: ['511', [Validators.required]],
      numberPhone0: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern(this._validatorsService.digitsPattern)]],
      ruc: [''],
      razonSocial: [''],
      direccion: [''],
      invoiceRequestBox: [false]
    }, {
      validators: [
        this._validatorsService.equalFields('mailContacto', 'mailConfirmContacto'),
        this._validatorsService.validateAddress('invoiceRequestBox', 'direccion'),
        this._validatorsService.validateBusinessName('invoiceRequestBox', 'razonSocial'),
        this._validatorsService.validateRUC('invoiceRequestBox', 'ruc')
      ]
    });
  }

  createCustomerForm(): FormGroup {
    return this._formBuilder.group({
      typeCustomer: [""],
      nameCustomer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this._validatorsService.lettersPattern)]],
      lastNameCustomer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this._validatorsService.lettersPattern)]],
      dayCustomer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(31), Validators.pattern(this._validatorsService.digitsPattern)]],
      monthCustomer: ['', [Validators.required]],
      yearCustomer: ['', [Validators.required]],
      nationalityCustomer: ['', [Validators.required]],
      typeDocCustomer: ['', [Validators.required]],
      numDocCustomer: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this._validatorsService.alphanumericPattern)]],
      sexCustomer: ['', [Validators.required]]
    });
  }

  createInsuranceForm(): FormGroup {
    this.paymentMethodForm = this.createPaymentMethodForm();
    this.contactForm = this.createContactForm();

    return this._formBuilder.group({
      customers: this._formBuilder.array([]),
      paymentMethodForm: this.paymentMethodForm,
      contactForm: this.contactForm,
      chkPolity: [false, [Validators.requiredTrue]],
      chkInfo: [false]
    });
  }

  validateInsuranceForm(field: string) {
    return this.formShop.controls[field].errors
      && this.formShop.controls[field].touched;
  }

  validateContactForm(field: string) {
    return this.contactForm.controls[field].errors
      && this.contactForm.controls[field].touched;
  }

  validatePaymentMethodForm(field: string) {
    return this.paymentMethodForm.controls[field].errors
      && this.paymentMethodForm.controls[field].touched;
  }

  get contactEmailErrorMessage(): string {
    const errors = this.contactForm.get('mailContacto')?.errors;

    if (errors?.required) {
      return 'Ingresa tu email de contacto';
    } else if (errors?.minlength) {
      return `Un email válido tiene ${errors?.minlength.requiredLength} caracteres como mínimo.`;
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de email.';
    }

    return '';
  }

  get contactRUCErrorMessage(): string {
    const errors = this.contactForm.get('ruc')?.errors;

    if (errors?.required) {
      return 'Ingresa el número de RUC';
    } else if (errors?.minlength) {
      return `Un RUC válido tiene ${errors?.minlength.requiredLength} dígitos.`;
    } else if (errors?.notValid) {
      return 'Ingresa un número de RUC válido.';
    }

    return '';
  }

  public validarTarjeta(): void {
    this.checkedCard = false;
    this.setCardsDefault();
    this.checkCardService();
  }

  private setCardsDefault() {
    this.isVisa = false;
    this.isMasterCard = false;
    this.isAmericanExpress = false;
    this.isDinners = false;
  }

  private checkCardService(): void {
    let nroTarjeta: string = this.paymentMethodForm.controls['numberCard'].value;
    if (nroTarjeta.length > 15) {
      let data: ICardRequest = {
        MuteExceptions: false,
        TrackingCode: Guid(),
        Caller: {
          Application: 'Agil',
          Company: 'Interagencias'
        },
        Parameter: {
          Number: this.paymentMethodForm.controls['numberCard'].value
        }
      };

      this._cardService.v1ApiCardGet({
        'Parameter.Bin': this.paymentMethodForm.controls['numberCard'].value,
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        'Caller.Company': 'Agil',
        'Caller.Application': 'Interagencias',
        'Caller.FromIP': '',
        'Caller.FromBrowser': ''
      }).subscribe((res: any) => {
        if (JSON.parse(res).Result.IsSuccess) {
          this.setCardsDefault();
          this.checkedCard = JSON.parse(res).Result.IsSuccess;
          let typeCard = Utilities.getCardType(this.paymentMethodForm.controls['numberCard'].value);
          if (typeCard === 'Visa') {
            this.isVisa = true;
          }

        } else {
          console.log('La tarjeta ingresada es inválida');
          //this.showAlert('error', 'Error', 'La tarjeta ingresada es inválida');
        }
      });
    }
  }

  startContactDetails(): void {
    const option: string = this.selectedPay === 'tarjeta' ? 'Tarjeta de Credito o Debito' : `SafetyPay - ${this.banca ? 'Banca por Internet' : 'Agencias/Agentes'}`;

    const model = {
      event: 'nmv.seguros_eecga3_checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: {
            step: 2,
            option: option
          }
        }
      }
    }

    TaggingService.tagSelectionOfPaymentMethod(model);

    const model2 = {
      event: 'nmv.seguros_eecga3_checkout',
      ecommerce: {
        checkout: {
          actionField: {
            step: 3
          }
        }
      }
    }

    TaggingService.tagStartOfContactData(model2);
  }

  showDataContacto: Boolean = true;

  showDataContact() {
    this.showDataContacto = this.showDataContacto ? false : true;
  }

  ngAfterViewInit() {
    for (let x = 0; x < this.formShop.getRawValue()['customers'].length; x++) {
      let checked = document.getElementById("sexMasc" + x);
      (<HTMLInputElement>checked).checked = false;
    }
  }

  toCustomer(e: any) {
    let chk = e.target.checked

    let customerName = this.formShop.getRawValue()['customers'][0]['nameCustomer'];
    let customerLastName = this.formShop.getRawValue()['customers'][0]['lastNameCustomer'];

    if (chk) {
      this.inputNameContactForm.nativeElement.value = customerName
      this.inputLastNameContactForm.nativeElement.value = customerLastName

      this.inputNameContactForm.nativeElement.focus()

    } else {
      this.inputNameContactForm.nativeElement.value = ''
      this.inputLastNameContactForm.nativeElement.value = ''
    }
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }

  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }

  get customers() {
    return this.formShop.get('customers') as FormArray;
  }

  loadShop(): void {
    this.detailPay = this.current.detailPay;
    this.filter = this.current.filter;
    this.title = this.current.title;
    this.asistencia = this.current.asistencia;
    this.reembolso = this.current.reembolso;
    this.detalleViaje = this.current.detalleViaje;
    this.detalleCobertura = this.current.detalleCobertura;
    this.cupon = this.current.cupon;
  }

  chkValuePopup(e: any) {
    const type = e.target.id;
    if (type === 'option1') {
      this.selectedPopup = 'agencia';
    } else {
      this.selectedPopup = 'agente';
    }
  }

  chkValue(e: any) {
    const nationality = this.countries.find(x => x.Iata === this.formShop.getRawValue()['customers'][0]['nationalityCustomer'])?.Name;

    if (nationality === undefined) {
      this._notification.showNotificacion("Error", "Debe ingresar previamente los datos del pasajero");
      return;
    }
    else {
      const model1 = {
        event: 'nmv.seguros_eecga3_checkoutOption',
        ecommerce: {
          checkout_option: {
            actionField: {
              step: 1,
              option: nationality
            }
          }
        }
      }

      TaggingService.tagNationalitySelection(model1);
      const model = {
        event: 'nmv.seguros_eecga3_checkout',
        ecommerce: {
          checkout: {
            actionField: {
              step: 2
            }
          }
        }
      }

      TaggingService.tagStartOfPaymentMethods(model);

      if (e === 'optionm-1' || e === 'option-1')
        this.selectedPay = 'tarjeta';
      else
        this.selectedPay = 'safety';
    }
  }

  id: any = "banca";

  optionPay(e: any, isBankingOrMobile: boolean, ids: any) {

    this.banca = isBankingOrMobile;
    this.id = ids;
    const nationality = this.countries.find(x => x.Iata === this.formShop.getRawValue()['customers'][0]['nationalityCustomer'])?.Name;

    if (nationality === undefined) {
      this._notification.showNotificacion("Error", "Debe ingresar previamente los datos del pasajero");
      return;
    }
    else {
      const model1 = {
        event: 'nmv.seguros_eecga3_checkoutOption',
        ecommerce: {
          checkout_option: {
            actionField: {
              step: 1,
              option: nationality
            }
          }
        }
      }

      TaggingService.tagNationalitySelection(model1);

      const model = {
        event: 'nmv.seguros_eecga3_checkout',
        ecommerce: {
          checkout: {
            actionField: {
              step: 2
            }
          }
        }
      }

      TaggingService.tagStartOfPaymentMethods(model);
    }
  }

  buyInsurance(): void {
    console.log('1. buyInsurance');

    if (this.formShop.invalid)
      this.formShop.markAllAsTouched();

    if (this.paymentMethodForm.invalid)
      this.paymentMethodForm.markAllAsTouched();

    if (this.contactForm.invalid)
      this.contactForm.markAllAsTouched();

    if (this.formShop.invalid || this.paymentMethodForm.invalid || this.contactForm.invalid)
      return;

    this.pressedToBuy = true;

    this.formShop.addControl('tipoRecibo', new FormControl('BV'));
    this.formShop.addControl('PriceTotal', new FormControl(this.safe0Json.precioEmisionLocal));

    this.dataShop = this.formShop.value;
    let dataShop = this.formShop.value;
    localStorage.setItem('shop', JSON.stringify(dataShop));

    this.generateInsuranceReserve(dataShop);
  }

  generateInsuranceReserve(data: any): void {

    let dataShop = this.formShop.value;
    console.log("dataShopForm:", dataShop)
    this._loaderSubjectService.showText('SE ESTA GENERANDO SU RESERVA!');
    this._loaderSubjectService.showLoader();

    const payload = new NMRequestBy<RegistrarSeguroRQ>(this.generatePayloadForInsurance(data));

    this._secureBookingService.generateInsuranceReserve(payload).subscribe((response: any) => {
      this.reservation = response;
      localStorage.setItem('reserva', JSON.stringify(response))
      //console.log('Codigo de reserva:', this.reservation);

      this._loaderSubjectService.closeLoader();

      this.makePayment(data);
    })
  }

  sendDataLayerCheckoutOption(value: any): void {
    let nacionalidad = value.customers[0].nationalityCustomer;
    let actionField: ActionFieldCheckoutOption = {
      step: 1,
      option: nacionalidad
    }
    let checkout_option: CheckoutOption = {
      actionField: actionField
    }
    let ecommerce: EcommercecheckoutOption = {
      checkout_option: checkout_option
    }
    let modelTaggingcheckoutOption: ModelTaggingcheckoutOption = {
      event: 'nmv.seguros_eecga3_checkoutOption',
      ecommerce: ecommerce
    }

    TaggingService.tagCheckoutOption(modelTaggingcheckoutOption);
  }

  generatePayloadForInsurance(data: any): RegistrarSeguroRQ {

    console.log('generatePayloadForInsurance');

    this.getPassengerAges();

    const fechasalida = this.resultJson.fromDate.split('/');
    const fecharetorno = this.resultJson.toDate.split('/');

    const payload: RegistrarSeguroRQ = {
      fec_salida: `${fechasalida[2]}-${fechasalida[1]}-${fechasalida[0]}`,                       // FECHA DE PARTIDA
      fec_retorno: `${fecharetorno[2]}-${fecharetorno[1]}-${fecharetorno[0]}`,                        // FECHA DE RETORNO
      cant_paxes: this.resultJson.passengers.length,             // CANTIDAD DE PASAJEROS
      destino: this.resultJson.destinyString.descripcion_destino, // NOMBRE DEL DESTINO
      edades: `${this.agesCustomers};`,                           // EDADES CONCATENADAS CON PUNTO Y COMA
      prod_id: this.safe0Json.idProducto,                         // obtener desde plansAC.idProducto
      prod_nom: this.safe0Json.producto,                          // obtener desde plansAC.producto
      prod_familia: '',
      moneda_lista: 'USD',
      moneda_local: 'USD',
      precio_bruto: this.safe0Json.precioEmisionLocal,                  // obtener desde plansAC.precioBruto
      precio_bruto_local: this.safe0Json.precioBrutoLocal,       // obtener desde plansAC.precioBrutoLocal
      precio_emision: this.safe0Json.precioEmision,              // obtener desde plansAC.precioEmision
      precio_emision_local: this.safe0Json.precioEmisionLocal,   // obtener desde plansAC.precioEmisionLocal
      precio_unitario: this.safe0Json.precioUnitario,            // obtener desde plansAC.precioUnitario
      tipo_cambio: this.tipodeCambio,                            // TIPO DE CAMBIO DEL DIA
      vuelo_res_id: 0,
      contacto_nom: data.contactForm.nameContacto,           // NOMBRE DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_ape: data.contactForm.lastnameContacto,       // APELLIDOS DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_email: data.contactForm.mailContacto,         // CORREO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_direccion: (data.contactForm.invoiceRequestBox) ? data.contactForm.direccion : '',  // DIRECCION DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR VACIO
      contacto_telfs: ',,,;',//data.contactForm.numberPhone0,         // TELEFONO DE LA PERSONA DE CONTACTO, CASO CONTRARIO COLOCAR CERO
      contacto_emerg_nom: data.contactForm.nameContacto,     // NOMBRE DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_ape: data.contactForm.lastnameContacto, // APELLIDOS DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR DATO DE PRIMER PASAJERO
      contacto_emerg_email: data.contactForm.mailContacto,   // CORREO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      contacto_emerg_telf: data.contactForm.numberPhone0,    // TELEFONO DE LA PERSONA DE EMERGENCIA, CASO CONTRARIO COLOCAR GUION
      ruc: (data.contactForm.invoiceRequestBox) ? `RUC-${data.contactForm.ruc}` : `${data.customers[0].typeDocCustomer}-${data.customers[0].numDocCustomer}`, // TIPO DE COMPROBANTE DE PAGO (BV / FC) Y DOCUMENTO (DNI / RUC) DEL PRIMER PASAJERO ADULTO
      razon_social: (data.contactForm.invoiceRequestBox) ? data.contactForm.razonSocial : '',  // NOMBRE Y APELLIDO DEL PRIMER PASAJERO ADULTO O LA RAZON SOCIAL CUANDO SEA FACTURA
      direccion_fiscal: (data.contactForm.invoiceRequestBox) ? data.contactForm.direccion : '', // DIRECCION DEL PRIMER PASAJERO ADULTO O DIRECCION DE LA EMPRESA
      comentario: '',
      webs_cid: 7,
      usuweb_id: 56190,
      destinonacional: (this.resultJson.destinyString.es_nacional !== 0) ? 'N' : 'I', // obtener desde destiny.EsDestinoNacional
      numeroruc: '',
      comprobantepago: (data.contactForm.invoiceRequestBox) ? 'FC' : 'BV',  // TIPO DE COMPROBANTE DE PAGO (BV / FC)
      usobilletera: 'N',
      codigobloqueo: '',
      dkcliente: environment.dkAgenciaAC,
      producto: this.safe0Json.nombreProducto,      // obtener desde plansAC.producto
      pnr: '',
      pais_ac: this.businessunit.id_pais_ac,
      agencia_ac: this.businessunit.codigo_ac,
      sucursal_ac: this.businessunit.sucursal_ac,
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
      forma_de_pago: data.paymentMethodForm.select21, // TARJETA, SAFETYPAY
      porcentaje_descuento: 0,
      usosafetypay: 'N',
      codigo_safetypay: '',
      nro_pedido_srv: 0,
      fee_safetypay: 0,
      validarDuplicidad: false,
      pasajeros: this.generatePassengersList(data),
      cobertura: this.generateCoverages(),
      nro_intentos_facturacion: 0,
      nro_intentos_emision: 0,
      idfileautomatico: 0,
      xPagarSafetyPay: 0,
      idTipoTarifa: 0,
      idReciboSafetyPay: 0
    };

    return payload;
  }

  makePayment(data: any): void {
    this._loaderSubjectService.showText('SE ESTA GESTIONANDO TU PAGO!');
    this._loaderSubjectService.showLoader();

    const payload: RqPaymentCeRequest1 = this.generatePayloadToPay(data);

    localStorage.setItem('payloadPayment', JSON.stringify(payload));

    this._paymentService.v1ApiPaymentPost({ body: payload }).subscribe({
      next: (response) => {

        this.paymentData = response;
        localStorage.setItem('paymentData', this.paymentData);

        const result = JSON.parse(this.paymentData);

        if (result.Result.IsSuccess) {

          const paymentMethod: PaymentMethodEnum = data.paymentMethodForm.select21 === "SAFETYPAY" ? PaymentMethodEnum.SafetyPay : PaymentMethodEnum.CreditCard;

          const parameters: ActualizarCodigoSafetyPaySeguroRQ = {
            res_seguro_id: this.reservation.Reserva,
            usosafetypay: paymentMethod === PaymentMethodEnum.SafetyPay ? "S" : "N",
            codigo_safetypay: result.Result.ServiceResponse.Code,
            nro_pedido_srv: result.Result.OrderId,
            fee_safetypay: 0
          };

          const body = new NMRequestBy<ActualizarCodigoSafetyPaySeguroRQ>(parameters);

          this._secureBookingService.updateSafetypayPaymentCode(body).subscribe((response: any) => { });

          // TODO: Se comentará hasta la aprobación de Hugo Sanchez
          // if (paymentMethod === PaymentMethodEnum.CreditCard && result.Result.ServiceResponse.Status === 'APPROVED') {
          //   const parameters: ActualizarEstadoSeguroRQ = {
          //     res_seguro_id: this.reservation.Reserva,
          //     usosafetypay: 8
          //   };

          //   const body = new NMRequestBy<ActualizarEstadoSeguroRQ>(parameters);

          //   this._secureBookingService.updateStatusInInsuranceReserve(body).subscribe((response: any) => { });
          // }

          const fechasalida = this.resultJson.fromDate.split('/');
          const fecharetorno = this.resultJson.toDate.split('/');

          const currentDate = moment();
          const fromDate = moment(this.resultJson.fromDate, 'DD/MM/YYYY');

          const missingDays = fromDate.diff(currentDate, 'days');

          const model = {
            event: 'nmv.seguros_eecga3_purchase',
            ecommerce: {
              currencyCode: this.safe0Json.monedaLista,
              purchase: {
                actionField: {
                  id: String(this.reservation.Reserva),
                  revenue: this.safe0Json.precioEmisionLocal,
                  cupon: ''
                },
                products: [{
                  name: this.safe0Json.producto,
                  id: this.safe0Json.idProducto,
                  price: this.safe0Json.precioEmisionLocal,
                  brand: 'AssistCard',
                  category: 'Seguros',
                  category2: this.safe0Json.clase === 'best' ? 'El mejor plan' : 'Fecha flexible',
                  variant: this.resultJson.destinyString.descripcion_destino,
                  quantity: this.resultJson.passengers.length,
                  metric10: this.getPromedioEdades(this.resultJson),
                  dimension9: String(this.asistenciaMedicaMonto),
                  dimension11: `${fechasalida[2]}/${fechasalida[1]}/${fechasalida[0]}`,
                  dimension12: `${fecharetorno[2]}/${fecharetorno[1]}/${fecharetorno[0]}`,
                  metric11: missingDays,
                  metric12: Number(this.resultJson.days),
                  dimension16: 'Perú',
                  dimension17: this.resultJson.destinyString.descripcion_destino
                }]
              }
            }
          }

          TaggingService.tagTransactionCompleted(model);

          const asegurados: any = [];

          this.dataShop.customers.forEach((value: any, index: number) => {
            let asegurado = {
              NumeroSolicitudCompra: String(this.reservation.Reserva),
              NombresApellidos: `ADT - ${value.nameCustomer.toUpperCase()
                } ${value.lastNameCustomer.toUpperCase()}`,
              FechaNacimiento: `${value.dayCustomer.padStart(2, '0')}/${value.monthCustomer.padStart(2, '0')}/${value.yearCustomer}`
            }

            asegurados.push(asegurado);
          });

          const notificationBody: CeSeguroCeEmailParameterCustomCeRequest1 = {
            Caller: {
              Company: EnumRequestCompanies.Agil,
              Application: EnumRequestApplications.Interagencias
            },
            TrackingCode: Guid(),
            MuteExceptions: false,
            Parameter: {
              To: [data.contactForm.mailContacto.toUpperCase()],
              BCC: [""],
              CC: [""],
              Subject: `NMViajes - Confirmación de compra de seguro #${this.reservation.Reserva}`,
              Data: {
                Contacto: {
                  NombresApellidos: `${data.contactForm.nameContacto.toUpperCase()
                    } ${data.contactForm.lastnameContacto.toUpperCase()
                    }`,
                  CorreoElectronico: data.contactForm.mailContacto.toUpperCase(),
                  Telefonos: `CELULAR ${data.contactForm.code0} ${data.contactForm.numberPhone0}`
                },
                Pago: {
                  TipoPago: this.selectedPay === 'tarjeta' ? 'TARJETA' : 'SAFETYPAY',
                  CodigoSafetypay: result.Result.ServiceResponse.Code,
                  TextoExpiracion: this.selectedPay !== 'tarjeta' ? `El pago puede ser completado hasta el ${result.Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(0, 10)
                    } a las ${result.Result.ServiceResponse.Result.Payment_Expiration_Datetime.substr(11, 5)
                    }` : "",
                  TiempoExpiracion: ""
                },
                Asegurados: asegurados,
                Precio: {
                  PrecioDolares: `${this.safe0Json.monedaLista} ${this.safe0Json.precioEmisionLocal}`
                },
                Cobertura: {
                  NombreCobertura: this.safe0Json?.nombreProducto,
                  TipoCobertura: this.safe0Json.clase === 'best' ? 'EL MEJOR PLAN' : 'FECHA FLEXIBLE',
                  MontoAsistenciaMedica: String(this.asistenciaMedicaMonto),
                  DuracionCobertura: `${this.resultJson.days} días`,
                  CiudadOrigen: "(PE) Perú",
                  CiudadDestino: this.resultJson.destinyString.descripcion_destino,
                  FechaSalida: `${fechasalida[0]}/${fechasalida[1]}/${fechasalida[2]}`,
                  FechaRegreso: `${fecharetorno[0]}/${fecharetorno[1]}/${fecharetorno[2]}`,
                  Pasajeros: `${this.resultJson.passengers.length} Adulto(s)`
                }
              }
            }
          };

          this._messageService.v1ApiMessageSendConfirmacionSeguroPost({ body: notificationBody }).subscribe((res: CeResponse) => {
            if (res.State.Ok) {
              this._loaderSubjectService.closeLoader();

              this._router.navigateByUrl('/conformidad');
            }
          });
        }
      },
      error: (err) => {
        console.log('Error en el registro del pago');
        console.log(err);

        this._loaderSubjectService.closeLoader();
      }
    })
  }

  generatePayloadToPay(data: any): RqPaymentCeRequest1 {
    let email: string = '';
    const credentials = localStorage.getItem('usuario');

    if (credentials) {
      const credentialsJson = JSON.parse(credentials);
      email = credentialsJson.email;
    }

    const paymentMethod: PaymentMethodEnum = data.paymentMethodForm.select21 === "SAFETYPAY" ? PaymentMethodEnum.SafetyPay : PaymentMethodEnum.CreditCard;

    const payload: RqPaymentCeRequest1 = {
      "TrackingCode": Guid(),
      "MuteExceptions": environment.muteExceptions,
      "Caller": {
        "Company": "Expertia",
        "Application": "NMViajes",
        "FromIP": this.ip,
        "FromBrowser": "Chrome"
      },
      "Parameter": {
        "Method": paymentMethod,
        "TransactionCode": "978c585602011501eb0f3fb2",
        "TypeOfOperation": "SEG",
        "SignIn": {
          "Username": email,
        },
        "Customer": {
          "Firstname": data.customers[0].nameCustomer.toUpperCase(),
          "Lastname": data.customers[0].lastNameCustomer.toUpperCase(),
          "City": "",
          "Address": "",
          "DocumentType": data.customers[0].typeDocCustomer,
          "DocumentNumber": data.customers[0].numDocCustomer,
          "Email": data.contactForm.mailContacto.toUpperCase()
        },
        "Card": {
          "Number": data.paymentMethodForm.numberCard,
          "SecurityCode": data.paymentMethodForm.ccvCard,
          "ExpirationDate": `${data.paymentMethodForm.expiredCard.substring(0, 2)}/${data.paymentMethodForm.expiredCard.substring(2)}`
        },
        "Amount": {
          "Value": Number(data.PriceTotal),
          "Currency": "USD",
          "OfFees": data.feePay || 0,
        },
        "Bank": {
          "Id": data.paymentMethodForm.select21 === "SAFETYPAY" ? data.paymentMethodForm.bankPay : "",
        },
        "Booking": {
          "CodeSrv": 0,
          "CodeInsurance": this.reservation.Reserva,
          "ArrivalDate": moment(this.resultJson.fromDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
          "DepartureDate": moment(this.resultJson.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
          "NumberOfAdult": 1,
          "NumberOfChildren": 0,
          "HasCancellationFee": true
        },
        "Setting": {
          //"HasAutomaticPayment": data.paymentMethodForm.select21 === "SAFETYPAY" ? true : false,
          "HasAutomaticPayment": true, // TDDO: Se pone esto de momento para que el servicio retorne como aprobado.
          "HasAQuoteCode": true
        }
      }
    }

    return payload;
  }

  returnToPlans(): void {
    localStorage.removeItem('safe0')
    this._router.navigateByUrl('/seguros/planes')
  }

  listCoverage() {
    let lcobertura: CoberturaSeguroRQ = {
      CodigoISOPais: this.businessunit.id_pais_ac,
      Agencia: this.businessunit.codigo_ac,
      Sucursal: this.businessunit.sucursal_ac,
      CodigoProducto: this.safe0Json.codProducto,
      CodigoTarifa: this.safe0Json.codTarifa,
      Edad: this.resultJson.passengers[0].edad,     // COLOCAR LA PRIMERA EDAD DE BUSQUEDA
      TipoModalidad: this.safe0Json.codModalidad
    }

    let payload = new NMRequestBy<CoberturaSeguroRQ>(lcobertura);

    this._coverageService.getCoverage(payload).pipe(take(5)).subscribe({
      next: (response) => {
        this.coverageL = response;

        this.coverageList = response['Resultado'];

        if (Object.keys(this.coverageList).length === 0) {
          this.asistMedic = 0;
          this.asistenciaMedicaMonto = 0;
        } else {
          this.asistMedic = this.coverageList.find((e: any) => {
            if (e.Codigo === 'C.4.1.10.1') {
              return e
            }
          })['Valor'];

          this.asistenciaMedicaMonto = this.asistMedic.includes('USD') ? Number(this.asistMedic.substring(4).replace('.', '')) : this.asistMedic;
        }

        localStorage.setItem('coverage', JSON.stringify(this.coverageList))
      },
      error: error => console.log(error),
    })
  }

  generatePassengersList(data: any) {
    let pasajeros: any = [];

    data.customers.forEach((value: any, index: number) => {

      let jsonPasajeros = {
        pax_nom: value.nameCustomer,
        pax_ape_pat: value.lastNameCustomer,
        doc_cid: (value.typeDocCustomer).toUpperCase(),
        pax_num_doc: value.numDocCustomer,
        pax_fec_nac: `${value.yearCustomer}-${value.monthCustomer}-${value.dayCustomer}`,
        pax_voucher_travelace: '-',
        pax_control_travelace: '-',
        pax_void_travelace: 'N',
        pax_boleto: '-',
        pax_voideo_pta: '0',
        pax_facturado_pta: 0,
        pax_precio_emision: this.safe0Json.tarifario[index].precioEmision,            // obtener desde plansAC.producto.tarifario.precioEmision (FILTRAR POR CAMPO EDAD)
        pax_precio_emision_local: this.safe0Json.tarifario[index].precioEmisionLocal, // obtener desde plansAC.producto.tarifario.precioEmisionLocal (FILTRAR POR CAMPO EDAD)
        pax_precio_neto: this.safe0Json.tarifario[index].precioBrutoLocal
      };

      pasajeros.push(jsonPasajeros);
    });

    return pasajeros;
  }

  generateCoverages(): any {

    let coverages: any = [];

    for (let index = 0; index < this.coverageList.length; index++) {
      coverages.push({
        unidad: this.coverageList[index].Unidad,
        atr_nom: this.coverageList[index].Codigo + ' ' + this.coverageList[index].Nombre,
        valor: this.coverageList[index].Valor
      });
    }

    return coverages;
  }

  pasajerosVuelos() {
    let pasajeros: any = [];

    this.dataShop.customers.forEach((value: any, index: number) => {
      let jsonPasajeros = {
        type: "ADT",
        name: value.nameCustomer,
        lastName: value.lastNameCustomer,
        birthday: value.yearCustomer + '-' + value.monthCustomer.padStart(2, '0') + '-' + value.dayCustomer.padStart(2, '0'),
        documentType: (value.typeDocCustomer === 'DNI') ? 0 : 1,
        documentNumber: value.numDocCustomer,
        gender: (value.sexCustomer === 'masculino') ? 'M' : '',
        email: this.dataShop.contactForm.mailContacto,
        phone: this.dataShop.contactForm.numberPhone0
      }
      pasajeros.push(jsonPasajeros)
    });

    return pasajeros
  }

  getPassengerAges() {
    let ages = []

    let currentDate = new Date();
    let day = String(currentDate.getDate()).padStart(2, '0') + String(currentDate.getMonth() + 1).padStart(2, '0') + String(currentDate.getFullYear());

    // Obtiene la fecha de nacimiento
    for (let e of this.dataShop.customers) {
      let customer = e.dayCustomer.padStart(2, '0') + e.monthCustomer.padStart(2, '0') + e.yearCustomer;
      const age = Math.ceil((Number(day) - Number(customer)) / (1000 * 300)) + 1;

      ages.push(age);
    }

    //this.agesCustomers = ages.join(';');
    this.agesCustomers = this.resultJson.aniosNacimiento.map((c: any) => c.edad).join(";");
  }

  // fecha de expiracion tarjeta
  expired(e: any) {
    const year = e.substring(0, 4)
    const month = e.substring(4, 6)
    const expiredFormatt = `${year}/${month}`
    return expiredFormatt
  }

  showVerDetalle(e?: any) {
    this.showDetalle = !this.showDetalle
    console.log(this.showDetalle)
  }

  savePasajero(e?: any) {
    console.log('pasajero ' + e)
  }

  step1Complete = false;
  toggleStep1Complete() {
    this.step1Complete = !this.step1Complete;
  }

  selectionChange(event: StepperSelectionEvent) {
    console.log(event.selectedIndex)
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

  onChangeOfficialDocument(posicion: number) {
    if (posicion != 99)
      this.formShop.get("customers." + posicion + ".numDocCustomer")?.setValue('');
    else
      this.formShop.get("paymentMethodForm.numDoc")?.setValue('');
  }

  allowAlphabetic(event: KeyboardEvent) {
    const pattern = /[a-zA-Z\s]/;

    if (!pattern.test(event.key))
      event.preventDefault();

    this.count++;
  }

  dataLayerPushCheckout(safe0Json: any, resultJson: any) {
    let actionField: ActionFieldCheckout = {
      step: 1
    }
    let products: ProductAddToCart[] = [];
    let pp: ProductAddToCart = {
      name: '',
      id: '',
      price: '',
      brand: '',
      category: '',
      category2: '',
      variant: '',
      quantity: 0,
      metric10: 0,
      dimension9: '',
      dimension11: '',
      dimension12: '',
      metric11: 0,
      metric12: 0,
      dimension16: '',
      dimension17: ''
    }

    let checkout: Checkout = {
      actionField: actionField,
      products: products
    }
    let ecommerce: EcommerceCheckout = {
      checkout: checkout
    }
    let modelTaggingCheckout: ModelTaggingCheckout = {
      event: 'nmv.seguros_eecga3_checkout',
      ecommerce: ecommerce
    }

    for (let index = 0; index < parseInt(resultJson.passengers.length); index++) {
      const element = resultJson.passengers[index];
      if (element.edad < 6) {//infante
        this.countInfante++;

      } else if (element.edad >= 6 && element.edad < 18) {//nuño
        this.countNinio++;
      } else if (element.edad >= 18) {// adulto
        this.countAdulto++;

      }
    }
    if (this.countInfante > 0) {
      pp = this.llenarProduct(safe0Json, resultJson);
      products.push(pp);
    }
    if (this.countNinio > 0) {
      pp = this.llenarProduct(safe0Json, resultJson);
      products.push(pp);
    }
    if (this.countAdulto > 0) {
      pp = this.llenarProduct(safe0Json, resultJson);
      products.push(pp);
    }
    console.log("modelTaggingCheckout:", modelTaggingCheckout)
    TaggingService.tagMostrarCheckout(modelTaggingCheckout);
  }

  llenarProduct(safe0Json: any, resultJson: any): ProductAddToCart {
    const currentDate = moment();
    const fromDate = moment(this.resultJson.fromDate, 'DD/MM/YYYY');
    const missingDays = fromDate.diff(currentDate, 'days');
    let pp: ProductAddToCart = {
      name: safe0Json.nombreProducto,
      id: safe0Json.idProducto,
      price: safe0Json.precioBrutochange,
      brand: 'AssistCard',
      category: 'Seguros',
      category2: 'Fecha Flexible',
      variant: resultJson.destinyString.descripcion_destino,
      quantity: parseInt(resultJson.passengers.length),
      metric10: this.getPromedioEdades(resultJson),
      dimension9: this.asistMedic,
      dimension11: resultJson.fromDate,
      dimension12: resultJson.toDate,
      metric11: missingDays,
      metric12: Number(this.resultJson.days),
      dimension16: 'PERU',
      dimension17: resultJson.destinyString.descripcion_destino,
    }
    return pp;
  }

  getDuracionViaje(resultJson: any): number {
    let fechaFormats: number[] = resultJson.fromDate.split('/');
    const _fromDate = new Date(fechaFormats[2], fechaFormats[1], fechaFormats[0]);
    const _toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    let diferencia = ((_fromDate.getTime() - _toDate.getTime()) / 1000 / 60 / 60 / 24) - 40;
    return diferencia;
  }

  allowNumeric(event: KeyboardEvent) {
    const pattern = /[0-9]/;

    if (!pattern.test(event.key))
      event.preventDefault();
  }

  allowOfficialDocument(event: KeyboardEvent, posicion: number) {
    let pattern: RegExp;
    let tipoDocumento = '';
    const data = this.formShop.value;

    if (posicion != 99)
      tipoDocumento = data.customers[posicion].typeDocCustomer;
    else
      tipoDocumento = data.paymentMethodForm.tipoDoc;

    if (tipoDocumento != '') {
      pattern = tipoDocumento === 'DNI' || tipoDocumento === 'RUC' ? /[0-9]/ : /[a-zA-Z0-9\s]/;

      if (!pattern.test(event.key))
        event.preventDefault();
    }
    else
      event.preventDefault();
  }

  onPasteAlphabetic(event: ClipboardEvent) {
    event.preventDefault();

    if (event.clipboardData != null) {
      const texto: string = event.clipboardData.getData('text/plain').replace(/[0-9]/g, '');

      document.execCommand('insertText', false, texto);
    }
  }

  onPasteNumeric(event: ClipboardEvent) {
    event.preventDefault();

    if (event.clipboardData != null) {
      const texto: string = event.clipboardData.getData('text/plain').replace(/\D/g, '');

      document.execCommand('insertText', false, texto);
    }
  }

  denyPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  denyDrop(event: DragEvent) {
    event.preventDefault();
  }

  getDiasAnticipacion(fromDate: any): number {
    let fechaFormats: number[] = fromDate.fromDate.split('/');
    const _fromDate = new Date(fechaFormats[2], fechaFormats[1], fechaFormats[0]);
    const _toDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay());
    let diferencia = ((_fromDate.getTime() - _toDate.getTime()) / 1000 / 60 / 60 / 24) - 40;
    return diferencia;
  }

  getPromedioEdades(resultJson: any): number {
    let promedio: number = 0;
    resultJson.passengers.forEach((element: any) => {
      promedio = promedio + parseInt(element.edad);
    });
    //console.log("promedio:", promedio) 
    //console.log("length:", resultJson.passengers.length) 
    return (promedio / resultJson.passengers.length);
  }

  onchangeBanco(): void {
    const nationality = this.countries.find(x => x.Iata === this.formShop.getRawValue()['customers'][0]['nationalityCustomer'])?.Name;

    if (nationality === undefined) {
      this._notification.showNotificacion("Error", "Debe ingresar previamente los datos del pasajero");
      return;
    }
    else {
      const model1 = {
        event: 'nmv.seguros_eecga3_checkoutOption',
        ecommerce: {
          checkout_option: {
            actionField: {
              step: 1,
              option: nationality
            }
          }
        }
      }

      TaggingService.tagNationalitySelection(model1);

      const model = {
        event: 'nmv.seguros_eecga3_checkout',
        ecommerce: {
          checkout: {
            actionField: {
              step: 2
            }
          }
        }
      }

      TaggingService.tagStartOfPaymentMethods(model);
    }
  }

  onChangeProtectionPolicies(): void {
    const model = {
      event: 'nmv.seguros_eecga3_checkoutOption',
      ecommerce: {
        checkout_option: {
          actionField: {
            step: 3,
            option: this.showInvoiceData ? 'Factura Electrónica' : 'Boleta Electrónica'
          }
        }
      }
    }

    TaggingService.tagVoucherSelection(model);
  }
}
