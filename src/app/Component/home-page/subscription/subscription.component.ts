import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailingService } from '../../../Services/mailing/mailing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-subscription',
	templateUrl: './subscription.component.html',
	styleUrls: [ './subscription.component.scss' ]
})
export class SubscriptionComponent implements OnInit, OnDestroy {
	form: FormGroup;
	submitAttempt = false;
	isLoading = false;

	mobileQuery: MediaQueryList;
	isMobile = false;

	modalSubscription: Subscription;

	constructor(private formBuilder: FormBuilder,
	            private mailingService: MailingService,
	            private modalService: NgbModal,
	            private media: MediaMatcher,
	            public _snackBar: MatSnackBar) {
		this.checkMobileQuery();
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			'name': new FormControl('', Validators.required),
			'email': new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			'destination': new FormControl('', Validators.required),
			'privacyPolicy': new FormControl(false, Validators.requiredTrue),
			'dataPolicy': new FormControl(false, Validators.requiredTrue)
		});
	}

	private checkMobileQuery() {
		this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

		this.handleQueryChange();

		this.mobileQuery.addEventListener('change', this.handleQueryChange);
	}

	private handleQueryChange() {
		this.isMobile = this.mobileQuery.matches;
	}

	onSubmit() {
		this.submitAttempt = true;
		if (this.form.valid) {
			this.isLoading = true;
			const data = {
				...this.form.value
			};
			this.mailingService.createContact(data).subscribe({
				next: (response: boolean) => {
					if (response) {
						const modalRef = this.modalService.open(SuccessDialogComponent, {
							centered: true
						});
						modalRef.componentInstance.title = '¡Muchas gracias por suscribirte!';
						modalRef.componentInstance.content = 'Te mantendremos al tanto de todas nuestras novedades.';
						this.modalSubscription = modalRef.dismissed.subscribe(() => this.form.reset());
					}
				},
				error: (error: any) => {
					if (error?.error && error.error.code === 'duplicate_parameter')
						this._snackBar.open('El correo ingresado ya fue registrado', 'Entendido', {
							duration: 5000
						});
					this.isLoading = false;
				},
				complete: () => this.isLoading = false
			});
			this.submitAttempt = false;
		}
	}

	get name() {
		return this.form.controls['name'];
	}

	get email() {
		return this.form.controls['email'];
	}

	get destination() {
		return this.form.controls['destination'];
	}

	get privacyPolicy() {
		return this.form.controls['privacyPolicy'];
	}

	get dataPolicy() {
		return this.form.controls['dataPolicy'];
	}

	ngOnDestroy() {
		this.modalSubscription.unsubscribe();
	}
}
