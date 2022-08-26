import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleBookingService } from './detalle-booking.service';

@Component({
  selector: 'app-detalle-booking',
  templateUrl: './detalle-booking.component.html',
  styleUrls: ['./detalle-booking.component.scss'],
})
export class DetalleBookingComponent implements OnInit {
  @Input() cot_Id: string = '';
  @Input() reserva_Id: string = '';
  @Input() tipo_Vuelo: string = '';
  data: any;
  constructor(
    private detalleBookingService: DetalleBookingService,
    public ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getDetalleBooking();
  }
  getAirlineName(text: string): string {
    return text.split('|')[1];
  }
  private getDetalleBooking() {
    this.detalleBookingService
      .getBookingDetail(this.cot_Id, this.reserva_Id, this.tipo_Vuelo)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data);
      });
  }
}
