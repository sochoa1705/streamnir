import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailingService } from 'src/app/Services/mailing/mailing.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { LoaderSubjectService } from 'src/app/shared/components/loader/service/loader-subject.service';

@Component({
	selector: 'app-modal-boletin',
	templateUrl: './modal-boletin.component.html',
	styleUrls: ['./modal-boletin.component.scss']
})
export class ModalBoletinComponent implements OnInit {

	formGroup: FormGroup;
	formMail = {
		nombreMail: new FormControl('', [Validators.required,Validators.maxLength(50), this.noWhitespaceValidator]),
		apellidoMail: new FormControl('',[Validators.required,Validators.maxLength(50), this.noWhitespaceValidator]),
		correoMail: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(50)]),
		politicasMail: new FormControl(false,[Validators.requiredTrue]),
		autorizoMail: new FormControl(false,[Validators.requiredTrue])
	};
	constructor(public activeModal: NgbActiveModal,
		private _mailingService: MailingService,
		private _notification: NotificationService,
		public _loaderSubjectService: LoaderSubjectService,
		) {
		this.formGroup = new FormGroup(this.formMail);
	}
	arrayChecks = [
		{
			isCheked: false,
			text: 'Al suscribirte estás aceptando nuestra',
			isError:false
		},
		{
			isCheked: false,
			text: 'Autorizo el uso de mi información para recibir publicidad de la empresa.',
			isError:false
		}
	];
	showMessageClose=false;
	isLoader=false;
	
	ngOnInit(): void {
		this.showMessageClose=false;
		this.arrayChecks.forEach((item) => {
			item.isCheked = false;
			item.isError = false;
		});
	}

	checked(index: number) {
		const value=!this.arrayChecks[index].isCheked;
		this.arrayChecks[index].isCheked = value;
		this.arrayChecks[index].isError = !value;
		if(index==0) this.politicasMailField.setValue(value);
		if(index==1) this.autorizoMailField.setValue(value);
	}

	noWhitespaceValidator(control: any) {
		const isWhitespace = (control?.value || '').trim().length === 0;
		const startWithSpace = (control?.value || '')[0] === ' ';
		const isValid = !(isWhitespace || startWithSpace);
		return isValid ? null : { whitespace: true };
	}

	submitForm(){
		if(this.formGroup.valid){
			this.isLoader=true;
			let data = {
				name: this.nombreMailField.value,
				lastname:this.apellidoMailField.value,
				email: this.correoMailField.value,
				privacyPolicy: this.politicasMailField.value,
				dataPolicy: this.autorizoMailField.value
			}
			this._mailingService.createContact(data,true).subscribe({
				next: (response: any) => {
					this.isLoader=false;
					this.showMessageClose=true;
					this.timeMAiling();
				},
				error: (err) => {
					this.isLoader=false;
					this.showMessageClose=false;
					window.scroll({ top: 0, behavior: 'smooth' });
					this._notification.showNotificacion('Error', err.error.code =='duplicate_parameter' ? 'Al parecer usted ya se encuentra suscrito':'Al parecer hubo un error al enviar su suscripción', 5)
				}
			});
		}else{
			this.formGroup.markAllAsTouched();
			this.arrayChecks[0].isError=!this.politicasMailField.value;
			this.arrayChecks[1].isError=!this.autorizoMailField.value;
		}
	}

	timeMAiling() {
		setTimeout(() => {
			this.showMessageClose=true;
			this.activeModal.close();
		}, 5000);
	}

	get nombreMailField(): AbstractControl {
		return this.formGroup.get('nombreMail')!;
	}

	get apellidoMailField(): AbstractControl {
		return this.formGroup.get('apellidoMail')!;
	}

	get correoMailField(): AbstractControl {
		return this.formGroup.get('correoMail')!;
	}

	get politicasMailField(): AbstractControl {
		return this.formGroup.get('politicasMail')!;
	}

	get autorizoMailField(): AbstractControl {
		return this.formGroup.get('autorizoMail')!;
	}

}
