import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { ConfirmDialogComponent } from 'src/app/Component/confirm-dialog/confirm-dialog.component';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Passenger, PassengersService } from 'src/app/Component/home-page/perfil/passenger/passengers.service';
import { PreferenceService } from 'src/app/Services/preference/preference.service';
import { Guid } from 'src/app/shared/utils';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  hideList: boolean = false;
  passengers: Array<Passenger> = [];

  title: string = "";
  isNew: boolean = true;

  passengerForm: FormGroup;

  userId: number;

  countries: Array<any> = [];

  years: Array<any> = [];

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    private _passengersService: PassengersService,
    private _accountService: AccountsService,
    private _formBuilder: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _matSnackBar: MatSnackBar,
    private _preferencesService: PreferenceService,
    public _matDialog: MatDialog
  ) {
    this.userId = this._accountService.getUserStorage().id;
  }

  ngOnInit(): void {
    this.passengerForm = this.createPassengerForm();

    this.getAllPassengers();
    this.getCountries();
    this.makeYears();
  }

  getAllPassengers() {
    this._passengersService.getAll(this.userId).subscribe(res => {
      this.passengers = res;
    })
  }

  makeYears() {
    let currentYear = moment().year();

    for (let index = currentYear - 100; index < currentYear; index++) {
      this.years.push(index);
    }
  }

  getCountries() {
    this._preferencesService.getCountries().subscribe({
      next: response => {
        this.countries = response['Result'];
      }
    })
  }

  createPassengerForm(): FormGroup {
    return this._formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      birthDay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(31), Validators.pattern(this._validatorsService.digitsPattern)]],
      birthMonth: ['', [Validators.required]],
      birthYear: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._validatorsService.digitsPattern)]]
    });
  }

  newPassenger(): void {
    this.hideList = true;
    this.title = "Agregar pasajero";
    this.isNew = true;
  }

  editPassenger(entity: Passenger): void {

    this.title = "Editar pasajero";
    this.isNew = false;

    this.passengerForm.get("id")?.setValue(entity.Id);
    this.passengerForm.get("firstName")?.setValue(entity.Firstname);
    this.passengerForm.get("fatherLastname")?.setValue(entity.FatherLastname);
    this.passengerForm.get("motherLastname")?.setValue(entity.MotherLastname);

    debugger

    let birthdate = moment(entity.Birthdate);
    let birthDay = birthdate.date();
    let birthMonth = birthdate.month() + 1;
    let birthYear = birthdate.year();

    this.passengerForm.get("birthDay")?.setValue(birthDay);
    this.passengerForm.get("birthMonth")?.setValue(birthMonth);
    this.passengerForm.get("birthYear")?.setValue(birthYear);
    this.passengerForm.get("nationality")?.setValue(entity.CountryId);
    this.passengerForm.get("documentType")?.setValue(entity.DocumentType);
    this.passengerForm.get("documentNumber")?.setValue(entity.DocumentNumber);

    this.hideList = true;
  }

  validatePassengerForm(field: string) {
    return this.passengerForm.controls[field].errors
      && this.passengerForm.controls[field].touched;
  }

  savePassenger(): void {
    if (this.passengerForm.invalid) {
      this.passengerForm.markAllAsTouched();
      return;
    }

    if (this.passengerForm.valid) {

      this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
        disableClose: false
      });

      this.confirmDialogRef.componentInstance.confirmMessage = '¿Estás seguro de que quieres registrar el pasajero?';

      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          //let birthDate = `${this.passengerForm.get("birthYear")?.value}-${this.passengerForm.get("birthMonth")?.value}-${this.passengerForm.get("birthDay")?.value}`;
          let birthDate = new Date(this.passengerForm.get("birthYear")?.value, this.passengerForm.get("birthMonth")?.value - 1, this.passengerForm.get("birthDay")?.value);

          let countryId: number = Number(this.passengerForm.get("nationality")?.value);
          let nationality: string = this.countries.find(x => x.Id === countryId).Iata;

          const payload = {
            TrackingCode: Guid(),
            MuteExceptions: environment.muteExceptions,
            Caller: {
              Company: "Agil",
              Application: "Interagencias"
            },
            Parameter: {
              Id: 0,
              UserId: this.userId,
              Firstname: this.passengerForm.get("firstName")?.value,
              FatherLastname: this.passengerForm.get("fatherLastname")?.value,
              MotherLastname: this.passengerForm.get("motherLastname")?.value,
              Birthdate: birthDate,
              Nationality: nationality,
              CountryId: countryId,
              DocumentType: this.passengerForm.get("documentType")?.value,
              DocumentNumber: this.passengerForm.get("documentNumber")?.value
            }
          };

          if (this.isNew) {
            this._passengersService.save(payload).subscribe({
              next: (response) => {
                debugger

                const isSuccess = response.Result.IsSuccess;

                if (isSuccess) {
                  this._matSnackBar.open(`Los datos del pasajero ${this.passengerForm.get("firstName")?.value} ${this.passengerForm.get("fatherLastname")?.value} han sido registrados`, 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                  });

                  this.getAllPassengers();

                } else {
                  this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                  });
                }

                console.log(this.passengerForm.value);
                this.passengerForm.reset();
              },
              error: (err) => {

                console.log(err);
              },
              complete: () => { }
            });
          }
          else {
            debugger

            payload.Parameter.Id = Number(this.passengerForm.get("id")?.value);

            console.log(payload);

            this._passengersService.update(payload).subscribe({
              next: (response) => {
                debugger

                const isSuccess = response.Result.IsSuccess;

                if (isSuccess) {
                  this._matSnackBar.open(`Se actualizaron los datos del pasajero ${this.passengerForm.get("firstName")?.value} ${this.passengerForm.get("fatherLastname")?.value}`, 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                  });

                  this.getAllPassengers();

                } else {
                  this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                  });
                }

                console.log(this.passengerForm.value);
                this.passengerForm.reset();
              },
              error: (err) => {

                console.log(err);
              },
              complete: () => { }
            });
          }

          this.hideList = false;
        }

        //this.confirmDialogRef = null;
      });
    }
  }

  deletePassenger(entity: Passenger): void {

    debugger

    this._passengersService.delete(this.userId, entity.Id).subscribe({
      next: (response) => {

        const isSuccess = response.Result.IsSuccess;

        if (isSuccess) {
          this._matSnackBar.open(`Se eliminó el pasajero ${entity.Firstname} ${entity.FatherLastname}`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });

          this.getAllPassengers();

        } else {
          this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        }

      },
      error: (err) => {

        console.log(err);
      },
      complete: () => { }
    });
  }

  cancel(): void {
    this.hideList = false;
    this.passengerForm.reset();
  }
}
