import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-success-dialog',
	templateUrl: './success-dialog.component.html',
	styleUrls: [ './success-dialog.component.scss' ]
})
export class SuccessDialogComponent {
	@Input() title: string;
	@Input() content: string;

	constructor(public activeModal: NgbActiveModal) {
	}
}
