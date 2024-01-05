import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBoletinComponent } from './modal-boletin/modal-boletin.component';

@Component({
  selector: 'app-section-boletin',
  templateUrl: './section-boletin.component.html',
  styleUrls: ['./section-boletin.component.scss']
})
export class SectionBoletinComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModalBoletin(){
    this._modalService.open(ModalBoletinComponent, {
			centered: true,
			backdrop: 'static'
		});

  }

}
