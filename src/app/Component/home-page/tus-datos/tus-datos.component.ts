import {
	AfterViewInit,
	Component,
	ComponentFactoryResolver,
	EventEmitter, OnDestroy, OnInit,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { PassengerComponent } from './passenger/passenger.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataPagePresenterService } from '../../../Services/presenter/data-page-presenter.service';
import { EGalleryCode, IGalleryImage } from '../../../Services/presenter/data-page-presenter.models';
import { takeWhile } from 'rxjs/operators';

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

	form: FormGroup;
	onShowErrors: EventEmitter<boolean> = new EventEmitter();
	errorsDisplayed = false;

	banner: IGalleryImage;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
	            private formBuilder: FormBuilder,
	            private dataPageService: DataPagePresenterService) {
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
			this.banner = data.filter(item => item.Code === EGalleryCode.banner_principal)[0].Images[0];
		});
	}

	addPassenger() {
		if (this.passengersContainer.length >= 20)
			return;

		const childFactory = this.componentFactoryResolver.resolveComponentFactory(PassengerComponent);
		const childComponentRef = childFactory.create(this.passengersContainer.injector);
		const childFormGroup = childComponentRef.instance.form;

		const passengersArray = this.passengers as FormArray;
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
		console.log(this.passengers);
		this.errorsDisplayed = true;
		this.onShowErrors.emit(true);
	}

	get passengers() {
		return this.form.controls['passengers'];
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
