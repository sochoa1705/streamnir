import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PassengerComponent } from './passenger/passenger.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataPagePresenterService } from '../../../Services/presenter/data-page-presenter.service';
import {
  EGalleryCode,
  IGalleryImage,
} from '../../../Services/presenter/data-page-presenter.models';
import * as bootstrap from 'bootstrap';
import { takeWhile } from 'rxjs/operators';
import { TusDatosService } from '../../../Services/tus-datos/tus-datos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SendEventsRequest,
  SendEventsResponse,
} from 'src/app/Models/eventos/post.events.interface';
import { EventsService } from 'src/app/Services/events/events.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-eventos-v2',
  templateUrl: './eventos-v2.component.html',
  styleUrls: ['./eventos-v2.component.scss'],
})
export class EventosV2Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dateInput') private dateInput: ElementRef;
  @ViewChild('passengersContainer', { read: ViewContainerRef })
  passengersContainer: ViewContainerRef;

  private childComponents: { id: number; componentRef: any }[] = [];
  private currentId = 0;
  private isAlive = true;

  banner: IGalleryImage;
  form: FormGroup;
  formVerify: FormGroup;
  onShowErrors: EventEmitter<boolean> = new EventEmitter();
  errorsDisplayed = false;
  isLoading = false;
  filterResponse: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder,
    private dataPageService: DataPagePresenterService,
    private eventService: EventsService,
    private modalService: NgbModal,
    public _snackBar: MatSnackBar,
    private sanitized: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      passengers: this.formBuilder.array([]),
      store: new FormControl('', Validators.nullValidator),
      date: new FormControl('', Validators.required),
      hourRange: new FormControl('', Validators.required),
      privacyPolicy: new FormControl('', Validators.requiredTrue),
      dataPolicy: new FormControl('', Validators.requiredTrue),
    });

    this.formVerify = this.formBuilder.group({
      docType: new FormControl('', Validators.nullValidator),
      docNumber: new FormControl('', Validators.nullValidator),
    });
  }

  ngOnInit() {
    this.getBanner();
  }

  ngAfterViewInit() {
    this.addPassenger();
  }

  private getBanner() {
    this.dataPageService.getDataGallery().subscribe((data) => {
      this.banner = data.filter(
        (item) => item.Code === EGalleryCode.banner_tus_datos_cp
      )[0].Images[0];
    });
  }

  formatDate() {
    const inputValue = this.dateInput.nativeElement.value;
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length >= 2) {
      let formattedValue = numericValue.slice(0, 2);

      if (numericValue.length >= 3) {
        const month = numericValue.slice(2, 4);
        formattedValue += `/${month}`;

        if (numericValue.length >= 5) {
          const year = numericValue.slice(4, 8);
          formattedValue += `/${year}`;
        }
      }

      this.dateInput.nativeElement.value = formattedValue;
    }
  }

  addPassenger() {
    if (this.passengersContainer.length >= 20) return;

    const childFactory =
      this.componentFactoryResolver.resolveComponentFactory(PassengerComponent);
    const childComponentRef = childFactory.create(
      this.passengersContainer.injector
    );
    const childFormGroup = childComponentRef.instance.form;

    const passengersArray = this.passengers;
    passengersArray.push(childFormGroup);

    const id = this.currentId++;
    childComponentRef.instance.indexToDisplay = this.passengersContainer.length;

    this.onShowErrors
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        (value: boolean) => (childComponentRef.instance.showErrors = value)
      );

    childComponentRef.instance.addNewPassenger
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.addPassenger());
    childComponentRef.instance.removePassenger
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.removePassenger(id));

    this.passengersContainer.insert(childComponentRef.hostView);
    this.childComponents.push({ id, componentRef: childComponentRef });
  }

  removePassenger(id: number) {
    const index = this.childComponents.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.childComponents.forEach((item: any, i: number) => {
        if (i > index) item.componentRef.instance.indexToDisplay -= 1;
      });
      this.passengersContainer.remove(
        this.passengersContainer.indexOf(
          this.childComponents[index].componentRef.hostView
        )
      );
      this.childComponents.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const model: SendEventsRequest = {
        passengers: this.form.value.passengers.map((value: any) => {
          return {
            docType: value.docType,
            docNumber: value.docNumber,
            names: value.firstName,
            lastName: value.lastName,
            mLastName: value.mLastName,
            email: value.email,
            birthDate: value.birthDate,
            phone: value.phone,
          };
        }),
        idStore: 0, //this.store.value.toString(),
        dataPolicy: this.dataPolicy.value ? 1 : 0,
        privacyPolicy: this.privacyPolicy.value ? 1 : 0,
      };
      // this.tusDatosService.sendClientData(model).subscribe({
      //   next: (response: SendEventsResponse) => {
      //     if (!response.ResultadoError) this.showSuccess();
      //     else this.onSubmitError(response.Mensaje);
      //   },
      //   error: (err: any) => this.onSubmitError(err),
      //   complete: () => (this.isLoading = false),
      // });
      return;
    }
    this.showFormErrors();
  }

  doSearch() {
    const docType = this.formVerify.controls['docType'].value;
    const docNumber = this.formVerify.controls['docNumber'].value;
    this.eventService
      .verifyClient(docType, docNumber)
      .subscribe((response: any) => {
        this.filterResponse = this.sanitized.bypassSecurityTrustHtml(response.Valor)
      });
  }

  toggleModalVerify() {
    this.filterResponse = '';
    const modal = document.getElementById('ModalVerifyI');
    if (!modal) {
      return;
    }
    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }

  private showSuccess() {
    const modalRef = this.modalService.open(SuccessDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = '¡Muchas gracias por registrarte!';
    modalRef.componentInstance.content = `En breve te llegará un e-mail de confirmación al correo <strong>${
      this.passengers.at(0).get('email')?.value
    }</strong>`;
    modalRef.dismissed
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.resetForms());
  }

  private resetForms() {
    const firstPassenger = this.childComponents[0].componentRef
      .instance as PassengerComponent;
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

    this.form.reset();

    for (let i = 1; i < this.passengersContainer.length; i++) {
      this.passengers.removeAt(i);
      this.passengersContainer.remove(i);
    }
    this.childComponents.splice(1, this.childComponents.length - 1);
  }

  private onSubmitError(error: any) {
    this.isLoading = false;
    console.error('SUBMIT_ERROR', error);
    this._snackBar.open(
      'Error al enviar el formulario. Intente de nuevo.',
      'OK'
    );
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

  get dateControl() {
    return this.form.controls['date'];
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
