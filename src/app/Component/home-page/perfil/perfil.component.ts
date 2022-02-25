import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, UserStorage } from 'src/app/Services/account/account.service';
import { DataPagePresenterService } from 'src/app/Services/presenter/data-page-presenter.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PreferenceService } from '../../../Services/preference/preference.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formPreference: FormGroup
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

  userStorage:UserStorage;

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public preferenceService: PreferenceService,
    public accountService: AccountService,
    private router: Router,
  ) {
    this.user = localStorage.getItem('usuario')
    this.userData = JSON.parse(this.user)
  }

  id: any = "mnuPerfil";
  showOption(ids: any) {
    this.id = ids;
    //console.log(this.id);
  }


  agregaTarjeta = false;
  showAgregaTarjeta(valElem: boolean) {
    this.agregaTarjeta = valElem;
    //console.log(this.agregaTarjeta);
  }

  agregaPasajero = false;
  showAgregaPasajero(valElem: boolean) {
    this.agregaPasajero = valElem;
    //console.log(this.agregaPasajero);
  }

  ngOnInit(): void {
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
    this.createform()
    this.userStorage = this.accountService.getUserStorage();
  }

  createform() {
    this.formPreference = new FormGroup({
      nombres: new FormControl(),
      apellidoPaterno: new FormControl(),
      apellidoMaterno: new FormControl(),
      email: new FormControl(),
      dia: new FormControl(),
      mes: new FormControl(),
      anio: new FormControl(),
      nacionalidad: new FormControl(),
      tipoDocumento: new FormControl(),
      numeroDocumento: new FormControl(),
      pais: new FormControl(),
      departamento: new FormControl(),
      distrito: new FormControl(),

      playa: new FormControl(false),
      aventura: new FormControl(false),
      naturaleza: new FormControl(false),
      exoticos: new FormControl(false),
      tematico: new FormControl(false),
      shopping: new FormControl(false),
      cruceros: new FormControl(false),
      cultural: new FormControl(false),
      otros: new FormControl(false),

      economico: new FormControl(),
      clasico: new FormControl(),
      lujo: new FormControl(),

      solo: new FormControl(),
      pareja: new FormControl(),
      familia: new FormControl(),
      amigos: new FormControl(),

      vecesAlAnio: new FormControl(),

      politicas: new FormControl(),
      autorizo: new FormControl(),
    })
  }

  save() {
    console.log(this.formPreference.value)
    let data = this.formPreference.value
    if (this.validForm()) {

    let payload = {
      "TrackingCode": "000001",
      "MuteExceptions": false,
      "Caller": {
        "Company": "Agil",
        "Application": "Interagencias"
      },
      "Parameter": {
        "Firstname": data.nombres,
        "FatherLastname": data.apellidoPaterno,
        "MotherLastname": data.apellidoMaterno,
        "Email": data.email,
        "Gender": "M",
        "Phone": data.telefono,
        "Birthdate": data.anio + '-' + data.mes + '-' + data.dia,
        "Nationality": data.nacionalidad,
        "DocumentType": data.tipoDocumento,
        "DocumentNumber": data.numeroDocumento,
        "CountryId": 132,
        "DepartmentId": 14,
        "DistrictId": 1245,
        "Preferences": [
          {
            "Id": "SHO",
            "Name": "Shopping"
          }
        ],
        "Categories": [
          {
            "Id": "LUJ",
            "Name": "Lujo"
          }
        ],
        "Companions": [
          {
            "Id": "PAR",
            "Name": "Pareja"
          }
        ],
        "DataAuthorization": true
      }
    }
    this.preferenceService.preference(payload).subscribe({
      next: response => console.log(response)

    })
  }
  }
  validForm() {
    this.errors = []
    const letter = new RegExp('^[a-zA-Z ]+$', 'i')
    const number = new RegExp('^[0-9]+$', 'i')
    const alphanumeric = new RegExp('^[a-zA-Z0-9 ]+$', 'i')
    const mail = new RegExp('^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$', 'i')

    let nombres: string = this.formPreference.getRawValue()['nombres']
    if (nombres === undefined || nombres === null || nombres.trim() === '') {
      this.errors.push({ name: this.MSG_NOMBRES, message: 'Campo requerido' })
    }
    let apellidoPaterno: string = this.formPreference.getRawValue()['apellidoPaterno']
    if (apellidoPaterno === undefined || apellidoPaterno === null || apellidoPaterno.trim() === '') {
      this.errors.push({ name: this.MSG_APELLIDO_PATERNO, message: 'Campo requerido' })
    }
    let apellidoMaterno: string = this.formPreference.getRawValue()['apellidoMaterno']
    if (apellidoMaterno === undefined || apellidoMaterno === null || apellidoMaterno.trim() === '') {
      this.errors.push({ name: this.MSG_APELLIDO_MATERNO, message: 'Campo requerido' })
    }
    let email: string = this.formPreference.getRawValue()['email']
    if (email === undefined || email === null || email.trim() === '') {
      this.errors.push({ name: this.MSG_MAIL, message: 'Campo requerido' })
    }
    let dia: string = this.formPreference.getRawValue()['dia']
    if (dia === undefined || dia === null || dia.trim() === '') {
      this.errors.push({ name: this.MSG_DIA, message: 'Campo requerido' })
    }
    let mes: string = this.formPreference.getRawValue()['mes']
    if (mes === undefined || mes === null || mes.trim() === '') {
      this.errors.push({ name: this.MSG_MES, message: 'Campo requerido' })
    }
    let anio: string = this.formPreference.getRawValue()['anio']
    if (anio === undefined || anio === null || anio.trim() === '') {
      this.errors.push({ name: this.MSG_ANIO, message: 'Campo requerido' })
    }
    let nacionalidad: string = this.formPreference.getRawValue()['nacionalidad']
    if (nacionalidad === undefined || nacionalidad === null || nacionalidad.trim() === '') {
      this.errors.push({ name: this.MSG_NACIONALIDAD, message: 'Campo requerido' })
    }
    let tipoDocumento: string = this.formPreference.getRawValue()['tipoDocumento']
    if (tipoDocumento === undefined || tipoDocumento === null || tipoDocumento.trim() === '') {
      this.errors.push({ name: this.MSG_TIPO_DOCUMENTO, message: 'Campo requerido' })
    }
    let numeroDocumento: string = this.formPreference.getRawValue()['numeroDocumento']
    if (numeroDocumento === undefined || numeroDocumento === null || numeroDocumento.trim() === '') {
      this.errors.push({ name: this.MSG_NUMERO_DOCUMENTO, message: 'Campo requerido' })
    }
    if (!number.test(numeroDocumento)) {
      this.errors.push({ name: this.MSG_NUMERO_DOCUMENTO, message: 'solo números' })
    }
    let pais: string = this.formPreference.getRawValue()['pais']
    if (pais === undefined || pais === null || pais.trim() === '') {
      this.errors.push({ name: this.MSG_PAIS, message: 'Campo requerido' })
    }
    let departamento: string = this.formPreference.getRawValue()['departamento']
    if (departamento === undefined || departamento === null || departamento.trim() === '') {
      this.errors.push({ name: this.MSG_DEPARTAMENTO, message: 'Campo requerido' })
    }
    let distrito: string = this.formPreference.getRawValue()['distrito']
    if (distrito === undefined || distrito === null || distrito.trim() === '') {
      this.errors.push({ name: this.MSG_DISTRITO, message: 'Campo requerido' })
    }
    let politicas: boolean = this.formPreference.getRawValue()['politicas']
    if (politicas === undefined || politicas === null || politicas == false) {
      this.errors.push({ name: this.MSG_CHK_POLITY, message: 'Aceptar Politicas requerido' })
    }
    let autorizo: boolean = this.formPreference.getRawValue()['autorizo']
    if (autorizo === undefined || autorizo === null || autorizo == false) {
      this.errors.push({ name: this.MSG_CHK_AUTORIZO, message: 'Autorizar uso de información requerido' })
    }

    // let playa: boolean = this.formPreference.getRawValue()['playa'],
    //   aventura: boolean = this.formPreference.getRawValue()['aventura'],
    //   naturaleza: boolean = this.formPreference.getRawValue()['naturaleza'],
    //   exoticos: boolean = this.formPreference.getRawValue()['exoticos'],
    //   tematico: boolean = this.formPreference.getRawValue()['tematico'],
    //   shopping: boolean = this.formPreference.getRawValue()['shopping'],
    //   cruceros: boolean = this.formPreference.getRawValue()['cruceros'],
    //   cultura: boolean = this.formPreference.getRawValue()['cultura'],
    //   otros: boolean = this.formPreference.getRawValue()['otros']
    // if (
    //   playa == false ||
    //   aventura == false ||
    //   naturaleza == false ||
    //   exoticos == false ||
    //   tematico == false ||
    //   shopping == false ||
    //   cruceros == false ||
    //   cultura == false ||
    //   otros == false
    // ) {
    //   this.errors.push({ name: this.MSG_CHK_PREFE, message: 'Debe elegir al menos una opción' })
    // }

    // for (let x = 0; x < this.listPreferent.length; x++) {
    //   let prefe: string = this.formPreference.getRawValue()['playa']
    //   console.log(prefe);

    // }

    return this.errors.length === 0
  }
  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }
  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }
  logout() {
    this.accountService.signOut();
    this.router.navigateByUrl("/");
  }

}
