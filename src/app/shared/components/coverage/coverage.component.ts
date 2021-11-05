import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.scss']
})
export class CoverageComponent implements OnInit {
  @Input() txtPlan: any
  @Input() txtDias: any
  @Input() asistenciaMedica: any
  @Input() txtOrigen: any
  @Input() txtDestino: any
  @Input() txtSalida: any
  @Input() txtRegreso: any
  @Input() txtPasajeros: any
  constructor() { }

  ngOnInit(): void {
  }

}
