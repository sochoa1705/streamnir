import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  selectedValue!: string;
  json = {
    filter: 'filter',
    title: '¡Falta poco! Confirma ahora tu reserva.',
    asistencia: true,
    reembolso: true,
    detalleViaje: true,
    detalleCobertura: false,
    cupon: true
  }
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor(public route: Router) { }

  id:any = "tabIda";
  showOption(ids:any) {
    this.id = ids;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

  tab(e: any) {
    // console.log(e.path[1].id);
    // console.log(e.path[0].id);
    let id = e.path[1].id;
    var nu = id.charAt(id.length - 1);
    // console.log(nu);

    let cdr: any = document.getElementsByClassName('mat-tab-body-content');
    // console.log(cdr);

    cdr[0].style.display = `none`;

  }

  shop() {
    //console.log(this.form.value);
    const navigationExtras: NavigationExtras = { state: this.json };
    this.route.navigateByUrl('/home/comprar', navigationExtras);
  }
}
