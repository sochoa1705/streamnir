import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  formShop!: FormGroup
  errors: any[] = []
  MSG_EMPTY: string = 'none'

  MSG_BANK: string = 'bankPay'
  MSG_NAME_CONTACT: string = 'nameContacto'
  MSG_LASTNAME_CONTACT: string = 'lastnameContacto'
  MSG_EMAIL_CONTACT: string = 'mailContacto'
  MSG_EMAILC_CONTACT: string = 'mailConfirmContacto'
  MSG_TYPEPHONE_CONTACT: string = 'typePhone0'
  MSG_CODE0_CONTACT: string = 'code0'
  MSG_PHONE0_CONTACT: string = 'numberPhone0'
  MSG_CHK_POLITY: string = 'chkPolity'
  MSG_CHK_INFO: string = 'chkInfo'
  current: any;
  detailPay!: string;
  filter!: string;
  title!: string;
  asistencia!: boolean;
  reembolso!: boolean;
  detalleViaje!: boolean;
  detalleCobertura!: boolean;
  cupon!: boolean;
  mobile!: boolean
  selectedPay: string = 'safety'
  selectedPopup: string = 'agencia';
  result: any
  resultJson: any
  safe0: any
  safe0Json: any
  banca: boolean = true;
  /* metodoPago: any = [
    { name: 'option-2', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: true, id: "0" },
    { name: 'option-1', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: false, id: "1" },
  ] */

  metodoPago: any = [
    { name: 'optionm-2', value: 'bancaInternet', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: true, id: "0" },
    { name: 'optionm-1', value: 'tarjeta', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: false, id: "1" },
  ]
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  @ViewChild('adultoCdr', { static: false }) adulto!: ElementRef<HTMLInputElement>;

  constructor(
    public route: Router,
    private router: ActivatedRoute,
    public offersService: OffersService,
  ) {
    this.safe0 = localStorage.getItem('safe0')
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    console.log(this.resultJson);
    console.log(this.safe0Json);
    console.log(screen.width);
    if (screen.width < 769) {
      this.mobile = true
    } else {
      this.mobile = false
    }

    // this.current = this.route.getCurrentNavigation()?.extras.state as any
  }

  showDataContacto: Boolean = true;
  showDataContact() {
    this.showDataContacto = this.showDataContacto ? false : true;
  }

  ngOnInit(): void {
    // this.getSecureBooking()
    // this.loadShop();
    // console.log(this.current);
    //console.log(this.safe0Json.detailPay);

    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl('idavuelta', Validators.required),

    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('idavuelta', Validators.required),

    });
    this.createForm()
    // this.chkValue('')
    for (const i of this.resultJson['ClienteCotizacion']) {
      this.addCustomers()
    }
  }

  validForm() {
    this.errors = []

    let bankPay: string = this.formShop.getRawValue()['formCard']['bankPay']
    if (bankPay === undefined || bankPay === null || bankPay.trim() === '') {
      this.errors.push({ name: this.MSG_BANK, message: 'Elija el banco' })
    }
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
    let chkPolity: string = this.formShop.getRawValue()['chkPolity']
    if (chkPolity === undefined || chkPolity === null || chkPolity.trim() === '') {
      this.errors.push({ name: this.MSG_CHK_POLITY, message: 'Políticas  es requerido' })
    }
    let chkInfo: string = this.formShop.getRawValue()['chkInfo']
    if (chkInfo === undefined || chkInfo === null || chkInfo.trim() === '') {
      this.errors.push({ name: this.MSG_CHK_INFO, message: 'Autorizar uso de información es requerido' })
    }
    //FORMCONTACT


    return this.errors.length === 0
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }

  createForm() {
    this.formShop = new FormGroup({
      customers: new FormArray([]),
      formCard: new FormGroup({
        bankPay: new FormControl(),
        select21: new FormControl('bancaInternet'),
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
        nameContacto: new FormControl(),
        lastnameContacto: new FormControl(),
        mailContacto: new FormControl(),
        mailConfirmContacto: new FormControl(),
        typePhone0: new FormControl(),
        code0: new FormControl(),
        numberPhone0: new FormControl(),
        phones: new FormArray([]),
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
        sexCustomer: new FormControl()
      }));
  }

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

  pasajero() {
    let scrolTop = window.scrollY;
    let n = scrolTop - 50;
    let elemento = this.adulto.nativeElement;
    console.log(elemento);
    elemento.classList.add('adultocdr');
    elemento.setAttribute('style', `margin-top: ${n}px`);
    // elemento.style = `margin-top: ${scrolTop}`

  }
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
    const type = e.target.id;
    if (type === 'optionm-1' || type === 'option-1') {
      this.selectedPay = 'tarjeta';
    } else {
      this.selectedPay = 'safety';
    }
    //console.log(this.selectedPay);
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

    }
    // console.log(this.formShop);
    console.log(this.formShop.value);
    let dataShop = this.formShop.value
    localStorage.setItem('shop', JSON.stringify(dataShop));

    // console.log((this.formShop.controls));
    // console.log((<FormArray>this.formShop.get(['formContact', 'phones'])).controls)


    // this.route.navigateByUrl('/home/comprar', navigationExtras);
    // this.route.navigateByUrl('/home/conformidad');
  }

  otherPlan() {
    localStorage.removeItem('safe0')
    this.route.navigateByUrl('/home/seguros/planes');
  }
}
