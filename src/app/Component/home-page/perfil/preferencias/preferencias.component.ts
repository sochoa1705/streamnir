import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PreferenceService } from 'src/app/Services/preference/preference.service';
import { Guid } from 'src/app/shared/utils';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.scss']
})
export class PreferenciasComponent implements OnInit {

  preferenceForm: FormGroup;

  errors: any[] = []
  MSG_EMPTY: string = 'none'
  MSG_NOMBRES: string = 'nombres'
  MSG_APELLIDO_PATERNO: string = 'apellidoPaterno'
  MSG_APELLIDO_MATERNO: string = 'apellidoMaterno'
  MSG_MAIL: string = 'email'
  MSG_DIA: string = 'dia'
  MSG_MES: string = 'mes'
  MSG_ANIO: string = 'anio'
  MSG_NACIONALIDAD: string = 'nacionalidad'
  MSG_TIPO_DOCUMENTO: string = 'tipoDocumento'
  MSG_NUMERO_DOCUMENTO: string = 'numeroDocumento'
  MSG_PAIS: string = 'pais'
  MSG_DEPARTAMENTO: string = 'departamento'
  MSG_DISTRITO: string = 'distrito'
  MSG_CHK_POLITY: string = 'politicas'
  MSG_CHK_AUTORIZO: string = 'autorizo'
  MSG_CHK_PREFE: string = 'playa'
  listPreferent: any[]
  user: any
  userData: any
  distritos: any
  departamentos: any
  countries: Array<any> = [];

  years: Array<any> = [];

  constructor(
    private _preferenceService: PreferenceService,
    private _validatorsService: ValidatorsService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.preferenceForm = this.createPreferenceForm();

    this.getCountries();
    this.makeYears();

    this.listPreferent = [
      {
        id: 1,
        text: 'Playa',
        name: 'playa',
        value: 'PLA'
      },
      {
        id: 2,
        text: 'Aventura',
        name: 'aventura',
        value: 'AVE'
      },
      {
        id: 3,
        text: 'Naturaleza',
        name: 'naturaleza',
        value: 'NAT'
      },
      {
        id: 4,
        text: 'Exóticos',
        name: 'exoticos',
        value: 'EXO'
      },
      {
        id: 5,
        text: 'Tematico',
        name: 'tematico',
        value: 'TEM'
      },
      {
        id: 6,
        text: 'Shopping',
        name: 'shopping',
        value: 'SHO'
      },
      {
        id: 7,
        text: 'Cruceros',
        name: 'cruceros',
        value: 'CRU'
      },
      {
        id: 8,
        text: 'Cultural',
        name: 'cultural',
        value: 'CUL'
      },
      {
        id: 9,
        text: 'Otros',
        name: 'otros',
        value: 'OTR'
      }
    ]
  }

  createPreferenceForm(): FormGroup {
    return this._formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this._validatorsService.lettersPattern)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this._validatorsService.lettersPattern)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this._validatorsService.emailPattern)]],
      dia: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(31), Validators.pattern(this._validatorsService.digitsPattern)]],
      mes: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._validatorsService.digitsPattern)]],
      pais: ['', [Validators.required]],
      departamento: [''],
      distrito: [''],

      preference: this._formBuilder.group({
        playa: [false],
        aventura: [false],
        naturaleza: [false],
        exoticos: [false],
        tematico: [false],
        shopping: [false],
        cruceros: [false],
        cultural: [false],
        otros: [false]
      }),

      economico: [false],
      clasico: [false],
      lujo: [false],

      solo: [false],
      pareja: [false],
      familia: [false],
      amigos: [false],

      vecesAlAnio: [''],

      politicas: [false],
      autorizo: [false],
    })
  }

  validatePreferenceForm(field: string) {
    return this.preferenceForm.controls[field].errors
      && this.preferenceForm.controls[field].touched;
  }

  getCountries() {
    this._preferenceService.countries().subscribe({
      next: response => {
        this.countries = response['Result'];
      }
    })
  }

  optionDepartament(e: any) {
    let countrie = e.target.value
    this.getDepartament(countrie)
  }

  getDepartament(option: string) {
    this._preferenceService.departments(option).subscribe({
      next: response => {
        console.log(response['Result'])
        this.departamentos = response['Result']
      }
    })
  }

  optionDistrict(e: any) {
    let departament = e.target.value
    this.getDistrict(departament)
  }

  getDistrict(option: string) {
    this._preferenceService.districts(option).subscribe({
      next: response => {
        console.log(response['Result'])
        this.distritos = response['Result']
      }
    })
  }



  savePreferenceForm(): void {
    if (this.preferenceForm.invalid) {
      this.preferenceForm.markAllAsTouched();
      return;
    }

    debugger

    if (this.preferenceForm.valid) {
      let data = this.preferenceForm.value

      let payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: "Agil",
          Application: "Interagencias"
        },
        Parameter: {
          Firstname: data.nombres,
          FatherLastname: data.apellidoPaterno,
          MotherLastname: data.apellidoMaterno,
          Email: data.email,
          Gender: "M",
          Phone: data.telefono,
          Birthdate: data.anio + '-' + data.mes + '-' + data.dia,
          Nationality: data.nacionalidad,
          DocumentType: data.tipoDocumento,
          DocumentNumber: data.numeroDocumento,
          CountryId: 132,
          DepartmentId: 14,
          DistrictId: 1245,
          Preferences: [
            {
              Id: "SHO",
              Name: "Shopping"
            }
          ],
          Categories: [
            {
              Id: "LUJ",
              Name: "Lujo"
            }
          ],
          Companions: [
            {
              Id: "PAR",
              Name: "Pareja"
            }
          ],
          DataAuthorization: true
        }
      };

      this._preferenceService.preference(payload).subscribe({
        next: (response) => {
          if (response.Result.IsSuccess) {
            this._matSnackBar.open(`${response.Result.Message}`, 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }
          else {
            this._matSnackBar.open('Error en el registro de preferencias', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }
        }
      })
    }
  }

  makeYears() {
    let currentYear = moment().year();

    for (let index = currentYear - 100; index < currentYear; index++) {
      this.years.push(index);
    }
  }

  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }

  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }
}
