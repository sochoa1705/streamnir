import { Component, OnInit } from '@angular/core';
import { GetMyBookings } from './mis-reservas-seguros.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { MisReservasSegurosService } from './mis-reservas-seguros.service';
import { DetalleSecureComponent } from '../modal/detalle-secure/detalle-secure.component';

@Component({
  selector: 'app-mis-reservas-seguros',
  templateUrl: './mis-reservas-seguros.component.html',
  styleUrls: ['./mis-reservas-seguros.component.scss']
})
export class MisReservasSegurosComponent implements OnInit {
  bookings: GetMyBookings[] = [];
  userStorage: UserStorage;
  constructor(private misReservasService: MisReservasSegurosService,
    private modalService: NgbModal,
    public accountService: AccountsService) {

  }
  ngOnInit(): void {

    this.getAllBookings();
  }
  private getAllBookings(){
    this.userStorage = this.accountService.getUserStorage();
    this.misReservasService.getAllBooking(this.userStorage.id.toString()).subscribe((data) => {
      console.log(data);
      this.bookings = data;
    });
  }
  openDetailBooking(item: GetMyBookings){
    const modalRef = this.modalService.open(DetalleSecureComponent, { size: 'lg', windowClass: 'modalDetalleSeguro' });
    modalRef.componentInstance.cot_Id = item.cot_Id;
    modalRef.componentInstance.reserva_Id = item.reserva_Id;
    modalRef.componentInstance.tipo_Vuelo = item.tipo_Vuelo;
  }
}
