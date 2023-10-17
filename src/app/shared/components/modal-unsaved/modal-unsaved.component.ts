import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-unsaved',
  templateUrl: './modal-unsaved.component.html',
  styleUrls: ['./modal-unsaved.component.scss']
})
export class ModalUnsavedComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeSave(){
    this.activeModal.close('saved');
  }

}
