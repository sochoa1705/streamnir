import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from 'src/app/shared/global';

@Component({
  selector: 'app-modal-insurance',
  templateUrl: './modal-insurance.component.html',
  styleUrls: ['./modal-insurance.component.scss']
})
export class ModalInsuranceComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  isDomestic=false;
  ngOnInit(): void {
    this.isDomestic=GlobalComponent.isDomestic;
  }
}
