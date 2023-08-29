import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';
import { MailingService } from '../../../Services/mailing/mailing.service';

@Component({
	selector: 'app-subscription',
	templateUrl: './subscription.component.html',
	styleUrls: [ './subscription.component.scss' ]
})
export class SubscriptionComponent implements OnInit {
	form: FormGroup;
	submitAttempt = false;

	mobileQuery: MediaQueryList;
	isMobile = false;

	constructor(private formBuilder: FormBuilder,
	            private mailingService: MailingService,
	            private loaderService: LoaderSubjectService,
	            private media: MediaMatcher) {
		this.checkMobileQuery();
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			'name': new FormControl('', Validators.required),
			'email': new FormControl('', Validators.compose([ Validators.required, Validators.email ])),
			'destination': new FormControl('', Validators.required),
			'privacyPolicy': new FormControl(false, Validators.requiredTrue),
			'dataPolicy': new FormControl(false, Validators.nullValidator)
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
		this.loaderService.showLoader();
		if (this.form.valid) {
			const data = {
				...this.form.value
			};
			this.mailingService.createContact(data).subscribe({
				next: (response: any) => {
					console.info('CREATE_CONTACT', response);
				},
				error: (error: any) => {
					this.loaderService.closeLoader();
					console.error(error);
				},
				complete: () => this.loaderService.closeLoader()
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
}
