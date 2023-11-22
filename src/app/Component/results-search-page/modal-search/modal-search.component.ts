import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss']
})
export class ModalSearchComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,) { }
  @Input() flightType=0
  @Output() reloadPageResult = new EventEmitter();
  ngOnInit(): void {
  }

  reloadPage(){
    this.activeModal.close()
    this.reloadPageResult.emit();
  }
}
