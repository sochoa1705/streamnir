import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleSecureService } from './detalle-secure.service';

@Component({
  selector: 'app-detalle-secure',
  templateUrl: './detalle-secure.component.html',
  styleUrls: ['./detalle-secure.component.scss'],
})
export class DetalleSecureComponent implements OnInit {
  @Input() cot_Id: string = '';
  @Input() reserva_Id: string = '';
  @Input() tipo_Vuelo: string = '';
  data: any;
  edades: string = '';
  constructor(
    private detalleSecureService: DetalleSecureService,
    public ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getDetalleBooking();
  }
  getAirlineName(text: string): string {
    return text.split('|')[1];
  }
  private getDetalleBooking() {
    this.detalleSecureService
      .getSecureDetail(this.cot_Id, this.reserva_Id, this.tipo_Vuelo)
      .subscribe((data) => {
        this.data = data;
        this.data.asegurados.forEach((element: any, index: number) => {
          this.edades += element.edad;
          this.edades += (index < (this.data.asegurados.length - 1) ? ',': '')
        });
        console.log(this.data);
      });
  }
}
