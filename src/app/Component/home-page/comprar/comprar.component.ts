import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';
import { SecureBookingService } from 'src/app/Services/secureBooking/secure-booking.service';
import { GeneratePayService } from 'src/app/Services/generatePay/generate-pay.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  formShop!: FormGroup
  current: any;
  detailPay!: string;
  filter!: string;
  title!: string;
  asistencia!: boolean;
  reembolso!: boolean;
  detalleViaje!: boolean;
  detalleCobertura!: boolean;
  cupon!: boolean;

  selectedPay: string = 'tarjeta';
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
    { name: 'option-1', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: true, id: "1" },
    { name: 'option-2', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: false, id: "0" },
  ]
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  @ViewChild('adultoCdr', { static: false }) adulto!: ElementRef<HTMLInputElement>;

  constructor(
    public route: Router,
    private router: ActivatedRoute,
    public offersService: OffersService,
    public generatePayService: GeneratePayService,
  ) {
    this.safe0 = localStorage.getItem('safe0')
    this.safe0Json = JSON.parse(this.safe0)
    this.result = localStorage.getItem('Datasafe')
    this.resultJson = JSON.parse(this.result)
    console.log(this.resultJson);
    console.log(this.safe0Json);

    // this.current = this.route.getCurrentNavigation()?.extras.state as any
  }

  showDataContacto: Boolean = true;
  showDataContact() {
    this.showDataContacto = this.showDataContacto ? false : true;
  }

  ngOnInit(): void {
    this.getGeneratePay()
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
    for (const i of this.resultJson.ClienteCotizacion) {
      this.addCustomers()
    }
  }

  getGeneratePay(){
    let payload = {
      "Aplicacion": "Intranet",
      "CodigoSeguimiento": "[Web: midominio.com - Agente: demo - Id: 19082021101601]",
      "CodigosEntorno": "DESA/NMO/NMO",
      "Parametros": {
        "PromoterName": "",
        "CustomerName": "PEREZ ANA",
        "CustomerDocumentNumber": "10078410452",
        "IdClient": 12758,
        "WebId": "3",
        "Mail": "anaperez@gmail.com",
        "DKClient": "61649",
        "UserAgent": "Assist Card",
        "IdUser": "87614",
        "IpUser": "119.5.166.59",
        "Amount": {
          "FeeAmount": 0.9,
          "RechargeAmount": 64,
          "Currency": "USD"
        }
      }
    }
  this.generatePayService.generatePay(payload).subscribe((e: any) => console.log(e))
}

  createForm() {
    this.formShop = new FormGroup({
      customers: new FormArray([]),
      formCard: new FormGroup({
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
    if (type === 'option-1') {
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
    // console.log(this.formShop);
    console.log(this.formShop.value);
    // console.log((this.formShop.controls));
    // console.log((<FormArray>this.formShop.get(['formContact', 'phones'])).controls)


    // this.route.navigateByUrl('/home/comprar', navigationExtras);
    this.route.navigateByUrl('/home/conformidad');
  }

  otherPlan() {
    localStorage.removeItem('safe0')
    this.route.navigateByUrl('/home/seguros/planes');
  }
}
