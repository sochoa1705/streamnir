import { MisReservasService } from './mis-reservas-vuelos.service';
import { Component, OnInit } from '@angular/core';
import { GetMyBookings } from './mis-reservas-vuelos.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleBookingComponent } from '../modal/detalle-booking/detalle-booking.component';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';

@Component({
  selector: 'app-mis-reservas-vuelos',
  templateUrl: './mis-reservas-vuelos.component.html',
  styleUrls: ['./mis-reservas-vuelos.component.scss']
})
export class MisReservasVuelosComponent implements OnInit {

  bookings: GetMyBookings[] = [];
  userStorage: UserStorage;

  constructor(private misReservasService: MisReservasService,
    private modalService: NgbModal,
    public accountService: AccountsService) {
    //super();

  }
  ngOnInit(): void {

    this.getAllBookings();
  }
  private getAllBookings() {
    this.userStorage = this.accountService.getUserStorage();
    this.misReservasService.getAllBooking(this.userStorage.id.toString()).subscribe((data) => {
      this.bookings = data;
      localStorage.setItem('bookings', JSON.stringify(data));
    });
  }
  openDetailBooking(item: GetMyBookings) {
    const modalRef = this.modalService.open(DetalleBookingComponent, { size: 'lg', windowClass: 'modalDetalle' });
    modalRef.componentInstance.cot_Id = item.cot_Id;
    modalRef.componentInstance.reserva_Id = item.reserva_Id;
    modalRef.componentInstance.tipo_Vuelo = item.tipo_Vuelo;
  }
}
