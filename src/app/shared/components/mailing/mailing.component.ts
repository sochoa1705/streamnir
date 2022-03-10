import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {
  @Input() title!: string;
  @Input() span!: string;

  constructor() { }

  ngOnInit(): void {
  }
  subscribe(e: any) {
    console.log('Suscrito')
    if(e){
      this.addTag()
    } else {
      this.addTagError('codigo error', 'descripcion del error', 'Mensaje')
    }
  }
  addTag() {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'nav_ofertasSuscripcion'
    })
  }
  addTagError(codigo: string, descripcion: string, mensaje: string) {
    (<any><any>window).dataLayer = (<any><any>window).dataLayer || [];
    (<any><any>window).dataLayer.push({
      'event': 'error_ofertasSuscripcion',
      'error_codigo': codigo,
      'error_descripcion': descripcion,
      'error_mensaje': mensaje
    })
  }
}
