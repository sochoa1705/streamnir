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
  coverageList: any
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

  detalleVuelos:ClassDetalleLocalSt;

  modalDetalle:ClassDetalleModalSegment;

  @ViewChild('adultoCdr', { static: false }) adulto!: ElementRef<HTMLInputElement>;
  constructor(
    public route: Router,
    private router: ActivatedRoute,
    public offersService: OffersService,
    public coverageService: CoverageService,
  ) {
    this.filtroVuelo = localStorage.getItem('filtroVuelo')
    this.filtroVueloJson = JSON.parse(this.filtroVuelo)
    this.safe0 = localStorage.getItem('safe0');
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe');
    const detalleVuelosStr:any = localStorage.getItem('detalleVuelo');
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
    console.log(this.selectedPay)

    this.pop = this.safe0Json
    // this.getSecureBooking()
    console.log(this.current);
    this.loadShop();
    //console.log(this.safe0Json.detailPay);
    this.firstFormGroup = new FormGroup({ //FORMULARIO DE CONTACTO EN MOBILE
      firstCtrl: new FormControl('', Validators.required),
      nameContacto: new FormControl('', Validators.required),
      lastnameContacto: new FormControl('', Validators.required),
      // AGREGAR
      // mailContacto: new FormControl(),
      // mailConfirmContacto: new FormControl(),
      // typePhone0: new FormControl(),
      // code0: new FormControl(),
      // numberPhone0: new FormControl(),
      // phones: new FormArray([]),
      // recibo: new FormArray([]),
      // chkFac: new FormControl()

    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('idavuelta', Validators.required),
    });

    this.createForm()
    // this.chkValue('')
    console.log(this.resultJson)
    console.log(this.filtroVueloJson)

    let pasajeros = this.resultJson !== null ? this.resultJson['ClienteCotizacion'] : this.filtroVueloJson['pasajeros']
    console.log(pasajeros);
    
    for (const i of pasajeros) {
      this.addCustomers()
    }
    this.selectYear()
    if (this.current['filter'] !== 'filter') {
      this.listCoverage()
    }
  }

  toCustomer(e: any) {
    console.log(e.target.checked);
  }

  selectYear() {
    for (let i = 1950; i < 2021; i++) {
      let year = String(i)
      this.listYears.push(year)
    }
  }

  validForm() {
    this.errors = []

    const typePay: string = this.formShop.getRawValue()['formCard']['select21']
    if (typePay === 'TARJETA') {
      // TC
      let numberCard: string = this.formShop.getRawValue()['formCard']['numberCard']
      if (numberCard === undefined || numberCard === null || numberCard.trim() === '') {
        this.errors.push({ name: this.MSG_NUMBER_CARD, message: 'Ingresar número de tarjeta' })
      }

      let nameCard: string = this.formShop.getRawValue()['formCard']['nameCard']
      if (nameCard === undefined || nameCard === null || nameCard.trim() === '') {
        this.errors.push({ name: this.MSG_NAME_CARD, message: 'Nombre del titular de tarjeta' })
      }

      let expiredCard: string = this.formShop.getRawValue()['formCard']['expiredCard']
      if (expiredCard === undefined || expiredCard === null || expiredCard.trim() === '') {
        this.errors.push({ name: this.MSG_EXPIRED_CARD, message: 'fecha expiración de tarjeta' })
      }

      let ccvCard: string = this.formShop.getRawValue()['formCard']['ccvCard']
      if (ccvCard === undefined || ccvCard === null || ccvCard.trim() === '') {
        this.errors.push({ name: this.MSG_CCV_CARD, message: 'Código requerido' })
      }

      let tipoDoc: string = this.formShop.getRawValue()['formCard']['tipoDoc']
      if (tipoDoc === undefined || tipoDoc === null || tipoDoc.trim() === '') {
        this.errors.push({ name: this.MSG_TYPE_DOC, message: 'tipo es requerido' })
      }

      let numDoc: string = this.formShop.getRawValue()['formCard']['numDoc']
      if (numDoc === undefined || numDoc === null || numDoc.trim() === '') {
        this.errors.push({ name: this.MSG_NUM_DOC, message: 'Documento requerido' })
      }

      let feePay: string = this.formShop.getRawValue()['formCard']['feePay']
      if (feePay === undefined || feePay === null || feePay.trim() === '') {
        this.errors.push({ name: this.MSG_QUOTE, message: 'Cuotas requerido' })
      }

      let cityCard: string = this.formShop.getRawValue()['formCard']['cityCard']
      if (cityCard === undefined || cityCard === null || cityCard.trim() === '') {
        this.errors.push({ name: this.MSG_CITY, message: 'Ciudad requerida' })
      }

      let address: string = this.formShop.getRawValue()['formCard']['address']
      if (address === undefined || address === null || address.trim() === '') {
        this.errors.push({ name: this.MSG_ADRESS, message: 'Dirección es requerida' })
      }
    } else {
      // SAFETYPAY
      let bankPay: string = this.formShop.getRawValue()['formCard']['bankPay']
      if (bankPay === undefined || bankPay === null || bankPay.trim() === '') {
        this.errors.push({ name: this.MSG_BANK, message: 'Elija el banco' })
      }
    }

    //FORM PASAJERO
    for (let x = 0; x < this.formShop.getRawValue()['customers'].length; x++) {
      let nameCustomer: string = this.formShop.getRawValue()['customers'][x]['nameCustomer']
      if (nameCustomer === undefined || nameCustomer === null || nameCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NAME_CUSTOMER, message: 'Nombre del pasajero es requerido' })
      }

      let lastNameCustomer: string = this.formShop.getRawValue()['customers'][x]['lastNameCustomer']
      if (lastNameCustomer === undefined || lastNameCustomer === null || lastNameCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_LAST_NAME_CUSTOMER, message: 'Apellido del pasajero es requerido' })
      }


      let dayCustomer: string = this.formShop.getRawValue()['customers'][x]['dayCustomer']
      if (dayCustomer === undefined || dayCustomer === null || dayCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_DAY_CUSTOMER, message: 'Dia de la fecha nacimiento del pasajero es requerido' })
      }

      let monthCustomer: string = this.formShop.getRawValue()['customers'][x]['monthCustomer']
      if (monthCustomer === undefined || monthCustomer === null || monthCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_MONTH_CUSTOMER, message: 'Mes de la fecha nacimiento del pasajero es requerido' })
      }

      let yearCustomer: string = this.formShop.getRawValue()['customers'][x]['yearCustomer']
      if (yearCustomer === undefined || yearCustomer === null || yearCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_YEAR_CUSTOMER, message: 'Año de la fecha nacimiento del pasajero es requerido' })
      }

      let nationalityCustomer: string = this.formShop.getRawValue()['customers'][x]['nationalityCustomer']
      if (nationalityCustomer === undefined || nationalityCustomer === null || nationalityCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NATIONALITY_CUSTOMER, message: 'Nacionalidad del pasajero es requerido' })
      }

      let typeDocCustomer: string = this.formShop.getRawValue()['customers'][x]['typeDocCustomer']
      if (typeDocCustomer === undefined || typeDocCustomer === null || typeDocCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_TYPE_DOC_CUSTOMER, message: 'Tipo de documento del pasajero es requerido' })
      }

      let numDocCustomer: string = this.formShop.getRawValue()['customers'][x]['numDocCustomer']
      if (numDocCustomer === undefined || numDocCustomer === null || numDocCustomer.trim() === '') {
        this.errors.push({ indice: x, name: this.MSG_NUM_DOC_CUSTOMER, message: 'Tipo de documento del pasajero es requerido' })
      }

      let sexCustomer: string = this.formShop.getRawValue()['customers'][x]['sexCustomer']
      if (sexCustomer === undefined || sexCustomer === null) {
        this.errors.push({ indice: x, name: this.MSG_SEX, message: 'Elegir un sexo' })
      }
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
    }
    if (mailConfirmContacto !== mailContacto) {
      this.errors.push({ name: this.MSG_EMAILC_CONTACT, message: 'Email no coincide' })
    }

    let typePhone0: string = this.formShop.getRawValue()['formContact']['typePhone0']
    if (typePhone0 === undefined || typePhone0 === null || typePhone0.trim() === '') {
      this.errors.push({ name: this.MSG_TYPEPHONE_CONTACT, message: 'Tipo de teléfono es requerido' })
    }
    let code0: string = this.formShop.getRawValue()['formContact']['code0']
    if (code0 === undefined || code0 === null || code0.trim() === '') {
      this.errors.push({ name: this.MSG_CODE0_CONTACT, message: 'Código de país es requerido' })
    }
    let numberPhone0: string = this.formShop.getRawValue()['formContact']['numberPhone0']
    if (numberPhone0 === undefined || numberPhone0 === null || numberPhone0.trim() === '') {
      this.errors.push({ name: this.MSG_PHONE0_CONTACT, message: 'Teléfono es requerido' })
    }
    if (!this.validNumber(numberPhone0)) {
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

  validNumber(inputText: any): boolean {
    return new RegExp(/^[0-9]+$/).test(inputText)
  }

  toFactura(e: any) {
    console.log(e.target.checked);
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
        nameContacto: new FormControl(),
        lastnameContacto: new FormControl(),
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

  addCustomers() {
    // ((<any>this.formShop.controls['formContact']).controls['phones']).push(
    (<FormArray>this.formShop.controls['customers']).push(
      new FormGroup({
        nameCustomer: new FormControl(),
        lastNameCustomer: new FormControl(),
        dayCustomer: new FormControl(),
        monthCustomer: new FormControl(),
        yearCustomer: new FormControl(),
        nationalityCustomer: new FormControl(),
        typeDocCustomer: new FormControl(),
        numDocCustomer: new FormControl(),
        sexCustomer: new FormControl(),
      }));
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
    console.log(this.formShop.getRawValue());
    // console.log(this.formShop.getRawValue()['formContact']['numberPhone0']);

    if (this.validForm()) {
      // console.log(this.formShop);
      console.log(this.formShop.value);
      this.formShop.addControl('tipoRecibo', new FormControl('BV'));
      // this.formShop.addControl('PriceTotal', new FormControl(this.safe0Json.precioBrutoLocal * this.resultJson.passenger.length));
      let dataShop = this.formShop.value
      localStorage.setItem('shop', JSON.stringify(dataShop));

      // console.log((this.formShop.controls));
      // console.log((<FormArray>this.formShop.get(['formContact', 'phones'])).controls)

      // this.route.navigateByUrl('/home/comprar', navigationExtras);
      this.route.navigateByUrl('/home/conformidad');
    }
  }

  otherPlan() {
    localStorage.removeItem('safe0')
    this.route.navigateByUrl('/home/vuelos/resultados');
  }


  selectVuelo(isIda:boolean){
    this.modalDetalle = isIda?this.detalleVuelos.segmentoDeparture:this.detalleVuelos.segmentoReturn;
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

}
