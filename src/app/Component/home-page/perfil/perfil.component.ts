import { Component, OnInit } from '@angular/core';
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
  MSG_APELLIDOS: string = 'apellidos'
  MSG_DIA: string = 'dia'
  MSG_MES: string = 'mes'
  MSG_ANIO: string = 'anio'
  MSG_NACIONALIDAD: string = 'nacionalidad'
  MSG_TIPO_DOCUMENTO: string = 'tipoDocumento'
  MSG_NUMERO_DOCUMENTO: string = 'numeroDocumento'
  MSG_PAIS: string = 'pais'
  MSG_DEPARTAMENTO: string = 'departamento'
  MSG_DISTRITO: string = 'distrito'

  constructor(
    public dataPagePresenterService: DataPagePresenterService,
    public preferenceService: PreferenceService,
  ) { }

  id: any = "mnuPerfil";
  showOption(ids: any) {
    this.id = ids;
    //console.log(this.id);
  }

  agregaTelefono = false;
  showAgregaTelefono(valElem: boolean) {
    this.agregaTelefono = valElem;
    //console.log(this.agregaTelefono);
  }

  agregaEmail = false;
  showAgregaEmail(valElem: boolean) {
    this.agregaEmail = valElem;
    //console.log(this.agregaEmail);
  }

  cambiarPass = false;
  showCambiarPass(valElem: boolean) {
    this.cambiarPass = valElem;
    //console.log(this.cambiarPass);
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
    this.createform()
  }
  createform() {
    this.formPreference = new FormGroup({
      nombres: new FormControl(),
      apellidos: new FormControl(),
      dia: new FormControl(),
      mes: new FormControl(),
      anio: new FormControl(),
      nacionalidad: new FormControl(),
      tipoDocumento: new FormControl(),
      numeroDocumento: new FormControl(),
      pais: new FormControl(),
      departamento: new FormControl(),
      distrito: new FormControl(),

      playa: new FormControl(),
      aventura: new FormControl(),
      naturaleza: new FormControl(),
      exoticos: new FormControl(),
      tematico: new FormControl(),
      shopping: new FormControl(),
      cruceros: new FormControl(),
      cultural: new FormControl(),
      otros: new FormControl(),

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

    if (this.validForm()) {
      console.log(this.formPreference.value)
    }
    let payload = {
      "TrackingCode": "000001",
      "MuteExceptions": false,
      "Caller": {
        "Company": "Agil",
        "Application": "Interagencias"
      },
      "Parameter": {
        "Firstname": "Test 1",
        "FatherLastname": "oshiro",
        "MotherLastname": "gushiken",
        "Email": "joshirog@gmail.com",
        "Gender": "M",
        "Phone": "987654321",
        "Birthdate": "1990-01-01 ",
        "Nationality": "PE",
        "DocumentType": "DNI",
        "DocumentNumber": "43214321",
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
    let apellidos: string = this.formPreference.getRawValue()['apellidos']
    if (apellidos === undefined || apellidos === null || apellidos.trim() === '') {
      this.errors.push({ name: this.MSG_APELLIDOS, message: 'Campo requerido' })
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
      this.errors.push({ name: this.MSG_TIPO_DOCUMENTO, message: 'teléfono es requerido' })
    }
    let numeroDocumento: string = this.formPreference.getRawValue()['numeroDocumento']
    if (numeroDocumento === undefined || numeroDocumento === null || numeroDocumento.trim() === '') {
      this.errors.push({ name: this.MSG_NUMERO_DOCUMENTO, message: 'Dirección es requerido' })
    }
    if (!number.test(numeroDocumento)) {
      this.errors.push({ name: this.MSG_NUMERO_DOCUMENTO, message: 'solo números' })
    }
    let pais: string = this.formPreference.getRawValue()['pais']
    if (pais === undefined || pais === null || pais.trim() === '') {
      this.errors.push({ name: this.MSG_PAIS, message: 'Email requerido' })
    }
    let departamento: string = this.formPreference.getRawValue()['departamento']
    if (departamento === undefined || departamento === null || departamento.trim() === '') {
      this.errors.push({ name: this.MSG_DEPARTAMENTO, message: 'departamento requerido' })
    }
    let distrito: string = this.formPreference.getRawValue()['distrito']
    if (distrito === undefined || distrito === null || distrito.trim() === '') {
      this.errors.push({ name: this.MSG_DISTRITO, message: 'Distrito requerido' })
    }

    return this.errors.length === 0
  }
  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }
  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }

}
