import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AccountsService, UserStorage } from 'src/app/Services/accounts.service';
import { PreferenceService } from 'src/app/Services/preference/preference.service';
import { Guid } from 'src/app/shared/utils';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/environments/environment';
import { ContactoService } from './contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  agregaTelefono = false;
  agregaEmail = false;

  userId: number;

  contactInformationForm: FormGroup;

  countries: Array<any> = [];

  years: Array<any> = [];

  userStorage: UserStorage;

  constructor(
    private _accountsService: AccountsService,
    private _contactsService: ContactoService,
    private _formBuilder: FormBuilder,
    private _validatorsService: ValidatorsService,
    private _preferencesService: PreferenceService,
    private _matSnackBar: MatSnackBar
  ) {
    this.userId = this._accountsService.getUserStorage().id;
  }

  ngOnInit(): void {

    this.userStorage = this._accountsService.getUserStorage();

    this.contactInformationForm = this.createContactInformationForm();

    this.getCountries();
    this.makeYears();
    this.getContactInformation()
  }

  getContactInformation() {
    this._contactsService.getContactInformationHeader(this.userId).subscribe(headerData => {
      this._contactsService.getContactInformationDetail(this.userId).subscribe(detailData => {
        this.contactInformationForm.get("firstName")?.setValue(headerData.hasOwnProperty('Firstname') ? headerData.Firstname : '');
        this.contactInformationForm.get("fatherLastname")?.setValue(headerData.hasOwnProperty('FatherLastname') ? headerData.FatherLastname : '');
        this.contactInformationForm.get("motherLastname")?.setValue(headerData.hasOwnProperty('MotherLastname') ? headerData.MotherLastname : '');

        if (headerData.hasOwnProperty('Birthdate')) {
          let birthdate = moment(headerData.Birthdate);
          let birthDay = birthdate.date();
          let birthMonth = birthdate.month() + 1;
          let birthYear = birthdate.year();

          this.contactInformationForm.get("birthDay")?.setValue(birthDay);
          this.contactInformationForm.get("birthMonth")?.setValue(birthMonth);
          this.contactInformationForm.get("birthYear")?.setValue(birthYear === 1 ? '' : birthYear);
        }
        else {
          this.contactInformationForm.get("birthDay")?.setValue('');
          this.contactInformationForm.get("birthMonth")?.setValue('');
          this.contactInformationForm.get("birthYear")?.setValue('');
        }

        this.contactInformationForm.get("nationality")?.setValue(headerData.hasOwnProperty('CountryId') ? headerData.CountryId : '');
        this.contactInformationForm.get("documentType")?.setValue(headerData.hasOwnProperty('DocumentType') ? headerData.DocumentType : '');
        this.contactInformationForm.get("documentNumber")?.setValue(headerData.hasOwnProperty('DocumentNumber') ? headerData.DocumentNumber : '');
      });
    });
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

  createContactInformationForm(): FormGroup {
    return this._formBuilder.group({
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

  validateContactInformationForm(field: string) {
    return this.contactInformationForm.controls[field].errors
      && this.contactInformationForm.controls[field].touched;
  }

  saveContactInformation(): void {
    if (this.contactInformationForm.invalid) {
      this.contactInformationForm.markAllAsTouched();
      return;
    }

    if (this.contactInformationForm.valid) {

      let birthDate = new Date(this.contactInformationForm.get("birthYear")?.value, this.contactInformationForm.get("birthMonth")?.value - 1, this.contactInformationForm.get("birthDay")?.value);

      let countryId: number = Number(this.contactInformationForm.get("nationality")?.value);
      let nationality: string = this.countries.find(x => x.Id === countryId).Iata;

      const payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: "Agil",
          Application: "Interagencias"
        },
        Parameter: {
          UserId: this.userId,
          Firstname: this.contactInformationForm.get("firstName")?.value,
          FatherLastname: this.contactInformationForm.get("fatherLastname")?.value,
          MotherLastname: this.contactInformationForm.get("motherLastname")?.value,
          Birthdate: birthDate,
          Nationality: nationality,
          CountryId: countryId,
          DocumentType: this.contactInformationForm.get("documentType")?.value,
          DocumentNumber: this.contactInformationForm.get("documentNumber")?.value,
          DocumentExpiration: 'A'
        }
      };

      this._contactsService.updateContactInformationHeader(payload).subscribe({
        next: (response) => {
          debugger

          // const isSuccess = response.Result.IsSuccess;

          //if (isSuccess) {
          this._matSnackBar.open(`${this.contactInformationForm.get("firstName")?.value} ${this.contactInformationForm.get("fatherLastname")?.value}, tus datos de contacto han sido registrados`, 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });

          // } else {
          //   this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
          //     verticalPosition: 'top',
          //     duration: 2000
          //   });
          // }

          console.log(this.contactInformationForm.value);
        },
        error: (err) => {

          console.log(err);
        },
        complete: () => { }
      });



    }
  }

  cambiarPass = false;

  showCambiarPass(valElem: boolean) {
    this.cambiarPass = valElem;
    //console.log(this.cambiarPass);
  }

  showAgregaEmail(valElem: boolean) {
    this.agregaEmail = valElem;
    //console.log(this.agregaEmail);
  }

  showAgregaTelefono(valElem: boolean) {
    this.agregaTelefono = valElem;
    //console.log(this.agregaTelefono);
  }

}
