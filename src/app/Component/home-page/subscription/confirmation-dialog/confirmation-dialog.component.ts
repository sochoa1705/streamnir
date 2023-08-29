import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: [ './confirmation-dialog.component.scss' ]
})
export class ConfirmationDialogComponent {

	constructor(public activeModal: NgbActiveModal) {
	}
}
