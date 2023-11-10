import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TusDatosService } from '../../../../Services/tus-datos/tus-datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetTusDatos } from '../../../../Models/tus-datos/get-tus-datos.interface';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss'],
})
export class PassengerComponent {
  @ViewChild('dateInput') private dateInput: ElementRef;

  @Input() indexToDisplay: number;
  @Input() showErrors: boolean;
  @Output() addNewPassenger: EventEmitter<void> = new EventEmitter();
  @Output() removePassenger: EventEmitter<void> = new EventEmitter();

  form: FormGroup;
  docInputMaxLength = 15;
  docInputType = 'tel';
  showDocErrors = false;
  docPrevValue: string;
  isSearchLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private tusDatosService: TusDatosService,
    public _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      docType: new FormControl('', Validators.required),
      docNumber: new FormControl('', Validators.required),
      firstName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ',-.]+$/),
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ',-.]+$/),
        ])
      ),
      mLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ',-.]+$/),
        ])
      ),
      birthDate: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
          ),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      address: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      district: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      country: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      gender: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
    });
  }

  onDocTypeChange(event: Event) {
    this.docNumber.clearValidators();

    const srcElement = event.target as HTMLSelectElement;
    const selectedValue = srcElement.value;

    if (selectedValue === 'DNI') {
      this.docInputType = 'tel';
      this.docInputMaxLength = 8;
      this.docNumber.setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),
          Validators.pattern(/^[0-9]*$/),
        ])
      );
    } else {
      this.docInputType = 'text';
      this.docInputMaxLength = 12;
      this.docNumber.setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ])
      );
    }

    this.docNumber.updateValueAndValidity();
  }

  onSearchByDocument() {
    if (this.docType.invalid || this.docNumber.invalid) {
      this.showDocErrors = true;
      return;
    }

    this.showDocErrors = false;

    if (this.docPrevValue === this.docNumber.value) return;

    this.isSearchLoading = true;

    this.tusDatosService
      .search(this.docType.value, this.docNumber.value)
      .subscribe({
        next: (response: GetTusDatos) => {
          if (
            response &&
            response.resultados &&
            response.resultados.length > 0
          ) {
            const result: any = response.resultados[0];
            this.firstName.setValue(result.Nombres);
            this.lastName.setValue(result.ApePaterno);
            this.mLastName.setValue(result.ApeMaterno);
            this.birthDate.setValue(result.FechaNacimiento);
            this.email.setValue(result.Email);
            this.country.setValue(result.Nacionalidad);
            this.gender.setValue(result.Genero);
            this.address.setValue(result.Direccion);
            this.district.setValue(result.Distrito);
            this.phone.setValue(result.Telefono);
          } else {
            this.firstName.reset();
            this.lastName.reset();
            this.mLastName.reset();
            this.birthDate.reset();
            this.email.reset();
            this.phone.reset();
            this._snackBar.open(
              `No se encontró pasajero con documento: ${this.docNumber.value}`,
              'OK',
              {
                duration: 5000,
              }
            );
          }
        },
        error: () => (this.isSearchLoading = false),
        complete: () => (this.isSearchLoading = false),
      });
    this.docPrevValue = this.docNumber.value;
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

  emmitAddNewPassenger() {
    this.addNewPassenger.emit();
  }

  emitRemovePassenger() {
    this.removePassenger.emit();
  }

  get docType() {
    return this.form.controls['docType'];
  }

  get docNumber() {
    return this.form.controls['docNumber'];
  }

  get firstName() {
    return this.form.controls['firstName'];
  }

  get lastName() {
    return this.form.controls['lastName'];
  }

  get mLastName() {
    return this.form.controls['mLastName'];
  }

  get birthDate() {
    return this.form.controls['birthDate'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get phone() {
    return this.form.controls['phone'];
  }

  get country() {
    return this.form.controls['country'];
  }

  get gender() {
    return this.form.controls['gender'];
  }

  get district() {
    return this.form.controls['district'];
  }

  get address() {
    return this.form.controls['address'];
  }
}
