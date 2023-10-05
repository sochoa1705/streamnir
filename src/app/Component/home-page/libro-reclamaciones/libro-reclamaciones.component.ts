import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { toUp } from '../../../shared/utils';
import { LibroReclamacionesService } from '../../../Services/libro/libro-reclamaciones.service';
import { LoaderSubjectService } from '../../../shared/components/loader/service/loader-subject.service';
import { InputValidationService } from 'src/app/Services/inputValidation.service';
import { CryptoService } from 'src/app/Services/util/crypto.service';

@Component({
  selector: 'app-libro-reclamaciones',
  templateUrl: './libro-reclamaciones.component.html',
  styleUrls: ['./libro-reclamaciones.component.scss']
})
export class LibroReclamacionesComponent implements OnInit {
  formLibro: FormGroup
  ipCliente: any
  today: any
  tipoReclamo: string
  numCode: number | undefined
  errors: any[] = []
  MSG_EMPTY: string = 'none'
  MSG_PUNTO_VENTA: string = 'puntoVenta'
  MSG_ASESORA: string = 'asesora'
  // MSG_FECHA: string = 'fecha'
  MSG_NOMBRE: string = 'nombre'
  MSG_APELLIDO: string = 'apellido'
  MSG_TIPO_DOC: string = 'tipoDoc'
  MSG_NUM_DOC: string = 'numDoc'
  MSG_TELEFONO: string = 'telefono'
  MSG_DIRECCION: string = 'direccion'
  MSG_EMAIL: string = 'email'
  // MSG_MENOR: string = 'menor'
  MSG_NOMBRE_MENOR: string = 'nombreMenor'
  MSG_APELLIDO_MENOR: string = 'apellidoMenor'
  // MSG_TELEFONO_MENOR: string = 'telefonoMenor'
  MSG_DIRECCION_MENOR: string = 'direccionMenor'
  MSG_EMAIL_MENOR: string = 'emailMenor'


  MSG_BIEN_CONTRATADO: string = 'bienContratado'
  MSG_DESCRIPCION_BIEN_CONTRATADO: string = 'descripcionBienContratado'
  MSG_MONTO_RECLAMO: string = 'montoReclamado'
  MSG_TIPO_RECLAMO: string = 'tipoReclamo'
  MSG_DETALLE_RECLAMO: string = 'detalleReclamo'
  MSG_PEDIDO: string = 'pedido'
  MSG_OBSERVACIONES: string = 'observaciones'
  MSG_POLITICA: string = 'politica'
  MSG_AUTORIZO: string = 'autorizo'

  constructor(
    public libroService: LibroReclamacionesService,
    public loaderSubjectService: LoaderSubjectService,
    public inputValidator: InputValidationService,
    private _cryptoService: CryptoService
  ) {
    this.ipCliente = localStorage.getItem('ipCliente')
    let day = new Date()
    this.today = String(day.getDate()).padStart(2, '0') + "/" + String((day.getMonth() + 1)).padStart(2, '0') + "/" + day.getFullYear()
  }

  ngOnInit(): void {
    let userID: string = '';
    let user_existingCustomer: boolean = false;
    const credentials = localStorage.getItem('usuario');
    const bookings = localStorage.getItem('bookings');

    if (credentials) {
      const credentialsJson = JSON.parse(credentials);
      userID = this._cryptoService.encrypt(credentialsJson.email);

      if (bookings)
        user_existingCustomer = JSON.parse(bookings).length > 0;
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "user_info",
      userID: userID,
      user_existingCustomer: user_existingCustomer
    });

    (window as any).dataLayer.push({
      event: "virtualPageView",
      virtualPagePath: "/libro-reclamaciones",
      virtualPageTitle: "NMV: Libro de reclamaciones"
    });

    this.createForm();
    toUp();
  }

  createForm() {
    this.formLibro = new FormGroup({
      puntoVenta: new FormControl(),
      asesora: new FormControl(),
      fecha: new FormControl(this.today),
      nombre: new FormControl(),
      apellido: new FormControl(),
      tipoDoc: new FormControl(),
      numDoc: new FormControl(),
      telefono: new FormControl(),
      direccion: new FormControl(),
      email: new FormControl(),
      menor: new FormControl(false),
      nombreMenor: new FormControl(null),
      apellidoMenor: new FormControl(null),
      telefonoMenor: new FormControl(null),
      direccionMenor: new FormControl(null),
      emailMenor: new FormControl(null),
      bienContratado: new FormControl('S'),
      descripcionBienContratado: new FormControl(),
      montoReclamado: new FormControl(),
      tipoReclamo: new FormControl(),
      detalleReclamo: new FormControl(),
      pedido: new FormControl(),
      observaciones: new FormControl(),
      politica: new FormControl(),
      autorizo: new FormControl(),
    })
  }

  enviar() {
    let data = this.formLibro.value

    if (this.validForm()) {
      const textSend = 'SE ESTAN VALIDANDO SUS DATOS!'
      this.loaderSubjectService.showText(textSend)
      let payload = {
        "TrackingCode": "00000",
        "MuteExceptions": false,
        "Caller": {
          "Company": "Agil",
          "Application": "Interagencias"
        },
        "Parameter": {
          "Ip": this.ipCliente,
          "Browser": "Chrome",
          "Person": {
            "Firstname": data.nombre,
            "Lastname": data.apellido,
            "DocumentType": data.tipoDoc,
            "DocumentNumber": data.numDoc,
            "Phone": data.telefono,
            "Address": data.direccion,
            "Email": data.email,
            "IsChildren": data.menor,
            "Father": {
              "Firstname": data.nombreMenor,
              "Lastname": data.apellidoMenor,
              "Address": data.direccionMenor,
              "Email": data.emailMenor
            }
          },
          "Type": data.tipoReclamo,
          "Service": {
            "Name": data.descripcionBienContratado,
            "Amount": Number(data.montoReclamado),
            "Text": data.pedido,
            "Observation": data.observaciones,
            "Comment": data.detalleReclamo
          },
          "Adviser": {
            "FullName": data.asesora,
            "PointSale": data.puntoVenta
          }
        }
      }
      // console.log(payload)

      this.libroService.libroData(payload).subscribe({
        next: response => {
          this.numCode = response['Result']['Code']
          this.loaderSubjectService.closeLoader()
        },
        error: err => {
          console.log(err)
          this.loaderSubjectService.closeLoader()
        }
      })

    }
  }

  validForm() {
    this.errors = []
    const letter = new RegExp('^[a-zA-Z ]+$', 'i')
    const number = new RegExp('^[0-9]+$', 'i')
    const alphanumeric = new RegExp('^[a-zA-Z0-9 ]+$', 'i')
    const mail = new RegExp('^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$', 'i')

    let puntoVenta: string = this.formLibro.getRawValue()['puntoVenta']
    if (puntoVenta === undefined || puntoVenta === null || puntoVenta.trim() === '') {
      this.errors.push({ name: this.MSG_PUNTO_VENTA, message: 'Campo requerido' })
    }
    let asesora: string = this.formLibro.getRawValue()['asesora']
    if (asesora === undefined || asesora === null || asesora.trim() === '') {
      this.errors.push({ name: this.MSG_ASESORA, message: 'Campo requerido' })
    }
    let nombre: string = this.formLibro.getRawValue()['nombre']
    if (nombre === undefined || nombre === null || nombre.trim() === '') {
      this.errors.push({ name: this.MSG_NOMBRE, message: 'Nombre es requerido' })
    }
    let apellido: string = this.formLibro.getRawValue()['apellido']
    if (apellido === undefined || apellido === null || apellido.trim() === '') {
      this.errors.push({ name: this.MSG_APELLIDO, message: 'Apellido es requerido' })
    }
    let tipoDoc: string = this.formLibro.getRawValue()['tipoDoc']
    if (tipoDoc === undefined || tipoDoc === null || tipoDoc.trim() === '') {
      this.errors.push({ name: this.MSG_TIPO_DOC, message: 'Campo requerido' })
    }
    let numDoc: string = this.formLibro.getRawValue()['numDoc']
    if (numDoc === undefined || numDoc === null || numDoc.trim() === '') {
      this.errors.push({ name: this.MSG_NUM_DOC, message: 'Campo requerido' })
    }
    let telefono: string = this.formLibro.getRawValue()['telefono']
    if (telefono === undefined || telefono === null || telefono.trim() === '') {
      this.errors.push({ name: this.MSG_TELEFONO, message: 'teléfono es requerido' })
    }
    let direccion: string = this.formLibro.getRawValue()['direccion']
    if (direccion === undefined || direccion === null || direccion.trim() === '') {
      this.errors.push({ name: this.MSG_DIRECCION, message: 'Dirección es requerido' })
    }
    if (!number.test(telefono)) {
      this.errors.push({ name: this.MSG_TELEFONO, message: 'solo números' })
    }
    let email: string = this.formLibro.getRawValue()['email']
    if (email === undefined || email === null || email.trim() === '') {
      this.errors.push({ name: this.MSG_EMAIL, message: 'Email requerido' })
    }

    let menor: boolean = this.formLibro.getRawValue()['menor']
    console.log(menor)

    if (menor === true) {
      let nombreMenor: string = this.formLibro.getRawValue()['nombreMenor']
      if (nombreMenor === undefined || nombreMenor === null || nombreMenor.trim() === '') {
        this.errors.push({ name: this.MSG_NOMBRE_MENOR, message: 'Campo requerido' })
      }
      let apellidoMenor: string = this.formLibro.getRawValue()['apellidoMenor']
      if (apellidoMenor === undefined || apellidoMenor === null || apellidoMenor.trim() === '') {
        this.errors.push({ name: this.MSG_APELLIDO_MENOR, message: 'Campo requerido' })
      }
      // let telefonoMenor: string = this.formLibro.getRawValue()['telefonoMenor']
      // if (telefonoMenor === undefined || telefonoMenor === null || telefonoMenor.trim() === '') {
      //   this.errors.push({ name: this.MSG_TELEFONO_MENOR, message: 'Campo requerido' })
      // }
      let direccionMenor: string = this.formLibro.getRawValue()['direccionMenor']
      if (direccionMenor === undefined || direccionMenor === null || direccionMenor.trim() === '') {
        this.errors.push({ name: this.MSG_DIRECCION_MENOR, message: 'Campo requerido' })
      }
      let emailMenor: string = this.formLibro.getRawValue()['emailMenor']
      if (emailMenor === undefined || emailMenor === null || emailMenor.trim() === '') {
        this.errors.push({ name: this.MSG_EMAIL_MENOR, message: 'Campo requerido' })
      }
    }

    let bienContratado: string = this.formLibro.getRawValue()['bienContratado']
    if (bienContratado === undefined || bienContratado === null || bienContratado.trim() === '') {
      this.errors.push({ name: this.MSG_BIEN_CONTRATADO, message: 'Campo es requerido' })
    }
    let descripcionBienContratado: string = this.formLibro.getRawValue()['descripcionBienContratado']
    if (descripcionBienContratado === undefined || descripcionBienContratado === null || descripcionBienContratado.trim() === '') {
      this.errors.push({ name: this.MSG_DESCRIPCION_BIEN_CONTRATADO, message: 'Campo es requerido' })
    }
    let montoReclamado: string = this.formLibro.getRawValue()['montoReclamado']
    if (montoReclamado === undefined || montoReclamado === null || montoReclamado.trim() === '') {
      this.errors.push({ name: this.MSG_MONTO_RECLAMO, message: 'Campo es requerido' })
    }
    let tipoReclamo: boolean = this.formLibro.getRawValue()['tipoReclamo']
    if (tipoReclamo === undefined || tipoReclamo === null || tipoReclamo === false) {
      this.errors.push({ name: this.MSG_TIPO_RECLAMO, message: 'tipo es requerido' })
    }
    let detalleReclamo: string = this.formLibro.getRawValue()['detalleReclamo']
    if (detalleReclamo === undefined || detalleReclamo === null || detalleReclamo.trim() === '') {
      this.errors.push({ name: this.MSG_DETALLE_RECLAMO, message: 'Detalle es requerido' })
    }
    let pedido: string = this.formLibro.getRawValue()['pedido']
    if (pedido === undefined || pedido === null || pedido.trim() === '') {
      this.errors.push({ name: this.MSG_PEDIDO, message: 'Campo es requerido' })
    }
    let observaciones: string = this.formLibro.getRawValue()['observaciones']
    if (observaciones === undefined || observaciones === null || observaciones.trim() === '') {
      this.errors.push({ name: this.MSG_OBSERVACIONES, message: 'Campo es requerido' })
    }
    let politica: boolean = this.formLibro.getRawValue()['politica']
    if (politica === undefined || politica === null || politica == false) {
      this.errors.push({ name: this.MSG_POLITICA, message: 'Políticas es requerido' })
    }
    let autorizo: boolean = this.formLibro.getRawValue()['autorizo']
    if (autorizo === undefined || autorizo === null || autorizo == false) {
      this.errors.push({ name: this.MSG_AUTORIZO, message: 'Campo requerido' })
    }
    return this.errors.length === 0
  }
  getMessage(messageKey: any) {
    return this.errors.filter((item: any) => item.name === messageKey).length > 0 ? this.errors.filter((item: any) => item.name === messageKey)[0].message : this.MSG_EMPTY
  }
  getMessageArray(index: any, messageKey: any) {
    return this.errors.filter((item: any) => item.indice === index && item.name === messageKey).length > 0;
  }
  reenviar() {
    this.numCode = undefined
    this.formLibro.reset()
  }

  isChecked: Boolean = false;
  checkSelect(value: boolean) {
    this.isChecked = value;
  }
  aAyuda() {
    let link = 'https://ayuda.nmviajes.com/support/home'
    window.location.href = link;
  }

}
