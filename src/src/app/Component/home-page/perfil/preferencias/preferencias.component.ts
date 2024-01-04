import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PreferenceService } from 'src/app/Services/preference/preference.service';
import { CALLER_TYPE } from 'src/app/shared/constant';
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
  preferenceList: any[];
  distritos: any;
  departamentos: any;
  countries: Array<any> = [];
  nationalities: Array<any> = [];
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
    this.getNationalities();
    this.makeYears();

    this.preferenceList = [
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
      numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(this._validatorsService.alphanumericPattern)]],
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

      politicas: [false, [Validators.requiredTrue]],
      autorizo: [false, [Validators.requiredTrue]]
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

  getNationalities() {
    this._preferenceService.getCountries().subscribe({
      next: response => {
        this.nationalities = response['Result'];
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

    let preferences: any[] = [];

    this.preferenceList.forEach(element => {
      if (this.preferenceForm.get("preference")?.value[element.name]) {
        preferences.push({ Id: element.value, Name: element.name });
      }
    });

    let categories: any[] = [];

    if (this.preferenceForm.get("economico")?.value)
      categories.push({ Id: 'ECO', Name: 'Económico' });

    if (this.preferenceForm.get("clasico")?.value)
      categories.push({ Id: 'CLA', Name: 'Clásico' });

    if (this.preferenceForm.get("lujo")?.value)
      categories.push({ Id: 'LUJ', Name: 'Económico' });

    let companions: any[] = [];

    if (this.preferenceForm.get("solo")?.value)
      companions.push({ Id: 'SOL', Name: 'Solo' });

    if (this.preferenceForm.get("pareja")?.value)
      companions.push({ Id: 'PAR', Name: 'Pareja' });

    if (this.preferenceForm.get("familia")?.value)
      companions.push({ Id: 'FAM', Name: 'Familia' });

    if (this.preferenceForm.get("amigos")?.value)
      companions.push({ Id: 'AMI', Name: 'Amigos' });

    if (this.preferenceForm.valid) {
      //TODO: 
      // - El servicio soporta la propiedad de genero Gender.
      // - El front tiene inputs de frecuencia de viajes al año.
      // - El front tiene input de aceptacion de politicas de proteccion de datos.

      const payload = {
        TrackingCode: Guid(),
        MuteExceptions: environment.muteExceptions,
        Caller: {
          Company: CALLER_TYPE.company,
          Application: CALLER_TYPE.application
        },
        Parameter: {
          Firstname: this.preferenceForm.get("nombres")?.value,
          FatherLastname: this.preferenceForm.get("apellidoPaterno")?.value,
          MotherLastname: this.preferenceForm.get("apellidoMaterno")?.value,
          Email: this.preferenceForm.get("email")?.value,
          Birthdate: `${this.preferenceForm.get("anio")?.value}-${this.preferenceForm.get("mes")?.value}-${this.preferenceForm.get("dia")?.value}`,
          Nationality: this.preferenceForm.get("nacionalidad")?.value,
          DocumentType: this.preferenceForm.get("tipoDocumento")?.value,
          DocumentNumber: this.preferenceForm.get("numeroDocumento")?.value,
          CountryId: Number(this.preferenceForm.get("pais")?.value),
          DepartmentId: Number(this.preferenceForm.get("departamento")?.value),
          DistrictId: Number(this.preferenceForm.get("distrito")?.value),
          Preferences: preferences,
          Categories: categories,
          Companions: companions,
          DataAuthorization: this.preferenceForm.get("autorizo")?.value
        }
      };

      this._preferenceService.preference(payload).subscribe({
        next: (response) => {
          if (response.Result.IsSuccess) {
            //TODO: Mejorar el mensaje que retorna del servicio.
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
}
