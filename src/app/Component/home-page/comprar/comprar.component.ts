import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/Services/mock/offers.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  current: any;
  filter!: string;
  title!: string;
  asistencia!: boolean;
  reembolso!: boolean;
  detalleViaje!: boolean;
  detalleCobertura!: boolean;
  cupon!: boolean;

  selectedPay: any = 'tarjeta';
  metodoPago: any = [
    {name: 'option-1', img: '/credit-card.png', text: 'Tarjeta de crédito o débito', checked: true, id: "0" },
    {name: 'option-2', img: '/footer/_safety.png', text: 'Banca por internet / Agencias', checked: false, id: "1" },
  ]

  constructor(
    public route: Router,
    public offersService: OffersService,
  ) {
    this.current = this.route.getCurrentNavigation()?.extras.state as any
  }

  ngOnInit(): void {
    this.loadShop();
    console.log(this.current);

  }

  loadShop() {
    this.filter = this.current.filter;
    this.title = this.current.title;
    this.asistencia = this.current.asistencia;
    this.reembolso = this.current.reembolso;
    this.detalleViaje = this.current.detalleViaje;
    this.detalleCobertura = this.current.detalleCobertura;
    this.cupon = this.current.cupon;
  }

  chkValue(e: any, i: any) {
    console.log(e.target.checked);
    console.log(i);
    if(i === 0){
      this.selectedPay = 'tarjeta';
    } else {
      this.selectedPay = 'safety';
    }
  }


}
