import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WHATSAPPCONSTANT } from 'src/app/shared/constant';

@Component({
  selector: 'app-modal-inactivity',
  templateUrl: './modal-inactivity.component.html',
  styleUrls: ['./modal-inactivity.component.scss']
})
export class ModalInactivityComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('futoo')
  }

  onClick() {
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPPCONSTANT.cellphone}`, '_blank');
    this.activeModal.close();
  }

}
