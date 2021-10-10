import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  current: any;
  detailPay!: string;
  filter!: string;
  title!: string;
  asistencia!: boolean;
  reembolso!: boolean;
  detalleViaje!: boolean;
  detalleCobertura!: boolean;
  cupon!: boolean;

  selectedPay: string = 'safety';
  selectedPopup: string = 'agencia';

  banca: boolean = true;
  metodoPago: any = [
    { name: 'option-2', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: true, id: "0" },
    { name: 'option-1', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: false, id: "1" },
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
    this.current = this.route.getCurrentNavigation()?.extras.state as any
  }

  showDataContacto: Boolean = true;
  showDataContact() {
    this.showDataContacto = this.showDataContacto ? false : true;
  }

  ngOnInit(): void {
    this.loadShop();
    console.log(this.current);

    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl('idavuelta', Validators.required),

    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('idavuelta', Validators.required),

    });
  }

  pasajero(){
    let scrolTop = window.scrollY;
    let n = scrolTop - 50;
    let elemento = this.adulto.nativeElement;
    console.log(elemento);
    elemento.classList.add('adultocdr');
    elemento.setAttribute('style', `margin-top: ${n}px`);
    // elemento.style = `margin-top: ${scrolTop}`
  
  }
  pasajeroClose(){
    let elemento = this.adulto.nativeElement;
    elemento.classList.remove('adultocdr');
    elemento.setAttribute('style', `display:none`);
  }

  // createForm() {
  //   this.form = new FormGroup({
  //     tipo: new FormControl('idavuelta'),
  //     catergory: new FormControl('economy'),
  //     // adultos: new FormControl(0),
  //     ninos: new FormControl(0),
  //     infantes: new FormControl(0),
  //     origen: new FormControl(),
  //     destino: new FormControl(''),
  //     range: new FormGroup({
  //       start: new FormControl(),
  //       end: new FormControl()
  //     })
  //   })
  // }

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
  }
  id: any = "banca";
  optionPay(e: any, i: any, ids: any) {
    console.log(i);
    this.banca = i;
    this.id = ids;
  }

  shopEnd() {
    // this.route.navigateByUrl('/home/comprar', navigationExtras);
    this.route.navigateByUrl('/home/conformidad');

  }
}
