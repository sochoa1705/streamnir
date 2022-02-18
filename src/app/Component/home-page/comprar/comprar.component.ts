import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { CoberturaSeguroRQ } from 'src/app/Models/seguros/coberturaRQ.interface';
import { CoverageService } from 'src/app/Services/coverage/coverage.service';
import { NMRequestBy } from 'src/app/Models/base/NMRequestBy';
import { take } from 'rxjs/operators';
import { ReservaVuelosService } from '../../../Services/reservaVuelos/reserva-vuelos.service';
import { ClassDetalleLocalSt, ClassDetalleModalSegment } from 'src/app/shared/components/flights/models/flights.class';
import { IFiltroVuelo } from './interfaces/comprar.interfaces';
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';
import { RegistrarSeguroRQ } from '../../../Models/seguros/registroRQ.interface';
import { environment } from '../../../../environments/environment.prod';
import { SecureBookingService } from '../../../Services/secureBooking/secure-booking.service';
import { toUp } from 'src/app/shared/utils';

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
  formShop!: FormGroup
  errors: any[] = []
  MSG_EMPTY: string = 'none'
  //COBERTURA
  coverageDisplay: boolean = false
  unidadNegocio: any
  businessunit: any
  // coverageList: any
  coverageL: any
  asistMedic: any
  pop: any

  MSG_NAME_CUSTOMER: string = 'nameCustomer'
  MSG_LAST_NAME_CUSTOMER: string = 'lastNameCustomer'
  MSG_DAY_CUSTOMER: string = 'dayCustomer'
  MSG_MONTH_CUSTOMER: string = 'monthCustomer'
  MSG_YEAR_CUSTOMER: string = 'yearCustomer'
  MSG_NATIONALITY_CUSTOMER: string = 'nationalityCustomer'
  MSG_TYPE_DOC_CUSTOMER: string = 'typeDocCustomer'
  MSG_NUM_DOC_CUSTOMER: string = 'numDocCustomer'
  MSG_SEX: string = 'sexCustomer'

  MSG_BANK: string = 'bankPay'

  MSG_NUMBER_CARD: string = 'numberCard'
  MSG_NAME_CARD: string = 'nameCard'
  MSG_EXPIRED_CARD: string = 'expiredCard'
  MSG_CCV_CARD: string = 'ccvCard'
  MSG_TYPE_DOC: string = 'tipoDoc'
  MSG_NUM_DOC: string = 'numDoc'
  MSG_QUOTE: string = 'feePay'
  MSG_CITY: string = 'cityCard'
  MSG_ADRESS: string = 'address'

  MSG_NAME_CONTACT: string = 'nameContacto'
  MSG_LASTNAME_CONTACT: string = 'lastnameContacto'
  MSG_EMAIL_CONTACT: string = 'mailContacto'
  MSG_EMAILC_CONTACT: string = 'mailConfirmContacto'
  MSG_TYPEPHONE_CONTACT: string = 'typePhone0'
  MSG_CODE0_CONTACT: string = 'code0'
  MSG_PHONE0_CONTACT: string = 'numberPhone0'
  MSG_CHK_POLITY: string = 'chkPolity'
  MSG_CHK_INFO: string = 'chkInfo'

  listYears: string[] = []
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
  ]

  metodoPago: Methods[]

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  detalleVuelos: ClassDetalleLocalSt;

  modalDetalle: ClassDetalleModalSegment | null;

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
  reservation: any
  dataShop: any

  @ViewChild('adultoCdr', { static: false }) adulto!: ElementRef<HTMLInputElement>

  @ViewChild('nameContactForm', { static: false }) inputNameContactForm!: ElementRef<HTMLInputElement>
  @ViewChild('lastNameContactForm', { static: false }) inputLastNameContactForm!: ElementRef<HTMLInputElement>
  nombre: string
  apellido: string
  showAgregarAdulto: boolean = true
  showAdulto: number

  constructor(
    public route: Router,
    private router: ActivatedRoute,
    public offersService: OffersService,
    public coverageService: CoverageService,
    public loaderSubjectService: LoaderSubjectService,
    public reservaVuelosService: ReservaVuelosService,
    public secureBookingService: SecureBookingService,
  ) {
    // COBERTURA
    this.coverageList = localStorage.getItem('coverage')
    this.coverage = JSON.parse(this.coverageList)
    // Token
    this.token = localStorage.getItem('token')
    this.tokenJson = JSON.parse(this.token)
    // TIPO DE CAMBIO
    this.cambio = localStorage.getItem('tipoCambio')
    this.tipodeCambio = JSON.parse(this.cambio)
    // shopdata
    this.shopData = localStorage.getItem('shop')
    this.shopString = JSON.parse(this.shopData)
    this.filtroVuelo = localStorage.getItem('filtroVuelo')
    this.filtroVueloJson = JSON.parse(this.filtroVuelo)
    this.safe0 = localStorage.getItem('safe0');
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe');
    const detalleVuelosStr: any = localStorage.getItem('detalleVuelo');
    this.detalleVuelos = JSON.parse(detalleVuelosStr);
    this.resultJson = JSON.parse(this.result);

    this.unidadNegocio = localStorage.getItem('businessunit')
    this.businessunit = JSON.parse(this.unidadNegocio)
    console.log(this.resultJson);
    console.log(this.safe0Json);
    console.log(screen.width);
    if (screen.width < 769) {
      this.mobile = true
    } else {
      this.mobile = false
    }
    this.current = this.route.getCurrentNavigation()!.extras.state as any
    if (!this.current) {
      this.route.navigate(['/home'])
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

  ngOnInit(): void {
    // this.showAdulto = 0
    console.log(this.selectedPay)
    toUp()
    console.log(this.showAdulto)

    this.pop = this.safe0Json
    // this.getSecureBooking()
    console.log(this.current);
    this.loadShop();
    //console.log(this.safe0Json.detailPay);
    // this.firstFormGroup = new FormGroup({ //FORMULARIO DE CONTACTO EN MOBILE
    //   firstCtrl: new FormControl('', Validators.required),
    //   nameContacto: new FormControl('', Validators.required),
    //   lastnameContacto: new FormControl('', Validators.required),
    //   // AGREGAR
    //   // mailContacto: new FormControl(),
    //   // mailConfirmContacto: new FormControl(),
    //   // typePhone0: new FormControl(),
    //   // code0: new FormControl(),
    //   // numberPhone0: new FormControl(),
    //   // phones: new FormArray([]),
    //   // recibo: new FormArray([]),
    //   // chkFac: new FormControl()

    // })
    // this.secondFormGroup = new FormGroup({
    //   secondCtrl: new FormControl('idavuelta', Validators.required),
    // })

    this.createForm()
    // this.chkValue('')
    console.log(this.resultJson)
    console.log(this.filtroVueloJson)

    let pasajeros = this.resultJson !== null ? this.resultJson['ClienteCotizacion'] : this.filtroVueloJson['pasajeros']
    console.log(pasajeros);

    for (const i of pasajeros) {
      this.addCustomers(i.item)
    }
    this.selectYear()
    if (this.current['filter'] !== 'filter') {
      this.listCoverage()
    }
  }

  toCustomer(e: any) {
    let chk = e.target.checked

    let customerName = this.formShop.getRawValue()['customers'][0]['nameCustomer']
    let customerLastName = this.formShop.getRawValue()['customers'][0]['lastNameCustomer']

    let customerName2 = this.formShop.getRawValue()['formContact']['nameContacto']
    let customerLastName2 = this.formShop.getRawValue()['formContact']['lastnameContacto']

    let name = this.inputNameContactForm.nativeElement.value
    let lastname = this.inputLastNameContactForm.nativeElement.value

    if (chk) {
      this.inputNameContactForm.nativeElement.value = customerName
      this.inputLastNameContactForm.nativeElement.value = customerLastName

      this.inputNameContactForm.nativeElement.focus()

    } else {
      this.inputNameContactForm.nativeElement.value = ''
      this.inputLastNameContactForm.nativeElement.value = ''
    }
  }

  selectYear() {
    for (let i = 1950; i < 2022; i++) {
      let year = String(i)
      this.listYears.push(year)
    }
  }

  validForm() {
    this.errors = []
    const letter = new RegExp('^[a-zA-Z ]+$', 'i')
    const number = new RegExp('^[0-9]+$', 'i')
    const alphanumeric = new RegExp('^[a-zA-Z0-9 ]+$', 'i')
    const email = new RegExp('^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$', 'i')

    const typePay: string = this.formShop.getRawValue()['formCard']['select21']
    if (typePay === 'TARJETA') {
      // TC
      let numberCard: string = this.formShop.getRawValue()['formCard']['numberCard']
      if (numberCard === undefined || numberCard === null || numberCard.trim() === '') {
        this.errors.push({ name: this.MSG_NUMBER_CARD, message: 'Ingresa el número de tarjeta' })
      }

      let nameCard: string = this.formShop.getRawValue()['formCard']['nameCard']
      if (nameCard === undefined || nameCard === null || nameCard.trim() === '') {
        this.errors.push({ name: this.MSG_NAME_CARD, message: 'Ingresa el nombre del titular' })
      }

      let expiredCard: string = this.formShop.getRawValue()['formCard']['expiredCard']
      if (expiredCard === undefined || expiredCard === null || expiredCard.trim() === '') {
        this.errors.push({ name: this.MSG_EXPIRED_CARD, message: 'Campo requerido' })
      }

      let ccvCard: string = this.formShop.getRawValue()['formCard']['ccvCard']
      if (ccvCard === undefined || ccvCard === null || ccvCard.trim() === '') {
        this.errors.push({ name: this.MSG_CCV_CARD, message: 'Campo requerido' })
      }
      if (!number.test(ccvCard)) {
        this.errors.push({ name: this.MSG_CCV_CARD, message: 'solo números' })
      }

      let tipoDoc: string = this.formShop.getRawValue()['formCard']['tipoDoc']
      if (tipoDoc === undefined || tipoDoc === null || tipoDoc.trim() === '') {
        this.errors.push({ name: this.MSG_TYPE_DOC, message: 'Campo requerido' })
      }

      let numDoc: string = this.formShop.getRawValue()['formCard']['numDoc']
      if (numDoc === undefined || numDoc === null || numDoc.trim() === '') {
        this.errors.push({ name: this.MSG_NUM_DOC, message: 'Ingrese su N° de documento' })
      }
      if (!number.test(numDoc)) {
        this.errors.push({ name: this.MSG_NUM_DOC, message: 'solo números' })
      }

      let feePay: string = this.formShop.getRawValue()['formCard']['feePay']
      if (feePay === undefined || feePay === null || feePay.trim() === '') {
        this.errors.push({ name: this.MSG_QUOTE, message: 'Campo requerido' })
      }

      let cityCard: string = this.formShop.getRawValue()['formCard']['cityCard']
      if (cityCard === undefined || cityCard === null || cityCard.trim() === '') {
        this.errors.push({ name: this.MSG_CITY, message: 'Campo requerido' })
      }

      let address: string = this.formShop.getRawValue()['formCard']['address']
      if (address === undefined || address === null || address.trim() === '') {
        this.errors.push({ name: this.MSG_ADRESS, message: 'Campo requerido' })
      }
    } else {
      // SAFETYPAY
      let bankPay: string = this.formShop.getRawValue()['formCard']['bankPay']
      if (bankPay === undefined || bankPay === null || bankPay.trim() === '') {
        this.errors.push({ name: this.MSG_BANK, message: 'Campo requerido' })
      }
    }

    //FORM PASAJERO
    for (let x = 0; x < this.formShop.getRawValue()['customers'].length; x++) {
      let nameCustomer: string = this.formShop.getRawValue()['customers'][x]['nameCustomer']
      if (nameCustomer === undefined || nameCustomer === null || nameCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NAME_CUSTOMER, message: 'Ingresa el nombre del pasajero' })
      }

      let lastNameCustomer: string = this.formShop.getRawValue()['customers'][x]['lastNameCustomer']
      if (lastNameCustomer === undefined || lastNameCustomer === null || lastNameCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_LAST_NAME_CUSTOMER, message: 'Ingresa el apellido del pasajero' })
      }


      let dayCustomer: string = this.formShop.getRawValue()['customers'][x]['dayCustomer']
      if (dayCustomer === undefined || dayCustomer === null || dayCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_DAY_CUSTOMER, message: 'Ingresa día' })
      }
      if (!number.test(dayCustomer)) {
        this.errors.push({ name: this.MSG_DAY_CUSTOMER, message: 'solo números' })
      }

      let monthCustomer: string = this.formShop.getRawValue()['customers'][x]['monthCustomer']
      if (monthCustomer === undefined || monthCustomer === null || monthCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_MONTH_CUSTOMER, message: 'Ingresa mes' })
      }

      let yearCustomer: string = this.formShop.getRawValue()['customers'][x]['yearCustomer']
      if (yearCustomer === undefined || yearCustomer === null || yearCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_YEAR_CUSTOMER, message: 'Ingresa año' })
      }

      let nationalityCustomer: string = this.formShop.getRawValue()['customers'][x]['nationalityCustomer']
      if (nationalityCustomer === undefined || nationalityCustomer === null || nationalityCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NATIONALITY_CUSTOMER, message: 'Campo requerido' })
      }

      let typeDocCustomer: string = this.formShop.getRawValue()['customers'][x]['typeDocCustomer']
      if (typeDocCustomer === undefined || typeDocCustomer === null || typeDocCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_TYPE_DOC_CUSTOMER, message: 'Campo requerido' })
      }

      let numDocCustomer: string = this.formShop.getRawValue()['customers'][x]['numDocCustomer']
      if (numDocCustomer === undefined || numDocCustomer === null || numDocCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NUM_DOC_CUSTOMER, message: 'Ingresa tu número de documento' })
      }
      if (!number.test(numDocCustomer)) {
        this.errors.push({ name: this.MSG_NUM_DOC_CUSTOMER, message: 'solo números' })
      }

      // let sexCustomer: string = this.formShop.getRawValue()['customers'][x]['sexCustomer']
      // if (sexCustomer === undefined || sexCustomer === null) {
      //   this.errors.push({ indice: x, name: this.MSG_SEX, message: 'Elegir un sexo' })
      // }
    }
    //FORM PASAJERO

    //FORMCONTACT

    let nameContacto: string = this.formShop.getRawValue()['formContact']['nameContacto']
    if (nameContacto === undefined || nameContacto === null || nameContacto.trim() === '') {
      this.errors.push({ name: this.MSG_NAME_CONTACT, message: 'Nombre de contacto es requerido' })
    }
    let lastnameContacto: string = this.formShop.getRawValue()['formContact']['lastnameContacto']
    if (lastnameContacto === undefined || lastnameContacto === null || lastnameContacto.trim() === '') {
      this.errors.push({ name: this.MSG_LASTNAME_CONTACT, message: 'Apellido de contacto es requerido' })
    }
    let mailContacto: string = this.formShop.getRawValue()['formContact']['mailContacto']
    if (mailContacto === undefined || mailContacto === null || mailContacto.trim() === '') {
      this.errors.push({ name: this.MSG_EMAIL_CONTACT, message: 'Email de contacto es requerido' })
    }

    let mailConfirmContacto: string = this.formShop.getRawValue()['formContact']['mailConfirmContacto']
    if (mailConfirmContacto === undefined || mailConfirmContacto === null || mailConfirmContacto.trim() === '') {
      this.errors.push({ name: this.MSG_EMAILC_CONTACT, message: 'Confirmación es requerida' })
    } else if (mailConfirmContacto.toUpperCase() !== mailContacto.toUpperCase()) {
      this.errors.push({ name: this.MSG_EMAILC_CONTACT, message: 'Email no coincide' })
    }

    let typePhone0: string = this.formShop.getRawValue()['formContact']['typePhone0']
    if (typePhone0 === undefined || typePhone0 === null || typePhone0.trim() === '') {
      this.errors.push({ name: this.MSG_TYPEPHONE_CONTACT, message: 'Campo requerido' })
    }
    let code0: string = this.formShop.getRawValue()['formContact']['code0']
    if (code0 === undefined || code0 === null || code0.trim() === '') {
      this.errors.push({ name: this.MSG_CODE0_CONTACT, message: 'Código de país es requerido' })
    }
    let numberPhone0: string = this.formShop.getRawValue()['formContact']['numberPhone0']
    if (numberPhone0 === undefined || numberPhone0 === null || numberPhone0.trim() === '') {
      this.errors.push({ name: this.MSG_PHONE0_CONTACT, message: 'Teléfono es requerido' })
    }
    if (!number.test(numberPhone0)) {
      this.errors.push({ name: this.MSG_PHONE0_CONTACT, message: 'solo números' })
    }

    let chkPolity: boolean = this.formShop.getRawValue()['chkPolity']
    if (chkPolity === undefined || chkPolity === null || chkPolity == false) {
      this.errors.push({ name: this.MSG_CHK_POLITY, message: 'Políticas  es requerido' })
    }
    let chkInfo: boolean = this.formShop.getRawValue()['chkInfo']
    if (chkInfo === undefined || chkInfo === null || chkInfo == false) {
      this.errors.push({ name: this.MSG_CHK_INFO, message: 'Autorizar uso de información es requerido' })
    }
    //FORMCONTACT


    return this.errors.length === 0
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }

  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }

  // validNumber(inputText: any): boolean {
  //   return new RegExp(/^[0-9]+$/).test(inputText)
  // }

  toFactura(e: any) {
    let chk = e.target.checked
    if (chk) {
      this.addRecibo()
    } else {
      this.removeRecibo(0)
    }
  }

  createForm() {
    this.formShop = new FormGroup({
      customers: new FormArray([]),
      formCard: new FormGroup({
        bankPay: new FormControl(),
        select21: new FormControl(this.current['filter'] === 'filter' ? 'TARJETA' : 'SAFETYPAY'),
        numberCard: new FormControl(),
        nameCard: new FormControl(),
        expiredCard: new FormControl(),
        ccvCard: new FormControl(),
        tipoDoc: new FormControl(),
        numDoc: new FormControl(),
        feePay: new FormControl(),
        cityCard: new FormControl(),
        address: new FormControl(),
      }),
      formContact: new FormGroup({
        chkCustomer: new FormControl(),
        nameContacto: new FormControl(this.nombre),
        lastnameContacto: new FormControl(this.apellido),
        mailContacto: new FormControl(),
        mailConfirmContacto: new FormControl(),
        typePhone0: new FormControl(),
        code0: new FormControl('511'),
        numberPhone0: new FormControl(),
        phones: new FormArray([]),
        recibo: new FormArray([]),
        chkFac: new FormControl()
      }),
      chkPolity: new FormControl(),
      chkInfo: new FormControl(),
    })
  }

  getArrayCustomers() {
    return (<FormArray>this.formShop.get(['customers'])).controls
  }

  addCustomers(e: any) {
    // ((<any>this.formShop.controls['formContact']).controls['phones']).push(
    (<FormArray>this.formShop.controls['customers']).push(
      new FormGroup({
        typeCustomer: new FormControl(e),
        nameCustomer: new FormControl(),
        lastNameCustomer: new FormControl(),
        dayCustomer: new FormControl(),
        monthCustomer: new FormControl(),
        yearCustomer: new FormControl(),
        nationalityCustomer: new FormControl(),
        typeDocCustomer: new FormControl(),
        numDocCustomer: new FormControl(),
        sexCustomer: new FormControl(),
      }))
  }

  ///RECIBO ADD FORMULARIO
  getArrayRecibo() {
    return (<FormArray>this.formShop.get(['formContact', 'recibo'])).controls
  }

  addRecibo() {
    ((<any>this.formShop.controls['formContact']).controls['recibo']).push(
      new FormGroup({
        direccion: new FormControl(),
        ruc: new FormControl()
      }));
  }

  removeRecibo(index: any) {
    ((<any>this.formShop.controls['formContact']).controls['recibo']).removeAt(index);
  }

  ///PHONE ADD FORMULARIO
  getArrayPhone() {
    return (<FormArray>this.formShop.get(['formContact', 'phones'])).controls
  }

  addPhone() {
    ((<any>this.formShop.controls['formContact']).controls['phones']).push(
      new FormGroup({
        typePhone: new FormControl(),
        code: new FormControl(),
        numberPhone: new FormControl()
      }));
  }

  removePhone(index: any) {
    ((<any>this.formShop.controls['formContact']).controls['phones']).removeAt(index);
  }

  // pasajero() {
  //   let scrolTop = window.scrollY;
  //   let n = scrolTop - 50;
  //   let elemento = this.adulto.nativeElement;
  //   console.log(elemento);
  //   elemento.classList.add('adultocdr');
  //   elemento.setAttribute('style', `margin-top: ${n}px`);
  //   // elemento.style = `margin-top: ${scrolTop}`
  // }

  pasajeroClose() {
    let elemento = this.adulto.nativeElement;
    elemento.classList.remove('adultocdr');
    elemento.setAttribute('style', `display:none`);
  }

  loadShop() {
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
    //console.log(this.selectedPopup);
  }
  chkValue(e: any) {
    console.log(e);
    if (e === 'optionm-1' || e === 'option-1') {
      this.selectedPay = 'tarjeta';
    } else {
      this.selectedPay = 'safety';
    }
  }
  id: any = "banca";
  optionPay(e: any, i: any, ids: any) {
    console.log(i);
    this.banca = i;
    this.id = ids;
  }

  shopEnd() {
    // console.log(this.validForm());
    console.log(this.errors);
    // let varrr = this.formShop.controls['formContact'].controls['nameContacto'].errors.pattern
    console.log(this.formShop.getRawValue());
    // console.log(this.formShop.getRawValue()['formContact']['numberPhone0']);
    console.log(this.safe0Json['reservaVuelos'])

    if (this.validForm()) {
      // console.log(this.formShop);
      console.log(this.formShop.value);
      this.formShop.addControl('tipoRecibo', new FormControl('BV'))
      // this.formShop.addControl('PriceTotal', new FormControl(this.safe0Json.precioBrutoLocal * this.resultJson.passenger.length));
      this.dataShop = this.formShop.value
      let dataShop = this.formShop.value
      localStorage.setItem('shop', JSON.stringify(dataShop))

      if (this.safe0Json['reservaVuelos']) {
        console.log('Reseva Vuelos')
        this.getReserva()
      } else {
        console.log('Reserva Seguros')
        this.getSecureBooking()
      }
      // console.log((this.formShop.controls));
      // console.log((<FormArray>this.formShop.get(['formContact', 'phones'])).controls)
      // this.route.navigateByUrl('/home/comprar', navigationExtras);
      // this.route.navigateByUrl('/home/conformidad')
    }
  }

  otherPlan() {
    localStorage.removeItem('safe0')
    this.route.navigateByUrl('/home/seguros/slide')
  }


  selectVuelo(isIda: boolean) {
    this.modalDetalle = isIda ? this.detalleVuelos.segmentoDeparture : this.detalleVuelos.segmentoReturn;
  }
  listCoverage() {
    // this.coverageDisplay = false
    let lcobertura: CoberturaSeguroRQ = {
      CodigoISOPais: this.businessunit.id_pais_ac,
      Agencia: this.businessunit.codigo_ac,
      Sucursal: this.businessunit.sucursal_ac,
      CodigoProducto: this.safe0Json.codProducto,
      CodigoTarifa: this.safe0Json.codTarifa,
      Edad: this.resultJson.ClienteCotizacion.shift().Edad,     // COLOCAR LA PRIMERA EDAD DE BUSQUEDA
      TipoModalidad: this.safe0Json.codModalidad
    }

    let payload = new NMRequestBy<CoberturaSeguroRQ>(lcobertura);

    this.coverageService.getCoverage(payload).pipe(take(5)).subscribe({
      next: (response) => {
        this.coverageL = response
        this.coverageList = response['Resultado'].find((e: any) => {
          if (e.Codigo === 'C.4.1.10.1') {
            return e
          }
        })
        // this.coverageDisplay = true
        localStorage.setItem('coverage', JSON.stringify(this.coverageList))
      },
      error: error => console.log(error),
    }
      // data => console.log(data['Resultado']),
    )
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
  pasajerosVuelos() {
    let pasajeros: any = []
    this.dataShop.customers.forEach((value: any, index: number) => {
      let jsonPasajeros = {
        type: "ADT",
        name: value.nameCustomer,
        lastName: value.lastNameCustomer,
        birthday: value.yearCustomer + '-' + value.monthCustomer.padStart(2, '0') + '-' + value.dayCustomer.padStart(2, '0'),
        documentType: (value.typeDocCustomer === 'dni') ? 0 : 1,
        documentNumber: value.numDocCustomer,
        gender: (value.sexCustomer === 'masculino') ? 'M' : '',
        email: this.dataShop.formContact.mailContacto,
        phone: this.dataShop.formContact.numberPhone0
      }
      pasajeros.push(jsonPasajeros)
    })
    return pasajeros
  }
  edades() {
    let Ages = []
    // Obtiene la fecha de hoy
    let Today = new Date()
    let day = String(Today.getDate()).padStart(2, '0') + String(Today.getMonth() + 1).padStart(2, '0') + String(Today.getFullYear())
    // Obtiene la fecha de nacimiento
    let fNac = this.dataShop.customers
    for (let e of this.dataShop.customers) {
      let customer = e.dayCustomer.padStart(2, '0') + e.monthCustomer.padStart(2, '0') + e.yearCustomer
      let Edad = Math.ceil((Number(day) - Number(customer)) / (1000 * 300)) + 1
      Ages.push(Edad)
    }
    this.agesCustomers = Ages.join(';')
    // return Edad
  }
  // RESERVA DE SEGUROS
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
      this.loaderSubjectService.closeLoader()
    })
  }
  // RESERVA VUELOS
  getReserva() {
    const textSend = 'SE ESTA GENERANDO SU RESERVA!'
    this.loaderSubjectService.showText(textSend)

    console.log(this.dataShop.formContact.recibo);

    let payload = {
      "segmentSelected": [
        this.safe0Json.departure, this.safe0Json.return
      ],
      "IdGroup": this.safe0Json.idGroup,
      "passengers": this.pasajerosVuelos(),
      contact: {
        name: this.dataShop.formContact.nameContacto,
        lastName: this.dataShop.formContact.lastnameContacto,
        email: this.dataShop.formContact.mailContacto,
        // address: (this.dataShop.formContact.recibo === undefined) ? this.dataShop.formContact.recibo[0].direccion : this.dataShop.formCard.address,
        address: (this.dataShop.formContact.recibo === undefined) ? this.dataShop.formContact.recibo[0].direccion : 'LIMA',
        phones: [
          {
            phoneNumber: this.dataShop.formContact.numberPhone0
          }
        ]
      }
    }
    console.log(payload)

    this.reservaVuelosService.reserva(payload, this.tokenJson).subscribe({
      next: (response: any) => {
        console.log(response)
        this.resevaVuelo = response
        localStorage.setItem('reserva', JSON.stringify(response))
        this.route.navigateByUrl('/home/conformidad')

        // if (this.shopString.formCard.select21 === 'SAFETYPAY') {
        //   this.getGeneratePay()
        // } else {
        //   this.getCardPayment()
        // }
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
  showDatosPasajero(e?: any) {
    // console.log(this.showAdulto)
    console.log(this.formShop.getRawValue()['customers'])
    
    this.showAgregarAdulto = !this.showAgregarAdulto
    for (let x = 0; x < this.formShop.getRawValue()['customers'].length; x++) {
      if (e === x) {
        console.log(e)
        console.log(x)
        console.log(this.showAgregarAdulto)
        this.showAdulto = e
      }
    }
  }

}
