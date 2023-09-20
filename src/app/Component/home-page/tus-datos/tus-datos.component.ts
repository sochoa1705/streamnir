import {
	AfterViewInit,
	Component,
	ComponentFactoryResolver,
	EventEmitter,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { PassengerComponent } from './passenger/passenger.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataPagePresenterService } from '../../../Services/presenter/data-page-presenter.service';
import { EGalleryCode, IGalleryImage } from '../../../Services/presenter/data-page-presenter.models';
import { takeWhile } from 'rxjs/operators';
import { TusDatosService } from '../../../Services/tus-datos/tus-datos.service';
import { SendTusDatosRequest, SendTusDatosResponse } from '../../../Models/tus-datos/send-tus-datos.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-tus-datos',
	templateUrl: './tus-datos.component.html',
	styleUrls: [ './tus-datos.component.scss' ]
})
export class TusDatosComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('passengersContainer', { read: ViewContainerRef }) passengersContainer: ViewContainerRef;

	private childComponents: { id: number, componentRef: any }[] = [];
	private currentId = 0;
	private isAlive = true;

	banner: IGalleryImage;

	form: FormGroup;
	onShowErrors: EventEmitter<boolean> = new EventEmitter();
	errorsDisplayed = false;
	isLoading = false;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
	            private formBuilder: FormBuilder,
	            private dataPageService: DataPagePresenterService,
	            private tusDatosService: TusDatosService,
	            private modalService: NgbModal,
	            public _snackBar: MatSnackBar) {
		this.form = this.formBuilder.group({
			passengers: this.formBuilder.array([]),
			store: new FormControl('', Validators.required),
			medium: new FormControl('', Validators.required),
			privacyPolicy: new FormControl('', Validators.requiredTrue),
			dataPolicy: new FormControl('', Validators.requiredTrue)
		});
	}

	ngOnInit() {
		this.getBanner();
	}

	ngAfterViewInit() {
		this.addPassenger();
	}

	private getBanner() {
		this.dataPageService.getDataGallery().subscribe(data => {
			this.banner = data.filter(item => item.Code === EGalleryCode.banner_tus_datos_cp)[0].Images[0];
		});
	}

	addPassenger() {
		if (this.passengersContainer.length >= 20)
			return;

		const childFactory = this.componentFactoryResolver.resolveComponentFactory(PassengerComponent);
		const childComponentRef = childFactory.create(this.passengersContainer.injector);
		const childFormGroup = childComponentRef.instance.form;

		const passengersArray = this.passengers;
		passengersArray.push(childFormGroup);

		const id = this.currentId++;
		childComponentRef.instance.indexToDisplay = this.passengersContainer.length;

		this.onShowErrors.pipe(takeWhile(() => this.isAlive))
				.subscribe((value: boolean) => childComponentRef.instance.showErrors = value);

		childComponentRef.instance.addNewPassenger.pipe(takeWhile(() => this.isAlive))
				.subscribe(() => this.addPassenger());
		childComponentRef.instance.removePassenger.pipe(takeWhile(() => this.isAlive))
				.subscribe(() => this.removePassenger(id));


		this.passengersContainer.insert(childComponentRef.hostView);
		this.childComponents.push({ id, componentRef: childComponentRef });
	}

	removePassenger(id: number) {
		const index = this.childComponents.findIndex(item => item.id === id);
		if (index !== -1) {
			this.childComponents.forEach((item: any, i: number) => {
				if (i > index) item.componentRef.instance.indexToDisplay -= 1;
			});
			this.passengersContainer.remove(this.passengersContainer.indexOf(this.childComponents[index].componentRef.hostView));
			this.childComponents.splice(index, 1);
		}
	}

	onSubmit() {
		if (this.form.valid) {
			this.isLoading = true;
			const model: SendTusDatosRequest = {
				passengers: this.form.value.passengers.map((value: any) => {
					return {
						docType: value.docType,
						docNumber: value.docNumber,
						names: value.firstName,
						lastName: value.lastName,
						mLastName: value.mLastName,
						email: value.email,
						birthDate: value.birthDate,
						phone: value.phone
					};
				}),
				idMedium: this.medium.value.toString(),
				idStore: this.store.value.toString(),
				dataPolicy: this.dataPolicy.value ? 1 : 0,
				privacyPolicy: this.privacyPolicy.value ? 1 : 0
			};
			this.tusDatosService.sendClientData(model).subscribe({
				next: (response: SendTusDatosResponse) => {
					if (!response.ResultadoError)
						this.showSuccess();
					else
						this.onSubmitError(response.Mensaje);
				},
				error: (err: any) => this.onSubmitError(err),
				complete: () => this.isLoading = false
			});
			return;
		}
		this.showFormErrors();
	}

	private showSuccess() {
		const modalRef = this.modalService.open(SuccessDialogComponent, {
			centered: true
		});
		modalRef.componentInstance.title = '¡Muchas gracias por registrarte!';
		modalRef.componentInstance.content =
				`En breve te llegará un e-mail de confirmación al correo <strong>${this.passengers.at(0).get('email')?.value}</strong>`;
		modalRef.dismissed.pipe(takeWhile(() => this.isAlive))
				.subscribe(() => this.resetForms());
	}

	private resetForms() {
		const firstPassenger = this.childComponents[0].componentRef.instance as PassengerComponent;
		firstPassenger.docPrevValue = '';
		firstPassenger.docInputMaxLength = 15;
		firstPassenger.docInputType = 'tel';

		this.passengers.at(0).get('docType')?.reset('');
		this.passengers.at(0).get('docNumber')?.reset('');
		this.passengers.at(0).get('firstName')?.reset('');
		this.passengers.at(0).get('lastName')?.reset('');
		this.passengers.at(0).get('mLastName')?.reset('');
		this.passengers.at(0).get('birthDate')?.reset('');
		this.passengers.at(0).get('email')?.reset('');
		this.passengers.at(0).get('phone')?.reset('');

		this.store.reset('');
		this.medium.reset('');
		this.privacyPolicy.reset();
		this.dataPolicy.reset();

		for (let i = 1; i < this.passengersContainer.length; i++) {
			this.passengers.removeAt(i);
			this.passengersContainer.remove(i);
		}
		this.childComponents.splice(1, this.childComponents.length - 1);
	}

	private onSubmitError(error: any) {
		this.isLoading = false;
		console.error('SUBMIT_ERROR', error);
		this._snackBar.open('Error al enviar el formulario. Intente de nuevo.', 'OK');
	}

	private showFormErrors() {
		this.errorsDisplayed = true;
		this.onShowErrors.emit(true);
	}

	get passengers() {
		return this.form.controls['passengers'] as FormArray;
	}

	get store() {
		return this.form.controls['store'];
	}

	get medium() {
		return this.form.controls['medium'];
	}

	get privacyPolicy() {
		return this.form.controls['privacyPolicy'];
	}

	get dataPolicy() {
		return this.form.controls['dataPolicy'];
	}

	ngOnDestroy() {
		this.isAlive = false;
	}
}
