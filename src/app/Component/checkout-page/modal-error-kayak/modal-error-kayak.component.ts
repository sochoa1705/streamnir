import { Component, Input, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/Services/accounts.service';
import { getUrlSearchByKayak } from 'src/app/shared/utils/getParamsKayak';

@Component({
	selector: 'app-modal-error-kayak',
	templateUrl: './modal-error-kayak.component.html',
	styleUrls: ['../../../shared/components/modal-error/modal-error.component.scss']
})
export class ModalErrorKayakComponent {
	@Input() params: ParamMap;

	constructor(
		private activeModal: NgbActiveModal,
		private router: Router
	) {}

	redirectSearch() {
		if (this.params) {
			const urlSearchByKayak = getUrlSearchByKayak(this.params);
			this.router.navigateByUrl(urlSearchByKayak);
		}
		this.activeModal.close();
	}
}
