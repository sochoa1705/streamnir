import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AccountsService } from 'src/app/Services/accounts.service';
import { Passenger, PassengersService } from 'src/app/Services/passengers.service';
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

  passengerForm: FormGroup;

  userId: number;

  constructor(
    private _passengersService: PassengersService,
    private _accountService: AccountsService,
    private _formBuilder: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _matSnackBar: MatSnackBar
  ) {
    this.userId = this._accountService.getUserStorage().id;
  }

  ngOnInit(): void {
    this.passengerForm = this.createPassengerForm();

    this.getAllPassengers();
  }

  createPassengerForm(): FormGroup {
    return this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      fatherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      motherLastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      birthDay: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.digitsPattern)]],
      birthMonth: ['', [Validators.required]],
      birthYear: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._validatorsService.digitsPattern)]]
    });
  }

  editPassenger(entity: Passenger): void {


    this.title = "Editar pasajero";

    console.log("editPassenger");
    console.log(entity);

    this.passengerForm.get("firstName")?.setValue(entity.Firstname);
    this.passengerForm.get("fatherLastname")?.setValue(entity.FatherLastname);
    this.passengerForm.get("motherLastname")?.setValue(entity.MotherLastname);

    debugger

    let fecha = moment(entity.Birthdate);
    let fecha2 = moment('1992-10-15T00:00:00');

    let day = fecha2.date();
    let month = fecha2.month();
    let year = fecha2.year();

    this.passengerForm.get("birthDay")?.setValue(day);
    this.passengerForm.get("birthMonth")?.setValue(month);
    this.passengerForm.get("birthYear")?.setValue(year);
    this.passengerForm.get("nationality")?.setValue(entity.Nationality);
    this.passengerForm.get("documentType")?.setValue(entity.DocumentType);
    this.passengerForm.get("documentNumber")?.setValue(entity.DocumentNumber);

    this.hideList = true;
  }

  getAllPassengers() {
    this._passengersService.getAll(this.userId).subscribe(res => {
      debugger

      this.passengers = res;
    })
  }

  newPassenger(): void {
    this.hideList = true;
    this.title = "Agregar pasajero";
  }

  validatePassengerForm(field: string) {
    return this.passengerForm.controls[field].errors
      && this.passengerForm.controls[field].touched;
  }

  savePassenger(): void {
    console.log("savePassenger");

    if (this.passengerForm.invalid) {
      this.passengerForm.markAllAsTouched();
      return;
    }

    if (this.passengerForm.valid) {

      const payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: "Agil",
          Application: "Interagencias"
        },
        Parameter: {
          UserId: this.userId,
          Firstname: this.passengerForm.get("firstName")?.value,
          FatherLastname: this.passengerForm.get("fatherLastname")?.value,
          MotherLastname: this.passengerForm.get("motherLastname")?.value,
          Birthdate: '1992-10-15',
          Nationality: this.passengerForm.get("nationality")?.value,
          CountryId: 1,
          DocumentType: this.passengerForm.get("documentType")?.value,
          DocumentNumber: this.passengerForm.get("documentNumber")?.value
        }
      };

      this._passengersService.save(payload).subscribe({
        next: (response) => {
          debugger


          //const isSuccess = response.Result.IsSuccess;

          //if (isSuccess) {
          this._matSnackBar.open(`El pasajero ${this.passengerForm.get("firstName")?.value} ${this.passengerForm.get("fatherLastname")?.value} ha sido registrado`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });

          this.getAllPassengers();

          // } else {
          //   this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
          //     verticalPosition: 'top',
          //     duration: 2000
          //   });
          // }

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

  deletePassenger(id: number): void {

    debugger

    this._passengersService.delete(this.userId, id).subscribe(res => {
      this.passengers = res;
    })
  }

  cancel(): void {
    this.hideList = false;
    this.passengerForm.reset();
  }
}
