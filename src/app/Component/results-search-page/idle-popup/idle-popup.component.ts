import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IdlePopupConstants } from './idle-popup.constants';
import { WHATSAPPCONSTANT } from 'src/app/shared/constant';
import { emailRequestIdle } from 'src/app/shared/utils/bodyEmailIdle';
import { Group } from 'src/app/api/api-checkout/models/rq-checkout-search';
import { emailRequestSaveSearch } from 'src/app/shared/utils/bodySaveSearch';
import { ReengancheService } from 'src/app/api/api-nmviajes/services/reenganche.service';

declare function expandBox(email: string): void;

@Component({
	selector: 'app-idle-popup',
	templateUrl: './idle-popup.component.html',
	styleUrls: ['./idle-popup.component.scss']
})
export class IdlePopupComponent implements OnInit {
	form!: FormGroup;
	submitted = false;
	@Input() firstTwoFlights:Group[]=[];

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private _reengancheService:ReengancheService
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			nombres: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email])
		});
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.valid) {
			this.saveClientsSearch();
			this.sendEmail();
		}
	}

	onOpenChat() {
		//expandBox(this.form.get('email')!.value)
		window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPPCONSTANT.cellphone}`, '_blank');
	}

	sendEmail() {
		const data=this.form.getRawValue();
		const bodyEmail=emailRequestIdle(data.email,data.nombres,this.firstTwoFlights);
		this.activeModal.close();
		this._reengancheService.sendFirstThreeFightsToEmail(bodyEmail).subscribe({
				next: () => {},
				error: () => {}
		});
	}

	saveClientsSearch(){
		const data=this.form.getRawValue();
		const bodyEmail=emailRequestSaveSearch(data.email,data.nombres);
		this._reengancheService.saveClientsSearch(bodyEmail).subscribe({
			error: (e) => console.error('SAVE_SEARCH', e)
		});
	}
}
