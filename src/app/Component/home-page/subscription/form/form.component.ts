import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MailingService } from '../../../../Services/mailing/mailing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../../../../shared/components/success-dialog/success-dialog.component';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: [ './form.component.scss' ]
})
export class FormComponent implements OnInit, OnDestroy {
	form: FormGroup;
	submitAttempt = false;
	isLoading = false;

	mobileQuery: MediaQueryList;
	isMobile = false;

	modalSubscription = new Subscription();


	constructor(private formBuilder: FormBuilder,
							private mailingService: MailingService,
							private modalService: NgbModal,
							private media: MediaMatcher,
							public _snackBar: MatSnackBar) {
		this.checkMobileQuery();
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			'name': new FormControl('', Validators.required),
			'email': new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			'birthdate': new FormControl('', Validators.required),
			'docType': new FormControl('DNI', Validators.required),
			'docNumber': new FormControl('', Validators.required),
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
							centered: true,
							size: 'lg'
						});
						modalRef.componentInstance.title = 'Revisa tu correo para confirmar tu suscripción';
						modalRef.componentInstance.content = '¡Estás a un paso de recibir las mejores ofertas!';
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

	get birthdate() {
		return this.form.controls['birthdate'];
	}

	get docType() {
		return this.form.controls['docType'];
	}

	get docNumber() {
		return this.form.controls['docNumber'];
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
