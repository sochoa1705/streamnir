import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MailingService } from '../../../Services/mailing/mailing.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';

@Component({
	selector: 'app-mailing',
	templateUrl: './mailing.component.html',
	styleUrls: [ './mailing.component.scss' ]
})
export class MailingComponent implements OnInit {
	@ViewChild('mailingBox') mailingBox: ElementRef;
	@Input() title!: string;
	@Input() span!: string;

	formMAiling: FormGroup;
	MSG_NOMBRE: string = 'nombreMail';
	MSG_CORREO: string = 'correoMail';
	MSG_POLITICA: string = 'politicasMail';
	MSG_AUTORIZO: string = 'autorizoMail';
	MSG_EMPTY: string = 'none';
	errors: any[] = [];
	ipCliente: any;
	validate: boolean;
	message: string;
	imgMailing: number;

	constructor(
			private mailingService: MailingService,
			private notification: NotificationService,
			public loaderSubjectService: LoaderSubjectService,
			public inputValidator: InputValidationService
	) {
		this.validate = false;
		this.ipCliente = localStorage.getItem('ipCliente');
	}

	ngOnInit(): void {
		this.createForm();
		this.doScroll();
	}

	createForm() {
		this.formMAiling = new FormGroup({
			nombreMail: new FormControl(),
			correoMail: new FormControl(),
			politicasMail: new FormControl(),
			autorizoMail: new FormControl()
		});
	}

	doScroll() {
		const hash = location.hash;
		if (hash && hash.trim() === '#subscribe')
			setTimeout(() =>
					this.mailingBox.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 800);
	}

	subscribe() {
		if (this.validForm()) {
			let data = {
				name: this.formMAiling.value.nombreMail,
				email: this.formMAiling.value.correoMail,
				privacyPolicy: this.formMAiling.value.politicasMail,
				dataPolicy: this.formMAiling.value.autorizoMail
			}
			this.mailingService.createContact(data).subscribe({
				next: (response: any) => {
					this.validate = true;
					this.imgMailing = response.id;
					this.message = 'Se registró correctamente a nuestro boletín.';

					this.timeMAiling();
				},
				error: () => this.notification.showNotificacion('Error', 'No se envió la suscripción', 10),
				complete: () => this.loaderSubjectService.closeLoader()
			});
		}
	}

	timeMAiling() {
		setTimeout(() => {
			this.validate = false;
			this.formMAiling.reset();
		}, 10000);
	}

	validForm() {
		this.errors = [];
		new RegExp('^[a-zA-Z ]+$', 'i');
		new RegExp('^[0-9]+$', 'i');
		new RegExp('^[a-zA-Z0-9 ]+$', 'i');
		const mail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

		let nombreMail: string = this.formMAiling.getRawValue()['nombreMail'];
		if (nombreMail === undefined || nombreMail === null || nombreMail.trim() === '')
			this.errors.push({ name: this.MSG_NOMBRE, message: 'Campo requerido' });

		let correoMail: string = this.formMAiling.getRawValue()['correoMail'];
		if (correoMail === undefined || correoMail === null || correoMail.trim() === '')
			this.errors.push({ name: this.MSG_CORREO, message: 'Campo requerido' });
		if (!mail.test(correoMail))
			this.errors.push({ name: this.MSG_CORREO, message: 'Ingresar correo válido' });

		let politicasMail: boolean = this.formMAiling.getRawValue()['politicasMail'];
		if (politicasMail === undefined || politicasMail === null || !politicasMail)
			this.errors.push({ name: this.MSG_POLITICA, message: 'Políticas es requerido' });

		let autorizoMail: boolean = this.formMAiling.getRawValue()['autorizoMail'];
		if (autorizoMail === undefined || autorizoMail === null || !autorizoMail)
			this.errors.push({ name: this.MSG_AUTORIZO, message: 'Campo requerido' });

		return this.errors.length === 0;
	}

	getMessage(messageKey: any) {
		return this.errors.filter((item: any) => item.name === messageKey).length > 0
				? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY;
	}
}
