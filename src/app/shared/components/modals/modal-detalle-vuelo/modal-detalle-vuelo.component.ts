import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-detalle-vuelo',
  templateUrl: './modal-detalle-vuelo.component.html',
  styleUrls: ['./modal-detalle-vuelo.component.scss']
})
export class ModalDetalleVueloComponent  {

  @Input() modalDetalle:any | null;


  constructor() { }


}
