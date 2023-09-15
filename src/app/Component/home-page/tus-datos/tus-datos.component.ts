import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PassengerComponent } from './passenger/passenger.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-tus-datos',
	templateUrl: './tus-datos.component.html',
	styleUrls: [ './tus-datos.component.scss' ]
})
export class TusDatosComponent implements AfterViewInit {
	@ViewChild('passengersContainer', { read: ViewContainerRef }) passengersContainer: ViewContainerRef;

	private childComponents: { id: number, componentRef: any }[] = [];
	private currentId = 0;

	form: FormGroup;
	showErrors: boolean = false;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			passengers: this.formBuilder.array([]),
			store: new FormControl('', Validators.required),
			medium: new FormControl('', Validators.required),
			privacyPolicy: new FormControl('', Validators.requiredTrue),
			dataPolicy: new FormControl('', Validators.requiredTrue)
		});
	}

	ngAfterViewInit() {
		this.addPassenger();
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
		childComponentRef.instance.showErrors = this.showErrors;

		childComponentRef.instance.addNewPassenger.subscribe(() => this.addPassenger());
		childComponentRef.instance.removePassenger.subscribe(() => this.removePassenger(id));


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
		this.showErrors = true;
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
}
