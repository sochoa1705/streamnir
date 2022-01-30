import { Component, Input, OnInit } from '@angular/core';
import { ClassDetalleModalSegment } from '../../flights/models/flights.class';

@Component({
  selector: 'app-modal-detalle-vuelo',
  templateUrl: './modal-detalle-vuelo.component.html',
  styleUrls: ['./modal-detalle-vuelo.component.scss']
})
export class ModalDetalleVueloComponent  {

  @Input() modalDetalle:ClassDetalleModalSegment;


  constructor() { }


}
